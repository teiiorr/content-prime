import { ROUTES } from "@/constants";
import { MainNavbarDesktop } from "./desktop";
import { MainNavbarMobile } from "./mobile";

export function MainNavbar() {
  // Menu items - asosiy komponentda
  const menuItems = [
    // { key: "about", label: "Markaz haqida", href: ROUTES.ABOUT },
    // { key: "news", label: "Yangiliklar", href: ROUTES.NEWS },
    { key: "analytics", label: "Tahlillar", href: ROUTES.ANALYTICS },
    { key: "projects", label: "Loyihalar", href: ROUTES.PROJECTS },
    {
      key: "contests",
      label: "Tanlovlar",
      href: ROUTES.CREATIVE_CONTESTS,
    },
  ];

  return (
    <nav
      className="bg-background"
      role="navigation"
      aria-label="Main navigation"
    >
      <MainNavbarDesktop menuItems={menuItems} />
      <MainNavbarMobile menuItems={menuItems} />
    </nav>
  );
}
