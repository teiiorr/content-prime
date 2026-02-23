import clsx from "clsx";
import { PropsWithChildren } from "react";

export function HomeStatePanel({
  children,
  tone = "default",
  className,
}: PropsWithChildren<{
  tone?: "default" | "error";
  className?: string;
}>) {
  return (
    <div
      className={clsx(
        "rounded-2xl border px-6 py-12 text-center",
        tone === "error"
          ? "border-rose-200 bg-rose-50/70 text-rose-700"
          : "border-slate-200 bg-white/80 text-gray-500",
        className
      )}
    >
      {children}
    </div>
  );
}

