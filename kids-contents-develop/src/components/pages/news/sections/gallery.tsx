"use client";
import { memo } from "react";
import { BgBubbles } from "@/components";

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
      className="relative py-10 md:py-16 lg:py-24 bg-orange-100 my-12 md:my-16 lg:my-24"
    >
      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div className="md:text-center mb-8 md:mb-12 lg:mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold text-base-black">
            Fotogalereya
          </h2>
        </div>

        {/* Grid */}
        <div className="gallery-grid">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className={`gallery-item gallery-item-${item.id} group cursor-pointer overflow-hidden rounded-lg lg:rounded-[33px]`}
            >
              <img
                src={item.src}
                srcSet={item.srcSet}
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>

      <BgBubbles color="#ffeec6" className="bottom-full" />
      <BgBubbles color="#ffeec6" className="top-full rotate-180" />

      <style jsx>{`
        .gallery-grid {
          display: grid;
          gap: 16px;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(8, 1fr);
          height: 800px;
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
