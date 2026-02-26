"use client";

import { memo, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "antd";
import { ArrowLeft, ChevronLeft, ChevronRight, Copy, Share2 } from "lucide-react";

import { HomeSectionShell } from "@/components";
import { ParallaxSection } from "@/components/motion/ParallaxSection";
import { ScrollCard } from "@/components/motion/ScrollCard";
import { ROUTES } from "@/constants";
import { NewsWithContentItemType } from "@/types";

function stripHtml(html?: string) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export const NewsSlugPage = memo(function NewsSlugPage({
  newsItem,
}: {
  newsItem: NewsWithContentItemType;
}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [copied, setCopied] = useState(false);

  const gallery = useMemo(() => {
    if (!newsItem?.gallery_images) return null;
    return newsItem.gallery_images
      .split(",")
      .map((src) => src.trim())
      .filter(Boolean);
  }, [newsItem?.gallery_images]);

  const articleText = useMemo(
    () => stripHtml(newsItem.content || newsItem.description),
    [newsItem.content, newsItem.description]
  );
  const readingMinutes = Math.max(1, Math.ceil(articleText.split(" ").filter(Boolean).length / 220));

  useEffect(() => {
    setActiveSlide(0);
  }, [newsItem.slug]);

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
          title: newsItem.title,
          text: newsItem.description || newsItem.title,
          url: window.location.href,
        });
      } else {
        handleCopyLink();
      }
    } catch (e) {
      // ignore user cancel
      console.error("Share action cancelled/failed", e);
    }
  };

  const goPrevSlide = () => {
    if (!gallery?.length) return;
    setActiveSlide((prev) => (prev > 0 ? prev - 1 : gallery.length - 1));
  };

  const goNextSlide = () => {
    if (!gallery?.length) return;
    setActiveSlide((prev) => (prev < gallery.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="relative bg-gradient-to-b from-[#eef1f5] via-[#f5f7fa] to-white">
      <ParallaxSection tone="slate" intensity={1.05} accentSide="right">
      <section id="news-hero" className="relative z-10 overflow-hidden py-8 md:py-12 lg:py-16">
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
                        <Link href={ROUTES.NEWS} className="text-slate-600 text-sm font-semibold">
                          Yangiliklar
                        </Link>
                      ),
                    },
                    {
                      title: <span className="text-slate-400 text-sm">{newsItem.title}</span>,
                    },
                  ]}
                  className="min-w-0"
                />

              </div>

              <Link
                href={ROUTES.NEWS}
                className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
              >
                <ArrowLeft size={15} />
                Yangiliklarga qaytish
              </Link>

              <div className="space-y-2.5">
                <h1 className="max-w-5xl text-2xl font-bold leading-tight tracking-[-0.02em] text-slate-900 sm:text-3xl md:text-4xl lg:text-5xl">
                  {newsItem.title}
                </h1>

                {newsItem.description && newsItem.id === 1 && (
                  <p className="max-w-4xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
                    {newsItem.description}{" "}
                    <Link
                      href="https://lex.uz/ru/docs/7528758"
                      className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4"
                    >
                      PQ-183-sonli
                    </Link>{" "}
                    qarori ijrosini taʼminlash maqsadida quyidagi yoʻnalishlarda ijodiy tanlovlarni
                    eʼlon qilishni rejalashtirmoqda:
                  </p>
                )}

                {newsItem.description && newsItem.id !== 1 && (
                  <div
                    className="news-article-body max-w-4xl text-base text-slate-600 md:text-lg"
                    dangerouslySetInnerHTML={{ __html: newsItem.description }}
                  />
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <div className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-800">
                  {newsItem.date_display}
                </div>
                <div className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600">
                  ~ {readingMinutes} daqiqa o‘qish
                </div>
              </div>
            </div>
            </ScrollCard>

            <div className="min-w-0">
                {gallery ? (
                  <ScrollCard index={1} yFrom={70} scaleFrom={1.04} blurFrom={5}>
                  <div className="mb-8 lg:mb-10">
                    <div className="relative overflow-hidden rounded-3xl bg-white p-2 shadow-[0_20px_50px_-38px_rgba(15,23,42,0.22)] sm:rounded-[30px] lg:rounded-[34px]">
                      <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-100 sm:rounded-[22px]">
                        <div
                          className="flex h-full transition-transform duration-500 ease-out"
                          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                        >
                          {gallery.map((image, index) => (
                            <div key={index} className="relative h-full w-full shrink-0">
                              <Image
                                src={image}
                                alt={`${newsItem.title} - ${index + 1}`}
                                fill
                                sizes="(min-width: 1280px) 70vw, 100vw"
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ))}
                        </div>

                        {gallery.length > 1 ? (
                          <>
                            <button
                              type="button"
                              onClick={goPrevSlide}
                              className="absolute left-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/75 text-slate-800 backdrop-blur-md transition hover:bg-white"
                              aria-label="Oldingi rasm"
                            >
                              <ChevronLeft size={18} />
                            </button>
                            <button
                              type="button"
                              onClick={goNextSlide}
                              className="absolute right-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/75 text-slate-800 backdrop-blur-md transition hover:bg-white"
                              aria-label="Keyingi rasm"
                            >
                              <ChevronRight size={18} />
                            </button>
                          </>
                        ) : null}
                      </div>
                    </div>

                    {gallery.length > 1 ? (
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          {gallery.map((_, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => setActiveSlide(index)}
                              className={[
                                "h-2.5 rounded-full transition-all duration-200",
                                index === activeSlide
                                  ? "w-5 bg-slate-700"
                                  : "w-2.5 bg-slate-300 hover:bg-slate-400",
                              ].join(" ")}
                              aria-label={`${index + 1}-rasm`}
                              aria-pressed={index === activeSlide}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-slate-500">
                          {activeSlide + 1} / {gallery.length}
                        </div>
                      </div>
                    ) : null}
                  </div>
                  </ScrollCard>
                ) : (
                  <ScrollCard index={1} yFrom={70} scaleFrom={1.04} blurFrom={5}>
                  <div className="mb-8 overflow-hidden rounded-3xl bg-white p-2 shadow-[0_20px_50px_-38px_rgba(15,23,42,0.22)] lg:mb-10">
                    <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-100">
                      {newsItem.video_src ? (
                        <video
                          src={newsItem.video_src}
                          controls
                          preload="metadata"
                          className="absolute inset-0 h-full w-full object-cover"
                          poster={newsItem.poster_src || newsItem.image_src}
                        />
                      ) : (
                        <Image
                          src={newsItem.image_src}
                          alt={newsItem.title}
                          fill
                          sizes="(min-width: 1280px) 70vw, 100vw"
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                  </div>
                  </ScrollCard>
                )}

                <article id="news-article-content" className="max-w-none">
                  <div className="news-article-body text-slate-700">
                    {newsItem.content ? (
                      <>
                        <div dangerouslySetInnerHTML={{ __html: newsItem.content }} className="p-link" />
                        {newsItem.link_text && newsItem.link_url ? (
                          <p className="mt-6">
                            Ijodiy tanlovlarni o&apos;tkazib yubormaslik uchun{" "}
                            <Link
                              href={newsItem.link_url}
                              className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4"
                            >
                              {newsItem.link_text}
                            </Link>{" "}
                            ning rasmiy telegram kanalini kuzatib boring.
                          </p>
                        ) : null}
                      </>
                    ) : newsItem.description ? (
                      <div dangerouslySetInnerHTML={{ __html: newsItem.description }} className="p-link" />
                    ) : (
                      <p>Ushbu yangilik haqida qo&apos;shimcha ma&apos;lumot mavjud emas.</p>
                    )}
                  </div>
                </article>

                <ScrollCard index={2} yFrom={42} scaleFrom={1.02} blurFrom={3}>
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
        priority={false}
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-auto w-full object-cover object-center opacity-40"
      />

      <style jsx global>{`
        .news-article-body {
          font-size: 16px;
          line-height: 1.75;
        }
        .news-article-body > * + * {
          margin-top: 0.8rem;
        }
        .news-article-body h2,
        .news-article-body h3,
        .news-article-body h4 {
          color: rgb(15 23 42);
          font-weight: 700;
          line-height: 1.25;
          letter-spacing: -0.01em;
          margin-top: 1.6rem;
          margin-bottom: 0.5rem;
        }
        .news-article-body h2 {
          font-size: 1.35rem;
        }
        .news-article-body h3 {
          font-size: 1.15rem;
        }
        .news-article-body p,
        .news-article-body li {
          color: rgb(71 85 105);
        }
        .news-article-body ul,
        .news-article-body ol {
          padding-left: 1.2rem;
        }
        .news-article-body a {
          color: rgb(15 23 42);
          text-decoration: underline;
          text-decoration-color: rgb(203 213 225);
          text-underline-offset: 4px;
          font-weight: 600;
        }
        .news-article-body blockquote {
          margin: 1.25rem 0;
          border-left: 3px solid rgb(148 163 184);
          padding-left: 1rem;
          color: rgb(51 65 85);
          font-style: italic;
        }
        .news-article-body img {
          max-width: 100%;
          height: auto;
          border-radius: 14px;
          margin-top: 1rem;
        }
        @media (min-width: 1024px) {
          .news-article-body {
            font-size: 17px;
            line-height: 1.8;
          }
        }
      `}</style>
    </div>
  );
});

NewsSlugPage.displayName = "NewsSlugPage";
