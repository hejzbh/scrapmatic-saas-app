import React from "react";
import { ExecutionDetailsProvider } from "@/features/(app)/(workflows)/features/(execution)/components/providers/ExecutionDetailsProvider";
import { getExecutionDetails } from "@/features/(app)/(workflows)/features/(execution)/actions/getExecutionDetails";
import ExecutionStepsList from "@/features/(app)/(workflows)/features/(execution)/components/ExecutionStepsList";
import ExecutionOverview from "@/features/(app)/(workflows)/features/(execution)/components/ExecutionOverview";

type Props = {
  params: Promise<{ workflowId: string; executionId: string }>;
};

const ExecutionPage = async ({ params }: Props) => {
  const { executionId } = await params;

  const executionDetails = await getExecutionDetails(executionId);

  return (
    <ExecutionDetailsProvider execution={executionDetails}>
      <ExecutionOverview />
      <ExecutionStepsList />
    </ExecutionDetailsProvider>
  );
};

export default ExecutionPage;
