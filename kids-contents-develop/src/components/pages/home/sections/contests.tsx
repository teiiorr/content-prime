"use client";
import { memo } from "react";
import { ROUTES } from "@/constants";
import { Button } from "@/components";

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
      <div className="container py-10 lg:py-24">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 md:gap-16">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left max-w-none">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-5">
              Ijodiy <span className="text-green-600">tanlovlar</span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
              Bolalar kontentini rivojlantirish markazi animatsion loyihalar,
              badiiy filmlar, seriallar, kinojurnallar, bolalar kitoblari va
              boshqa turdagi kontentlar yaratish bo‘yicha ijodiy tanlovlarni
              muntazam o‘tkazib boradi.
            </p>
            <div className="flex justify-center lg:justify-start">
              <Button href={ROUTES.CREATIVE_CONTESTS} theme="primary">
                Barcha ijodiy tanlovlar
              </Button>
            </div>
          </div>

          {/* Video/Image Container */}
          <div className="flex-1 flex justify-center w-full">
            <img
              src="/images/yolbars.avif"
              srcSet="/images/yolbars@2x.avif 1.5x"
              width="1200"
              height="1200"
              alt="selections image"
              loading="lazy"
            />
          </div>
        </div>

        {/* Bolalik Tarixi Contest Block */}
        <div className="mt-14 lg:mt-24">
          <div className="relative bg-orange-100 rounded-3xl md:rounded-[32px] lg:rounded-[40px] p-6 lg:p-8 overflow-hidden">
            <h3 className="text-2xl lg:text-3xl font-bold text-center mb-6 text-base-black">
              “Yoʻl-Bars berar dars” multseriali uchun ijodiy tanlov
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
              {/* Applications */}
              <div className="bg-orange-100 flex flex-col items-center text-center gap-5 rounded-[32px] py-6 px-4 border border-orange-500 border-b-[3px]">
                <div className="flex-shrink-0">
                  <img
                    src="/images/svg/applicants.svg"
                    alt="Applicants icon"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <h4 className="text-lg text-gray-600 mb-2">Yakuniy muddat</h4>
                  <p className="text-gray-600">2025-yil 13-noyabr</p>
                </div>
              </div>

              {/* Terms */}
              <div className="bg-orange-100 flex flex-col items-center gap-5 rounded-[32px] py-6 px-4 border border-orange-500 border-b-[3px]">
                <div className="flex-shrink-0">
                  <img
                    src="/images/svg/requirements.svg"
                    alt="Applicants icon"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <h4 className="text-lg text-gray-600 mb-2">
                    Ijodiy tanlov uchun ariza namunasi (pdf)
                  </h4>
                  <div>
                    <Button
                      onClick={handleDownloadPDF}
                      theme="primary"
                      size="small"
                    >
                      PDF yuklab olish
                    </Button>
                  </div>
                </div>
              </div>

              {/* Rewards */}
              <div className="bg-orange-100 flex flex-col items-center gap-5 rounded-[32px] py-6 px-4 border border-orange-500 border-b-[3px]">
                <div className="flex-shrink-0">
                  <img
                    src="/images/svg/winner.svg"
                    alt="Applicants icon"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <h4 className="text-lg text-gray-600 mb-2">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

HomeSectionsContests.displayName = "HomeSectionsContests";
