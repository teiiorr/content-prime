"use client";
import { memo } from "react";

import { ROUTES } from "@/constants";
import { BgBubbles, Button } from "@/components";

export const HomeSectionsAbout = memo(function HomeSectionsAbout() {
  return (
    <section
      id="about"
      className="relative py-12 sm:py-16 lg:py-24 my-10 sm:my-16 lg:my-20 bg-white"
    >
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left Content - Text */}
          <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Biz haqimizda
            </h2>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
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

          {/* Right Content - Video */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative max-w-[572px] w-full aspect-[572/514] overflow-hidden rounded-[28px] bg-white ring-1 ring-black/10 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.6)]">
              <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/videos/intro.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>

      <BgBubbles color="#dbeafe" className="bottom-full" />
      <BgBubbles color="#e2e8f0" className="top-full rotate-180" />
    </section>
  );
});

HomeSectionsAbout.displayName = "HomeSectionsAbout";
