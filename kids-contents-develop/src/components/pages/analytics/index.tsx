"use client";

import { memo, useEffect, useState } from "react";
import Link from "next/link";
import { Spin } from "antd";

import { ROUTES } from "@/constants";
import { fetchAnalytics } from "@/lib";
import { AnalyticsItemType } from "@/types";

const AnalyticsCard = memo(function AnalyticsCard({
  item,
}: {
  item: AnalyticsItemType;
}) {
  return (
    <Link
      href={`${ROUTES.ANALYTICS}/${item.slug}`}
      className="group cursor-pointer flex flex-col"
    >
      <div className="relative overflow-hidden rounded-2xl mb-5">
        <img
          src={item.image_src}
          alt={item.title}
          className="w-full min-h-52 aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col flex-1">
        <h3 className="text-xl font-semibold text-gray-900 leading-tight line-clamp-1 mb-1">
          {item.title}
        </h3>

        {item.description && (
          <p
            className="text-base text-gray-600 leading-relaxed line-clamp-2 mb-4"
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
        )}

        {item.date_display && (
          <div className="text-sm font-medium text-gray-500">
            {item.date_display}
          </div>
        )}
      </div>
    </Link>
  );
});

export const AnalyticsPage = memo(function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsItemType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      setLoading(true);
      const data = await fetchAnalytics();
      setAnalytics(data);
      setLoading(false);
    };

    loadAnalytics();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <section id="analytics-hero" className="overflow-hidden relative">
        <div className="container">
          <div className="py-12 lg:pt-14 lg:pb-28">
            <div className="md:text-center mb-4 mb:mb-12 lg:mb-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Tahlillar
              </h1>
            </div>

            {loading ? (
              <div className="py-52 flex items-center justify-center">
                <Spin aria-label="Tahlillar yuklanmoqda" />
              </div>
            ) : analytics.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {analytics.map((item) => (
                  <AnalyticsCard key={item.id} item={item} />
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
                  Hozircha mavjud tahlil topilmadi
                </h3>
                <div className="text-gray-600 text-sm">
                  Yangi tahlillar ustida ishlayapmiz, tez orada bu yerda paydo
                  bo'ladi!
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
});
