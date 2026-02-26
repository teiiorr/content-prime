"use client";

import { PropsWithChildren, useRef } from "react";
import clsx from "clsx";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

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
  once = true,
}: ScrollCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "end 65%"],
  });

  const innerY = useTransform(scrollYProgress, [0, 1], [16, -6]);

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
      initial={{
        opacity: 0,
        y: yFrom,
        scale: scaleFrom,
        filter: `blur(${blurFrom}px)`,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      viewport={{ once, amount, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: 0.7,
        delay: Math.min(index, 6) * delayStep,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ willChange: "transform, opacity, filter" }}
    >
      <motion.div style={{ y: innerY }} className="h-full will-change-transform">
        {children}
      </motion.div>
    </motion.div>
  );
}
