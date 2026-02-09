"use client";

import { memo, useEffect, useState } from "react";
import { Spin } from "antd";

import { fetchNews } from "@/lib";
import { NewsItemType } from "@/types";
import { NewsItem } from "@/components";

export const NewsSectionsHero = memo(function NewsSectionsHero() {
  const [news, setNews] = useState<NewsItemType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      const data = await fetchNews();
      setNews(data);
      setLoading(false);
    };

    loadNews();
  }, []);

  return (
    <section id="hero" className="hero-section">
      <div className="container relative z-10 min-h-screen">
        <div className="flex flex-col gap-10 py-8">
          <div className="md:text-center mb-4 md:mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Yangiliklar
            </h1>
          </div>

          {loading ? (
            <div className="py-52 flex items-center justify-center">
              <Spin aria-label="Yangiliklar yuklanmoqda" />
            </div>
          ) : news.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
              {news.map((item) => (
                <NewsItem key={item.id} item={item} showDescription={false} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center py-20 max-w-sm text-center mx-auto lg:py-32 flex-col items-center">
              <img
                src="/images/empty.avif"
                srcSet="/images/empty@2x.avif 1.5x"
                alt="Empty illustration"
                className="mb-8"
                loading="lazy"
                width={172}
                height={128}
              />

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Hozircha mavjud yanggili topilmadi
              </h3>
              <div className="text-gray-600 text-sm">
                Yangi loyihalar ustida ishlayapmiz, tez orada bu yerda paydo
                bo‘ladi!
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

NewsSectionsHero.displayName = "NewsSectionsHero";
