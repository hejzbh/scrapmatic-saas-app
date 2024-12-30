import { NavigationLinkType } from "@/types";
import { routes } from "@/lib/routes";
import { IoHomeOutline } from "react-icons/io5";
import { GoWorkflow } from "react-icons/go";
import { SiFusionauth } from "react-icons/si";
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
    name: "Credentials",
    href: routes.app.credentials,
    Icon: SiFusionauth,
  },
  {
    name: "Billing",
    href: routes.app.billing,
    Icon: FaRegMoneyBillAlt,
  },
];
