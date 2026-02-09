import { memo } from "react";
import Link from "next/link";
import { Breadcrumb } from "antd";

import { Contest } from "@/types";
import { ROUTES } from "@/constants";

interface ContestSlugSectionsHeroProps {
  contest: Contest;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Faol":
      return "border-blue-200 bg-blue-50 text-blue-700";
    case "Tez kunda":
      return "border-warning-200 bg-warning-50 text-warning-700";
    case "Yakunlangan":
      return "border-red-200 bg-red-50 text-red-700";
    default:
      return "border-gray-200 bg-gray-50 text-gray-700";
  }
};

export const ContestSlugSectionsHero = memo(function ContestSlugSectionsHero({
  contest,
}: ContestSlugSectionsHeroProps) {
  return (
    <section id="analytics-hero" className="overflow-hidden relative z-10">
      <div className="container py-10 lg:py-16">
        <div className="mb-8 lg:mb-14">
          <Breadcrumb
            items={[
              {
                title: (
                  <Link
                    href={ROUTES.HOME}
                    className="text-gray-600 font-semibold text-sm px-2"
                  >
                    Asosiy
                  </Link>
                ),
              },
              {
                title: (
                  <Link
                    href={ROUTES.CREATIVE_CONTESTS}
                    className="text-gray-600 font-semibold text-sm px-2"
                  >
                    Tanlov
                  </Link>
                ),
              },
              {
                title: (
                  <Link
                    href={`${ROUTES.CREATIVE_CONTESTS}/${contest.slug}`}
                    className="text-orange-400 font-semibold text-sm px-2"
                  >
                    {contest.title}
                  </Link>
                ),
              },
            ]}
            className="mb-8 md:mb-10 lg:mb-12"
          />
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight mb-4 lg:mb-6">
            {contest.title}
          </h1>

          <div
            className={`h-6 border font-bold text-sm rounded-2xl py-px px-2.5 inline-block ${getStatusColor(
              contest.status
            )}`}
          >
            {contest.status}
          </div>
        </div>

        <div className="rounded-3xl z-10 sm:rounded-[30px] lg:rounded-[36px] w-full aspect-video border-4 sm:border-6 lg:border-[8px] border-blue-600 text-blue-600 overflow-hidden relative flex items-center justify-center shadow-2xl mb-10">
          {contest?.video_src ? (
            <video
              src={contest.video_src}
              controls
              preload="metadata"
              className="w-full h-full absolute inset-0 object-cover"
              poster={contest.image_src}
            />
          ) : (
            <img
              src={contest.image_src}
              width="1200"
              height="675"
              alt={contest.title}
              loading="lazy"
              className="w-full h-full absolute inset-0 object-cover"
            />
          )}
        </div>
      </div>
    </section>
  );
});

ContestSlugSectionsHero.displayName = "ContestSlugSectionsHero";
