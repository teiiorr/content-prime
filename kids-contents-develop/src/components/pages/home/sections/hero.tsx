"use client";

import { memo, useEffect, useRef, useState } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";

const HERO_VIDEO_SRC = "/videos/bola-logo.mp4";

export const HomeSectionsHero = memo(function HomeSectionsHero() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [hasStartedByUser, setHasStartedByUser] = useState(false);
  const [isDesktopViewport, setIsDesktopViewport] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const playTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 640px)");
    const update = () => setIsDesktopViewport(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.intersectionRatio >= 0.45),
      { threshold: [0.25, 0.45, 0.75] }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (playTimerRef.current) {
      window.clearTimeout(playTimerRef.current);
      playTimerRef.current = null;
    }

    if (reduceMotion) {
      setIsSoundOn(false);
      setIsVideoPlaying(false);
      video.pause();
      return;
    }

    if (!hasStartedByUser && !isDesktopViewport) {
      setIsVideoPlaying(false);
      video.pause();
      return;
    }

    if (!isVisible) {
      if (!hasStartedByUser || isDesktopViewport) {
        video.muted = true;
      }
      setIsSoundOn(false);
      setIsVideoPlaying(false);
      video.pause();
      return;
    }

    playTimerRef.current = window.setTimeout(() => {
      if (!hasStartedByUser || isDesktopViewport) {
        video.muted = true;
      }
      setIsSoundOn(false);
      void video.play().catch(() => {});
    }, 150);

    return () => {
      if (playTimerRef.current) {
        window.clearTimeout(playTimerRef.current);
        playTimerRef.current = null;
      }
    };
  }, [reduceMotion, isVisible, hasStartedByUser, isDesktopViewport]);

  const handleHeroEnded = () => {
    setIsVideoPlaying(false);
    try {
      window.sessionStorage.setItem("home-hero-video-finished", "1");
    } catch {}
    window.dispatchEvent(new CustomEvent("home-hero-video-finished"));
  };

  const handleStartWithSound = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      video.muted = false;
      await video.play();
      setHasStartedByUser(true);
      setIsSoundOn(true);
    } catch {
      video.muted = true;
      setHasStartedByUser(false);
      setIsSoundOn(false);
    }
  };

  const handleToggleSound = async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      const next = video.muted;
      video.muted = !next;
      await video.play();
      setIsSoundOn(next);
    } catch {
      video.muted = true;
      setIsSoundOn(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full overflow-hidden bg-background"
      aria-label="Homepage hero"
    >
      <div className="relative h-[calc(100svh-82px)] w-full min-h-[calc(100svh-82px)] sm:h-auto sm:min-h-[82svh] lg:min-h-[88svh] xl:min-h-[92svh] sm:max-h-[980px]">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-[center_45%] sm:object-center lg:object-[center_38%] 2xl:object-[center_34%]"
          autoPlay={false}
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          onEnded={handleHeroEnded}
          onPlay={() => setIsVideoPlaying(true)}
          onPause={() => setIsVideoPlaying(false)}
        >
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10" />

        {!reduceMotion && !isDesktopViewport && !isVideoPlaying ? (
          <button
            type="button"
            onClick={handleStartWithSound}
            className="absolute left-1/2 top-1/2 z-10 inline-flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-black/22 text-white backdrop-blur-sm transition duration-200 hover:scale-[1.02] hover:bg-black/30 active:scale-95"
            aria-label="Videoni ovoz bilan boshlash"
            aria-pressed={false}
          >
            <span className="pointer-events-none absolute -inset-2 rounded-full border border-white/18 opacity-70 [animation:ping_2.8s_cubic-bezier(0,0,0.2,1)_infinite]" />
            <span className="pointer-events-none absolute inset-[2px] rounded-full border border-white/12" />
            <Play className="relative h-[18px] w-[18px] translate-x-[1px]" />
          </button>
        ) : null}
        {!reduceMotion && isDesktopViewport ? (
          <button
            type="button"
            onClick={handleToggleSound}
            className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3 py-2 text-white backdrop-blur-sm transition hover:bg-black/50 sm:bottom-5 sm:right-5"
            aria-label={isSoundOn ? "Ovozni o‘chirish" : "Ovozni yoqish"}
            aria-pressed={isSoundOn}
          >
            <span className="relative inline-flex h-4 w-4 shrink-0 items-center justify-center">
              <Volume2
                className={`absolute h-4 w-4 transition-all duration-200 ${
                  isSoundOn ? "opacity-100 scale-100" : "opacity-0 scale-75"
                }`}
                strokeWidth={2}
              />
              <VolumeX
                className={`absolute h-4 w-4 transition-all duration-200 ${
                  isSoundOn ? "opacity-0 scale-75" : "opacity-100 scale-100"
                }`}
                strokeWidth={2}
              />
            </span>
            <span className="text-xs font-medium leading-none">
              {isSoundOn ? "Ovozli" : "Ovoz bilan"}
            </span>
          </button>
        ) : null}

      </div>
    </section>
  );
});

HomeSectionsHero.displayName = "HomeSectionsHero";
