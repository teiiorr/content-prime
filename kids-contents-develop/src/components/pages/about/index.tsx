import { lazy, memo, Suspense } from "react";
import { AboutSectionsHero } from "./sections/hero";

const AboutSectionsTeam = lazy(() =>
  import("./sections/team").then((module) => ({
    default: module.AboutSectionsTeam,
  }))
);

const AboutSectionsInternationalPartnership = lazy(() =>
  import("./sections/international-parnership").then((module) => ({
    default: module.AboutSectionsInternationalPartnership,
  }))
);

const AboutSectionsFunctions = lazy(() =>
  import("./sections/functions").then((module) => ({
    default: module.AboutSectionsFunctions,
  }))
);

const SectionLoader = () => (
  <div className="w-full py-20 flex justify-center items-center">
    <div className="animate-pulse h-8 w-8 rounded-full bg-white/20"></div>
  </div>
);

export const AboutPage = memo(function AboutPage() {
  return (
    <div className="relative isolate min-h-screen bg-background">
      <AboutSectionsHero />

      <Suspense fallback={<SectionLoader />}>
        <AboutSectionsTeam />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <AboutSectionsInternationalPartnership />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <AboutSectionsFunctions />
      </Suspense>
    </div>
  );
});
