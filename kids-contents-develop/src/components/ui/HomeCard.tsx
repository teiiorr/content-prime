import clsx from "clsx";
import { PropsWithChildren } from "react";

export function HomeCard({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-slate-200 bg-white shadow-[0_14px_32px_-28px_rgba(15,23,42,0.25)]",
        className
      )}
    >
      {children}
    </div>
  );
}

