import { SetNodesType } from "../../../components/WorkflowEditor";

export const revalidateNode = (
  setNodes: SetNodesType,
  edgeNodeTarget: string
) => {
  setNodes((nodes) =>
    nodes.map((node) =>
      node.id === edgeNodeTarget
        ? {
            ...node,
            position: { x: node.position.x + 1, y: node.position.y },
          }
        : node
    )
  );
  setTimeout(() => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === edgeNodeTarget
          ? {
              ...node,
              position: {
                x: node.position.x - 1,
                y: node.position.y,
              },
            }
          : node
      )
    );
  }, 5);
};
