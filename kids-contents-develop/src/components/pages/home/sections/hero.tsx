"use client";

import { memo, useEffect, useState } from "react";

const HERO_VIDEO_SRC = "/videos/intro_video.mp4";

export const HomeSectionsHero = memo(function HomeSectionsHero() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full bg-background px-4 pb-10 pt-6 sm:px-6 lg:px-8"
      aria-label="Homepage hero"
    >
      {/* ✅ Same width logic as navbar */}
      <div className="container max-w-[1508px] 2xl:max-w-[85%]">
        <div
          className={[
            "mx-auto w-full",
            "rounded-[28px]",
            "border border-black/10",
            "overflow-hidden",
            "bg-black",
          ].join(" ")}
        >
          {/* Adaptive hero frame: taller on mobile, balanced on desktop */}
          <div className="relative w-full aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/8] min-h-[360px] sm:min-h-[420px] lg:min-h-[520px] xl:min-h-[600px]">
            <video
              className="absolute inset-0 h-full w-full object-cover object-center lg:object-[center_38%]"
              autoPlay={!reduceMotion}
              muted
              loop
              playsInline
              preload="metadata"
              poster="/images/hero-video-poster.avif"
              aria-hidden="true"
            >
              <source src={HERO_VIDEO_SRC} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
});

HomeSectionsHero.displayName = "HomeSectionsHero";
