"use client";

import type { TranslationContent } from "@/lib/i18n";
import type { Language } from "@/types/i18n";
import { type } from "@/lib/styles";
import { ProseText } from "./ProseText";
import { FadeInSection } from "./FadeInSection";
import { Section } from "./Section";
import { SectionHeader } from "./SectionHeader";

interface MissionSectionProps {
  lang: Language;
  t: TranslationContent;
}

export function MissionSection({ lang, t }: MissionSectionProps) {
  return (
    <Section tone="sage" width="sm" center>
      <SectionHeader
        lang={lang}
        label={t.mission.sectionLabel}
        title={t.mission.title}
        titleSpacing="spacious"
        variant="plain"
      />

      <FadeInSection delay={0.1} className="space-y-6">
        <p className={type.proseLead}>
          <ProseText lang={lang}>{t.mission.goal1}</ProseText>
        </p>
        <p className={type.proseLead}>
          <ProseText lang={lang}>{t.mission.goal2}</ProseText>
        </p>
        <p className={type.proseBody}>
          <ProseText lang={lang}>{t.mission.goal3}</ProseText>
        </p>
        <p className={type.proseBody}>
          <ProseText lang={lang}>{t.mission.closing1}</ProseText>
        </p>
        <p className={type.proseBody}>
          <ProseText lang={lang}>{t.mission.closing2}</ProseText>
        </p>
      </FadeInSection>
    </Section>
  );
}
