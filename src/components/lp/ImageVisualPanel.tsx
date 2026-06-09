"use client";

import Image from "next/image";
import { AreaParticlesOverlay } from "./AreaParticlesOverlay";

const imageMask = [
  "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 12%, black 28%, black 100%)",
  "linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)",
].join(", ");

const whiteEdgeFade = [
  "linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0.92) 5%, rgba(255,255,255,0.4) 16%, transparent 34%)",
  "linear-gradient(to top, #FFFFFF 0%, rgba(255,255,255,0.55) 6%, transparent 14%)",
  "linear-gradient(to bottom, #FFFFFF 0%, rgba(255,255,255,0.45) 6%, transparent 14%)",
].join(", ");

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
          WebkitMaskImage: imageMask,
          maskImage: imageMask,
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
        style={{ background: whiteEdgeFade }}
      />

      <div className="pointer-events-none absolute inset-0">
        <AreaParticlesOverlay id={particleId} />
      </div>
    </div>
  );
}
