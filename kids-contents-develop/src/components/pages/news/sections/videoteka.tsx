"use client";
import { memo, useState, useMemo } from "react";
import Link from "next/link";
import { Pagination } from "antd";
import { ArrowLeft, ArrowRight, Clapperboard } from "lucide-react";

import { ROUTES } from "@/constants";
import { HomeSectionShell, VideotekaItem } from "@/components";
import { ScrollCard } from "@/components/motion/ScrollCard";

const VIDEOS_PER_VIEW = 3;

export const NewsSectionsVideoteka = memo(function NewsSectionsVideoteka() {
  const [currentPage, setCurrentPage] = useState(1);

  const allVideos = useMemo(() => {
    return [
      { id: 1, videoSrc: "/videos/amir-temur.mp4", title: "Amir Temur", description: "Videoning tavsifi 1" },
      { id: 2, videoSrc: "/videos/bobur.mp4", title: "Zahiriddin Muhammad Bobur", description: "Videoning tavsifi 2" },
      { id: 3, videoSrc: "/videos/bolakay.mp4", title: "Bolakay", description: "Videoning tavsifi 3" },
      { id: 4, videoSrc: "/videos/bolalar-uchun-ijodiy-tanlov.mp4", title: "Bolalar uchun ijodiy tanlov", description: "Videoning tavsifi 4" },
      { id: 5, videoSrc: "/videos/ibn-sino.mp4", title: "Ibn Sino", description: "Videoning tavsifi 5" },
      { id: 6, videoSrc: "/videos/polapon.mp4", title: "Polapon", description: "Videoning tavsifi 6" },
    ];
  }, []);

  const totalVideos = allVideos.length;
  const totalPages = Math.ceil(totalVideos / VIDEOS_PER_VIEW);

  // Current page videos
  const currentVideos = useMemo(() => {
    const startIndex = (currentPage - 1) * VIDEOS_PER_VIEW;
    const endIndex = startIndex + VIDEOS_PER_VIEW;
    return allVideos.slice(startIndex, endIndex);
  }, [allVideos, currentPage, VIDEOS_PER_VIEW]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById("videoteka")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const navBtnBase =
    "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition duration-200";

  return (
    <section
      id="videoteka"
      className="relative bg-gradient-to-b from-[#eef1f5] to-transparent py-10 md:py-16 lg:py-24"
    >
      <div className="container z-10 max-w-[1508px] 2xl:max-w-[88%]">
        <HomeSectionShell className="border-[#d4dce5] bg-white/90 p-5 sm:p-6 lg:p-8 xl:p-10 shadow-[0_28px_70px_-48px_rgba(15,23,42,0.16)]">
          <div className="mb-6 flex justify-center md:mb-8">
            <div className="inline-flex items-center gap-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              <Clapperboard size={18} className="text-slate-600 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
              Videoteka
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {currentVideos.map((video, index) => (
              <ScrollCard key={video.id} index={index} yFrom={76} scaleFrom={1.07} blurFrom={7}>
                <VideotekaItem video={video} />
              </ScrollCard>
            ))}
          </div>

          <ScrollCard index={3} yFrom={48} scaleFrom={1.03} blurFrom={4}>
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-3 sm:p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={[
                  navBtnBase,
                  currentPage === 1
                    ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900",
                ].join(" ")}
              >
                <ArrowLeft size={16} /> Oldingi
              </button>

              <Pagination
                current={currentPage}
                total={totalVideos}
                pageSize={VIDEOS_PER_VIEW}
                onChange={handlePageChange}
                className="custom-pagination mx-auto sm:mx-0"
                showSizeChanger={false}
                showQuickJumper={false}
                locale={{
                  prev_page: "Oldingi",
                  next_page: "Keyingi",
                  items_per_page: "videolar",
                }}
              />

              {currentPage === totalPages ? (
                <Link
                  href={ROUTES.VIDEOTEKA}
                  className="inline-flex items-center justify-center rounded-full border border-emerald-600 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 transition duration-200 hover:bg-emerald-600 hover:text-white"
                >
                  Barchasini ko'rish
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={[
                    navBtnBase,
                    currentPage === totalPages
                      ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900",
                  ].join(" ")}
                >
                  Keyingi <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
          </ScrollCard>
        </HomeSectionShell>
      </div>
    </section>
  );
});

NewsSectionsVideoteka.displayName = "NewsSectionsVideoteka";
