"use client";

import type { SVGProps } from "react";
import { cn } from "@/lib/cn";

const GREEN = "#2D5A43";
const GOLD = "#E9B330";

/** Legacy 8-fold flower mark — preserved for future use. */
export function OpiFlowerMarkLegacy({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={cn("h-9 w-9 shrink-0", className)}
      {...props}
    >
      <defs>
        <path
          id="opi-green-leaf"
          fillRule="evenodd"
          d="M256 292
             C196 272 168 156 256 36
             C344 156 316 272 256 292
             Z
             M256 236
             C232 214 220 158 256 112
             C292 158 280 214 256 236
             Z"
        />
        <path
          id="opi-white-petal"
          d="M256 286
             C224 262 210 196 256 96
             C302 196 288 262 256 286
             Z"
        />
        <path
          id="opi-gold-petal"
          d="M256 276
             C238 258 230 214 256 168
             C282 214 274 258 256 276
             Z"
        />
      </defs>

      <g fill="#FFFFFF">
        {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle) => (
          <use key={`w-${angle}`} href="#opi-white-petal" transform={`rotate(${angle} 256 256)`} />
        ))}
      </g>

      <g fill={GREEN}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <use key={`g-${angle}`} href="#opi-green-leaf" transform={`rotate(${angle} 256 256)`} />
        ))}
      </g>

      <g fill={GOLD}>
        {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle) => (
          <use key={`y-${angle}`} href="#opi-gold-petal" transform={`rotate(${angle} 256 256)`} />
        ))}
      </g>
    </svg>
  );
}
