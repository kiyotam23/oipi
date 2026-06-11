"use client";

import { motion } from "framer-motion";
import type { TranslationContent } from "@/lib/i18n";
import type { Language } from "@/types/i18n";
import { type } from "@/lib/styles";
import { ProseText } from "./ProseText";
import { FadeInSection } from "./FadeInSection";
import { HeroVisual } from "./HeroVisual";

interface HeroSectionProps {
  lang: Language;
  t: TranslationContent;
}

export function HeroSection({ lang, t }: HeroSectionProps) {
  return (
    <section id="about" className="relative overflow-hidden pb-24 pt-20">
      <div className="relative">
        <div
          className="pointer-events-auto absolute inset-y-0 right-0 z-20 hidden w-[clamp(420px,50vw,920px)] lg:block"
          aria-hidden
        >
          <HeroVisual />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl min-w-0 px-6 lg:pointer-events-none">
          <div className="max-w-xl text-center lg:pointer-events-auto lg:max-w-[50%] lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`${type.display} mb-4`}
            >
              {lang === "ja" ? (
                <>
                  <span className="inline-block max-w-full">岡山サイケデリック</span>
                  <span className="inline-block max-w-full">精神医療研究会</span>
                </>
              ) : (
                t.hero.title
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className={`${type.heroEyebrow} mb-12`}
            >
              {t.hero.subtitle}
            </motion.p>

            <div className="relative -mx-6 mb-10 h-52 sm:h-64 lg:hidden">
              <HeroVisual />
            </div>

            <FadeInSection trigger="mount" delay={0.65} className="text-left">
              <p className={type.proseLead}>
                <ProseText lang={lang}>{t.hero.intro1}</ProseText>
              </p>
            </FadeInSection>

            <FadeInSection trigger="mount" delay={0.85} className="mt-12 space-y-6 text-left">
              <p className={type.proseBody}>
                <ProseText lang={lang}>{t.hero.context1}</ProseText>
              </p>
              <p className={type.proseBody}>
                <ProseText lang={lang}>{t.hero.context2}</ProseText>
              </p>
              <p className={type.proseBody}>
                <ProseText lang={lang}>{t.hero.context3}</ProseText>
              </p>
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  );
}
