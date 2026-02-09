"use client";
import { memo, useState, useMemo } from "react";
import Link from "next/link";
import { Pagination } from "antd";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { ROUTES } from "@/constants";
import { VideotekaItem } from "@/components";

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
    document.getElementById("news")?.scrollIntoView({
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

  return (
    <section id="videoteka" className="py-10 md:py-16 lg:py-24 relative">
      <div className="container z-10">
        <div className="md:text-center mb-8 md:mb-12 lg:mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold text-base-black">
            Videoteka
          </h2>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentVideos.map((video) => (
            <VideotekaItem key={video.id} video={video} />
          ))}
        </div>

        {/* Custom Pagination */}
        <div className="mt-10 flex justify-between items-center pt-5 border-t border-gray-200">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`border-none outline-none text-sm flex items-center gap-1.5 transition-colors duration-200 ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:text-black cursor-pointer"
            }`}
          >
            <ArrowLeft size={16} /> Oldingi
          </button>

          <Pagination
            current={currentPage}
            total={totalVideos}
            pageSize={VIDEOS_PER_VIEW}
            onChange={handlePageChange}
            className="custom-pagination"
            showSizeChanger={false}
            showQuickJumper={false}
            locale={{
              prev_page: "Oldingi",
              next_page: "Keyingi",
              items_per_page: "videolar",
            }}
          />

          {currentPage === totalPages ? (
            <Link href={ROUTES.VIDEOTEKA} className="hover:underline">
              Barchasini ko'rish
            </Link>
          ) : (
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`border-none outline-none text-sm flex items-center gap-1.5 transition-colors duration-200 ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:text-black cursor-pointer"
              }`}
            >
              Keyingi <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
});

NewsSectionsVideoteka.displayName = "NewsSectionsVideoteka";
