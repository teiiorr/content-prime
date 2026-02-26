"use client";

import { PropsWithChildren, useRef } from "react";
import clsx from "clsx";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

type ParallaxTone = "sky" | "emerald" | "amber" | "slate";

const toneClasses: Record<ParallaxTone, [string, string, string]> = {
  sky: ["bg-sky-300/25", "bg-cyan-200/25", "bg-blue-200/20"],
  emerald: ["bg-emerald-300/20", "bg-teal-200/25", "bg-lime-200/15"],
  amber: ["bg-amber-300/20", "bg-orange-200/20", "bg-rose-200/15"],
  slate: ["bg-slate-300/20", "bg-indigo-200/20", "bg-sky-200/15"],
};

type ParallaxSectionProps = PropsWithChildren<{
  className?: string;
  tone?: ParallaxTone;
  intensity?: number;
  accentSide?: "left" | "right";
  stickyAccent?: boolean;
  contentParallax?: boolean;
}>;

export function ParallaxSection({
  children,
  className,
  tone = "sky",
  intensity = 1,
  accentSide = "right",
  stickyAccent = true,
  contentParallax = true,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const distance = 36 * intensity;
  const contentShift = 20 * intensity;

  const layerBack = useSpring(
    useTransform(scrollYProgress, [0, 1], [distance * 0.65, -distance * 0.65]),
    { stiffness: 120, damping: 26, mass: 0.4 }
  );
  const layerMid = useSpring(
    useTransform(scrollYProgress, [0, 1], [distance, -distance]),
    { stiffness: 120, damping: 26, mass: 0.42 }
  );
  const layerFront = useSpring(
    useTransform(scrollYProgress, [0, 1], [distance * 1.45, -distance * 1.45]),
    { stiffness: 120, damping: 28, mass: 0.45 }
  );
  const contentY = useSpring(useTransform(scrollYProgress, [0, 1], [contentShift, -contentShift]), {
    stiffness: 120,
    damping: 26,
    mass: 0.45,
  });
  const contentScale = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.85, 1], [0.986, 0.995, 1, 0.997, 0.99]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0.88, 1, 1, 0.95]);
  const contentRotate = useTransform(scrollYProgress, [0, 1], [0.35 * intensity, -0.35 * intensity]);
  const edgeSweepX = useSpring(useTransform(scrollYProgress, [0, 1], [-20, 140]), {
    stiffness: 110,
    damping: 22,
    mass: 0.35,
  });
  const railScale = useSpring(useTransform(scrollYProgress, [0, 1], [0.06, 1]), {
    stiffness: 130,
    damping: 24,
    mass: 0.35,
  });
  const railDotY = useSpring(useTransform(scrollYProgress, [0, 1], [6, 164]), {
    stiffness: 140,
    damping: 26,
    mass: 0.35,
  });
  const mobileProgressX = useSpring(useTransform(scrollYProgress, [0, 1], ["4%", "96%"]), {
    stiffness: 130,
    damping: 24,
    mass: 0.35,
  });

  const tones = toneClasses[tone];

  return (
    <div ref={ref} className={clsx("relative isolate", className)}>
      {!prefersReducedMotion && (
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            aria-hidden
            className={clsx(
              "absolute -left-10 top-8 h-28 w-28 rounded-full blur-2xl md:h-44 md:w-44",
              tones[0]
            )}
            style={{ y: layerBack }}
          />
          <motion.div
            aria-hidden
            className={clsx(
              "absolute right-4 top-1/3 h-24 w-24 rounded-full blur-xl md:h-40 md:w-40",
              tones[1]
            )}
            style={{ y: layerMid }}
          />
          <motion.div
            aria-hidden
            className={clsx(
              "absolute bottom-6 left-1/4 h-20 w-20 rounded-full blur-xl md:h-36 md:w-36",
              tones[2]
            )}
            style={{ y: layerFront }}
          />

          <motion.div
            aria-hidden
            style={{ x: edgeSweepX }}
            className="absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-transparent via-white/14 to-transparent blur-sm"
          />
        </div>
      )}

      {!prefersReducedMotion && stickyAccent && (
        <div
          className={clsx(
            "pointer-events-none absolute inset-y-0 z-20 hidden lg:block",
            accentSide === "left" ? "left-2" : "right-2"
          )}
          aria-hidden
        >
          <div className="relative h-full w-8">
            <div className="sticky top-[118px] flex h-48 w-8 items-start justify-center">
              <div className="relative mt-2 flex h-44 w-4 items-center justify-center rounded-full border border-white/55 bg-white/30 backdrop-blur-sm">
                <div className="absolute inset-y-2 left-1/2 w-px -translate-x-1/2 bg-white/45" />
                <motion.div
                  className={clsx(
                    "absolute inset-x-0 top-2 bottom-2 left-1/2 w-px origin-top -translate-x-1/2 bg-gradient-to-b",
                    accentSide === "left"
                      ? "from-sky-400/80 via-cyan-300/45 to-transparent"
                      : "from-emerald-400/80 via-teal-300/45 to-transparent"
                  )}
                  style={{ scaleY: railScale }}
                />
                <motion.span
                  className={clsx(
                    "absolute left-1/2 top-0 h-5 w-5 -translate-x-1/2 rounded-full border border-white/70 bg-white/75 shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]"
                  )}
                  style={{ y: railDotY }}
                >
                  <span
                    className={clsx(
                      "absolute inset-[4px] rounded-full",
                      accentSide === "left"
                        ? "bg-gradient-to-br from-sky-400 to-cyan-300"
                        : "bg-gradient-to-br from-emerald-400 to-teal-300"
                    )}
                  />
                </motion.span>
                <motion.span
                  className={clsx(
                    "absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full",
                    accentSide === "left" ? "bg-cyan-200/70" : "bg-teal-200/70"
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {!prefersReducedMotion && stickyAccent && (
        <div className="pointer-events-none absolute inset-x-4 top-3 z-20 lg:hidden" aria-hidden>
          <div className="relative h-8 rounded-full border border-white/60 bg-white/35 px-2 backdrop-blur-sm">
            <div className="absolute inset-x-2 top-1/2 h-px -translate-y-1/2 bg-white/45" />
            <motion.div
              className={clsx(
                "absolute left-2 right-2 top-1/2 h-px -translate-y-1/2 origin-left bg-gradient-to-r",
                accentSide === "left"
                  ? "from-sky-400/80 via-cyan-300/60 to-transparent"
                  : "from-emerald-400/80 via-teal-300/60 to-transparent"
              )}
              style={{ scaleX: railScale }}
            />
            <motion.span
              className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 bg-white/80 shadow-[0_8px_18px_-10px_rgba(15,23,42,0.3)]"
              style={{ left: mobileProgressX }}
            >
              <span
                className={clsx(
                  "absolute inset-[3px] rounded-full",
                  accentSide === "left"
                    ? "bg-gradient-to-br from-sky-400 to-cyan-300"
                    : "bg-gradient-to-br from-emerald-400 to-teal-300"
                )}
              />
            </motion.span>
          </div>
        </div>
      )}

      <motion.div
        style={
          prefersReducedMotion || !contentParallax
            ? undefined
            : { y: contentY, scale: contentScale, opacity: contentOpacity, rotateZ: contentRotate }
        }
        className="relative will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
