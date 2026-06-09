"use client";

import type { ReactNode } from "react";
import { ParticlesProvider } from "@tsparticles/react";
import { initParticles } from "@/lib/init-particles";

interface ParticlesProviderRootProps {
  children: ReactNode;
}

export function ParticlesProviderRoot({ children }: ParticlesProviderRootProps) {
  return <ParticlesProvider init={initParticles}>{children}</ParticlesProvider>;
}
