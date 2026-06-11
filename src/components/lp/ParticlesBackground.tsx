"use client";

import { useMemo } from "react";
import Particles from "@tsparticles/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { particlesEnabled } from "@/lib/features";
import { particlesConfig } from "@/lib/particles-config";

export function ParticlesBackground() {
  const reducedMotion = usePrefersReducedMotion();
  const enabled = particlesEnabled && !reducedMotion;
  const options = useMemo(() => particlesConfig, []);

  if (!enabled) return null;

  return (
    <div id="particles-js" className="absolute inset-0 overflow-hidden" aria-hidden>
      <Particles
        id="tsparticles-bg"
        className="absolute inset-0 h-full w-full"
        options={options}
      />
    </div>
  );
}
