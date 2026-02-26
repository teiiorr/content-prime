"use client";

import { memo, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import {
  Button,
  Card,
  Container,
  HomeCard,
  HomeSectionHeader,
  HomeSectionShell,
  HomeSliderDotsStyles,
  HomeStatePanel,
  Skeleton,
} from "@/components";
import { ScrollCard } from "@/components/motion/ScrollCard";
import { ROUTES } from "@/constants";
import { fetchNewsLimited } from "@/lib";
import type { NewsItemType } from "@/types";

import "swiper/css";
import "swiper/css/pagination";

export const HomeSectionsNews = memo(function HomeSectionsNews() {
  const [news, setNews] = useState<NewsItemType[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadNews() {
      try {
        setHasError(false);
        const data = await fetchNewsLimited(4);
        if (mounted) setNews(data);
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
    <section id="news" aria-labelledby="news-heading" className="bg-gradient-to-b from-[#eef2f5] to-transparent">
      <Container className="max-w-[1508px] py-10 md:py-16 lg:py-24 2xl:max-w-[88%]">
        <HomeSectionShell className="border-slate-300/70 bg-white/90 p-5 sm:p-6 lg:p-8 xl:p-10 shadow-[0_28px_70px_-46px_rgba(15,23,42,0.28)]">
          <HomeSectionHeader>
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
              <div className="inline-flex items-center justify-center rounded-full border border-slate-300/80 bg-white px-5 py-2.5 text-lg font-bold tracking-[-0.02em] text-slate-900 shadow-[0_10px_24px_-18px_rgba(15,23,42,0.25)] sm:px-6 sm:text-xl lg:px-7 lg:py-3 lg:text-2xl">
                Yangiliklar
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                Markaz faoliyati, e’lonlar va muhim voqealar bilan tanishing.
              </p>
            </div>
          </HomeSectionHeader>

          <div className="relative">
            {!isLoaded ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 2xl:gap-5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <HomeCard key={i} className="overflow-hidden border-slate-100 p-0 shadow-none">
                    <Skeleton className="aspect-[16/10] w-full rounded-none" />
                    <div className="space-y-3 p-4 xl:p-5">
                      <Skeleton className="h-5 w-11/12" />
                      <Skeleton className="h-5 w-8/12" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </HomeCard>
                ))}
              </div>
            ) : hasError ? (
              <HomeStatePanel tone="error">
                <p className="text-sm font-medium md:text-base">
                  Yangiliklarni yuklab bo‘lmadi. Keyinroq qayta urinib ko‘ring.
                </p>
              </HomeStatePanel>
            ) : news.length === 0 ? (
              <HomeStatePanel>Yangiliklar topilmadi</HomeStatePanel>
            ) : (
              <>
                <Swiper
                  spaceBetween={16}
                  slidesPerView={1.08}
                  speed={700}
                  loop={news.length > 1}
                  pagination={{
                    el: ".home-news-pagination",
                    clickable: true,
                    bulletClass: "home-news-bullet",
                    bulletActiveClass: "is-active",
                  }}
                  autoplay={
                    reduceMotion
                      ? false
                      : {
                          delay: 6500,
                          disableOnInteraction: false,
                          pauseOnMouseEnter: true,
                        }
                  }
                  modules={[Autoplay, Pagination]}
                  breakpoints={{
                    640: { slidesPerView: 1.25, spaceBetween: 18 },
                    768: { slidesPerView: 2, spaceBetween: 20 },
                    1100: { slidesPerView: 3, spaceBetween: 22 },
                    1400: { slidesPerView: 4, spaceBetween: 24 },
                    1800: { slidesPerView: 4, spaceBetween: 28 },
                  }}
                  className="pb-4"
                >
                  {news.map((item, index) => (
                    <SwiperSlide key={item.id}>
                      <ScrollCard index={index} yFrom={72} scaleFrom={1.08} blurFrom={8}>
                        <Link
                          href={`${ROUTES.NEWS}/${item.slug}`}
                          className="group block focus:outline-none"
                          aria-label={`${item.title} - ${item.date_display}`}
                        >
                          <Card className="h-full overflow-hidden rounded-2xl border-slate-200/90 bg-white p-0 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-24px_rgba(15,23,42,0.28)] group-focus-visible:ring-2 group-focus-visible:ring-slate-400/60 group-focus-visible:ring-offset-2 xl:rounded-3xl">
                            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                              <Image
                                src={item.image_src}
                                alt={item.title}
                                width={420}
                                height={272}
                                className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-[1.03]"
                                sizes="(min-width: 1800px) 21vw, (min-width: 1400px) 22vw, (min-width: 1100px) 28vw, (min-width: 768px) 45vw, 90vw"
                              />
                            </div>

                            <div className="flex h-[84px] flex-col p-3 sm:h-[94px] sm:p-3.5 xl:h-[106px] xl:p-4">
                              <h3 className="line-clamp-2 text-[14px] font-semibold tracking-[-0.01em] leading-5 text-slate-900 transition-colors group-hover:text-slate-700 sm:text-[15px] sm:leading-5 xl:text-base xl:leading-6">
                                {item.title}
                              </h3>
                              <time className="mt-auto truncate whitespace-nowrap pt-1.5 text-xs leading-none font-medium text-slate-500 sm:pt-2 sm:text-sm">
                                {item.date_display}
                              </time>
                            </div>
                          </Card>
                        </Link>
                      </ScrollCard>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <div className="mt-3 flex items-center justify-center sm:hidden">
                  <div className="home-news-pagination home-news-pagination-mobile flex items-center justify-center gap-2" />
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:mt-5 sm:flex-row sm:items-center sm:justify-end">
                  <Button
                    href={ROUTES.NEWS}
                    theme="outlined"
                    className="w-full justify-center sm:w-auto sm:ml-auto"
                  >
                    Barcha yangiliklar
                  </Button>
                </div>
              </>
            )}
          </div>
        </HomeSectionShell>
      </Container>

      <HomeSliderDotsStyles bulletClass="home-news-bullet" />
      <style jsx global>{`
        .home-news-bullet.is-active {
          width: 20px;
          background: rgb(30 41 59);
        }

        .home-news-pagination-mobile {
          width: 100%;
          min-height: 12px;
        }
      `}</style>
    </section>
  );
});

HomeSectionsNews.displayName = "HomeSectionsNews";
