import { FlowNode } from "@/types/flow-nodes";
import { Connection } from "@xyflow/react";
import { TASK_REGISTRY } from "./taskRegistry";
import {
  WorkflowExecutionPlan,
  WorkflowExecutionStep,
} from "@/types/execution";
import { Edge, getIncomers } from "@xyflow/react";
import { InvalidInputType } from "../features/(nodes)/hooks/use-invalid-inputs";
import { CREDITS_COSTS } from "@/lib/const";

export const isConnectionValid = (
  connection: Connection,
  nodes: FlowNode[]
) => {
  // Find the source and target nodes using their IDs from the connection.
  const sourceNode = nodes.find((node) => node.id === connection.source);
  const targetNode = nodes.find((node) => node.id === connection.target);

  // If either the source or target node is missing, the connection is invalid.
  if (!sourceNode || !targetNode) return false;

  // Get the task configurations for the source and target nodes.
  const sourceTask = TASK_REGISTRY[sourceNode.data.taskType];
  const targetTask = TASK_REGISTRY[targetNode.data.taskType];

  // In case its null (impossible, but for security reasons)
  if (!sourceTask || !targetTask) return false;

  // Locate the specific output from the source and input from the target involved in the connection.
  const sourceOutput = sourceTask.outputs.find(
    (output) => output.name === connection.sourceHandle
  );
  const targetInput = targetTask.inputs.find(
    (input) => input.name === connection.targetHandle
  );

  //  Validate if the source output can connect to the target input based on compatibility rules (see: inputs-outputs.ts)
  return sourceOutput?.canConnectTo.some(
    (cannConnectInput) => cannConnectInput.name === targetInput?.name
  ) as boolean;
};

export const flowToExecutionPlan = async (
  nodes: FlowNode[],
  edges: Edge[]
): Promise<{
  executionPlan: WorkflowExecutionPlan;
  invalidInputs?: InvalidInputType[];
}> => {
  const entryNode = nodes.find(
    (node) => TASK_REGISTRY[node.data.taskType]?.isEntryPoint
  );

  if (!entryNode) throw new Error("TODO");

  const executionPlan: WorkflowExecutionPlan = {
    steps: [],
    creditsCost: 0,
  };
  const planned = new Set<string>();

  // || planned.size < nodes.length;
  for (
    let step = 1;
    step <= nodes.length && planned.size < nodes.length;
    step++
  ) {
    const nextStep:
      | WorkflowExecutionStep
      | { number?: number; node?: FlowNode } = {};

    for (const node of nodes) {
      // Node already put in the execution plan
      if (planned.has(node.id)) continue;

      const invalidInputs = getInvalidInputs(node, edges, planned);
      if (invalidInputs.length) {
        if (
          getIncomers(node, nodes, edges).every((incomer) =>
            planned.has(incomer.id)
          )
        ) {
          return { executionPlan, invalidInputs };
        } else continue;
      }

      nextStep.node = node;
    }

    if (nextStep.node) {
      planned.add(nextStep.node?.id);
      executionPlan.steps.push(nextStep as WorkflowExecutionStep);
      executionPlan.creditsCost +=
        CREDITS_COSTS.tasks[nextStep.node?.data?.taskType];
    }
  }

  return { executionPlan };
};

const getInvalidInputs = (
  node: FlowNode,
  edges: Edge[],
  planned: Set<string>
) => {
  const taskInputs = TASK_REGISTRY[node.data.taskType].inputs;
  const invalidInputs: { name: string; nodeId: string }[] = [];

  for (const taskInput of taskInputs) {
    if (!taskInput.required) continue; // Skip optional inputs

    const userValue = node.data.inputs[taskInput.name];
    if (userValue) continue; // Input is valid if the user provided a value

    const linkedOutput = edges.find(
      (edge) =>
        edge.target === node.id &&
        edge.targetHandle === taskInput.name &&
        planned.has(edge.source)
    );

    if (linkedOutput) continue; // Valid if output is linked from a planned node

    console.log(planned);
    invalidInputs.push({ name: taskInput.name, nodeId: node.id }); // Mark as invalid if all checks fail
  }

  return invalidInputs;
};
