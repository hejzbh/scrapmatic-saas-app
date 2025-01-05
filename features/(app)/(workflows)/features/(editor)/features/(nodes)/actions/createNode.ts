import { FlowNode, FlowNodeTaskType } from "@/types/flow-nodes";

export const createNode = (
  taskType: FlowNodeTaskType,
  position?: { x: number; y: number }
): FlowNode => {
  return {
    id: crypto.randomUUID(),
    type: "FlowNode",

    data: {
      taskType,
      values: {},
    },
    position: position ?? { x: 0, y: 0 },
  };
};
