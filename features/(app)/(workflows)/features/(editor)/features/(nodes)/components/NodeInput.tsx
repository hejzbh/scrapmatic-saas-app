"use client";
import React, { useMemo } from "react";
import { TaskInputObject, TaskParamEnum } from "@/types/flow-nodes";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import Text from "@/components/ui/Text";
import { FlowNode } from "@/types/flow-nodes";
import { useDebounce } from "@/hooks/use-debounce";
import { handleColors } from "../../../lib/tasks";

type NodeInputProps = {
  className?: string;
  input: TaskInputObject;
  node: FlowNode;
};

const NodeInput = ({ className = "", input, node }: NodeInputProps) => {
  const { updateNodeData, getEdges } = useReactFlow(); // Provides method to update node data in the flow.
  const edges = getEdges();

  const isConnectedWithOutput = useMemo(() => {
    return edges.some(
      (edge) => edge.target === node.id && edge.targetHandle === input.name
    );
  }, [node.id, edges]);

  const { value, setValue } = useDebounce({
    initialValue: node.data?.inputs?.[input.name],
    delay: 400,
    onDebouncedValue: (value) => {
      if (isConnectedWithOutput) return;
      // Updates node data after debounce delay.
      updateNodeData(node.id, {
        inputs: {
          ...node.data.inputs,
          [input.name]: value,
        },
      });
    },
  });

  return (
    <div
      className={`p-4 bg-bgColors-secondary rounded-md relative flex flex-col ${className}`}
    >
      {/* Label for the input */}
      <Label textSize="sm" className="mb-2" required={input.required}>
        {input.label}
      </Label>

      {/* Render input field based on input type */}
      {input.type === TaskParamEnum.STRING ? (
        <div>
          <Input
            name={input.name}
            value={value}
            onChange={(e) => {
              // Prevent value from exceeding 150 characters.
              if (e.target.value.length >= 150) return;

              setValue(e.target.value);
            }}
            disabled={isConnectedWithOutput}
            placeholder={input.placeholder}
            required={input.required}
            className="!bg-bgColors-primary"
          />
        </div>
      ) : input.type === TaskParamEnum.WEB_PAGE ? (
        <div></div>
      ) : null}

      {/* Optional helper text */}
      {input.helperText && (
        <Text size="xs" className="text-textColors-secondary mt-2 ml-2">
          {input.helperText}
        </Text>
      )}

      {/* Connection handle for linking nodes */}
      {!input.hideHandle && (
        <Handle
          isConnectable={!isConnectedWithOutput}
          id={input.name}
          position={Position.Left}
          type="target"
          className={`!h-3 !w-3 ${handleColors[input.type]}`}
        />
      )}
    </div>
  );
};

export default NodeInput;
