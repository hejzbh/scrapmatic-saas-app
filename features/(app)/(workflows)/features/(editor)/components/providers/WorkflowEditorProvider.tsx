"use client";
import React from "react";
import { ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

interface ProviderProps {
  className?: string;
  children: React.ReactNode;
}

const WorkflowEditorProvider = ({
  className = "",
  children,
}: ProviderProps) => {
  return (
    <ReactFlowProvider>
      <div
        className={`flex flex-col h-full w-full overflow-hidden ${className}`}
      >
        <section className="flex h-full overflow-auto">{children}</section>
      </div>
    </ReactFlowProvider>
  );
};

export default WorkflowEditorProvider;
