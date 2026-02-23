"use client";
import { memo } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ArrowRight } from "lucide-react";

import { Button, SiteLoader } from "@/components";
import { ROUTES } from "@/constants";
import { useSwiperPadding } from "@/hooks";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  src: string;
  srcSet: string;
  date: string;
  category?: string;
  slug?: string;
}

export const HomeSectionsNews = memo(function HomeSectionsNews() {
  const { isLoaded } = useSwiperPadding({
    titleSelector: ".news-swiper-title",
    paddingSelector: ".news-swiper-padding",
  });

  const newsItems: NewsItem[] = [
    {
      id: 1,
      slug: "bolalar-kontentini-rivojlantirish-markazi-ijodiy-tanlovlarni-elon-qilishni-rejalashtirmoqda",
      title:
        "Bolalar kontentini rivojlantirish markazi ijodiy tanlovlarni eʼlon qilishni rejalashtirmoqda",
      description:
        "Bolalar kontentini rivojlantirish markazi Oʻzbekiston Respublikasi Prezidentining 2025-yil 15-maydagi PQ-183-sonli qarori ijrosini taʼminlash maqsadida quyidagi yo‘nalishlarda ijodiy tanlovlarni eʼlon qilishni rejalashtirmoqda:",
      date: "2025-yil 11-avgust",
      src: "/images/news/bolalar-uchun-ijodiy-tanlov.avif",
      srcSet: "/images/news/bolalar-uchun-ijodiy-tanlov@2x.avif 1.5x",
    },
    {
      id: 2,
      title: "Bolalar uchun sifatli media",
      description:
        "Yangi tashkil etilgan markaz bolalarga mo'ljallangan multfilmlar, o'yinlar, interaktiv dasturlar va ma'rifiy videolarni yaratish bilan shug'ullanadi.",
      date: "2025-yil 20-yanvar",
      src: "/images/news/bolalar-uchun-sifatli-media.avif",
      srcSet: "/images/news/bolalar-uchun-sifatli-media@2x.avif 1.5x",
    },
    {
      id: 3,
      title: "Yosh avlod uchun",
      description:
        "O'zbekistonda bolalar uchun sifatli va zamonaviy media mahsulotlarini yaratishga ixtisoslashgan \"Bolalar kontenti rivojlantirish markazi\" o'z faoliyatini boshlad...",
      date: "2025-yil 19-yanvar",
      src: "/images/news/yosh-avlod-uchun.avif",
      srcSet: "/images/news/yosh-avlod-uchun@2x.avif 1.5x",
    },
    {
      id: 4,
      title: "Zamon bilan hamqadam",
      description:
        "Multfilmlar, o'yinlar, ertaklar va qiziqarli videolar — bularning barchasi endi O'zbekistonning o'zida yaratiladi! \"Bolalar kontenti rivojlantirish markazi\" ish boshlad...",
      date: "2025-yil 18-yanvar",
      src: "/images/news/zamon-bilan-hamqadam.avif",
      srcSet: "/images/news/zamon-bilan-hamqadam@2x.avif 1.5x",
    },
    {
      id: 5,
      title: "Har bir bola – qahramon",
      description:
        "O'zbekistonda bolalar uchun sifatli va zamonaviy media mahsulotlarini yaratishga ixtisoslashgan \"Bolalar kontenti rivojlantirish markazi\" o'z faoliyatini boshlad...",
      date: "2025-yil 17-yanvar",
      src: "/images/news/har-bir-bola-qahramon.avif",
      srcSet: "/images/news/har-bir-bola-qahramon@2x.avif 1.5x",
    },
    {
      id: 6,
      title:
        "Bir guruh yosh, iqtidorli animator rassomlar Markazga taklif etildi",
      description:
        "Kecha bolalar uchun anime, komikslar hamda animatsion filmlar janrida ijod qiluvchi bir guruh yosh, iqtidorli rassomlar Markazga taklif etildi.",
      date: "2025-yil 20-yanvar",
      src: "/images/news/iqtidorli-animatorlar.avif",
      srcSet: "/images/news/iqtidorli-animatorlar@2x.avif 1.5x",
    },
  ];

  const swiperSettings = {
    spaceBetween: 32,
    slidesPerView: 4.2,
    slidesPerGroup: 1,
    loop: true,
    navigation: {
      nextEl: ".news-next-btn",
    },
    autoplay: {
      delay: 8000,
      disableOnInteraction: false,
    },
    modules: [Navigation, Autoplay],
    breakpoints: {
      1399: {
        slidesPerView: 4.2,
      },
      1100: {
        slidesPerView: 3.2,
      },
      768: {
        slidesPerView: 2.2,
      },
      640: {
        slidesPerView: 2.2,
      },
      400: {
        slidesPerView: 1.2,
      },
      350: {
        slidesPerView: 1,
      },
      150: {
        slidesPerView: 1,
      },
    },
  };

  return (
    <section
      id="news"
      className="py-16 lg:pb-12 lg:pt-24 bg-white relative overflow-x-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-5 lg:mb-8">
          <div className="flex-1">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 news-swiper-title">
              Yangiliklar
            </h2>
          </div>
        </div>
      </div>

      {/* Swiper Container */}
      <div className="mt-8 news-swiper-padding relative z-10">
        {/* Navigation Button - positioned at right center of slides */}
        <Button
          aria-label="Next news"
          theme="primary"
          className="absolute right-10 top-1/2 -translate-y-1/2 w-12 h-12 news-next-btn z-10 sm:rounded-full"
        >
          <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6" />
        </Button>

        <div className="relative">
          {!isLoaded ? (
            <div className="py-28 flex items-center justify-center">
              <SiteLoader label="Yangiliklar yuklanmoqda" size="sm" />
            </div>
          ) : (
            <Swiper {...swiperSettings} className="news-swiper pt-8 pb-12">
              {newsItems.map((item) => (
                <SwiperSlide key={item.id}>
                  <Link href={item.slug ? `${ROUTES.NEWS}/${item.slug}` : "#"}>
                    <div className="group cursor-pointer">
                      <div className="relative aspect-[16/11] overflow-hidden rounded-xl">
                        <img
                          src={item.src}
                          srcSet={item.srcSet}
                          alt={item.title}
                          width={350}
                          height={240}
                          loading="lazy"
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Content */}
                      <div className="mt-5">
                        <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6 line-clamp-2 group-hover:text-green-600 transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed line-clamp-3 mb-6">
                          {item.description}
                        </p>
                        <span className="text-sm text-gray-500 font-medium">
                          {item.date}
                        </span>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>

      <svg
        width="254"
        height="325"
        viewBox="0 0 254 325"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 hidden lg:block"
      >
        <g clipPath="url(#clip0_647_14199)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M160.087 237.226C158.859 243.814 159.411 248.913 160.53 254.116C162.187 266.947 175.13 285.1 172.93 296.896C171.059 306.935 168.082 309.242 158.08 313.501C145.863 318.78 118.183 319.785 104.098 318.619C82.5561 316.471 77.3181 314.792 55.4936 306.102C38.4653 299.008 11.7746 289.097 -5.44653 296.699C-14.8148 300.361 -18.1778 304.739 -25.0932 311.708C-27.6939 314.799 -30.4232 318.579 -33.0284 321.345C-42.6636 329.241 -57.5272 332.605 -71.8596 329.966L-79.7518 328.513C-95.0313 325.7 -112.12 316.129 -119.156 307.63C-123.367 302.896 -126.182 296.277 -127.933 289.205C-131.281 271.78 -127.755 244.458 -110.288 235.538C-90.0897 225.628 -67.1073 228.107 -43.4305 232.466C-29.6032 235.011 -12.9609 244.176 -0.207012 246.524C11.1579 248.616 21.5781 249.821 31.8959 243.868C62.363 225.464 35.7807 203.762 56.26 187.089C57.5275 185.895 60.8179 184.359 62.4619 183.948C84.9938 175.181 116.291 184.902 132.961 172.201C160.4 150.774 150.928 103.147 130.599 83.6334C123.301 76.1894 117.543 76.9466 98.4816 56.2391C89.5422 46.7406 81.4567 32.6616 77.7138 20.161C74.9668 10.3748 74.4461 -0.494263 78.3451 -10.5496C79.4351 -13.5938 82.5503 -19.4452 84.5172 -21.9386C89.1478 -27.511 94.0332 -31.9982 100.305 -35.5162C114.617 -43.9788 126.387 -49.6646 143.961 -51.1019C169.813 -53.1567 190.033 -38.6609 194.678 -14.1827C196.031 -4.97757 196.246 4.73178 197.599 13.9369C198.517 22.6726 200.563 30.9669 205.782 38.3527C209.301 43.9977 218.17 53.8727 222.629 60.0802L228.858 67.652C234.264 74.0339 238.024 81.5404 242.233 88.7402C248.758 100.325 251.475 115.882 248.96 129.372C246.375 143.239 239.005 155.446 232.714 164.671C226.294 174.587 218.041 183.127 209.04 190.426C208.336 191.399 207.26 191.915 206.063 192.733C204.795 193.927 204.225 194.536 203.016 195.417L182.422 210.251C173.056 216.704 162.473 224.426 160.087 237.226Z"
            fill="#B2C300"
          />
        </g>
        <defs>
          <clipPath id="clip0_647_14199">
            <rect width="254" height="325" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <svg
        width="280"
        height="348"
        viewBox="0 0 280 348"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 -left-20 hidden lg:block"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M205.618 184.403C188.758 207.881 164.965 226.877 137.233 234.639C128.557 237.067 116.657 237.838 104.426 237.278C92.2414 236.72 80.1611 234.862 71.2458 232.291C70.5058 232.077 69.7645 231.854 69.0226 231.619C78.0675 216.855 83.659 200.054 84.3715 180.338C84.7277 170.485 81.356 159.542 75.2712 151.155C69.1619 142.734 59.8069 136.282 48.1659 137.067C29.6092 138.317 18.1808 154.047 13.802 168.976C8.25546 187.886 14.5874 204.116 25.913 216.419C33.6084 224.779 43.673 231.437 54.1719 236.212C45.0733 248.031 33.3592 258.606 19.8286 268.608C-22.9253 300.21 -85.3525 322.914 -136.722 337.631C-139.277 338.363 -140.755 341.028 -140.022 343.584C-139.29 346.14 -136.624 347.619 -134.069 346.887C-82.4881 332.11 -18.6588 309.031 25.5514 276.352C40.3178 265.437 53.385 253.56 63.436 239.911C65.1573 240.506 66.8751 241.05 68.5811 241.542C78.3763 244.367 91.2292 246.312 103.988 246.897C116.701 247.479 129.754 246.731 139.829 243.911C170.087 235.443 195.583 214.885 213.438 190.021C232.965 162.828 250.784 118.773 254.144 84.9511C255.607 70.2305 254.387 54.628 249.372 40.8382C252.196 40.2175 255.007 39.5779 257.811 38.94C263.598 37.6233 269.355 36.3133 275.14 35.1896C277.749 34.6828 279.453 32.156 278.945 29.5459C278.438 26.9359 275.911 25.2309 273.302 25.7378C266.866 26.9879 260.734 28.3831 254.745 29.7458C251.598 30.4618 248.491 31.1689 245.399 31.8413C238.265 18.3354 226.654 7.54309 209.556 2.87681C195.947 -0.837121 183.446 0.257174 171.302 9.42793C167.676 12.1613 163.822 16.0678 162.298 20.901C161.501 23.4285 161.346 26.2156 162.227 29.0613C163.099 31.8756 164.877 34.4046 167.389 36.6397C173.266 41.8685 181.29 44.1655 188.69 45.2416C196.122 46.3224 203.661 46.2639 209.118 46.2216L209.236 46.2207C219.862 46.1384 229.972 44.7273 239.835 42.8219C244.641 55.2245 245.972 69.832 244.565 83.9963C241.389 115.967 224.264 158.438 205.618 184.403ZM235.495 33.8501C226.951 35.4248 218.339 36.5214 209.159 36.5925C203.607 36.6355 196.724 36.6807 190.072 35.7134C183.335 34.7335 177.562 32.806 173.786 29.4463C172.276 28.1031 171.665 26.9969 171.423 26.2149C171.19 25.4645 171.197 24.6942 171.479 23.7991C172.113 21.7869 174.087 19.3867 177.097 17.1175C185.964 10.4334 195.812 9.10551 207.025 12.1657C220.172 15.7537 229.397 23.6005 235.495 33.8501ZM59.8143 228.185C49.6868 223.807 40.0681 217.584 32.9941 209.899C23.4142 199.492 18.6497 186.655 23.0392 171.689C26.8901 158.56 36.077 147.532 48.8159 146.673C56.1419 146.18 62.6382 150.133 67.4804 156.808C72.3469 163.516 75.0271 172.358 74.7513 179.987C74.0837 198.459 68.7231 214.206 59.8143 228.185Z"
          fill="#BAEDFD"
        />
      </svg>

      <svg
        width="304"
        height="348"
        viewBox="0 0 304 348"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 -right-20 hidden lg:block"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M346.173 184.426C329.313 207.905 305.519 226.901 277.787 234.662C269.112 237.09 257.211 237.862 244.98 237.302C232.796 236.744 220.716 234.886 211.801 232.314C211.061 232.101 210.319 231.877 209.577 231.643C218.622 216.879 224.214 200.078 224.926 180.362C225.282 170.508 221.911 159.565 215.826 151.178C209.717 142.757 200.362 136.306 188.721 137.09C170.164 138.341 158.736 154.07 154.357 169C148.81 187.91 155.142 204.14 166.468 216.443C174.163 224.803 184.228 231.46 194.727 236.236C185.628 248.054 173.914 258.63 160.383 268.631C117.629 300.234 55.2022 322.937 3.83269 337.654C1.27736 338.386 -0.200196 341.052 0.532468 343.608C1.26513 346.164 3.93057 347.642 6.48589 346.91C58.0666 332.133 121.896 309.054 166.106 276.375C180.873 265.46 193.94 253.584 203.991 239.935C205.712 240.53 207.43 241.074 209.136 241.566C218.931 244.391 231.784 246.336 244.543 246.92C257.255 247.502 270.308 246.754 280.384 243.935C310.642 235.466 336.138 214.909 353.992 190.044C373.52 162.851 391.339 118.796 394.699 84.9746C396.161 70.254 394.942 54.6515 389.926 40.8617C392.751 40.2409 395.562 39.6014 398.365 38.9634C404.152 37.6467 409.909 36.3368 415.694 35.2131C418.304 34.7062 420.008 32.1794 419.5 29.5694C418.993 26.9593 416.466 25.2543 413.856 25.7612C407.421 27.0113 401.289 28.4065 395.3 29.7693C392.153 30.4853 389.046 31.1923 385.954 31.8647C378.819 18.3589 367.209 7.56652 350.111 2.90025C336.502 -0.813683 324.001 0.280612 311.856 9.45136C308.231 12.1847 304.377 16.0912 302.853 20.9244C302.056 23.452 301.901 26.239 302.782 29.0848C303.654 31.8991 305.432 34.428 307.944 36.6631C313.821 41.8919 321.845 44.1889 329.245 45.2651C336.676 46.3459 344.216 46.2874 349.672 46.2451L349.791 46.2441C360.417 46.1618 370.527 44.7507 380.39 42.8453C385.196 55.2479 386.527 69.8555 385.12 84.0197C381.943 115.99 364.818 158.461 346.173 184.426ZM376.049 33.8735C367.506 35.4482 358.893 36.5448 349.714 36.616C344.162 36.659 337.279 36.7042 330.627 35.7368C323.89 34.757 318.117 32.8295 314.341 29.4697C312.831 28.1265 312.22 27.0203 311.978 26.2384C311.745 25.4879 311.752 24.7176 312.034 23.8225C312.668 21.8104 314.642 19.4101 317.652 17.141C326.518 10.4569 336.366 9.12895 347.579 12.1891C360.726 15.7771 369.952 23.6239 376.049 33.8735ZM200.369 228.208C190.241 223.83 180.623 217.607 173.549 209.922C163.969 199.515 159.204 186.678 163.594 171.713C167.445 158.584 176.632 147.555 189.371 146.697C196.697 146.203 203.193 150.157 208.035 156.831C212.902 163.539 215.582 172.382 215.306 180.011C214.638 198.483 209.278 214.229 200.369 228.208Z"
          fill="#BAEDFD"
        />
      </svg>
    </section>
  );
});

// Add display name for better debugging
HomeSectionsNews.displayName = "HomeSectionsNews";
