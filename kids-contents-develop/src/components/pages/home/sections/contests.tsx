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

        <Card className="mt-14 overflow-hidden bg-orange-100 p-6 md:p-8 lg:mt-24">
          <h3 className="mb-6 text-center text-2xl font-bold text-base-black lg:text-3xl">
            “Yoʻl-Bars berar dars” multseriali uchun ijodiy tanlov
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6">
            <Card className="flex flex-col items-center gap-5 border-orange-300 bg-orange-100 px-4 py-6 text-center">
              <img
                src="/images/svg/applicants.svg"
                alt="Applicants icon"
                width={48}
                height={48}
              />
              <div>
                <h4 className="mb-2 text-lg text-gray-600">Yakuniy muddat</h4>
                <p className="text-gray-600">2025-yil 13-noyabr</p>
              </div>
            </Card>

            <Card className="flex flex-col items-center gap-5 border-orange-300 bg-orange-100 px-4 py-6 text-center">
              <img
                src="/images/svg/requirements.svg"
                alt="Applicants icon"
                width={48}
                height={48}
              />
              <div className="flex flex-col items-center">
                <h4 className="mb-2 text-lg text-gray-600">
                  Ijodiy tanlov uchun ariza namunasi (pdf)
                </h4>
                <Button onClick={handleDownloadPDF} theme="primary" size="small">
                  PDF yuklab olish
                </Button>
              </div>
            </Card>

            <Card className="flex flex-col items-center gap-5 border-orange-300 bg-orange-100 px-4 py-6 text-center">
              <img
                src="/images/svg/winner.svg"
                alt="Applicants icon"
                width={48}
                height={48}
              />
              <div className="flex flex-col items-center">
                <h4 className="mb-2 text-lg text-gray-600">
                  Tanlov haqida batafsil
                </h4>
                <Button
                  href={`${ROUTES.CREATIVE_CONTESTS}/yol-bars-berar-dars`}
                  theme="primary"
                  size="small"
                >
                  Batafsil ma’lumot
                </Button>
              </div>
            </Card>
          </div>
        </Card>
      </Container>
    </section>
  );
});

HomeSectionsContests.displayName = "HomeSectionsContests";
