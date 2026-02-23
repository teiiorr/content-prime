"use client";

import { memo, useEffect, useState } from "react";

import { HomeSectionShell } from "@/components";

export const AboutSectionsHero = memo(function AboutSectionsHero() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  return (
    <section id="hero" className="hero-section relative overflow-hidden bg-gradient-to-b from-[#e6ebf0] to-[#eef1f5]">
      <div className="container relative z-10 max-w-[1508px] pb-12 pt-8 md:pt-12 md:pb-20 lg:pt-16 lg:pb-28 2xl:max-w-[88%]">
        <HomeSectionShell className="border-[#cfd6dd] bg-white/85 p-5 sm:p-6 lg:p-8 xl:p-10 shadow-[0_32px_80px_-50px_rgba(15,23,42,0.22)]">
          <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-stretch lg:gap-12 xl:gap-16">
            <div className="flex h-full flex-col gap-5 lg:gap-6">
              <div className="inline-flex w-fit items-center justify-center rounded-full border border-slate-300/80 bg-white px-5 py-2.5 text-lg font-bold tracking-[-0.02em] text-slate-900 shadow-[0_10px_24px_-18px_rgba(15,23,42,0.2)] sm:px-6 sm:text-xl lg:px-7 lg:py-3 lg:text-2xl">
                Markaz haqida
              </div>

              <div className="hidden rounded-2xl border border-slate-200 bg-white/80 p-3 lg:block lg:p-4">
                <div className="grid gap-2 lg:grid-cols-2 lg:gap-3">
                  <div className="rounded-xl bg-slate-50 px-3 py-2.5 text-center sm:text-left">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                      Asos
                    </div>
                    <div className="mt-1 text-sm font-semibold text-slate-900 sm:text-[15px]">
                      PQ-183 qarori
                    </div>
                  </div>
                  <div className="rounded-xl bg-slate-50 px-3 py-2.5 text-center sm:text-left">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                      Sana
                    </div>
                    <div className="mt-1 text-sm font-semibold text-slate-900 sm:text-[15px]">
                      15 may 2025
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-auto rounded-2xl border border-slate-200 bg-white/80 p-4 sm:p-5 lg:p-6">
                <p className="text-[16px] leading-8 tracking-[-0.005em] text-slate-700 sm:text-lg sm:leading-8 md:text-[19px] md:leading-9 lg:text-[20px] lg:leading-9 xl:max-w-[95%] xl:text-[22px] xl:leading-10">
                  Bolalar kontentini rivojlantirish markazi O‘zbekiston Respublikasi Prezidentining
                  2025-yil 15-maydagi PQ-183-son qaroriga muvofiq tashkil etilgan bo‘lib,
                  bolalarni zararli axborotdan himoya qilish, ta’limga jalb etish va milliy
                  qadriyatlar asosidagi zamonaviy kontentlar yaratishni qo‘llab-quvvatlaydi.
                </p>
              </div>
            </div>

            <div className="relative flex h-full flex-col">
              <div className="pointer-events-none absolute -left-4 -top-4 h-24 w-24 rounded-3xl bg-white/50 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-6 -right-4 h-28 w-28 rounded-full bg-slate-300/25 blur-2xl" />

              <div className="relative h-full overflow-hidden rounded-[24px] bg-white/40 p-1 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.18)] sm:rounded-[28px] lg:rounded-[32px]">
                <div className="relative aspect-[4/3] min-h-[260px] overflow-hidden rounded-[20px] bg-slate-950/95 sm:aspect-[16/10] lg:h-full lg:min-h-0 lg:aspect-auto">
                  <video
                    src="/videos/intro_video.mp4"
                    controls
                    preload="metadata"

                    autoPlay={!reduceMotion}
                    muted
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </HomeSectionShell>
      </div>
    </section>
  );
});

AboutSectionsHero.displayName = "AboutSectionsHero";
