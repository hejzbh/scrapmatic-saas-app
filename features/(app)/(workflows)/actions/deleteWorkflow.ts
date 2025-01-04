"use server";

import db from "@/lib/db";

export async function deleteWorkflow(id: string) {
  try {
    await db.workflow.delete({
      where: {
        id,
      },
    });
  } catch (err: any) {
    throw new Error("Cannot delete, something went wrong. Try again");
  }
}

export default deleteWorkflow;
