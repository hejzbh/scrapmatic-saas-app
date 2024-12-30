import PageHeading from "@/components/ui/PageHeading";
import {
  WorkflowsList,
  WorkflowsListSkeleton,
} from "@/features/(app)/(workflows)/components/WorkflowsList";
import { PaginationSearchParams } from "@/types";
import React, { Suspense } from "react";
import { RiAddLargeLine } from "react-icons/ri";

export type WorkflowsSearchParams = PaginationSearchParams;
type WorkflowsPageProps = {
  searchParams: Promise<WorkflowsSearchParams>;
};

async function WorkflowsPage({
  searchParams: searchParamsPromise,
}: WorkflowsPageProps) {
  const searchParams: WorkflowsSearchParams = await searchParamsPromise;
  searchParams.page ??= "1";

  return (
    <div className="text-white">
      <PageHeading
        title="Workflows"
        description="Manage your workflows"
        buttonProps={{
          variant: "primary",
          className: "!p-3 md:!p-4",
          children: <RiAddLargeLine className="text-lg md:text-xl" />,
        }}
      />
      <Suspense fallback={<WorkflowsListSkeleton />}>
        <WorkflowsList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

export default WorkflowsPage;
