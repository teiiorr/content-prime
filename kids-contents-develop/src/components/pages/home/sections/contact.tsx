"use client";

import Link from "next/link";
import { memo } from "react";
import { Card, Container, SectionHeading } from "@/components";

export const HomeSectionsContact = memo(function HomeSectionsContact() {
  return (
    <section id="contact" className="relative">
      <Container className="py-10 lg:py-24">
        <SectionHeading
          title="Kontaktlar va joylashuv"
          className="mb-8 text-center lg:mb-16"
        />

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mb-16 lg:grid-cols-4">
          <Card className="flex h-full min-h-[170px] flex-col gap-3 border-green-300 bg-green-100 p-6">
            <img
              src="/images/svg/mail.svg"
              alt="Email icon"
              width={48}
              height={48}
            />
            <div className="text-xl font-semibold text-gray-900">
              Gmail pochta
            </div>
            <Link
              href="mailto:childrenscontentuz@gmail.com"
              className="text-sm font-semibold text-green-600 no-underline"
            >
              childrenscontentuz@gmail.com
            </Link>
          </Card>

          <Card className="flex h-full min-h-[170px] flex-col gap-3 border-orange-300 bg-orange-100 p-6">
            <img
              src="/images/svg/mail-orange.svg"
              alt="Mail icon"
              width={48}
              height={48}
            />
            <div className="text-xl font-semibold text-gray-900">
              Umail pochta
            </div>
            <Link
              href="mailto:bolalarkontentiuz@umail.uz"
              className="text-sm font-semibold text-orange-500 no-underline"
            >
              bolalarkontentiuz@umail.uz
            </Link>
          </Card>

          <Card className="flex h-full min-h-[170px] flex-col gap-3 border-green-300 bg-green-100 p-6">
            <img
              src="/images/svg/mail.svg"
              alt="Email icon"
              width={48}
              height={48}
            />
            <div className="text-xl font-semibold text-gray-900">Exat pochta</div>
            <Link
              href="mailto:bolalarkontentiuz@exat.uz"
              className="text-sm font-semibold text-green-600 no-underline"
            >
              bolalarkontentiuz@exat.uz
            </Link>
          </Card>

          <Card className="flex h-full min-h-[170px] flex-col gap-3 border-blue-300 bg-blue-50 p-6">
            <img
              src="/images/svg/phone.svg"
              alt="Phone icon"
              width={48}
              height={48}
            />
            <div className="text-xl font-semibold text-gray-900">
              Telefon raqam
            </div>
            <Link
              href="tel:+998(55)511-1505"
              className="text-sm font-semibold text-blue-600 no-underline"
            >
              +998 (55) 511-1505
            </Link>
          </Card>
        </div>

        <div className="flex gap-6 max-md:flex-col">
          <div className="w-full md:max-w-[456px]">
            <h3 className="mb-4 text-2xl font-bold text-base-black md:mb-6">
              Bizning manzil
            </h3>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.0001 13.5829C10.484 13.5829 9.24999 12.3489 9.24999 10.8328C9.24999 9.31676 10.484 8.08276 12.0001 8.08276C13.5162 8.08276 14.7492 9.31676 14.7492 10.8328C14.7492 12.3489 13.5162 13.5829 12.0001 13.5829ZM12.0001 2.89258C7.58937 2.89258 4 6.48195 4 10.8937C4 16.5114 10.5707 21.8312 12.0001 21.8312C13.4294 21.8312 20.0002 16.5114 20.0002 10.8937C20.0002 6.48195 16.4108 2.89258 12.0001 2.89258Z"
                    fill="#FFA516"
                  />
                </svg>
              </div>

              <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold text-gray-900">
                  Toshkent shahar
                </div>
                <p className="text-base text-gray-600">
                  Olmazor t, Ziyo ko‘chasi 2-A uy
                </p>
              </div>
            </div>
          </div>

          <div className="w-full overflow-hidden rounded-3xl border border-slate-200 max-md:aspect-square md:min-h-[312px]">
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
      </Container>
    </section>
  );
});

HomeSectionsContact.displayName = "HomeSectionsContact";
