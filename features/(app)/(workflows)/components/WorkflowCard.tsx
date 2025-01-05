"use client";
import { Workflow } from "@prisma/client";
import React from "react";
import Text from "@/components/ui/Text";
import WorkflowStatusBadge from "./WorkflowStatusBadge";
import { timeAgo, truncString } from "@/lib/utils";
import Dropdown from "@/components/ui/DropdownMenu";
import Link from "next/link";
import { useModals } from "@/hooks/use-modals";
import { routes } from "@/lib/routes";

type WorkflowCardProps = {
  className?: string;
  workflow: Workflow;
};

const WorkflowCard = ({ className = "", workflow }: WorkflowCardProps) => {
  const { openModal } = useModals();

  return (
    <Link
      href={routes.app.workflowEditor(workflow.id)}
      className={`rounded-xl py-4 px-6 border-[1px] bg-bgColors-primary dark:opacity-75 active:opacity-100 hover:md:opacity-100 transition border-borderColors-primary  flex flex-col justify-between  ${className}`}
    >
      <div className="mb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {" "}
            <Text className="text-textColors-primary" withoutDefaultClass>
              {truncString(workflow.name, 25)}
            </Text>
            <WorkflowStatusBadge status={workflow.status} />
          </div>

          <Dropdown
            className="dropdown"
            options={[
              {
                name: "Edit",
                onClick: () => {
                  openModal("editWorkflow", { workflow });
                },
              },
              {
                name: "Delete",
                onClick: () => {
                  openModal("deleteWorkflow", { workflow });
                },
                className: "!bg-danger/40 hover:!bg-danger/100 text-white",
              },
            ]}
          />
        </div>

        {workflow.description && (
          <Text
            size="sm"
            className="text-textColors-secondary md:max-w-[80%]"
            withoutDefaultClass
          >
            {truncString(workflow.description, 100)}
          </Text>
        )}
      </div>

      <Text size="xs" className="!text-textColors-muted">
        {timeAgo(workflow.createdAt)}
      </Text>
    </Link>
  );
};

export default WorkflowCard;
