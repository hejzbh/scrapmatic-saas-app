"use client";
import React, { useState } from "react";
import Button from "@/components/ui/Button";
import { CiPlay1 } from "react-icons/ci";
import { IoSaveOutline } from "react-icons/io5";
import { useReactFlow } from "@xyflow/react";
import useToats from "@/hooks/use-toats";
import editWorkflow from "@/features/(app)/(workflows)/actions/editWorkflow";

interface EditorActionsProps {
  className?: string;
  workflowId: string;
}

const EditorActions = ({ className = "", workflowId }: EditorActionsProps) => {
  const { toObject } = useReactFlow();
  const { addToast } = useToats();
  const [pending, setPending] = useState({
    handleSave: false,
    handlePlay: false,
    handlePublish: false,
  });

  function handlePlay() {}

  function handleSave() {
    if (pending.handleSave) return;

    setPending((loadings) => ({ ...loadings, handleSave: true }));
    editWorkflow(workflowId, { editorObjectJSON: JSON.stringify(toObject()) })
      .then(() => {
        addToast("You've successfully saved workflow editor data", "success");
      })
      .catch((err) => {
        addToast(err.message, "error");
      })
      .finally(() => {
        setPending((loadings) => ({ ...loadings, handleSave: false }));
      });
  }

  function handlePublish() {}

  return (
    <div className={`flex items-center space-x-5 ${className}`}>
      <Button
        variant="secondary"
        className="flex items-center hover:!bg-danger group"
      >
        <CiPlay1 className="mr-2 text-xl text-danger group-hover:text-white" />{" "}
        Play
      </Button>
      <Button
        onClick={handleSave}
        variant="secondary"
        disabled={pending.handleSave}
        className="flex items-center"
        loading={pending.handleSave}
      >
        <IoSaveOutline className="text-xl mr-2 text-success" /> Save
      </Button>
      <Button variant="primary">Publish</Button>
    </div>
  );
};

export default EditorActions;
