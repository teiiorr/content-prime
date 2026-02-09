"use client";
import { memo } from "react";
import Marquee from "react-fast-marquee";
import { BgBubbles } from "@/components";

export const HomeSectionsPartners = memo(function HomeSectionsPartners() {
  const PARTNERS = [
    {
      id: 1,
      name: "O'zbekistion Respublikasi Prezidenti huzuridagi Ijtimoiy Himoya Milliy Agentligi",
      src: "/images/new-partners/ihma.avif",
      srcSet: "/images/new-partners/ihma@2x.avif 2x",
      width: 185,
      height: 135,
    },
    {
      id: 2,
      name: "O'zbekistion Prokuraturasi",
      src: "/images/new-partners/prokuratura.avif",
      srcSet: "/images/new-partners/prokuratura@2x.avif 2x",
      width: 135,
      height: 135,
    },
    {
      id: 3,
      name: "O'zbekiston Respublikasi Ichki Ishlar Vazirligi",
      src: "/images/new-partners/iiv.avif",
      srcSet: "/images/new-partners/iiv@2x.avif 2x",
      width: 135,
      height: 135,
    },
    {
      id: 4,
      name: "O'zbekiston Respublikasi Mudofaa Vazirligi",
      src: "/images/new-partners/mv.avif",
      srcSet: "/images/new-partners/mv@2x.avif 2x",
      width: 135,
      height: 135,
    },
    {
      id: 5,
      name: "Favqulotda Vaziyatlar Vazirligi",
      src: "/images/new-partners/fvv.avif",
      srcSet: "/images/new-partners/fvv@2x.avif 2x",
      width: 135,
      height: 135,
    },
    {
      id: 6,
      name: "O'zbekiston Respublikasi Raqamli Texnologiyalar Vazirligi",
      src: "/images/new-partners/rtv.avif",
      srcSet: "/images/new-partners/rtv@2x.avif 2x",
      width: 221,
      height: 135,
    },
    {
      id: 7,
      name: "O'zbekiston Respublikasi Energetika Vazirligi",
      src: "/images/new-partners/ev.avif",
      srcSet: "/images/new-partners/ev@2x.avif 2x",
      width: 208,
      height: 135,
    },
    {
      id: 8,
      name: "O'zbekiston Respublikasi Ekologiya, atrof-muhitni muhofaza qilish va iqlim o‘zgarishi vazirligi",
      src: "/images/new-partners/ekologiya.avif",
      srcSet: "/images/new-partners/ekologiya@2x.avif 2x",
      width: 221,
      height: 135,
    },
    {
      id: 9,
      name: "O'zbekiston Respublikasi Transport Vazirligi",
      src: "/images/new-partners/tv.avif",
      srcSet: "/images/new-partners/tv@2x.avif 2x",
      width: 351,
      height: 135,
    },
    {
      id: 10,
      name: "O'zbekiston Respublikasi Madaniyat Vazirligi",
      src: "/images/new-partners/madaniyat.avif",
      srcSet: "/images/new-partners/madaniyat@2x.avif 2x",
      width: 163,
      height: 135,
    },
    {
      id: 11,
      name: "O'zbekiston Respublikasi Oliy Ta'lim, Fan va Innovatsiyalar Vazirligi",
      src: "/images/new-partners/otfiv.avif",
      srcSet: "/images/new-partners/otfiv@2x.avif 2x",
      width: 232,
      height: 135,
    },
    {
      id: 12,
      name: "O'zbekiston Respublikasi Sog'liqni Saqlash Vazirligi",
      src: "/images/new-partners/ssv.avif",
      srcSet: "/images/new-partners/ssv@2x.avif 2x",
      width: 192,
      height: 135,
    },
    {
      id: 13,
      name: "O'zbekiston Respublikasi Sportni Rivojlantirish Vazirligi",
      src: "/images/new-partners/srv.avif",
      srcSet: "/images/new-partners/srv@2x.avif 2x",
      width: 221,
      height: 135,
    },
    {
      id: 14,
      name: "O'zbekiston Respublikasi Qishloq Xo'jaligi Vazirligi",
      src: "/images/new-partners/qxv.avif",
      srcSet: "/images/new-partners/qxv@2x.avif 2x",
      width: 221,
      height: 135,
    },
    {
      id: 15,
      name: "O'zbekiston Respublikasi Suv Xo'jaligi Vazirligi",
      src: "/images/new-partners/sxv.avif",
      srcSet: "/images/new-partners/sxv@2x.avif 2x",
      width: 159,
      height: 135,
    },
    {
      id: 16,
      name: "O'zbekiston Respublikasi Davlat Bojxona Xizmati",
      src: "/images/new-partners/dbv.avif",
      srcSet: "/images/new-partners/dbv@2x.avif 2x",
      width: 151,
      height: 135,
    },
    {
      id: 17,
      name: "O'zbekiston Respublikasi Davlat Soliq Qo'mitasi",
      src: "/images/new-partners/soliq.avif",
      srcSet: "/images/new-partners/soliq@2x.avif 2x",
      width: 165,
      height: 135,
    },
    {
      id: 18,
      name: "O'zbekiston Davlat Aktivlarini Boshqarish Agentligi",
      src: "/images/new-partners/uzsama.avif",
      srcSet: "/images/new-partners/uzsama@2x.avif 2x",
      width: 221,
      height: 135,
    },
    {
      id: 19,
      name: "O'zbekiston Yoshlar Ishlari Agentligi",
      src: "/images/new-partners/yoshlar-agentligi.avif",
      srcSet: "/images/new-partners/yoshlar-agentligi@2x.avif 2x",
      width: 221,
      height: 135,
    },
  ];

  return (
    <section
      id="partners"
      className="relative py-10 lg:py-24 my-10 sm:my-14 md:my-20 bg-green-100"
    >
      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-base-black">
            Hamkor tashkilotlar
          </h2>
        </div>
      </div>

      <div className="relative w-full">
        <Marquee speed={80}>
          {PARTNERS.map((partner) => (
            <div
              key={partner.src}
              className="mx-8 flex items-center justify-center"
            >
              <img
                src={partner.src}
                srcSet={partner.srcSet}
                width={partner.width}
                height={partner.height}
                alt="Partner image"
                loading="lazy"
                className="h-[135px] w-auto object-contain"
              />
            </div>
          ))}
        </Marquee>
      </div>

      <BgBubbles color="#ffffc7" className="bottom-full" />
      <BgBubbles color="#ffffc7" className="top-full rotate-180" />
    </section>
  );
});

HomeSectionsPartners.displayName = "HomeSectionsPartners";
