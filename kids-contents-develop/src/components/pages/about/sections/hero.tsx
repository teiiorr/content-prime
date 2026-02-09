import { memo } from "react";

export const AboutSectionsHero = memo(function AboutSectionsHero() {
  return (
    <section id="hero" className="hero-section bg-blue-100">
      <div className="container relative z-10 pt-8 md:pt-12 lg:pt-16 pb-16 md:pb-24 lg:pb-36">
        <div className="flex flex-col gap-6 md:gap-12 lg:gap-16">
          <div className="flex flex-col gap-4 md:gap-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Biz haqimizda
            </h1>
            <p className="text-lg text-gray-700 md:text-xl">
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
              kontentlar yaratishni qo‘llab-quvvatlashdan iborat. Bolalar
              kontentini rivojlantirish markazi bolalar uchun mo‘ljallangan
              tarbiyaviy, ma’rifiy ahamiyatga ega milliy kontentlar va targ‘ibot
              vositalari yaratishni qo‘llab quvvatlaydigan, bolalarga milliy
              madaniyat, san'at, adabiyot, tarix va ma'naviy qadriyatlar haqida
              tushunchalar beradigan milliy kontentlarni joriy qiluvchi
              tashkilotdir.
            </p>
          </div>

          <div className="rounded-3xl z-10 sm:rounded-[30px] lg:rounded-[36px] w-full aspect-video border-4 sm:border-6 lg:border-[8px] border-orange-400 overflow-hidden relative flex items-center justify-center shadow-2xl">
            <video
              src="/videos/intro_video.mp4"
              controls
              preload="metadata"
              poster="/images/about-video-poster.avif"
              className="absolute inset-0 object-cover object-center w-full h-full"
            />
          </div>
        </div>
      </div>

      <div className="absolute left-0 right-0 top-0 w-full bg-blue-100 h-[30vh]"></div>
    </section>
  );
});

AboutSectionsHero.displayName = "AboutSectionsHero";
