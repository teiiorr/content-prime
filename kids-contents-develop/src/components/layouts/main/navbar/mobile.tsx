"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Drawer } from "antd";
import {
  ChevronDown,
  ChevronUp,
  Home,
  Info,
  LayoutGrid,
  Lightbulb,
  Newspaper,
  Search,
  Trophy,
  X,
} from "lucide-react";

import { SubmissionFormModal } from "@/components";
import { ROUTES } from "@/constants";

interface MenuItem {
  key: string;
  label: string;
  href: string;
}

interface MainNavbarMobileProps {
  menuItems: MenuItem[];
}

type DrawerMode = "menu" | "search";

/** Safe route fallback if ROUTES.CONTESTS doesn't exist */
const CONTESTS_ROUTE =
  (ROUTES as unknown as { CONTESTS?: string }).CONTESTS ?? "/creative-contests";

/** Uzbek labels */
const UI = {
  home: "Asosiy",
  about: "Markaz",
  news: "Yangiliklar",
  contests: "Tanlovlar",
  projects: "Loyihalar",
  search: "Qidiruv",
  menu: "Menyu",
  quickLinks: "Tezkor havolalar",
  allMenu: "Barcha bo‘limlar",
  page: "",
  link: "Havola",
  submit: "Yuborish",
  openSearch: "Qidiruvni ochish",
  searchPlaceholder: "Qidirish...",
};

const SEARCH_ITEMS: Array<{ title: string; href: string; category: string }> = [
  { title: UI.home, href: ROUTES.HOME, category: "" },
  { title: UI.about, href: ROUTES.ABOUT, category: "" },
  { title: UI.news, href: ROUTES.NEWS, category: "" },
  { title: UI.contests, href: CONTESTS_ROUTE, category: "" },
];

export function MainNavbarMobile({ menuItems }: MainNavbarMobileProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === ROUTES.HOME;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<DrawerMode>("menu");
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);

  // Submenus inside Drawer (optional)
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    about: false,
    news: false,
    contests: false,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    setSearchQuery("");
  }, []);

  const openMenu = useCallback(() => {
    setDrawerMode("menu");
    setDrawerOpen(true);
  }, []);

  const openSearch = useCallback(() => {
    setDrawerMode("search");
    setDrawerOpen(true);
  }, []);

  const handleOpenSubmissionModal = useCallback(() => {
    setIsSubmissionModalOpen(true);
  }, []);

  const handleCloseSubmissionModal = useCallback(() => {
    setIsSubmissionModalOpen(false);
  }, []);

  const toggleSubmenu = useCallback((key: string) => {
    setExpandedMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const isActive = useCallback(
    (href: string) => {
      const pure = href.split("?")[0].split("#")[0];
      if (pure === "/") return pathname === "/";
      return pathname.startsWith(pure);
    },
    [pathname]
  );

  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return SEARCH_ITEMS;
    const q = searchQuery.toLowerCase();
    return SEARCH_ITEMS.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  useEffect(() => {
    if (drawerOpen && drawerMode === "search") {
      const t = setTimeout(() => searchInputRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [drawerOpen, drawerMode]);

  useEffect(() => {
    // Ensure Drawer mask never persists after client-side navigation.
    setDrawerOpen(false);
    setSearchQuery("");
  }, [pathname]);

  const Tab = ({
    label,
    icon,
    active,
  }: {
    label: string;
    icon: React.ReactNode;
    active?: boolean;
  }) => (
    <span className={["nbm-tab", active ? "is-active" : ""].join(" ")}>
      <span className="nbm-ico">{icon}</span>
      <span className="nbm-lbl">{label}</span>
    </span>
  );

  const DrawerRow = ({
    title,
    href,
    pill,
    submenuKey,
    showToggle,
  }: {
    title: string;
    href: string;
    pill: string;
    submenuKey?: "about" | "news" | "contests";
    showToggle?: boolean;
  }) => {
    const expanded = submenuKey ? !!expandedMenus[submenuKey] : false;

    return (
      <div className="nbm-row">
        {/* Clicking the title ALWAYS navigates (fixes your About/News issue) */}
        <Link
          href={href}
          className="nbm-item nbm-item-main"
          onClick={closeDrawer}
        >
          <span>{title}</span>
          <span className="nbm-pill">{pill}</span>
        </Link>

        {/* Separate toggle button for submenu (optional) */}
        {showToggle && submenuKey ? (
          <button
            type="button"
            className="nbm-toggle"
            onClick={() => toggleSubmenu(submenuKey)}
            aria-label={`${title} submenu`}
          >
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        ) : null}
      </div>
    );
  };

  const go = useCallback(
    (href: string) => {
      router.push(href);
    },
    [router]
  );

  return (
    <div className="lg:hidden">
      {/* Top sticky bar is shown only on homepage */}
      {isHomePage ? (
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl shadow-[0_20px_35px_-30px_rgba(2,6,23,1)]">
          <div className="container">
            <div className="flex items-center justify-between py-2.5">
              <Link href={ROUTES.HOME} className="inline-flex items-center">
                <img src="/logo.svg" alt="Site logo" width={172} height={62} />
              </Link>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleOpenSubmissionModal}
                  className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[#8a6429] bg-[#6d4d1f] px-3 text-[12px] font-semibold text-white shadow-[0_12px_22px_-16px_rgba(88,60,24,0.6)] transition hover:bg-[#7a5826] active:scale-[0.99]"
                  type="button"
                  aria-label="Sizda g'oya bormi?"
                >
                  <Lightbulb size={14} className="nbm-idea-bulb" />
                  <span className="max-[360px]:hidden">G'oya</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* iOS safe-area spacer */}
      <div className="nbm-safe" />

      {/* Bottom tab bar (scrollable so “other buttons should be visible” when swiping) */}
      <div className="nbm-bottom">
        <div className="nbm-bottom-inner">
          <button
            className="nbm-linkwrap"
            type="button"
            onClick={() => go(ROUTES.HOME)}
          >
            <Tab
              label={UI.home}
              icon={<Home size={20} />}
              active={isActive(ROUTES.HOME)}
            />
          </button>

          <button
            className="nbm-linkwrap"
            type="button"
            onClick={() => go(ROUTES.ABOUT)}
          >
            <Tab
              label={UI.about}
              icon={<Info size={20} />}
              active={isActive(ROUTES.ABOUT)}
            />
          </button>

          <button
            className="nbm-linkwrap"
            type="button"
            onClick={() => go(ROUTES.NEWS)}
          >
            <Tab
              label={UI.news}
              icon={<Newspaper size={20} />}
              active={isActive(ROUTES.NEWS)}
            />
          </button>

          <button
            className="nbm-linkwrap"
            type="button"
            onClick={() => go(CONTESTS_ROUTE)}
          >
            <Tab
              label={UI.contests}
              icon={<Trophy size={20} />}
              active={isActive(CONTESTS_ROUTE)}
            />
          </button>

          <button
            className="nbm-linkwrap"
            type="button"
            onClick={() => go(ROUTES.PROJECTS)}
          >
            <Tab
              label={UI.projects}
              icon={<LayoutGrid size={20} />}
              active={isActive(ROUTES.PROJECTS)}
            />
          </button>

        </div>
      </div>

      {/* Drawer */}
      <Drawer
        title={
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src="/logo.svg" alt="Site logo" width={170} height={58} />
            </div>
            <button
              onClick={closeDrawer}
              className="nbm-close"
              aria-label="Close drawer"
              type="button"
            >
              <X size={18} />
            </button>
          </div>
        }
        placement="bottom"
        closable={false}
        onClose={closeDrawer}
        open={drawerOpen}
        height="82vh"
        className="nbm-drawer"
        destroyOnClose
      >
        {drawerMode === "search" ? (
          <div className="nbm-sheet">
            <div className="nbm-search">
              <div className="nbm-searchbox">
                <Search size={16} />
                <input
                  ref={(el) => {
                    searchInputRef.current = el;
                  }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={UI.searchPlaceholder}
                  className="nbm-search-input"
                  aria-label="Search input"
                />
                {searchQuery.trim() ? (
                  <button
                    type="button"
                    className="nbm-clear"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                ) : null}
              </div>

              <div className="nbm-results">
                {filteredResults.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="nbm-result"
                    onClick={closeDrawer}
                  >
                    <div className="nbm-result-title">{item.title}</div>
                    <div className="nbm-result-cat">{item.category}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="nbm-sheet">
            <div className="nbm-section">
              <div className="nbm-title">{UI.quickLinks}</div>

              <div className="nbm-list">
                <DrawerRow title={UI.home} href={ROUTES.HOME} pill={UI.page} />

                <DrawerRow
                  title={UI.about}
                  href={ROUTES.ABOUT}
                  pill={UI.page}
                  submenuKey="about"
                  showToggle
                />
                {expandedMenus.about ? (
                  <div className="nbm-sublist">
                    {/* Extra “about” links from menuItems (if you pass them) */}
                    {menuItems
                      .filter((m) => m.key.toLowerCase().includes("about"))
                      .map((m) => (
                        <Link
                          key={m.key}
                          href={m.href}
                          className="nbm-subitem"
                          onClick={closeDrawer}
                        >
                          {m.label}
                        </Link>
                      ))}
                  </div>
                ) : null}

                <DrawerRow
                  title={UI.news}
                  href={ROUTES.NEWS}
                  pill={UI.page}
                  submenuKey="news"
                  showToggle
                />
                {expandedMenus.news ? (
                  <div className="nbm-sublist">
                    {menuItems
                      .filter((m) => m.key.toLowerCase().includes("news"))
                      .map((m) => (
                        <Link
                          key={m.key}
                          href={m.href}
                          className="nbm-subitem"
                          onClick={closeDrawer}
                        >
                          {m.label}
                        </Link>
                      ))}
                  </div>
                ) : null}

                <DrawerRow
                  title={UI.contests}
                  href={CONTESTS_ROUTE}
                  pill={UI.page}
                  submenuKey="contests"
                  showToggle
                />
                {expandedMenus.contests ? (
                  <div className="nbm-sublist">
                    {menuItems
                      .filter(
                        (m) =>
                          m.key.toLowerCase().includes("contest") ||
                          m.key.toLowerCase().includes("tanlov")
                      )
                      .map((m) => (
                        <Link
                          key={m.key}
                          href={m.href}
                          className="nbm-subitem"
                          onClick={closeDrawer}
                        >
                          {m.label}
                        </Link>
                      ))}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="nbm-section">
              <div className="nbm-title">{UI.allMenu}</div>
              <div className="nbm-list">
                {menuItems.map((m) => (
                  <Link
                    key={m.key}
                    href={m.href}
                    className="nbm-item"
                    onClick={closeDrawer}
                  >
                    <span>{m.label}</span>
                    <span className="nbm-pill">{UI.link}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="nbm-actions">
              <button
                type="button"
                className="nbm-primary"
                onClick={() => {
                  closeDrawer();
                  handleOpenSubmissionModal();
                }}
              >
                {UI.submit}
              </button>

              <button
                type="button"
                className="nbm-secondary"
                onClick={openSearch}
              >
                {UI.openSearch}
              </button>
            </div>
          </div>
        )}
      </Drawer>

      <style jsx global>{`
        /* Base helpers */
        .nbm-safe {
          height: env(safe-area-inset-top);
        }

        .nbm-topicon {
          width: 40px;
          height: 40px;
          border-radius: 14px;
          border: 1px solid rgba(2, 6, 23, 0.08);
          background: rgba(255, 255, 255, 0.65);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .nbm-idea-bulb {
          color: #fcd34d;
          filter: drop-shadow(0 0 0 rgba(252, 211, 77, 0));
          animation: nbm-bulb-glow 2s ease-in-out infinite;
        }
        @keyframes nbm-bulb-glow {
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
            filter: drop-shadow(0 0 8px rgba(250, 204, 21, 0.55));
            transform: scale(1.08);
            opacity: 1;
          }
        }

        .nbm-close {
          width: 40px;
          height: 40px;
          border-radius: 14px;
          border: 1px solid rgba(2, 6, 23, 0.08);
          background: rgba(2, 6, 23, 0.03);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        /* Bottom bar (scrollable) */
        .nbm-bottom {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 60;
          padding: 10px 12px calc(10px + env(safe-area-inset-bottom));
          background: rgba(255, 255, 255, 0.82);
          backdrop-filter: blur(18px);
          border-top: 1px solid rgba(2, 6, 23, 0.08);
        }

        .nbm-bottom-inner {
          display: flex;
          gap: 8px;
          max-width: 760px;
          margin: 0 auto;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .nbm-bottom-inner::-webkit-scrollbar {
          display: none;
        }

        .nbm-linkwrap {
          flex: 0 0 auto;
          width: 92px;
          border: 0;
          background: transparent;
          padding: 0;
          text-align: left;
        }

        .nbm-tab {
          display: grid;
          justify-items: center;
          gap: 6px;
          padding: 10px 6px;
          border-radius: 18px;
          border: 1px solid transparent;
          color: rgba(2, 6, 23, 0.72);
        }

        .nbm-tab.is-active {
          border-color: rgba(2, 6, 23, 0.1);
          background: rgba(2, 6, 23, 0.035);
          color: rgba(2, 6, 23, 0.92);
        }

        .nbm-ico {
          line-height: 0;
          display: inline-flex;
        }

        .nbm-lbl {
          font-size: 11px;
          letter-spacing: 0.01em;
          text-align: center;
        }

        /* Drawer sheet */
        .nbm-drawer .ant-drawer-body {
          padding: 12px 12px 18px;
        }

        .nbm-sheet {
          max-width: 720px;
          margin: 0 auto;
        }

        .nbm-section {
          margin-bottom: 14px;
          padding: 12px;
          border: 1px solid rgba(2, 6, 23, 0.08);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.9);
        }

        .nbm-title {
          font-size: 12px;
          font-weight: 700;
          color: rgba(2, 6, 23, 0.78);
          margin-bottom: 10px;
        }

        .nbm-list {
          display: grid;
          gap: 8px;
        }

        .nbm-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 8px;
          align-items: stretch;
        }

        .nbm-item {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 12px 12px;
          border-radius: 16px;
          border: 1px solid rgba(2, 6, 23, 0.08);
          background: rgba(2, 6, 23, 0.02);
          color: rgba(2, 6, 23, 0.92);
        }

        .nbm-item-main {
          text-decoration: none;
        }

        .nbm-toggle {
          width: 46px;
          border-radius: 16px;
          border: 1px solid rgba(2, 6, 23, 0.08);
          background: rgba(255, 255, 255, 0.6);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: rgba(2, 6, 23, 0.65);
        }

        .nbm-pill {
          font-size: 11px;
          padding: 4px 8px;
          border-radius: 999px;
          border: 1px solid rgba(2, 6, 23, 0.08);
          color: rgba(2, 6, 23, 0.65);
          background: rgba(255, 255, 255, 0.6);
          white-space: nowrap;
        }

        .nbm-sublist {
          margin-top: 8px;
          margin-left: 6px;
          padding-left: 10px;
          border-left: 1px solid rgba(2, 6, 23, 0.08);
          display: grid;
          gap: 8px;
        }

        .nbm-subitem {
          display: block;
          padding: 10px 12px;
          border-radius: 14px;
          border: 1px solid rgba(2, 6, 23, 0.08);
          background: rgba(255, 255, 255, 0.75);
          color: rgba(2, 6, 23, 0.9);
          text-decoration: none;
        }

        .nbm-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-top: 12px;
        }

        .nbm-primary {
          height: 44px;
          border-radius: 16px;
          border: 1px solid rgba(2, 6, 23, 0.1);
          background: rgba(2, 6, 23, 0.92);
          color: white;
          font-weight: 700;
        }

        .nbm-secondary {
          height: 44px;
          border-radius: 16px;
          border: 1px solid rgba(2, 6, 23, 0.1);
          background: rgba(2, 6, 23, 0.03);
          color: rgba(2, 6, 23, 0.88);
          font-weight: 700;
        }

        /* Search UI */
        .nbm-search {
          padding: 12px;
          border: 1px solid rgba(2, 6, 23, 0.08);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.9);
        }

        .nbm-searchbox {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 16px;
          border: 1px solid rgba(2, 6, 23, 0.08);
          background: rgba(2, 6, 23, 0.02);
          margin-bottom: 12px;
        }

        .nbm-search-input {
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          font-size: 14px;
          color: rgba(2, 6, 23, 0.92);
        }

        .nbm-clear {
          width: 34px;
          height: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          border: 1px solid rgba(2, 6, 23, 0.08);
          background: rgba(2, 6, 23, 0.03);
          color: rgba(2, 6, 23, 0.65);
        }

        .nbm-results {
          display: grid;
          gap: 8px;
        }

        .nbm-result {
          display: grid;
          gap: 4px;
          padding: 12px 12px;
          border-radius: 16px;
          border: 1px solid rgba(2, 6, 23, 0.08);
          background: rgba(255, 255, 255, 0.75);
          color: rgba(2, 6, 23, 0.9);
          text-decoration: none;
        }

        .nbm-result-title {
          font-weight: 700;
          font-size: 13px;
        }

        .nbm-result-cat {
          font-size: 11px;
          color: rgba(2, 6, 23, 0.6);
        }
      `}</style>

      <SubmissionFormModal
        isModalOpen={isSubmissionModalOpen}
        onClose={handleCloseSubmissionModal}
      />
    </div>
  );
}
