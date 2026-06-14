"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface SageBand {
  id: string;
  top: number;
  height: number;
}

/** Full-width sage fills below molecule SVGs, synced to sage sections on scroll (desktop only). */
export function SageSectionBackgrounds() {
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const [bands, setBands] = useState<SageBand[]>([]);

  useEffect(() => {
    if (!isDesktop) {
      setBands([]);
      return;
    }

    let raf = 0;

    const sync = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const sections = document.querySelectorAll<HTMLElement>("[data-sage-bg]");
        setBands(
          Array.from(sections).map((el, index) => {
            const rect = el.getBoundingClientRect();
            return {
              id: el.id || `sage-${index}`,
              top: rect.top,
              height: rect.height,
            };
          }),
        );
      });
    };

    const observeSections = () => {
      observer.disconnect();
      document.querySelectorAll<HTMLElement>("[data-sage-bg]").forEach((el) => {
        observer.observe(el);
      });
      sync();
    };

    const observer = new ResizeObserver(sync);

    observeSections();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);

    const mutation = new MutationObserver(observeSections);
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      observer.disconnect();
      mutation.disconnect();
    };
  }, [isDesktop]);

  if (!isDesktop || bands.length === 0) return null;

  return (
    <>
      {bands.map((band) => (
        <div
          key={band.id}
          className="pointer-events-none fixed inset-x-0 z-0 bg-sage"
          style={{ top: band.top, height: band.height }}
          aria-hidden
        />
      ))}
    </>
  );
}
