import React from "react";
import getWorkflows from "../actions/getWorkflows";
import Pagination from "@/components/Pagination";
import { WorkflowsSearchParams } from "@/app/(main)/app/workflows/page";
import NoResults from "@/components/ui/NoResults";
import WorkflowCard from "./WorkflowCard";

type WorkflowsListProps = {
  className?: string;
  searchParams: WorkflowsSearchParams;
};

export const WorkflowsList = async ({
  className,
  searchParams,
}: WorkflowsListProps) => {
  const { workflows, pagination } = await getWorkflows({ ...searchParams });

  if (!workflows) return "Error";

  if (!workflows.length)
    return (
      <NoResults
        title="No workflow created yet"
        description="Click the button below to create your first workflow"
        buttonProps={{
          children: "Create your first workflow",
          variant: "primary",
          modal: { name: "createWorkflow" },
        }}
      />
    );

  return (
    <div className={`${className}`}>
      <ul className="grid gap-10 grid-cols-1 md:grid-cols-2 2k:grid-cols-3">
        {workflows?.map((workflow) => (
          <li className="h-full" key={workflow.id}>
            <WorkflowCard workflow={workflow} className="h-full" />
          </li>
        ))}
      </ul>
      <Pagination
        className="mt-10 flex justify-center"
        count={pagination.count}
        searchParams={searchParams}
      />
    </div>
  );
};

export const WorkflowsListSkeleton = ({
  className = "",
}: {
  className?: string;
}) => {
  return (
    <ul
      className={`gap-10 grid grid-cols-1 md:grid-cols-2 2k:grid-cols-3 ${className}`}
    >
      {Array.from({ length: 4 })?.map((_, idx) => (
        <li key={idx} className="p-10 w-full bg-modalGradient rounded-3xl"></li>
      ))}
    </ul>
  );
};

export default WorkflowsList;
