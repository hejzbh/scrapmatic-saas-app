import { FlowNode } from "@/types/flow-nodes";
import { SetCenter } from "@xyflow/system";

export const centerNodeCard = (node: FlowNode, setCenter: SetCenter) => {
  if (!node) return;

  const { position, measured } = node;

  const x = position.x + measured?.width! / 2;
  const y = position.y + measured?.height! / 2;

  if (isNaN(x) || isNaN(y)) return;

  setCenter(x, y, {
    zoom: 1,
    duration: 500,
  });
};
