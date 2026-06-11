"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
} from "react";
import { useFrame } from "@react-three/fiber";
import { Float, OrbitControls, useGLTF } from "@react-three/drei";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  moleculeCycle,
  moleculeModels,
  moleculeMotion,
  moleculeOrbit,
} from "@/lib/molecule-config";
import { moleculeColors } from "@/lib/molecule-colors";
import { applyStandardMoleculeMaterials } from "@/lib/molecule-materials";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

moleculeModels.forEach((path) => useGLTF.preload(path));

type ModelUrl = (typeof moleculeModels)[number];
type OpacityRef = MutableRefObject<number>;

const floatProps = {
  speed: 1.1,
  rotationIntensity: 0,
  floatIntensity: 0.32,
  floatingRange: [-0.05, 0.05] as [number, number],
};

const floatPropsReduced = {
  speed: 0,
  rotationIntensity: 0,
  floatIntensity: 0,
  floatingRange: [0, 0] as [number, number],
};

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

/** Opacity only for model transitions — fully opaque at 1, hidden at 0. */
function setGroupOpacity(object: THREE.Object3D, opacity: number, renderOrder: number) {
  const isFullyVisible = opacity >= 0.999;
  const isHidden = opacity <= 0.001;

  object.traverse((node) => {
    if (!(node instanceof THREE.Mesh)) return;

    node.visible = !isHidden;
    if (isHidden) return;

    node.renderOrder = renderOrder;
    const materials = Array.isArray(node.material) ? node.material : [node.material];
    materials.forEach((material) => {
      if (isFullyVisible) {
        material.opacity = 1;
        material.transparent = false;
        material.depthWrite = true;
      } else {
        material.opacity = opacity;
        material.transparent = true;
        material.depthWrite = false;
      }
    });
  });
}

function MoleculeModel({
  url,
  opacityRef,
  renderOrderRef,
  onPrepared,
}: {
  url: ModelUrl;
  opacityRef: OpacityRef;
  renderOrderRef: OpacityRef;
  onPrepared?: () => void;
}) {
  const rootRef = useRef<THREE.Group>(null);
  const preparedReportedRef = useRef(false);
  const { scene } = useGLTF(url);

  const prepared = useMemo(() => {
    const clone = scene.clone(true);
    applyStandardMoleculeMaterials(clone);

    clone.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;

    clone.position.sub(center);
    const scale = (moleculeMotion.fitTargetSize / maxDim) * moleculeMotion.scale;

    return { object: clone, scale };
  }, [scene]);

  useEffect(() => {
    if (!onPrepared || preparedReportedRef.current) return;
    preparedReportedRef.current = true;

    let frame = 0;
    let raf = 0;
    const waitFrames = () => {
      frame += 1;
      if (frame < 2) {
        raf = requestAnimationFrame(waitFrames);
        return;
      }
      onPrepared();
    };
    raf = requestAnimationFrame(waitFrames);
    return () => cancelAnimationFrame(raf);
  }, [onPrepared, prepared]);

  useFrame(() => {
    if (!rootRef.current) return;
    setGroupOpacity(rootRef.current, opacityRef.current, renderOrderRef.current);
  });

  return (
    <group ref={rootRef} scale={prepared.scale}>
      <primitive object={prepared.object} />
    </group>
  );
}

function MoleculeOrbitControls({
  reducedMotion,
  active,
}: {
  reducedMotion: boolean;
  active: boolean;
}) {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [dragPaused, setDragPaused] = useState(false);
  const autoRotate = active && !reducedMotion && !dragPaused;

  useEffect(
    () => () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    },
    [],
  );

  const onDragStart = () => {
    setDragPaused(true);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
  };

  const onDragEnd = () => {
    if (reducedMotion) return;
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      setDragPaused(false);
    }, moleculeOrbit.idleResumeMs);
  };

  if (!active) return null;

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enableZoom={false}
      enablePan={false}
      enableDamping
      dampingFactor={moleculeOrbit.dampingFactor}
      rotateSpeed={moleculeOrbit.rotateSpeed}
      autoRotate={autoRotate}
      autoRotateSpeed={moleculeOrbit.autoRotateSpeed}
      onStart={onDragStart}
      onEnd={onDragEnd}
      minPolarAngle={Math.PI / 5}
      maxPolarAngle={(4 * Math.PI) / 5}
      target={moleculeOrbit.target}
      mouseButtons={{
        LEFT: THREE.MOUSE.ROTATE,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.ROTATE,
      }}
      touches={{
        ONE: THREE.TOUCH.ROTATE,
        TWO: THREE.TOUCH.DOLLY_PAN,
      }}
    />
  );
}

function CyclingMolecules({
  reducedMotion,
  onModelReady,
}: {
  reducedMotion: boolean;
  onModelReady?: () => void;
}) {
  const activeSlotRef = useRef(0);
  const modelIndexRef = useRef(0);
  const opacityARef = useRef(1);
  const opacityBRef = useRef(0);
  const renderOrderARef = useRef(1);
  const renderOrderBRef = useRef(0);
  const [dualSlotActive, setDualSlotActive] = useState(false);
  const [displayActive, setDisplayActive] = useState(false);

  const [slotUrls, setSlotUrls] = useState<[ModelUrl, ModelUrl]>([
    moleculeModels[0],
    moleculeModels[1],
  ]);

  const cycleRef = useRef({
    phase: "hold" as "hold" | "fadeOut" | "fadeIn",
    phaseStart: 0,
  });

  const handleFirstModelPrepared = useCallback(() => {
    setDisplayActive(true);
    onModelReady?.();
  }, [onModelReady]);

  useEffect(() => {
    cycleRef.current.phaseStart = performance.now();
  }, []);

  useFrame(() => {
    if (!displayActive) return;

    if (reducedMotion) {
      opacityARef.current = 1;
      opacityBRef.current = 0;
      return;
    }

    const cycle = cycleRef.current;
    const elapsed = performance.now() - cycle.phaseStart;
    const active = activeSlotRef.current;
    const incoming = active === 0 ? 1 : 0;

    if (cycle.phase === "hold") {
      if (active === 0) {
        opacityARef.current = 1;
        opacityBRef.current = 0;
        renderOrderARef.current = 1;
        renderOrderBRef.current = 0;
      } else {
        opacityARef.current = 0;
        opacityBRef.current = 1;
        renderOrderARef.current = 0;
        renderOrderBRef.current = 1;
      }

      if (elapsed >= moleculeCycle.holdMs) {
        cycle.phase = "fadeOut";
        cycle.phaseStart = performance.now();
        setDualSlotActive(true);
      }
      return;
    }

    if (cycle.phase === "fadeOut") {
      const t = smoothstep(Math.min(1, elapsed / moleculeCycle.fadeOutMs));
      const outgoingOpacity = 1 - t;

      if (active === 0) {
        opacityARef.current = outgoingOpacity;
        opacityBRef.current = 0;
        renderOrderARef.current = 1;
        renderOrderBRef.current = 0;
      } else {
        opacityARef.current = 0;
        opacityBRef.current = outgoingOpacity;
        renderOrderARef.current = 0;
        renderOrderBRef.current = 1;
      }

      if (t < 1) return;

      if (active === 0) {
        opacityARef.current = 0;
      } else {
        opacityBRef.current = 0;
      }

      cycle.phase = "fadeIn";
      cycle.phaseStart = performance.now();
      return;
    }

    const t = smoothstep(Math.min(1, elapsed / moleculeCycle.fadeInMs));
    const incomingOpacity = t;

    if (active === 0) {
      opacityARef.current = 0;
      opacityBRef.current = incomingOpacity;
      renderOrderARef.current = 0;
      renderOrderBRef.current = 1;
    } else {
      opacityARef.current = incomingOpacity;
      opacityBRef.current = 0;
      renderOrderARef.current = 1;
      renderOrderBRef.current = 0;
    }

    if (t < 1) return;

    const nextModelIndex = (modelIndexRef.current + 1) % moleculeModels.length;
    modelIndexRef.current = nextModelIndex;
    activeSlotRef.current = incoming;

    opacityARef.current = incoming === 0 ? 1 : 0;
    opacityBRef.current = incoming === 1 ? 1 : 0;
    renderOrderARef.current = incoming === 0 ? 1 : 0;
    renderOrderBRef.current = incoming === 1 ? 1 : 0;

    const hiddenSlot = incoming === 0 ? 1 : 0;
    const preloadIndex = (nextModelIndex + 1) % moleculeModels.length;

    setSlotUrls((prev) => {
      const next: [ModelUrl, ModelUrl] = [...prev];
      next[hiddenSlot] = moleculeModels[preloadIndex];
      return next;
    });

    cycle.phase = "hold";
    cycle.phaseStart = performance.now();
  });

  return (
    <>
      <Float {...(reducedMotion ? floatPropsReduced : floatProps)}>
        <group visible={displayActive} position={moleculeMotion.sceneOffset}>
          <MoleculeModel
            url={slotUrls[0]}
            opacityRef={opacityARef}
            renderOrderRef={renderOrderARef}
            onPrepared={handleFirstModelPrepared}
          />
          {dualSlotActive && !reducedMotion && (
            <MoleculeModel
              url={slotUrls[1]}
              opacityRef={opacityBRef}
              renderOrderRef={renderOrderBRef}
            />
          )}
        </group>
      </Float>
      <MoleculeOrbitControls reducedMotion={reducedMotion} active={displayActive} />
    </>
  );
}

interface HeroMoleculeSceneProps {
  onReady?: () => void;
}

export function HeroMoleculeScene({ onReady }: HeroMoleculeSceneProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <>
      <ambientLight intensity={0.88} color={moleculeColors.ambient} />
      <directionalLight position={[5, 7, 6]} intensity={0.58} color={moleculeColors.key} />
      <directionalLight position={[-4, 3, -3]} intensity={0.22} color={moleculeColors.fill} />
      <Suspense fallback={null}>
        <CyclingMolecules reducedMotion={reducedMotion} onModelReady={onReady} />
      </Suspense>
    </>
  );
}
