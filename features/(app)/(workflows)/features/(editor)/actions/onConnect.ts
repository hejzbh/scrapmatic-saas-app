import { addEdge, Connection } from "@xyflow/react";
import { SetEdgesType } from "../components/WorkflowEditor";
import { FlowNode } from "@/types/flow-nodes";

export default function onConnect(
  connection: Connection,
  setEdges: SetEdgesType,
  nodes: FlowNode[],
  updateNodeData: (...props: any) => void //eslint-disable-line
) {
  setEdges((edges) => addEdge({ ...connection, animated: true }, edges));

  // Clear value from input if it exists
  if (!connection.targetHandle) return;

  const node = nodes.find((node) => node.id === connection.target);

  if (!node) return;

  updateNodeData(node.id, {
    inputs: {
      ...(node.data.inputs || {}),
      [connection.targetHandle]: "",
    },
  });
}
