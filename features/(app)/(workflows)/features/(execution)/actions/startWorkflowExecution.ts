import { useServerUser } from "@/features/(auth)/lib/useServerUser";

export async function startWorkflowExecution(executionId: string) {
  const user = await useServerUser();

  if (!user) throw new Error("Unauthorized");

  const response = await fetch(
    process.env.NEXT_PUBLIC_SERVER_URL! + "/run-workflow",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ executionId: executionId, userId: user.id }),
    }
  );

  const data = await response.json();

  return data;
}
