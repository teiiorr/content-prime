import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Dashboard() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    async function run() {
      const result: Record<string, number> = {};
      const tables = [
        "news",
        "international_news",
        "projects",
        "contests",
        "announcements",
      ];

      for (const t of tables) {
        const { count } = await supabase
          .from(t)
          .select("*", { count: "exact", head: true });

        result[t] = count || 0;
      }

      setCounts(result);
    }
    run();
  }, []);

  return (
    <div className="grid cols2">
      <div className="card">
        <h3>Umumiy koʻrsatkichlar</h3>
        <ul>
          <li>
            Yangiliklar: <strong>{counts.news ?? "…"}</strong>
          </li>
          <li>
            Xalqaro Yangiliklar:{" "}
            <strong>{counts.international_news ?? "…"}</strong>
          </li>
          <li>
            Loyihalar: <strong>{counts.projects ?? "…"}</strong>
          </li>
          <li>
            Ijodiy tanlovlar: <strong>{counts.contests ?? "…"}</strong>
          </li>
          <li>
            E'lonlar: <strong>{counts.announcements ?? "…"}</strong>
          </li>
        </ul>
      </div>
      {/* <div className="card">
        <h3>Tezkor havolalar</h3>
        <p className="muted">
          Chap menyudagi bo‘limlar orqali CRUD sahifalariga o‘ting.
        </p>
      </div> */}
    </div>
  );
}
