"use client";

import { useEffect, useState } from "react";

export function HeroVisualEnhancer() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const weakDevice = (navigator.hardwareConcurrency || 4) <= 4;
    setEnabled(!reduced && !weakDevice);
  }, []);

  if (!enabled) {
    return <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 via-transparent to-emerald-500/15" aria-hidden />;
  }

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-20 left-1/4 h-52 w-52 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute -bottom-20 right-1/4 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,.22),transparent_35%)]" />
    </div>
  );
}
