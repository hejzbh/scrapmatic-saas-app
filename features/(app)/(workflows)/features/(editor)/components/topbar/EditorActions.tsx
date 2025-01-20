"use client";
import React, { useState } from "react";
import Button from "@/components/ui/Button";
import { CiPlay1 } from "react-icons/ci";
import { IoSaveOutline } from "react-icons/io5";
import { useReactFlow } from "@xyflow/react";
import useToats from "@/hooks/use-toats";
import editWorkflow from "@/features/(app)/(workflows)/actions/editWorkflow";
import { useGenerateExecution } from "../../hooks/use-generate-execution";
import { createWorkflowExecution } from "../../actions/createWorkflowExecution";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";
import { WorkflowStatusEnum } from "@prisma/client";
import { useUserBalance } from "@/features/(app)/(balance)/hooks/use-user-balance";

interface EditorActionsProps {
  className?: string;
  workflowId: string;
}

const EditorActions = ({ className = "", workflowId }: EditorActionsProps) => {
  const { toObject } = useReactFlow();
  const { addToast } = useToats();
  const generateExecutionPlan = useGenerateExecution();
  const [pending, setPending] = useState({
    handleSave: false,
    handlePlay: false,
    handlePublish: false,
  });
  const { availableCredits } = useUserBalance();
  const router = useRouter();

  function handlePlay() {
    // Indicate the play operation is in progress
    setPending((loadings) => ({ ...loadings, handlePlay: true }));

    generateExecutionPlan()
      .then(async (executionPlan) => {
        // Ensure an execution plan is generated
        if (!executionPlan) return;

        // Validate the execution plan has at least two tasks
        if (executionPlan.steps.length < 2)
          throw new Error("Please add at least two tasks to your workflow");

        // Check does user have enough credits to run this execution
        if (availableCredits < executionPlan.creditsCost) {
          throw new Error("Insufficient credits to run this workflow");
        }

        // Save the workflow data before execution
        handleSave({ showToast: false });
        handlePublish({ showToast: false });

        // Run the workflow with the generated execution plan
        return createWorkflowExecution(workflowId, executionPlan);
      })
      .then((execution) => {
        // Ensure execution started successfully
        if (!execution) throw new Error("Something went wrong");

        // Notify user and navigate to the execution details page
        addToast("Execution started...", "info");
        router.push(
          routes.app.workflowExecutionDetails(workflowId, execution.id)
        );
      })
      .catch((err) => {
        // Handle errors during the process
        addToast(err.message, "error");
      })
      .finally(() => {
        // Reset the play operation state
        setPending((loadings) => ({ ...loadings, handlePlay: false }));
      });
  }

  function handleSave(params?: { showToast?: boolean }) {
    // Prevent save operation if already in progress
    if (pending.handleSave) return;

    // Indicate the save operation is in progress
    setPending((loadings) => ({ ...loadings, handleSave: true }));

    editWorkflow(workflowId, { editorObjectJSON: JSON.stringify(toObject()) })
      .then(() => {
        // Optionally show a success message
        if (!params?.showToast) return;
        addToast("You've successfully saved workflow editor data", "success");
      })
      .catch((err) => {
        // Handle errors during the save operation
        addToast(err.message, "error");
      })
      .finally(() => {
        // Reset the save operation state
        setPending((loadings) => ({ ...loadings, handleSave: false }));
      });
  }

  function handlePublish(params?: { showToast?: boolean }) {
    // Prevent publish operation if already in progress
    if (pending.handlePublish) return;

    // Indicate the handle operation is in progress
    setPending((loadings) => ({ ...loadings, handlePublish: true }));

    editWorkflow(workflowId, { status: WorkflowStatusEnum.PUBLISHED })
      .then(() => {
        // Optionally show a success message
        if (!params?.showToast) return;
        addToast("You've successfully published workflow", "success");
      })
      .catch((err) => {
        // Handle errors during the publish operation
        addToast(err.message, "error");
      })
      .finally(() => {
        // Reset the publish operation state
        setPending((loadings) => ({ ...loadings, handlePublish: false }));
      });
  }

  return (
    <div className={`flex items-center space-x-5 ${className}`}>
      <Button
        onClick={handlePlay}
        variant="secondary"
        disabled={pending.handlePlay}
        loading={pending.handlePlay}
        className="flex items-center hover:!bg-danger group"
      >
        <CiPlay1 className="mr-2 text-xl text-danger group-hover:text-white" />{" "}
        Play
      </Button>
      <Button
        onClick={() => handleSave({ showToast: true })}
        variant="secondary"
        disabled={pending.handleSave}
        className="flex items-center"
        loading={pending.handleSave}
      >
        <IoSaveOutline className="text-xl mr-2 text-success" /> Save
      </Button>
      <Button
        onClick={() => handlePublish({ showToast: true })}
        disabled={pending.handlePublish}
        loading={pending.handlePublish}
        variant="primary"
      >
        Publish
      </Button>
    </div>
  );
};

export default EditorActions;
