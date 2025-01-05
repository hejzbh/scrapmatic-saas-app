"use client";
import React from "react";
import { Workflow } from "@prisma/client";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";

interface WorkflowEditorProps {
  className?: string;
  workflow: Workflow;
}

const WorkflowEditor = ({ className = "", workflow }: WorkflowEditorProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
    { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  return (
    <div className={`${className} h-[100dvh] w-full`}>
      <ReactFlow
        nodes={nodes}
        fitView
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
      >
        <Controls position="top-right" />

        <Background variant={BackgroundVariant.Dots} gap={35} size={1.5} />
      </ReactFlow>
    </div>
  );
};

export default WorkflowEditor;
