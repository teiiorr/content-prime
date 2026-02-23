"use client";

import { memo, useEffect, useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb, Collapse } from "antd";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Copy,
  FileDown,
  ListChecks,
  Send,
  Share2,
  Sparkles,
} from "lucide-react";

import { HomeSectionShell, NewsItem } from "@/components";
import { ROUTES } from "@/constants";
import { fetchNewsLimited } from "@/lib";
import { Contest, NewsItemType } from "@/types";

const getStatusTone = (status: string) => {
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

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Faol":
      return CheckCircle2;
    case "Tez kunda":
      return Clock3;
    case "Yakunlangan":
      return Sparkles;
    default:
      return Sparkles;
  }
};

export const ContestSlugPage = memo(function ContestSlugPage({ contest }: { contest: Contest }) {
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

  const contentBlocks = useMemo(() => {
    const blocks: { key: string; label: string; content: ReactNode }[] = [];

    if (contest.content_blocks) {
      try {
        const parsed = JSON.parse(contest.content_blocks);
        if (Array.isArray(parsed)) {
          parsed.forEach((block: any, index: number) => {
            blocks.push({
              key: block.key || String(index),
              label: block.label || "Bo‘lim",
              content: (
                <div
                  className="contest-article-body"
                  dangerouslySetInnerHTML={{ __html: block.content || "" }}
                />
              ),
            });
          });
        }
      } catch (error) {
        console.error("Error parsing contest content_blocks:", error);
      }
    }

    if (contest.application_link) {
      blocks.push({
        key: "ariza",
        label: "Ariza",
        content: (
          <div className="space-y-3">
            <p className="text-slate-600">
              Arizaning elektron shaklini yuklab olib, kerakli ma&apos;lumotlarni to&apos;ldiring.
            </p>
            <button
              type="button"
              onClick={() => {
                const link = document.createElement("a");
                link.href = contest.application_link!;
                link.download = contest.application_link!.split("/").pop() || "ariza.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-emerald-600 bg-white px-4 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-600 hover:text-white"
            >
              <FileDown size={16} />
              Yuklab olish
            </button>
          </div>
        ),
      });
    }

    if (contest.show_requirements) {
      blocks.push({
        key: "requirements",
        label: "Talablar",
        content: (
          <div className="contest-article-body">
            <ol className="list-decimal pl-6">
              <li>Studiyaning to&apos;liq va rasmiy nomi hamda yuridik maqomi.</li>
              <li>Studiya qachon tashkil etilgan sana.</li>
              <li>Studiyaning asosiy yo&apos;nalishi.</li>
              <li>Soliq to&apos;lovchining identifikatsiya raqami.</li>
              <li>Aloqa ma&apos;lumotlari va veb-sayti.</li>
              <li>To&apos;liq yuridik va amaliy manzili.</li>
              <li>Oldin ishlab chiqarilgan mediamahsulotlar ro&apos;yxati.</li>
              <li>Studiyaning texnik bazasi haqida umumiy ma&apos;lumot.</li>
              <li>Asosiy ijodiy va texnik xodimlar haqida qisqacha ma&apos;lumot.</li>
            </ol>
          </div>
        ),
      });
    }

    return blocks;
  }, [contest]);

  const articleText = useMemo(() => {
    const raw = [contest.description, contest.content_blocks]
      .filter(Boolean)
      .join(" ")
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return raw;
  }, [contest.description, contest.content_blocks]);
  const readingMinutes = Math.max(1, Math.ceil(articleText.split(" ").filter(Boolean).length / 220));
  const leadText = useMemo(
    () =>
      (contest.description || "")
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim(),
    [contest.description]
  );

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
          title: contest.title,
          text: contest.description || contest.title,
          url: window.location.href,
        });
      } else {
        handleCopyLink();
      }
    } catch (e) {
      console.error("Share action cancelled/failed", e);
    }
  };

  const StatusIcon = getStatusIcon(contest.status);

  return (
    <div className="relative bg-gradient-to-b from-[#eef1f5] via-[#f5f7fa] to-white">
      <section id="contest-hero" className="relative z-10 overflow-hidden py-8 md:py-12 lg:py-16">
        <div className="container max-w-[1508px] 2xl:max-w-[88%]">
          <HomeSectionShell className="border-transparent bg-white/90 p-4 sm:p-5 lg:p-6 xl:p-8 shadow-[0_30px_70px_-50px_rgba(15,23,42,0.18)]">
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
                        <Link
                          href={ROUTES.CREATIVE_CONTESTS}
                          className="text-slate-600 text-sm font-semibold"
                        >
                          Ijodiy tanlovlar
                        </Link>
                      ),
                    },
                    { title: <span className="text-slate-400 text-sm">{contest.title}</span> },
                  ]}
                  className="min-w-0"
                />
              </div>

              <Link
                href={ROUTES.CREATIVE_CONTESTS}
                className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
              >
                <ArrowLeft size={15} />
                Tanlovlarga qaytish
              </Link>

              <div className="space-y-2.5">
                <h1 className="max-w-5xl text-2xl font-bold leading-tight tracking-[-0.02em] text-slate-900 sm:text-3xl md:text-4xl lg:text-5xl">
                  {contest.title}
                </h1>
                <p className="max-w-4xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
                  {leadText}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <div className={`rounded-full border px-3 py-1.5 text-sm font-semibold ${getStatusTone(contest.status)}`}>
                  <StatusIcon size={14} className="mr-1.5 inline-block align-[-2px]" />
                  {contest.status}
                </div>
                <div className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600">
                  Muddat: {contest.deadline}
                </div>
                <div className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600">
                  ~ {readingMinutes} daqiqa o‘qish
                </div>
              </div>
            </div>

            <div className="min-w-0">
              <div className="mb-8 overflow-hidden rounded-3xl bg-white p-2 shadow-[0_20px_50px_-38px_rgba(15,23,42,0.22)] lg:mb-10">
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-100">
                  {contest.video_src ? (
                    <video
                      src={contest.video_src}
                      controls
                      preload="metadata"
                      className="absolute inset-0 h-full w-full object-contain bg-slate-100"
                      poster={contest.image_src}
                    />
                  ) : (
                    <Image
                      src={contest.image_src}
                      alt={contest.title}
                      fill
                      sizes="(min-width: 1280px) 70vw, 100vw"
                      className="h-full w-full object-contain bg-slate-100"
                    />
                  )}
                </div>
              </div>

              {contentBlocks.length > 0 ? (
                <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 lg:mb-10">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
                    <ListChecks size={16} />
                    Tanlov ma’lumotlari
                  </div>
                  <Collapse
                    ghost
                    defaultActiveKey={[contentBlocks[0]?.key].filter(Boolean)}
                    items={contentBlocks.map((block) => ({
                      key: block.key,
                      label: <span className="font-semibold text-slate-900">{block.label}</span>,
                      children: <div className="pb-2 pt-1">{block.content}</div>,
                    }))}
                  />
                </div>
              ) : null}

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
                {contest.application_link ? (
                  <button
                    type="button"
                    onClick={() => window.open(contest.application_link, "_blank", "noopener,noreferrer")}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-emerald-600 bg-white px-4 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-600 hover:text-white"
                  >
                    <Send size={16} />
                    Ariza havolasi
                  </button>
                ) : null}
              </div>

              <div className="mt-10">
                <h2 className="mb-5 text-xl font-bold tracking-[-0.01em] text-slate-900 sm:text-2xl">
                  Tanlovga aloqador yangiliklar
                </h2>
                {news.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
                    {news.map((item) => (
                      <NewsItem key={item.id} item={item} showDescription={false} />
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

      <Image
        src="/images/bg.avif"
        alt="Hero background image"
        width={1920}
        height={663}
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-auto w-full object-cover object-center opacity-40"
      />

      <style jsx global>{`
        .contest-article-body {
          font-size: 16px;
          line-height: 1.75;
          color: rgb(71 85 105);
        }
        .contest-article-body > * + * {
          margin-top: 0.8rem;
        }
        .contest-article-body h2,
        .contest-article-body h3,
        .contest-article-body h4 {
          color: rgb(15 23 42);
          font-weight: 700;
          line-height: 1.25;
          letter-spacing: -0.01em;
          margin-top: 1.4rem;
          margin-bottom: 0.5rem;
        }
        .contest-article-body p,
        .contest-article-body li {
          color: rgb(71 85 105);
        }
        .contest-article-body ul,
        .contest-article-body ol {
          padding-left: 1.2rem;
        }
        .contest-article-body a {
          color: rgb(15 23 42);
          text-decoration: underline;
          text-decoration-color: rgb(203 213 225);
          text-underline-offset: 4px;
          font-weight: 600;
        }
        @media (min-width: 1024px) {
          .contest-article-body {
            font-size: 17px;
            line-height: 1.8;
          }
        }
      `}</style>
    </div>
  );
});
