import { PropsWithChildren } from "react";

import { MainNavbar } from "./navbar";
import { MainFooter } from "./footer";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
      <div className="flex flex-col min-h-screen bg-background text-foreground">
      <div className="w-full">
        <MainNavbar />
      </div>
      <main>{children}</main>
      <div className="w-full mt-auto">
        <MainFooter />
      </div>
    </div>
  );
};
