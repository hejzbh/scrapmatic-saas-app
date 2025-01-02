import React from "react";
import Logo from "@/components/ui/Logo";
import SidebarLinks from "./SidebarLinks";
import Separator from "@/components/ui/Separator";

type SidebarProps = {
  className?: string;
};

const Sidebar = ({ className = "" }: SidebarProps) => {
  return (
    <aside
      className={`min-w-[320px]  bg-sidebarGradient h-screen border-r-[1px] border-borderColors-primary  ${className}`}
    >
      <Logo className="p-5 h-[90px]" />
      <Separator />
      <SidebarLinks className="my-4 pr-4" />
    </aside>
  );
};

export default Sidebar;
