import { useState } from "react";
import {
  Button,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
} from "@mui/material";
import {
  ExpandMore as ChevronDownIcon,
  Delete as TrashIcon,
  Add as PlusIcon,
  DragIndicator as GripIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
} from "@mui/icons-material";
import RichTextEditor from "./RichTextEditor";

export type ContentBlock = {
  id: string;
  key: string;
  label: string;
  content: string;
};

type Props = {
  value: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
};

export default function ContentBlocksEditor({ value, onChange }: Props) {
  const blocks = value || [];
  const [expandedPanel, setExpandedPanel] = useState<string | false>(false);

  const handleAdd = () => {
    const newId = `block-${Date.now()}`;
    const newBlock: ContentBlock = {
      id: newId,
      key: newId,
      label: "Yangi bo'lim",
      content: "",
    };
    onChange([...blocks, newBlock]);
    setExpandedPanel(newId);
  };

  const handleRemove = (index: number) => {
    if (!confirm("Ushbu bo'limni o'chirishni istaysizmi?")) return;
    const updated = blocks.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleUpdate = (index: number, field: keyof ContentBlock, val: string) => {
    const updated = [...blocks];
    updated[index] = { ...updated[index], [field]: val };
    onChange(updated);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...blocks];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    onChange(updated);
  };

  const handleMoveDown = (index: number) => {
    if (index === blocks.length - 1) return;
    const updated = [...blocks];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    onChange(updated);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Jami {blocks.length} ta bo'lim
        </Typography>
        <Button
          variant="outlined"
          size="small"
          startIcon={<PlusIcon />}
          onClick={handleAdd}
        >
          Bo'lim qo'shish
        </Button>
      </div>

      {blocks.map((block, index) => (
        <Accordion
          key={block.id}
          expanded={expandedPanel === block.id}
          onChange={(_, isExpanded) => setExpandedPanel(isExpanded ? block.id : false)}
          sx={{ border: "1px solid #e0e0e0" }}
        >
          <AccordionSummary expandIcon={<ChevronDownIcon />}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
              <GripIcon sx={{ color: "#999" }} />
              <Typography sx={{ flex: 1 }}>{block.label || "Sarlavasiz bo'lim"}</Typography>
              <div style={{ display: "flex", gap: 4 }} onClick={(e) => e.stopPropagation()}>
                <IconButton
                  size="small"
                  disabled={index === 0}
                  onClick={() => handleMoveUp(index)}
                  title="Yuqoriga ko'tarish"
                >
                  <ArrowUpIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  disabled={index === blocks.length - 1}
                  onClick={() => handleMoveDown(index)}
                  title="Pastga tushirish"
                >
                  <ArrowDownIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleRemove(index)}
                  title="O'chirish"
                >
                  <TrashIcon fontSize="small" />
                </IconButton>
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <TextField
                label="Sarlavha (Label)"
                size="small"
                fullWidth
                value={block.label}
                onChange={(e) => handleUpdate(index, "label", e.target.value)}
              />
              <TextField
                label="Kalit (Key)"
                size="small"
                fullWidth
                value={block.key}
                onChange={(e) => handleUpdate(index, "key", e.target.value)}
                helperText="URL uchun ishlatiladi, masalan: tanlov-shartlari"
              />
              <TextField
                label="ID"
                size="small"
                fullWidth
                value={block.id}
                onChange={(e) => handleUpdate(index, "id", e.target.value)}
                helperText="Unikal identifikator"
              />
              <div>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Kontent (HTML)
                </Typography>
                <RichTextEditor
                  value={block.content}
                  onChange={(val) => handleUpdate(index, "content", val)}
                  placeholder="Bo'lim matnini kiriting..."
                />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}

      {blocks.length === 0 && (
        <div
          style={{
            padding: 32,
            textAlign: "center",
            border: "2px dashed #e0e0e0",
            borderRadius: 8,
            color: "#999",
          }}
        >
          <Typography variant="body2">Hozircha bo'limlar yo'q</Typography>
          <Button
            variant="text"
            size="small"
            startIcon={<PlusIcon />}
            onClick={handleAdd}
            sx={{ mt: 1 }}
          >
            Birinchi bo'limni qo'shish
          </Button>
        </div>
      )}
    </div>
  );
}
