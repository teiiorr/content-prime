import Link from "next/link";
import { memo } from "react";

const STUDIOS = [
  {
    id: 1,
    name: "Art craft animation",
    phone: "+99890 999 62 00",
    src: "/images/organizations/art-craft.avif",
    srcSet: "/images/organizations/art-craft@2x.avif 1.5x",
    bgColor: "bg-white",
  },
  {
    id: 2,
    name: "Astir animation",
    phone: "+99888 190 22 33",
    src: "/images/organizations/animation-studio.avif",
    srcSet: "/images/organizations/animation-studio@2x.avif 1.5x",
    bgColor: "bg-white",
  },
  {
    id: 3,
    name: "Cinema of Central Asia",
    phone: "+99897 703 47 00",
    src: "/images/organizations/cinema-of-ca.avif",
    srcSet: "/images/organizations/cinema-of-ca@2x.avif 1.5x",
    bgColor: "bg-white",
  },
  {
    id: 4,
    name: "Dilshoh Media",
    phone: "+99899 011 51 15",
    src: "/images/organizations/dilshoh-media.avif",
    srcSet: "/images/organizations/dilshoh-media@2x.avif 1.5x",
    bgColor: "bg-sky-400",
  },
  {
    id: 5,
    name: "Dip animation",
    phone: "+99890 904 42 00",
    src: "/images/organizations/dip.avif",
    srcSet: "/images/organizations/dip@2x.avif 1.5x",
    bgColor: "bg-white",
  },
  {
    id: 6,
    name: "EzguFilm",
    phone: "+99888 708 01 00",
    src: "/images/organizations/ezgufilm.avif",
    srcSet: "/images/organizations/ezgufilm@2x.avif 1.5x",
    bgColor: "bg-white",
  },
  {
    id: 7,
    name: "Fan Entertainment",
    phone: "+99897 403 03 30",
    src: "/images/organizations/fan-entertainment.avif",
    srcSet: "/images/organizations/fan-entertainment@2x.avif 1.5x",
    bgColor: "bg-white",
  },
  {
    id: 8,
    name: "Futurist",
    phone: "+99893 500 50 85",
    src: "/images/organizations/futurist-studio.avif",
    srcSet: "/images/organizations/futurist-studio@2x.avif 1.5x",
    bgColor: "bg-teal-600",
  },
  {
    id: 9,
    name: "Global animation",
    phone: "+99895 980 55 85",
    src: "/images/organizations/global.avif",
    srcSet: "/images/organizations/global@2x.avif 1.5x",
    bgColor: "bg-white",
  },
  {
    id: 10,
    name: "Kinomania",
    phone: "+99890 177 53 34",
    src: "/images/organizations/kinomania.avif",
    srcSet: "/images/organizations/kinomania@2x.avif 1.5x",
    bgColor: "bg-teal-500",
  },
  {
    id: 11,

    name: "Lola animation",
    phone: "+99877 319 32 21",
    src: "/images/organizations/lola.avif",
    srcSet: "/images/organizations/lola@2x.avif 1.5x",
    bgColor: "bg-white",
  },
  {
    id: 12,
    name: "Media house",
    phone: "+99891 008 01 08",
    src: "/images/organizations/media-house.avif",
    srcSet: "/images/organizations/media-house@2x.avif 1.5x",
    bgColor: "bg-white",
  },
  {
    id: 13,
    name: "O‘zbekfilm",
    phone: "+99890 178 02 99",
    src: "/images/organizations/ozbekfilm.avif",
    srcSet: "/images/organizations/ozbekfilm@2x.avif 1.5x",
    bgColor: "bg-white",
  },
  {
    id: 14,
    name: "United Soft",
    phone: "+99890 185 00 19",
    src: "/images/organizations/united-soft.avif",
    srcSet: "/images/organizations/united-soft@2x.avif 1.5x",
    bgColor: "bg-white",
  },
];

export const StudiosSectionsHero = memo(function StudiosSectionsHero() {
  return (
    <section id="hero" className="hero-section">
      <div className="container relative z-10 py-12">
        <div className="text-center mb-12 md:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 lg:mb-6 leading-tight">
            Sizda g‘oya bormi?
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 lg:mb-12 leading-relaxed max-w-4xl mx-auto">
            Ushbu studiyalar ro‘yxati jismoniy shaxslarga ko‘mak uchun
            shakllantirildi. Jismoniy shaxslar o‘z g‘oyalari va ssenariylari
            haqida bildirish uchun o‘zlari tanlagan studiya bilan bog‘lanishlari
            mumkin. Ro‘yxat alifbo tartibida tuzilgan bo‘lib, Markazning
            tavsiyasi ekanini bildirmaydi. Har qanday studiya{" "}
            <Link
              href="https://t.me/Bolalarkontentiuz_bot"
              className="text-blue-600 underline"
            >
              ushbu havola
            </Link>{" "}
            orqali ro‘yxatdan joy olishi mumkin.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 lg:gap-8 xl:gap-14 mb-12">
          {STUDIOS.map((studio) => (
            <div
              key={studio.id}
              className="group cursor-pointer text-center flex-1 min-w-56 max-w-80"
            >
              <div className="aspect-video min-h-36 w-full rounded-2xl overflow-hidden relative mb-5 bg-white">
                <img
                  src={studio.src}
                  srcSet={studio.srcSet}
                  alt={`${studio.name} logo`}
                  className="w-full h-full absolute inset-0 object-cover object-center"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <h3 className="text-base lg:text-lg font-medium text-black mb-1 leading-tight">
                  {studio.name}
                </h3>
                <p className="text-sm lg:text-base text-black font-medium">
                  {studio.phone}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

StudiosSectionsHero.displayName = "StudiosSectionsHero";
