"use client";

import { memo } from "react";

import { ROUTES } from "@/constants";
import { BgBubbles, Button, Card, Container, SectionHeading } from "@/components";
import { FadeIn } from "@/components/effects/FadeIn";

export const HomeSectionsAbout = memo(function HomeSectionsAbout() {
  return (
    <section
      id="about"
      className="relative my-10 bg-blue-200 py-12 md:my-16 md:py-20"
    >
      <Container className="relative z-10">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <FadeIn>
            <div className="space-y-5">
              <SectionHeading title="Biz haqimizda" />
              <p className="text-lg font-medium leading-relaxed text-slate-700">
                Bolalar kontentini rivojlantirish markazi O‘zbekiston Respublikasi
                Prezidentining 2025-yil 15-maydagi “Bolalar uchun mo‘ljallangan
                milliy kontentlar yaratish va ularni ommalashtirishni
                qo‘llab-quvvatlash chora-tadbirlari to‘g‘risida”gi PQ-183-son
                qaroriga muvofiq tashkil etilgan bo‘lib, undan ko‘zlangan maqsad
                farzandlarimizni milliy o‘zligimiz mezonlariga zid bo‘lgan
                kontentlarning salbiy ta’siridan va salomatligiga zarar yetkazishi
                mumkin bo‘lgan axborotlardan himoya qilish, shuningdek, ularni
                ta’limga keng jalb etish, kasbga yo‘naltirish hamda yuksak
                vatanparvarlik ruhida tarbiyalashga mo‘ljallangan milliy
                kontentlar yaratishni qo‘llab-quvvatlashdir.
              </p>

              <Button href={ROUTES.ABOUT} theme="primary">
                Batafsil
              </Button>
            </div>
          </FadeIn>

          <FadeIn>
            <Card className="overflow-hidden p-0 ring-4 ring-orange-400/80">
              <div className="relative aspect-[572/514]">
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source src="/videos/intro.mp4" type="video/mp4" />
                </video>
              </div>
            </Card>
          </FadeIn>
        </div>
      </Container>

      <BgBubbles color="#baedfd" className="bottom-full" />
      <BgBubbles color="#baedfd" className="top-full rotate-180" />
    </section>
  );
});

HomeSectionsAbout.displayName = "HomeSectionsAbout";
