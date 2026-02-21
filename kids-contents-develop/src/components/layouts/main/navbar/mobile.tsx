"use client";

import React, { useCallback, useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Drawer } from "antd";
import {
  Home,
  Info,
  Newspaper,
  Search,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";

import { Button, SubmissionFormModal } from "@/components";
import { ROUTES } from "@/constants";

interface MenuItem {
  key: string;
  label: string;
  href: string;
}

interface MainNavbarMobileProps {
  menuItems: MenuItem[];
}

interface SearchItem {
  id: string;
  title: string;
  href: string;
  category: string;
}

const SEARCH_ITEMS: SearchItem[] = [
  { id: "1", title: "Yangiliklar", href: ROUTES.NEWS, category: "Pages" },
  { id: "2", title: "Loyihalar", href: ROUTES.PROJECTS, category: "Pages" },
  { id: "3", title: "Tahlillar", href: ROUTES.ANALYTICS, category: "Pages" },
  {
    id: "4",
    title: "Xalqaro aloqalar",
    href: `${ROUTES.ABOUT}/#international-cooperation`,
    category: "Pages",
  },
  { id: "5", title: "Biz haqimizda", href: ROUTES.ABOUT, category: "Pages" },
  { id: "6", title: "Rahbariyat", href: `${ROUTES.ABOUT}/#team`, category: "About" },
  { id: "7", title: "Faoliyat", href: `${ROUTES.ABOUT}/#center-functions`, category: "About" },
  { id: "8", title: "Fotogalereya", href: `${ROUTES.NEWS}/#gallery`, category: "Media" },
  { id: "9", title: "Videoteka", href: `${ROUTES.NEWS}/#videoteka`, category: "Media" },
  { id: "10", title: "E'lonlar", href: `${ROUTES.HOME}/#announcements`, category: "Home" },
];

export function MainNavbarMobile({ menuItems }: MainNavbarMobileProps) {
  const pathname = usePathname();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"menu" | "search">("menu");
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const openMenu = useCallback(() => {
    setDrawerMode("menu");
    setDrawerOpen(true);
  }, []);

  const openSearch = useCallback(() => {
    setDrawerMode("search");
    setDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    setSearchQuery("");
  }, []);

  const handleOpenSubmissionModal = useCallback(() => setIsSubmissionModalOpen(true), []);
  const handleCloseSubmissionModal = useCallback(() => setIsSubmissionModalOpen(false), []);

  const toggleSubmenu = (menuKey: string) => {
    setExpandedMenus((prev) => ({ ...prev, [menuKey]: !prev[menuKey] }));
  };

  const handleMenuClick = () => {
    setDrawerOpen(false);
    setSearchQuery("");
  };

  const aboutSubItems = [
    { key: "about-main", label: "Biz haqimizda", href: ROUTES.ABOUT },
    { key: "team", label: "Rahbariyat", href: `${ROUTES.ABOUT}/#team` },
    { key: "cooperation", label: "Xalqaro hamkorlik", href: `${ROUTES.ABOUT}/#international-cooperation` },
    { key: "functions", label: "Faoliyat", href: `${ROUTES.ABOUT}/#center-functions` },
  ];

  const newsSubItems = [
    { key: "news-main", label: "Yangiliklar", href: ROUTES.NEWS },
    { key: "announcements", label: "E'lonlar", href: `${ROUTES.HOME}/#announcements` },
    { key: "gallery", label: "Fotogalereya", href: `${ROUTES.NEWS}/#gallery` },
    { key: "videoteka", label: "Videoteka", href: `${ROUTES.NEWS}/#videoteka` },
  ];

  const isActive = useCallback(
    (href: string) => {
      const pure = href.split("#")[0];
      if (pure === ROUTES.HOME) return pathname === ROUTES.HOME;
      return pathname.startsWith(pure);
    },
    [pathname]
  );

  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return SEARCH_ITEMS;
    const q = searchQuery.toLowerCase();
    return SEARCH_ITEMS.filter(
      (i) => i.title.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  useEffect(() => {
    if (drawerOpen && drawerMode === "search") {
      const t = setTimeout(() => searchInputRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [drawerOpen, drawerMode]);

  const Tab = ({
    label,
    icon,
    active,
    onClick,
  }: {
    label: string;
    icon: React.ReactNode;
    active?: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={["nbm-tab", active ? "is-active" : ""].join(" ")}
      aria-label={label}
      type="button"
    >
      <span className="nbm-ico">{icon}</span>
      <span className="nbm-lbl">{label}</span>
    </button>
  );

  return (
    <div className="lg:hidden">
      <div className="sticky top-0 z-50 border-b border-white/70 bg-white/80 backdrop-blur-xl shadow-[0_20px_35px_-30px_rgba(2,6,23,1)]">
        <div className="container">
          <div className="flex items-center justify-between py-4">
            <Link href={ROUTES.HOME} className="inline-flex items-center">
              <img src="/logo.svg" alt="Site logo" width={152} height={56} />
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={openSearch}
                className="nbm-topicon"
                aria-label="Search"
                type="button"
              >
                <Search size={18} />
              </button>

              <button
                onClick={openMenu}
                className="nbm-topicon"
                aria-label="Menu"
                type="button"
              >
                <MoreHorizontal size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="nbm-safe" />

      <div className="nbm-bottom">
        <div className="nbm-bottom-inner">
          <Link href={ROUTES.HOME} className="nbm-linkwrap" onClick={() => {}}>
            <Tab
              label="Home"
              icon={<Home size={20} />}
              active={isActive(ROUTES.HOME)}
              onClick={() => {}}
            />
          </Link>

          <button
            className="nbm-linkwrap"
            onClick={() => {
              setExpandedMenus((p) => ({ ...p, about: false, news: false }));
              openMenu();
              setTimeout(() => toggleSubmenu("about"), 0);
            }}
            type="button"
          >
            <Tab
              label="About"
              icon={<Info size={20} />}
              active={isActive(ROUTES.ABOUT)}
              onClick={() => {}}
            />
          </button>

          <button
            className="nbm-linkwrap"
            onClick={() => {
              setExpandedMenus((p) => ({ ...p, about: false, news: false }));
              openMenu();
              setTimeout(() => toggleSubmenu("news"), 0);
            }}
            type="button"
          >
            <Tab
              label="News"
              icon={<Newspaper size={20} />}
              active={isActive(ROUTES.NEWS)}
              onClick={() => {}}
            />
          </button>

          <button className="nbm-linkwrap" onClick={openSearch} type="button">
            <Tab label="Search" icon={<Search size={20} />} onClick={() => {}} />
          </button>

          <button className="nbm-linkwrap" onClick={openMenu} type="button">
            <Tab label="More" icon={<MoreHorizontal size={20} />} onClick={() => {}} />
          </button>
        </div>
      </div>

      <Drawer
        title={
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src="/logo.svg" alt="Site logo" width={150} height={52} />
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
        className="mobile-drawer lg:hidden nbm-drawer"
      >
        {drawerMode === "search" ? (
          <div className="pb-6">
            <div className="nbm-search">
              <Search className="text-slate-500" size={18} />
              <input
                ref={searchInputRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Qidiruv..."
                className="nbm-search-input"
              />
              {searchQuery ? (
                <button onClick={() => setSearchQuery("")} className="nbm-clear" type="button">
                  <X size={16} />
                </button>
              ) : null}
            </div>

            <div className="mt-4">
              {filteredResults.length === 0 ? (
                <div className="py-10 text-center text-slate-500">
                  {searchQuery ? <p>"{searchQuery}" bo'yicha hech narsa topilmadi</p> : <p>Qidiruv uchun matn kiriting</p>}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {filteredResults.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={handleMenuClick}
                      className="nbm-row"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-semibold text-slate-900">{item.title}</span>
                        <span className="rounded-full border border-black/10 bg-white/70 px-2 py-1 text-[11px] text-slate-500">
                          {item.category}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-col gap-2 pb-4">
              <div className="border-b border-slate-200/60 pb-2">
                <Link href={ROUTES.HOME} onClick={handleMenuClick} className="nbm-row">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">Asosiy</span>
                    <span className="text-slate-400">→</span>
                  </div>
                </Link>
              </div>

              <div className="border-b border-slate-200/60 pb-2">
                <button
                  className="nbm-row w-full text-left"
                  onClick={() => toggleSubmenu("about")}
                  type="button"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">Markaz haqida</span>
                    {expandedMenus.about ? (
                      <ChevronUp className="h-5 w-5 text-slate-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-slate-500" />
                    )}
                  </div>
                </button>

                {expandedMenus.about ? (
                  <div className="mt-1 flex flex-col gap-1 pl-2">
                    {aboutSubItems.map((item) => (
                      <Link key={item.key} href={item.href} onClick={handleMenuClick} className="nbm-subrow">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="border-b border-slate-200/60 pb-2">
                <button
                  className="nbm-row w-full text-left"
                  onClick={() => toggleSubmenu("news")}
                  type="button"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">Yangiliklar</span>
                    {expandedMenus.news ? (
                      <ChevronUp className="h-5 w-5 text-slate-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-slate-500" />
                    )}
                  </div>
                </button>

                {expandedMenus.news ? (
                  <div className="mt-1 flex flex-col gap-1 pl-2">
                    {newsSubItems.map((item) => (
                      <Link key={item.key} href={item.href} onClick={handleMenuClick} className="nbm-subrow">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>

              {menuItems.map((item) => (
                <div key={item.key} className="border-b border-slate-200/60 pb-2 last:border-b-transparent">
                  <Link href={item.href} onClick={handleMenuClick} className="nbm-row">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900">{item.label}</span>
                      <span className="text-slate-400">→</span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <div className="nbm-cta">
              <Button theme="primary" onClick={handleOpenSubmissionModal} className="w-full !py-3">
                Sizda g‘oya bormi?
              </Button>
            </div>
          </div>
        )}
      </Drawer>

      <style jsx global>{`
        :root {
          --nbm-blue: 37, 99, 235;
          --nbm-font: clamp(12px, 0.45vw + 11px, 14px);
        }

        .nbm-safe {
          height: 78px;
        }

        .nbm-topicon {
          width: 44px;
          height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          border: 1px solid rgba(2, 6, 23, 0.12);
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(18px);
          box-shadow: 0 18px 40px -36px rgba(2, 6, 23, 0.6);
          color: rgba(2, 6, 23, 0.85);
          transition: transform 120ms ease, box-shadow 160ms ease;
        }

        .nbm-topicon:active {
          transform: scale(0.98);
          box-shadow: 0 16px 34px -34px rgba(2, 6, 23, 0.75);
        }

        .nbm-bottom {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 60;
          padding: 10px 14px max(10px, env(safe-area-inset-bottom));
        }

        .nbm-bottom-inner {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 8px;
          padding: 10px;
          border-radius: 22px;
          border: 1px solid rgba(2, 6, 23, 0.10);
          background: rgba(255, 255, 255, 0.82);
          backdrop-filter: blur(22px);
          box-shadow: 0 34px 90px -70px rgba(2, 6, 23, 0.95);
        }

        .nbm-linkwrap {
          border-radius: 18px;
        }

        .nbm-tab {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          border-radius: 18px;
          padding: 10px 8px;
          color: rgba(2, 6, 23, 0.70);
          transition: background-color 160ms ease, color 160ms ease, box-shadow 160ms ease;
          -webkit-tap-highlight-color: transparent;
        }

        .nbm-tab:active {
          background: rgba(2, 6, 23, 0.05);
        }

        .nbm-tab.is-active {
          color: rgb(var(--nbm-blue));
          background: rgba(var(--nbm-blue), 0.10);
          box-shadow: inset 0 0 0 1px rgba(var(--nbm-blue), 0.16);
        }

        .nbm-ico {
          line-height: 0;
        }

        .nbm-lbl {
          font-size: var(--nbm-font);
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        .nbm-drawer .ant-drawer-content {
          background: rgba(248, 250, 252, 0.96);
          backdrop-filter: blur(22px);
          border-top-left-radius: 22px;
          border-top-right-radius: 22px;
          overflow: hidden;
        }

        .nbm-drawer .ant-drawer-header {
          background: transparent;
          border-bottom: 1px solid rgba(148, 163, 184, 0.28);
          padding: 14px 16px;
        }

        .nbm-drawer .ant-drawer-body {
          padding: 16px;
          padding-bottom: calc(16px + env(safe-area-inset-bottom));
        }

        .nbm-close {
          width: 38px;
          height: 38px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          border: 1px solid rgba(2, 6, 23, 0.10);
          background: rgba(255, 255, 255, 0.70);
          color: rgba(2, 6, 23, 0.70);
        }

        .nbm-row {
          display: block;
          width: 100%;
          border-radius: 18px;
          padding: 14px 14px;
          border: 1px solid rgba(2, 6, 23, 0.07);
          background: rgba(255, 255, 255, 0.72);
          box-shadow: 0 24px 60px -55px rgba(2, 6, 23, 0.85);
          transition: transform 120ms ease, box-shadow 160ms ease, border-color 160ms ease;
          -webkit-tap-highlight-color: transparent;
        }

        .nbm-row:active {
          transform: scale(0.99);
          box-shadow: 0 18px 44px -44px rgba(2, 6, 23, 0.95);
          border-color: rgba(37, 99, 235, 0.22);
        }

        .nbm-subrow {
          display: block;
          border-radius: 16px;
          padding: 10px 12px;
          color: rgba(2, 6, 23, 0.74);
          background: rgba(2, 6, 23, 0.03);
          border: 1px solid rgba(2, 6, 23, 0.06);
          -webkit-tap-highlight-color: transparent;
        }

        .nbm-subrow:active {
          border-color: rgba(37, 99, 235, 0.22);
          background: rgba(37, 99, 235, 0.08);
          color: rgba(2, 6, 23, 0.90);
        }

        .nbm-cta {
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px solid rgba(148, 163, 184, 0.34);
        }

        .nbm-search {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 12px;
          border-radius: 18px;
          border: 1px solid rgba(2, 6, 23, 0.10);
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(18px);
          box-shadow: 0 24px 60px -55px rgba(2, 6, 23, 0.85);
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
      `}</style>

      <SubmissionFormModal isModalOpen={isSubmissionModalOpen} onClose={handleCloseSubmissionModal} />
    </div>
  );
}