"use client";

import { memo, useEffect, useRef, useState } from "react";
import { Volume2 } from "lucide-react";

const HERO_VIDEO_SRC = "/videos/intro_video.mp4";

export const HomeSectionsHero = memo(function HomeSectionsHero() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    void video.play().catch(() => {});
  }, [reduceMotion]);

  const handleHeroEnded = () => {
    try {
      window.sessionStorage.setItem("home-hero-video-finished", "1");
    } catch {}
    window.dispatchEvent(new CustomEvent("home-hero-video-finished"));
  };

  const handleEnableSound = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      video.currentTime = 0;
      video.muted = false;
      await video.play();
    } catch {
      // If browser still blocks, keep button visible.
      video.muted = true;
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-background"
      aria-label="Homepage hero"
    >
      <div className="relative w-full min-h-[78svh] sm:min-h-[82svh] lg:min-h-[88svh] xl:min-h-[92svh] max-h-[980px]">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-center lg:object-[center_38%] 2xl:object-[center_34%]"
          autoPlay={!reduceMotion}
          muted
          playsInline
          preload="auto"
          poster="/images/hero-video-poster.avif"
          aria-hidden="true"
          onEnded={handleHeroEnded}
        >
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10" />

        {!reduceMotion ? (
          <button
            type="button"
            onClick={handleEnableSound}
            className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/45 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-black/60 sm:bottom-6 sm:right-6"
            aria-label="Ovoz bilan ijro etish"
          >
            <Volume2 className="h-4 w-4" />
            <span>Ovoz bilan</span>
          </button>
        ) : null}
      </div>
    </section>
  );
});

HomeSectionsHero.displayName = "HomeSectionsHero";
