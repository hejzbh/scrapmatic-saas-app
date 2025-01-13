import React, { memo, useMemo } from "react";
import { NodeProps, useReactFlow } from "@xyflow/react";
import { centerNodeCard } from "../lib/utils";
import { FlowNode } from "@/types/flow-nodes";
import NodeHeader from "./NodeHeader";
import NodeInputsList from "./NodeInputsList";
import { TASK_REGISTRY } from "../../../lib/taskRegistry";
import NodeOutputsList from "./NodeOutputsList";
import Separator from "@/components/ui/Separator";
import { useInvalidInputs } from "../hooks/use-invalid-inputs";

type NodeCardProps = NodeProps;

const NodeCard = (props: NodeCardProps) => {
  const { getNode, setCenter } = useReactFlow();
  const node = useMemo(() => getNode(props.id), [props.id, props.data?.inputs]);
  const task = useMemo(
    () => TASK_REGISTRY[(node as FlowNode)?.data.taskType],
    [node?.data?.taskType]
  );

  const { invalidInputs } = useInvalidInputs();

  if (!node) return null;

  const hasInvalidInput = useMemo(
    () => invalidInputs.some((input) => input.nodeId === node.id),
    [invalidInputs.length, node]
  );

  return (
    <div
      onDoubleClick={() => centerNodeCard(node as FlowNode, setCenter)}
      className={`rounded-md cursor-pointer bg-bgColors-node border-2 min-w-[420px] xl:min-w-[450px] text-xs gap-1 flex flex-col ${
        props.selected
          ? "border-borderColors-primary"
          : "border-borderColors-secondary"
      } ${hasInvalidInput && "!border-danger"}`}
    >
      <NodeHeader nodeId={node.id} dragging={props.dragging} task={task} />
      <NodeInputsList node={node as FlowNode} inputs={task.inputs || []} />
      <Separator />
      <NodeOutputsList node={node as FlowNode} outputs={task.outputs || []} />
    </div>
  );
};

export default memo(NodeCard);
