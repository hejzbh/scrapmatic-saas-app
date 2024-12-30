"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Text from "@/components/ui/Text";
import Link from "next/link";
import { navigationLinks } from "../lib/navigationLinks";

type BreadcrumbProps = {
  className?: string;
};

type BreadcrumbLinkType = {
  name: string;
  href: string;
  isActive: boolean;
};

const Breadcrumb = ({ className = "" }: BreadcrumbProps) => {
  const pathname = usePathname();
  const [breadcrumbLinks, setBreadcrumbLinks] = useState<BreadcrumbLinkType[]>(
    []
  );

  useEffect(() => {
    setBreadcrumbLinks(generateBreadcrumbs());
  }, [pathname]);

  const generateBreadcrumbs = () => {
    const breadcrumbLinks: BreadcrumbLinkType[] = [];

    navigationLinks.forEach((link) => {
      if (pathname.includes(link.href)) {
        breadcrumbLinks.push({
          name: link.name,
          href: link.href,
          isActive: pathname === link.href,
        });
      }
    });

    return breadcrumbLinks;
  };

  return (
    <ul className={`flex items-center ${className}`}>
      {breadcrumbLinks?.map((link, idx) => (
        <li key={link.href}>
          <Link
            title={link.name}
            href={link.href}
            className={`block py-1 px-2  transition ${idx === 0 && "pl-0"} ${
              link.isActive
                ? "text-textColors-primary"
                : "text-textColors-secondary hover:text-textColors-primary"
            }`}
          >
            {" "}
            <Text withoutDefaultClass size="sm">
              {link.name}
            </Text>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Breadcrumb;
