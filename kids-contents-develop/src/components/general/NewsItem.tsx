import { ROUTES } from "@/constants";
import { NewsItemType } from "@/types";
import Link from "next/link";

type NewsItemProps = {
  item: NewsItemType;
  showDescription?: boolean;
};

export function NewsItem({ item, showDescription = false }: NewsItemProps) {
  return (
    <Link href={`${ROUTES.NEWS}/${item.slug}`}>
      <div className="group cursor-pointer">
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
        <div className="mt-5">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2 line-clamp-3 group-hover:text-green-600 transition-colors duration-300">
            {item.title}
          </h3>
          {showDescription && item.description && (
            <p className="text-gray-600 text-sm md:text-base leading-relaxed line-clamp-2 mb-2">
              {item.description}
            </p>
          )}
          <span className="text-sm text-gray-500 font-medium">
            {item.date_display}
          </span>
        </div>
      </div>
    </Link>
  );
}
