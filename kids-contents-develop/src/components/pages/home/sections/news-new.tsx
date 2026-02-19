"use client";

import { memo, useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button, Card, Container, SectionHeading, Skeleton } from "@/components";
import { ROUTES } from "@/constants";
import { fetchNewsLimited } from "@/lib";
import type { NewsItemType } from "@/types";

import "swiper/css";
import "swiper/css/navigation";

export const HomeSectionsNews = memo(function HomeSectionsNews() {
  const [news, setNews] = useState<NewsItemType[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadNews() {
      try {
        const data = await fetchNewsLimited(4);
        if (mounted) setNews(data);
      } catch (err) {
        console.error("Error loading news:", err);
      } finally {
        if (mounted) setIsLoaded(true);
      }
    }

    loadNews();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="news" aria-labelledby="news-heading">
      <Container className="py-10 md:py-16 lg:py-24">
        <div className="mb-8 flex items-center justify-between md:mb-10 lg:mb-12">
          <SectionHeading title="Yangiliklar" className="mb-0" />

          <Button href={ROUTES.NEWS} theme="outlined" className="max-md:hidden">
            Barcha yangiliklar
          </Button>
        </div>

        {!isLoaded ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        ) : news.length === 0 ? (
          <p className="py-20 text-center text-gray-500">Yangiliklar topilmadi</p>
        ) : (
          <div className="relative">
            {/* Nav buttons */}
            <Button
              aria-label="Oldingi yangilik"
              theme="primary"
              className="news-prev-btn absolute -left-3 top-1/2 z-10 h-12 w-12 -translate-y-1/2 sm:rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <Button
              aria-label="Keyingi yangilik"
              theme="primary"
              className="news-next-btn absolute -right-3 top-1/2 z-10 h-12 w-12 -translate-y-1/2 sm:rounded-full"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>

            <Swiper
              spaceBetween={24}
              slidesPerView={3}
              loop
              navigation={{ nextEl: ".news-next-btn", prevEl: ".news-prev-btn" }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              modules={[Navigation, Autoplay]}
              breakpoints={{
                1100: { slidesPerView: 3 },
                768: { slidesPerView: 2 },
                150: { slidesPerView: 1 },
              }}
              className="pt-6 pb-12"
            >
              {news.map((item) => (
                <SwiperSlide key={item.id}>
                  <Link
                    href={`${ROUTES.NEWS}/${item.slug}`}
                    className="group block"
                    aria-label={`${item.title} - ${item.date_display}`}
                  >
                    <Card className="overflow-hidden border-slate-100 p-0 transition hover:-translate-y-1 hover:shadow-[var(--shadow-md)]">
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={item.image_src}
                          srcSet={item.image_srcset}
                          alt={item.title}
                          width={350}
                          height={240}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="p-4">
                        <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-slate-900 transition-colors group-hover:text-emerald-700">
                          {item.title}
                        </h3>
                        <time className="text-sm font-medium text-slate-500">
                          {item.date_display}
                        </time>
                      </div>
                    </Card>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Mobile CTA */}
            <div className="mt-2 flex justify-center md:hidden">
              <Button href={ROUTES.NEWS} theme="outlined">
                Barcha yangiliklar
              </Button>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
});

HomeSectionsNews.displayName = "HomeSectionsNews";
