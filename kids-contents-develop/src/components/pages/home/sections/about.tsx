"use client";

import { memo, useEffect, useState } from "react";
import { GraduationCap, ShieldCheck, Sparkles } from "lucide-react";
import { ROUTES } from "@/constants";
import { BgBubbles, Button, Card, Container } from "@/components";
import { FadeIn } from "@/components/effects/FadeIn";

const ABOUT_HIGHLIGHTS = [
  {
    icon: ShieldCheck,
    title: "Himoya va xavfsizlik",
    text: "Bolalarni zararli axborot va salbiy media ta’siridan asrashga qaratilgan milliy yondashuv.",
  },
  {
    icon: GraduationCap,
    title: "Ta’lim va kasbga yo‘naltirish",
    text: "Ta’limga jalb etish va foydali ko‘nikmalarni rivojlantiradigan kontent yaratishni qo‘llab-quvvatlash.",
  },
  {
    icon: Sparkles,
    title: "Milliy va zamonaviy kontent",
    text: "Vatanparvarlik ruhidagi, bolalar uchun qiziqarli va sifatli kontentlarni ommalashtirish.",
  },
];

export const HomeSectionsAbout = memo(function HomeSectionsAbout() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  return (
    <section
      id="about"
      className="relative mb-0 mt-10 overflow-hidden bg-[#dfe9ef] py-12 md:mt-16 md:py-20"
    >
      <Container className="relative z-10 max-w-[1508px] 2xl:max-w-[88%]">
        <div className="grid gap-8 lg:gap-10 xl:gap-12">
          <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-stretch lg:gap-14 xl:gap-16">
            <FadeIn>
              <div className="flex h-full flex-col gap-6">
                <Card className="rounded-3xl border-white/70 bg-white/90 p-5 shadow-[0_24px_60px_-34px_rgba(2,6,23,0.35)] md:p-6 xl:p-7">
                  <p className="text-[17px] leading-8 text-slate-700 md:text-[18px] md:leading-8 xl:text-[19px] xl:leading-9">
                    Bolalar kontentini rivojlantirish markazi O‘zbekiston Respublikasi
                    Prezidentining 2025-yil 15-maydagi PQ-183-son qaroriga muvofiq
                    tashkil etilgan bo‘lib, markazning asosiy maqsadi bolalarni
                    zararli axborotdan himoya qilish, ta’limga keng jalb etish,
                    kasbga yo‘naltirish va yuksak vatanparvarlik ruhida tarbiyalashga
                    xizmat qiladigan milliy kontentlar yaratishni qo‘llab-quvvatlashdir.
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <div className="rounded-full border border-white/70 bg-white/75 px-4 py-2 text-sm font-medium text-slate-700">
                      PQ-183 • 15-may, 2025
                    </div>
                    <Button href={ROUTES.ABOUT} theme="primary">
                      Batafsil
                    </Button>
                  </div>
                </Card>

                <div className="grid gap-3 sm:grid-cols-3">
                  {ABOUT_HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
                    <div
                      key={title}
                      className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white/70 p-4 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.35)] backdrop-blur-sm xl:p-5"
                    >
                      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#e7eef3] text-slate-700">
                        <Icon size={18} />
                      </div>
                      <h3 className="text-sm font-semibold leading-5 text-slate-900">{title}</h3>
                      <p className="mt-2 text-xs leading-5 text-slate-600">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="relative flex h-full flex-col">
                <div className="pointer-events-none absolute -left-3 -top-3 h-28 w-28 rounded-3xl bg-[#a7bfcc]/35 blur-2xl" />
                <div className="pointer-events-none absolute -bottom-6 -right-4 h-32 w-32 rounded-full bg-[#c8b39a]/25 blur-2xl" />

                <Card className="relative h-full overflow-hidden rounded-[28px] border-white/70 bg-white/90 p-0 shadow-[0_34px_70px_-36px_rgba(2,6,23,0.45)]">
                  <div className="relative aspect-[4/5] min-h-[320px] sm:aspect-[16/10] sm:min-h-[380px] lg:h-full lg:min-h-0 lg:aspect-auto">
                    <video
                      className="absolute inset-0 h-full w-full object-cover object-center"
                      autoPlay={!reduceMotion}
                      muted
                      playsInline
                      preload="metadata"
                      poster="/images/about-video-poster.avif"
                      onEnded={(event) => {
                        const video = event.currentTarget;
                        video.currentTime = 0;
                        void video.play();
                      }}
                    >
                      <source src="/videos/intro.mp4" type="video/mp4" />
                    </video>
                  </div>
                </Card>
              </div>
            </FadeIn>
          </div>

        </div>
      </Container>

      <BgBubbles color="#d8e6ee" className="bottom-full" />
      <BgBubbles color="#d8e6ee" className="top-full rotate-180" />
    </section>
  );
});

HomeSectionsAbout.displayName = "HomeSectionsAbout";
