"use client";
import React from "react";
import { TaskOutputObject } from "@/types/flow-nodes";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { FlowNode } from "@/types/flow-nodes";
import Text from "@/components/ui/Text";
import { handleColors } from "../../../lib/tasks";

type NodeOutputProps = {
  className?: string;
  output: TaskOutputObject;
  node: FlowNode;
};

const NodeOutput = ({ className = "", output }: NodeOutputProps) => {
  const { updateNodeData } = useReactFlow();

  return (
    <div
      className={`p-4 bg-bgColors-secondary rounded-md relative flex  justify-end${className}`}
    >
      <Text size="sm">{output.label}</Text>

      {!output.hideHandle && (
        <Handle
          id={output.name}
          position={Position.Right}
          type="source"
          className={`!h-3 !w-3 ${handleColors[output.type]}`}
        />
      )}
    </div>
  );
};

export default NodeOutput;
