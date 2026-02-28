"use client";

import { memo, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "antd";
import { ArrowLeft, ChevronLeft, ChevronRight, Copy, Share2 } from "lucide-react";

import { HomeSectionShell } from "@/components";
import { ROUTES } from "@/constants";
import { NewsWithContentItemType } from "@/types";

export const InternationalPartnershipSlugPage = memo(function InternationalPartnershipSlugPage({
  newsItem,
}: {
  newsItem: NewsWithContentItemType;
}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [copied, setCopied] = useState(false);

  const gallery = useMemo(() => {
    if (!newsItem?.gallery_images) return [];

    return newsItem.gallery_images
      .split(",")
      .map((src) => src.trim())
      .filter(Boolean);
  }, [newsItem?.gallery_images]);

  const articleText = useMemo(() => {
    const raw = [newsItem.description, newsItem.content]
      .filter(Boolean)
      .join(" ")
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return raw;
  }, [newsItem.description, newsItem.content]);

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
          title: newsItem.title,
          text: newsItem.description || newsItem.title,
          url: window.location.href,
        });
      } else {
        await handleCopyLink();
      }
    } catch (e) {
      console.error("Share action cancelled/failed", e);
    }
  };

  const goPrev = () => {
    setActiveSlide((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };
  const goNext = () => {
    setActiveSlide((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  const leadText = useMemo(
    () =>
      (newsItem.description || "")
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim(),
    [newsItem.description]
  );

  return (
    <div className="relative bg-gradient-to-b from-[#eef1f5] via-[#f6f8fb] to-white">
      <section id="international-news-slug" className="relative z-10 overflow-hidden py-8 md:py-12 lg:py-16">
        <div className="container max-w-[1508px] 2xl:max-w-[88%]">
          <HomeSectionShell className="border-transparent bg-white/90 p-4 sm:p-5 lg:p-6 xl:p-8 shadow-[0_30px_70px_-50px_rgba(15,23,42,0.18)]">
            <div className="mb-5 flex flex-col gap-3 md:mb-6">
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
                        href={`${ROUTES.ABOUT}#international-cooperation`}
                        className="text-slate-600 text-sm font-semibold"
                      >
                        Xalqaro hamkorlik
                      </Link>
                    ),
                  },
                  { title: <span className="text-slate-400 text-sm">{newsItem.title}</span> },
                ]}
                className="min-w-0"
              />

              <Link
                href={`${ROUTES.ABOUT}#international-cooperation`}
                className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
              >
                <ArrowLeft size={15} />
                Xalqaro hamkorlikka qaytish
              </Link>

              <div className="space-y-2.5">
                <h1 className="max-w-5xl text-2xl font-bold leading-tight tracking-[-0.02em] text-slate-900 sm:text-3xl md:text-4xl lg:text-5xl">
                  {newsItem.title}
                </h1>
                {leadText ? (
                  <p className="max-w-4xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
                    {leadText}
                  </p>
                ) : null}
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <div className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600">
                  {newsItem.date_display}
                </div>
                <div className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600">
                  ~ {readingMinutes} daqiqa o‘qish
                </div>
              </div>
            </div>

            <div className="min-w-0">
              {gallery.length > 0 ? (
                <div className="mb-8 overflow-hidden rounded-3xl bg-white p-2 shadow-[0_20px_50px_-38px_rgba(15,23,42,0.22)] lg:mb-10">
                  <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-100">
                    <div
                      className="flex h-full transition-transform duration-500 ease-out"
                      style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                    >
                      {gallery.map((image, index) => (
                        <div key={index} className="relative h-full w-full flex-shrink-0">
                          <Image
                            src={image}
                            alt={`${newsItem.title} - ${index + 1}`}
                            fill
                            sizes="(min-width: 1280px) 70vw, 100vw"
                            className="h-full w-full object-contain bg-slate-100"
                          />
                        </div>
                      ))}
                    </div>

                    {gallery.length > 1 ? (
                      <>
                        <button
                          type="button"
                          onClick={goPrev}
                          className="absolute left-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/80 text-slate-700 shadow-sm backdrop-blur transition hover:bg-white"
                          aria-label="Oldingi rasm"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={goNext}
                          className="absolute right-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/80 text-slate-700 shadow-sm backdrop-blur transition hover:bg-white"
                          aria-label="Keyingi rasm"
                        >
                          <ChevronRight size={18} />
                        </button>

                        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/70 bg-white/75 px-3 py-1.5 backdrop-blur">
                          {gallery.map((_, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => setActiveSlide(index)}
                              className={[
                                "h-2 rounded-full transition-all",
                                activeSlide === index ? "w-5 bg-slate-700" : "w-2 bg-slate-300",
                              ].join(" ")}
                              aria-label={`${index + 1}-rasm`}
                            />
                          ))}
                          <span className="ml-1 text-xs font-medium text-slate-600">
                            {activeSlide + 1} / {gallery.length}
                          </span>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div className="mb-8 overflow-hidden rounded-3xl bg-white p-2 shadow-[0_20px_50px_-38px_rgba(15,23,42,0.22)] lg:mb-10">
                  <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-100">
                    {newsItem.video_src ? (
                      <video
                        src={newsItem.video_src}
                        controls
                        preload="metadata"
                        className="absolute inset-0 h-full w-full object-contain bg-slate-100"
                        poster={newsItem.poster_src || newsItem.image_src}
                      />
                    ) : (
                      <Image
                        src={newsItem.image_src}
                        alt={newsItem.title}
                        fill
                        sizes="(min-width: 1280px) 70vw, 100vw"
                        className="h-full w-full object-contain bg-slate-100"
                      />
                    )}
                  </div>
                </div>
              )}

              <article className="international-article-body">
                {newsItem.content ? (
                  <>
                    <div dangerouslySetInnerHTML={{ __html: newsItem.content }} />
                    {newsItem.link_text && newsItem.link_url ? (
                      <p>
                        Ijodiy tanlovlarni o&apos;tkazib yubormaslik uchun{" "}
                        <Link href={newsItem.link_url} className="font-semibold">
                          {newsItem.link_text}
                        </Link>{" "}
                        ning rasmiy telegram kanalini kuzatib boring.
                      </p>
                    ) : null}
                  </>
                ) : newsItem.description ? (
                  <div dangerouslySetInnerHTML={{ __html: newsItem.description }} />
                ) : (
                  <p>Ushbu yangilik haqida qo&apos;shimcha ma&apos;lumot mavjud emas.</p>
                )}
              </article>

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
            </div>
          </HomeSectionShell>
        </div>
      </section>

      <style jsx global>{`
        .international-article-body {
          font-size: 16px;
          line-height: 1.7;
          color: rgb(71 85 105);
        }
        .international-article-body > * + * {
          margin-top: 0.8rem;
        }
        .international-article-body h2,
        .international-article-body h3,
        .international-article-body h4 {
          color: rgb(15 23 42);
          font-weight: 700;
          line-height: 1.25;
          letter-spacing: -0.01em;
          margin-top: 1.4rem;
          margin-bottom: 0.5rem;
        }
        .international-article-body p,
        .international-article-body li {
          color: rgb(71 85 105);
        }
        .international-article-body ul,
        .international-article-body ol {
          padding-left: 1.2rem;
        }
        .international-article-body a {
          color: rgb(15 23 42);
          text-decoration: underline;
          text-decoration-color: rgb(203 213 225);
          text-underline-offset: 4px;
          font-weight: 600;
        }
        @media (min-width: 1024px) {
          .international-article-body {
            font-size: 17px;
            line-height: 1.8;
          }
        }
      `}</style>
    </div>
  );
});

InternationalPartnershipSlugPage.displayName = "InternationalPartnershipSlugPage";
