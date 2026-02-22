"use client";

import { memo } from "react";
import { ROUTES } from "@/constants";
import { Button, Card, Container, SectionHeading } from "@/components";

export const HomeSectionsContests = memo(function HomeSectionsContests() {
  const handleDownloadPDF = () => {
    const link = document.createElement("a");
    link.href = "/ariza-namunasi.pdf";
    link.download = "ariza-namunasi.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="contests" className="relative">
      <Container className="py-10 lg:py-24">
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row md:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <SectionHeading
              title="Ijodiy tanlovlar"
              subtitle="Bolalar kontentini rivojlantirish markazi animatsion loyihalar, badiiy filmlar, seriallar, kinojurnallar, bolalar kitoblari va boshqa turdagi kontentlar yaratish bo‘yicha ijodiy tanlovlarni muntazam o‘tkazib boradi."
            />
            <div className="mt-6 flex justify-center lg:justify-start">
              <Button href={ROUTES.CREATIVE_CONTESTS} theme="primary">
                Barcha ijodiy tanlovlar
              </Button>
            </div>
          </div>

          <div className="flex w-full flex-1 justify-center">
            <img
              src="/images/yolbars.avif"
              srcSet="/images/yolbars@2x.avif 1.5x"
              width={1200}
              height={1200}
              alt="selections image"
              loading="lazy"
            />
          </div>
        </div>

      </Container>
    </section>
  );
});

HomeSectionsContests.displayName = "HomeSectionsContests";
