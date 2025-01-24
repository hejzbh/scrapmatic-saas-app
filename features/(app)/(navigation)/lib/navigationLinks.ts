import { NavigationLinkType } from "@/types/global";
import { routes } from "@/lib/routes";
import { IoHomeOutline } from "react-icons/io5";
import { GoWorkflow } from "react-icons/go";
import { FaRegMoneyBillAlt } from "react-icons/fa";

export const navigationLinks: NavigationLinkType[] = [
  {
    name: "Home",
    href: routes.app.home,
    Icon: IoHomeOutline,
  },
  {
    name: "Workflows",
    href: routes.app.workflows,
    Icon: GoWorkflow,
  },
  {
    name: "Pricing",
    href: routes.app.pricing,
    Icon: FaRegMoneyBillAlt,
  },
];
