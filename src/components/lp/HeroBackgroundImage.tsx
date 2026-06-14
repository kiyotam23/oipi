"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useMounted } from "@/hooks/useMounted";
import { useSectionRect } from "@/hooks/useSectionRect";
import { heroBackgroundImageEnabled } from "@/lib/features";
import { HeroNetworkVisual } from "./HeroNetworkVisual";
import { HeroVisual } from "./HeroVisual";

/** Hero visual clipped to #about — desktop right panel only. */
export function HeroBackgroundImage() {
  const rect = useSectionRect("about");
  const mounted = useMounted();
  const isXl = useMediaQuery("(min-width: 1280px)");

  if (!rect || !mounted || !isXl) return null;

  const Visual = heroBackgroundImageEnabled ? HeroVisual : HeroNetworkVisual;

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
      <Visual />
    </div>
  );
}
