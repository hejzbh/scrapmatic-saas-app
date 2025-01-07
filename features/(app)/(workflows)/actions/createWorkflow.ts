"use server";
import { useServerUser } from "@/features/(auth)/lib/useServerUser";
import db from "@/lib/db";
import { rateLimiter } from "@/lib/rateLimiter";
import { sanitize } from "@/lib/utils";
import { WorkflowFormData } from "@/types/global";
import { Workflow, WorkflowStatusEnum } from "@prisma/client";
import { createNode } from "../features/(editor)/features/(nodes)/actions/createNode";
import { FlowNodeTaskType } from "@/types/flow-nodes";

export async function createWorkflow(
  data: WorkflowFormData
): Promise<Workflow> {
  try {
    await rateLimiter();

    const user = await useServerUser();

    if (!user) throw new Error("Unauthorized");

    const initialFlow = {
      nodes: [createNode(FlowNodeTaskType.LAUNCH_BROWSER)],
      edges: [],
    };

    const newWorkflow = await db.workflow.create({
      data: {
        userId: user.id,
        name: sanitize(data.name),
        description: data.description && sanitize(data.description),
        status: WorkflowStatusEnum.DRAFT,
        editorObjectJSON: JSON.stringify(initialFlow),
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
