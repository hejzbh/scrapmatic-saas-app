import React from "react";
import ThemeToggler from "@/components/ui/ThemeToggler";
import Separator from "@/components/ui/Separator";
import Breadcrumb from "@/features/(main)/(navigation)/components/Breadcrumb";

type HeaderProps = {
  className?: string;
};

const Header = ({ className = "" }: HeaderProps) => {
  return (
    <header className={`${className}`}>
      <div className="p-5 h-[90px] flex items-center justify-between">
        <Breadcrumb />
        <ThemeToggler />
      </div>
      <Separator className="!bg-borderColors-primary" />
    </header>
  );
};

export default Header;
