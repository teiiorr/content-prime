"use client";

import { memo, useEffect, useMemo, useState, type ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  X,
  Trophy,
  Clock3,
  CheckCircle2,
  Sparkles,
  Grid2x2,
} from "lucide-react";

import { HomeSectionShell, HomeStatePanel, SiteLoader } from "@/components";
import { ROUTES } from "@/constants";
import { Contest } from "@/types";
import { fetchContests } from "@/lib";

const STATUS_LIST = ["Hammasi", "Faol", "Tez kunda", "Yakunlangan"] as const;
const INITIAL_VISIBLE = 8;
const LOAD_MORE_STEP = 8;

const statusTone: Record<string, string> = {
  Faol: "border-emerald-200 bg-emerald-50 text-emerald-700",
  "Tez kunda": "border-amber-200 bg-amber-50 text-amber-700",
  Yakunlangan: "border-rose-200 bg-rose-50 text-rose-700",
};

const statusIconMap: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  Hammasi: Grid2x2,
  Faol: CheckCircle2,
  "Tez kunda": Clock3,
  Yakunlangan: Sparkles,
};

const ContestCard = memo(function ContestCard({ contest }: { contest: Contest }) {
  return (
    <Link
      href={`${ROUTES.CREATIVE_CONTESTS}/${contest.slug}`}
      className="group block rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_14px_34px_-28px_rgba(15,23,42,0.18)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-28px_rgba(15,23,42,0.2)]"
    >
      <div className="relative overflow-hidden rounded-xl bg-slate-100">
        <div className="absolute left-3 top-3 z-10">
          <span
            className={`inline-flex h-8 items-center rounded-full border px-3 text-xs font-semibold ${
              statusTone[contest.status] ?? "border-slate-200 bg-slate-50 text-slate-700"
            }`}
          >
            {(() => {
              const Icon = statusIconMap[contest.status];
              return Icon ? <Icon size={13} className="mr-1.5" /> : null;
            })()}
            {contest.status}
          </span>
        </div>
        <div className="relative aspect-[16/10]">
          <Image
            src={contest.image_src}
            alt={contest.title}
            fill
            sizes="(min-width: 1280px) 32vw, (min-width: 768px) 48vw, 100vw"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        </div>
      </div>

      <div className="p-3 sm:p-4">
        <h3 className="line-clamp-2 text-lg font-semibold leading-6 tracking-[-0.01em] text-slate-900 sm:text-xl">
          {contest.title}
        </h3>
      </div>
    </Link>
  );
});

export const CreativeContestsPage = memo(function CreativeContestsPage() {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [activeStatus, setActiveStatus] = useState<string>(STATUS_LIST[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  useEffect(() => {
    const loadContests = async () => {
      setLoading(true);
      setHasError(false);
      try {
        const data = await fetchContests();
        setContests(data);
        setVisibleCount(INITIAL_VISIBLE);
      } catch (error) {
        console.error("Error loading contests:", error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };

    loadContests();
  }, []);

  const filteredContests = useMemo(() => {
    let filtered = contests;

    if (activeStatus !== "Hammasi") {
      filtered = filtered.filter((contest) => contest.status === activeStatus);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (contest) =>
          contest.title.toLowerCase().includes(q) ||
          contest.description.toLowerCase().includes(q)
      );
    }

    return filtered;
  }, [contests, activeStatus, searchQuery]);

  const visibleContests = filteredContests.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredContests.length;

  return (
    <div className="bg-background">
      <section
        id="contests-hero"
        className="relative overflow-hidden bg-gradient-to-b from-[#eef1f5] to-transparent py-8 md:py-12 lg:py-16"
      >
        <div className="container relative z-10 max-w-[1508px] 2xl:max-w-[88%]">
          <HomeSectionShell className="border-[#d4dce5] bg-white/90 p-5 sm:p-6 lg:p-8 xl:p-10 shadow-[0_28px_70px_-48px_rgba(15,23,42,0.16)]">
            <div className="mb-6 flex flex-col gap-4 md:mb-8 md:gap-5">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-300/80 bg-white px-4 py-2 text-sm font-semibold tracking-[-0.01em] text-slate-800 shadow-sm">
                <Trophy size={16} className="text-slate-600" />
                Ijodiy tanlovlar
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  {STATUS_LIST.map((status) => {
                    const Icon = statusIconMap[status];
                    return (
                      <button
                        key={status}
                        type="button"
                        onClick={() => {
                          setActiveStatus(status);
                          setVisibleCount(INITIAL_VISIBLE);
                        }}
                        className={[
                          "inline-flex h-10 items-center justify-center rounded-full border px-4 text-sm font-semibold transition",
                          activeStatus === status
                            ? "border-slate-800 bg-slate-800 text-white"
                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                        ].join(" ")}
                      >
                        {Icon ? <Icon size={14} className="mr-1.5" /> : null}
                        {status}
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <label className="relative block w-full sm:max-w-md">
                    <Search
                      size={16}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setVisibleCount(INITIAL_VISIBLE);
                      }}
                      placeholder="Tanlovlardan qidirish..."
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-10 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-200/70"
                    />
                    {searchQuery ? (
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery("");
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
                      {filteredContests.length} natija
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-slate-200 bg-white">
                <SiteLoader label="Tanlovlar yuklanmoqda" />
              </div>
            ) : hasError ? (
              <HomeStatePanel tone="error">Tanlovlarni yuklab bo‘lmadi.</HomeStatePanel>
            ) : filteredContests.length > 0 ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:gap-8">
                  {visibleContests.map((contest) => (
                    <ContestCard key={contest.id} contest={contest} />
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
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-50 to-white ring-1 ring-amber-100">
                    <div className="absolute inset-0 rounded-2xl animate-pulse bg-amber-100/40" />
                    <Trophy size={30} className="relative z-10 text-amber-600" />
                    <span className="absolute -right-1 -top-1 inline-flex h-4 w-4 animate-bounce rounded-full bg-emerald-400" />
                  </div>
                </div>

                <h3 className="mb-2 text-lg font-semibold tracking-[-0.01em] text-slate-900">
                  {searchQuery ? "Qidiruv bo‘yicha tanlov topilmadi" : "Yangi tanlovlar tayyorlanmoqda"}
                </h3>
                <div className="text-sm leading-6 text-slate-600">
                  {searchQuery
                    ? "Kalit so‘zni o‘zgartirib ko‘ring yoki filtrni “Hammasi”ga qaytaring."
                    : "Tez orada bu yerda yangi ijodiy tanlovlar e’lon qilinadi. Yangilanishlarni kuzatib boring."}
                </div>
              </div>
            )}
          </HomeSectionShell>
        </div>
      </section>
    </div>
  );
});
