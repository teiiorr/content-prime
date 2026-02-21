import clsx from "clsx";
import Link from "next/link";
import { PropsWithChildren } from "react";

export function FooterLink({ href, children, className }: PropsWithChildren<{ href: string; className?: string }>) {
  return <Link href={href} className={clsx("focus-ring text-slate-600 transition hover:text-slate-900", className)}>{children}</Link>;
}
