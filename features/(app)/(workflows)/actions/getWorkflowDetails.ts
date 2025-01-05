"use server";
import { useServerUser } from "@/features/(auth)/lib/useServerUser";
import db from "@/lib/db";
import { AuthUserType } from "@/types/global";
import { Workflow } from "@prisma/client";

export async function getWorkflowDetails(id: string): Promise<Workflow> {
  try {
    const user: AuthUserType = await useServerUser();

    if (!user) throw new Error("Unauthorized");

    const workflow = await db.workflow.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!workflow) throw new Error("Workflow does not exists");

    return workflow;
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export default getWorkflowDetails;
