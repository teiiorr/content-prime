import { memo } from "react";

export const HomeSectionsHero = memo(function HomeSectionsHero() {
  return (
    <section id="hero" className="hero-section relative">
      <div className="container max-w-[90%] py-8 sm:py-12 md:pb-20">
        <div className="rounded-3xl z-10 sm:rounded-[30px] lg:rounded-[32px] w-full aspect-video border-4 sm:border-6 lg:border-[8px] border-blue-600 overflow-hidden relative flex items-center justify-center shadow-2xl">
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
