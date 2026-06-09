/**
 * Semantic Tailwind class names for brand colors.
 * Hex values are defined once in globals.css (:root / @theme).
 */
export const color = {
  text: {
    main: "text-text",
    muted: "text-text/70",
    subtle: "text-text/50",
    navy: "text-navy",
    accent: "text-accent",
    label: "text-label",
    labelMuted: "text-label/95",
    goldDark: "text-gold-dark",
  },
  bg: {
    sage: "bg-sage",
    sageLight: "bg-sage-light",
    accent: "bg-accent",
    gold: "bg-gold",
    goldLight: "bg-gold-light",
    goldPale: "bg-gold-pale",
  },
  border: {
    sage: "border-sage-border",
  },
} as const;
