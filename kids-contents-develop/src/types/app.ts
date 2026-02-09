export interface NewsItemType {
  id: number;
  slug: string;
  title: string;
  description?: string;
  image_src: string;
  image_srcset?: string;
  date_display: string;
  content?: string;
  gallery_images?: string;
  video_src?: string;
  poster_src?: string;
  link_text?: string;
  link_url?: string;
}

export type NewsWithContentItemType = NewsItemType;

export interface Contest {
  id: number;
  slug: string;
  title: string;
  image_src: string;
  status: string;
  deadline: string;
  description: string;
  video_src?: string;
  content_blocks?: string;
  application_link?: string;
  show_requirements?: boolean;
}

export type Status = "Faol" | "Tez kunda" | "Yakunlangan";

export interface ProjectItemType {
  id: number;
  slug: string;
  title: string;
  description?: string;
  status: Status;
  image_src: string;
  image_srcset: string;
  content?: string;
  video_src?: string;
  poster_src?: string;
  current_step?: string;
  instagram_url?: string;
  youtube_url?: string;
  telegram_url?: string;
  facebook_url?: string;
}

export interface Announcement {
  id: number;
  title: string;
  description: string;
  date_display: string;
  slug: string;
  email: string;
  footer_text: string;
  content: string;
  created_at: string;
}

export interface AnalyticsItemType {
  id: number;
  slug: string;
  title: string;
  description?: string;
  date_display: string;
  tag?: string;
  image_src: string;
  content?: string;
  gallery_images?: string;
  video_src?: string;
  poster_src?: string;
}
