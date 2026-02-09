import Link from "next/link";
import { memo } from "react";

export const StudiosSectionsCTA = memo(function StudiosSectionsCTA() {
  return (
    <section id="center-functions" className="py-16 md:py-24 lg:py-32 bg-white">
      <div className="container relative z-10 mx-auto">
        <div className="py-14 md:py-20 px-12 rounded-[48px] md:min-h-96 flex flex-col justify-center items-center gap-6 md:gap-10 bg-blue-600 text-white">
          <h2 className="font-black text-2xl md:text-3xl lg:text-4xl max-w-5xl text-center">
            Siz studiyalarga qo'shilishingiz va ular bilan bog'lanishingiz
            mumkin
          </h2>
          <Link
            href="https://t.me/Shavkat_Dustmukhammad"
            className="border border-[#D5D7DA] bg-white text-black py-4 px-8 rounded-xl text-xl font-semibold hover:bg-gray-100 transition-colors duration-200 active:bg-gray-200"
          >
            Studiyaga qo'shilish
          </Link>
        </div>
      </div>
    </section>
  );
});

StudiosSectionsCTA.displayName = "StudiosSectionsCTA";
