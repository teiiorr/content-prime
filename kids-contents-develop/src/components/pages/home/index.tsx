import { lazy, memo, Suspense } from "react";
import { HomeSectionsHero } from "./sections/hero";

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
    <div className="min-h-screen bg-background">
      <HomeSectionsHero />

      <Suspense fallback={<SectionLoader />}>
        <HomeSectionsAbout />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <HomeSectionsNews />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <HomeSectionsAnnouncements />
      </Suspense>

      {/* <Suspense fallback={<SectionLoader />}>
        <HomeSectionsHaveAnIdea />
      </Suspense> */}

      <Suspense fallback={<SectionLoader />}>
        <HomeSectionsContests />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <HomeSectionsPartners />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <HomeSectionsContact />
      </Suspense>
    </div>
  );
});
