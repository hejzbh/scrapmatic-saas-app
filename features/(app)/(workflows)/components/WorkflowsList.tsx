import React from "react";
import getWorkflows from "../actions/getWorkflows";
import Pagination from "@/components/Pagination";
import { WorkflowsSearchParams } from "@/app/(main)/app/workflows/page";

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

  console.log(workflows, pagination);

  return (
    <div className={`${className}`}>
      <Pagination count={pagination.count} searchParams={searchParams} />
    </div>
  );
};

export const WorkflowsListSkeleton = ({
  className = "",
}: {
  className?: string;
}) => {
  return (
    <ul className={`space-y-5 ${className}`}>
      {Array.from({ length: 4 })?.map((_, idx) => (
        <li key={idx} className="p-5 w-full bg-gray-400"></li>
      ))}
    </ul>
  );
};

export default WorkflowsList;
