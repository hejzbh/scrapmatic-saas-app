import { Session } from "@auth0/nextjs-auth0";
import { IconType } from "react-icons";

export type NavigationLinkType = {
  href: string;
  name: string;
  Icon: IconType;
};

export type AuthUserType = {
  given_name: string;
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
  sub: string;
  id: string;
  sid: string;
};

export type PaginationObjectType = {
  count: number;
};

export type PaginationSearchParams = {
  page: string;
};
