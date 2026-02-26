"use client";

import { memo, useEffect, useState } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { BgBubbles, Container, HomeSectionShell } from "@/components";
import { ScrollCard } from "@/components/motion/ScrollCard";

export const HomeSectionsPartners = memo(function HomeSectionsPartners() {
  const [reduceMotion, setReduceMotion] = useState(false);
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

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  return (
    <section
      id="partners"
      className="relative my-10 bg-gradient-to-b from-[#e9ece6] to-transparent py-10 sm:my-14 md:my-20 lg:py-24"
    >
      <Container className="relative z-10 max-w-[1508px] 2xl:max-w-[88%]">
        <HomeSectionShell className="border-[#d3d8cf] bg-[#fbfcfa] p-5 sm:p-6 lg:p-8 xl:p-10 shadow-[0_22px_55px_-38px_rgba(44,58,36,0.16)]">
          <ScrollCard index={0} yFrom={42} scaleFrom={1.02} blurFrom={3}>
          <div className="mb-6 flex justify-center md:mb-8 lg:mb-10">
            <div className="inline-flex items-center justify-center rounded-full border border-[#cfd8c9] bg-white px-5 py-2.5 text-center text-lg font-bold tracking-[-0.02em] text-[#45563a] shadow-[0_10px_24px_-18px_rgba(44,58,36,0.22)] sm:px-6 sm:text-xl lg:px-7 lg:py-3 lg:text-2xl">
              Hamkor tashkilotlar
            </div>
          </div>
          </ScrollCard>

          {/* Mobile marquee strip */}
          <div className="md:hidden">
            <ScrollCard index={1} yFrom={68} scaleFrom={1.04} blurFrom={5}>
            <div className="rounded-2xl border border-slate-200/80 bg-transparent p-2.5 sm:p-3">
              <Marquee speed={reduceMotion ? 0 : 28} gradient={false}>
                {PARTNERS.map((partner) => (
                  <div
                    key={partner.id}
                    className="mx-2 flex min-w-[220px] items-center justify-center rounded-2xl border border-slate-200/70 bg-transparent px-4 py-4"
                    title={partner.name}
                  >
                    <Image
                      src={partner.src}
                      width={partner.width}
                      height={partner.height}
                      alt={partner.name}
                      className="h-[88px] w-auto object-contain"
                      sizes="220px"
                    />
                  </div>
                ))}
              </Marquee>
            </div>
            </ScrollCard>
          </div>

          {/* Desktop marquee strip */}
          <div className="hidden md:block">
            <ScrollCard index={1} yFrom={68} scaleFrom={1.04} blurFrom={5}>
            <div className="rounded-2xl border border-slate-200/80 bg-transparent p-3 lg:p-4 xl:p-5">
              <Marquee speed={reduceMotion ? 0 : 50} pauseOnHover gradient={false}>
                {PARTNERS.map((partner) => (
                  <div
                    key={partner.id}
                    className="mx-3 flex min-w-[240px] items-center justify-center rounded-2xl border border-slate-200/70 bg-transparent px-4 py-4 lg:min-w-[280px]"
                    title={partner.name}
                  >
                    <Image
                      src={partner.src}
                      width={partner.width}
                      height={partner.height}
                      alt={partner.name}
                      className="h-[104px] w-auto object-contain lg:h-[116px]"
                      sizes="280px"
                    />
                  </div>
                ))}
              </Marquee>
            </div>
            </ScrollCard>
          </div>
        </HomeSectionShell>
      </Container>

      <BgBubbles color="#ffffc7" className="bottom-full" />
      <BgBubbles color="#ffffc7" className="top-full rotate-180" />
    </section>
  );
});

HomeSectionsPartners.displayName = "HomeSectionsPartners";
