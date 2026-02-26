"use client";

import { memo, useEffect, useState } from "react";
import { Modal } from "antd";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import {
  Button,
  Card,
  Container,
  HomeCard,
  HomeSectionHeader,
  HomeSectionShell,
  HomeSliderDotsStyles,
  HomeStatePanel,
  Skeleton,
} from "@/components";
import { ScrollCard } from "@/components/motion/ScrollCard";
import { Announcement } from "@/types";
import { fetchAnnouncementsLimited } from "@/lib";

import "swiper/css";
import "swiper/css/pagination";

export const HomeSectionsAnnouncements = memo(function HomeSectionsAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadNews() {
      try {
        setHasError(false);
        const data = await fetchAnnouncementsLimited(4);
        if (mounted) setAnnouncements(data);
      } catch (err) {
        console.error("Error loading announcements:", err);
        if (mounted) setHasError(true);
      } finally {
        if (mounted) setIsLoaded(true);
      }
    }

    loadNews();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    setAnnouncement(null);
  };

  return (
    <section id="announcements" aria-labelledby="announcements-heading" className="bg-gradient-to-b from-[#f4ece3] to-transparent">
      <Container className="max-w-[1508px] py-8 md:py-12 lg:py-16 2xl:max-w-[88%]">
        <HomeSectionShell className="border-[#d8c8b5] bg-[#fffdf9] p-5 sm:p-6 lg:p-8 xl:p-10 shadow-[0_28px_70px_-48px_rgba(120,85,55,0.22)]">
          <HomeSectionHeader>
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
              <div className="inline-flex items-center justify-center rounded-full border border-[#dccab8] bg-white px-5 py-2.5 text-lg font-bold tracking-[-0.02em] text-[#6e472c] shadow-[0_10px_24px_-18px_rgba(120,85,55,0.28)] sm:px-6 sm:text-xl lg:px-7 lg:py-3 lg:text-2xl">
                E&apos;lonlar
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                Markazning muhim e&apos;lonlari va foydali ma&apos;lumotlari.
              </p>
            </div>
          </HomeSectionHeader>

          {!isLoaded ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 2xl:gap-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <HomeCard key={i} className="overflow-hidden shadow-none">
                  <div className="space-y-3 p-4 xl:p-5">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-11/12" />
                    <Skeleton className="h-5 w-8/12" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-10/12" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </HomeCard>
              ))}
            </div>
          ) : hasError ? (
            <HomeStatePanel tone="error">
              <p className="text-sm font-medium md:text-base">
                E'lonlarni yuklab bo‘lmadi. Keyinroq qayta urinib ko‘ring.
              </p>
            </HomeStatePanel>
          ) : announcements.length === 0 ? (
            <HomeStatePanel>E'lonlar topilmadi</HomeStatePanel>
          ) : (
            <div className="relative">
              <>
                <Swiper
                  spaceBetween={16}
                  slidesPerView={1.08}
                  loop={announcements.length > 1}
                  pagination={{
                    el: ".home-announcements-pagination",
                    clickable: true,
                    bulletClass: "home-announcements-bullet",
                    bulletActiveClass: "is-active",
                  }}
                  autoplay={
                    reduceMotion
                      ? false
                      : {
                          delay: 3600,
                          disableOnInteraction: false,
                          pauseOnMouseEnter: true,
                        }
                  }
                  modules={[Autoplay, Pagination]}
                  breakpoints={{
                    640: { slidesPerView: 1.25, spaceBetween: 18 },
                    768: { slidesPerView: 2, spaceBetween: 20 },
                    1100: { slidesPerView: 3, spaceBetween: 22 },
                    1400: { slidesPerView: 3.25, spaceBetween: 24 },
                    1800: { slidesPerView: 3.6, spaceBetween: 28 },
                  }}
                  className="pb-2"
                >
                  {announcements.map((item, index) => (
                    <SwiperSlide key={item.id}>
                      <ScrollCard index={index} yFrom={78} scaleFrom={1.09} blurFrom={8}>
                        <Card
                          aria-label={`${item.title}-${item.date_display}`}
                          className="relative flex h-full min-h-[252px] flex-col overflow-hidden border-slate-200 bg-white p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-24px_rgba(15,23,42,0.2)] sm:p-5 xl:min-h-[270px] xl:p-6"
                        >
                          <div className="absolute inset-x-0 top-0 h-1 bg-[#9a6a43]" />

                          <div className="mb-4 inline-flex w-fit items-center rounded-full border border-[#e2cfbd] bg-[#f7efe6] px-2.5 py-1 text-xs font-semibold text-[#7a5232]">
                            E'lon
                          </div>

                          <div className="flex-1">
                            <h3 className="mb-2 line-clamp-2 text-lg font-semibold tracking-[-0.01em] leading-6 text-slate-900 xl:text-xl xl:leading-7">
                              {item.title}
                            </h3>
                            <p
                              className="line-clamp-2 text-sm leading-6 text-slate-600 xl:text-[15px] xl:leading-7"
                              dangerouslySetInnerHTML={{ __html: item.description }}
                            />
                          </div>

                          <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                            <p className="text-xs leading-none font-medium text-[#8a5d3a] sm:text-sm">
                              {item.date_display}
                            </p>

                            <button
                              type="button"
                              className="group inline-flex items-center gap-1.5 rounded-full border border-[#e2cfbd] bg-white px-3 py-1.5 text-sm font-semibold text-[#7a5232] transition hover:bg-[#f7efe6] hover:border-[#d4b89d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c08b60] focus-visible:ring-offset-2"
                              onClick={() => {
                                setAnnouncement(item);
                                setIsModalOpen(true);
                              }}
                            >
                              <span>Batafsil</span>
                              <ArrowRight
                                className="transition-transform group-hover:translate-x-0.5"
                                size={16}
                              />
                            </button>
                          </div>
                        </Card>
                      </ScrollCard>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <div className="mt-3 flex items-center justify-center sm:hidden">
                  <div className="home-announcements-pagination flex items-center justify-center gap-2" />
                </div>
              </>
            </div>
          )}
        </HomeSectionShell>
      </Container>

      <Modal centered open={isModalOpen} onCancel={closeModal} footer={null} width={794}>
        <div className="sm:p-3">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 md:mb-6">
            <div className="inline-flex items-center rounded-full border border-[#e2cfbd] bg-[#f7efe6] px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-[#7a5232]">
              E'lon
            </div>
            <p className="text-xs font-medium text-slate-500 sm:text-sm">
              {announcement?.date_display}
            </p>
          </div>

          <h2 className="mb-4 text-xl font-bold leading-tight text-slate-900 md:mb-6 md:text-2xl">
            {announcement?.title || "E'lon"}
          </h2>

          <div className="max-h-[65vh] overflow-y-auto pr-1">
            <p
              className="mb-3 text-sm leading-7 text-slate-600 sm:text-base md:mb-4"
              dangerouslySetInnerHTML={{ __html: announcement?.description || "" }}
            />

            {announcement?.content && (
              <div
                className="rich-text-container mb-5"
                dangerouslySetInnerHTML={{ __html: announcement.content }}
              />
            )}

            {announcement?.footer_text && (
              <p
                className="text-sm font-semibold leading-7 text-slate-900 sm:text-base"
                dangerouslySetInnerHTML={{ __html: announcement.footer_text }}
              />
            )}
          </div>
        </div>
      </Modal>

      <HomeSliderDotsStyles bulletClass="home-announcements-bullet" />
      <style jsx global>{`
        .home-announcements-bullet.is-active {
          width: 20px;
          background: rgb(122 82 50);
        }
      `}</style>
    </section>
  );
});

HomeSectionsAnnouncements.displayName = "HomeSectionsAnnouncements";
