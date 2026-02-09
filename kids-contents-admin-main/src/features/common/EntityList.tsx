import { useEffect, useState } from "react";
import slugify from "react-slugify";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { supabase } from "../../lib/supabase";
import { EntityConfig, FieldConfig } from "./types";
import Toast from "../../components/Toast";
import RichTextEditor from "../../components/RichTextEditor";
import ContentBlocksEditor, {
  ContentBlock,
} from "../../components/ContentBlocksEditor";

type Props = { config: EntityConfig };
type Row = Record<string, any>;
const pageSize = 10;

export default function EntityList({ config }: Props) {
  const [rows, setRows] = useState<Row[]>([]);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>(""); // keep only status filter
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Row | null>(null);
  const [form, setForm] = useState<Row>({});

  const listCols = config.listColumns;
  const formFields = config.formFields;

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  async function load() {
    setLoading(true);
    let q = supabase.from(config.table).select("*", { count: "exact" });

    if (search) {
      q = q.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // only status filter (removed date filter from UI & query)
    if (
      (config.filters ?? []).some((f) => f.type === "status") &&
      statusFilter
    ) {
      q = q.eq("status", statusFilter);
    }

    q = q.order("id", { ascending: false }).range(from, to);
    const { data, error, count } = await q;
    if (error) setToast(`Xatolik: ${error.message}`);
    else {
      setRows(data || []);
      setCount(count || 0);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [page, search, statusFilter]);

  function openCreate() {
    setEditing(null);
    setForm({});
    setModalOpen(true);
  }
  function openEdit(row: Row) {
    setEditing(row);
    setForm(row);
    setModalOpen(true);
  }
  function setField(key: string, value: any) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function doSave() {
    const title = form["title"];
    const slug = form["slug"];
    const mustSlug = !!formFields.find((f) => f.key === "slug");
    if (!title || (mustSlug && !slug)) {
      setToast("Sarlavha va slug talab qilinadi");
      return;
    }

    try {
      if (editing) {
        const id = editing.id;
        const payload = { ...form };
        delete (payload as any).id;
        const { error } = await supabase
          .from(config.table)
          .update(payload)
          .eq("id", id);
        if (error) throw error;
        setToast("Yangilandi");
      } else {
        const payload = { ...form };
        delete (payload as any).id;
        const { error } = await supabase.from(config.table).insert(payload);
        if (error) throw error;
        setToast("Saqlandi");
      }
      setModalOpen(false);
      load();
    } catch (e: any) {
      setToast(`Xatolik: ${e.message}`);
    }
  }

  async function doDelete(id: number) {
    if (!confirm("Haqiqatan ham o'chirishni istaysizmi?")) return;
    const { error } = await supabase.from(config.table).delete().eq("id", id);
    if (error) setToast(`Xatolik: ${error.message}`);
    else {
      setToast("O'chirildi");
      load();
    }
  }

  const totalPages = Math.max(1, Math.ceil(count / pageSize));

  return (
    <div className="grid" style={{ gap: 16 }}>
      {/* top toolbar (date filter removed) */}
      <div className="toolbar">
        <input
          className="input"
          style={{ maxWidth: 320 }}
          placeholder="Qidirish (sarlavha/tavsif)"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        {config.filters?.some((f) => f.type === "status") && (
          <select
            className="select"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="">Status: barchasi</option>
            <option value="Faol">Faol</option>
            <option value="Yakunlangan">Yakunlangan</option>
            <option value="Tez kunda">Tez kunda</option>
          </select>
        )}
      </div>

      {/* table with padding on top */}
      <div className="card table-wrap">
        <table className="table">
          <thead>
            <tr>
              {listCols.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
              <th className="actions-col">Amallar</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={listCols.length + 1}>Yuklanmoqda...</td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={listCols.length + 1}>Maʼlumot yoʻq</td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id}>
                  {listCols.map((col) => (
                    <td key={col.key}>
                      {col.key === "image_src" && r[col.key] ? (
                        <img
                          src={
                            r[col.key].startsWith("/images")
                              ? `https://bolalarkontenti.uz${r[col.key]}`
                              : r[col.key]
                          }
                          className="thumb"
                          alt=""
                        />
                      ) : (
                        String(r[col.key] ?? "")
                      )}
                    </td>
                  ))}
                  <td className="actions-col">
                    <button
                      className="icon-btn edit"
                      title="Tahrirlash"
                      aria-label="Tahrirlash"
                      onClick={() => openEdit(r)}
                    >
                      {/* pencil icon */}
                      <svg
                        className="icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                      </svg>
                    </button>
                    <button
                      className="icon-btn del"
                      style={{ marginLeft: 8 }}
                      title="O'chirish"
                      aria-label="O'chirish"
                      onClick={() => doDelete(r.id)}
                    >
                      {/* trash icon */}
                      <svg
                        className="icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        <path d="M10 11v6M14 11v6" />
                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <span>Sahifa:</span>
        <button
          className="btn"
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Oldingi
        </button>
        <span className="pill">
          {page} / {totalPages}
        </span>
        <button
          className="btn"
          disabled={page >= totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          Keyingi
        </button>
      </div>

      {/* Floating Create button */}
      <button
        className="fab"
        onClick={openCreate}
        title="Yaratish"
        aria-label="Yaratish"
      >
        +
      </button>

      {/* Modal */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {editing
            ? `${config.title}: Tahrirlash`
            : `${config.title}: Yaratish`}
        </DialogTitle>
        <DialogContent dividers>
          <FormFields
            fields={formFields}
            value={form}
            onChange={(k, v) => setField(k, v)}
            onGenerateSlug={() => {
              const t = (form["title"] || "") as string;
              if (!t) return;
              setField("slug", slugify(t));
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Yopish</Button>
          <Button variant="contained" onClick={doSave}>
            Saqlash
          </Button>
        </DialogActions>
      </Dialog>

      {toast && <Toast text={toast} />}
    </div>
  );
}

function FormFields({
  fields,
  value,
  onChange,
  onGenerateSlug,
}: {
  fields: FieldConfig[];
  value: Row;
  onChange: (k: string, v: any) => void;
  onGenerateSlug: () => void;
}) {
  return (
    <div className="form-grid">
      {fields.map((f) => (
        <div key={f.key} className="field">
          <label className="label">
            {f.label}
            {f.required ? " *" : ""}
          </label>

          {f.type === "text" && (
            <input
              className="input"
              placeholder={f.placeholder || ""}
              value={value[f.key] || ""}
              onChange={(e) => onChange(f.key, e.target.value)}
            />
          )}
          {f.type === "email" && (
            <input
              className="input"
              type="email"
              placeholder={f.placeholder || ""}
              value={value[f.key] || ""}
              onChange={(e) => onChange(f.key, e.target.value)}
            />
          )}
          {f.type === "url" && (
            <input
              className="input"
              type="url"
              placeholder={f.placeholder || ""}
              value={value[f.key] || ""}
              onChange={(e) => onChange(f.key, e.target.value)}
            />
          )}
          {f.type === "textarea" && (
            <textarea
              className="textarea"
              rows={6}
              placeholder={f.placeholder || ""}
              value={value[f.key] || ""}
              onChange={(e) => onChange(f.key, e.target.value)}
            />
          )}
          {f.type === "richtext" && (
            <RichTextEditor
              value={value[f.key] || ""}
              onChange={(v) => onChange(f.key, v)}
              placeholder={f.placeholder || ""}
            />
          )}
          {f.type === "select" && (
            <select
              className="select"
              value={value[f.key] || ""}
              onChange={(e) => onChange(f.key, e.target.value)}
            >
              <option value="">— tanlang —</option>
              {(f.options || []).map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )}
          {f.type === "checkbox" && (
            <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type="checkbox"
                checked={value[f.key] || false}
                onChange={(e) => onChange(f.key, e.target.checked)}
              />
              <span>{f.placeholder || "Ha"}</span>
            </label>
          )}
          {f.type === "imageOrUpload" && (
            <ImageOrUpload
              value={value[f.key] || ""}
              onChange={(v) => onChange(f.key, v)}
              folder={f.folder || "misc"}
            />
          )}
          {f.type === "contentBlocks" && (
            <ContentBlocksEditor
              value={parseContentBlocks(value[f.key])}
              onChange={(blocks) => onChange(f.key, JSON.stringify(blocks))}
            />
          )}
          {f.type === "galleryImages" && (
            <GalleryImagesUpload
              value={value[f.key] || ""}
              onChange={(v) => onChange(f.key, v)}
              folder={f.folder || "misc"}
            />
          )}
          {f.type === "fileOrUpload" && (
            <FileOrUpload
              value={value[f.key] || ""}
              onChange={(v) => onChange(f.key, v)}
              folder={f.folder || "misc"}
            />
          )}
          {f.key === "slug" && (
            <div>
              <button className="btn" onClick={onGenerateSlug}>
                Sarlavhadan yaratish
              </button>
            </div>
          )}
          {f.helper && <div className="hint">{f.helper}</div>}
        </div>
      ))}
    </div>
  );
}

function parseContentBlocks(value: any): ContentBlock[] {
  if (!value) return [];
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return [];
    }
  }
  if (Array.isArray(value)) return value;
  return [];
}

/* prettier upload UI */
function ImageOrUpload({
  value,
  onChange,
  folder,
}: {
  value: string;
  onChange: (v: string) => void;
  folder: string;
}) {
  async function onFile(e: any) {
    const file = e.target.files?.[0];
    if (!file) return;
    const key = `${folder}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("ChildrenUzbekistan")
      .upload(key, file, { upsert: false });
    if (error) {
      alert(`Yuklashda xato: ${error.message}`);
      return;
    }
    const { data } = supabase.storage
      .from("ChildrenUzbekistan")
      .getPublicUrl(key);
    onChange(data.publicUrl);
  }

  return (
    <div className="upload-row">
      <div className="dropzone">
        <input
          className="input"
          placeholder="/images/x.avif yoki public URL"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <label className="btn" style={{ cursor: "pointer" }}>
            Fayl tanlash…
            <input type="file" style={{ display: "none" }} onChange={onFile} />
          </label>
          {value && (
            <button className="btn" onClick={() => onChange("")}>
              Tozalash
            </button>
          )}
        </div>
        <div className="hint">
          Rasmni yuklang yoki to'g'ridan-to'g'ri URL kiriting. Yuklangandan
          so'ng, maydonga public URL yoziladi.
        </div>
      </div>

      <div className="preview-card">
        {value ? (
          <img
            src={
              value.startsWith("/images")
                ? `https://bolalarkontenti.uz${value}`
                : value
            }
            alt="preview"
          />
        ) : (
          <div
            style={{
              display: "grid",
              placeItems: "center",
              height: 160,
              color: "var(--muted)",
            }}
          >
            Oldindan ko'rish
          </div>
        )}
        <div className="meta">{value ? "Yuklangan rasm" : "Rasm yo'q"}</div>
      </div>
    </div>
  );
}

/* File or Upload UI (for PDFs and other files) */
function FileOrUpload({
  value,
  onChange,
  folder,
}: {
  value: string;
  onChange: (v: string) => void;
  folder: string;
}) {
  const [uploading, setUploading] = useState(false);

  async function onFile(e: any) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const key = `${folder}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("ChildrenUzbekistan")
      .upload(key, file, { upsert: false });

    if (error) {
      alert(`Yuklashda xato: ${error.message}`);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("ChildrenUzbekistan")
      .getPublicUrl(key);

    onChange(data.publicUrl);
    setUploading(false);
  }

  // Extract filename from URL
  const getFileName = (url: string) => {
    if (!url) return "";
    try {
      const parts = url.split("/");
      return parts[parts.length - 1];
    } catch {
      return url;
    }
  };

  const isPdfUrl = (url: string) => {
    return url.toLowerCase().endsWith(".pdf");
  };

  return (
    <div className="upload-row">
      <div className="dropzone">
        <input
          className="input"
          placeholder="https://... yoki /files/document.pdf"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <label className="btn" style={{ cursor: "pointer" }}>
            {uploading ? "Yuklanmoqda..." : "Fayl tanlash…"}
            <input
              type="file"
              style={{ display: "none" }}
              onChange={onFile}
              disabled={uploading}
              accept=".pdf,.doc,.docx,.txt"
            />
          </label>
          {value && (
            <button className="btn" onClick={() => onChange("")}>
              Tozalash
            </button>
          )}
        </div>
        <div className="hint">
          PDF yoki boshqa fayl yuklang yoki to'g'ridan-to'g'ri URL kiriting.
        </div>
      </div>

      <div className="preview-card">
        {value ? (
          <div style={{ padding: 16 }}>
            <div style={{ marginBottom: 12 }}>
              {isPdfUrl(value) ? (
                <svg
                  style={{
                    width: 64,
                    height: 64,
                    margin: "0 auto",
                    display: "block",
                  }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <text x="7" y="18" fontSize="5" fill="currentColor">
                    PDF
                  </text>
                </svg>
              ) : (
                <svg
                  style={{
                    width: 64,
                    height: 64,
                    margin: "0 auto",
                    display: "block",
                  }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              )}
            </div>
            <div
              style={{
                fontSize: "0.875rem",
                wordBreak: "break-all",
                textAlign: "center",
                marginBottom: 8,
              }}
            >
              {getFileName(value)}
            </div>
            {value.startsWith("http") && (
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{ width: "100%", textAlign: "center" }}
              >
                Faylni ochish
              </a>
            )}
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              placeItems: "center",
              height: 160,
              color: "var(--muted)",
            }}
          >
            Fayl yuklanmagan
          </div>
        )}
        <div className="meta">{value ? "Yuklangan fayl" : "Fayl yo'q"}</div>
      </div>
    </div>
  );
}

/* Gallery images upload UI */
function GalleryImagesUpload({
  value,
  onChange,
  folder,
}: {
  value: string;
  onChange: (v: string) => void;
  folder: string;
}) {
  const [uploading, setUploading] = useState(false);

  // Parse comma-separated URLs into array
  const images = value
    ? value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  async function onFile(e: any) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const key = `${folder}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("ChildrenUzbekistan")
      .upload(key, file, { upsert: false });

    if (error) {
      alert(`Yuklashda xato: ${error.message}`);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("ChildrenUzbekistan")
      .getPublicUrl(key);

    // Add new image to the list
    const newImages = [...images, data.publicUrl];
    onChange(newImages.join(","));
    setUploading(false);
  }

  function removeImage(index: number) {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages.join(","));
  }

  function moveImage(index: number, direction: "up" | "down") {
    const newImages = [...images];
    const newIndex = direction === "up" ? index - 1 : index + 1;

    if (newIndex < 0 || newIndex >= newImages.length) return;

    [newImages[index], newImages[newIndex]] = [
      newImages[newIndex],
      newImages[index],
    ];
    onChange(newImages.join(","));
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div className="dropzone">
        <div style={{ display: "flex", gap: 8 }}>
          <label className="btn" style={{ cursor: "pointer" }}>
            {uploading ? "Yuklanmoqda..." : "Rasm yuklash"}
            <input
              type="file"
              style={{ display: "none" }}
              onChange={onFile}
              disabled={uploading}
              accept="image/*"
            />
          </label>
        </div>
        <div className="hint">
          Rasmlarni birma-bir yuklang. Har bir rasm qo'shilganda ro'yxatga
          qo'shiladi.
        </div>
      </div>

      {images.length > 0 ? (
        <div style={{ display: "grid", gap: 12 }}>
          {images.map((img, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: 12,
                border: "1px solid var(--border)",
                borderRadius: 8,
                backgroundColor: "var(--bg-secondary)",
              }}
            >
              <img
                src={
                  img.startsWith("/images")
                    ? `https://bolalarkontenti.uz${img}`
                    : img
                }
                alt={`Gallery ${idx + 1}`}
                style={{
                  width: 80,
                  height: 80,
                  objectFit: "cover",
                  borderRadius: 4,
                }}
              />
              <div style={{ flex: 1, overflow: "hidden" }}>
                <div style={{ fontSize: "0.875rem", color: "var(--muted)" }}>
                  Rasm {idx + 1}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--muted)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {img}
                </div>
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                {idx > 0 && (
                  <button
                    className="btn"
                    onClick={() => moveImage(idx, "up")}
                    title="Yuqoriga ko'tarish"
                    style={{ padding: "4px 8px", fontSize: "0.875rem" }}
                  >
                    ↑
                  </button>
                )}
                {idx < images.length - 1 && (
                  <button
                    className="btn"
                    onClick={() => moveImage(idx, "down")}
                    title="Pastga tushirish"
                    style={{ padding: "4px 8px", fontSize: "0.875rem" }}
                  >
                    ↓
                  </button>
                )}
                <button
                  className="btn"
                  onClick={() => removeImage(idx)}
                  title="O'chirish"
                  style={{
                    padding: "4px 8px",
                    fontSize: "0.875rem",
                    backgroundColor: "var(--danger)",
                    color: "white",
                  }}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            padding: 24,
            textAlign: "center",
            color: "var(--muted)",
            border: "1px dashed var(--border)",
            borderRadius: 8,
          }}
        >
          Hali rasmlar yuklanmagan
        </div>
      )}
    </div>
  );
}
