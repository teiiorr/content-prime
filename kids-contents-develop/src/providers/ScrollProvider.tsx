"use client";

import { PropsWithChildren, useEffect } from "react";

export function ScrollProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null;
    let frameId = 0;
    let cancelled = false;

    const html = document.documentElement;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const stop = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      }
      lenis?.destroy();
      lenis = null;
      html.classList.remove("lenis-active");
    };

    const start = async () => {
      if (media.matches || cancelled) return;

      const mod = await import("lenis");
      if (cancelled || media.matches) return;

      const Lenis = mod.default;
      lenis = new Lenis({
        lerp: window.innerWidth >= 768 ? 0.08 : 0.11,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.95,
        touchMultiplier: 1,
      });

      html.classList.add("lenis-active");

      const raf = (time: number) => {
        lenis?.raf(time);
        frameId = requestAnimationFrame(raf);
      };

      frameId = requestAnimationFrame(raf);
    };

    const restart = () => {
      stop();
      void start();
    };

    void start();

    const onChange = () => restart();

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", onChange);
    } else {
      media.addListener(onChange);
    }

    return () => {
      cancelled = true;
      if (typeof media.removeEventListener === "function") {
        media.removeEventListener("change", onChange);
      } else {
        media.removeListener(onChange);
      }
      stop();
    };
  }, []);

  return <>{children}</>;
}
