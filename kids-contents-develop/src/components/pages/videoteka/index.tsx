"use client";

import { VideotekaItem } from "@/components/general";
import { memo, useMemo } from "react";

export const VideotekaPage = memo(function NewsPage() {
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
