export const PROJECTS_WITH_CONTENT = [
  {
    id: 1,
    slug: "polapon-loyihasi",
    title: "“Polapon” loyihasi",
    status: "Faol",
    src: "/images/projects/polapon.avif",
    srcSet: "/images/projects/polapon@2x.avif 2x",
    description:
      "\"Polapon\" yo'lga chiqdi. U kattalardan bolalar haqida, bolalardan kattalar haqida so'raydi. Polapon bola qalbidagi quvonch va qiziqishni ota-ona ko'nglidagi mehr va g'amxo'rlik bilan uyg'unlashtiradigan milliy qahramondir.",
    content: {
      videoSrc: "/videos/polapon.mp4",
      posterSrc: "/images/projects/polapon@2x.avif",
      currentStep: 9,
      sections: [
        "\"Polapon\" yo'lga chiqdi. U kattalardan bolalar haqida, bolalardan kattalar haqida so'raydi. Polapon bola qalbidagi quvonch va qiziqishni ota-ona ko'nglidagi mehr va g'amxo'rlik bilan uyg'unlashtiradigan milliy qahramondir.",
        "<strong>Loyiha maqsadi</strong> mehr, ishonch va birdamlikka asoslangan sog'lom jamiyat uchun avlodlar o'rtasida samarali muloqot muhitini shakllantirishdan iborat.",
      ],
      socialLinks: [
        {
          platform: "Instagram",
          url: "https://www.instagram.com/polapon_tv?igsh=MXd5cTFyNXdqdzR2eQ==",
          icon: "instagram",
        },
        {
          platform: "YouTube",
          url: "https://youtube.com/@polapontv?si=Ow_M7x7QTNz2i9UE",
          icon: "youtube",
        },
      ],
    },
  },
  {
    id: 2,
    slug: "bolakay-loyihasi",
    title: "“Bolakay” loyihasi",
    status: "Faol",
    src: "/images/projects/bolakay.avif",
    srcSet: "/images/projects/bolakay@2x.avif 2x",
    description:
      'Diqqat, mikrofon bolalarda! Kattalarda "Bolalar bizni eshitishi kerak" degan stereotip bor. Aslida bugungi zamon biz bolalarni ko\'proq eshitishimiz kerakligini taqozo etyapti.',
    content: {
      currentStep: 9,
      videoSrc: "/videos/bolakay.mp4",
      posterSrc: "/images/projects/bolakay@2x.avif",
      sections: [
        "Diqqat, mikrofon bolalarda!",
        'Kattalarda <strong>"Bolalar bizni eshitishi kerak"</strong> degan stereotip bor. Aslida bugungi zamon biz bolalarni ko\'proq eshitishimiz kerakligini taqozo etyapti.',
      ],
      socialLinks: [
        {
          platform: "Instagram",
          url: "https://www.instagram.com/bolakay_loyihasi?igsh=MXg3bmZraWhnZTdpbQ==",
          icon: "instagram",
        },
        {
          platform: "Telegram",
          url: "https://t.me/bolakay_loyihasi",
          icon: "telegram",
        },
        {
          platform: "YouTube",
          url: "https://youtube.com/@bolakay_loyihasi?si=cFnCQs68jyXAu5WX",
          icon: "youtube",
        },
      ],
    },
  },
];

export const PROJECTS = PROJECTS_WITH_CONTENT.map(
  ({ content, ...project }) => project
);
