"use client";

import { memo } from "react";
import Marquee from "react-fast-marquee";
import { BgBubbles, Container, SectionHeading } from "@/components";

export const HomeSectionsPartners = memo(function HomeSectionsPartners() {
  const PARTNERS = [
    {
      id: 1,
      name: "O'zbekiston Respublikasi Prezidenti huzuridagi Ijtimoiy Himoya Milliy Agentligi",
      src: "/images/new-partners/ihma.avif",
      srcSet: "/images/new-partners/ihma@2x.avif 2x",
      width: 185,
      height: 135,
    },
    {
      id: 2,
      name: "O'zbekiston Prokuraturasi",
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
      className="relative my-10 bg-green-100 py-10 sm:my-14 md:my-20 lg:py-24"
    >
      <Container className="relative z-10">
        <SectionHeading
          title="Hamkor tashkilotlar"
          className="mb-8 text-center md:mb-12 lg:mb-16"
        />
      </Container>

      <div className="relative w-full">
        <Marquee speed={80} pauseOnHover>
          {PARTNERS.map((partner) => (
            <div
              key={partner.id}
              className="mx-8 flex items-center justify-center rounded-2xl bg-white/70 px-5 py-3 shadow-sm backdrop-blur"
            >
              <img
                src={partner.src}
                srcSet={partner.srcSet}
                width={partner.width}
                height={partner.height}
                alt={partner.name}
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
