"use client";

import { useEffect, useMemo, useState } from "react";
import Particles from "@tsparticles/react";
import { particlesEnabled } from "@/lib/features";
import { particlesConfig } from "@/lib/particles-config";

export function ParticlesBackground() {
  const [enabled, setEnabled] = useState(particlesEnabled);

  useEffect(() => {
    if (!particlesEnabled) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setEnabled(!reducedMotion.matches);

    const onChange = () => setEnabled(!reducedMotion.matches);
    reducedMotion.addEventListener("change", onChange);
    return () => reducedMotion.removeEventListener("change", onChange);
  }, []);

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
