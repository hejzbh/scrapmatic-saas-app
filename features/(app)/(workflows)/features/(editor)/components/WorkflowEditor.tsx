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
import { createNode } from "../features/(nodes)/actions/createNode";
import { FlowNodeTaskType } from "@/types/flow-nodes";
import NodeCard from "../features/(nodes)/components/NodeCard";

interface WorkflowEditorProps {
  className?: string;
  workflow: Workflow;
}

const nodeComponents = {
  FlowNode: NodeCard,
};

const WorkflowEditor = ({ className = "", workflow }: WorkflowEditorProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    createNode(FlowNodeTaskType.LAUNCH_BROWSER),
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  console.log(nodes);
  return (
    <div className={`${className} h-[100dvh] w-full`}>
      <ReactFlow
        nodes={nodes}
        fitView
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        nodeTypes={nodeComponents}
        snapGrid={[35, 35]}
        snapToGrid
        fitViewOptions={{ padding: 1 }}
      >
        <Controls position="top-right" />
        <Background variant={BackgroundVariant.Dots} gap={35} size={1.5} />
      </ReactFlow>
    </div>
  );
};

export default WorkflowEditor;
