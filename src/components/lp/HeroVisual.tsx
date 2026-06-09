"use client";

import { ImageVisualPanel } from "./ImageVisualPanel";

export function HeroVisual() {
  return (
    <ImageVisualPanel
      src="/hero.png"
      particleId="tsparticles-hero"
      sizes="(min-width: 1024px) 58vw, 100vw"
      priority
    />
  );
}
