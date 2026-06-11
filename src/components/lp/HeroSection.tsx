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
    <section id="about" className="relative overflow-hidden">
      <div className="relative pb-12 pt-20 lg:pb-16">
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
              className="heading-balance mb-4 text-3xl font-light leading-tight tracking-tight text-text sm:text-4xl md:text-5xl"
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
              className="mb-12 text-sm tracking-[0.2em] text-text/70 uppercase"
            >
              {t.hero.subtitle}
            </motion.p>

            <div className="relative -mx-6 mb-10 h-52 sm:h-64 lg:hidden">
              <HeroVisual />
            </div>

            <FadeInSection trigger="mount" delay={0.65} className="space-y-6 text-left">
              <p className={`${type.proseBodyEmphasis} sm:text-lg`}>
                <ProseText lang={lang}>{t.hero.intro1}</ProseText>
              </p>
              <p className={`${type.proseBody} sm:text-lg`}>
                <ProseText lang={lang}>{t.hero.intro2}</ProseText>
              </p>
            </FadeInSection>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl min-w-0 px-6 pb-24">
        <FadeInSection trigger="mount" delay={0.2} className="max-w-xl space-y-6 text-left lg:max-w-[50%]">
          <p className={type.proseBody}>
            <ProseText lang={lang}>{t.hero.context1}</ProseText>
          </p>
          <p className={type.proseBody}>
            <ProseText lang={lang}>{t.hero.context2}</ProseText>
          </p>
          <p className={type.proseBodyEmphasis}>
            <ProseText lang={lang}>{t.hero.context3}</ProseText>
          </p>
        </FadeInSection>
      </div>
    </section>
  );
}
