import clsx from "clsx";
import Link from "next/link";
import { PropsWithChildren } from "react";

export function NavLink({ href, children, className }: PropsWithChildren<{ href: string; className?: string }>) {
  return (
    <Link href={href} className={clsx("focus-ring rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white hover:text-slate-950", className)}>
      {children}
    </Link>
  );
}
