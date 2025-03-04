import React from "react";
import { MobileNav } from "../sidebar/mobile-navigation";
import { DashboardBreadcrumb } from "./dashboard-breadcrum";
import ThemeSwitcher from "./theme-switcher";
import { SearchInput } from "./search";
import { User } from "./user";

const Header = () => {
  return (
    <header className="dark:bg-background sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 py-4 shadow-sm sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 md:bg-white">
      <MobileNav />
      <DashboardBreadcrumb />
      <div className="relative ml-auto flex flex-1 items-center gap-4 md:grow-0">
        <ThemeSwitcher />
        <SearchInput />
        <User />
      </div>
    </header>
  );
};

export default Header;
