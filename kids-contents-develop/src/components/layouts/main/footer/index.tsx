"use client";

import Image from "next/image";
import { Facebook, Instagram, Send, MapPin, Phone, Mail } from "lucide-react";
import { FooterLink } from "@/components/ui";
import { LINKS } from "@/constants";
import { useMemo } from "react";
import { ParallaxSection } from "@/components/motion/ParallaxSection";

function XBrandIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M18.9 2H21.9L15.35 9.49L23.06 22H17.02L12.29 14.43L5.66 22H2.66L9.67 13.99L2.28 2H8.47L12.75 8.92L18.9 2ZM17.85 20.1H19.51L7.57 3.79H5.79L17.85 20.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    href: LINKS.facebookUrl,
    icon: <Facebook size={18} strokeWidth={2.1} />,
    label: "Facebook",
  },
  {
    href: LINKS.telegramUrl,
    icon: <Send size={18} strokeWidth={2.1} />,
    label: "Telegram",
  },
  {
    href: LINKS.instagramUrl,
    icon: <Instagram size={18} strokeWidth={2.1} />,
    label: "Instagram",
  },
  {
    href: LINKS.twitterUrl,
    icon: <XBrandIcon />,
    label: "X",
  },
];

export function MainFooter() {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <ParallaxSection tone="sky" intensity={0.9} accentSide="left" stickyAccent={false} contentParallax={false}>
      <footer className="relative mt-12 border-t border-slate-200 bg-blue-200 md:mt-16 lg:mt-24">
        <div className="container pb-[calc(96px+env(safe-area-inset-bottom))] pt-10 md:py-10">
          <div className="rounded-3xl border border-white/60 bg-white/60 p-5 shadow-[0_24px_60px_-40px_rgba(30,41,59,0.22)] backdrop-blur-sm sm:p-6 lg:p-8 xl:p-10">
          <div className="mb-10 grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-start lg:gap-10 xl:gap-12">
            <div className="max-lg:text-center">
              <div className="mb-6">
                <Image
                  src="/logo.svg"
                  alt="Site logo"
                  width={220}
                  height={81}
                  className="max-lg:mx-auto h-auto w-[180px] sm:w-[210px]"
                />
              </div>

              <p className="max-w-2xl text-sm leading-7 text-slate-700 sm:text-base">
                Bolalar uchun mo‘ljallangan tarbiyaviy, ma&apos;rifiy ahamiyatga ega milliy
                kontentlar va targ‘ibot vositalari yaratishni qo‘llab quvvatlaydigan tashkilot.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-2.5 rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-sm text-slate-700">
                  <MapPin size={16} className="text-slate-500" />
                  <span className="truncate">Toshkent shahar, Olmazor tumani</span>
                </div>
                <div className="flex items-center gap-2.5 rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-sm text-slate-700">
                  <Phone size={16} className="text-slate-500" />
                  <span>+998 (55) 511-1505</span>
                </div>
                <div className="sm:col-span-2 flex items-center gap-2.5 rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-sm text-slate-700">
                  <Mail size={16} className="text-slate-500" />
                  <span className="truncate">childrenscontentuz@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="inline-flex w-fit items-center justify-center rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm max-lg:mx-auto">
                Ijtimoiy tarmoqlar
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                {SOCIAL_LINKS.map((link) => (
                  <FooterLink
                    key={link.href}
                    href={link.href}
                    aria-label={link.label}
                    className="group flex items-center justify-center gap-2 rounded-2xl border border-white/70 bg-white/75 px-4 py-3 text-sm font-medium text-slate-700 shadow-[0_10px_24px_-20px_rgba(30,41,59,0.2)] transition hover:-translate-y-0.5 hover:bg-white hover:text-slate-900"
                  >
                    <span className="text-slate-500 transition group-hover:text-slate-700">
                      {link.icon}
                    </span>
                    <span>{link.label}</span>
                  </FooterLink>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200/80 pt-5">
            <div className="flex flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
              <div className="text-sm text-slate-600">
                © {currentYear} Bolalar kontentini rivojlantirish markazi
              </div>

              <div className="flex items-center gap-2 text-sm leading-none text-slate-600">
                <span className="leading-none">Designed & Developed by</span>
                <span className="inline-flex items-baseline gap-1 leading-none tracking-[-0.02em]">
                  <span className="text-[18px] font-extrabold leading-none text-slate-900 sm:text-[19px]">
                    teiior
                  </span>
                  <span className="text-[14px] font-medium leading-none text-slate-500 sm:text-[15px]">
                    dev
                  </span>
                </span>
              </div>
            </div>
          </div>
          </div>
        </div>
      </footer>
    </ParallaxSection>
  );
}
