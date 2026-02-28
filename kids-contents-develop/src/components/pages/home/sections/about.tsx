"use client";

import { memo, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";
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

    const syncSoundState = () => {
      setIsSoundOn(!video.muted);
    };

    syncSoundState();
    video.addEventListener("volumechange", syncSoundState);

    return () => {
      video.removeEventListener("volumechange", syncSoundState);
    };
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

    if (!isVisible) {
      video.muted = true;
      setIsSoundOn(false);
      setIsVideoPlaying(false);
      video.pause();
      return;
    }

    playTimerRef.current = window.setTimeout(() => {
      if (isDesktopViewport || !hasStartedByUser) {
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
      video.muted = !video.muted;
      await video.play();
      setIsSoundOn(!video.muted);
    } catch {
      video.muted = true;
      setIsSoundOn(false);
    }
  };

  const handleSoundButtonClick = async () => {
    if (isDesktopViewport || hasStartedByUser) {
      await handleToggleSound();
      return;
    }

    await handleStartWithSound();
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
              <div className="h-[18px] sm:h-[20px]" aria-hidden="true" />
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                Markaz haqida
              </h2>
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="rounded-[24px] border border-white/70 bg-transparent p-2.5 sm:rounded-[28px] sm:p-4 lg:p-5">
            <div className="grid items-stretch gap-4 lg:grid-cols-[1.28fr_.72fr] lg:gap-5">
              <ScrollCard
                className="h-full [&>div]:h-full"
                index={0}
                yFrom={86}
                scaleFrom={1.03}
                blurFrom={6}
                delayStep={0.12}
              >
              <div className="flex h-full flex-col overflow-hidden rounded-[20px] border border-white/70 bg-white/72 sm:rounded-[22px]">
                <div className="relative overflow-hidden border-b border-white/70 bg-[#edf3f6]">
                  <img
                    src="/images/president.jpg"
                    alt="O‘zbekiston Respublikasi Prezidenti"
                    className="block h-auto w-full object-contain object-center"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4 sm:p-5 lg:p-6 xl:p-7">
                  <p className="max-w-none text-[15px] leading-7 text-slate-800 sm:max-w-[95%] sm:text-[16px] sm:leading-8 lg:text-[18px] lg:leading-9 xl:text-[20px] xl:leading-10">
                    Bolalar kontentini rivojlantirish markazi O‘zbekiston Respublikasi
                    Prezidentining 2025-yil 15-maydagi{" "}
                    <strong className="font-extrabold text-slate-950">PQ-183-son</strong>{" "}
                    qaroriga muvofiq tashkil etilgan bo‘lib, bolalarni zararli axborotdan himoya
                    qilish, ta’limga keng jalb etish va milliy qadriyatlar asosidagi zamonaviy
                    kontentlarni yaratishni qo‘llab-quvvatlaydi.
                  </p>
                  <div className="mt-6 flex justify-end lg:mt-auto lg:pt-8">
                    <Button
                      href="https://www.lex.uz/uz/docs/-7528758?ONDATE=17.09.2025"
                      target="_blank"
                      theme="primary"
                      className="min-h-[52px] w-full justify-center px-6 text-base font-bold shadow-none before:opacity-0 before:transition-opacity before:duration-300 hover:shadow-none hover:before:opacity-100 sm:min-h-[56px] sm:w-auto sm:min-w-[220px] sm:px-7 sm:text-[15px] lg:min-w-[260px] lg:text-base xl:min-h-[60px] xl:min-w-[300px] xl:text-lg"
                    >
                      Batafsil
                    </Button>
                  </div>
                </div>
              </div>
              </ScrollCard>

              <ScrollCard
                className="h-full [&>div]:h-full"
                index={1}
                yFrom={104}
                scaleFrom={1.045}
                blurFrom={8}
                delayStep={0.12}
              >
              <div className="relative flex h-full flex-col overflow-hidden rounded-[20px] border border-white/70 bg-white/72 p-3 sm:rounded-[22px] sm:p-4 lg:p-5">
                <div className="hidden pb-4 pt-2 sm:block">
                  <div className="flex min-h-[132px] items-center justify-center lg:min-h-[164px] xl:min-h-[188px]">
                    <Image
                      src="/logo.svg"
                      alt="Markaz logotipi"
                      width={420}
                      height={132}
                      className="h-24 w-auto max-w-full object-contain lg:h-28 xl:h-32"
                      priority={false}
                    />
                  </div>
                </div>
                <div className="relative mt-auto aspect-[9/12] min-h-[420px] w-full overflow-hidden rounded-[20px] sm:aspect-[4/5] sm:min-h-[500px] md:min-h-[560px] lg:min-h-[620px] lg:rounded-[22px] xl:min-h-[680px]">
                  <video
                    ref={videoRef}
                    className="absolute inset-0 h-full w-full object-cover object-[center_52%] sm:object-[center_54%] lg:object-[center_56%]"
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

                  {!reduceMotion ? (
                    <button
                      type="button"
                      onClick={handleSoundButtonClick}
                      className="absolute bottom-2.5 right-2.5 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-2.5 py-2 text-white backdrop-blur-sm transition hover:bg-black/55 sm:bottom-4 sm:right-4 sm:gap-2 sm:px-3"
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
                      <span className="text-[11px] font-medium leading-none sm:text-xs">
                        {isSoundOn ? "Ovoz bilan" : "Ovozsiz"}
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
