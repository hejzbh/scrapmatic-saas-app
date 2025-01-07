"use client";
import React from "react";
import { ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Workflow } from "@prisma/client";
import Topbar from "../topbar/Topbar";
import TaskMenu from "../task-menu/TaskMenu";

interface ProviderProps {
  className?: string;
  children: React.ReactNode;
  workflow: Workflow;
}

const WorkflowEditorProvider = ({
  className = "",
  children,
  workflow,
}: ProviderProps) => {
  return (
    <ReactFlowProvider>
      <div
        className={`flex flex-col h-full w-full overflow-hidden ${className}`}
      >
        <section className="flex h-full overflow-auto relative">
          <div className="absolute top-0 right-0 left-0">
            {" "}
            <Topbar
              name={workflow.name}
              description={workflow.description}
              workflowId={workflow.id}
            />
            <TaskMenu className="sticky top-0 right-0 float-right" />
          </div>
          {children}
        </section>
      </div>
    </ReactFlowProvider>
  );
};

export default WorkflowEditorProvider;
