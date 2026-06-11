"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { moleculeCamera } from "@/lib/molecule-config";
import {
  visualPanelEdgeFade,
  visualPanelEdgeFadeStacked,
  visualPanelMask,
  visualPanelMaskStacked,
} from "@/lib/visual-panel-fade";
import { Hero3DErrorBoundary } from "./Hero3DErrorBoundary";
import { HeroMoleculeScene } from "./HeroMoleculeScene";

interface HeroMoleculeViewerProps {
  priority?: boolean;
  sizes?: string;
  layout?: "split" | "stacked";
}

export function HeroMoleculeViewer({
  priority = false,
  sizes = "(min-width: 1280px) 50vw, 100vw",
  layout = "split",
}: HeroMoleculeViewerProps) {
  const mask = layout === "stacked" ? visualPanelMaskStacked : visualPanelMask;
  const edgeFade = layout === "stacked" ? visualPanelEdgeFadeStacked : visualPanelEdgeFade;
  const [sceneReady, setSceneReady] = useState(false);
  const handleSceneReady = useCallback(() => setSceneReady(true), []);

  return (
    <Hero3DErrorBoundary>
      <div className="relative h-full w-full min-h-[inherit]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            WebkitMaskImage: mask,
            maskImage: mask,
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
            className={layout === "stacked" ? "object-cover object-center" : "object-cover object-right"}
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
          style={{ background: edgeFade }}
        />
      </div>
    </Hero3DErrorBoundary>
  );
}
