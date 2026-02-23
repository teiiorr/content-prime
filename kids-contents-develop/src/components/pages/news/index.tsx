import { lazy, memo, Suspense } from "react";
import { NewsSectionsHero } from "./sections/hero";

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

      <Suspense fallback={<SectionLoader />}>
        <NewsSectionsGallery />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <NewsSectionsVideoteka />
      </Suspense>
    </div>
  );
});
