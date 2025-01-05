import React from "react";
import { TaskFieldObject } from "@/features/(app)/(workflows)/features/(editor)/lib/tasks";
import NodeField from "./NodeField";
import { FlowNode } from "@/types/flow-nodes";

type NodeFieldsProps = {
  className?: string;
  fields: TaskFieldObject[];
  node: FlowNode;
};

const NodeFieldsList = ({ className = "", fields, node }: NodeFieldsProps) => {
  return (
    <ul className={`space-y-2 p-2 ${className}`}>
      {fields?.map((field) => (
        <li key={field.name}>
          <NodeField field={field} node={node} />
        </li>
      ))}
    </ul>
  );
};

export default NodeFieldsList;
