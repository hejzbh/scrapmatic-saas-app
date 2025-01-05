"use client";
import React from "react";
import { TaskFieldObject, TaskFieldType } from "../../../lib/tasks";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import Text from "@/components/ui/Text";
import { FlowNode } from "@/types/flow-nodes";

type NodeFieldProps = {
  className?: string;
  field: TaskFieldObject;
  node: FlowNode;
};

const NodeField = ({ className = "", field, node }: NodeFieldProps) => {
  const { updateNodeData } = useReactFlow();
  const value = node.data?.values?.[field.name];

  return (
    <div
      className={`p-4 bg-bgColors-secondary rounded-md relative flex  flex-col ${className}`}
    >
      <Label textSize="sm" className="mb-2" required={field.required}>
        {field.label}
      </Label>
      {field.type === TaskFieldType.INPUT ? (
        <div>
          <Input
            name={field.name}
            value={value}
            onChange={(e) => {
              const { value, name } = e.target;
              console.log(node, value, name);
              updateNodeData(node.id, {
                values: {
                  ...node.data.values,
                  [name]: value,
                },
              });
            }}
            placeholder={field.placeholder}
            required={field.required}
            className="!bg-bgColors-primary"
          />
        </div>
      ) : null}

      {field.helperText && (
        <Text size="xs" className="text-textColors-secondary mt-2 ml-4">
          {field.helperText}
        </Text>
      )}

      {!field.hideHandle && (
        <Handle
          id={field.name}
          position={Position.Left}
          type="target"
          className="!bg-[limegreen] !h-3 !w-3"
        />
      )}
    </div>
  );
};

export default NodeField;
