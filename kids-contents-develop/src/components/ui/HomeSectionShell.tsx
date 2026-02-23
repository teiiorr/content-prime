import clsx from "clsx";
import { PropsWithChildren } from "react";

export function HomeSectionShell({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={clsx(
        "rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.25)] sm:p-6 lg:rounded-[28px] lg:p-8",
        className
      )}
    >
      {children}
    </div>
  );
}

export function HomeSectionHeader({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return <div className={clsx("mb-6 md:mb-8", className)}>{children}</div>;
}

