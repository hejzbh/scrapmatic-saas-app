"use server";

import { useServerUser } from "@/features/(auth)/lib/useServerUser";
import db from "@/lib/db";
import { rateLimiter } from "@/lib/rateLimiter";

export async function deleteWorkflow(id: string) {
  try {
    await rateLimiter();

    const user = await useServerUser();

    if (!user) throw new Error("Unauthorized");

    await db.workflow.delete({
      where: {
        id,
        userId: user.id,
      },
    });
  } catch (err: any) {
    throw new Error("Cannot delete, something went wrong. Try again");
  }
}

export default deleteWorkflow;
