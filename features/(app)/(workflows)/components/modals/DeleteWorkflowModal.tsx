import ModalHeading from "@/components/ui/ModalHeading";
import { useModals } from "@/hooks/use-modals";
import { truncString } from "@/lib/utils";
import React, { useState } from "react";
import deleteWorkflow from "@/features/(app)/(workflows)/actions/deleteWorkflow";
import ConfirmationDialog from "@/components/ui/ConfirmationDialog";
import useToats from "@/hooks/use-toats";
import Loader from "@/components/ui/Loader";

const DeleteWorkflowModal = () => {
  const { getModalInfo, closeModal } = useModals();
  const { addToast } = useToats();
  const [loading, setLoading] = useState<boolean>();

  const modal = getModalInfo("deleteWorkflow");

  if (!modal || !modal.data?.workflow) {
    closeModal("deleteWorkflow");

    return <></>;
  }

  async function onSubmit() {
    if (!modal?.data?.workflow || loading) return;
    setLoading(true);
    deleteWorkflow(modal.data.workflow.id)
      .then(() => {
        addToast("You've successfully deleted workflow", "success");
      })
      .catch((err) => {
        addToast(err.message, "error");
      })
      .finally(() => {
        closeModal("deleteWorkflow");
        setLoading(false);
      });
  }

  return (
    <div>
      {" "}
      <ModalHeading
        title={`Delete ${truncString(modal.data.workflow?.name, 20)}`}
        description="This action is permanent and cannot be reversed"
        titleClassName="!text-danger"
      />
      {loading && <Loader className="mx-auto mb-4" />}
      <ConfirmationDialog
        disabled={loading}
        onNo={() => closeModal("deleteWorkflow")}
        onYes={onSubmit}
      />
    </div>
  );
};

export default DeleteWorkflowModal;
