"use client";

import React, { useState, useCallback, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Modal, Popover } from "antd";
import {
  ChevronDown,
  Lightbulb,
  Search,
  X,
  Home,
  Newspaper,
  Info,
  LayoutGrid,
  BarChart3,
  Trophy,
} from "lucide-react";

import { Button, SubmissionFormModal } from "@/components";
import { ROUTES } from "@/constants";

interface MenuItem {
  key: string;
  label: string;
  href: string;
}

interface MainNavbarDesktopProps {
  menuItems: MenuItem[];
}

interface SearchItem {
  id: string;
  title: string;
  href: string;
  category: string;
}

const SEARCH_ITEMS: SearchItem[] = [
  { id: "1", title: "Yangiliklar", href: ROUTES.NEWS, category: "" },
  { id: "2", title: "Loyihalar", href: ROUTES.PROJECTS, category: "" },
  { id: "3", title: "Tahlillar", href: ROUTES.ANALYTICS, category: "" },
  {
    id: "4",
    title: "Xalqaro aloqalar",
    href: `${ROUTES.ABOUT}/#international-cooperation`,
    category: "Pages",
  },
  { id: "5", title: "Biz haqimizda", href: ROUTES.ABOUT, category: "Pages" },
  { id: "6", title: "Rahbariyat", href: `${ROUTES.ABOUT}/#team`, category: "About" },
  {
    id: "7",
    title: "Faoliyat",
    href: `${ROUTES.ABOUT}/#center-functions`,
    category: "About",
  },
  { id: "8", title: "Fotogalereya", href: `${ROUTES.NEWS}/#gallery`, category: "Media" },
  { id: "9", title: "Videoteka", href: `${ROUTES.NEWS}/#videoteka`, category: "Media" },
  { id: "10", title: "E'lonlar", href: `${ROUTES.HOME}/#announcements`, category: "Home" },
];

const NAV_ICONS: Record<string, React.ReactNode> = {
  home: <Home size={18} />,
  about: <Info size={18} />,
  news: <Newspaper size={18} />,
  contests: <Trophy size={18} />,
  "creative-contests": <Trophy size={18} />,
  projects: <LayoutGrid size={18} />,
  analytics: <BarChart3 size={18} />,
};

function useScrolled(y = 10) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > y);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [y]);

  return scrolled;
}

function PopoverContent({
  title,
  hint,
  children,
}: {
  title?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-[360px]">
      {(title || hint) && (
        <div className="px-4 pb-3 pt-4">
          <div className="flex items-center justify-between gap-3">
            <div className="text-[11px] uppercase tracking-wider text-white/60">{title}</div>
            {hint ? (
              <div className="rounded-full border border-white/12 bg-white/8 px-2 py-1 text-[11px] text-white/60">
                {hint}
              </div>
            ) : null}
          </div>
          <div className="mt-3 h-px w-full bg-white/10" />
        </div>
      )}
      <div className={["flex flex-col gap-1 px-2 pb-3", title || hint ? "" : "pt-2"].join(" ")}>
        {children}
      </div>
    </div>
  );
}

const DropdownPanel = ({
  items,
  onItemClick,
}: {
  items: { href: string; label: string }[];
  onItemClick: () => void;
}) => (
  <>
    {items.map(({ href, label }) => (
      <Link
        key={href}
        href={href}
        onClick={onItemClick}
        className="nb-dd-item group flex items-center justify-between gap-3 rounded-2xl px-3 py-2.5 text-[14px] font-medium text-white/88"
      >
        <span className="nb-dd-text">{label}</span>
        <span className="nb-dd-arrow opacity-0">→</span>
      </Link>
    ))}
  </>
);

export function MainNavbarDesktop({ menuItems }: MainNavbarDesktopProps) {
  const pathname = usePathname();
  const scrolled = useScrolled(10);

  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [openPopovers, setOpenPopovers] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return SEARCH_ITEMS;
    const q = searchQuery.toLowerCase();
    return SEARCH_ITEMS.filter(
      (i) => i.title.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const closeAllPopovers = useCallback(() => setOpenPopovers({}), []);

  const handleOpenSubmissionModal = useCallback(() => setIsSubmissionModalOpen(true), []);
  const handleCloseSubmissionModal = useCallback(() => setIsSubmissionModalOpen(false), []);

  const handleOpenSearchModal = useCallback(() => setIsSearchModalOpen(true), []);
  const handleCloseSearchModal = useCallback(() => {
    setIsSearchModalOpen(false);
    setSearchQuery("");
  }, []);

  const handlePopoverOpenChange = useCallback((key: string, open: boolean) => {
    setOpenPopovers((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((k) => (next[k] = false));
      next[key] = open;
      return next;
    });
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    searchInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (isSearchModalOpen) {
      const t = setTimeout(() => searchInputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [isSearchModalOpen]);

  useEffect(() => {
    // Route changes should always clear transient overlays/masks.
    setOpenPopovers({});
    setIsSearchModalOpen(false);
    setSearchQuery("");
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeAllPopovers();
        if (isSearchModalOpen) handleCloseSearchModal();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isSearchModalOpen, handleCloseSearchModal, closeAllPopovers]);

  const isActive = (href: string) => {
    const pure = href.split("#")[0];
    return pure === ROUTES.HOME ? pathname === ROUTES.HOME : pathname.startsWith(pure);
  };

  const aboutItems = [
    { href: ROUTES.ABOUT, label: "Biz haqimizda" },
    { href: `${ROUTES.ABOUT}/#team`, label: "Rahbariyat" },
    { href: `${ROUTES.ABOUT}/#international-cooperation`, label: "Xalqaro hamkorlik" },
    { href: `${ROUTES.ABOUT}/#center-functions`, label: "Faoliyat" },
  ];

  const newsItems = [
    { href: ROUTES.NEWS, label: "Yangiliklar" },
    { href: `${ROUTES.HOME}/#announcements`, label: "E'lonlar" },
    { href: `${ROUTES.NEWS}/#gallery`, label: "Fotogalereya" },
    { href: `${ROUTES.NEWS}/#videoteka`, label: "Videoteka" },
  ];

  const NavLink = ({
    icon,
    href,
    label,
    onClick,
  }: {
    icon?: React.ReactNode;
    href: string;
    label: string;
    onClick?: () => void;
  }) => {
    const active = isActive(href);

    return (
      <Link
        href={href}
        onClick={() => {
          onClick?.();
          closeAllPopovers();
        }}
        
        className={[
          "nb-item group relative inline-flex items-center gap-2 rounded-full px-[14px] py-[9px]",
          "nb-font font-semibold",
          "text-white",
        ].join(" ")}
      >
        <span
          className={[
            "nb-icon transition-colors",
            "text-white/88",
          ].join(" ")}
        >
          {icon}
        </span>

        <span className="nb-text transition-colors">{label}</span>

        <span
          className={[
            "pointer-events-none absolute inset-0 -z-10 rounded-full border",
            active ? "nb-plate nb-plate-active" : "nb-plate border-transparent",
          ].join(" ")}
        />
        <span className="nb-glow pointer-events-none absolute inset-0 -z-20 rounded-full" />
      </Link>
    );
  };

  const DropdownTrigger = ({
    k,
    label,
    title,
    items,
    hint,
  }: {
    k: string;
    label: string;
    title?: string;
    items: { href: string; label: string }[];
    hint?: string;
  }) => {
    const open = !!openPopovers[k];

    return (
      <Popover
        arrow={false}
        placement="bottom"
        trigger="hover"
        open={open}
        onOpenChange={(o) => handlePopoverOpenChange(k, o)}
        overlayClassName="navbar-popover-wow"
        styles={{ body: { transformOrigin: "top center" } }}
        content={
          <PopoverContent title={title} hint={hint}>
            <DropdownPanel
              items={items}
              onItemClick={() => handlePopoverOpenChange(k, false)}
            />
          </PopoverContent>
        }
      >
        <div className="nb-item group relative inline-flex cursor-pointer select-none items-center gap-2 rounded-full px-[14px] py-[9px] nb-font font-semibold text-white">
          <span
            className={[
              "nb-icon transition-colors",
              "text-white/88",
            ].join(" ")}
          >
            {NAV_ICONS[k]}
          </span>

          <span className="nb-text transition-colors">{label}</span>

          <span
            className="text-white/78 transition-transform"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            <ChevronDown size={18} />
          </span>

          <span
            className={[
              "pointer-events-none absolute inset-0 -z-10 rounded-full border",
              open ? "nb-plate nb-plate-active" : "nb-plate border-transparent",
            ].join(" ")}
          />
          <span className="nb-glow pointer-events-none absolute inset-0 -z-20 rounded-full" />
        </div>
      </Popover>
    );
  };

  return (
    <div className="relative z-50 hidden lg:block">
      <div className="sticky top-0 z-50 pt-4">
        <div className="container max-w-[1508px] 2xl:max-w-[88%]">
          <div
            className={[
              "nb-shell mx-auto w-full",
              "rounded-[28px]",
              "backdrop-blur-xl",
              "shadow-none border-0",
              scrolled ? "bg-[#000014]/96" : "bg-[#000014]/90",
            ].join(" ")}
            onMouseLeave={closeAllPopovers}
          >
            <div className="nb-inner pl-4 pr-1 xl:pl-6 xl:pr-2">
              <div
                className="flex items-center justify-between"
                style={{ minHeight: "var(--nav-height)" }}
              >
                <div className="flex items-center gap-3">
                  <Link
                    href={ROUTES.HOME}
                    className="nb-logo inline-flex items-center rounded-2xl px-2 py-1.5"
                  >
                    <img
                      src="/logo.svg"
                      alt="Site logo"
                      width={210}
                      height={76}
                      className="max-xl:h-auto max-xl:w-40 [filter:brightness(0)_invert(1)]"
                    />
                  </Link>
                </div>

                <nav className="flex items-center gap-1 xl:gap-2 2xl:gap-3">
                  <NavLink href={ROUTES.HOME} label="Asosiy" icon={NAV_ICONS.home} />

                  <DropdownTrigger
                    k="about"
                    label="Markaz"
                    items={aboutItems}
                  />
                  <DropdownTrigger
                    k="news"
                    label="Yangiliklar"
                    items={newsItems}
                  />

                  {menuItems.map((item) => (
                    <NavLink
                      key={item.key}
                      href={item.href}
                      label={item.label}
                      icon={NAV_ICONS[item.key] ?? <LayoutGrid size={18} />}
                    />
                  ))}
                </nav>

                <div className="ml-3 flex shrink-0 items-center justify-end xl:ml-4">
                  <div className="nb-cta-wrap rounded-full">
                    <Button
                      theme="outlined"
                      onClick={handleOpenSubmissionModal}
                      className="nb-idea-btn !min-h-[44px] !rounded-full !border-white/20 !bg-transparent !px-4 !text-[14px] !font-bold !text-[#f4d35e] !shadow-none hover:!border-white/35 hover:!bg-transparent hover:!text-[#f4d35e] xl:!min-h-[46px] xl:!px-5"
                    >
                      <Lightbulb size={18} className="idea-bulb shrink-0" />
                      <span>Sizda g'oya bormi?</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden h-px w-full bg-black/5 opacity-60" />
          </div>
        </div>
      </div>

      <SubmissionFormModal
        isModalOpen={isSubmissionModalOpen}
        onClose={handleCloseSubmissionModal}
      />

      <Modal
        open={isSearchModalOpen}
        onCancel={handleCloseSearchModal}
        footer={null}
        closeIcon={null}
        centered
        width={620}
        className="search-modal"
        styles={{ content: { borderRadius: "18px", overflow: "hidden" } }}
        destroyOnClose
      >
        <div className="flex min-h-14 items-center justify-between border-b border-gray-100 bg-gray-50 px-5 py-3">
          <div className="flex flex-1 items-center gap-3">
            <Search className="text-gray-400" size={20} />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="flex-1 border-none bg-transparent text-sm outline-none placeholder-gray-500"
              placeholder="Qidiruv..."
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="rounded-full p-1 transition-colors hover:bg-gray-200"
                aria-label="Clear search"
              >
                <X size={16} className="text-gray-400" />
              </button>
            )}
          </div>
          <button
            onClick={handleCloseSearchModal}
            className="ml-2 rounded-full p-1 transition-colors hover:bg-gray-200"
            aria-label="Close search"
          >
            <X size={18} className="text-gray-400" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {filteredResults.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              {searchQuery ? (
                <p>"{searchQuery}" bo'yicha hech narsa topilmadi</p>
              ) : (
                <p>Qidiruv uchun matn kiriting</p>
              )}
            </div>
          ) : (
            <div className="py-1">
              {filteredResults.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={handleCloseSearchModal}
                  className="mx-2 block rounded-xl px-5 py-3 text-sm transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.title}</span>
                    <span className="text-[11px] text-gray-400">{item.category}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {searchQuery && filteredResults.length > 0 && (
          <div className="border-t border-gray-100 bg-gray-50 px-5 py-3 text-xs text-gray-500">
            {filteredResults.length} natija topildi
          </div>
        )}
      </Modal>

      <style jsx>{`
        :global(:root) {
          --nav-font: clamp(14px, 0.35vw + 13px, 18px);
          --nav-height: clamp(72px, 1.2vw + 66px, 88px);
          --nav-btn: clamp(38px, 0.8vw + 34px, 46px);
          --nav-glow: 8, 19, 39;
        }

        :global(.nb-font) {
          font-size: var(--nav-font);
          line-height: 1.12;
        }

        :global(.search-modal .ant-modal-content) {
          padding: 0;
        }
        :global(.search-modal .ant-modal-body) {
          padding: 0;
        }

        :global(.navbar-popover-wow .ant-popover-inner) {
          border-radius: 22px;
          padding: 0;
          overflow: hidden;
          border: 1px solid rgba(17, 24, 39, 0.12);
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(20px);
          box-shadow: 0 30px 80px -56px rgba(15, 23, 42, 0.28);
          transform-origin: top center;
          animation: nb-popover-in 180ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        :global(.navbar-popover-wow .ant-popover-inner-content) {
          padding: 0;
        }
        :global(.navbar-popover-wow.ant-popover-hidden .ant-popover-inner) {
          animation: nb-popover-out 120ms ease-in forwards;
        }
        :global(.navbar-popover-wow .ant-popover-content) {
          filter: drop-shadow(0 10px 18px rgba(15, 23, 42, 0.05));
        }

        :global(.nb-dd-item) {
          transition: background-color 120ms ease, color 120ms ease;
        }
        :global(.nb-dd-item:hover) {
          background: rgba(148, 163, 184, 0.08);
        }
        :global(.nb-dd-item:hover .nb-dd-arrow) {
          opacity: 1;
        }
        :global(.nb-dd-arrow) {
          transition: opacity 120ms ease;
          color: rgba(17, 24, 39, 0.55);
        }

        :global(.nb-plate) {
          background: transparent;
          transition: background-color 120ms ease, border-color 120ms ease;
        }
        :global(.nb-item:hover .nb-plate) {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.14);
        }
        :global(.nb-plate-active) {
          background: rgba(255, 255, 255, 0.1) !important;
          border-color: rgba(255, 255, 255, 0.14) !important;
        }

        :global(.nb-glow) {
          display: none;
        }

        :global(.nb-item:hover .nb-text),
        :global(.nb-item:hover .nb-text.nb-text) {
          color: rgba(255, 255, 255, 1) !important;
          text-shadow: none;
        }
        :global(.nb-item:hover .nb-icon),
        :global(.nb-item:hover .nb-icon.nb-icon) {
          color: rgba(255, 255, 255, 0.92) !important;
          filter: none;
        }

        :global(.nb-dd-item:hover .nb-dd-text),
        :global(.nb-dd-item:hover .nb-dd-text.nb-dd-text) {
          color: rgb(var(--nav-glow)) !important;
          text-shadow: none;
        }

        :global(.nb-shell) {
          position: relative;
          overflow: hidden;
          border: 0 !important;
          box-shadow: none !important;
        }

        :global(.nb-logo) {
          transition: box-shadow 160ms ease, background-color 160ms ease;
        }
        :global(.nb-logo:hover) {
          background: rgba(255, 255, 255, 0.08);
          box-shadow: none;
        }

        :global(.nb-cta-wrap) {
          border: 0;
          background: transparent;
          backdrop-filter: none;
          padding: 0;
          box-shadow: none;
        }
        :global(.nb-icon-btn:hover) {
          box-shadow: none;
        }
        :global(.idea-bulb) {
          color: #fcd34d;
          filter: drop-shadow(0 0 0 rgba(252, 211, 77, 0));
          animation: idea-bulb-glow 2s ease-in-out infinite;
          transition: transform 140ms ease;
        }
        :global(.nb-idea-btn:hover .idea-bulb) {
          transform: scale(1.18);
        }
        :global(.nb-idea-btn) {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 8px !important;
          text-align: center;
        }
        :global(.nb-idea-btn > span) {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        @keyframes idea-bulb-glow {
          0%,
          35%,
          100% {
            color: #a16207;
            filter: drop-shadow(0 0 0 rgba(253, 230, 138, 0));
            transform: scale(1);
            opacity: 0.75;
          }
          48%,
          72% {
            color: #fde047;
            filter: drop-shadow(0 0 10px rgba(250, 204, 21, 0.6));
            transform: scale(1.08);
            opacity: 1;
          }
        }

        @keyframes nb-popover-in {
          from {
            opacity: 0;
            transform: translateY(-4px) scale(0.985);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes nb-popover-out {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(-2px) scale(0.99);
          }
        }
      `}</style>
    </div>
  );
}
