import { memo } from "react";
import { Sparkles } from "lucide-react";

import { HomeSectionShell } from "@/components";

export const AboutSectionsFunctions = memo(function AboutSectionsFunctions() {
  const functions = [
    {
      number: 1,
      className: "col-span-2",
      text: "Bolalar uchun mo‘ljallangan tarbiyaviy, ma’rifiy ahamiyatga ega milliy kontentlar va targ‘ibot vositalari yaratishni qo‘llab-quvvatlash.",
    },
    {
      number: 2,
      className: "col-span-2",
      text: " Xorijiy kontentlarning bolalar ongi va dunyoqarashiga ta’sirini tahlil qilish orqali ularning eng sara va foydali namunalarini o‘zbek tiliga tarjima qilish hamda ommaviy namoyishga tavsiya etish.",
    },
    {
      number: 3,
      className: "col-span-2",
      text: "Respublika hududida bolalar uchun mo‘ljallangan zararli axborotlar tarqalishining oldini olishga hamda bolalar va ota-onalarning media savodxonligini oshirishga qaratilgan materiallar tayyorlashni yo‘lga qo‘yish.",
    },
    {
      number: 4,
      className: "col-span-2",
      text: "Xorijda istiqomat qilayotgan vatandoshlar orasida bolalar uchun mo‘ljallangan milliy kontentlarni ommalashtirish bo‘yicha chet ellardagi madaniy markazlar bilan hamkorlik qilish.",
    },
    {
      number: 5,
      className: "col-span-2",
      text: "Bolalar uchun foydali hisoblangan kontentlarni tavsiya qiluvchi ijtimoiy tarmoq sahifalari va sun’iy intellekt tizimlarini joriy etish.",
    },
    {
      number: 6,
      className: "col-span-2",
      text: "Bolalar uchun mo‘ljallangan milliy kontentlarni yaratishga xorijiy mutaxassislarni jalb qilish bo‘yicha xalqaro tashkilotlar bilan qo‘shma loyihalar ishlab chiqish va ularni amalga oshirish.",
    },
    {
      number: 7,
      className: "col-span-2 lg:col-span-3",
      text: "Bolalarga milliy madaniyat, san’at, adabiyot, tarix va ma’naviy qadriyatlar haqida tushunchalar berishga, ularda ekologik madaniyatni shakllantirish hamda sog‘lom turmush tarzi ko‘nikmasini rivojlantirishga mo‘ljallangan milliy kontentlar yaratishga oid loyihalarni joriy qilish.",
    },
    {
      number: 8,
      className: "col-span-2 lg:col-span-3",
      text: "Bolalarning o‘zbek tilida ravon so‘zlash va imloviy xatolarsiz yozish ko‘nikmasini rivojlantirishga mo‘ljallangan interaktiv dasturlar yaratish.",
    },
  ];

  return (
    <section
      id="center-functions"
      className="relative mt-12 bg-gradient-to-b from-[#eef1f5] via-[#f2f4f7] to-transparent py-10 md:mt-16 md:py-16 lg:mt-20 lg:py-24"
    >
      <div className="container max-w-[1508px] 2xl:max-w-[88%]">
        <HomeSectionShell className="border-[#d3dae3] bg-[#f8fafc] p-5 sm:p-6 lg:p-8 xl:p-10 shadow-[0_28px_70px_-48px_rgba(30,41,59,0.16)]">
          <div className="mb-6 flex justify-center md:mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-300/80 bg-white px-5 py-2.5 text-base font-bold tracking-[-0.01em] text-slate-900 shadow-sm sm:px-6 sm:py-3 sm:text-lg md:gap-2.5 md:px-7 md:py-3.5 md:text-xl">
              <Sparkles size={18} className="text-slate-600 md:h-5 md:w-5" />
              Faoliyat
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-6 xl:gap-5 2xl:gap-6">
            {functions.map((func) => (
              <article
                key={func.number}
                className={[
                  "group relative overflow-hidden rounded-2xl border border-[#dbe2ea] bg-white p-4 shadow-[0_14px_34px_-28px_rgba(15,23,42,0.18)] transition duration-200",
                  "hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_18px_40px_-26px_rgba(15,23,42,0.18)]",
                  "sm:p-5 lg:p-5 xl:p-6",
                  func.className,
                ].join(" ")}
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#c8d2df] via-[#94a3b8] to-[#c8d2df] opacity-85" />

                <div className="mb-4 flex items-center gap-3 xl:mb-5">
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-900 shadow-sm sm:h-11 sm:w-11 sm:text-[15px] xl:h-12 xl:w-12 xl:text-base">
                    {String(func.number).padStart(2, "0")}
                  </div>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                <p className="text-[15px] font-medium leading-7 text-slate-800 sm:text-base sm:leading-7 lg:text-[17px] lg:leading-8 xl:text-[18px] xl:leading-9">
                  {func.text.trim()}
                </p>
              </article>
            ))}
          </div>
        </HomeSectionShell>
      </div>
    </section>
  );
});

AboutSectionsFunctions.displayName = "AboutSectionsFunctions";
