"use server";
import db from "@/lib/db";
import { WorkflowExecutionPlan } from "@/types/execution";
import { getSession } from "@auth0/nextjs-auth0";
import {
  ExecutionStepStatusEnum,
  WorkflowExecutionStatusEnum,
} from "@prisma/client";

export async function createWorkflowExecution(
  workflowId: string,
  executionPlan: WorkflowExecutionPlan
) {
  try {
    // Validate params
    if (!workflowId || !executionPlan) {
      throw new Error("Data is missing");
    }

    // Check is user authenticated
    const session = await getSession();

    if (!session?.user || !session?.user?.sub) throw new Error("Unauthorized");

    // Create execution
    // TODO: Move to the backend
    // TODO: Skontati kako handlovati credits, onemoguiciti kreiranje execution ako nema dovoljno kredita za sve steps npr (po task_name to uzmemo)

    const execution = await db.workflowExecution.create({
      data: {
        workflowId,
        userId: session.user.sub,
        status: WorkflowExecutionStatusEnum.PENDING,
        steps: {
          create: executionPlan.steps.map((step) => {
            return {
              userId: session.user.sub,
              status: ExecutionStepStatusEnum.CREATED,
              nodeId: step.node.id,
              taskType: step.taskType,
              number: step.number,
            };
          }),
        },
        creditsCost: executionPlan.creditsCost,
      },
      select: {
        id: true,
        steps: true,
      },
    });

    if (!execution)
      throw new Error(
        "Something went wrong while trying to create a execution!"
      );

    return execution as { id: string };
  } catch (err: any) {
    throw new Error(err.message);
  }
}
