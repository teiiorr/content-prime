import { ROUTES } from "@/constants";
import { NewsItemType } from "@/types";
import Link from "next/link";

type NewsItemProps = {
  item: NewsItemType;
  showDescription?: boolean;
};

export function NewsItem({ item, showDescription = false }: NewsItemProps) {
  return (
    <Link href={`${ROUTES.NEWS}/${item.slug}`} className="block h-full">
      <div className="group flex h-full cursor-pointer flex-col">
        <div className="relative aspect-[16/11] overflow-hidden rounded-xl">
          <img
            src={item.image_src}
            srcSet={item.image_srcset}
            alt={item.title}
            width={350}
            height={240}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div
          className={`mt-5 flex flex-1 flex-col ${
            showDescription ? "min-h-[150px] md:min-h-[168px]" : "min-h-[108px] md:min-h-[128px]"
          }`}
        >
          <h3 className="mb-2 line-clamp-3 text-xl font-semibold text-gray-900 transition-colors duration-300 group-hover:text-green-600 md:text-2xl">
            {item.title}
          </h3>
          {showDescription && item.description && (
            <p className="text-gray-600 text-sm md:text-base leading-relaxed line-clamp-2 mb-2">
              {item.description}
            </p>
          )}
          <div className="mt-2 flex flex-1 items-end">
            <div className="w-full space-y-2">
              <div className="h-px w-full bg-gradient-to-r from-slate-200/90 via-slate-200/40 to-transparent" />
              <div className="flex items-center gap-2 opacity-80">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                <span className="h-px w-16 bg-slate-200/80" />
                <span className="h-px w-10 bg-slate-200/55" />
              </div>
            </div>
          </div>
          <div className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full border border-slate-200/90 bg-white px-2.5 py-1 text-xs font-medium text-gray-500">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
            <span>{item.date_display}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
