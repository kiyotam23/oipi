"use client";

import {
  visualPanelEdgeFade,
  visualPanelEdgeFadeStacked,
  visualPanelMask,
  visualPanelMaskStacked,
} from "@/lib/visual-panel-fade";
import { DmnNetworkCanvas } from "./DmnNetworkCanvas";

interface HeroNetworkVisualProps {
  layout?: "split" | "stacked";
}

export function HeroNetworkVisual({ layout = "split" }: HeroNetworkVisualProps) {
  const mask = layout === "stacked" ? visualPanelMaskStacked : visualPanelMask;
  const edgeFade = layout === "stacked" ? visualPanelEdgeFadeStacked : visualPanelEdgeFade;

  return (
    <div className="relative h-full w-full min-h-[inherit]" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          WebkitMaskImage: mask,
          maskImage: mask,
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
        }}
      >
        <DmnNetworkCanvas />
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: edgeFade }}
      />
    </div>
  );
}
