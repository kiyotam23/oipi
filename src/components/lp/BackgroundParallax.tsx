"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { scrollParallaxOffset } from "@/hooks/useScrollParallax";

interface BackgroundParallaxProps {
  children: ReactNode;
}

/** Molecules drift up; speed accelerates as the page scrolls deeper. */
const MOLECULE_PARALLAX_SPEED = -1.2;
const MOLECULE_PARALLAX_ACCELERATION = 3;

export function BackgroundParallax({ children }: BackgroundParallaxProps) {
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    let raf = 0;

    const sync = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = innerRef.current;
        if (!el) return;
        const y = scrollParallaxOffset(
          window.scrollY,
          MOLECULE_PARALLAX_SPEED,
          MOLECULE_PARALLAX_ACCELERATION,
        );
        el.style.transform = `translate3d(0, ${y}px, 0)`;
      });
    };

    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    sync();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div
        ref={innerRef}
        className="absolute left-0 top-0 h-[200vh] w-full will-change-transform"
      >
        {children}
      </div>
    </div>
  );
}
