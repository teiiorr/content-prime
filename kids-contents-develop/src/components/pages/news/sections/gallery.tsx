"use client";
import { memo } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { BgBubbles, HomeSectionShell } from "@/components";
import { ScrollCard } from "@/components/motion/ScrollCard";

export const NewsSectionsGallery = memo(function NewsSectionsGallery() {
  const galleryItems = [
    {
      id: 1,
      type: "large",
      alt: "Team meeting discussion",
      description: "Jamoa yig'ilishi va loyiha muhokamasi",
      src: "/images/gallery/1.avif",
      srcSet: "/images/gallery/1@2x.avif 1.5x",
    },
    {
      id: 2,
      type: "tall",
      alt: "Official presentation and partnership",
      description: "Rasmiy taqdimot va hamkorlik shartnomasi imzolash",
      src: "/images/gallery/4.avif",
      srcSet: "/images/gallery/4@2x.avif 1.5x",
    },
    {
      id: 3,
      type: "medium",
      alt: "Center director interview",
      description: "Markaz direktori bilan intervyu",
      src: "/images/gallery/2.avif",
      srcSet: "/images/gallery/2@2x.avif 1.5x",
    },
    {
      id: 4,
      type: "medium",
      alt: "Team collaboration session",
      description: "Jamoa hamkorligi sessiyasi",
      src: "/images/gallery/5.avif",
      srcSet: "/images/gallery/5@2x.avif 1.5x",
    },
    {
      id: 5,
      type: "medium",
      alt: "Strategy planning meeting",
      description: "Strategik rejalashtirish yig'ilishi",
      src: "/images/gallery/3.avif",
      srcSet: "/images/gallery/3@2x.avif 1.5x",
    },
    {
      id: 6,
      type: "tall",
      alt: "Children's content project showcase",
      description: "Bolalar kontenti loyihasi namoyishi",
      src: "/images/gallery/6.avif",
      srcSet: "/images/gallery/6@2x.avif 1.5x",
    },
  ];

  return (
    <section
      id="gallery"
      className="relative my-12 bg-gradient-to-b from-[#f3efe8] to-transparent py-10 md:my-16 md:py-16 lg:my-24 lg:py-24"
    >
      <div className="container relative z-10 mx-auto max-w-[1508px] 2xl:max-w-[88%]">
        <HomeSectionShell className="border-[#ddd5c9] bg-white/90 p-5 sm:p-6 lg:p-8 xl:p-10 shadow-[0_28px_70px_-48px_rgba(99,83,64,0.16)]">
          <div className="mb-6 flex justify-center md:mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-300/80 bg-white px-5 py-2.5 text-base font-bold tracking-[-0.01em] text-slate-900 shadow-sm sm:px-6 sm:py-3 sm:text-lg md:px-7 md:py-3.5 md:text-xl">
              <ImageIcon size={18} className="text-slate-600 md:h-5 md:w-5" />
              Fotogalereya
            </div>
          </div>

          <div className="gallery-grid">
            {galleryItems.map((item, index) => (
              <div
                key={item.id}
                className={`gallery-item gallery-item-${item.id}`}
              >
                <ScrollCard
                  index={index}
                  yFrom={84}
                  scaleFrom={1.08}
                  blurFrom={8}
                  delayStep={0.04}
                  className="h-full"
                >
                  <div className="group relative h-full cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 lg:rounded-[28px]">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 30vw, 50vw"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                </ScrollCard>
              </div>
            ))}
          </div>
        </HomeSectionShell>
      </div>

      <BgBubbles color="#ebe1d4" className="bottom-full" />
      <BgBubbles color="#ebe1d4" className="top-full rotate-180" />

      <style jsx>{`
        .gallery-grid {
          display: grid;
          gap: 16px;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(8, 1fr);
          height: 720px;
        }

        /* Mobile layout (2 columns) */
        .gallery-item-1 {
          grid-row: span 3 / span 3;
          grid-column-start: 1;
          grid-row-start: 1;
        }

        .gallery-item-2 {
          grid-row: span 2 / span 2;
          grid-column-start: 2;
          grid-row-start: 1;
        }

        .gallery-item-3 {
          grid-row: span 2 / span 2;
          grid-column-start: 2;
          grid-row-start: 3;
        }

        .gallery-item-4 {
          grid-row: span 2 / span 2;
          grid-column-start: 1;
          grid-row-start: 4;
        }

        .gallery-item-5 {
          grid-row: span 3 / span 3;
          grid-column-start: 2;
          grid-row-start: 5;
        }

        .gallery-item-6 {
          grid-row: span 2 / span 2;
          grid-column-start: 1;
          grid-row-start: 6;
        }

        /* Desktop layout (3 columns) - md and up */
        @media (min-width: 1024px) {
          .gallery-grid {
            gap: 24px;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(6, 1fr);
            height: 860px;
          }

          .gallery-item-1 {
            grid-row: span 3 / span 3;
            grid-column-start: 1;
            grid-row-start: 1;
          }

          .gallery-item-2 {
            grid-row: span 3 / span 3;
            grid-column-start: 1;
            grid-row-start: 4;
          }

          .gallery-item-3 {
            grid-row: span 4 / span 4;
            grid-column-start: 2;
            grid-row-start: 1;
          }

          .gallery-item-4 {
            grid-row: span 2 / span 2;
            grid-column-start: 2;
            grid-row-start: 5;
          }

          .gallery-item-5 {
            grid-row: span 2 / span 2;
            grid-column-start: 3;
            grid-row-start: 1;
          }

          .gallery-item-6 {
            grid-row: span 4 / span 4;
            grid-column-start: 3;
            grid-row-start: 3;
          }
        }
      `}</style>
    </section>
  );
});

NewsSectionsGallery.displayName = "NewsSectionsGallery";
