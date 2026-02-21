"use client";

import { memo } from "react";

const HERO_VIDEO_SRC = "/videos/intro_video.mp4";

export const HomeSectionsHero = memo(function HomeSectionsHero() {
  return (
    <section
      id="hero"
      className="relative w-full bg-background px-4 pt-16 pb-10 sm:px-6 lg:px-8"
      aria-label="Homepage hero"
    >
      <div className="mx-auto w-full max-w-7xl">
        
        {/* BIG CLEAN VIDEO */}
        <div className="relative w-full overflow-hidden rounded-2xl aspect-[16/9]">
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
    </section>
  );
});

HomeSectionsHero.displayName = "HomeSectionsHero";