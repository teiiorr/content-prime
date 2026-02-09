"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { Button, SubmissionFormModal } from "@/components";
import Link from "next/link";
import { ROUTES } from "@/constants";
import { Modal, Popover } from "antd";
import { ChevronDown, Search, X } from "lucide-react";

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

// Search data - could be moved to a separate constants file
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
  {
    id: "6",
    title: "Rahbariyat",
    href: `${ROUTES.ABOUT}/#team`,
    category: "About",
  },
  {
    id: "7",
    title: "Faoliyat",
    href: `${ROUTES.ABOUT}/#center-functions`,
    category: "About",
  },
  {
    id: "8",
    title: "Fotogalereya",
    href: `${ROUTES.NEWS}/#gallery`,
    category: "Media",
  },
  {
    id: "9",
    title: "Videoteka",
    href: `${ROUTES.NEWS}/#videoteka`,
    category: "Media",
  },
  {
    id: "10",
    title: "E'lonlar",
    href: `${ROUTES.HOME}/#announcements`,
    category: "Home",
  },
];

// Popover content components
const AboutContent = ({
  onItemClick,
}: {
  onItemClick: (key: string) => void;
}) => (
  <div className="flex flex-col -m-1">
    {[
      { href: ROUTES.ABOUT, label: "Biz haqimizda" },
      { href: `${ROUTES.ABOUT}/#team`, label: "Rahbariyat" },
      {
        href: `${ROUTES.ABOUT}/#international-cooperation`,
        label: "Xalqaro hamkorlik",
      },
      { href: `${ROUTES.ABOUT}/#center-functions`, label: "Faoliyat" },
    ].map(({ href, label }) => (
      <Link
        key={href}
        href={href}
        className="p-3 rounded-lg font-medium text-gray-900 hover:bg-blue-600 hover:text-white transition-all duration-200"
        onClick={() => onItemClick("about")}
      >
        {label}
      </Link>
    ))}
  </div>
);

const NewsContent = ({
  onItemClick,
}: {
  onItemClick: (key: string) => void;
}) => (
  <div className="flex flex-col -m-1">
    {[
      { href: ROUTES.NEWS, label: "Yangiliklar" },
      { href: `${ROUTES.HOME}/#announcements`, label: "E'lonlar" },
      { href: `${ROUTES.NEWS}/#gallery`, label: "Fotogalereya" },
      { href: `${ROUTES.NEWS}/#videoteka`, label: "Videoteka" },
    ].map(({ href, label }) => (
      <Link
        key={href}
        href={href}
        className="p-3 rounded-lg font-medium text-gray-900 hover:bg-blue-600 hover:text-white transition-all duration-200"
        onClick={() => onItemClick("news")}
      >
        {label}
      </Link>
    ))}
  </div>
);

export function MainNavbarDesktop({ menuItems }: MainNavbarDesktopProps) {
  // const languageMenu = (
  //   <Menu
  //     items={[
  //       {
  //         key: "uz",
  //         label: "O'ZB",
  //         icon: <span className="w-4 h-4 rounded-full bg-blue-500 mr-2"></span>,
  //       },
  //       {
  //         key: "ru",
  //         label: "RU",
  //         icon: <span className="w-4 h-4 rounded-full bg-red-500 mr-2"></span>,
  //       },
  //       {
  //         key: "en",
  //         label: "EN",
  //         icon: (
  //           <span className="w-4 h-4 rounded-full bg-green-500 mr-2"></span>
  //         ),
  //       },
  //     ]}
  //   />
  // );

  // State management
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [openPopovers, setOpenPopovers] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Memoized filtered search results
  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return SEARCH_ITEMS;

    const query = searchQuery.toLowerCase();
    return SEARCH_ITEMS.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Event handlers
  const handleOpenSubmissionModal = useCallback(
    () => setIsSubmissionModalOpen(true),
    []
  );
  const handleCloseSubmissionModal = useCallback(
    () => setIsSubmissionModalOpen(false),
    []
  );

  const handleOpenSearchModal = useCallback(
    () => setIsSearchModalOpen(true),
    []
  );
  const handleCloseSearchModal = useCallback(() => {
    setIsSearchModalOpen(false);
    setSearchQuery("");
  }, []);

  const handlePopoverOpenChange = useCallback(
    (popoverKey: string, open: boolean) => {
      setOpenPopovers((prev) => ({ ...prev, [popoverKey]: open }));
    },
    []
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  const handleSearchItemClick = useCallback(() => {
    handleCloseSearchModal();
  }, [handleCloseSearchModal]);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    searchInputRef.current?.focus();
  }, []);

  const handlePopoverItemClick = useCallback(
    (key: string) => {
      handlePopoverOpenChange(key, false);
    },
    [handlePopoverOpenChange]
  );

  // Effects
  useEffect(() => {
    if (isSearchModalOpen && searchInputRef.current) {
      const timer = setTimeout(() => searchInputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [isSearchModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSearchModalOpen && e.key === "Escape") {
        handleCloseSearchModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSearchModalOpen, handleCloseSearchModal]);

  // Render navigation item with dropdown
  const renderDropdownItem = (
    key: string,
    label: string,
    content: React.ReactNode
  ) => (
    <Popover
      arrow={false}
      placement="bottom"
      trigger="hover"
      content={content}
      open={openPopovers[key]}
      onOpenChange={(open) => handlePopoverOpenChange(key, open)}
      overlayClassName="navbar-popover"
    >
      <div className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium text-sm lg:text-lg 2xl:text-xl flex items-center justify-between gap-2 cursor-pointer">
        <span>{label}</span>
        <ChevronDown
          size={18}
          className={`text-gray-500 transition-transform duration-300 ${
            openPopovers[key] ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
    </Popover>
  );

  return (
    <div className="hidden lg:block relative z-10">
      <div className="container max-w-[1508px] 2xl:max-w-[85%] relative z-10">
        <div className="flex items-center justify-between min-h-[148px]">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link href={ROUTES.HOME}>
              <img
                src="/logo.svg"
                alt="Site logo"
                width={220}
                height={80.82}
                className="max-xl:w-40 max-xl:h-auto"
              />
            </Link>
          </div>

          {/* Navigation Menu */}
          <div className="flex items-center space-x-4 xl:space-x-6 2xl:space-x-8">
            <a
              href={ROUTES.HOME}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium text-sm lg:text-lg 2xl:text-xl"
            >
              Asosiy
            </a>
            {renderDropdownItem(
              "about",
              "Markaz haqida",
              <AboutContent onItemClick={handlePopoverItemClick} />
            )}

            {renderDropdownItem(
              "news",
              "Yangiliklar",
              <NewsContent onItemClick={handlePopoverItemClick} />
            )}

            {menuItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium text-sm lg:text-lg 2xl:text-xl"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Language Selector */}
          {/* <div className="flex items-center">
            <Dropdown overlay={languageMenu} trigger={["click"]}>
              <Button
                type="text"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
              >
                <div className="w-6 h-4 bg-gradient-to-r from-blue-500 via-white to-green-500 rounded-sm border border-gray-300"></div>
                <span className="font-medium">O'ZB</span>
              </Button>
            </Dropdown>
          </div> */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <Button
              theme="text"
              className="!text-gray-900 hover:!text-gray-900"
              onClick={handleOpenSearchModal}
            >
              <Search />
            </Button>
            <Button theme="primary" onClick={handleOpenSubmissionModal}>
              Sizda g‘oya bormi?
            </Button>
          </div>
        </div>
      </div>

      <SubmissionFormModal
        isModalOpen={isSubmissionModalOpen}
        onClose={handleCloseSubmissionModal}
      />

      {/* Optimized Search Modal */}
      <Modal
        open={isSearchModalOpen}
        onCancel={handleCloseSearchModal}
        footer={null}
        closeIcon={null}
        centered
        width={600}
        className="search-modal"
        styles={{
          content: {
            borderRadius: "12px",
            overflow: "hidden",
          },
        }}
        destroyOnClose
      >
        {/* Search Header */}
        <div className="flex items-center justify-between py-3 px-5 min-h-14 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center gap-3 flex-1">
            <Search className="text-gray-400" size={20} />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="border-none outline-none text-sm bg-transparent flex-1 placeholder-gray-500"
              placeholder="Qidiruv..."
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                aria-label="Clear search"
              >
                <X size={16} className="text-gray-400" />
              </button>
            )}
          </div>
          <button
            onClick={handleCloseSearchModal}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors ml-2"
            aria-label="Close search"
          >
            <X size={18} className="text-gray-400" />
          </button>
        </div>

        {/* Search Results */}
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
            <div>
              {filteredResults.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={handleSearchItemClick}
                  className="block px-5 py-3 text-sm hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Search Footer */}
        {searchQuery && filteredResults.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-3 text-xs text-gray-500 bg-gray-50">
            {filteredResults.length} natija topildi
          </div>
        )}

        <style jsx>{`
          :global(.search-modal .ant-modal-content) {
            padding: 0;
          }

          :global(.search-modal .ant-modal-body) {
            padding: 0;
          }
        `}</style>
      </Modal>
    </div>
  );
}
