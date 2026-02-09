import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import "@/styles/globals.scss";
import { MainLayout } from "@/components";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bolalar kontentini rivojlantirish markazi",
  description:
    "Bolalar kontentini rivojlantirish markazi — bu bolalar uchun rivojlanish, ta'lim va ko‘ngilochar kontentni yaratish va qo‘llab-quvvatlashga qaratilgan davlat tashabbusi.",
  keywords: [
    "bolalar kontenti",
    "ta'lim",
    "o'yinlar",
    "multfilm",
    "rivojlanish",
    "uzbekcha bolalar",
    "bolalar uchun sayt",
    "uzbek kontent",
  ],
  authors: [
    {
      name: "Bolalar Kontentini Rivojlantirish Markaz",
      url: process.env.NEXTAPP_URL || "https://bolakontent.uz",
    },
  ],
  creator: "Bolalar Kontentini Rivojlantirish Markaz",
  publisher: "Bolalar Kontentini Rivojlantirish Markaz",
  metadataBase: new URL(process.env.NEXTAPP_URL || "https://bolakontent.uz"),
  openGraph: {
    title: "Bolalar kontentini rivojlantirish markazi",
    description:
      "Davlat tashabbusi asosida yaratilgan platforma: ta'limiy va ko‘ngilochar bolalar kontenti markazi.",
    url: process.env.NEXTAPP_URL || "https://bolakontent.uz",
    siteName: "Bolalar Kontentini Rivojlantirish Markaz",
    locale: "uz_UZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bolalar kontentini rivojlantirish markazi",
    description:
      "Bolalar uchun ta'limiy va ko‘ngilochar kontentlarni qo‘llab-quvvatlashga qaratilgan markaz.",
    creator: "@bkrmarkazi",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body className={`${montserrat.className} antialiased`}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
