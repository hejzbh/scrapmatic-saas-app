"use server";

import { useServerUser } from "@/features/(auth)/lib/useServerUser";
import { PAGINATION_PER_PAGE } from "@/lib/const";
import db from "@/lib/db";
import {
  AuthUserType,
  PaginationObjectType,
  PaginationSearchParams,
} from "@/types/global";
import { Workflow } from "@prisma/client";

type Params = {} & PaginationSearchParams;

export async function getWorkflows(
  params: Params
): Promise<{ workflows: Workflow[]; pagination: PaginationObjectType }> {
  try {
    const user: AuthUserType = await useServerUser();

    if (!user) throw new Error("Unauthorized");

    const [workflows, workflowsCount] = await Promise.all([
      db.workflow.findMany({
        where: { userId: user.id },
        take: PAGINATION_PER_PAGE,
        skip: PAGINATION_PER_PAGE * (Number(params.page) - 1),
        orderBy: {
          createdAt: "desc",
        },
      }),
      db.workflow.count({ where: { userId: user.id } }),
    ]);

    return {
      workflows,
      pagination: {
        count: workflowsCount,
      },
    };
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export default getWorkflows;
