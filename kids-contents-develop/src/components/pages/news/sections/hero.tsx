"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { Newspaper, Search, X } from "lucide-react";

import { fetchNews } from "@/lib";
import { NewsItemType } from "@/types";
import { HomeSectionShell, HomeStatePanel, NewsItem, SiteLoader } from "@/components";

const INITIAL_VISIBLE = 9;
const LOAD_MORE_STEP = 9;

export const NewsSectionsHero = memo(function NewsSectionsHero() {
  const [news, setNews] = useState<NewsItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      setHasError(false);
      try {
        const data = await fetchNews();
        setNews(data);
        setVisibleCount(INITIAL_VISIBLE);
      } catch (error) {
        console.error("Error loading news:", error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  const filteredNews = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return news;
    return news.filter((item) =>
      [item.title, item.description ?? ""].some((v) => v.toLowerCase().includes(q))
    );
  }, [news, query]);

  const visibleNews = filteredNews.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredNews.length;

  return (
    <section
      id="hero"
      className="hero-section relative bg-gradient-to-b from-[#eef1f5] to-transparent py-8 md:py-12 lg:py-16"
    >
      <div className="container relative z-10 max-w-[1508px] 2xl:max-w-[88%]">
        <HomeSectionShell className="border-[#d4dce5] bg-white/90 p-5 sm:p-6 lg:p-8 xl:p-10 shadow-[0_28px_70px_-48px_rgba(15,23,42,0.16)]">
          <div className="mb-6 flex flex-col gap-4 md:mb-8 md:gap-5">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-300/80 bg-white px-4 py-2 text-sm font-semibold tracking-[-0.01em] text-slate-800 shadow-sm">
              <Newspaper size={16} className="text-slate-600" />
              Yangiliklar
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
                  placeholder="Yangiliklardan qidirish..."
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
                  {filteredNews.length} natija
                </div>
              ) : null}
            </div>
          </div>

          {loading ? (
            <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-slate-200 bg-white">
              <SiteLoader label="Yangiliklar yuklanmoqda" />
            </div>
          ) : hasError ? (
            <HomeStatePanel tone="error">Yangiliklarni yuklab bo‘lmadi.</HomeStatePanel>
          ) : filteredNews.length > 0 ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8 xl:gap-9">
                {visibleNews.map((item) => (
                  <NewsItem key={item.id} item={item} showDescription={false} />
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
                <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-50 to-white ring-1 ring-sky-100">
                  <div className="absolute inset-0 rounded-2xl animate-pulse bg-sky-100/40" />
                  <Newspaper size={30} className="relative z-10 text-sky-700" />
                  <span className="absolute -right-1 -top-1 inline-flex h-4 w-4 animate-bounce rounded-full bg-sky-400" />
                </div>
              </div>

              <h3 className="mb-2 text-lg font-semibold tracking-[-0.01em] text-slate-900">
                {query ? "Qidiruv bo‘yicha natija topilmadi" : "Yangiliklar tayyorlanmoqda"}
              </h3>
              <div className="text-sm leading-6 text-slate-600">
                {query
                  ? "Kalit so‘zni o‘zgartirib ko‘ring yoki qidiruvni tozalang."
                  : "Tez orada bu yerda yangi yangiliklar paydo bo‘ladi. Yangilanishlarni kuzatib boring."}
              </div>
            </div>
          )}
        </HomeSectionShell>
      </div>
    </section>
  );
});

NewsSectionsHero.displayName = "NewsSectionsHero";
