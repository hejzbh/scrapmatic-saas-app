import React from "react";
import Title from "@/components/ui/Title";
import Badge from "@/components/ui/Badge";
import { PiCoinsLight } from "react-icons/pi";

import { FlowNode, FlowNodeTaskObject } from "@/types/flow-nodes";
import Dropdown from "@/components/ui/DropdownMenu";
import { useReactFlow } from "@xyflow/react";
import { createNode } from "../actions/createNode";
const NodeHeader = ({
  task,
  nodeId,
  className,
}: {
  task: FlowNodeTaskObject;
  className?: string;
  dragging?: boolean;
  nodeId: string;
}) => {
  const { deleteElements, addNodes, getNode } = useReactFlow();

  if (!task) return null;

  return (
    <div className={`p-4 flex items-center justify-between ${className}`}>
      {/** Icon & Label */}
      <div className="flex items-center space-x-2">
        <task.Icon {...(task.iconProps || {})} />
        <Title variant="h2" size="xs" className="uppercase opacity-80">
          {task.label}
        </Title>
      </div>

      {/** Badges & Drag handler */}
      <div className="flex items-center space-x-2">
        {task.isEntryPoint && <Badge>Entry point</Badge>}
        <Badge>
          <PiCoinsLight className="text-xl" /> {task.credits}
        </Badge>
        {/**        <button title="Drag" className="node-drag-handler">
          <FaRegHandPaper
            className={`text-[25px] transition ${
              dragging
                ? "text-textColors-active scale-[125%]"
                : "text-textColors-muted hover:text-textColors-active"
            }`}
          />
        </button> */}
        {!task.isEntryPoint && (
          <Dropdown
            className="dropdown"
            options={[
              {
                name: "Duplicate",
                onClick: () => {
                  const node = getNode(nodeId);
                  addNodes(
                    createNode(
                      task.type,
                      node && {
                        x: node?.position?.x + 70,
                        y: node?.position.y - 100,
                      }
                    )
                  );
                },
              },
              {
                name: "Delete",
                onClick: () => {
                  deleteElements({
                    nodes: [{ id: nodeId }],
                  });
                },
                className: "!bg-danger/40 hover:!bg-danger/100 text-white",
              },
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default NodeHeader;
