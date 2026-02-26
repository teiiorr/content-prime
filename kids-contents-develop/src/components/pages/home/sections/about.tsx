"use client";

import { memo, useEffect, useRef, useState } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";
import { ROUTES } from "@/constants";
import { Button, Container } from "@/components";
import { FadeIn } from "@/components/effects/FadeIn";
import { ScrollCard } from "@/components/motion/ScrollCard";

export const HomeSectionsAbout = memo(function HomeSectionsAbout() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [hasStartedByUser, setHasStartedByUser] = useState(false);
  const [isDesktopViewport, setIsDesktopViewport] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const playTimerRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

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
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.35 }
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
      video.muted = true;
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
      setIsSoundOn(false);
      setIsVideoPlaying(false);
      video.pause();
      return;
    }

    playTimerRef.current = window.setTimeout(() => {
      if (isDesktopViewport) {
        video.muted = true;
        setIsSoundOn(false);
      }
      void video.play().catch(() => {});
    }, 180);

    return () => {
      if (playTimerRef.current) {
        window.clearTimeout(playTimerRef.current);
        playTimerRef.current = null;
      }
    };
  }, [isVisible, reduceMotion, hasStartedByUser, isDesktopViewport]);

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
      id="about"
      className="relative mb-0 mt-0 overflow-hidden bg-[#dfe9ef] py-12 md:py-20"
    >
      <Container className="relative z-10 max-w-[1508px] 2xl:max-w-[88%]">
        <FadeIn>
          <div className="mb-6 text-center md:mb-8">
            <div className="mx-auto max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
                Biz haqimizda
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                Markaz haqida
              </h2>
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="rounded-[28px] border border-white/70 bg-white/50 p-3 sm:p-4 lg:p-5">
            <div className="grid items-stretch gap-4 lg:grid-cols-[1.15fr_.85fr] lg:gap-5">
              <ScrollCard className="h-full [&>div]:h-full" index={0} yFrom={72} scaleFrom={1.04} blurFrom={5}>
              <div className="overflow-hidden rounded-[22px] border border-white/70 bg-white/72">
                <div className="relative overflow-hidden border-b border-white/70">
                  <img
                    src="/images/president.jpg"
                    alt="O‘zbekiston Respublikasi Prezidenti"
                    className="block h-auto w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 sm:p-5 lg:p-6 xl:p-7">
                  <div className="mb-3 inline-flex items-center rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-xs font-semibold tracking-[0.08em] text-slate-700 lg:text-[13px]">
                    PQ-183 • 15-MAY, 2025
                  </div>
                  <p className="text-[14px] leading-7 text-slate-800 sm:text-[15px] sm:leading-7 lg:text-[17px] lg:leading-8 xl:text-[18px] xl:leading-9">
                    Bolalar kontentini rivojlantirish markazi O‘zbekiston Respublikasi
                    Prezidentining 2025-yil 15-maydagi PQ-183-son qaroriga muvofiq tashkil
                    etilgan bo‘lib, markazning asosiy maqsadi bolalarni zararli axborotdan
                    himoya qilish, ta’limga keng jalb etish, kasbga yo‘naltirish va yuksak
                    vatanparvarlik ruhida tarbiyalashga xizmat qiladigan milliy kontentlar
                    yaratishni qo‘llab-quvvatlashdir.
                  </p>
                  <div className="mt-4 lg:mt-5">
                    <Button href={ROUTES.ABOUT} theme="primary">
                      Batafsil
                    </Button>
                  </div>
                </div>
              </div>
              </ScrollCard>

              <ScrollCard className="h-full [&>div]:h-full" index={1} yFrom={88} scaleFrom={1.06} blurFrom={6}>
              <div className="relative h-full overflow-hidden rounded-[22px] border border-white/70 bg-white/72">
                <div className="relative h-full min-h-[500px] w-full overflow-hidden rounded-[22px] sm:min-h-[560px] lg:min-h-[640px]">
                  <video
                    ref={videoRef}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    autoPlay={false}
                    muted
                    playsInline
                    preload="metadata"
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                    onEnded={() => setIsVideoPlaying(false)}
                  >
                    <source src="/videos/handbrake-mobile-web.mp4" type="video/mp4" />
                    <source src="/videos/handbrake-mobile.mp4" type="video/mp4" />
                  </video>

                  {!reduceMotion && !isDesktopViewport && !isVideoPlaying ? (
                    <button
                      type="button"
                      onClick={handleStartWithSound}
                      className="absolute left-1/2 top-1/2 z-10 inline-flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-black/24 text-white backdrop-blur-sm transition duration-200 hover:scale-[1.02] hover:bg-black/32 active:scale-95"
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
                      className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-white backdrop-blur-sm transition hover:bg-black/55 sm:bottom-4 sm:right-4"
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
              </div>
              </ScrollCard>
            </div>
          </div>
        </FadeIn>
      </Container>

    </section>
  );
});

HomeSectionsAbout.displayName = "HomeSectionsAbout";
