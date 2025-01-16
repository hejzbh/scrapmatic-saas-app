import { FlowNode } from "./flow-nodes";

export type WorkflowExecutionStep = {
  number: number;
  node: FlowNode;
  taskType: string;
};

export type WorkflowExecutionPlan = {
  steps: WorkflowExecutionStep[];
  creditsCost: number;
};
