/** Two-tone grayscale for ball-and-stick models. */
export const moleculeGrays = {
  atom: "#ababab",
  bond: "#8f8f8f",
} as const;

/** Scene lighting tuned for CPK ball-and-stick models. */
export const moleculeColors = {
  ambient: "#F5F5F5",
  key: "#FFFFFF",
  fill: "#E8E8E8",
} as const;

export const moleculeMaterial = {
  atom: { metalness: 0.06, roughness: 0.52 },
} as const;
