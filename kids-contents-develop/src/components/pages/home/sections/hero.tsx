import { memo } from "react";

export const HomeSectionsHero = memo(function HomeSectionsHero() {
  return (
     <section
      id="hero"
      className="hero-section relative bg-gradient-to-b from-white via-gray-50 to-gray-100"
    >
      <div className="container max-w-[100%] py-8 sm:py-12 lg:py-16">
        <div className="relative z-10 w-full aspect-video overflow-hidden rounded-[28px] sm:rounded-[32px] bg-white/80 ring-1 ring-black/5 shadow-[0_25px_70px_-35px_rgba(15,23,42,0.6)]">
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-blue-100/40" />
          <video
            src="/videos/intro_video.mp4"
            poster="/images/about-video-poster.avif"
            controls
            muted
            autoPlay
            preload="metadata"
            className="w-full h-full absolute inset-0 object-cover"
          />
        </div>
      </div>
    </section>
  );
});

HomeSectionsHero.displayName = "HomeSectionsHero";
