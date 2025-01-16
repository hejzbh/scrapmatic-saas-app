import { FlowNode } from "./flow-nodes";

export type WorkflowExecutionPlan = {
  step: number;
  nodes: FlowNode[];
}[];
