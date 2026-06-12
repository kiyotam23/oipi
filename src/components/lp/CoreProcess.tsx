"use client";

import { motion } from "framer-motion";
import type { TranslationContent } from "@/lib/i18n";
import type { Language } from "@/types/i18n";
import { card, type } from "@/lib/styles";
import { ProseText } from "./ProseText";
import { FadeInSection } from "./FadeInSection";
import { Section } from "./Section";
import { SectionHeader } from "./SectionHeader";

interface CoreProcessProps {
  lang: Language;
  t: TranslationContent;
}

export function CoreProcess({ lang, t }: CoreProcessProps) {
  return (
    <Section id="process" tone="sage" containerClassName="bg-sage">
      <SectionHeader
        lang={lang}
        label={t.coreProcess.sectionLabel}
        title={t.coreProcess.title}
        intro={t.coreProcess.lead}
      />

      <div className="mb-12 grid min-w-0 gap-6 md:grid-cols-3">
        {t.coreProcess.steps.map((step, i) => (
            <FadeInSection key={step.key} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className={`group h-full min-w-0 ${card.padded}`}
              >
                <p className={type.cardLabel}>{step.subtitle}</p>
                <h3 className={`${type.cardHeading} mb-3`}>
                  <ProseText lang={lang}>{step.title}</ProseText>
                </h3>
                <p className={type.proseBody}>
                  <ProseText lang={lang}>{step.description}</ProseText>
                </p>
              </motion.div>
            </FadeInSection>
        ))}
      </div>

      <FadeInSection delay={0.3}>
        <p className={`${type.proseBody} mx-auto max-w-3xl text-center`}>
          <ProseText lang={lang}>{t.coreProcess.description}</ProseText>
        </p>
      </FadeInSection>
    </Section>
  );
}
