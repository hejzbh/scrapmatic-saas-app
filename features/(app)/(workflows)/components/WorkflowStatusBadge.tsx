import Text from "@/components/ui/Text";
import { Workflow, WorkflowStatusEnum } from "@prisma/client";
import React from "react";

type WorkflowStatusBadgeProps = {
  className?: string;
  status: Workflow["status"];
};

export const workflowStatusColor = {
  [WorkflowStatusEnum.DRAFT]: "bg-[#D5973C]/60 text-white",
  [WorkflowStatusEnum.PUBLISHED]: "bg-[green] text-white",
};

const WorkflowStatusBadge = ({
  className = "",
  status,
}: WorkflowStatusBadgeProps) => {
  return (
    <div
      className={`px-3 py-1 rounded-3xl ${workflowStatusColor[status]} ${className}`}
    >
      <Text size="xs" className="!text-[11.5px]" withoutDefaultClass>
        {status.toUpperCase()}
      </Text>
    </div>
  );
};

export default WorkflowStatusBadge;
