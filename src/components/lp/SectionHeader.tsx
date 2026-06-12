"use client";

import type { Language } from "@/types/i18n";
import { cn } from "@/lib/cn";
import { layout, sectionLabelClass, textBgSage, type } from "@/lib/styles";
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
  textBg?: boolean;
  textBgClass?: string;
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
  textBg = false,
  textBgClass: textBgClassProp,
  className,
}: SectionHeaderProps) {
  const textBgClass = textBg ? (textBgClassProp ?? textBgSage) : undefined;
  const introClass = cn(
    type.sectionIntro,
    "mx-auto",
    layout.introMax[introWidth === "3xl" ? "wide" : "default"],
  );

  return (
    <FadeInSection
      className={cn(variant === "standard" && layout.sectionHeader, className)}
    >
      <p className={sectionLabelClass}>
        {textBgClass ? <span className={textBgClass}>{label}</span> : label}
      </p>
      <SectionTitle
        lang={lang}
        className={cn(type.sectionTitleMb[titleSpacing], type.sectionTitle)}
        textBgClassName={textBgClass}
      >
        {title}
      </SectionTitle>
      {intro && (
        <p className={introClass}>
          <ProseText lang={lang} className={textBgClass}>
            {intro}
          </ProseText>
        </p>
      )}
    </FadeInSection>
  );
}
