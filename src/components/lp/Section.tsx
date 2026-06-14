import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { layout } from "@/lib/styles";

type ContainerWidth = keyof typeof layout.container;

interface SectionProps {
  id?: string;
  tone?: "default" | "sage";
  width?: ContainerWidth;
  center?: boolean;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}

export function Section({
  id,
  tone = "default",
  width = "lg",
  center = false,
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      data-sage-bg={tone === "sage" ? "" : undefined}
      className={cn(layout.section, tone === "sage" && "bg-sage xl:bg-transparent", className)}
    >
      <div
        className={cn(layout.container[width], center && "text-center", containerClassName)}
      >
        {children}
      </div>
    </section>
  );
}
