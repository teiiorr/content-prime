"use client";

import { memo, useEffect, useState } from "react";
import { Badge, Button, Container } from "@/components";
import { ROUTES } from "@/constants";
import { HeroVisualEnhancer } from "@/components/effects/HeroVisualEnhancer";

export const HomeSectionsHero = memo(function HomeSectionsHero() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowVideo(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="hero" className="relative overflow-hidden py-8 md:py-14">
      <Container className="relative z-10">
        <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-slate-200 bg-white/90 p-6 shadow-[var(--shadow-md)] md:p-10">
          <HeroVisualEnhancer />

          <div className="relative z-10 grid items-center gap-8 lg:grid-cols-2">
            {/* Text */}
            <div className="space-y-5">
              <Badge>Bolalar kontentini rivojlantirish markazi</Badge>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
                Sifatli bolalar kontenti uchun yagona professional platforma
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
                Ta’limiy, tarbiyaviy va ko‘ngilochar yo‘nalishdagi milliy
                kontentlarni yaratish hamda qo‘llab-quvvatlashga xizmat qiluvchi
                markaz.
              </p>

              <div className="flex flex-wrap gap-3">
                <Button href={ROUTES.NEWS} theme="primary">
                  Yangiliklar
                </Button>

                <Button href={ROUTES.CREATIVE_CONTESTS} theme="outlined">
                  Ijodiy tanlovlar
                </Button>
              </div>
            </div>

            {/* Video */}
            <div className="relative aspect-video overflow-hidden rounded-2xl border-4 border-cyan-600/80 bg-slate-900">
              {!showVideo ? (
                <img
                  src="/images/about-video-poster.avif"
                  alt="Hero poster"
                  className="h-full w-full object-cover"
                />
              ) : (
                <video
                  src="/videos/intro_video.mp4"
                  poster="/images/about-video-poster.avif"
                  controls
                  muted
                  autoPlay
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
});

HomeSectionsHero.displayName = "HomeSectionsHero";
