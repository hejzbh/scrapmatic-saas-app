import { FlowNodeTaskType } from "@/types/flow-nodes";
import { IconType } from "react-icons";
import { SiWebmoney } from "react-icons/si";

export enum TaskFieldType {
  INPUT = "INPUT",
}

export type TaskFieldObject = {
  name: string;
  type: TaskFieldType;
  label: string;
  placeholder?: string;
  helperText: string;
  required?: boolean;
  hideHandle?: boolean;
  [key: string]: any;
};

export type FlowNodeTaskObject = {
  type: FlowNodeTaskType;
  label: string;
  Icon: IconType;
  isEntryPoint?: boolean;
  iconProps?: any;
  fields: TaskFieldObject[];
};

export const LAUNCH_BROWSER_TASK: FlowNodeTaskObject = {
  type: FlowNodeTaskType.LAUNCH_BROWSER,
  label: "Launch Browser",
  Icon: SiWebmoney,
  isEntryPoint: true,
  iconProps: {
    className: "text-[#22C55E] text-xl",
  },
  fields: [
    {
      label: "Website  URL",
      name: "websiteUrl",
      type: TaskFieldType.INPUT,
      helperText: "eg: https://www.google.com",
      placeholder: "Enter website url here",
      required: true,
      hideHandle: false,
    },
  ],
};
