import { useServerUser } from "@/features/(auth)/lib/useServerUser";

export async function startWorkflowExecution(executionId: string) {
  try {
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

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (err: any) {
    console.log(err.message);
    console.log("👿👿👿👿👿");
    throw new Error(err.message);
  }
}
