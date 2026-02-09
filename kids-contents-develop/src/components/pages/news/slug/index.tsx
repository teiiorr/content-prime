"use client";
import { memo, useMemo } from "react";
import Link from "next/link";
import { Breadcrumb } from "antd";

import { ROUTES } from "@/constants";
import { NewsWithContentItemType } from "@/types";

export const NewsSlugPage = memo(function NewsSlugPage({
  newsItem,
}: {
  newsItem: NewsWithContentItemType;
}) {
  const gallery = useMemo(() => {
    if (!newsItem?.gallery_images) return null;

    return newsItem.gallery_images
      .split(",")
      .map((src) => src.trim())
      .filter(Boolean);
  }, [newsItem?.gallery_images]);

  return (
    <div className="bg-background">
      <section
        id="news-hero"
        className="overflow-hidden min-h-screen relative z-10"
      >
        <div className="container py-10 lg:py-16">
          <div className="mb-8 lg:mb-14">
            <Breadcrumb
              items={[
                {
                  title: (
                    <Link
                      href={ROUTES.HOME}
                      className="text-gray-600 font-semibold text-sm px-2"
                    >
                      Asosiy
                    </Link>
                  ),
                },
                {
                  title: (
                    <Link
                      href={ROUTES.NEWS}
                      className="text-gray-600 font-semibold text-sm px-2"
                    >
                      Yangiliklar
                    </Link>
                  ),
                },
                {
                  title: (
                    <Link
                      href={`${ROUTES.NEWS}/${newsItem.slug}`}
                      className="text-orange-400 font-semibold text-sm px-2"
                    >
                      {newsItem.title}
                    </Link>
                  ),
                },
              ]}
              className="mb-8 md:mb-10 lg:mb-12"
            />
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight mb-4 lg:mb-6">
              {newsItem.title}
            </h1>
            {newsItem.description && newsItem.id === 1 && (
              <p className="text-lg lg:text-xl text-gray-700 mb-4 lg:mb-6">
                {newsItem.description}
                {newsItem.id === 1 && (
                  <>
                    <Link
                      href="https://lex.uz/ru/docs/7528758"
                      className="font-semibold text-blue-600 underline"
                    >
                      PQ-183-sonli
                    </Link>{" "}
                    qarori ijrosini taʼminlash maqsadida quyidagi yoʻnalishlarda
                    ijodiy tanlovlarni eʼlon qilishni rejalashtirmoqda:
                  </>
                )}
              </p>
            )}
            {newsItem.description && newsItem.id !== 1 && (
              <p
                className="text-lg lg:text-xl text-gray-700 mb-4 lg:mb-6 p-link"
                dangerouslySetInnerHTML={{ __html: newsItem.description }}
              />
            )}
            <p className="font-semibold text-sm md:text-base text-orange-400">
              {newsItem.date_display}
            </p>
          </div>

          {gallery ? (
            <div className="relative mb-16 lg:mb-24">
              <div className="carousel-container overflow-hidden rounded-3xl sm:rounded-[30px] lg:rounded-[36px] border-4 sm:border-6 lg:border-[8px] border-blue-600 shadow-2xl">
                <div className="carousel-track flex transition-transform duration-500 ease-in-out">
                  {gallery.map((image, index) => (
                    <div
                      key={index}
                      className="carousel-slide flex-shrink-0 w-full aspect-video relative"
                    >
                      <img
                        src={image}
                        alt={`${newsItem.title} - ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {gallery?.length > 1 && (
                <div className="flex justify-center space-x-2 absolute bottom-3 md:bottom-5 lg:bottom-10 left-1/2 -translate-x-1/2 z-10 p-2 h-7 rounded-full bg-white/20 backdrop-blur-md">
                  {gallery.map((_, index) => (
                    <button
                      key={index}
                      className="carousel-dot w-2.5 h-2.5 rounded-full bg-white/50 hover:bg-blue-600 transition-colors duration-200"
                      onClick={() => {
                        const track = document.querySelector(
                          ".carousel-track"
                        ) as HTMLElement;
                        if (track) {
                          track.style.transform = `translateX(-${
                            index * 100
                          }%)`;
                          // Update active dot
                          document
                            .querySelectorAll(".carousel-dot")
                            .forEach((dot, i) => {
                              dot.classList.toggle("bg-blue-600", i === index);
                              dot.classList.toggle("bg-white/50", i !== index);
                            });
                        }
                      }}
                    />
                  ))}
                </div>
              )}

              {gallery.length > 1 && (
                <>
                  <button
                    className="carousel-prev absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/70 text-white p-3 rounded-full transition-all duration-200 z-10"
                    onClick={() => {
                      const track = document.querySelector(
                        ".carousel-track"
                      ) as HTMLElement;
                      const dots = document.querySelectorAll(".carousel-dot");
                      const currentIndex = Array.from(dots).findIndex((dot) =>
                        dot.classList.contains("bg-blue-600")
                      );
                      const prevIndex =
                        currentIndex > 0
                          ? currentIndex - 1
                          : gallery!.length - 1;

                      if (track) {
                        track.style.transform = `translateX(-${
                          prevIndex * 100
                        }%)`;
                        dots.forEach((dot, i) => {
                          dot.classList.toggle("bg-blue-600", i === prevIndex);
                          dot.classList.toggle("bg-gray-300", i !== prevIndex);
                        });
                      }
                    }}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  <button
                    className="carousel-next absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/70 text-white p-3 rounded-full transition-all duration-200 z-10"
                    onClick={() => {
                      const track = document.querySelector(
                        ".carousel-track"
                      ) as HTMLElement;
                      const dots = document.querySelectorAll(".carousel-dot");
                      const currentIndex = Array.from(dots).findIndex((dot) =>
                        dot.classList.contains("bg-blue-600")
                      );
                      const nextIndex =
                        currentIndex < gallery!.length - 1
                          ? currentIndex + 1
                          : 0;

                      if (track) {
                        track.style.transform = `translateX(-${
                          nextIndex * 100
                        }%)`;
                        dots.forEach((dot, i) => {
                          dot.classList.toggle("bg-blue-600", i === nextIndex);
                          dot.classList.toggle("bg-gray-300", i !== nextIndex);
                        });
                      }
                    }}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="rounded-3xl z-10 sm:rounded-[30px] lg:rounded-[36px] w-full aspect-video border-4 sm:border-6 lg:border-[8px] border-blue-600 overflow-hidden relative flex items-center justify-center shadow-2xl mb-16 lg:mb-24">
              {newsItem.video_src ? (
                <video
                  src={newsItem.video_src}
                  controls
                  loop
                  muted
                  autoPlay
                  preload="metadata"
                  className="w-full h-full absolute inset-0 object-cover"
                  poster={newsItem.poster_src || newsItem.image_src}
                />
              ) : (
                <img
                  src={newsItem.image_src}
                  srcSet={newsItem.image_srcset}
                  alt={newsItem.title}
                  className="w-full h-full absolute inset-0 object-cover"
                  loading="lazy"
                />
              )}
            </div>
          )}

          <div className="w-full text-base lg:text-lg text-gray-600 flex flex-col gap-4">
            {newsItem.content ? (
              <>
                <p
                  dangerouslySetInnerHTML={{ __html: newsItem.content }}
                  className="p-link"
                />
                {newsItem.link_text && newsItem.link_url && (
                  <p>
                    Ijodiy tanlovlarni o'tkazib yubormaslik uchun{" "}
                    <Link
                      href={newsItem.link_url}
                      className="text-blue-600 underline"
                    >
                      {newsItem.link_text}
                    </Link>
                    ning rasmiy telegram kanalini kuzatib boring.
                  </p>
                )}
              </>
            ) : newsItem.description ? (
              <p
                dangerouslySetInnerHTML={{ __html: newsItem.description }}
                className="p-link"
              />
            ) : (
              <p>Ushbu yangilik haqida qo'shimcha ma'lumot mavjud emas.</p>
            )}
          </div>
        </div>
      </section>

      <img
        src="/images/bg.avif"
        srcSet="/images/bg@2x.avif 2x"
        width="1920"
        height="663"
        alt="Hero background image"
        loading="lazy"
        className="absolute top-0 left-0 right-0 object-cover object-center w-full h-auto z-0"
      />
    </div>
  );
});
