import React from "react";
import { ExecutionDetailsProvider } from "@/features/(app)/(workflows)/features/(execution)/components/providers/ExecutionDetailsProvider";
import { getExecutionDetails } from "@/features/(app)/(workflows)/features/(execution)/actions/getExecutionDetails";
import ExecutionStepsList from "@/features/(app)/(workflows)/features/(execution)/components/ExecutionStepsList";
import ExecutionOverview from "@/features/(app)/(workflows)/features/(execution)/components/ExecutionOverview";
import Text from "@/components/ui/Text";

type Props = {
  params: Promise<{ workflowId: string; executionId: string }>;
};

const ExecutionPage = async ({ params }: Props) => {
  const { executionId } = await params;

  const executionDetails = await getExecutionDetails(executionId);

  return (
    <ExecutionDetailsProvider execution={executionDetails}>
      <Text className="!text-info mb-5" size="md">
        INFO: If a workflow execution fails, all credits will be automatically
        refunded to your balance.
      </Text>

      <ExecutionOverview />
      <ExecutionStepsList />
    </ExecutionDetailsProvider>
  );
};

export default ExecutionPage;
