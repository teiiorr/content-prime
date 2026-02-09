import { notFound } from "next/navigation";
import { AnalyticsSlugPage } from "@/components";
import { fetchAnalytics, fetchAnalyticsBySlug } from "@/lib";

export type SlugProps = {
  params: { slug: string };
};

// Revalidate every 60 seconds
export const revalidate = 60;

export async function generateStaticParams() {
  const analytics = await fetchAnalytics();
  return analytics.map((analyticsItem) => ({
    slug: analyticsItem.slug,
  }));
}

export async function generateMetadata({ params: { slug } }: SlugProps) {
  const analyticsItem = await fetchAnalyticsBySlug(slug);

  if (!analyticsItem) {
    return {
      title: "Tahlil topilmadi",
      description: "So'ralgan tahlil mavjud emas",
    };
  }

  return {
    title: analyticsItem.title,
    description: analyticsItem.description,
    openGraph: {
      title: analyticsItem.title,
      description: analyticsItem.description,
      images: [analyticsItem.image_src],
    },
    twitter: {
      card: "summary_large_image",
      title: analyticsItem.title,
      description: analyticsItem.description,
      images: [analyticsItem.image_src],
    },
  };
}

export default async function Page({ params: { slug } }: SlugProps) {
  const analyticsItem = await fetchAnalyticsBySlug(slug);

  if (!analyticsItem) {
    notFound();
  }

  return <AnalyticsSlugPage analyticsItem={analyticsItem} />;
}
