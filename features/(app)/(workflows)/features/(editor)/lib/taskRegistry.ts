import { FlowNodeTaskType } from "@/types/flow-nodes";
import { LAUNCH_BROWSER_TASK, FlowNodeTaskObject } from "./tasks";

export const TASK_REGISTRY: Record<FlowNodeTaskType, FlowNodeTaskObject> = {
  [FlowNodeTaskType.LAUNCH_BROWSER]: LAUNCH_BROWSER_TASK,
};
