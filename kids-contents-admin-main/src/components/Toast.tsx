import { useEffect, useState } from "react";

export default function Toast({ text }: { text: string }) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setOpen(false), 3500);
    return () => clearTimeout(t);
  }, []);

  if (!open) return null;

  return <div className="toast">{text}</div>;
}
