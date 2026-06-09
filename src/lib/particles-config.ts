import type { ISourceOptions } from "@tsparticles/engine";

/** Particles config tuned for OPI sage-green palette (transparent bg). */
export const particlesConfig: ISourceOptions = {
  fullScreen: { enable: false },
  background: {
    color: { value: "transparent" },
  },
  fpsLimit: 60,
  particles: {
    number: {
      value: 120,
      density: { enable: true, width: 800, height: 800 },
    },
    color: { value: "#3d574f" },
    shape: { type: "circle" },
    opacity: {
      value: { min: 0.15, max: 0.35 },
    },
    size: {
      value: { min: 1, max: 3 },
    },
    links: {
      enable: true,
      distance: 150,
      color: "#7c958d",
      opacity: 0.2,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.8,
      direction: "none",
      random: false,
      straight: false,
      outModes: { default: "out" },
    },
  },
  interactivity: {
    detectsOn: "window",
    events: {
      onHover: { enable: true, mode: "grab" },
      onClick: { enable: true, mode: "push" },
      resize: { enable: true },
    },
    modes: {
      grab: {
        distance: 100,
        links: {
          opacity: 0.65,
          color: "#FF7A00",
        },
      },
      push: { quantity: 3 },
    },
  },
  detectRetina: true,
};

/** Same palette/links as page background, tuned for the hero canvas size. */
export const heroOverlayParticlesConfig: ISourceOptions = {
  ...particlesConfig,
  particles: {
    ...particlesConfig.particles,
    number: {
      value: 65,
      density: { enable: true, width: 500, height: 500 },
    },
  },
};
