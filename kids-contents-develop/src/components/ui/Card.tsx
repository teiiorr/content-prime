import clsx from "clsx";
import { PropsWithChildren } from "react";

export function Card({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={clsx("rounded-[var(--radius-xl)] border border-slate-200 bg-white/95 shadow-[var(--shadow-sm)]", className)}>
      {children}
    </div>
  );
}
