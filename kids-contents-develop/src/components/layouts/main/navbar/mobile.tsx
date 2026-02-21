"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Drawer } from "antd";
import {
  ChevronDown,
  ChevronUp,
  Home,
  Info,
  MoreHorizontal,
  Newspaper,
  Search,
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

/**
 * NOTE:
 * - This file assumes ROUTES has at least: HOME, ABOUT, NEWS.
 * - If you have more routes, add them into SEARCH_ITEMS.
 */
const SEARCH_ITEMS: Array<{
  title: string;
  href: string;
  category: string;
}> = [
  { title: "Home", href: ROUTES.HOME, category: "Pages" },
  { title: "About", href: ROUTES.ABOUT, category: "Pages" },
  { title: "News", href: ROUTES.NEWS, category: "Pages" },
];

type DrawerMode = "menu" | "search";

export function MainNavbarMobile({ menuItems }: MainNavbarMobileProps) {
  const pathname = usePathname();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<DrawerMode>("menu");

  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);

  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    about: false,
    news: false,
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

  const Tab = ({
    label,
    icon,
    active,
  }: {
    label: string;
    icon: React.ReactNode;
    active?: boolean;
  }) => (
    <span
      className={["nbm-tab", active ? "is-active" : ""].join(" ")}
      aria-label={label}
    >
      <span className="nbm-ico">{icon}</span>
      <span className="nbm-lbl">{label}</span>
    </span>
  );

  return (
    <div className="lg:hidden">
      {/* Top sticky bar */}
      <div className="sticky top-0 z-50 border-b border-white/70 bg-white/80 backdrop-blur-xl shadow-[0_20px_35px_-30px_rgba(2,6,23,1)]">
        <div className="container">
        <div className="flex items-center justify-between py-2.5">
            <Link href={ROUTES.HOME} className="inline-flex items-center">
              <img src="/logo.svg" alt="Site logo" width={172} height={62} />
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

      {/* iOS safe-area spacer */}
      <div className="nbm-safe" />

      {/* Bottom tab bar */}
      <div className="nbm-bottom">
        <div className="nbm-bottom-inner">
          <Link href={ROUTES.HOME} className="nbm-linkwrap">
            <Tab
              label="Home"
              icon={<Home size={20} />}
              active={isActive(ROUTES.HOME)}
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
            />
          </button>

          <button className="nbm-linkwrap" onClick={openSearch} type="button">
            <Tab label="Search" icon={<Search size={20} />} />
          </button>

          <button className="nbm-linkwrap" onClick={openMenu} type="button">
            <Tab label="More" icon={<MoreHorizontal size={20} />} />
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
                  placeholder="Search pages..."
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
              <div className="nbm-title">Quick links</div>

              <div className="nbm-list">
                <Link
                  href={ROUTES.HOME}
                  className="nbm-item"
                  onClick={closeDrawer}
                >
                  <span>Home</span>
                  <span className="nbm-pill">Page</span>
                </Link>

                <button
                  type="button"
                  className="nbm-item"
                  onClick={() => toggleSubmenu("about")}
                >
                  <span>About</span>
                  <span className="nbm-aux">
                    {expandedMenus.about ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </span>
                </button>

                {expandedMenus.about ? (
                  <div className="nbm-sublist">
                    <Link
                      href={ROUTES.ABOUT}
                      className="nbm-subitem"
                      onClick={closeDrawer}
                    >
                      About page
                    </Link>
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

                <button
                  type="button"
                  className="nbm-item"
                  onClick={() => toggleSubmenu("news")}
                >
                  <span>News</span>
                  <span className="nbm-aux">
                    {expandedMenus.news ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </span>
                </button>

                {expandedMenus.news ? (
                  <div className="nbm-sublist">
                    <Link
                      href={ROUTES.NEWS}
                      className="nbm-subitem"
                      onClick={closeDrawer}
                    >
                      News page
                    </Link>
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
              </div>
            </div>

            <div className="nbm-section">
              <div className="nbm-title">All menu</div>
              <div className="nbm-list">
                {menuItems.map((m) => (
                  <Link
                    key={m.key}
                    href={m.href}
                    className="nbm-item"
                    onClick={closeDrawer}
                  >
                    <span>{m.label}</span>
                    <span className="nbm-pill">Link</span>
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
                Submit
              </button>

              <button
                type="button"
                className="nbm-secondary"
                onClick={openSearch}
              >
                Open search
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

        /* Bottom bar */
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
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 8px;
          max-width: 680px;
          margin: 0 auto;
        }

        .nbm-linkwrap {
          width: 100%;
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

        .nbm-aux {
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