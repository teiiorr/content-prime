import { memo } from "react";
import { StudiosSectionsHero } from "./sections/hero";

// const StudiosSectionsCTA = lazy(() =>
//   import("./sections/cta").then((module) => ({
//     default: module.StudiosSectionsCTA,
//   }))
// );

// const SectionLoader = () => (
//   <div className="w-full py-20 flex justify-center items-center">
//     <div className="animate-pulse h-8 w-8 rounded-full bg-white/20"></div>
//   </div>
// );

export const StudiosPage = memo(function StudiosPage() {
  return (
    <div className="min-h-screen bg-background">
      <StudiosSectionsHero />

      {/* <Suspense fallback={<SectionLoader />}>
        <StudiosSectionsCTA />
      </Suspense> */}
    </div>
  );
});
