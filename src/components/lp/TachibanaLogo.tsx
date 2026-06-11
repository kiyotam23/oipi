"use client";

import { motion } from "framer-motion";
import type { Language } from "@/types/i18n";
import { cn } from "@/lib/cn";
import { color } from "@/lib/colors";
import { protectJaText } from "@/lib/protect-phrases";
import { OpiFlowerMark } from "./OpiFlowerMark";

interface TachibanaLogoProps {
  lang?: Language;
  line1?: string;
  line2?: string;
  className?: string;
}

export function TachibanaLogo({
  lang = "ja",
  line1 = "Okayama Psychedelic Psychiatric Institute",
  line2 = "岡山サイケデリック精神医療研究会",
  className = "",
}: TachibanaLogoProps) {
  const englishLine = lang === "ja" ? 1 : 2;
  return (
    <div className={`flex min-w-0 items-center gap-2 ${className}`}>
      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center">
        <motion.div
          className="absolute inset-0 rounded-full bg-slate-200/40 blur-md"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        >
          <OpiFlowerMark />
        </motion.div>
      </div>

      <div className="min-w-0 max-w-[12rem] font-sans select-none sm:max-w-sm md:max-w-md">
        <p
          className={cn(
            "mb-0.5 text-[10px] leading-snug font-semibold tracking-wide sm:text-[11px]",
            englishLine === 1 ? color.text.labelMuted : color.text.subtle,
          )}
        >
          {line1}
        </p>
        <p
          className={cn(
            "text-xs leading-snug font-bold tracking-[0.04em] sm:text-[13px]",
            englishLine === 2 ? color.text.labelMuted : color.text.main,
          )}
        >
          {protectJaText(line2)}
        </p>
      </div>
    </div>
  );
}
