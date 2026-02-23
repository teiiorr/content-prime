"use client";

import Link from "next/link";
import { memo } from "react";
import { Mail, Phone, MapPin, ArrowUpRight, Building2 } from "lucide-react";
import {
  Container,
  HomeCard,
  HomeSectionShell,
} from "@/components";

export const HomeSectionsContact = memo(function HomeSectionsContact() {
  const contacts = [
    {
      id: "gmail",
      title: "Gmail pochta",
      value: "childrenscontentuz@gmail.com",
      href: "mailto:childrenscontentuz@gmail.com",
      color: "emerald",
      icon: Mail,
    },
    {
      id: "umail",
      title: "Umail pochta",
      value: "bolalarkontentiuz@umail.uz",
      href: "mailto:bolalarkontentiuz@umail.uz",
      color: "amber",
      icon: Mail,
    },
    {
      id: "exat",
      title: "Exat pochta",
      value: "bolalarkontentiuz@exat.uz",
      href: "mailto:bolalarkontentiuz@exat.uz",
      color: "sky",
      icon: Mail,
    },
    {
      id: "phone",
      title: "Telefon raqam",
      value: "+998 (55) 511-1505",
      href: "tel:+998555111505",
      color: "violet",
      icon: Phone,
    },
  ] as const;

  const colorClasses: Record<string, string> = {
    emerald: "border-emerald-200/80 bg-emerald-50/50 text-emerald-800",
    amber: "border-stone-300 bg-stone-100 text-stone-700",
    sky: "border-slate-300 bg-slate-100 text-slate-700",
    violet: "border-indigo-200/80 bg-indigo-50/40 text-indigo-700",
  };

  return (
    <section id="contact" className="relative">
      <Container className="max-w-[1508px] py-10 lg:py-24 2xl:max-w-[88%]">
        <HomeSectionShell className="border-[#cfd6dd] bg-[#fbfcfd] p-5 sm:p-6 lg:p-8 xl:p-10 shadow-[0_28px_70px_-48px_rgba(33,54,76,0.18)]">
          <div className="mb-6 flex flex-col items-center text-center md:mb-8 lg:mb-10">
            <div className="inline-flex items-center justify-center rounded-full border border-[#cfd8e1] bg-white px-5 py-2.5 text-lg font-bold tracking-[-0.02em] text-slate-900 shadow-[0_10px_24px_-18px_rgba(33,54,76,0.22)] sm:px-6 sm:text-xl lg:px-7 lg:py-3 lg:text-2xl">
              Kontaktlar va joylashuv
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
              Biz bilan bog‘lanish uchun qulay aloqa kanallari va ofis manzili.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {contacts.map(({ id, title, value, href, color, icon: Icon }) => (
                  <HomeCard
                    key={id}
                    className="h-full min-h-[164px] p-4 sm:p-5"
                  >
                    <div className="flex h-full flex-col gap-3">
                      <div
                        className={[
                          "inline-flex h-11 w-11 items-center justify-center rounded-xl border",
                          colorClasses[color],
                        ].join(" ")}
                      >
                        <Icon size={20} />
                      </div>

                      <div className="text-base font-semibold tracking-[-0.01em] text-slate-900 sm:text-lg">
                        {title}
                      </div>

                      <Link
                        href={href}
                        className="mt-auto break-all text-sm font-semibold text-slate-700 no-underline transition hover:text-slate-900"
                      >
                        {value}
                      </Link>
                    </div>
                  </HomeCard>
                ))}
              </div>

              <HomeCard className="bg-slate-50/70 p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <div className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-stone-300 bg-stone-100 text-stone-700">
                    <MapPin size={20} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-slate-900">Bizning manzil</h3>
                      <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600">
                        <Building2 size={14} />
                        Toshkent shahar
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                      Olmazor tumani, Ziyo ko‘chasi, 2-A uy
                    </p>

                    <Link
                      href="https://yandex.uz/maps/?ll=69.214267%2C41.354485&z=17&pt=69.214267,41.354485,pm2rdl"
                      target="_blank"
                      className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 no-underline transition hover:border-stone-300 hover:text-stone-800"
                    >
                      Xaritada ochish
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </div>
              </HomeCard>
            </div>

            <div className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 max-md:aspect-square md:min-h-[420px] xl:min-h-[500px]">
              <iframe
                src="https://yandex.uz/map-widget/v1/?ll=69.214267%2C41.354485&z=17&l=map&pt=69.214267%2C41.354485%2Cpm2rdl"
                title="Bizning manzilimiz Yandex xaritasida"
                width="100%"
                height="100%"
                style={{ border: "none" }}
                allowFullScreen
                loading="lazy"
                aria-label="Interaktiv xarita: bizning ofis joylashuvi"
              />
            </div>
          </div>
        </HomeSectionShell>
      </Container>
    </section>
  );
});

HomeSectionsContact.displayName = "HomeSectionsContact";
