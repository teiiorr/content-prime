"use client";

import { PropsWithChildren, useRef } from "react";
import clsx from "clsx";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

type ScrollCardProps = PropsWithChildren<{
  className?: string;
  index?: number;
  amount?: number;
  scaleFrom?: number;
  yFrom?: number;
  blurFrom?: number;
  delayStep?: number;
  once?: boolean;
}>;

export function ScrollCard({
  children,
  className,
  index = 0,
  amount = 0.15,
  scaleFrom = 1.06,
  yFrom = 54,
  blurFrom = 7,
  delayStep = 0.06,
  once = false,
}: ScrollCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 96%", "end 6%"],
  });

  const enterY = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [yFrom, 0, 0, -10, -18]);
  const enterScale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [scaleFrom, 1, 1, 0.996, 0.988]
  );
  const enterOpacity = useTransform(scrollYProgress, [0, 0.12, 0.82, 1], [0.08, 1, 1, 0.78]);
  const blurPx = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [blurFrom, 0, 0, 1.5]);
  const blurFilter = useTransform(blurPx, (v) => `blur(${v.toFixed(2)}px)`);

  const outerY = useSpring(enterY, { stiffness: 140, damping: 24, mass: 0.35 });
  const outerScale = useSpring(enterScale, { stiffness: 140, damping: 24, mass: 0.35 });
  const outerOpacity = useSpring(enterOpacity, { stiffness: 120, damping: 22, mass: 0.32 });

  const innerY = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [18, 0, -8]), {
    stiffness: 130,
    damping: 24,
    mass: 0.36,
  });

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={clsx("will-change-transform", className)}
      viewport={{ once, amount, margin: "0px 0px -8% 0px" }}
      style={{
        y: outerY,
        scale: outerScale,
        opacity: outerOpacity,
        filter: blurFilter,
        willChange: "transform, opacity, filter",
      }}
      transition={{
        delay: Math.min(index, 6) * delayStep,
      }}
    >
      <motion.div style={{ y: innerY }} className="h-full will-change-transform">
        {children}
      </motion.div>
    </motion.div>
  );
}
