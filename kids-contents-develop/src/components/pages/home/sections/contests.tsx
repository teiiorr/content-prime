"use client";

import { memo, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  BookOpen,
  Clapperboard,
  Film,
  WandSparkles,
} from "lucide-react";
import { ROUTES } from "@/constants";
import { CONTESTS } from "@/data";
import { Button, Card, Container, HomeSectionShell } from "@/components";
import { ScrollCard } from "@/components/motion/ScrollCard";

export const HomeSectionsContests = memo(function HomeSectionsContests() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [activeContestIndex, setActiveContestIndex] = useState(0);
  const contestSliderImages = [
    "/images/sehrlandiya.jpg",
    "/images/tipra.jpg",
  ] as const;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (reduceMotion || contestSliderImages.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveContestIndex((current) => (current + 1) % contestSliderImages.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [contestSliderImages.length, reduceMotion]);

  const contestDirections = [
    {
      title: "Animatsiya",
      icon: WandSparkles,
      classes:
        "border-[#d7dde8] bg-[#eef2f8] text-[#49566a]",
    },
    {
      title: "Film va serial",
      icon: Film,
      classes:
        "border-[#ddd7cf] bg-[#f4efe8] text-[#665847]",
    },
    {
      title: "Bolalar kitoblari",
      icon: BookOpen,
      classes:
        "border-[#d5dfd0] bg-[#edf4ea] text-[#51634c]",
    },
    {
      title: "Media loyihalar",
      icon: Clapperboard,
      classes:
        "border-[#d8d4e4] bg-[#f1eef8] text-[#5a5473]",
    },
  ] as const;

  const activeContest = CONTESTS[activeContestIndex % CONTESTS.length];

  return (
    <section id="contests" className="relative bg-gradient-to-b from-[#ecefe7] to-transparent">
      <Container className="max-w-[1508px] py-10 lg:py-24 2xl:max-w-[88%]">
        <HomeSectionShell className="border-[#cfd5c6] bg-[#fcfcfa] p-5 sm:p-6 lg:p-8 xl:p-10 shadow-[0_28px_70px_-48px_rgba(72,84,56,0.2)]">
          <div className="grid items-start gap-8 lg:min-h-[520px] lg:grid-cols-[1.05fr_.95fr] lg:items-stretch lg:gap-12 xl:min-h-[600px] xl:gap-16">
            <div className="order-2 flex h-full flex-col lg:order-1">
              <div className="mb-5 text-center text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
                Ijodiy tanlovlar
              </div>
              <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7 lg:text-[15px] lg:leading-7 xl:text-[17px] xl:leading-8">
                Animatsiya, film, serial, kinojurnal va bolalar adabiyoti yo‘nalishlarida yangi
                g‘oyalarni qo‘llab-quvvatlaymiz.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-2">
                {contestDirections.map(({ title, icon: Icon, classes }, index) => (
                  <ScrollCard key={title} index={index} yFrom={66} scaleFrom={1.07} blurFrom={6} delayStep={0.05}>
                    <div
                      className={[
                        "rounded-2xl border p-3 sm:p-3.5 xl:p-4",
                        "min-h-[72px] sm:min-h-[78px]",
                        "transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-22px_rgba(15,23,42,0.22)]",
                        classes,
                      ].join(" ")}
                    >
                      <div className="grid h-full grid-cols-[36px_minmax(0,1fr)] items-center justify-center gap-2.5 text-center">
                        <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center self-center rounded-lg bg-white/70">
                          <Icon size={18} className="shrink-0" />
                        </div>
                        <div className="text-left text-[15px] font-semibold leading-5 sm:text-base lg:text-[17px] lg:leading-6">
                          {title}
                        </div>
                      </div>
                    </div>
                  </ScrollCard>
                ))}
              </div>

              <ScrollCard index={4} yFrom={72} scaleFrom={1.05} blurFrom={5} delayStep={0.04}>
                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 xl:p-5">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#e6ebdd] text-[#55614a]">
                      <BadgeCheck size={18} />
                    </div>
                    <p className="text-sm leading-6 text-slate-700 lg:text-[15px] lg:leading-7">
                      Tanlovlar muntazam ravishda e’lon qilinadi. Talablar, muddatlar va ariza
                      topshirish tartibi har bir tanlov sahifasida alohida ko‘rsatiladi.
                    </p>
                  </div>
                </div>
              </ScrollCard>

              <div className="mt-6 pt-1 lg:mt-auto lg:pt-8 xl:pt-10">
                <Button
                  href={ROUTES.CREATIVE_CONTESTS}
                  theme="outlined"
                  className="w-full justify-center border-[#c8ae86] bg-[#f1e7d7] px-5 py-3 text-base font-semibold text-[#6d5436] shadow-[0_14px_28px_-20px_rgba(109,84,54,0.28)] hover:border-[#b99b71] hover:bg-[#eadcc7] hover:text-[#5d452a] sm:min-w-[280px] lg:min-h-[54px] lg:text-lg xl:min-h-[58px] xl:text-[19px]"
                >
                  Barcha ijodiy tanlovlar
                </Button>
              </div>
            </div>

            <ScrollCard className="order-1 lg:order-2" index={2} yFrom={84} scaleFrom={1.08} blurFrom={8}>
              <Card className="relative h-full overflow-hidden rounded-[24px] border-[#d4dacb] bg-gradient-to-br from-[#f3f5ef] to-white p-0 shadow-[0_24px_60px_-40px_rgba(84,98,64,0.24)]">
                <div className="relative aspect-[4/3] min-h-[260px] sm:min-h-[320px] lg:h-full lg:min-h-0 lg:aspect-auto">
                  <Link
                    href={`${ROUTES.CREATIVE_CONTESTS}/${activeContest.slug}`}
                    className="group block h-full w-full"
                    aria-label={activeContest.title}
                  >
                    <div className="relative h-full w-full">
                      {contestSliderImages.map((imageSrc, index) => (
                        <div
                          key={imageSrc}
                          className={`absolute inset-0 transition-opacity duration-500 ${
                            index === activeContestIndex ? "opacity-100" : "opacity-0"
                          }`}
                          aria-hidden={index !== activeContestIndex}
                        >
                          <img
                            src={imageSrc}
                            alt={activeContest.title}
                            className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-[1.03]"
                            loading="lazy"
                          />
                        </div>
                      ))}

                      <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/70 px-3 py-2 backdrop-blur-sm sm:bottom-4">
                        {contestSliderImages.map((imageSrc, index) => (
                          <button
                            key={imageSrc}
                            type="button"
                            onClick={(event) => {
                              event.preventDefault();
                              setActiveContestIndex(index);
                            }}
                            className={`h-2.5 rounded-full transition-all ${
                              index === activeContestIndex ? "w-6 bg-[#55614a]" : "w-2.5 bg-slate-400/70"
                            }`}
                            aria-label={`${index + 1}-rasmni ko'rsatish`}
                            aria-pressed={index === activeContestIndex}
                          />
                        ))}
                      </div>
                    </div>
                  </Link>
                </div>
              </Card>
            </ScrollCard>
          </div>
        </HomeSectionShell>
      </Container>
    </section>
  );
});

HomeSectionsContests.displayName = "HomeSectionsContests";
