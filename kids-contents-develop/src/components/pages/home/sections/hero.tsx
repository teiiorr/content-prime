"use client";

import { memo } from "react";

export const HomeSectionsHero = memo(function HomeSectionsHero() {
  return (
    <section
      id="hero"
      className="hero relative w-full overflow-hidden"
      style={{ height: "min(100vh, 820px)", minHeight: "360px" }}
    >
      <video
        className="hero__video absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/hero-poster.jpg"
        aria-hidden="true"
      >
        <source src="videos\intro_video.mp4" type="video/mp4" />
      </video>
/</section>
  )}
)
  HomeSectionsHero.displayName = "HomeSectionsHero";
