import React from "react";
import ThemeToggler from "@/components/ui/ThemeToggler";
import Separator from "@/components/ui/Separator";
import Breadcrumb from "@/features/(app)/(navigation)/components/Breadcrumb";
import HamburgerButton from "@/components/ui/HamburgerButton";
import Sidebar from "./Sidebar";
import Logo from "@/components/ui/Logo";

type HeaderProps = {
  className?: string;
};

const Header = ({ className = "" }: HeaderProps) => {
  return (
    <header className={`bg-appHeaderGradient ${className}`}>
      <div className="p-5 h-[90px] flex items-center justify-between">
        <Breadcrumb className="hidden lg:flex" />
        <Logo className="block lg:hidden" />
        <div className="flex space-x-4">
          {" "}
          <ThemeToggler />
          <HamburgerButton className="block lg:hidden">
            <Sidebar />
          </HamburgerButton>
        </div>
      </div>
      <Separator />
    </header>
  );
};

export default Header;
