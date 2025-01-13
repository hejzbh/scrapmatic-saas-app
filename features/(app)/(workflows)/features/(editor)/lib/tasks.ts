import { SiWebmoney } from "react-icons/si";
import { FaHtml5 } from "react-icons/fa";
import { CiTextAlignLeft } from "react-icons/ci";
import { OUTPUTS, INPUTS } from "./inputs-outputs";
import {
  FlowNodeTaskObject,
  TaskParamEnum,
  FlowNodeTaskType,
} from "@/types/flow-nodes";
import { CREDITS_COSTS } from "@/lib/const";

export const handleColors = {
  [TaskParamEnum.WEB_PAGE]: "!bg-[#DE4B25]",
  [TaskParamEnum.STRING]: "!bg-[yellow]",
};

export const LAUNCH_BROWSER_TASK: FlowNodeTaskObject = {
  // LAUNCH BROWSER
  type: FlowNodeTaskType.LAUNCH_BROWSER,
  label: "Launch Browser",
  Icon: SiWebmoney,
  isEntryPoint: true,
  iconProps: {
    className: "text-[#22C55E] text-xl",
  },
  inputs: [
    {
      label: "Website URL",
      name: "webPage",
      type: TaskParamEnum.STRING,
      helperText: "eg: https://www.google.com",
      placeholder: "Enter website url here",
      hideHandle: true,
      required: true,
    },
  ],
  outputs: [OUTPUTS.WEB_PAGE],
  credits: CREDITS_COSTS.tasks.LAUNCH_BROWSER,
};

export const PAGE_TO_HTML_TASK: FlowNodeTaskObject = {
  type: FlowNodeTaskType.PAGE_TO_HTML,
  label: "Get HTML from page",
  Icon: FaHtml5,
  iconProps: {
    className: "text-[#DE4B25] text-xl",
  },
  inputs: [INPUTS.WEB_PAGE],
  outputs: [OUTPUTS.WEB_PAGE, OUTPUTS.HTML],
  credits: CREDITS_COSTS.tasks.PAGE_TO_HTML,
};

export const EXTRACT_TEXT_FROM_ELEMENT: FlowNodeTaskObject = {
  type: FlowNodeTaskType.EXTRACT_TEXT_FROM_ELEMENT,
  label: "Extract text from element",
  Icon: CiTextAlignLeft,
  iconProps: { className: "text-xl text-gray-500" },
  inputs: [INPUTS.HTML, INPUTS.SELECTOR],
  outputs: [OUTPUTS.EXTRACTED_TEXT],
  credits: CREDITS_COSTS.tasks.EXTRACT_TEXT_FROM_ELEMENT,
};
