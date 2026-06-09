"use client";

import type { Language } from "@/types/i18n";
import { cn } from "@/lib/cn";
import { layout, sectionLabelClass, type } from "@/lib/styles";
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
  className,
}: SectionHeaderProps) {
  const introClass =
    introWidth === "3xl" ? type.sectionIntroWide : type.sectionIntro;

  return (
    <FadeInSection
      className={cn(variant === "standard" && layout.sectionHeader, className)}
    >
      <p className={sectionLabelClass}>{label}</p>
      <SectionTitle
        lang={lang}
        className={cn(type.sectionTitleMb[titleSpacing], type.sectionTitle)}
      >
        {title}
      </SectionTitle>
      {intro && (
        <p className={introClass}>
          <ProseText lang={lang}>{intro}</ProseText>
        </p>
      )}
    </FadeInSection>
  );
}
