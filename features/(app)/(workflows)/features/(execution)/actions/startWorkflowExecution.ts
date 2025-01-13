export async function startWorkflowExecution(executionId: string) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_SERVER_URL! + "/run-workflow",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ executionId: executionId }),
    }
  );

  const data = await response.json();

  console.log(data);
}
