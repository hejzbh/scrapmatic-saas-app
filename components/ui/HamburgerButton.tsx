import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";

type HamburgerButtonProps = {
  className?: string;
  children: React.ReactNode; // Sheet content
};

const HamburgerButton = ({
  className = "",
  children,
}: HamburgerButtonProps) => {
  return (
    <Sheet>
      <SheetTrigger
        title="Open Sidebar"
        className={`w-10 h-10 bg-bgColors-secondary rounded-full flex items-center justify-center ${className}`}
      >
        <RxHamburgerMenu className="text-textColors-secondary text-xl" />
      </SheetTrigger>
      <SheetContent>
        {/** DON'T remove this due to hydratation error */}
        <SheetTitle className="hidden"></SheetTitle>
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default HamburgerButton;
