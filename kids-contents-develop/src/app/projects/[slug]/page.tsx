import { fetchProjects, fetchProjectBySlug } from "@/lib";
import { ProjectsSlugPage } from "@/components";

type PageProps = {
  params: {
    slug: string;
  };
};

// Revalidate every 60 seconds
export const revalidate = 60;

export async function generateStaticParams() {
  const projects = await fetchProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params: { slug } }: PageProps) {
  const projectItem = await fetchProjectBySlug(slug);

  if (!projectItem) {
    return {
      title: "Loyiha topilmadi",
      description: "So'ralgan loyiha mavjud emas",
    };
  }

  return {
    title: projectItem.title,
    description: projectItem.description,
    openGraph: {
      title: projectItem.title,
      description: projectItem.description,
      images: [projectItem.image_src],
    },
    twitter: {
      card: "summary_large_image",
      title: projectItem.title,
      description: projectItem.description,
      images: [projectItem.image_src],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const project = await fetchProjectBySlug(params.slug);

  return <ProjectsSlugPage project={project} />;
}
