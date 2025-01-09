import { FlowNode } from "@/types/flow-nodes";
import { Connection } from "@xyflow/react";
import { TASK_REGISTRY } from "./taskRegistry";

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
  );
};
