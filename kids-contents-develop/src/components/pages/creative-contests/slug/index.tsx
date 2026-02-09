"use client";

import { lazy, memo, Suspense } from "react";

import { Contest } from "@/types";

import { ContestSlugSectionsHero } from "./sections/hero";

const ContestSlugSectionsContent = lazy(() =>
  import("./sections/content").then((module) => ({
    default: module.ContestSlugSectionsContent,
  }))
);

const SectionLoader = () => (
  <div className="w-full py-20 flex justify-center items-center">
    <div className="animate-pulse h-8 w-8 rounded-full bg-white/20"></div>
  </div>
);

export const ContestSlugPage = memo(function ContestSlugPage({
  contest,
}: {
  contest: Contest;
}) {

  return (
    <div className="min-h-screen bg-background">
      <img
        src="/images/bg.avif"
        srcSet="/images/bg@2x.avif 2x"
        width="1920"
        height="663"
        alt="Hero background image"
        loading="lazy"
        className="absolute top-0 left-0 right-0 object-cover object-center w-full h-auto z-0"
      />

      <ContestSlugSectionsHero contest={contest} />

      <Suspense fallback={<SectionLoader />}>
        <ContestSlugSectionsContent contest={contest} />
      </Suspense>
    </div>
  );
});
