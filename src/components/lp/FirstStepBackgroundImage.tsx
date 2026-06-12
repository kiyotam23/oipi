"use client";

import { useElementRect } from "@/hooks/useElementRect";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useMounted } from "@/hooks/useMounted";
import { useSectionRect } from "@/hooks/useSectionRect";
import { ImageVisualPanel } from "./ImageVisualPanel";

const IMAGE = "/our_first_step.png";

/** First-step image clipped to #first-step — behind molecules, scrolls with section. */
export function FirstStepBackgroundImage() {
  const section = useSectionRect("first-step");
  const mobileSlot = useElementRect("[data-first-step-mobile-visual]");
  const mounted = useMounted();
  const isLg = useMediaQuery("(min-width: 1024px)");

  if (!section || !mounted) return null;

  if (isLg) {
    return (
      <div
        className="pointer-events-none fixed right-0 z-0 overflow-hidden"
        style={{
          top: section.top,
          height: section.height,
          width: "clamp(340px, 50vw, 780px)",
        }}
        aria-hidden
      >
        <ImageVisualPanel src={IMAGE} sizes="min(780px, 50vw)" />
      </div>
    );
  }

  if (!mobileSlot) return null;

  return (
    <div
      className="pointer-events-none fixed z-0 overflow-hidden"
      style={{
        top: mobileSlot.top,
        left: mobileSlot.left,
        width: mobileSlot.width,
        height: mobileSlot.height,
      }}
      aria-hidden
    >
      <ImageVisualPanel
        src={IMAGE}
        layout="stacked"
        sizes={`${Math.ceil(mobileSlot.width)}px`}
      />
    </div>
  );
}
