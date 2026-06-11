import { cn } from "@/lib/cn";
import { montserrat } from "@/lib/fonts";

const LOGO_COLOR = "lab(18% -23.94 18.76)";

interface OppiWordMarkProps {
  className?: string;
}

export function OppiWordMark({ className }: OppiWordMarkProps) {
  return (
    <span
      className={cn(
        montserrat.className,
        "inline-block shrink-0 whitespace-nowrap text-2xl leading-none",
        className,
      )}
      style={{ color: LOGO_COLOR }}
      aria-label="OPPI"
    >
      OPPI
    </span>
  );
}
