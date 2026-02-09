import { notFound } from "next/navigation";
import { NewsSlugPage } from "@/components";
import { fetchNews, fetchNewsBySlug } from "@/lib";

export type SlugProps = {
  params: { slug: string };
};

// Revalidate every 60 seconds
export const revalidate = 60;

export async function generateStaticParams() {
  const news = await fetchNews();
  return news.map((newsItem) => ({
    slug: newsItem.slug,
  }));
}

export async function generateMetadata({ params: { slug } }: SlugProps) {
  const newsItem = await fetchNewsBySlug(slug);

  if (!newsItem) {
    return {
      title: "Yangilik topilmadi",
      description: "So'ralgan yangilik mavjud emas",
    };
  }

  return {
    title: newsItem.title,
    description: newsItem.description,
    openGraph: {
      title: newsItem.title,
      description: newsItem.description,
      images: [newsItem.image_src],
    },
    twitter: {
      card: "summary_large_image",
      title: newsItem.title,
      description: newsItem.description,
      images: [newsItem.image_src],
    },
  };
}

export default async function Page({ params: { slug } }: SlugProps) {
  const newsItem = await fetchNewsBySlug(slug);

  if (!newsItem) {
    notFound();
  }

  return <NewsSlugPage newsItem={newsItem} />;
}
