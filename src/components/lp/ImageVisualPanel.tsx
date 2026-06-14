"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import {
  visualPanelEdgeFade,
  visualPanelEdgeFadeStacked,
  visualPanelMask,
  visualPanelMaskStacked,
} from "@/lib/visual-panel-fade";

interface ImageVisualPanelProps {
  src: string;
  sizes?: string;
  priority?: boolean;
  layout?: "split" | "stacked";
}

function PanelImage({
  src,
  sizes,
  priority,
}: Pick<ImageVisualPanelProps, "src" | "sizes" | "priority">) {
  const [ready, setReady] = useState(false);

  return (
    <Image
      src={src}
      alt=""
      fill
      priority={priority}
      sizes={sizes}
      onLoad={() => setReady(true)}
      className={cn(
        "object-cover object-right transition-opacity duration-150",
        ready ? "opacity-100" : "opacity-0",
      )}
    />
  );
}

export function ImageVisualPanel({
  src,
  sizes = "(min-width: 1024px) 58vw, 100vw",
  priority = false,
  layout = "split",
}: ImageVisualPanelProps) {
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
        <PanelImage key={src} src={src} sizes={sizes} priority={priority} />
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: edgeFade }}
      />
    </div>
  );
}
