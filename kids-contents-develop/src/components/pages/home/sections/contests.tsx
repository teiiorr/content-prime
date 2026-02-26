"use client";

import { memo } from "react";
import Image from "next/image";
import {
  BadgeCheck,
  BookOpen,
  Clapperboard,
  Film,
  WandSparkles,
} from "lucide-react";
import { ROUTES } from "@/constants";
import { Button, Card, Container, HomeSectionShell } from "@/components";
import { ScrollCard } from "@/components/motion/ScrollCard";

export const HomeSectionsContests = memo(function HomeSectionsContests() {
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

  return (
    <section id="contests" className="relative bg-gradient-to-b from-[#ecefe7] to-transparent">
      <Container className="max-w-[1508px] py-10 lg:py-24 2xl:max-w-[88%]">
        <HomeSectionShell className="border-[#cfd5c6] bg-[#fcfcfa] p-5 sm:p-6 lg:p-8 xl:p-10 shadow-[0_28px_70px_-48px_rgba(72,84,56,0.2)]">
          <div className="grid items-start gap-8 lg:min-h-[520px] lg:grid-cols-[1.05fr_.95fr] lg:items-stretch lg:gap-12 xl:min-h-[600px] xl:gap-16">
            <div className="order-2 flex h-full flex-col lg:order-1">
              <div className="mb-5 inline-flex items-center justify-center rounded-full border border-[#c9d0bd] bg-[#eef2e7] px-5 py-2.5 text-lg font-bold tracking-[-0.02em] text-[#55614a] shadow-[0_10px_24px_-18px_rgba(84,98,64,0.25)] sm:px-6 sm:text-xl lg:px-7 lg:py-3 lg:text-2xl">
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
                      <div className="flex h-full items-center gap-2.5">
                        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/70">
                          <Icon size={16} />
                        </div>
                        <div className="min-w-0 text-sm font-semibold leading-5 sm:text-[15px]">
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

              <div className="mt-6 pt-1 lg:mt-8 xl:mt-10">
                <Button
                  href={ROUTES.CREATIVE_CONTESTS}
                  theme="outlined"
                  className="w-full justify-center border-[#c8ae86] bg-[#f1e7d7] px-5 py-3 text-base font-semibold text-[#6d5436] shadow-[0_14px_28px_-20px_rgba(109,84,54,0.28)] hover:border-[#b99b71] hover:bg-[#eadcc7] hover:text-[#5d452a] sm:w-auto sm:min-w-[280px] lg:w-full lg:min-h-[54px] lg:text-lg xl:min-h-[58px] xl:text-[19px]"
                >
                  Barcha ijodiy tanlovlar
                </Button>
              </div>
            </div>

            <ScrollCard className="order-1 lg:order-2" index={2} yFrom={84} scaleFrom={1.08} blurFrom={8}>
              <Card className="relative h-full overflow-hidden rounded-[24px] border-[#d4dacb] bg-gradient-to-br from-[#f3f5ef] to-white p-0 shadow-[0_24px_60px_-40px_rgba(84,98,64,0.24)]">
                <div className="relative aspect-[4/3] min-h-[260px] sm:min-h-[320px] lg:h-full lg:min-h-0 lg:aspect-auto">
                  <Image
                    src="/images/yolbars.avif"
                    width={1200}
                    height={1200}
                    alt="Ijodiy tanlovlar visual"
                    className="h-full w-full object-contain object-center p-4 sm:p-5 lg:p-6 xl:p-8"
                    sizes="(min-width: 1024px) 38vw, 92vw"
                  />
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
