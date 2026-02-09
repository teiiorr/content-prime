import { memo, useState, useRef, useEffect, useMemo } from "react";
import { Collapse } from "antd";
import { ChevronDown } from "lucide-react";

import { Contest, NewsItemType } from "@/types";
import { Button, NewsItem } from "@/components";
import { fetchNewsLimited } from "@/lib";

interface ContestSlugSectionsContentProps {
  contest: Contest;
}

interface ContentBlock {
  id: string;
  key: string;
  label: string;
  children: React.ReactNode;
}

export const ContestSlugSectionsContent = memo(
  function ContestSlugSectionsContent({
    contest,
  }: ContestSlugSectionsContentProps) {
    const [news, setNews] = useState<NewsItemType[]>([]);
    const [activeKey, setActiveKey] = useState<string[] | number[]>([0]);
    const collapseRef = useRef(null);

    useEffect(() => {
      async function loadNews() {
        const data = await fetchNewsLimited(3);
        setNews(data);
      }
      loadNews();
    }, []);

    // Parse content_blocks from Supabase
    const dynamicContentBlocks = useMemo(() => {
      const blocks: ContentBlock[] = [];

      // Add main content blocks from Supabase
      if (contest.content_blocks) {
        try {
          const parsed = JSON.parse(contest.content_blocks);
          if (Array.isArray(parsed)) {
            blocks.push(
              ...parsed.map((block: any) => ({
                id: block.id || block.key,
                key: block.key,
                label: block.label,
                children: (
                  <div
                    className="flex flex-col gap-3 rich-text-container"
                    dangerouslySetInnerHTML={{ __html: block.content || "" }}
                  />
                ),
              }))
            );
          }
        } catch (error) {
          console.error("Error parsing content_blocks:", error);
        }
      }

      // Add "Ariza" block if application_link exists
      if (contest.application_link) {
        blocks.push({
          id: "ariza",
          key: "ariza",
          label: "Ariza",
          children: (
            <div className="flex flex-col gap-3">
              <p>
                Arizaning elektron shaklini yuklab olib, kerakli ma&apos;lumotlarni
                to&apos;ldiring.
              </p>
              <div>
                <Button
                  theme="primary"
                  size="small"
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = contest.application_link!;
                    link.download = contest.application_link!.split("/").pop() || "ariza.pdf";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  Yuklab olish
                </Button>
              </div>
            </div>
          ),
        });
      }

      // Add "Talablar" block if show_requirements is true
      if (contest.show_requirements) {
        blocks.push({
          id: "ishtirokchilar",
          key: "ishtirokchilar",
          label:
            "Tanlovda ishtirok etadigan studiyalardan talab qilinadigan maʼlumotlar",
          children: (
            <div className="flex flex-col gap-3">
              <ol className="list-decimal pl-6">
                <li>
                  Studiyaning to&apos;liq va rasmiy nomi, yuridik maqomi (MChJ, AJ,
                  XK va hokazo).
                </li>
                <li>Studiya qachon tashkil etilgan sana.</li>
                <li>
                  Studiyaning asosiy yo&apos;nalishi (masalan, badiiy filmlar,
                  hujjatli filmlar, animatsiya, teleko&apos;rsatuvlar, reklama
                  roliklari va boshqalar).
                </li>
                <li>Soliq to&apos;lovchining identifikatsiya raqami.</li>
                <li>
                  Aloqa ma&apos;lumotlari (telefon raqami, elektron pochta manzili)
                  va veb-sayti.
                </li>
                <li>Studiyaning to&apos;liq yuridik va amaliy manzili.</li>
                <li>
                  Studiya tomonidan shu kungacha ishlab chiqarilgan filmlar,
                  seriallar yoki boshqa mediamahsulotlar ro&apos;yxati (nomi, janri,
                  ishlab chiqarilgan yili, rejissyor nomi ko&apos;rsatilgan holda).
                </li>
                <li>Studiyaning texnik bazasi haqida umumiy ma&apos;lumot.</li>
                <li>
                  Studiyada ishlaydigan asosiy ijodiy va texnik xodimlar
                  (rejissyorlar, ssenariynavislar, operatorlar, prodyuserlar,
                  montajchilar va boshqalar) haqida qisqacha ma&apos;lumot.
                </li>
              </ol>
            </div>
          ),
        });
      }

      return blocks.length > 0 ? blocks : null;
    }, [contest.content_blocks, contest.application_link, contest.show_requirements]);

    return (
      <section id="contest-content">
        <div className="container relative z-10">
          <div className="mb-12 sm:mb-16 md:mb-24">
            <Collapse
              ref={collapseRef}
              expandIconPosition="end"
              activeKey={activeKey}
              onChange={setActiveKey}
              expandIcon={({ isActive }) => (
                <ChevronDown
                  size={32}
                  className={`transition-transform duration-300 ${
                    isActive ? "rotate-180" : "rotate-0"
                  }`}
                />
              )}
              items={[...(dynamicContentBlocks || [])]}
            />
          </div>

          <div className="mb-12 sm:mb-16 md:mb-24">
            <h2 className="mb-8 font-bold text-3xl sm:text-4xl md:text-5xl">
              Loyihaga aloqador yangiliklar
            </h2>

            {news.length > 0 ? (
              <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {news.map((item) => (
                  <NewsItem key={item.id} item={item} showDescription={false} />
                ))}
              </div>
            ) : (
              <p>Yangiliklar topilmadi.</p>
            )}
          </div>
        </div>
      </section>
    );
  }
);

ContestSlugSectionsContent.displayName = "ContestSlugSectionsContent";
