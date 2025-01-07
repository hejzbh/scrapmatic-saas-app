import React from "react";

import { TaskOutputObject } from "@/types/flow-nodes";
import { FlowNode } from "@/types/flow-nodes";
import NodeOutput from "./NodeOutput";
import Text from "@/components/ui/Text";

type NodeOutputsListProps = {
  className?: string;
  outputs: TaskOutputObject[];
  node: FlowNode;
};

const NodeOutputsList = ({
  className = "",
  outputs,
  node,
}: NodeOutputsListProps) => {
  return (
    <ul className={`space-y-2 p-2 ${className}`}>
      <li>
        <Text size="xs">Outputs</Text>
      </li>
      {outputs?.map((output) => (
        <li key={output.name}>
          <NodeOutput output={output} node={node} />
        </li>
      ))}
    </ul>
  );
};

export default NodeOutputsList;
