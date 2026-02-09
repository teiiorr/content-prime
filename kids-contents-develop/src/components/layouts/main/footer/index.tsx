"use client";
import { BgBubbles } from "@/components/general";
import { LINKS } from "@/constants";
import {
  FacebookIcon,
  InstagramIcon,
  TelegramIcon,
  TwitterIcon,
} from "@/icons";
import Link from "next/link";
import { useMemo } from "react";

const SOCIAL_LINKS = [
  {
    href: LINKS.facebookUrl,
    icon: <FacebookIcon />,
  },
  {
    href: LINKS.telegramUrl,
    icon: <TelegramIcon />,
  },
  {
    href: LINKS.instagramUrl,
    icon: <InstagramIcon />,
  },
  {
    href: LINKS.twitterUrl,
    icon: <TwitterIcon />,
  },
];

export function MainFooter() {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="bg-blue-200 mt-12 md:mt-16 lg:mt-24 relative">
      <BgBubbles color="#baedfd" className="bottom-full" />

      <div className="container py-10">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-12 mb-16">
          {/* Logo and Description */}
          <div className="flex-1 max-lg:text-center lg:max-w-2xl">
            {/* Logo placeholder - you'll add your logo here */}
            <div className="mb-8">
              <img
                src="/logo.svg"
                alt="Site logo"
                width={220}
                height={80.82}
                className="max-lg:mx-auto"
              />
            </div>

            <p className="text-gray-600 text-base leading-relaxed">
              Bolalar uchun mo‘ljallangan tarbiyaviy, ma'rifiy ahamiyatga ega
              milliy kontentlar va targ‘ibot vositalari yaratishni qo‘llab
              quvvatlaydigan, bolalarga milliy madaniyat, san'at, adabiyot,
              tarix va ma'naviy qadriyatlar haqida tushunchalar beradigan milliy
              kontentlarni joriy qiluvchi tashkilot
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="max-lg:w-full flex-shrink-0 flex max-lg:justify-center items-center gap-6">
            {SOCIAL_LINKS.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                aria-label="Social link"
                className="text-gray-600 hover:text-black transition-colors duration-300"
              >
                {link.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-black-alpha-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-gray-600 text-sm">
              © {currentYear} Bolalar kontentini rivojlantirish markazi
            </div>

            {/* Credit */}
            <div className="text-gray-600 text-sm flex items-center gap-2">
              <span>Designed & Developed by</span>
              <Link
                href="https://jafton.com"
                target="_blank"
                aria-label="Jafton link"
              >
                <svg
                  width="72"
                  height="24"
                  viewBox="0 0 72 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M68.3482 18.3755C68.3482 18.3755 68.3482 13.1631 68.3482 11.957C68.3482 10.1477 66.8153 8.63995 64.8766 8.63995C63.8397 8.63995 62.893 9.07073 62.2618 9.75998L62.2167 9.80305C59.9174 12.0431 57.4828 14.4554 55.0483 16.7386C54.913 16.8678 54.8228 16.9109 54.6425 17.0831C53.3801 18.1601 51.7571 18.7632 49.9087 18.7632C45.9863 18.7632 42.7853 15.7047 42.7853 11.957C42.7853 8.20917 45.9863 5.15065 49.9087 5.15065C49.9087 5.15065 49.9087 5.15065 49.9537 5.15065C49.9537 5.15065 49.9537 5.15065 49.9988 5.15065C52.8392 5.15065 55.2737 6.70146 56.4459 8.98457L53.4253 11.8707C53.3801 10.1046 51.8473 8.68303 49.9537 8.68303C48.0602 8.68303 46.4822 10.1477 46.4822 12C46.4822 13.8092 48.0151 15.317 49.9537 15.317C50.8554 15.317 51.712 14.9724 52.2981 14.4124C52.5235 14.24 52.6137 14.1539 52.6587 14.1109C52.6137 14.1539 52.7039 14.0677 52.6587 14.1109C52.6587 14.1109 52.7039 14.0677 52.7489 14.0246L59.8723 7.13224C61.1797 5.92605 62.938 5.19373 64.8766 5.19373C68.799 5.19373 72 8.25225 72 12C72 13.3354 72 13.9385 72 14.1539C72 14.2831 72 14.3263 72 14.2831V18.3755H68.3482ZM61.4052 18.5048H57.6181V15.7047L61.4052 12.0861V18.5048ZM60.5486 5.15065C59.6919 5.96913 57.6181 7.9507 57.6181 7.9507C57.6181 7.9507 57.6181 5.96913 57.6181 5.15065C57.7984 5.15065 60.3231 5.15065 60.5486 5.15065ZM18.2141 6.87377C17.1772 5.8399 15.7796 5.32296 14.1114 5.32296C10.5047 5.32296 7.61929 8.3384 7.61929 12.0431C7.61929 15.7478 10.5498 18.7632 14.1114 18.7632C15.7796 18.7632 17.1772 18.2463 18.2141 17.2124V18.4185H21.9111V5.66759H18.2141V6.87377ZM18.2141 12.0431C18.2141 14.0246 16.7715 15.4032 14.7427 15.4032C12.7139 15.4032 11.3162 14.0246 11.3162 12.0431C11.3162 10.0615 12.7139 8.68303 14.7427 8.68303C16.7715 8.68303 18.2141 10.0615 18.2141 12.0431ZM31.6944 0.325949H31.8297V3.72909H31.6494C30.7025 3.64294 30.0263 3.81525 29.6205 4.15986C29.2599 4.46141 29.0795 4.97834 29.0795 5.62451H31.8297V9.02765H29.0795V18.3755H25.3826V9.07073H23.489V5.66759L25.3826 5.66759C25.3826 3.90141 25.9236 2.52291 26.9155 1.61828C28.0427 0.627494 29.6205 0.196716 31.6944 0.325949ZM2.29931 5.66759H5.99624L5.99624 18.5478C5.99624 20.4433 5.5454 21.7787 4.55354 22.6402C3.69694 23.4157 2.47965 23.8033 0.811522 23.8033C0.586099 23.8033 0.360676 23.8033 0.135254 23.8033H0L0 20.4002H0.180338C0.946776 20.4433 1.48779 20.314 1.84847 20.0125C2.16406 19.7109 2.34439 19.237 2.34439 18.5478L2.34439 5.66759H2.29931ZM38.7728 9.07073V14.1109C38.7728 14.4985 38.8629 14.757 39.0432 14.9293C39.449 15.2739 40.3506 15.2739 41.5228 15.2309H41.7033V18.4617H41.568C40.9367 18.5478 40.3506 18.5478 39.8097 18.5478C38.1867 18.5478 37.0595 18.2463 36.2931 17.6001C35.4815 16.9109 35.0758 15.7908 35.0758 14.1109V9.07073H32.8216V5.66759H35.0758V3.16908L38.7728 2.09213V5.62451L41.7033 5.62451V9.02765H38.7728V9.07073ZM6.35692 2.3506C6.35692 3.5137 5.31997 4.46141 4.14778 4.46141C2.88541 4.46141 1.89355 3.5137 1.89355 2.3506C1.89355 1.1875 2.93049 0.196716 4.14778 0.196716C5.36506 0.196716 6.35692 1.1875 6.35692 2.3506Z"
                    fill="#01A3D4"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
