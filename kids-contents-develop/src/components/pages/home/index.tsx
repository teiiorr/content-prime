import { lazy, memo, Suspense } from "react";
import { HomeSectionsHero } from "./sections/hero";
import { ParallaxSection } from "@/components/motion/ParallaxSection";

const HomeSectionsAbout = lazy(() =>
  import("./sections/about").then((module) => ({
    default: module.HomeSectionsAbout,
  }))
);

const HomeSectionsNews = lazy(() =>
  import("./sections/news-new").then((module) => ({
    default: module.HomeSectionsNews,
  }))
);

const HomeSectionsAnnouncements = lazy(() =>
  import("./sections/announcements").then((module) => ({
    default: module.HomeSectionsAnnouncements,
  }))
);

const HomeSectionsLab = lazy(() =>
  import("./sections/lab").then((module) => ({
    default: module.HomeSectionsLab,
  }))
);

// const HomeSectionsHaveAnIdea = lazy(() =>
//   import("./sections/have-an-idea").then((module) => ({
//     default: module.HomeSectionsHaveAnIdea,
//   }))
// );

const HomeSectionsContests = lazy(() =>
  import("./sections/contests").then((module) => ({
    default: module.HomeSectionsContests,
  }))
);

const HomeSectionsPartners = lazy(() =>
  import("./sections/partners").then((module) => ({
    default: module.HomeSectionsPartners,
  }))
);

const HomeSectionsContact = lazy(() =>
  import("./sections/contact").then((module) => ({
    default: module.HomeSectionsContact,
  }))
);

const SectionLoader = () => (
  <div className="w-full py-20 flex justify-center items-center">
    <div className="animate-pulse h-8 w-8 rounded-full bg-white/20"></div>
  </div>
);

export const HomePage = memo(function HomePage() {
  return (
    <div className="motion-home min-h-screen bg-background">
      <HomeSectionsHero />

      <ParallaxSection tone="slate" intensity={1.05} accentSide="left" contentParallax={false}>
        <Suspense fallback={<SectionLoader />}>
          <HomeSectionsAbout />
        </Suspense>
      </ParallaxSection>

      <ParallaxSection tone="sky" intensity={1.1} accentSide="right">
        <Suspense fallback={<SectionLoader />}>
          <HomeSectionsNews />
        </Suspense>
      </ParallaxSection>

      <ParallaxSection tone="amber" intensity={1.05} accentSide="left">
        <Suspense fallback={<SectionLoader />}>
          <HomeSectionsAnnouncements />
        </Suspense>
      </ParallaxSection>

      <ParallaxSection tone="emerald" intensity={1.08} accentSide="right">
        <Suspense fallback={<SectionLoader />}>
          <HomeSectionsLab />
        </Suspense>
      </ParallaxSection>

      {/* <Suspense fallback={<SectionLoader />}>
        <HomeSectionsHaveAnIdea />
      </Suspense> */}

      <ParallaxSection tone="emerald" intensity={1.2} accentSide="left">
        <Suspense fallback={<SectionLoader />}>
          <HomeSectionsContests />
        </Suspense>
      </ParallaxSection>

      <ParallaxSection tone="sky" intensity={1.05} accentSide="left">
        <Suspense fallback={<SectionLoader />}>
          <HomeSectionsPartners />
        </Suspense>
      </ParallaxSection>

      <ParallaxSection tone="slate" intensity={0.95} accentSide="right">
        <Suspense fallback={<SectionLoader />}>
          <HomeSectionsContact />
        </Suspense>
      </ParallaxSection>
    </div>
  );
});
