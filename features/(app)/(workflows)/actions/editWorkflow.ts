"use server";

import { useServerUser } from "@/features/(auth)/lib/useServerUser";
import db from "@/lib/db";
import { Workflow } from "@prisma/client";

export async function editWorkflow(id: string, newData: Partial<Workflow>) {
  try {
    const user = await useServerUser();

    if (!user) throw new Error("Unauthorized");

    const updatedWorkflow: Workflow = await db.workflow.update({
      where: {
        id,
        userId: user.id,
      },
      data: newData,
    });

    return updatedWorkflow;
  } catch (err: any) {
    err.message.includes("Workflow_name_userId_key")
      ? "You already have a workflow with the same name"
      : err.message;
  }
}

export default editWorkflow;
