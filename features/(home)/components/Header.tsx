import React from "react";
import Logo from "@/components/ui/Logo";
import Separator from "@/components/ui/Separator";

type HeaderProps = {
  className?: string;
};

const Header = ({ className = "" }: HeaderProps) => {
  return (
    <header className={`${className}`}>
      <div className="container py-4 flex items-center justify-between ">
        <Logo />
        <nav></nav>
        <div></div>
      </div>
      <Separator className="!bg-[#1F3445]" />
    </header>
  );
};

export default Header;
