import { FlowNode } from "@/types/flow-nodes";
import { Connection } from "@xyflow/react";
import { TASK_REGISTRY } from "./taskRegistry";

export const isConnectionValid = (
  connection: Connection,
  nodes: FlowNode[]
) => {
  const sourceNode = nodes.find((node) => node.id === connection.source);
  const targetNode = nodes.find((node) => node.id === connection.target);

  if (!sourceNode || !targetNode) return false;

  const sourceTask = TASK_REGISTRY[sourceNode.data.taskType];
  const targetTask = TASK_REGISTRY[targetNode.data.taskType];

  if (!sourceTask || !targetTask) return false;

  const sourceOutput = sourceTask.outputs.find(
    (output) => output.name === connection.sourceHandle
  );
  const targetInput = targetTask.inputs.find(
    (input) => input.name === connection.targetHandle
  );

  if (
    sourceOutput?.canConnectTo.some(
      (cannConnectInput) => cannConnectInput.name === targetInput?.name
    )
  )
    return true;

  return false;
};
