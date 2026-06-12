"use client";

import { useEffect } from "react";
import { preload } from "react-dom";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useMounted } from "@/hooks/useMounted";
import { useSectionRect } from "@/hooks/useSectionRect";
import { HERO_BG_SRC, HeroVisual } from "./HeroVisual";

/** Hero image clipped to #about — scrolls with the section, not parallax. */
export function HeroBackgroundImage() {
  const rect = useSectionRect("about");
  const mounted = useMounted();
  const isXl = useMediaQuery("(min-width: 1280px)");

  useEffect(() => {
    preload(HERO_BG_SRC, { as: "image", fetchPriority: "high" });
  }, []);

  if (!rect || !mounted) return null;

  if (isXl) {
    return (
      <div
        className="pointer-events-none fixed right-0 z-0 overflow-hidden"
        style={{
          top: rect.top,
          height: rect.height,
          width: "clamp(460px, 50vw, 920px)",
        }}
        aria-hidden
      >
        <HeroVisual />
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none fixed inset-x-0 z-0 overflow-hidden"
      style={{ top: rect.top, height: rect.height }}
      aria-hidden
    >
      <div className="absolute inset-x-0 top-20 h-56 sm:h-64 md:h-72">
        <HeroVisual layout="stacked" />
      </div>
    </div>
  );
}
