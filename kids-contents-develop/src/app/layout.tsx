import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/styles/globals.scss";
import { MainLayout } from "@/components/layouts";

export const metadata: Metadata = {
  title: "Bolalar kontentini rivojlantirish markazi",
  description:
    "Bolalar uchun mo‘ljallangan milliy kontentlar va ijodiy loyihalarni qo‘llab-quvvatlash platformasi.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="uz">
      <body>
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
