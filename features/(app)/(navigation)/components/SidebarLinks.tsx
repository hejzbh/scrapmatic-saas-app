"use client";
import React from "react";
import { routes } from "@/lib/routes";
import Link from "next/link";
import Text from "@/components/ui/Text";
import { usePathname } from "next/navigation";
import { navigationLinks } from "@/features/(app)/(navigation)/lib/navigationLinks";

type SidebarLinksProps = {
  className?: string;
};

const SidebarLinks = ({ className = "" }: SidebarLinksProps) => {
  const pathname = usePathname();

  return (
    <nav className={`${className}`}>
      <ul className="space-y-2">
        {navigationLinks?.map((link) => {
          const isAcitveLink =
            link.href === routes.app.home
              ? pathname === link.href
              : pathname.includes(link.href);

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`flex items-center space-x-4 transition-all duration-300 ease-in-out rounded-br-[4rem]  px-6 py-3 ${
                  isAcitveLink
                    ? "border-l-2 border-primary bg-bgColors-muted text-textColors-primary"
                    : "hover:bg-bgColors-muted text-textColors-secondary"
                }`}
                title={link.name}
              >
                <link.Icon className="text-2xl" />
                <Text size="md" withoutDefaultClass>
                  {link.name}
                </Text>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SidebarLinks;
