import Form from "@/components/form/Form";
import ModalHeading from "@/components/ui/ModalHeading";
import { useModals } from "@/hooks/use-modals";
import useToats from "@/hooks/use-toats";
import React from "react";
import { workflowFormFields } from "../../lib/const";
import { createWorkflowValidators } from "../../lib/utils";
import { WorkflowFormData } from "@/types";
import { truncString } from "@/lib/utils";
import editWorkflow from "../../actions/editWorkflow";

const EditWorkflowModal = () => {
  const { addToast } = useToats();
  const { closeModal, getModalInfo } = useModals();

  const modal = getModalInfo("editWorkflow");

  async function onSubmit(formData: WorkflowFormData) {
    if (!modal?.data?.workflow.id) return;

    await editWorkflow(modal?.data.workflow.id, formData)
      .then(() => {
        addToast("You've successfully updated a workflow !", "success");
      })
      .catch((err) => {
        addToast(err.message, "error");
      })
      .finally(() => closeModal("editWorkflow"));
  }

  if (!modal || !modal.data?.workflow) {
    closeModal("editWorkflow");
    return <></>;
  }

  return (
    <div>
      <ModalHeading
        title={`Edit ${truncString(modal.data.workflow?.name, 20)}`}
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
      varius enim in eros."
      />
      <Form
        fields={workflowFormFields}
        defaultValues={
          {
            name: modal.data.workflow.name,
            description: modal.data.workflow.description,
          } as WorkflowFormData
        }
        validators={createWorkflowValidators}
        onSubmit={(values) => onSubmit(values as WorkflowFormData)}
      />
    </div>
  );
};

export default EditWorkflowModal;
