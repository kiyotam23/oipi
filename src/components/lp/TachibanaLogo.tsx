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
  line1 = "Okayama Institute of Psychedelic Integration",
  line2 = "岡山サイケデリック精神医療研究会",
  className = "",
}: TachibanaLogoProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <OppiWordMark />

      <div className="min-w-0 max-w-[11rem] font-sans select-none sm:max-w-[13rem] lg:max-w-[15rem] xl:max-w-[17rem]">
        <p
          className={cn(
            "mb-0.5 text-[10px] leading-snug font-semibold tracking-wide sm:text-[11px]",
            "line-clamp-2 lg:line-clamp-none lg:whitespace-nowrap",
            color.text.labelMuted,
          )}
        >
          {line1}
        </p>
        <p
          className={cn(
            "text-xs leading-snug font-bold tracking-[0.04em] sm:text-[13px]",
            "line-clamp-2 lg:line-clamp-none lg:whitespace-nowrap",
            color.text.main,
          )}
        >
          {protectJaText(line2)}
        </p>
      </div>
    </div>
  );
}
