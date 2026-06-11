"use client";

import Image from "next/image";
import { visualPanelEdgeFade, visualPanelMask } from "@/lib/visual-panel-fade";
import { AreaParticlesOverlay } from "./AreaParticlesOverlay";

interface ImageVisualPanelProps {
  src: string;
  particleId: string;
  sizes?: string;
  priority?: boolean;
}

export function ImageVisualPanel({
  src,
  particleId,
  sizes = "(min-width: 1024px) 58vw, 100vw",
  priority = false,
}: ImageVisualPanelProps) {

  return (
    <div className="relative h-full w-full min-h-[inherit]" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          WebkitMaskImage: visualPanelMask,
          maskImage: visualPanelMask,
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
        }}
      >
        <Image
          src={src}
          alt=""
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover object-right"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: visualPanelEdgeFade }}
      />

      <div className="pointer-events-none absolute inset-0">
        <AreaParticlesOverlay id={particleId} />
      </div>
    </div>
  );
}
