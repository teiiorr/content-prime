"use client";

import { memo } from "react";

const HERO_VIDEO_SRC = "/videos/intro_video.mp4";

export const HomeSectionsHero = memo(function HomeSectionsHero() {
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
          {/* ✅ Keep real mp4 ratio, avoid stretch */}
          <div className="relative w-full aspect-[16/9]">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
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