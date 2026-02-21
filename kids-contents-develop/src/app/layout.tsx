import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Montserrat } from "next/font/google";

import "@/styles/globals.scss";
import { MainLayout } from "@/components/layouts";
import { SplashScreenGate } from "@/components/general";
import { ThemeProvider } from "@/providers";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-main",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bolalar kontentini rivojlantirish markazi",
  description:
    "Bolalar uchun mo‘ljallangan milliy kontentlar va ijodiy loyihalarni qo‘llab-quvvatlash platformasi.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uz">
      <body className={`${montserrat.variable} font-sans`}>
        <ThemeProvider>
          <SplashScreenGate>
            <MainLayout>{children}</MainLayout>
          </SplashScreenGate>
        </ThemeProvider>
      </body>
    </html>
  );
}