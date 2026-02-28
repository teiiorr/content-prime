"use client";

import { memo, useEffect, useMemo, useState, type ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, LayoutGrid, Clock3, CheckCircle2, Sparkles, Grid2x2 } from "lucide-react";

import { HomeSectionShell, HomeStatePanel, SiteLoader } from "@/components";
import { ScrollCard } from "@/components/motion/ScrollCard";
import { ParallaxSection } from "@/components/motion/ParallaxSection";
import { ROUTES } from "@/constants";
import { fetchProjects } from "@/lib";
import { ProjectItemType } from "@/types";

const STATUS_LIST = ["Hammasi", "Faol", "Tez kunda", "Yakunlangan"] as const;
const INITIAL_VISIBLE = 8;
const LOAD_MORE_STEP = 8;

const statusTone: Record<string, string> = {
  Faol: "border-emerald-200 bg-emerald-50 text-emerald-700",
  "Tez kunda": "border-amber-200 bg-amber-50 text-amber-700",
  Yakunlangan: "border-rose-200 bg-rose-50 text-rose-700",
};

const statusIconMap: Record<string, ComponentType<{ size?: number; className?: string }> | null> = {
  Hammasi: Grid2x2,
  Faol: CheckCircle2,
  "Tez kunda": Clock3,
  Yakunlangan: null,
};

const ProjectCard = memo(function ProjectCard({ project }: { project: ProjectItemType }) {
  return (
    <Link
      href={`${ROUTES.PROJECTS}/${project.slug || project.id}`}
      className="group block h-full rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_14px_34px_-28px_rgba(15,23,42,0.18)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-28px_rgba(15,23,42,0.2)]"
    >
      <div className="relative overflow-hidden rounded-xl bg-slate-100">
        <div className="absolute left-3 top-3 z-10">
          <span
            className={`inline-flex h-8 items-center rounded-full border px-3 text-xs font-semibold ${
              statusTone[project.status] ?? "border-slate-200 bg-slate-50 text-slate-700"
            }`}
          >
            {(() => {
              const Icon = statusIconMap[project.status];
              return Icon ? <Icon size={13} className="mr-1.5" /> : null;
            })()}
            {project.status}
          </span>
        </div>
        <div className="relative aspect-[16/10]">
          <Image
            src={project.image_src}
            alt={project.title}
            fill
            sizes="(min-width: 1280px) 32vw, (min-width: 768px) 48vw, 100vw"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        </div>
      </div>

      <div className="flex min-h-[92px] flex-col p-3 sm:min-h-[104px] sm:p-4">
        <h3 className="line-clamp-2 text-lg font-semibold leading-6 tracking-[-0.01em] text-slate-900 sm:text-xl">
          {project.title}
        </h3>
      </div>
    </Link>
  );
});

export const ProjectsPage = memo(function ProjectsPage() {
  const [activeStatus, setActiveStatus] = useState<string>(STATUS_LIST[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState<ProjectItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      setHasError(false);
      try {
        const data = await fetchProjects();
        setProjects(data);
        setVisibleCount(INITIAL_VISIBLE);
      } catch (error) {
        console.error("Error loading projects:", error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    let filtered = projects;

    if (activeStatus !== "Hammasi") {
      filtered = filtered.filter((project) => project.status === activeStatus);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(q) ||
          (project.description ?? "").toLowerCase().includes(q)
      );
    }

    return filtered;
  }, [projects, activeStatus, searchQuery]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredProjects.length;

  return (
    <div className="bg-background">
      <ParallaxSection tone="slate" intensity={1.05} accentSide="right" stickyAccent={false} contentParallax={false}>
      <section
        id="projects-hero"
        className="relative overflow-hidden bg-gradient-to-b from-[#eef1f5] to-transparent py-8 md:py-12 lg:py-16"
      >
        <div className="container relative z-10 max-w-[1508px] 2xl:max-w-[88%]">
          <HomeSectionShell className="border-[#d4dce5] bg-white/90 p-5 sm:p-6 lg:p-8 xl:p-10 shadow-[0_28px_70px_-48px_rgba(15,23,42,0.16)]">
            <ScrollCard index={0} yFrom={52} scaleFrom={1.02} blurFrom={4}>
            <div className="mb-6 flex flex-col gap-4 md:mb-8 md:gap-5">
              <div className="inline-flex w-fit items-center gap-2 self-center pt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:self-start sm:pt-0 sm:text-3xl lg:text-4xl">
                <LayoutGrid size={16} className="text-slate-600 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                Loyihalar
              </div>

              <div className="flex flex-col gap-3">
                <div className="sm:hidden">
                  <label className="sr-only" htmlFor="projects-status-filter">
                    Holat bo‘yicha filter
                  </label>
                  <select
                    id="projects-status-filter"
                    value={activeStatus}
                    onChange={(e) => {
                      setActiveStatus(e.target.value);
                      setVisibleCount(INITIAL_VISIBLE);
                    }}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200/70"
                  >
                    {STATUS_LIST.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="hidden flex-wrap items-center gap-2 sm:flex">
                  {STATUS_LIST.map((status) => (
                    (() => {
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
                    })()
                  ))}
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
                      placeholder="Loyihalardan qidirish..."
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
                      {filteredProjects.length} natija
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            </ScrollCard>

            {loading ? (
              <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-slate-200 bg-white">
                <SiteLoader label="Loyihalar yuklanmoqda" />
              </div>
            ) : hasError ? (
              <HomeStatePanel tone="error">Loyihalarni yuklab bo‘lmadi.</HomeStatePanel>
            ) : filteredProjects.length > 0 ? (
              <div className="space-y-6">
                <div className="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 xl:gap-8">
                  {visibleProjects.map((project, index) => (
                    <ScrollCard
                      key={project.id}
                      index={index}
                      yFrom={70}
                      scaleFrom={1.06}
                      blurFrom={6}
                      delayStep={0.04}
                    >
                      <ProjectCard project={project} />
                    </ScrollCard>
                  ))}
                </div>

                {canLoadMore ? (
                  <ScrollCard index={2} yFrom={44} scaleFrom={1.02} blurFrom={3}>
                  <div className="flex justify-center pt-1">
                    <button
                      type="button"
                      onClick={() => setVisibleCount((v) => v + LOAD_MORE_STEP)}
                      className="inline-flex min-w-[180px] items-center justify-center rounded-full border border-emerald-600 bg-white px-5 py-2.5 text-sm font-semibold text-emerald-700 shadow-[0_8px_24px_-18px_rgba(5,150,105,0.35)] transition duration-200 hover:bg-emerald-600 hover:text-white hover:shadow-[0_16px_30px_-16px_rgba(5,150,105,0.5)] active:scale-[0.985] sm:min-w-[200px]"
                    >
                      Yana yuklash
                    </button>
                  </div>
                  </ScrollCard>
                ) : null}
              </div>
            ) : (
              <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center lg:py-16">
                <div className="mb-6 flex items-center justify-center">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-white ring-1 ring-emerald-100">
                    <div className="absolute inset-0 rounded-2xl animate-pulse bg-emerald-100/40" />
                    <LayoutGrid size={30} className="relative z-10 text-emerald-700" />
                    <span className="absolute -right-1 -top-1 inline-flex h-4 w-4 animate-bounce rounded-full bg-emerald-400" />
                  </div>
                </div>

                <h3 className="mb-2 text-lg font-semibold tracking-[-0.01em] text-slate-900">
                  {searchQuery ? "Qidiruv bo‘yicha loyiha topilmadi" : "Yangi loyihalar tayyorlanmoqda"}
                </h3>
                <div className="text-sm leading-6 text-slate-600">
                  {searchQuery
                    ? "Kalit so‘zni o‘zgartirib ko‘ring yoki filtrni “Hammasi”ga qaytaring."
                    : "Tez orada bu yerda yangi loyihalar paydo bo‘ladi. Yangilanishlarni kuzatib boring."}
                </div>
              </div>
            )}
          </HomeSectionShell>
        </div>
      </section>
      </ParallaxSection>
    </div>
  );
});
