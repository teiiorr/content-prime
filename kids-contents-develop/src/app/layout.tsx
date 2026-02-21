import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/styles/globals.scss";
import { MainLayout } from "@/components/layouts";
import { SplashScreenGate } from "@/components/general";

export const metadata: Metadata = {
  title: "Bolalar kontentini rivojlantirish markazi",
  description:
    "Bolalar uchun mo‘ljallangan milliy kontentlar va ijodiy loyihalarni qo‘llab-quvvatlash platformasi.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uz">
      <body>
        <SplashScreenGate>
          <MainLayout>{children}</MainLayout>
        </SplashScreenGate>
      </body>
    </html>
  );
}