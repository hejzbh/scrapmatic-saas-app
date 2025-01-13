import { FlowNode } from "./flow-nodes";

export type WorkflowExecutionPlan = {
  phase: number;
  nodes: FlowNode[];
}[];
