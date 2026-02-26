import { lazy, memo, Suspense } from "react";
import { AboutSectionsHero } from "./sections/hero";
import { ParallaxSection } from "@/components/motion/ParallaxSection";

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

      <ParallaxSection tone="slate" intensity={0.95} accentSide="left">
        <Suspense fallback={<SectionLoader />}>
          <AboutSectionsTeam />
        </Suspense>
      </ParallaxSection>

      <ParallaxSection tone="sky" intensity={1.05} accentSide="right">
        <Suspense fallback={<SectionLoader />}>
          <AboutSectionsInternationalPartnership />
        </Suspense>
      </ParallaxSection>

      <ParallaxSection tone="emerald" intensity={1} accentSide="left">
        <Suspense fallback={<SectionLoader />}>
          <AboutSectionsFunctions />
        </Suspense>
      </ParallaxSection>
    </div>
  );
});
