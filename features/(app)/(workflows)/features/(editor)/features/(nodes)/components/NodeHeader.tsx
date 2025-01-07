import React from "react";
import Title from "@/components/ui/Title";
import Badge from "@/components/ui/Badge";
import { PiCoinsLight } from "react-icons/pi";
import { FaRegHandPaper } from "react-icons/fa";
import { FlowNodeTaskObject } from "@/types/flow-nodes";
const NodeHeader = ({
  task,
  className,
  dragging,
}: {
  task: FlowNodeTaskObject;
  className?: string;
  dragging?: boolean;
}) => {
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
          <PiCoinsLight className="text-xl" /> 2
        </Badge>
        <button title="Drag" className="node-drag-handler">
          <FaRegHandPaper
            className={`text-[25px] transition ${
              dragging
                ? "text-textColors-active scale-[125%]"
                : "text-textColors-muted hover:text-textColors-active"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default NodeHeader;
