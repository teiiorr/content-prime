"use client";

import { memo, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { ROUTES } from "@/constants";
import { NewsItemType } from "@/types";
import { fetchInternationalNews } from "@/lib";
import {
  BgBubbles,
  HomeCard,
  HomeSectionHeader,
  HomeSectionShell,
  HomeSliderDotsStyles,
  HomeStatePanel,
  SiteLoader,
} from "@/components";
import { ScrollCard } from "@/components/motion/ScrollCard";

const PARTNERS = [
  {
    key: "unesco",
    src: "/images/international/unesco.avif",
    srcSet: "/images/international/unesco@2x.avif 1.5x",
    width: 327,
    height: 70,
    alt: "UNESCO logo image",
    className: "w-[92%] sm:w-[95%] lg:w-full",
  },
  {
    key: "unicef",
    src: "/images/international/unicef.avif",
    srcSet: "/images/international/unicef@2x.avif 1.5x",
    width: 280,
    height: 70,
    alt: "UNICEF logo image",
    className: "w-[88%] sm:w-[92%] lg:w-[94%]",
  },
  {
    key: "lafs",
    src: "/images/international/los-angeles.avif",
    srcSet: "/images/international/los-angeles@2x.avif 1.5x",
    width: 270,
    height: 70,
    alt: "The Los Angeles film school logo image",
    className: "w-[90%] sm:w-[94%] lg:w-[96%]",
  },
  {
    key: "trt",
    src: "/images/international/cocuk.avif",
    srcSet: "/images/international/cocuk@2x.avif 1.5x",
    width: 101,
    height: 70,
    alt: "TRT cocuk logo image",
    className: "h-[84px] sm:h-[96px] lg:h-[112px] xl:h-[122px] w-auto",
  },
];

export const AboutSectionsInternationalPartnership = memo(
  function AboutSectionsInternationalPartnership() {
    const [internationalNews, setInternationalNews] = useState<NewsItemType[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [reduceMotion, setReduceMotion] = useState(false);

    useEffect(() => {
      let mounted = true;

      async function loadNews() {
        try {
          setHasError(false);
          const data = await fetchInternationalNews();
          if (mounted) setInternationalNews(data);
        } catch (err) {
          console.error("Error loading news:", err);
          if (mounted) setHasError(true);
        } finally {
          if (mounted) setIsLoaded(true);
        }
      }

      loadNews();

      return () => {
        mounted = false;
      };
    }, []);

    useEffect(() => {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      const update = () => setReduceMotion(media.matches);
      update();
      media.addEventListener?.("change", update);
      return () => media.removeEventListener?.("change", update);
    }, []);

    return (
      <section
        id="international-cooperation"
        className="relative bg-gradient-to-b from-[#f1ede7] to-transparent py-10 md:py-16 lg:py-24"
      >
        <div className="container max-w-[1508px] 2xl:max-w-[88%]">
          <HomeSectionShell className="border-[#d6cec3] bg-[#fdfcf9] p-5 sm:p-6 lg:p-8 xl:p-10 shadow-[0_28px_70px_-48px_rgba(99,83,64,0.16)]">
            <HomeSectionHeader>
              <div className="flex justify-center">
                <div className="inline-flex items-center rounded-full border border-slate-300/80 bg-white px-5 py-2.5 text-base font-bold tracking-[-0.01em] text-slate-900 shadow-sm sm:px-6 sm:py-3 sm:text-lg md:px-7 md:py-3.5 md:text-xl">
                  Xalqaro hamkorlik
                </div>
              </div>
            </HomeSectionHeader>

            <div className="grid grid-cols-2 place-content-center place-items-center gap-12 rounded-[32px] border border-slate-200 bg-white px-12 py-16 min-h-[220px] lg:gap-14">
              {PARTNERS.map((partner, index) => (
                <ScrollCard key={partner.key} index={index} yFrom={56} scaleFrom={1.05} blurFrom={5} delayStep={0.04}>
                  <div className="flex w-full items-center justify-center">
                    <Image
                      src={partner.src}
                      alt={partner.alt}
                      width={partner.width}
                      height={partner.height}
                      className="max-sm:h-auto max-sm:w-full"
                      sizes="(min-width: 1024px) 327px, 45vw"
                    />
                  </div>
                </ScrollCard>
              ))}
            </div>

            <div className="mt-6 lg:mt-8">
              {!isLoaded ? (
                <div className="rounded-2xl border border-slate-200 bg-white py-24">
                  <div className="flex items-center justify-center">
                    <SiteLoader label="Yangiliklar yuklanmoqda" />
                  </div>
                </div>
              ) : hasError ? (
                <HomeStatePanel tone="error">
                  Xalqaro hamkorlik yangiliklarini yuklab bo‘lmadi.
                </HomeStatePanel>
              ) : internationalNews.length === 0 ? (
                <HomeStatePanel>Yangiliklar topilmadi</HomeStatePanel>
              ) : (
                <>
                  <Swiper
                    spaceBetween={16}
                    slidesPerView={1.08}
                    speed={700}
                    loop={internationalNews.length > 1}
                    pagination={{
                      el: ".about-intl-pagination",
                      clickable: true,
                      bulletClass: "about-intl-bullet",
                      bulletActiveClass: "is-active",
                    }}
                    autoplay={
                      reduceMotion
                        ? false
                        : {
                            delay: 4200,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                          }
                    }
                    modules={[Autoplay, Pagination]}
                    breakpoints={{
                      640: { slidesPerView: 1.25, spaceBetween: 18 },
                      768: { slidesPerView: 2, spaceBetween: 20 },
                      1200: { slidesPerView: 3, spaceBetween: 22 },
                      1700: { slidesPerView: 3.2, spaceBetween: 26 },
                    }}
                    className="pb-2"
                  >
                    {internationalNews.map((item, index) => (
                      <SwiperSlide key={item.id}>
                        <ScrollCard index={index} yFrom={72} scaleFrom={1.07} blurFrom={7}>
                          <Link
                            href={`${ROUTES.internatiolPartnership}/${item.slug}`}
                            aria-label={`${item.title} - ${item.date_display}`}
                            className="group block focus:outline-none"
                          >
                            <HomeCard className="overflow-hidden p-0 shadow-[0_14px_34px_-28px_rgba(15,23,42,0.22)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-26px_rgba(15,23,42,0.24)] group-focus-visible:ring-2 group-focus-visible:ring-slate-400/60 group-focus-visible:ring-offset-2">
                              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                                <Image
                                  src={item.image_src}
                                  alt={item.title}
                                  width={420}
                                  height={260}
                                  className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-[1.03]"
                                  sizes="(min-width: 1700px) 24vw, (min-width: 1200px) 30vw, (min-width: 768px) 44vw, 92vw"
                                />
                              </div>
                              <div className="flex h-[96px] flex-col p-3.5 sm:h-[106px] sm:p-4">
                                <h3 className="line-clamp-2 text-[14px] font-semibold tracking-[-0.01em] leading-5 text-slate-900 transition-colors group-hover:text-slate-700 sm:text-[15px] sm:leading-5 xl:text-base xl:leading-6">
                                  {item.title}
                                </h3>
                                <time className="mt-auto truncate whitespace-nowrap pt-2 text-xs leading-none font-medium text-slate-500 sm:text-sm">
                                  {item.date_display}
                                </time>
                              </div>
                            </HomeCard>
                          </Link>
                        </ScrollCard>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  <div className="mt-3 flex items-center justify-center sm:hidden">
                    <div className="about-intl-pagination flex items-center justify-center gap-2" />
                  </div>
                </>
              )}
            </div>
          </HomeSectionShell>
        </div>

        <BgBubbles color="#ebe1d4" className="bottom-full" />
        <BgBubbles color="#ebe1d4" className="top-full rotate-180" />

        <HomeSliderDotsStyles bulletClass="about-intl-bullet" />
        <style jsx global>{`
          .about-intl-bullet.is-active {
            width: 20px;
            background: rgb(71 85 105);
          }
        `}</style>
      </section>
    );
  }
);

AboutSectionsInternationalPartnership.displayName =
  "AboutSectionsInternationalPartnership";
