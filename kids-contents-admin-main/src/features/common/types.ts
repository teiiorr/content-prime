export type FieldType =
  | "text"
  | "textarea"
  | "richtext"
  | "image"
  | "select"
  | "url"
  | "email"
  | "checkbox";

export type FieldConfig = {
  key: string;
  label: string;
  type: FieldType | "imageOrUpload" | "contentBlocks" | "galleryImages" | "fileOrUpload";
  required?: boolean;
  min?: number;
  pattern?: string;
  options?: string[]; // for select
  helper?: string;
  placeholder?: string;
  folder?: string; // storage folder for file upload
};

export type EntityConfig = {
  table: string;
  title: string;
  listColumns: FieldConfig[];
  formFields: FieldConfig[];
  filters?: {
    type: "status" | "date_display";
  }[];
};
