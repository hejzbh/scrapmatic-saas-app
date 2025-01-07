import { FlowNodeTaskType } from "@/types/flow-nodes";
import {
  LAUNCH_BROWSER_TASK,
  PAGE_TO_HTML_TASK,
  EXTRACT_TEXT_FROM_ELEMENT,
} from "./tasks";
import { FlowNodeTaskObject } from "@/types/flow-nodes";

export const TASK_REGISTRY: Record<FlowNodeTaskType, FlowNodeTaskObject> = {
  [FlowNodeTaskType.LAUNCH_BROWSER]: LAUNCH_BROWSER_TASK,
  [FlowNodeTaskType.PAGE_TO_HTML]: PAGE_TO_HTML_TASK,
  [FlowNodeTaskType.EXTRACT_TEXT_FROM_ELEMENT]: EXTRACT_TEXT_FROM_ELEMENT,
};
