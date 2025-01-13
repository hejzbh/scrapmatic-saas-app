"use server";

import { useServerUser } from "@/features/(auth)/lib/useServerUser";
import db from "@/lib/db";
import { ExecutionPhase, Workflow, WorkflowExecution } from "@prisma/client";

export type ExecutionWithPhases = WorkflowExecution & {
  phases: ExecutionPhase[];
  workflow: Workflow;
};

export async function getExecutionDetails(
  executionId: string
): Promise<ExecutionWithPhases> {
  try {
    if (!executionId) throw new Error("Data is missing");

    const user = await useServerUser();

    if (!user) throw new Error("Unauthorized");

    const executionWithPhases = await db.workflowExecution.findFirst({
      where: {
        id: executionId,
        workflow: {
          userId: user.id,
        },
      },
      include: {
        phases: true,
        workflow: true,
      },
    });

    if (!executionWithPhases) throw new Error("Cannot get execution details");

    return executionWithPhases as ExecutionWithPhases;
  } catch (err: any) {
    throw new Error(err.message);
  }
}
