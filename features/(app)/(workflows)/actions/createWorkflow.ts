"use server";
import { useServerUser } from "@/features/(auth)/lib/useServerUser";
import db from "@/lib/db";
import { rateLimiter } from "@/lib/rateLimiter";
import { sanitize } from "@/lib/utils";
import { WorkflowFormData } from "@/types/global";
import {
  Workflow,
  WorkflowDefinitionEnum,
  WorkflowStatusEnum,
} from "@prisma/client";

export async function createWorkflow(
  data: WorkflowFormData
): Promise<Workflow> {
  try {
    await rateLimiter();

    const user = await useServerUser();

    if (!user) throw new Error("Unauthorized");

    const newWorkflow = await db.workflow.create({
      data: {
        userId: user.id,
        name: sanitize(data.name),
        description: data.description && sanitize(data.description),
        status: WorkflowStatusEnum.DRAFT,
        definition: WorkflowDefinitionEnum.TODO,
      },
    });

    if (!newWorkflow)
      throw new Error(
        "Something went wrong while creating a new workflow. Try again"
      );

    return newWorkflow;
  } catch (err: any) {
    throw new Error(
      err.message.includes("Workflow_name_userId_key")
        ? "You already have a workflow with the same name"
        : err.message
    );
  }
}

export default createWorkflow;
