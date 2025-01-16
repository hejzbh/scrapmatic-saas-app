"use server";

import { useServerUser } from "@/features/(auth)/lib/useServerUser";
import db from "@/lib/db";
import { ExecutionStep, Workflow, WorkflowExecution } from "@prisma/client";

export type ExecutionWithSteps = WorkflowExecution & {
  steps: ExecutionStep[];
  workflow: Workflow;
};

export async function getExecutionDetails(
  executionId: string
): Promise<ExecutionWithSteps> {
  try {
    if (!executionId) throw new Error("Data is missing");

    const user = await useServerUser();

    if (!user) throw new Error("Unauthorized");

    const executionWithSteps = await db.workflowExecution.findFirst({
      where: {
        id: executionId,
        workflow: {
          userId: user.id,
        },
      },
      include: {
        steps: true,
        workflow: true,
      },
    });

    if (!executionWithSteps) throw new Error("Cannot get execution details");

    return executionWithSteps as ExecutionWithSteps;
  } catch (err: any) {
    throw new Error(err.message);
  }
}
