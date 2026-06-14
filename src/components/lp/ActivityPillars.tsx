"use client";

import type { TranslationContent } from "@/lib/i18n";
import type { Language } from "@/types/i18n";
import { card, type } from "@/lib/styles";
import { ProseText } from "./ProseText";
import { FadeInSection } from "./FadeInSection";
import { Section } from "./Section";
import { SectionHeader } from "./SectionHeader";

interface ActivityPillarsProps {
  lang: Language;
  t: TranslationContent;
}

export function ActivityPillars({ lang, t }: ActivityPillarsProps) {
  return (
    <Section id="activities" tone="sage">
      <SectionHeader
        lang={lang}
        label={t.activities.sectionLabel}
        title={t.activities.title}
        intro={t.activities.intro || undefined}
        mobileBackdrop="none"
      />

      <div className="grid min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {t.activities.items.map((item, i) => (
            <FadeInSection key={i} delay={i * 0.06}>
              <div className={`flex h-full min-w-0 flex-col ${card.paddedSm}`}>
                <h3 className={`${type.cardHeading} mb-2`}>
                  <ProseText lang={lang}>{item.title}</ProseText>
                </h3>
                <p className={type.proseBody}>
                  <ProseText lang={lang}>{item.description}</ProseText>
                </p>
              </div>
            </FadeInSection>
        ))}
      </div>

      <FadeInSection delay={0.4} className="mt-12">
        <div className={card.paddedCenter}>
          <p className={type.proseBody}>
            <ProseText lang={lang}>{t.activities.compliance}</ProseText>
          </p>
        </div>
      </FadeInSection>
    </Section>
  );
}
