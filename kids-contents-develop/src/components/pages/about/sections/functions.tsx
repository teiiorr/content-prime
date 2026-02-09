import { memo } from "react";

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
      className="relative py-10 md:py-16 lg:py-24 mt-12 md:mt-16 lg:mt-20"
    >
      <div className="container">
        {/* Header */}
        <div className="md:text-center mb-8 md:mb-12 lg:mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold text-base-black">
            Faoliyat
          </h2>
        </div>

        {/* Functions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {functions.map((func, index) => (
            <div
              key={func.number}
              className={`relative group border border-orange-400 bg-orange-50 p-5 rounded-3xl ${func.className}`}
            >
              <div className="relative mb-5">
                <div className="relative w-14 h-14">
                  <div className="absolute inset-0 bg-golden-gradient rounded-full"></div>
                  <div className="absolute inset-0.5 bg-orange-50 rounded-full flex items-center justify-center">
                    <div className="w-9 h-9 bg-orange-400 rounded-full flex items-center justify-center relative z-[2]">
                      <span className="text-white font-bold text-2xl relative z-[3]">
                        {func.number}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-base-black leading-relaxed text-base">
                {func.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

AboutSectionsFunctions.displayName = "AboutSectionsFunctions";
