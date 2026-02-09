"use client";

import { VideotekaItem } from "@/components/general";
import { memo, useMemo } from "react";

export const VideotekaPage = memo(function NewsPage() {
  const allVideos = useMemo(() => {
    return Array.from({ length: 15 }, (_, index) => ({
      id: index + 1,
      image: `/images/videoteka/${(index % 3) + 1}.avif`,
      image2x: `/images/videoteka/${(index % 3) + 1}@2x.avif`,
      title: `Bolalar kontentini`,
      description: `Videoning tavsifi ${index + 1}`,
      length: `${(index % 3) + 1}:0${(index % 2) + 1}`,
    }));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <section id="videoteka-hero">
        <div className="container relative z-10 min-h-screen">
          <div className="py-12 lg:pt-14 lg:pb-28">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-8 lg:mb-20 leading-tight">
                Videoteka
              </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {allVideos.map((video) => (
                <VideotekaItem key={video.id} video={video} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});
