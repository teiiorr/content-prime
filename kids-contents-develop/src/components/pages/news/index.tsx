import { lazy, memo, Suspense } from "react";
import { NewsSectionsHero } from "./sections/hero";
import { ParallaxSection } from "@/components/motion/ParallaxSection";

// const NewsSectionsInternational = lazy(() =>
//   import("./sections/international").then((module) => ({
//     default: module.NewsSectionsInternational,
//   }))
// );

const NewsSectionsGallery = lazy(() =>
  import("./sections/gallery").then((module) => ({
    default: module.NewsSectionsGallery,
  }))
);

const NewsSectionsVideoteka = lazy(() =>
  import("./sections/videoteka").then((module) => ({
    default: module.NewsSectionsVideoteka,
  }))
);

const SectionLoader = () => (
  <div className="w-full py-20 flex justify-center items-center">
    <div className="animate-pulse h-8 w-8 rounded-full bg-white/20"></div>
  </div>
);

export const NewsPage = memo(function NewsPage() {
  return (
    <div className="relative isolate min-h-screen bg-background">
      <NewsSectionsHero />

      {/* <Suspense fallback={<SectionLoader />}>
        <NewsSectionsInternational />
      </Suspense> */}

      <ParallaxSection tone="amber" intensity={1.05} accentSide="left">
        <Suspense fallback={<SectionLoader />}>
          <NewsSectionsGallery />
        </Suspense>
      </ParallaxSection>

      <ParallaxSection tone="slate" intensity={1.05} accentSide="right">
        <Suspense fallback={<SectionLoader />}>
          <NewsSectionsVideoteka />
        </Suspense>
      </ParallaxSection>
    </div>
  );
});
