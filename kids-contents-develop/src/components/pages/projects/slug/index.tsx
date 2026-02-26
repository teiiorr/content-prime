"use client";

import { memo, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "antd";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  CircleDot,
  Clock3,
  Copy,
  Instagram,
  Youtube,
  Send,
  Facebook,
  Share2,
  Sparkles,
} from "lucide-react";

import { HomeSectionShell, NewsItem } from "@/components";
import { ParallaxSection } from "@/components/motion/ParallaxSection";
import { ScrollCard } from "@/components/motion/ScrollCard";
import { ROUTES } from "@/constants";
import { fetchNewsLimited } from "@/lib";
import { NewsItemType, ProjectItemType, Status } from "@/types";

const getStatusTone = (status: Status) => {
  switch (status) {
    case "Faol":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    case "Tez kunda":
      return "border-amber-200 bg-amber-50 text-amber-700";
    case "Yakunlangan":
      return "border-rose-200 bg-rose-50 text-rose-700";
    default:
      return "border-slate-200 bg-slate-50 text-slate-700";
  }
};

const getStatusIcon = (status: Status) => {
  switch (status) {
    case "Faol":
      return CheckCircle2;
    case "Tez kunda":
      return Clock3;
    case "Yakunlangan":
      return Sparkles;
    default:
      return CircleDot;
  }
};

const STEPS = [
  { title: "E'lon berilgan" },
  { title: "Ekspertlar kengashi muhokamasida" },
  { title: "Tasdiqlangan" },
  { title: "Ishga tushirilgan" },
  { title: "Ssenariy yaratish jarayonida" },
  { title: "Tasvirga olinmoqda" },
  { title: "Montaj" },
  { title: "Ovozlashtirilmoqda" },
  { title: "Post-prodaksiyon" },
  { title: "Premyera" },
];

export const ProjectsSlugPage = memo(function ProjectsSlugPage({
  project: projectItem,
}: {
  project: ProjectItemType | null;
}) {
  if (!projectItem) notFound();

  const [news, setNews] = useState<NewsItemType[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadNews() {
      try {
        const data = await fetchNewsLimited(3);
        setNews(data);
      } catch (e) {
        console.error("Error loading related news:", e);
      }
    }
    loadNews();
  }, []);

  const currentStep = projectItem.current_step ? parseInt(projectItem.current_step, 10) : 0;
  const StatusIcon = getStatusIcon(projectItem.status);

  const socialLinks = useMemo(
    () =>
      [
        { href: projectItem.instagram_url, label: "Instagram", icon: Instagram },
        { href: projectItem.youtube_url, label: "YouTube", icon: Youtube },
        { href: projectItem.telegram_url, label: "Telegram", icon: Send },
        { href: projectItem.facebook_url, label: "Facebook", icon: Facebook },
      ].filter((item) => !!item.href),
    [projectItem]
  );

  const articleText = useMemo(() => {
    const raw = (projectItem.content || projectItem.description || "")
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return raw;
  }, [projectItem.content, projectItem.description]);
  const readingMinutes = Math.max(1, Math.ceil(articleText.split(" ").filter(Boolean).length / 220));

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch (e) {
      console.error("Failed to copy link", e);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: projectItem.title,
          text: projectItem.description || projectItem.title,
          url: window.location.href,
        });
      } else {
        handleCopyLink();
      }
    } catch (e) {
      console.error("Share action cancelled/failed", e);
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-[#eef1f5] via-[#f5f7fa] to-white">
      <ParallaxSection tone="slate" intensity={1.05} accentSide="right">
      <section id="projects-hero" className="relative z-10 overflow-hidden py-8 md:py-12 lg:py-16">
        <div className="container max-w-[1508px] 2xl:max-w-[88%]">
          <HomeSectionShell className="border-transparent bg-white/90 p-4 sm:p-5 lg:p-6 xl:p-8 shadow-[0_30px_70px_-50px_rgba(15,23,42,0.18)]">
            <ScrollCard index={0} yFrom={48} scaleFrom={1.02} blurFrom={4}>
            <div className="mb-5 flex flex-col gap-3 md:mb-6">
              <div className="flex flex-wrap items-center gap-3">
                <Breadcrumb
                  items={[
                    {
                      title: (
                        <Link href={ROUTES.HOME} className="text-slate-500 text-sm font-medium">
                          Asosiy
                        </Link>
                      ),
                    },
                    {
                      title: (
                        <Link href={ROUTES.PROJECTS} className="text-slate-600 text-sm font-semibold">
                          Loyihalar
                        </Link>
                      ),
                    },
                    { title: <span className="text-slate-400 text-sm">{projectItem.title}</span> },
                  ]}
                  className="min-w-0"
                />
              </div>

              <Link
                href={ROUTES.PROJECTS}
                className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
              >
                <ArrowLeft size={15} />
                Loyihalarga qaytish
              </Link>

              <div className="space-y-2.5">
                <h1 className="max-w-5xl text-2xl font-bold leading-tight tracking-[-0.02em] text-slate-900 sm:text-3xl md:text-4xl lg:text-5xl">
                  {projectItem.title}
                </h1>

                {projectItem.description ? (
                  <p className="max-w-4xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
                    {projectItem.description}
                  </p>
                ) : null}
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <div
                  className={`rounded-full border px-3 py-1.5 text-sm font-semibold ${getStatusTone(
                    projectItem.status
                  )}`}
                >
                  <StatusIcon size={14} className="mr-1.5 inline-block align-[-2px]" />
                  {projectItem.status}
                </div>
                <div className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600">
                  ~ {readingMinutes} daqiqa o‘qish
                </div>
              </div>
            </div>
            </ScrollCard>

            <div className="min-w-0">
              <ScrollCard index={1} yFrom={72} scaleFrom={1.04} blurFrom={5}>
              <div className="mb-8 overflow-hidden rounded-3xl bg-white p-2 shadow-[0_20px_50px_-38px_rgba(15,23,42,0.22)] lg:mb-10">
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-100">
                  {projectItem.video_src ? (
                    <video
                      src={projectItem.video_src}
                      controls
                      preload="metadata"
                      className="absolute inset-0 h-full w-full object-contain bg-slate-100"
                      poster={projectItem.poster_src || projectItem.image_src}
                    />
                  ) : (
                    <Image
                      src={projectItem.image_src}
                      alt={projectItem.title}
                      fill
                      sizes="(min-width: 1280px) 70vw, 100vw"
                      className="h-full w-full object-contain bg-slate-100"
                    />
                  )}
                </div>
              </div>
              </ScrollCard>

              <ScrollCard index={2} yFrom={70} scaleFrom={1.04} blurFrom={5}>
              <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 lg:mb-10">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="text-xl font-bold tracking-[-0.01em] text-slate-900 sm:text-2xl">
                    Jarayon
                  </h2>
                  <div className="text-sm font-medium text-slate-500">
                    {Math.min(currentStep + 1, STEPS.length)} / {STEPS.length}
                  </div>
                </div>

                <div className="grid gap-2 sm:gap-3">
                  {STEPS.map((step, index) => {
                    const done = index < currentStep;
                    const active = index === currentStep;
                    return (
                      <div
                        key={step.title}
                        className={[
                          "flex items-center gap-3 rounded-xl border px-3 py-2.5 sm:px-4 sm:py-3",
                          done
                            ? "border-emerald-200 bg-emerald-50/70"
                            : active
                              ? "border-blue-200 bg-blue-50/70"
                              : "border-slate-200 bg-slate-50/70",
                        ].join(" ")}
                      >
                        <div
                          className={[
                            "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border",
                            done
                              ? "border-emerald-300 bg-emerald-600 text-white"
                              : active
                                ? "border-blue-300 bg-blue-600 text-white"
                                : "border-slate-300 bg-white text-slate-400",
                          ].join(" ")}
                        >
                          {done ? <Check size={14} /> : <CircleDot size={14} />}
                        </div>
                        <div className="min-w-0">
                          <div
                            className={[
                              "text-sm font-semibold leading-5 sm:text-[15px]",
                              done ? "text-emerald-800" : active ? "text-blue-800" : "text-slate-700",
                            ].join(" ")}
                          >
                            {step.title}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              </ScrollCard>

              <article id="projects-article-content" className="max-w-none">
                <div className="project-article-body text-slate-700">
                  {projectItem.content ? (
                    <div dangerouslySetInnerHTML={{ __html: projectItem.content }} className="p-link" />
                  ) : projectItem.description ? (
                    <p>{projectItem.description}</p>
                  ) : (
                    <p>Ushbu loyiha haqida qo&apos;shimcha ma&apos;lumot mavjud emas.</p>
                  )}
                </div>
              </article>

              {socialLinks.length > 0 ? (
                <ScrollCard index={3} yFrom={56} scaleFrom={1.03} blurFrom={4}>
                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
                  <h3 className="mb-3 text-base font-semibold text-slate-900 sm:text-lg">
                    Loyihaning tarmoq sahifalari
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {socialLinks.map(({ href, label, icon: Icon }) => (
                      <Link
                        key={label}
                        href={href!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                      >
                        <Icon size={16} />
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>
                </ScrollCard>
              ) : null}

              <ScrollCard index={4} yFrom={42} scaleFrom={1.02} blurFrom={3}>
              <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-slate-200/80 pt-4">
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                >
                  <Share2 size={16} />
                  Ulashish
                </button>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                >
                  <Copy size={16} />
                  {copied ? "Nusxalandi" : "Havolani nusxalash"}
                </button>
              </div>
              </ScrollCard>

              <div className="mt-10">
                <h2 className="mb-5 text-xl font-bold tracking-[-0.01em] text-slate-900 sm:text-2xl">
                  Loyihaga aloqador yangiliklar
                </h2>
                {news.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
                    {news.map((item, index) => (
                      <ScrollCard key={item.id} index={index} yFrom={72} scaleFrom={1.06} blurFrom={6} delayStep={0.04}>
                        <NewsItem item={item} showDescription={false} />
                      </ScrollCard>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-slate-200 bg-white px-4 py-8 text-center text-slate-500">
                    Yangiliklar topilmadi.
                  </div>
                )}
              </div>
            </div>
          </HomeSectionShell>
        </div>
      </section>
      </ParallaxSection>

      <Image
        src="/images/bg.avif"
        alt="Hero background image"
        width={1920}
        height={663}
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-auto w-full object-cover object-center opacity-40"
      />

      <style jsx global>{`
        .project-article-body {
          font-size: 16px;
          line-height: 1.75;
        }
        .project-article-body > * + * {
          margin-top: 0.8rem;
        }
        .project-article-body h2,
        .project-article-body h3,
        .project-article-body h4 {
          color: rgb(15 23 42);
          font-weight: 700;
          line-height: 1.25;
          letter-spacing: -0.01em;
          margin-top: 1.6rem;
          margin-bottom: 0.5rem;
        }
        .project-article-body p,
        .project-article-body li {
          color: rgb(71 85 105);
        }
        .project-article-body ul,
        .project-article-body ol {
          padding-left: 1.2rem;
        }
        .project-article-body a {
          color: rgb(15 23 42);
          text-decoration: underline;
          text-decoration-color: rgb(203 213 225);
          text-underline-offset: 4px;
          font-weight: 600;
        }
        .project-article-body img {
          max-width: 100%;
          height: auto;
          border-radius: 14px;
          margin-top: 1rem;
        }
        @media (min-width: 1024px) {
          .project-article-body {
            font-size: 17px;
            line-height: 1.8;
          }
        }
      `}</style>
    </div>
  );
});

ProjectsSlugPage.displayName = "ProjectsSlugPage";
