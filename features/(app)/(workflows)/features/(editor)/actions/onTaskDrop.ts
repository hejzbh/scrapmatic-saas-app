import { createNode } from "@/features/(app)/(workflows)/features/(editor)/features/(nodes)/actions/createNode";
import { FlowNodeTaskType } from "@/types/flow-nodes";
import { SetNodesType } from "../components/WorkflowEditor";

export default function onTaskDrop(
  e: React.DragEvent<HTMLDivElement>,

  {
    screenToFlowPosition,
    setNodes,
  }: { screenToFlowPosition: (props: any) => any; setNodes: SetNodesType & any }
) {
  e.preventDefault();

  const taskType = e.dataTransfer.getData("workflow/task");

  if (!taskType) return;

  const newNode = createNode(
    taskType as FlowNodeTaskType,
    screenToFlowPosition({
      x: e.clientX,
      y: e.clientY,
    })
  );

  (setNodes as SetNodesType)((nodes) => {
    return [...nodes, newNode];
  });
}
