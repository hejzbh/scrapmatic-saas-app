import React from "react";
import WorkflowEditor from "@/features/(app)/(workflows)/features/(editor)/components/WorkflowEditor";
import WorkflowEditorProvider from "@/features/(app)/(workflows)/features/(editor)/components/providers/WorkflowEditorProvider";
import getWorkflowDetails from "@/features/(app)/(workflows)/actions/getWorkflowDetails";

interface EditorPageProps {
  params: Promise<{ workflowId: string }>;
}

const WorkflowEditorPage = async ({ params }: EditorPageProps) => {
  const { workflowId } = await params;

  if (!workflowId) throw new Error("There is no workflow id in params.");

  const workflow = await getWorkflowDetails(workflowId);

  return (
    <WorkflowEditorProvider>
      <WorkflowEditor workflow={workflow} />
    </WorkflowEditorProvider>
  );
};

export default WorkflowEditorPage;
