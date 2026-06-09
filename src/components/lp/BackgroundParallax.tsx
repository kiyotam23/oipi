"use client";

import type { ReactNode } from "react";
import { useScrollParallax } from "@/hooks/useScrollParallax";

interface BackgroundParallaxProps {
  children: ReactNode;
}

/** Wraps particle + overlay layers with gentle scroll parallax. */
export function BackgroundParallax({ children }: BackgroundParallaxProps) {
  const y = useScrollParallax(0.06);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute -top-[12vh] left-0 h-[124vh] w-full"
        style={{
          transform: `translate3d(0, ${y}px, 0)`,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}
