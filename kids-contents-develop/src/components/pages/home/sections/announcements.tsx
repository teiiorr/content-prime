"use client";

import { memo, useEffect, useState } from "react";
import { Modal } from "antd";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import { Button, Card, Container, SectionHeading, Skeleton } from "@/components";
import { Announcement } from "@/types";
import { fetchAnnouncementsLimited } from "@/lib";

import "swiper/css";
import "swiper/css/navigation";

export const HomeSectionsAnnouncements = memo(function HomeSectionsAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);

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

  const closeModal = () => {
    setIsModalOpen(false);
    setAnnouncement(null);
  };

  return (
    <section id="announcements" aria-labelledby="announcements-heading">
      <Container className="py-8">
        <SectionHeading title="E'lonlar" className="mb-8 text-center" />

        {!isLoaded ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-52" />
            ))}
          </div>
        ) : announcements.length === 0 ? (
          <p className="py-20 text-center text-gray-500">E'lonlar topilmadi</p>
        ) : (
          <div className="relative z-10">
            {/* Nav buttons */}
            {announcements.length > 3 && (
              <>
                <Button
                  aria-label="Oldingi e'lon"
                  theme="primary"
                  className="announcements-prev-btn absolute -left-3 top-1/2 z-10 h-12 w-12 -translate-y-1/2 sm:rounded-full"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>

                <Button
                  aria-label="Keyingi e'lon"
                  theme="primary"
                  className="announcements-next-btn absolute -right-3 top-1/2 z-10 h-12 w-12 -translate-y-1/2 sm:rounded-full"
                >
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </>
            )}

            <Swiper
              spaceBetween={24}
              slidesPerView={3}
              loop
              navigation={{
                nextEl: ".announcements-next-btn",
                prevEl: ".announcements-prev-btn",
              }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              modules={[Navigation, Autoplay]}
              breakpoints={{
                1100: { slidesPerView: 3 },
                768: { slidesPerView: 2 },
                150: { slidesPerView: 1 },
              }}
              className="pt-8 pb-12"
            >
              {announcements.map((item) => (
                <SwiperSlide key={item.id}>
                  <Card
                    aria-label={`${item.title}-${item.date_display}`}
                    className="flex min-h-[264px] flex-col justify-between border-orange-200 bg-orange-50 p-5"
                  >
                    <div className="mb-5 flex-1">
                      <h3 className="mb-2 line-clamp-2 text-xl font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      <p
                        className="line-clamp-3 text-base text-base-black"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
                    </div>

                    <div>
                      <p className="mb-5 text-sm font-medium text-rose-600">
                        {item.date_display}
                      </p>

                      <button
                        type="button"
                        className="group flex items-center gap-1.5 rounded-md text-base font-semibold text-gray-700 transition-colors hover:text-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
                        onClick={() => {
                          setAnnouncement(item);
                          setIsModalOpen(true);
                        }}
                      >
                        <span>Batafsil</span>
                        <ArrowRight
                          className="transition-transform group-hover:translate-x-1"
                          size={20}
                        />
                      </button>
                    </div>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </Container>

      <Modal centered open={isModalOpen} onCancel={closeModal} footer={null} width={794}>
        <div className="sm:p-3">
          <h2 className="mb-4 text-center text-xl font-bold text-black md:mb-8 md:text-2xl">
            DIQQAT, E’LON!
          </h2>

          <p
            className="mb-3 text-sm text-gray-600 sm:text-base md:mb-4 md:text-lg"
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
              className="text-sm font-semibold text-gray-900 sm:text-base md:text-lg"
              dangerouslySetInnerHTML={{ __html: announcement.footer_text }}
            />
          )}
        </div>
      </Modal>
    </section>
  );
});

HomeSectionsAnnouncements.displayName = "HomeSectionsAnnouncements";
