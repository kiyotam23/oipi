"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { moleculeCamera } from "@/lib/molecule-config";
import { visualPanelEdgeFade, visualPanelMask } from "@/lib/visual-panel-fade";
import { Hero3DErrorBoundary } from "./Hero3DErrorBoundary";
import { HeroMoleculeScene } from "./HeroMoleculeScene";

interface HeroMoleculeViewerProps {
  priority?: boolean;
  sizes?: string;
}

export function HeroMoleculeViewer({
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: HeroMoleculeViewerProps) {
  const [sceneReady, setSceneReady] = useState(false);
  const handleSceneReady = useCallback(() => setSceneReady(true), []);

  return (
    <Hero3DErrorBoundary>
      <div className="relative h-full w-full min-h-[inherit]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            WebkitMaskImage: visualPanelMask,
            maskImage: visualPanelMask,
            WebkitMaskComposite: "source-in",
            maskComposite: "intersect",
          }}
        >
          <Image
            src="/hero.png"
            alt=""
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover object-right"
          />
        </div>

        <div
          className="absolute inset-0 touch-none"
          style={{
            opacity: sceneReady ? 1 : 0,
            visibility: sceneReady ? "visible" : "hidden",
          }}
        >
          <Canvas
            camera={{ position: [...moleculeCamera.position], fov: moleculeCamera.fov }}
            dpr={[1, 2]}
            gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
            style={{ width: "100%", height: "100%", background: "transparent", cursor: "grab" }}
            onCreated={({ gl }) => {
              gl.domElement.style.touchAction = "none";
            }}
          >
            <HeroMoleculeScene onReady={handleSceneReady} />
          </Canvas>
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{ background: visualPanelEdgeFade }}
        />
      </div>
    </Hero3DErrorBoundary>
  );
}
