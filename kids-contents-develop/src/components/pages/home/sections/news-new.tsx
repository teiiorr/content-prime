"use client";

import { memo, useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Spin } from "antd";

import { Button } from "@/components";
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

  const swiperSettings = {
    spaceBetween: 32,
    slidesPerView: 3,
    slidesPerGroup: 1,
    loop: true,
    navigation: {
      nextEl: ".news-next-btn",
      prevEl: ".news-prev-btn",
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    modules: [Navigation, Autoplay],
    breakpoints: {
      1100: { slidesPerView: 3 },
      768: { slidesPerView: 2 },
      640: { slidesPerView: 2 },
      400: { slidesPerView: 1 },
      350: { slidesPerView: 1 },
      150: { slidesPerView: 1 },
    },
  };

  return (
    <section id="news" aria-labelledby="news-heading">
      <div className="container py-10 md:py-16 lg:py-24">
        <div className="flex items-center justify-between mb-8 md:mb-10 lg:mb-12">
          <h2
            id="news-heading"
            className="text-3xl lg:text-4xl font-bold text-base-black"
          >
            Yangiliklar
          </h2>
          <Button
            href={ROUTES.NEWS}
            theme="outlined"
            className="max-md:hidden"
            aria-label="Barcha yangiliklar sahifasiga o'tish"
          >
            Barcha yangiliklar
          </Button>
        </div>

        <div className="mt-8 relative z-10">
          {/* Navigation Buttons */}
          <Button
            aria-label="Oldingi yangilik"
            theme="primary"
            className="absolute left-2 md:-left-2 lg:-left-6 top-1/2 -translate-y-1/2 w-12 h-12 news-prev-btn z-10 sm:rounded-full"
          >
            <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6" />
          </Button>
          <Button
            aria-label="Keyingi yangilik"
            theme="primary"
            className="absolute right-2 md:-right-2 lg:-right-6 top-1/2 -translate-y-1/2 w-12 h-12 news-next-btn z-10 sm:rounded-full"
          >
            <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6" />
          </Button>

          <div className="relative">
            {!isLoaded ? (
              <div className="py-52 flex items-center justify-center">
                <Spin aria-label="Yangiliklar yuklanmoqda" />
              </div>
            ) : news.length === 0 ? (
              <p className="text-center text-gray-500 py-20">
                Yangiliklar topilmadi
              </p>
            ) : (
              <Swiper {...swiperSettings} className="news-swiper pt-8 pb-12">
                {news.map((item) => (
                  <SwiperSlide key={item.id}>
                    <Link
                      href={`${ROUTES.NEWS}/${item.slug}`}
                      aria-label={`${item.title} - ${item.date_display}`}
                      className="block group"
                    >
                      <article className="cursor-pointer">
                        <div className="relative aspect-video overflow-hidden rounded-xl">
                          <img
                            src={item.image_src}
                            srcSet={item.image_srcset}
                            alt={item.title}
                            width={350}
                            height={240}
                            loading="lazy"
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Content */}
                        <div className="mt-5">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors duration-300">
                            {item.title}
                          </h3>

                          <time
                            dateTime={item.date_display}
                            className="text-sm text-gray-500 font-medium"
                          >
                            {item.date_display}
                          </time>
                        </div>
                      </article>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>

        <div className="mt-8 md:hidden flex justify-center">
          <Button
            href={ROUTES.NEWS}
            theme="outlined"
            aria-label="Barcha yangiliklar sahifasiga o'tish"
          >
            Barcha yangiliklar
          </Button>
        </div>
      </div>
    </section>
  );
});

HomeSectionsNews.displayName = "HomeSectionsNews";
