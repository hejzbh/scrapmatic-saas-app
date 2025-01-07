"use client";
import { FlowNodeTaskType } from "@/types/flow-nodes";
import React from "react";
import { TASK_REGISTRY } from "../../lib/taskRegistry";
import Text from "@/components/ui/Text";
import { useReactFlow } from "@xyflow/react";
import { createNode } from "../../features/(nodes)/actions/createNode";

interface TaskCardProps {
  className?: string;
  type: FlowNodeTaskType;
}

const TaskCard = ({ className = "", type }: TaskCardProps) => {
  const task = TASK_REGISTRY[type];
  const { setNodes } = useReactFlow();

  function onDragStart(e: React.DragEvent<HTMLElement>) {
    e.dataTransfer.setData("workflow/task", type);
  }

  if (!task) return null;
  return (
    <article
      onDragStart={onDragStart}
      onClick={() =>
        setNodes((nodes) => [
          ...nodes,
          createNode(type, {
            x: nodes[nodes.length - 1]?.position.x + 650,
            y: nodes[nodes.length - 1]?.position.y,
          }),
        ])
      }
      draggable
      onDragOver={(e) => e.preventDefault()}
      onDragEnd={(e) => e.preventDefault()}
      className={`p-4 rounded-xl bg-bgColors-node flex items-center space-x-3 cursor-pointer transition hover:md:opacity-80 ${className}`}
    >
      <task.Icon {...task.iconProps} />
      <Text size="sm" className="!text-textColors-primary">
        {task.label}
      </Text>
    </article>
  );
};

export default TaskCard;
