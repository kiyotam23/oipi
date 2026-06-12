"use client";

import type { ReactNode } from "react";
import { useScrollParallax } from "@/hooks/useScrollParallax";

interface BackgroundParallaxProps {
  children: ReactNode;
}

/** Molecules drift up; speed accelerates as the page scrolls deeper. */
const MOLECULE_PARALLAX_SPEED = -1.2;
const MOLECULE_PARALLAX_ACCELERATION = 3;

export function BackgroundParallax({ children }: BackgroundParallaxProps) {
  const y = useScrollParallax(MOLECULE_PARALLAX_SPEED, MOLECULE_PARALLAX_ACCELERATION);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute left-0 top-0 h-[200vh] w-full"
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
