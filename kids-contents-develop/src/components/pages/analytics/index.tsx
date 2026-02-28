"use client";

import { memo, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, X, BarChart3 } from "lucide-react";

import { ROUTES } from "@/constants";
import { fetchAnalytics } from "@/lib";
import { AnalyticsItemType } from "@/types";
import { HomeSectionShell, HomeStatePanel, SiteLoader } from "@/components";

const INITIAL_VISIBLE = 9;
const LOAD_MORE_STEP = 9;

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
  const [hasError, setHasError] = useState(false);
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  useEffect(() => {
    const loadAnalytics = async () => {
      setLoading(true);
      setHasError(false);
      try {
        const data = await fetchAnalytics();
        setAnalytics(data);
        setVisibleCount(INITIAL_VISIBLE);
      } catch (error) {
        console.error("Error loading analytics:", error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  const filteredAnalytics = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return analytics;
    return analytics.filter((item) =>
      [item.title, item.description ?? ""].some((v) => v.toLowerCase().includes(q))
    );
  }, [analytics, query]);

  const visibleAnalytics = filteredAnalytics.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredAnalytics.length;

  return (
    <div className="min-h-screen bg-background">
      <section
        id="analytics-hero"
        className="relative overflow-hidden bg-gradient-to-b from-[#eef1f5] to-transparent py-8 md:py-12 lg:py-16"
      >
        <div className="container max-w-[1508px] 2xl:max-w-[88%]">
          <HomeSectionShell className="border-[#d4dce5] bg-white/90 p-5 sm:p-6 lg:p-8 xl:p-10 shadow-[0_28px_70px_-48px_rgba(15,23,42,0.16)]">
            <div className="mb-6 flex flex-col gap-4 md:mb-8 md:gap-5">
              <div className="inline-flex w-fit items-center gap-2 self-center pt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:self-start sm:pt-0 sm:text-3xl lg:text-4xl">
                <BarChart3 size={16} className="text-slate-600 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                Tahlillar
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <label className="relative block w-full sm:max-w-md">
                  <Search
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setVisibleCount(INITIAL_VISIBLE);
                    }}
                    placeholder="Tahlillardan qidirish..."
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-10 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-200/70"
                  />
                  {query ? (
                    <button
                      type="button"
                      onClick={() => {
                        setQuery("");
                        setVisibleCount(INITIAL_VISIBLE);
                      }}
                      className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      aria-label="Qidiruvni tozalash"
                    >
                      <X size={14} />
                    </button>
                  ) : null}
                </label>

                {!loading && !hasError ? (
                  <div className="text-sm font-medium text-slate-500">
                    {filteredAnalytics.length} natija
                  </div>
                ) : null}
              </div>
            </div>

            {loading ? (
              <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-slate-200 bg-white">
                <SiteLoader label="Tahlillar yuklanmoqda" />
              </div>
            ) : hasError ? (
              <HomeStatePanel tone="error">Tahlillarni yuklab bo‘lmadi.</HomeStatePanel>
            ) : filteredAnalytics.length > 0 ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
                  {visibleAnalytics.map((item) => (
                    <AnalyticsCard key={item.id} item={item} />
                  ))}
                </div>

                {canLoadMore ? (
                  <div className="flex justify-center pt-1">
                    <button
                      type="button"
                      onClick={() => setVisibleCount((v) => v + LOAD_MORE_STEP)}
                      className="inline-flex min-w-[180px] items-center justify-center rounded-full border border-emerald-600 bg-white px-5 py-2.5 text-sm font-semibold text-emerald-700 shadow-[0_8px_24px_-18px_rgba(5,150,105,0.35)] transition duration-200 hover:bg-emerald-600 hover:text-white hover:shadow-[0_16px_30px_-16px_rgba(5,150,105,0.5)] active:scale-[0.985] sm:min-w-[200px]"
                    >
                      Yana yuklash
                    </button>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center lg:py-16">
                <div className="mb-6 flex items-center justify-center">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-50 to-white ring-1 ring-violet-100">
                    <div className="absolute inset-0 rounded-2xl animate-pulse bg-violet-100/40" />
                    <BarChart3 size={30} className="relative z-10 text-violet-700" />
                    <span className="absolute -right-1 -top-1 inline-flex h-4 w-4 animate-bounce rounded-full bg-violet-400" />
                  </div>
                </div>

                <h3 className="mb-2 text-lg font-semibold tracking-[-0.01em] text-slate-900">
                  {query ? "Qidiruv bo‘yicha natija topilmadi" : "Yangi tahlillar tayyorlanmoqda"}
                </h3>
                <div className="text-sm leading-6 text-slate-600">
                  {query
                    ? "Kalit so‘zni o‘zgartirib ko‘ring yoki qidiruvni tozalang."
                    : "Tez orada bu yerda yangi tahlillar paydo bo‘ladi. Yangilanishlarni kuzatib boring."}
                </div>
              </div>
            )}
          </HomeSectionShell>
        </div>
      </section>
    </div>
  );
});
