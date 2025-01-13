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
  stripeCustomerId: string;
  id: string;
  sid: string;
};

export type PaginationObjectType = {
  count: number;
};

export type PaginationSearchParams = {
  page: string;
};

export type FormFieldType = {
  name: string;
  placeholder?: string;
  label: string;
  required?: boolean;
  type: "input" | "textarea" | "checkbox";
  inputType?: "email" | "password";
};

export type WorkflowFormData = {
  name: string;
  description?: string;
};
