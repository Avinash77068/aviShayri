"use client";

import { PenLine, Sparkles, Coins } from "lucide-react";

const ITEMS = [
  { icon: PenLine, text: "Ek din mein 50 shayari post kar sakte ho" },
  { icon: Coins, text: "Har shayari par milenge 10 credits" },
  { icon: Sparkles, text: "Jitna likho, utna kamao — apni awaaz ko shohrat do" },
];

export function PromoStrip() {
  // Duplicate the sequence so the marquee loops seamlessly.
  const loop = [...ITEMS, ...ITEMS];

  return (
    <div className="sticky top-16 z-30 overflow-hidden border-b border-[var(--border)] [background-image:var(--grad-1)] text-white">
      <div className="marquee flex w-max items-center gap-10 py-2">
        {loop.map((item, i) => {
          const Icon = item.icon;
          return (
            <span
              key={i}
              className="flex shrink-0 items-center gap-2 text-sm font-medium"
            >
              <Icon className="h-4 w-4" />
              {item.text}
              <span className="mx-2 opacity-60">•</span>
            </span>
          );
        })}
      </div>

      <style jsx>{`
        .marquee {
          animation: promo-scroll 25s linear infinite;
        }
        .marquee:hover {
          animation-play-state: paused;
        }
        @keyframes promo-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
