"use client";
import { memo, useEffect, useState } from "react";
import { Modal, Spin } from "antd";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import { Button } from "@/components";
import { Announcement } from "@/types";
import { fetchAnnouncementsLimited } from "@/lib";

import "swiper/css";
import "swiper/css/navigation";

export const HomeSectionsAnnouncements = memo(
  function HomeSectionsAnnouncements() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [announcement, setAnnouncement] = useState<Announcement | null>(null);

    const handleOpenModal = (item: Announcement) => {
      setAnnouncement(item);
      setIsModalOpen(true);
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
      setAnnouncement(null);
    };

    useEffect(() => {
      let mounted = true;

      async function loadNews() {
        try {
          const data = await fetchAnnouncementsLimited(4);
          if (mounted) setAnnouncements(data);
        } catch (err) {
          console.error("Error loading announcements:", err);
        } finally {
          if (mounted) setIsLoaded(true);
        }
      }

      loadNews();

      return () => {
        mounted = false;
      };
    }, []);

    const swiperSettings = {
      spaceBetween: 24,
      slidesPerView: 3,
      slidesPerGroup: 1,
      loop: true,
      navigation: {
        nextEl: ".announcements-next-btn",
        prevEl: ".announcements-prev-btn",
      },
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      modules: [Navigation, Autoplay],
      breakpoints: {
        1100: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 2,
        },
        640: {
          slidesPerView: 2,
        },
        400: {
          slidesPerView: 1,
        },
        350: {
          slidesPerView: 1,
        },
        150: {
          slidesPerView: 1,
        },
      },
    };

    return (
      <section id="announcements" aria-labelledby="announcements-heading">
     <div className="container py-12 sm:py-16 lg:py-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              E'lonlar
            </h2>
          </div>

          <div className="relative z-10">
            {/* Navigation Buttons */}
            {announcements.length > 3 && (
              <>
                <Button
                  aria-label="Oldingi e'lon"
                theme="base"
                  className="absolute left-2 md:-left-2 lg:-left-6 top-1/2 -translate-y-1/2 w-11 h-11 announcements-prev-btn z-10 rounded-full p-0 bg-white/90 backdrop-blur ring-1 ring-black/5"
                >
                  <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6" />
                </Button>
                <Button
                  aria-label="Keyingi e'lon"
                  theme="base"
                  className="absolute right-2 md:-right-2 lg:-right-6 top-1/2 -translate-y-1/2 w-11 h-11 announcements-next-btn z-10 rounded-full p-0 bg-white/90 backdrop-blur ring-1 ring-black/5"
                >
                  <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6" />
                </Button>
              </>
            )}

            <div className="relative">
              {!isLoaded ? (
                <div className="py-52 flex items-center justify-center">
                  <Spin aria-label="E'lonlar yuklanmoqda" />
                </div>
              ) : announcements.length === 0 ? (
                <p className="text-center text-gray-500 py-20">
                  E'lonlar topilmadi
                </p>
              ) : (
                <Swiper
                  {...swiperSettings}
                  className="announcements-swiper pt-8 pb-12"
                >
                  {announcements.map((item) => (
                    <SwiperSlide key={item.id}>
                      <div
                        aria-label={`${item.title}-${item.date_display}`}
 className="bg-white border border-gray-100 rounded-2xl p-5 min-h-[264px] flex flex-col justify-between shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"                      >
                        <div className="mb-5 flex-1">
   <h3 className="mb-2 font-semibold text-lg sm:text-xl text-gray-900 line-clamp-2">                            {item.title}
                          </h3>
                          <p
  className="line-clamp-3 text-sm sm:text-base text-gray-600"                            dangerouslySetInnerHTML={{
                              __html: item.description,
                            }}
                          />
                        </div>

                        <div>
                          <p className="text-blue-600 text-sm font-medium mb-5">                            {item.date_display}
                          </p>
                          <button
                            type="button"
 className="flex items-center gap-1.5 text-gray-700 font-semibold text-base hover:text-blue-700 transition-colors group"                            onClick={() => handleOpenModal(item)}
                          >
                            <span>Batafsil</span>{" "}
                            <ArrowRight
                              className="group-hover:translate-x-1 transition-transform"
                              size={20}
                            />
                          </button>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </div>
        </div>

        <Modal
          centered
          open={isModalOpen}
          onCancel={handleCloseModal}
          footer={null}
          width={794}
        >
          <div className="sm:p-3">
            <h2 className="text-center text-gray-900 font-bold text-xl md:text-2xl mb-4 md:mb-8">              DIQQAT, E’LON!
            </h2>
            {/* Content */}
            <div>
              <p
                className="text-sm sm:text-base md:text-lg text-gray-600 mb-3 md:mb-4"
                dangerouslySetInnerHTML={{
                  __html: announcement?.description || "",
                }}
              />

              {announcement?.content && (
                <div
                  className="rich-text-container mb-5"
                  dangerouslySetInnerHTML={{ __html: announcement.content }}
                />
              )}

              {/* Footer Info */}
              {announcement?.footer_text && (
                <p
                  className="text-sm sm:text-base md:text-lg text-gray-900 font-semibold"
                  dangerouslySetInnerHTML={{
                    __html: announcement.footer_text,
                  }}
                />
              )}
            </div>
          </div>
        </Modal>
      </section>
    );
  }
);

HomeSectionsAnnouncements.displayName = "HomeSectionsAnnouncements";
