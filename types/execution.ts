import { FlowNode } from "./flow-nodes";

export type WorkflowExecutionStep = { number: number; node: FlowNode };

export type WorkflowExecutionPlan = {
  steps: WorkflowExecutionStep[];
  creditsCost: number;
};
