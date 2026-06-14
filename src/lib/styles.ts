import { color } from "./colors";

/** Page section spacing and containers */
export const layout = {
  section: "relative px-6 py-24",
  sectionHeader: "mb-16 text-center",
  container: {
    sm: "mx-auto max-w-3xl min-w-0",
    md: "mx-auto max-w-4xl min-w-0",
    lg: "mx-auto max-w-6xl min-w-0",
  },
  introMax: {
    default: "max-w-2xl",
    wide: "max-w-3xl",
  },
} as const;

/**
 * Typography — semantic roles
 * - Section chrome: title, intro
 * - Prose: lead (emphasis) + body (main text)
 * - Card: label, heading
 * - UI: meta, caption, nav
 */
export const type = {
  display: `heading-balance text-3xl font-light leading-tight tracking-tight text-text sm:text-4xl md:text-5xl`,
  heroEyebrow: "text-sm tracking-[0.2em] text-text/70 uppercase",
  sectionTitle: `text-2xl font-light sm:text-3xl ${color.text.main}`,
  sectionTitleMb: {
    default: "mb-6",
    spacious: "mb-12",
    founder: "mb-10",
  },
  sectionIntro: `lead-pretty text-base leading-relaxed ${color.text.muted}`,
  proseLead: `lead-pretty text-lg leading-relaxed ${color.text.main}`,
  proseBody: `lead-pretty text-base leading-relaxed ${color.text.muted}`,
  cardLabel: `mb-1 text-xs font-semibold tracking-widest uppercase ${color.text.accent}`,
  cardHeading: `heading-balance text-base font-medium ${color.text.main}`,
  meta: "text-sm text-text/70",
  metaSubtle: "text-sm text-text/50",
  caption: "text-xs tracking-widest text-text/50",
  navLink: "text-sm font-medium tracking-wide text-text/75 transition-colors hover:text-text",
  button: "text-sm font-semibold tracking-wide",
} as const;

/** Soft horizontal + vertical fade for section backdrops (use on absolute bg layer, not text). */
export const softEdgeMask =
  "[mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_72%,transparent_100%),linear-gradient(to_bottom,transparent_0%,black_6%,black_94%,transparent_100%)] [-webkit-mask-composite:source-in] [mask-composite:intersect]";

export const heroSoftBackdrop = `pointer-events-none absolute inset-0 hidden bg-white xl:block ${softEdgeMask}`;

/** Mobile hero: soft white wash fading to transparent (no card edges or shadow). */
export const heroMobileSoftMask =
  "[mask-image:linear-gradient(to_right,transparent_0%,black_6%,black_94%,transparent_100%),linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] [-webkit-mask-composite:source-in] [mask-composite:intersect]";

export const heroMobileBackdrop = `pointer-events-none absolute -inset-x-3 inset-y-0 z-0 block bg-white xl:hidden ${heroMobileSoftMask}`;

export const sageSoftBackdrop = `pointer-events-none absolute inset-0 hidden bg-sage xl:block ${softEdgeMask}`;

/** Per-element backdrop on mobile/tablet; section-level fills use xl: variants instead. */
export const mobileTextBackdrop =
  "rounded-lg bg-white/92 px-3 py-2 shadow-sm xl:rounded-none xl:bg-transparent xl:px-0 xl:py-0 xl:shadow-none";

export const mobileSageTextBackdrop =
  "rounded-lg bg-sage/95 px-3 py-2 xl:rounded-none xl:bg-transparent xl:px-0 xl:py-0";

export const mobileBlockBackdrop =
  "rounded-lg bg-white/92 px-4 py-3 shadow-sm xl:rounded-none xl:bg-transparent xl:px-0 xl:py-0 xl:shadow-none";

export const mobileSageBlockBackdrop =
  "rounded-lg bg-sage/95 px-4 py-3 xl:rounded-none xl:bg-transparent xl:px-0 xl:py-0";

/** Card surfaces */
export const card = {
  padded: "rounded-lg bg-white p-8",
  paddedSm: "rounded-lg bg-white p-7",
  paddedCenter: "rounded-lg bg-white px-6 py-5 text-center",
  bordered: "rounded-lg border border-slate-100 bg-white p-10 sm:p-14",
} as const;

/** Section label above headings */
export const inlineSectionLabelClass =
  "text-xs font-semibold tracking-[0.25em] text-label/95 uppercase";

export const sectionLabelClass = `mb-3 ${inlineSectionLabelClass}`;

/** Orange icon styling (Three Levels) */
export const orangeIconClass = "text-label bg-gold-light border-label/20";

/** Three Levels icon cushion */
export const levelIconCushionClass =
  `flex h-14 w-14 shrink-0 items-center justify-center rounded-full border ${orangeIconClass}`;
