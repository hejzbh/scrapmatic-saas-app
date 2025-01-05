import { Node } from "@xyflow/react";

export enum FlowNodeTaskType {
  LAUNCH_BROWSER = "LAUNCH_BROWSER",
}

export interface FlowNodeData {
  taskType: FlowNodeTaskType;
  values: Record<string, string>;
  [key: string]: any;
}

export interface FlowNode extends Node {
  data: FlowNodeData;
}
