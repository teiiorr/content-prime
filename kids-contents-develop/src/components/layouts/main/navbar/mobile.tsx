"use client";
import { useCallback, useState } from "react";
import Link from "next/link";
import { Drawer } from "antd";
import { MenuIcon, ChevronDown, ChevronUp } from "lucide-react";

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

export function MainNavbarMobile({ menuItems }: MainNavbarMobileProps) {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>(
    {}
  );

  const handleMenuClick = (href: string) => {
    setDrawerVisible(false);
  };

  const handleOpenSubmissionModal = useCallback(
    () => setIsSubmissionModalOpen(true),
    []
  );
  const handleCloseSubmissionModal = useCallback(
    () => setIsSubmissionModalOpen(false),
    []
  );

  const toggleSubmenu = (menuKey: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  // Submenu items
  const aboutSubItems = [
    { key: "about-main", label: "Biz haqimizda", href: ROUTES.ABOUT },
    { key: "team", label: "Rahbariyat", href: `${ROUTES.ABOUT}/#team` },
    {
      key: "cooperation",
      label: "Xalqaro hamkorlik",
      href: `${ROUTES.ABOUT}/#international-cooperation`,
    },
    {
      key: "functions",
      label: "Faoliyat",
      href: `${ROUTES.ABOUT}/#center-functions`,
    },
  ];

  const newsSubItems = [
    { key: "news-main", label: "Yangiliklar", href: ROUTES.NEWS },
    {
      key: "announcements",
      label: "E'lonlar",
      href: `${ROUTES.HOME}/#announcements`,
    },
    { key: "gallery", label: "Fotogalereya", href: `${ROUTES.NEWS}/#gallery` },
    { key: "videoteka", label: "Videoteka", href: `${ROUTES.NEWS}/#videoteka` },
  ];

  return (
    <div className="lg:hidden relative z-50 bg-white shadow-sm">
      <div className="container">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={ROUTES.HOME}>
              <img src="/logo.svg" alt="Site logo" width={180} height={66} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            theme="outlined"
            icon={<MenuIcon size={20} className="mt-1" />}
            onClick={() => setDrawerVisible(true)}
            className="p-1 w-10 h-10 items-center border-gray-400 !bg-white hover:!bg-gray-50 active:!bg-gray-100 !text-gray-700"
            aria-label="Hamburger-menu"
          />
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <div className="flex items-center space-x-2">
            <img src="/logo.svg" alt="Site logo" width={160} height={55} />
          </div>
        }
        placement="top"
        closable={true}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        height="auto"
        className="mobile-drawer lg:hidden"
      >
        <div>
          <div className="flex flex-col gap-2 pb-4">
            <div className="border-b border-gray-100 pb-2">
              <Link
                href={ROUTES.HOME}
                onClick={() => handleMenuClick(ROUTES.HOME)}
                className="block text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium text-base py-3 px-2 rounded-md hover:bg-blue-50"
              >
                Asosiy
              </Link>
            </div>
            <div className="border-b border-gray-100 pb-2">
              <div
                className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50 rounded-md px-2"
                onClick={() => toggleSubmenu("about")}
              >
                <span className="text-gray-700 font-medium text-base">
                  Markaz haqida
                </span>
                {expandedMenus.about ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </div>

              {expandedMenus.about && (
                <div className="pl-4 space-y-1">
                  {aboutSubItems.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={() => handleMenuClick(item.href)}
                      className="block text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2 px-2 rounded-md hover:bg-blue-50"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="border-b border-gray-100 pb-2">
              <div
                className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50 rounded-md px-2"
                onClick={() => toggleSubmenu("news")}
              >
                <span className="text-gray-700 font-medium text-base">
                  Yangiliklar
                </span>
                {expandedMenus.news ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </div>

              {expandedMenus.news && (
                <div className="pl-4 space-y-1">
                  {newsSubItems.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={() => handleMenuClick(item.href)}
                      className="block text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2 px-2 rounded-md hover:bg-blue-50"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {menuItems.map((item) => (
              <div
                key={item.key}
                className="border-b border-gray-100 pb-2 last:border-b-transparent"
              >
                <Link
                  href={item.href}
                  onClick={() => handleMenuClick(item.href)}
                  className="block text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium text-base py-3 px-2 rounded-md hover:bg-blue-50"
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>

          <div className="px-4 py-6 border-t border-t-gray-200 -mx-6 flex justify-center">
            <Button
              theme="primary"
              onClick={handleOpenSubmissionModal}
              className="max-sm:w-full"
            >
              Sizda g‘oya bormi?
            </Button>
          </div>
        </div>
      </Drawer>

      <SubmissionFormModal
        isModalOpen={isSubmissionModalOpen}
        onClose={handleCloseSubmissionModal}
      />
    </div>
  );
}
