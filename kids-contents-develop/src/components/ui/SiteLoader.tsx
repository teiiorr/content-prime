"use client";

import clsx from "clsx";

interface SiteLoaderProps {
  className?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: {
    dot: "h-1.5 w-1.5",
    gap: "gap-1.5",
    text: "text-xs",
  },
  md: {
    dot: "h-2 w-2",
    gap: "gap-2",
    text: "text-sm",
  },
  lg: {
    dot: "h-2.5 w-2.5",
    gap: "gap-2.5",
    text: "text-sm",
  },
} as const;

export function SiteLoader({
  className,
  label = "Yuklanmoqda",
  size = "md",
}: SiteLoaderProps) {
  const conf = sizeMap[size];

  return (
    <div
      className={clsx("inline-flex flex-col items-center justify-center", className)}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className={clsx("inline-flex items-center", conf.gap)}>
        <span
          className={clsx(
            "animate-[site-loader-bounce_0.9s_ease-in-out_infinite] rounded-full bg-slate-400",
            conf.dot
          )}
        />
        <span
          className={clsx(
            "animate-[site-loader-bounce_0.9s_ease-in-out_0.12s_infinite] rounded-full bg-slate-500",
            conf.dot
          )}
        />
        <span
          className={clsx(
            "animate-[site-loader-bounce_0.9s_ease-in-out_0.24s_infinite] rounded-full bg-slate-600",
            conf.dot
          )}
        />
      </div>
      <span className={clsx("mt-3 font-medium text-slate-500", conf.text)}>{label}</span>
      <style jsx>{`
        @keyframes site-loader-bounce {
          0%,
          80%,
          100% {
            transform: translateY(0);
            opacity: 0.45;
          }
          40% {
            transform: translateY(-4px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
