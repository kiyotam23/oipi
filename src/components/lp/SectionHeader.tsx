"use client";

import type { Language } from "@/types/i18n";
import { cn } from "@/lib/cn";
import { layout, mobileBlockBackdrop, mobileSageBlockBackdrop, sectionLabelClass, type } from "@/lib/styles";
import { FadeInSection } from "./FadeInSection";
import { ProseText, SectionTitle } from "./ProseText";

type TitleSpacing = keyof typeof type.sectionTitleMb;
type IntroWidth = "2xl" | "3xl";

interface SectionHeaderProps {
  lang: Language;
  label: string;
  title: string;
  intro?: string;
  introWidth?: IntroWidth;
  titleSpacing?: TitleSpacing;
  /** standard: mb-16 header block / plain: no outer spacing */
  variant?: "standard" | "plain";
  /** Element-level backdrop below xl; sage sections use sage tint */
  mobileBackdrop?: "white" | "sage" | "none";
  className?: string;
}

export function SectionHeader({
  lang,
  label,
  title,
  intro,
  introWidth = "2xl",
  titleSpacing = "default",
  variant = "standard",
  mobileBackdrop = "white",
  className,
}: SectionHeaderProps) {
  const introClass = cn(
    type.sectionIntro,
    "mx-auto",
    layout.introMax[introWidth === "3xl" ? "wide" : "default"],
  );
  const backdrop =
    mobileBackdrop === "sage"
      ? mobileSageBlockBackdrop
      : mobileBackdrop === "white"
        ? mobileBlockBackdrop
        : "";

  return (
    <FadeInSection
      className={cn(variant === "standard" && layout.sectionHeader, className)}
    >
      <p className={cn(sectionLabelClass, backdrop)}>{label}</p>
      <SectionTitle
        lang={lang}
        className={cn(type.sectionTitleMb[titleSpacing], type.sectionTitle, backdrop)}
      >
        {title}
      </SectionTitle>
      {intro && (
        <p className={cn(introClass, backdrop)}>
          <ProseText lang={lang}>{intro}</ProseText>
        </p>
      )}
    </FadeInSection>
  );
}
