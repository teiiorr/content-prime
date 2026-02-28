"use client";

import { memo, useEffect, useState } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { Container, HomeSectionShell } from "@/components";
import { ScrollCard } from "@/components/motion/ScrollCard";

export const HomeSectionsPartners = memo(function HomeSectionsPartners() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const PARTNERS = [
    { id: 1, name: "IHMA", src: "/images/new-partners/ihma@2x.avif", srcSet: "/images/new-partners/ihma@2x.avif 2x", width: 185, height: 135 },
    { id: 2, name: "Prokuratura", src: "/images/new-partners/prokuratura@2x.avif", srcSet: "/images/new-partners/prokuratura@2x.avif 2x", width: 135, height: 135 },
    { id: 3, name: "IIV", src: "/images/new-partners/iiv@2x.avif", srcSet: "/images/new-partners/iiv@2x.avif 2x", width: 135, height: 135 },
    { id: 4, name: "UZSAMA", src: "/images/new-partners/uzsama@2x.avif", srcSet: "/images/new-partners/uzsama@2x.avif 2x", width: 221, height: 135 },
    { id: 5, name: "Yoshlar Agentligi", src: "/images/new-partners/yoshlar-agentligi@2x.avif", srcSet: "/images/new-partners/yoshlar-agentligi@2x.avif 2x", width: 221, height: 135 },
    { id: 6, name: "DBV", src: "/images/new-partners/dbv@2x.avif", srcSet: "/images/new-partners/dbv@2x.avif 2x", width: 180, height: 135 },
    { id: 7, name: "Ekologiya", src: "/images/new-partners/ekologiya@2x.avif", srcSet: "/images/new-partners/ekologiya@2x.avif 2x", width: 180, height: 135 },
    { id: 8, name: "EV", src: "/images/new-partners/ev@2x.avif", srcSet: "/images/new-partners/ev@2x.avif 2x", width: 180, height: 135 },
    { id: 9, name: "FVV", src: "/images/new-partners/fvv@2x.avif", srcSet: "/images/new-partners/fvv@2x.avif 2x", width: 180, height: 135 },
    { id: 10, name: "Madaniyat", src: "/images/new-partners/madaniyat@2x.avif", srcSet: "/images/new-partners/madaniyat@2x.avif 2x", width: 180, height: 135 },
    { id: 11, name: "MV", src: "/images/new-partners/mv@2x.avif", srcSet: "/images/new-partners/mv@2x.avif 2x", width: 180, height: 135 },
    { id: 12, name: "OTFIV", src: "/images/new-partners/otfiv@2x.avif", srcSet: "/images/new-partners/otfiv@2x.avif 2x", width: 180, height: 135 },
    { id: 13, name: "QXV", src: "/images/new-partners/qxv@2x.avif", srcSet: "/images/new-partners/qxv@2x.avif 2x", width: 180, height: 135 },
    { id: 14, name: "RTV", src: "/images/new-partners/rtv@2x.avif", srcSet: "/images/new-partners/rtv@2x.avif 2x", width: 180, height: 135 },
    { id: 15, name: "Soliq", src: "/images/new-partners/soliq@2x.avif", srcSet: "/images/new-partners/soliq@2x.avif 2x", width: 180, height: 135 },
    { id: 16, name: "SRV", src: "/images/new-partners/srv@2x.avif", srcSet: "/images/new-partners/srv@2x.avif 2x", width: 180, height: 135 },
    { id: 17, name: "SSV", src: "/images/new-partners/ssv@2x.avif", srcSet: "/images/new-partners/ssv@2x.avif 2x", width: 180, height: 135 },
    { id: 18, name: "SXV", src: "/images/new-partners/sxv@2x.avif", srcSet: "/images/new-partners/sxv@2x.avif 2x", width: 180, height: 135 },
    { id: 19, name: "TV", src: "/images/new-partners/tv@2x.avif", srcSet: "/images/new-partners/tv@2x.avif 2x", width: 180, height: 135 },
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
            <div className="text-center text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
              Hamkor tashkilotlar
            </div>
          </div>
          </ScrollCard>

          {/* Mobile marquee strip */}
          <div className="md:hidden">
            <ScrollCard index={1} yFrom={68} scaleFrom={1.04} blurFrom={5}>
            <div className="p-1">
              <Marquee speed={reduceMotion ? 0 : 28} gradient={false}>
                {PARTNERS.map((partner) => (
                  <div
                    key={partner.id}
                    className="mx-4 flex min-w-[220px] items-center justify-center px-2 py-3"
                    title={partner.name}
                  >
                    <Image
                      src={partner.src}
                      width={partner.width}
                      height={partner.height}
                      alt={partner.name}
                      className="h-[108px] w-auto object-contain"
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
            <div className="p-1">
              <Marquee speed={reduceMotion ? 0 : 50} pauseOnHover gradient={false}>
                {PARTNERS.map((partner) => (
                  <div
                    key={partner.id}
                    className="mx-5 flex min-w-[240px] items-center justify-center px-3 py-3 lg:min-w-[280px]"
                    title={partner.name}
                  >
                    <Image
                      src={partner.src}
                      width={partner.width}
                      height={partner.height}
                      alt={partner.name}
                      className="h-[124px] w-auto object-contain lg:h-[138px]"
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

    </section>
  );
});

HomeSectionsPartners.displayName = "HomeSectionsPartners";
