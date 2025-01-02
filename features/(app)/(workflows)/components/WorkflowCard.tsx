import { Workflow } from "@prisma/client";
import React from "react";
import Text from "@/components/ui/Text";
import WorkflowStatusBadge from "./WorkflowStatusBadge";
import { timeAgo, truncString } from "@/lib/utils";

type WorkflowCardProps = {
  className?: string;
  workflow: Workflow;
};

const WorkflowCard = ({ className = "", workflow }: WorkflowCardProps) => {
  return (
    <div
      style={{ background: "linear-gradient(#6155c810, #6155c805 50%)" }}
      className={`rounded-xl py-4 px-6 border-[1px] border-borderColors-primary  ${className}`}
    >
      <div className="mb-5">
        <div className="flex items-center space-x-2">
          {" "}
          <Text className="!text-textColors-primary">
            {truncString(workflow.name, 25)}
          </Text>
          <WorkflowStatusBadge status={workflow.status} />
        </div>

        {workflow.description && (
          <Text size="sm">{truncString(workflow.description, 60)}</Text>
        )}
      </div>

      <Text size="xs">{timeAgo(workflow.createdAt)}</Text>
    </div>
  );
};

export default WorkflowCard;
