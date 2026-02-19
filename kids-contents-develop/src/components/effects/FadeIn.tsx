"use client";

import { PropsWithChildren } from "react";

export function FadeIn({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <div className={className}>{children}</div>;
}