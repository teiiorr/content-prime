"use client";

import { BgBubbles } from "@/components/general";
import { FooterLink } from "@/components/ui";
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
    <footer className="bg-blue-200 mt-12 md:mt-16 lg:mt-24 relative border-t border-slate-200">
      <BgBubbles color="#baedfd" className="bottom-full" />

      <div className="container py-10">
        {/* Main */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-12 mb-16">
          {/* Logo */}
          <div className="flex-1 max-lg:text-center lg:max-w-2xl">
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
              quvvatlaydigan tashkilot.
            </p>
          </div>

          {/* Social */}
          <div className="max-lg:w-full flex-shrink-0 flex max-lg:justify-center items-center gap-6">
            {SOCIAL_LINKS.map((link) => (
              <FooterLink
                key={link.href}
                href={link.href}
                aria-label="Social link"
                className="text-gray-600 hover:text-black transition-colors duration-300"
              >
                {link.icon}
              </FooterLink>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-300 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-600 text-sm">
              © {currentYear} Bolalar kontentini rivojlantirish markazi
            </div>

            <div className="text-gray-600 text-sm flex items-center gap-2">
              <span>Designed & Developed by</span>

              <Link
                href="https://jafton.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Jafton link"
                className="hover:opacity-80 transition"
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
                    d="M68.3482 18.3755C68.3482 18.3755 68.3482 13.1631 68.3482 11.957C68.3482 10.1477 66.8153 8.63995 64.8766 8.63995C63.8397 8.63995 62.893 9.07073 62.2618 9.75998..."
                    fill="#38BDF8"
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
