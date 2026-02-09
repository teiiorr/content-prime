import { notFound } from "next/navigation";
import { ContestSlugPage } from "@/components";
import { fetchContests, fetchContestBySlug } from "@/lib";

export type SlugProps = {
  params: { slug: string };
};

// Revalidate every 60 seconds
export const revalidate = 60;

export async function generateStaticParams() {
  const contests = await fetchContests();
  return contests.map((contest) => ({
    slug: contest.slug,
  }));
}

export async function generateMetadata({ params: { slug } }: SlugProps) {
  const contestItem = await fetchContestBySlug(slug);

  if (!contestItem) {
    return {
      title: "Tanlov topilmadi",
      description: "So'ralgan tanlov mavjud emas",
    };
  }

  return {
    title: contestItem.title,
    description: contestItem.description,
    openGraph: {
      title: contestItem.title,
      description: contestItem.description,
      images: [contestItem.image_src],
    },
    twitter: {
      card: "summary_large_image",
      title: contestItem.title,
      description: contestItem.description,
      images: [contestItem.image_src],
    },
  };
}

export default async function Page({ params: { slug } }: SlugProps) {
  const contestItem = await fetchContestBySlug(slug);

  if (!contestItem) {
    notFound();
  }

  return <ContestSlugPage contest={contestItem} />;
}
