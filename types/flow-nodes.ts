import { Node } from "@xyflow/react";

export type FlowNodeTask = "LAUNCH_BROWSER";

export interface FlowNodeData {
  task: FlowNodeTask;
  inputs: Record<string, string>;
  [key: string]: any;
}

export interface FlowNode extends Node {}
