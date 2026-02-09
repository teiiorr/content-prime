"use client";
import { memo, useState } from "react";

const data = {
  "2024": {
    title: "So'nggi natijalar (2025-yil iyun–iyul oylari):",
    items: [
      {
        text: "Turkiyaning sohadagi yetakchi tashkilotlari va mutaxassislari bilan aloqa o'rnatildi (TRT Çocuk, YKY, Varalbey, Okyanbey va boshqalar)",
      },
      {
        text: "UNESCO va UNICEFning O'zbekistondagi vakolatxonalari bilan hamkorlik o'rnatildi",
      },
      {
        text: "AQShlik prodyuser, ikki karra Emmy mukofoti sovrindori Robert Mora bilan hamkorlik memorandumi imzolandi",
      },
      {
        text: "MIPCOM va MIPJUNIOR (Kann, 2025-yil oktyabr) festivallarida ishtirok etish bo'yicha kelishuvga erishildi",
      },
      {
        text: "Yandex kompaniyasi bilan milliy kontentni Yandex platformalarida targ'ib qilish bo'yicha hamkorlik yo'lga qo'yildi",
      },
      {
        text: `"El-yurt umidi" jamg'armasi bilan har yili 5 nafar mutaxassisni xorijiy universitetlarda tayyorlash bo'yicha rejalar kelishildi`,
      },
    ],
    image: "/images/international/results-2025.avif",
    imageSrcSet: "/images/international/results-2025@2x.avif 1.5x",
    imageWidth: "621",
    imageHeight: "490",
    imageAlt: "Results image",
    imageMaxWidth: "max-w-[621px]",
  },
  "2025": {
    title: "2025-yil yakunigacha rejalashtirilgan ishlar:",
    items: [
      {
        text: "AQShga tashrif (avgust): yirik studiyalar, universitetlar va platformalar bilan uchrashuvlar õtkazish rejalashtirilgan",
      },
      {
        text: "YouTube Kids platformasini O'zbekistonda ishga tushirish va monetizatsiya mexanizmini yo'lga qo'yish bõyicha muzokaralarni boshlash;",
      },
      {
        text: "UNICEF va UNESCO bilan bolalar xavfsizligiga oid xalqaro tashabbuslarda ishtirok etish",
      },
      {
        text: "Elchixonalar, universitetlar va Markaziy Osiyodagi hamkorlar bilan aloqalarni kengaytirish",
      },
    ],
    image: "/images/international/plans-2025.avif",
    imageSrcSet: "/images/international/plans-2025@2x.avif 1.5x",
    imageWidth: "280",
    imageHeight: "371",
    imageAlt: "Plans image",
    imageMaxWidth: "max-w-[280px]",
  },
  "2026": {
    title: "2026-yil uchun asosiy rejalar:",
    items: [
      {
        text: "1-iyun – Toshkentda Xalqaro bolalar kontenti festivalini tashkil etish",
      },
      {
        text: "Xalqaro yozgi media-lagerning ilk bosqichini amalga oshirish",
      },
      {
        text: "MIPCOM va MIPJUNIOR 2026 xalqaro festivalida milliy loyihalar bilan ishtirok etish",
      },
      {
        text: "Milliy kontent sifati va xavfsizligi bo'yicha milliy standartlarni ishlab chiqish",
      },
      {
        text: "O'zbekistonda ishlab chiqarilgan bolalar kontentini YouTube Kids, Netflix, Amazon Prime kabi global strimimg platformalarga chiqarish",
      },
    ],
    image: "/images/international/plans-2026.avif",
    imageSrcSet: "/images/international/plans-2026@2x.avif 1.5x",
    imageWidth: "621",
    imageHeight: "277",
    imageAlt: "Plans image",
    imageMaxWidth: "max-w-[621px]",
  },
};

export const AboutSectionsInternational = memo(
  function AboutSectionsInternational() {
    const [activeYear, setActiveYear] = useState<keyof typeof data>("2024");
    const currentData = data[activeYear];

    return (
      <section
        id="international-cooperation"
        className="relative py-16 lg:py-24 bg-blue-200"
      >
        <div className="container relative z-10 mx-auto">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16 flex flex-col items-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-base-black mb-6">
              Xalqaro hamkorlik
            </h2>
            <div className="flex h-11 border border-gray-200 rounded-lg bg-white">
              {Object.keys(data).map((year) => (
                <button
                  key={year}
                  onClick={() => setActiveYear(year as keyof typeof data)}
                  className={`flex-1 min-w-28 border rounded-lg flex items-center justify-center font-semibold transition-colors ${
                    activeYear === year
                      ? "border-gray-300 bg-blue-600 text-white"
                      : "border-transparent bg-transparent text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          <div className="grid bg-white grid-cols-1 lg:grid-cols-2 rounded-3xl">
            {/* Content */}
            <div className="p-8 md:p-10 lg:p-12 xl:p-16 border-r-[0.5px] border-r-gray-200 lg:border-r-gray-200 border-b lg:border-b-0 border-b-[#B2C30033]">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-10">
                {currentData.title}
              </h3>
              <div className="space-y-4">
                {currentData.items.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-7 h-7 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="28" height="28" rx="14" fill="#FFA516" />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M19.9457 8.62169L11.5923 16.6834L9.37568 14.315C8.96734 13.93 8.32568 13.9067 7.85901 14.2334C7.40401 14.5717 7.27568 15.1667 7.55568 15.645L10.1807 19.915C10.4373 20.3117 10.8807 20.5567 11.3823 20.5567C11.8607 20.5567 12.3157 20.3117 12.5723 19.915C12.9923 19.3667 21.0073 9.81169 21.0073 9.81169C22.0573 8.73836 20.7857 7.79336 19.9457 8.61002V8.62169Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <p className="text-base-black leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="p-8 md:p-10 lg:p-12 xl:p-16 border-l-[0.5px] border-l-grborder-r-gray-200 lg:border-l-grborder-r-gray-200 flex items-center justify-center">
              <img
                src={currentData.image}
                srcSet={currentData.imageSrcSet}
                width={currentData.imageWidth}
                height={currentData.imageHeight}
                alt={currentData.imageAlt}
                loading="lazy"
                className={`w-full ${currentData.imageMaxWidth}`}
              />
            </div>
          </div>
        </div>

        <svg
          width="160"
          height="819"
          viewBox="0 0 160 819"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="-top-3/4 right-0 absolute hidden lg:block"
        >
          <g clipPath="url(#clip0_656_1262)">
            <path
              d="M546.533 699.42L433.691 444.031L225.842 -26.3768C124.474 -1.04581 24.9732 172.186 106.88 307.805C203.666 468.06 -115.822 498.621 51.7336 739.666C140.042 866.707 380.121 776.324 546.533 699.42Z"
              fill="#ACBF01"
            />
            <path
              d="M560.533 715.42L447.691 460.031L239.842 -10.3768C138.474 14.9542 38.9732 188.186 120.88 323.805C217.666 484.06 -101.822 514.621 65.7336 755.666C154.042 882.707 394.121 792.324 560.533 715.42Z"
              fill="#01A3D4"
            />
          </g>
          <defs>
            <clipPath id="clip0_656_1262">
              <rect width="160" height="819" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <svg
          width="296"
          height="223"
          viewBox="0 0 296 223"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="top-20 right-0 absolute hidden lg:block"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M187.301 17.7519C167.405 24.2541 149.086 36.5235 137.661 53.9696C134.086 59.4275 130.95 67.4739 128.661 76.0397C126.38 84.5729 125.02 93.3187 124.845 100.036C124.83 100.593 124.823 101.154 124.822 101.717C136.993 98.7034 149.814 98.5193 163.581 102.341C170.461 104.251 177.277 108.972 181.736 115.008C186.212 121.068 188.619 128.937 185.531 136.801C180.608 149.338 167.249 153.786 155.985 153.542C141.717 153.234 131.899 145.312 125.883 134.802C121.796 127.661 119.402 119.257 118.402 110.964C108.253 114.66 98.3898 120.432 88.5253 127.585C57.3558 150.185 28.0251 188.313 6.62711 220.555C5.5627 222.159 3.39934 222.595 1.79512 221.53C0.190907 220.465 -0.246685 218.302 0.817734 216.698C22.3036 184.324 52.2002 145.31 84.4315 121.94C95.1969 114.134 106.254 107.712 117.876 103.76C117.841 102.441 117.842 101.137 117.875 99.8511C118.068 92.4712 119.537 83.173 121.926 74.2373C124.305 65.3343 127.677 56.487 131.828 50.1487C144.293 31.1133 164.063 18.0107 185.133 11.1249C208.177 3.59405 242.488 0.931462 266.571 6.01127C277.053 8.22219 287.557 12.4777 295.979 18.9568C297.026 17.1429 298.082 15.3424 299.136 13.5464C301.311 9.83972 303.475 6.15203 305.516 2.40435C306.437 0.713922 308.554 0.0904885 310.245 1.01186C311.936 1.93326 312.56 4.05056 311.639 5.74098C309.368 9.91028 307.063 13.8379 304.812 17.6741C303.63 19.6899 302.462 21.6803 301.321 23.6674C309.084 31.5474 313.994 41.9235 313.474 54.7477C313.061 64.9546 309.57 73.3452 300.583 79.7223C297.903 81.6272 294.363 83.4332 290.693 83.4277C288.774 83.4248 286.816 82.9222 285.044 81.6912C283.292 80.4738 281.935 78.6933 280.942 76.47C278.618 71.2689 278.788 65.2273 279.664 59.8836C280.544 54.5168 282.233 49.325 283.456 45.5675L283.483 45.4858C285.865 38.1685 289.051 31.4979 292.524 25.1064C285.013 19.075 275.221 14.9604 265.135 12.833C242.37 8.03125 209.305 10.5612 187.301 17.7519ZM297.768 30.0654C294.811 35.6185 292.17 41.3241 290.113 47.6456C288.868 51.4685 287.331 56.2104 286.544 61.0138C285.746 65.8793 285.814 70.286 287.307 73.6279C287.904 74.964 288.534 75.6279 289.021 75.9661C289.488 76.2908 290.021 76.4548 290.701 76.4559C292.229 76.4581 294.317 75.6206 296.542 74.0392C303.096 69.3809 306.167 62.8731 306.508 54.4631C306.908 44.6023 303.509 36.5171 297.768 30.0654ZM125.178 108.826C125.985 116.775 128.177 124.776 131.934 131.341C137.022 140.231 144.841 146.328 156.133 146.572C166.039 146.786 175.662 142.857 179.041 134.251C180.985 129.302 179.677 123.952 176.129 119.149C172.563 114.322 167.045 110.537 161.718 109.059C148.82 105.478 136.778 105.734 125.178 108.826Z"
            fill="#FFC24A"
          />
        </svg>

        <svg
          width="180"
          height="564"
          viewBox="0 0 180 564"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-14 -left-16 hidden lg:block z-[1]"
        >
          <g clipPath="url(#clip0_654_1259)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M126.607 152.229C127.73 142.452 130.068 135.326 132.88 128.355C139.057 110.743 158.057 89.8437 160.028 72.2834C161.695 57.2544 159.587 52.9005 151.192 43.0744C141.077 30.9798 114.14 19.0925 99.8294 15.493C77.8588 10.4757 72.0736 10.8513 47.5852 14.9219C28.3443 18.5878 -1.33049 22.6201 -15.6442 5.2962C-23.5603 -3.42536 -25.3672 -10.943 -29.6962 -23.4134C-31.2085 -28.8137 -32.5359 -35.2268 -34.0772 -40.0893C-40.7893 -54.9199 -54.3424 -65.3221 -69.2766 -67.0212L-77.503 -67.9303C-93.5128 -69.6875 -113.686 -62.5385 -123.602 -53.162C-129.364 -48.043 -134.479 -39.7648 -138.639 -30.2262C-147.981 -6.68535 -154.018 33.4734 -139.979 52.7909C-123.558 74.4687 -100.037 79.7 -75.2626 82.3954C-60.8034 83.9387 -41.2294 77.2037 -27.8136 78.7836C-15.9483 80.1496 -5.18616 82.3115 2.8108 94.7009C26.3296 132.346 -7.24873 153.22 7.0692 184.585C7.90172 186.731 10.6698 190.228 12.0354 191.455C31.1734 212.424 65.3485 210.457 77.3553 234.686C96.9052 275.576 70.9657 339.579 44.2772 359.598C34.5748 367.424 29.1517 364.193 3.10618 386.423C-8.98849 396.537 -21.841 413.454 -29.9212 429.811C-35.9939 442.742 -40.3479 457.942 -39.9878 473.657C-39.965 478.4 -38.9708 487.883 -37.8435 492.146C-35.2987 501.842 -32.0021 510.017 -27.0649 517.425C-15.8814 534.858 -6.33393 547.462 10.5311 556.109C35.2895 568.734 60.2731 555.838 73.2697 522.824C77.7628 510.217 81.3653 496.538 85.8905 484.025C89.8168 471.926 94.7606 460.961 102.404 452.354C107.842 445.656 120.061 434.972 126.509 427.825L135.26 419.372C142.816 412.378 149.064 403.083 155.758 394.481C166.221 380.484 174.279 359.385 176.427 339.23C178.731 318.601 175.693 298.408 172.646 282.864C169.784 266.308 164.651 251.153 158.292 237.365C157.968 235.785 157.045 234.619 156.152 232.916C155.319 230.77 154.934 229.633 154.073 228.024L138.913 199.162C132.242 186.324 124.517 171.308 126.607 152.229Z"
              fill="#F59E00"
            />
          </g>
          <defs>
            <clipPath id="clip0_654_1259">
              <rect width="180" height="564" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <svg
          width="217"
          height="125"
          viewBox="0 0 217 125"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="bottom-1/4 right-0 absolute hidden lg:block"
        >
          <path
            d="M8.271 19.939C14.421 21.7814 20.581 23.6238 26.731 25.4662C27.601 25.7265 27.231 27.0983 26.351 26.8279C20.201 24.9855 14.041 23.1431 7.891 21.3007C7.031 21.0504 7.401 19.6786 8.271 19.939Z"
            fill="#D4D4D4"
          />
          <path
            d="M26.9057 25.3127C41.5157 20.3462 56.1357 15.3797 70.7457 10.4132C71.5257 10.1528 71.9557 11.2943 71.2857 11.7049C59.6057 18.8342 47.9357 25.9735 36.2557 33.1029C35.4757 33.5835 34.7658 32.3519 35.5458 31.8813C47.2258 24.7519 58.8957 17.6126 70.5757 10.4833C70.7557 10.9138 70.9357 11.3444 71.1157 11.775C56.5057 16.7415 41.8857 21.708 27.2757 26.6745C26.4157 26.9749 26.0457 25.6031 26.9057 25.3127Z"
            fill="#D4D4D4"
          />
          <path
            d="M7.40701 17.9802C33.187 12.6433 59.067 7.79693 85.027 3.44124C85.917 3.29104 86.297 4.65281 85.407 4.803C59.447 9.1587 33.567 14.0051 7.78702 19.342C6.88702 19.5223 6.50701 18.1605 7.40701 17.9802Z"
            fill="#D4D4D4"
          />
          <path
            d="M35.8112 32.4081C42.9412 32.8687 50.0512 33.5596 57.1412 34.4808C58.0312 34.601 58.0412 36.0128 57.1412 35.8927C50.0512 34.9715 42.9512 34.2806 35.8112 33.82C34.9112 33.7599 34.9012 32.348 35.8112 32.4081Z"
            fill="#D4D4D4"
          />
          <path
            d="M87.2837 4.91613C77.1637 16.321 66.4538 27.1452 55.1438 37.3786C54.4738 37.9894 53.4638 36.9881 54.1438 36.3773C65.4538 26.1539 76.1637 15.3297 86.2837 3.91482C86.8837 3.23393 87.8837 4.23524 87.2837 4.91613Z"
            fill="#D4D4D4"
          />
          <path
            d="M25.7656 27.3396C25.7456 33.9182 25.3756 40.4668 24.6256 47.0054C24.5256 47.8965 23.1056 47.9066 23.2156 47.0054C23.9556 40.4668 24.3357 33.9182 24.3557 27.3396C24.3557 26.4285 25.7656 26.4285 25.7656 27.3396Z"
            fill="#D4D4D4"
          />
          <path
            d="M35.6009 32.8464C32.1409 37.8029 28.691 42.7694 25.231 47.7259C24.711 48.4668 23.4909 47.7659 24.0109 47.0149C27.4709 42.0584 30.9209 37.0919 34.3809 32.1355C34.8909 31.3945 36.1209 32.0954 35.6009 32.8464Z"
            fill="#D4D4D4"
          />
          <path
            d="M24.543 46.8522C30.773 42.0259 37.183 37.46 43.783 33.1643C44.553 32.6637 45.2529 33.8953 44.4929 34.3859C37.9929 38.6215 31.673 43.1074 25.533 47.8536C24.823 48.4043 23.823 47.413 24.543 46.8522Z"
            fill="#D4D4D4"
          />
          <path
            d="M215.06 123.539C216.94 107.408 209.54 91.1464 198.15 79.5913C186.76 68.0361 171.75 60.6865 156.39 55.4998C150.83 53.6273 145.13 51.9751 140.07 48.9912C130.69 43.464 124.4 33.7914 120.41 23.6581C117.4 16.0081 116.75 5.08382 124.25 1.73944C129.49 -0.593608 135.94 2.89096 138.48 8.03769C141.01 13.1844 140.44 19.3425 138.87 24.8597C134.47 40.3299 122.84 53.0165 109.18 61.4676C95.5102 69.9186 79.8602 74.5747 64.2002 78.1794C53.6402 80.6126 42.8202 82.6252 32.0302 81.674C21.2402 80.7228 10.3602 76.4972 3.33018 68.2364C1.96018 66.6243 0.680175 64.6217 1.07018 62.539C1.38018 60.8568 2.69017 59.5751 3.94017 58.4136C8.47017 54.178 13.0102 49.9325 17.5402 45.697"
            stroke="#D4D4D4"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeDasharray="9.74 9.74"
          />
          <path
            d="M57.0774 15.5902C56.0174 17.6129 54.9673 19.6255 53.9073 21.6481C53.4873 22.4592 52.2673 21.7383 52.6873 20.9372C53.7473 18.9146 54.7974 16.9019 55.8574 14.8793C56.2774 14.0682 57.4974 14.7892 57.0774 15.5902Z"
            fill="#D4D4D4"
          />
          <path
            d="M51.7234 16.0705C50.2734 19.3949 48.8233 22.7092 47.3733 26.0336C47.0133 26.8647 45.7933 26.1437 46.1533 25.3227C47.6033 21.9983 49.0533 18.684 50.5033 15.3596C50.8633 14.5185 52.0834 15.2395 51.7234 16.0705Z"
            fill="#D4D4D4"
          />
          <path
            d="M43.4432 20.9078C42.0732 23.9017 40.7132 26.9057 39.3432 29.8996C38.9632 30.7307 37.7432 30.0097 38.1232 29.1886C39.4932 26.1947 40.8532 23.1908 42.2232 20.1969C42.6032 19.3658 43.8232 20.0867 43.4432 20.9078Z"
            fill="#D4D4D4"
          />
          <path
            d="M36.9912 23.4164C35.5012 27.9123 33.9012 32.3681 32.2012 36.7838C31.8812 37.6249 30.5112 37.2645 30.8412 36.4034C32.5412 31.9876 34.1412 27.5318 35.6312 23.0359C35.9112 22.1747 37.2812 22.5452 36.9912 23.4164Z"
            fill="#D4D4D4"
          />
          <path
            d="M31.7412 27.081C30.3612 31.2865 28.9912 35.4921 27.6112 39.6976C27.3312 40.5587 25.9612 40.1882 26.2512 39.3171C27.6312 35.1116 29.0012 30.9061 30.3812 26.7006C30.6612 25.8495 32.0312 26.2199 31.7412 27.081Z"
            fill="#D4D4D4"
          />
          <path
            d="M26.8502 27.5548C26.2202 29.7176 25.8101 31.9105 25.6401 34.1635C25.5701 35.0646 24.1602 35.0746 24.2302 34.1635C24.4102 31.7903 24.8301 29.4673 25.4901 27.1843C25.7401 26.3132 27.1102 26.6837 26.8502 27.5548Z"
            fill="#D4D4D4"
          />
        </svg>
      </section>
    );
  }
);

AboutSectionsInternational.displayName = "AboutSectionsInternational";
