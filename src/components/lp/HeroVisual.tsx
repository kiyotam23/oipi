"use client";

import { ImageVisualPanel } from "./ImageVisualPanel";

export const HERO_BG_SRC = "/hero-bg.png";

interface HeroVisualProps {
  layout?: "split" | "stacked";
}

export function HeroVisual({ layout = "split" }: HeroVisualProps) {
  return (
    <ImageVisualPanel
      src={HERO_BG_SRC}
      layout={layout}
      sizes={layout === "stacked" ? "100vw" : "min(920px, 50vw)"}
      priority
    />
  );
}
