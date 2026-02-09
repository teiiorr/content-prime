import { supabase } from "./supabase";
import type {
  NewsItemType,
  NewsWithContentItemType,
  Contest,
  ProjectItemType,
  Announcement,
  AnalyticsItemType,
} from "@/types/app";

/**
 * Fetch all news items
 */
export async function fetchNews(): Promise<NewsItemType[]> {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Error fetching news:", error);
    return [];
  }

  return data || [];
}

/**
 * Fetch news items with limit
 */
export async function fetchNewsLimited(limit: number): Promise<NewsItemType[]> {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("id", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching news:", error);
    return [];
  }

  return data || [];
}

/**
 * Fetch news item by slug
 */
export async function fetchNewsBySlug(
  slug: string
): Promise<NewsWithContentItemType | null> {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching news by slug:", error);
    return null;
  }

  return data;
}

/**
 * Fetch all international news items
 */
export async function fetchInternationalNews(): Promise<NewsItemType[]> {
  const { data, error } = await supabase
    .from("international_news")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Error fetching international news:", error);
    return [];
  }

  return data || [];
}

/**
 * Fetch international news item by slug
 */
export async function fetchInternationalNewsBySlug(
  slug: string
): Promise<NewsWithContentItemType | null> {
  const { data, error } = await supabase
    .from("international_news")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching international news by slug:", error);
    return null;
  }

  return data;
}

/**
 * Fetch all projects
 */
export async function fetchProjects(): Promise<ProjectItemType[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  return data || [];
}

/**
 * Fetch project by slug
 */
export async function fetchProjectBySlug(
  slug: string
): Promise<ProjectItemType | null> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching project by slug:", error);
    return null;
  }

  return data;
}

/**
 * Fetch all contests
 */
export async function fetchContests(): Promise<Contest[]> {
  const { data, error } = await supabase
    .from("contests")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Error fetching contests:", error);
    return [];
  }

  return data || [];
}

/**
 * Fetch contest by slug
 */
export async function fetchContestBySlug(
  slug: string
): Promise<Contest | null> {
  const { data, error } = await supabase
    .from("contests")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching contest by slug:", error);
    return null;
  }

  return data;
}

/**
 * Fetch all announcements
 */
export async function fetchAnnouncements(): Promise<Announcement[]> {
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Error fetching announcements:", error);
    return [];
  }

  return data || [];
}

/**
 * Fetch limited announcements
 */
export async function fetchAnnouncementsLimited(
  limit: number
): Promise<Announcement[]> {
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .order("id", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching announcements:", error);
    return [];
  }

  return data || [];
}

/**
 * Fetch announcement by slug
 */
export async function fetchAnnouncementBySlug(
  slug: string
): Promise<Announcement | null> {
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching announcement by slug:", error);
    return null;
  }

  return data;
}

/**
 * Fetch all analytics items
 */
export async function fetchAnalytics(): Promise<AnalyticsItemType[]> {
  const { data, error } = await supabase
    .from("analytics")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Error fetching analytics:", error);
    return [];
  }

  return data || [];
}

/**
 * Fetch analytics items with limit
 */
export async function fetchAnalyticsLimited(
  limit: number
): Promise<AnalyticsItemType[]> {
  const { data, error } = await supabase
    .from("analytics")
    .select("*")
    .order("id", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching analytics:", error);
    return [];
  }

  return data || [];
}

/**
 * Fetch analytics item by slug
 */
export async function fetchAnalyticsBySlug(
  slug: string
): Promise<AnalyticsItemType | null> {
  const { data, error } = await supabase
    .from("analytics")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching analytics by slug:", error);
    return null;
  }

  return data;
}
