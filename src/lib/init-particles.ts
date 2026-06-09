import { loadSlim } from "@tsparticles/slim";

/** Single stable init callback — required by @tsparticles/react app-wide. */
export const initParticles = async (engine: Parameters<typeof loadSlim>[0]) => {
  await loadSlim(engine);
};
