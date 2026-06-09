import { color } from "./colors";

/** Page section spacing and containers */
export const layout = {
  section: "relative px-6 py-24",
  sectionSage: `relative px-6 py-24 ${color.bg.sage}`,
  sectionHeader: "mb-16 text-center",
  container: {
    sm: "mx-auto max-w-3xl min-w-0",
    md: "mx-auto max-w-4xl min-w-0",
    lg: "mx-auto max-w-6xl min-w-0",
  },
} as const;

/** Typography scale */
export const type = {
  sectionTitle: `text-2xl font-light sm:text-3xl ${color.text.main}`,
  sectionTitleMb: {
    default: "mb-6",
    spacious: "mb-12",
    founder: "mb-10",
  },
  sectionIntro: `lead-pretty mx-auto max-w-2xl text-base leading-relaxed ${color.text.muted}`,
  sectionIntroWide: `lead-pretty mx-auto max-w-3xl text-base leading-relaxed ${color.text.muted}`,
  proseBody: `lead-pretty text-base leading-relaxed ${color.text.muted}`,
  proseBodyEmphasis: `lead-pretty text-base leading-relaxed ${color.text.main}`,
  proseLead: `lead-pretty text-lg leading-relaxed ${color.text.main}`,
  proseSm: `lead-pretty text-sm leading-relaxed ${color.text.muted}`,
  proseSmAccent: `lead-pretty text-sm font-medium leading-relaxed ${color.text.accent}`,
  cardTitle: `heading-balance text-xl font-medium ${color.text.main}`,
  cardTitleSm: `heading-balance mb-2 text-sm font-semibold tracking-tight ${color.text.main}`,
  stepSubtitle: `mb-1 text-xs font-semibold tracking-widest uppercase ${color.text.accent}`,
  closing: `heading-balance text-xl font-light tracking-wide ${color.text.muted}`,
} as const;

/** Card surfaces */
export const card = {
  base: "rounded-lg bg-white",
  padded: "rounded-lg bg-white p-8",
  paddedSm: "rounded-lg bg-white p-7",
  paddedCenter: "rounded-lg bg-white px-6 py-5 text-center",
  bordered: "rounded-lg border border-slate-100 bg-white p-10 sm:p-14",
} as const;

/** Section label above headings */
export const inlineSectionLabelClass =
  "text-xs font-semibold tracking-[0.25em] text-label/95 uppercase";

export const sectionLabelClass = `mb-3 ${inlineSectionLabelClass}`;

/** Orange icon styling (shared with Three Levels) */
export const orangeIconClass = "text-label bg-gold-light border-label/20";

/** Icon cushion — orange (h-12, Core Process / Activity Pillars) */
export const iconCushionOrangeClass =
  `mb-5 flex h-12 w-12 items-center justify-center rounded-full border ${orangeIconClass}`;

/** Icon cushion — sage green (legacy) */
export const iconCushionClass =
  "mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-sage-light";

/** Three Levels icon cushion (h-14) */
export const levelIconCushionClass =
  `flex h-14 w-14 shrink-0 items-center justify-center rounded-full border ${orangeIconClass}`;
