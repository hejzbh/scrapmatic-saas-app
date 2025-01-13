import { FlowNodeTaskType } from "@/types/flow-nodes";

export const PAGINATION_PER_PAGE = 10;

export const CREDITS_COSTS = {
  tasks: {
    [FlowNodeTaskType.LAUNCH_BROWSER]: 5,
    [FlowNodeTaskType.PAGE_TO_HTML]: 4,
    [FlowNodeTaskType.EXTRACT_TEXT_FROM_ELEMENT]: 2,
  },
};
