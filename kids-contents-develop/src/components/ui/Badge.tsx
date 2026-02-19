import clsx from "clsx";
import { PropsWithChildren } from "react";

export function Badge({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <span className={clsx("inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700", className)}>{children}</span>;
}
