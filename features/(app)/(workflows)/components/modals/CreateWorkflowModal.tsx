import ModalHeading from "@/components/ui/ModalHeading";
import React from "react";
import Form from "@/components/form/Form";
import { workflowFormFields } from "@/features/(app)/(workflows)/lib/const";
import { createWorkflowValidators } from "@/features/(app)/(workflows)/lib/utils";
import { WorkflowFormData } from "@/types/global";
import { createWorkflow } from "../../actions/createWorkflow";
import useToats from "@/hooks/use-toats";
import { useModals } from "@/hooks/use-modals";

const CreateWorkflowModal = () => {
  const { addToast } = useToats();
  const { closeModal } = useModals();

  async function onSubmit(formData: WorkflowFormData) {
    await createWorkflow(formData)
      .then(() => {
        addToast("You've successfully created a new workflow !", "success");
        closeModal("createWorkflow");
      })
      .catch((err) => {
        addToast(err.message, "error");
      });
  }

  return (
    <div>
      <ModalHeading
        title="Create a new workflow"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros."
      />
      <Form
        fields={workflowFormFields}
        defaultValues={{ name: "", description: "" } as WorkflowFormData}
        validators={createWorkflowValidators}
        onSubmit={(values) => onSubmit(values as WorkflowFormData)}
      />
    </div>
  );
};

export default CreateWorkflowModal;
