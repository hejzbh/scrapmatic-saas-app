"use client";
import React from "react";
import { TaskInputObject } from "@/types/flow-nodes";
import NodeInput from "./NodeInput";
import { FlowNode } from "@/types/flow-nodes";
import Text from "@/components/ui/Text";

type NodeInputsListpProps = {
  className?: string;
  inputs: TaskInputObject[];
  node: FlowNode;
};

const NodeInputsList = ({
  className = "",
  inputs,
  node,
}: NodeInputsListpProps) => {
  return (
    <ul className={`space-y-2 p-2 ${className}`}>
      <li>
        <Text size="xs">Inputs</Text>
      </li>
      {inputs?.map((input) => (
        <li key={input.name}>
          <NodeInput input={input} node={node} />
        </li>
      ))}
    </ul>
  );
};

export default NodeInputsList;
