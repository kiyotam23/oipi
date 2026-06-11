"use client";

import { cn } from "@/lib/cn";
import { color } from "@/lib/colors";
import { protectJaText } from "@/lib/protect-phrases";
import { OppiWordMark } from "./OppiWordMark";

interface TachibanaLogoProps {
  line1?: string;
  line2?: string;
  className?: string;
}

export function TachibanaLogo({
  line1 = "Okayama Psychedelic Psychiatric Institute",
  line2 = "岡山サイケデリック精神医療研究会",
  className = "",
}: TachibanaLogoProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <OppiWordMark />

      <div className="min-w-0 max-w-[9.5rem] font-sans select-none sm:max-w-[11rem] lg:max-w-[13rem] xl:max-w-xs">
        <p
          className={cn(
            "mb-0.5 truncate text-[10px] leading-snug font-semibold tracking-wide sm:text-[11px]",
            color.text.labelMuted,
          )}
        >
          {line1}
        </p>
        <p
          className={cn(
            "truncate text-xs leading-snug font-bold tracking-[0.04em] sm:text-[13px]",
            color.text.main,
          )}
        >
          {protectJaText(line2)}
        </p>
      </div>
    </div>
  );
}
