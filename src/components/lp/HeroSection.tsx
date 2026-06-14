"use client";

import { motion } from "framer-motion";
import type { TranslationContent } from "@/lib/i18n";
import type { Language } from "@/types/i18n";
import { heroMobileBackdrop, heroSoftBackdrop, type } from "@/lib/styles";
import { MoleculeSvgBackground } from "./MoleculeSvgBackground";
import { ProseText } from "./ProseText";
import { FadeInSection } from "./FadeInSection";

interface HeroSectionProps {
  lang: Language;
  t: TranslationContent;
}

export function HeroSection({ lang, t }: HeroSectionProps) {
  return (
    <section id="about" className="relative overflow-hidden pb-24 pt-20">
      <div className="relative mx-auto max-w-6xl min-w-0 px-6 xl:pointer-events-none">
        <div className="relative mx-auto max-w-xl text-center xl:mx-0 xl:max-w-[min(100%,540px)] xl:text-left">
          <div className={heroSoftBackdrop} aria-hidden />
          <div className="relative">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`relative z-10 ${type.display} mb-4`}
            >
              {t.hero.titleLines.map((line) => (
                <span key={line} className="inline-block max-w-full">
                  {line}
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className={`relative z-10 ${type.heroEyebrow} mb-8 xl:mb-12`}
            >
              {t.hero.subtitle}
            </motion.p>

            <div className="relative z-0 -mx-6 mb-10 h-56 overflow-hidden sm:h-64 md:h-72 xl:hidden">
              <MoleculeSvgBackground embedded />
              <div
                className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-10 bg-gradient-to-b from-white to-transparent"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-10 bg-gradient-to-t from-white to-transparent"
                aria-hidden
              />
            </div>

            <div className="relative">
              <div className={`${heroMobileBackdrop} z-0`} aria-hidden />
              <div className="relative z-10">
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
        </div>
      </div>
    </section>
  );
}
