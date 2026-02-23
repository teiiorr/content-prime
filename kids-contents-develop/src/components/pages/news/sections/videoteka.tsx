"use client";
import { memo, useState, useMemo } from "react";
import Link from "next/link";
import { Pagination } from "antd";
import { ArrowLeft, ArrowRight, Clapperboard } from "lucide-react";

import { ROUTES } from "@/constants";
import { HomeSectionShell, VideotekaItem } from "@/components";

const VIDEOS_PER_VIEW = 3;

export const NewsSectionsVideoteka = memo(function NewsSectionsVideoteka() {
  const [currentPage, setCurrentPage] = useState(1);

  const allVideos = useMemo(() => {
    return Array.from({ length: 30 }, (_, index) => ({
      id: index + 1,
      image: `/images/videoteka/${(index % 2) + 1}.avif`,
      image2x: `/images/videoteka/${(index % 2) + 1}@2x.avif`,
      title: `Bolalar kontentini`,
      description: `Videoning tavsifi ${index + 1}`,
      length: `${(index % 3) + 1}:0${(index % 2) + 1}`,
    }));
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
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-300/80 bg-white px-5 py-2.5 text-base font-bold tracking-[-0.01em] text-slate-900 shadow-sm sm:px-6 sm:py-3 sm:text-lg md:px-7 md:py-3.5 md:text-xl">
              <Clapperboard size={18} className="text-slate-600 md:h-5 md:w-5" />
              Videoteka
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {currentVideos.map((video) => (
              <VideotekaItem key={video.id} video={video} />
            ))}
          </div>

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
        </HomeSectionShell>
      </div>
    </section>
  );
});

NewsSectionsVideoteka.displayName = "NewsSectionsVideoteka";
