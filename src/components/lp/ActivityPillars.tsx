"use client";

import {
  GlobeHemisphereWest,
  GraduationCap,
  Atom,
  Eye,
  ShareNetwork,
  Megaphone,
  ShieldCheck,
} from "@phosphor-icons/react";
import type { TranslationContent } from "@/lib/i18n";
import type { Language } from "@/types/i18n";
import { color } from "@/lib/colors";
import { card, iconCushionOrangeClass, type } from "@/lib/styles";
import { ProseText } from "./ProseText";
import { FadeInSection } from "./FadeInSection";
import { Section } from "./Section";
import { SectionHeader } from "./SectionHeader";

interface ActivityPillarsProps {
  lang: Language;
  t: TranslationContent;
}

const icons = [
  GlobeHemisphereWest,
  GraduationCap,
  Atom,
  Eye,
  ShareNetwork,
  Megaphone,
  ShieldCheck,
];

const iconProps = {
  size: 24,
  weight: "thin" as const,
  className: color.text.label,
};

export function ActivityPillars({ lang, t }: ActivityPillarsProps) {
  return (
    <Section id="activities" tone="sage">
      <SectionHeader
        lang={lang}
        label={t.activities.sectionLabel}
        title={t.activities.title}
        intro={t.activities.intro || undefined}
      />

      <div className="grid min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {t.activities.items.map((item, i) => {
          const Icon = icons[i];
          return (
            <FadeInSection key={i} delay={i * 0.06}>
              <div className={`flex h-full min-w-0 flex-col ${card.paddedSm}`}>
                <div className={iconCushionOrangeClass}>
                  <Icon {...iconProps} />
                </div>
                <h3 className={type.cardTitleSm}>
                  <ProseText lang={lang}>{item.title}</ProseText>
                </h3>
                <p className={type.proseSm}>
                  <ProseText lang={lang}>{item.description}</ProseText>
                </p>
              </div>
            </FadeInSection>
          );
        })}
      </div>

      <FadeInSection delay={0.4} className="mt-12">
        <div className={card.paddedCenter}>
          <p className={type.proseSmAccent}>
            <ProseText lang={lang}>{t.activities.compliance}</ProseText>
          </p>
        </div>
      </FadeInSection>
    </Section>
  );
}
