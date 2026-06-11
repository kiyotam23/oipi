/** 3D molecule viewer — models, colors, timing. */
export const moleculeModels = [
  "/models/Ketamine-bas-color-print.glb",
  "/models/LSD-bas-color-print.glb",
  "/models/MDMA-bas-color-print.glb",
  "/models/Psilocybine-bas-color-print.glb",
] as const;

/** ~10s per model: hold then crossfade to next. */
export const moleculeCycle = {
  holdMs: 8200,
  fadeMs: 2400,
} as const;

export const moleculeMotion = {
  /** Applied after bbox normalization */
  scale: 0.42,
  /** Target max dimension (world units) before scale multiplier */
  fitTargetSize: 4.2,
  /** Scene-space nudge after bbox centering — keep at 0 unless fine-tuning */
  sceneOffset: [0, 0, 0] as const,
} as const;

/** Fixed camera — y at 0 keeps the model vertically centered in the canvas. */
export const moleculeCamera = {
  position: [0.45, 0, 9.5] as const,
  fov: 34,
} as const;

/** OrbitControls — drag-to-orbit; auto-rotate when idle. */
export const moleculeOrbit = {
  target: [0, 0, 0] as const,
  autoRotateSpeed: 0.55,
  rotateSpeed: 0.85,
  dampingFactor: 0.06,
  /** Resume auto-rotate after user stops dragging */
  idleResumeMs: 3000,
} as const;
