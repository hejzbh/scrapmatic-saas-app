"use client";
import React, { useEffect, useState } from "react";
import { Workflow } from "@prisma/client";
import {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import { EditorObjectData, FlowNode } from "@/types/flow-nodes";
import NodeCard from "../features/(nodes)/components/NodeCard";
import onTaskDrop from "../actions/onTaskDrop";
import onConnect from "../actions/onConnect";
import { isConnectionValid } from "../lib/utils";
import EdgeConnection from "../features/(edges)/components/EdgeConnection";

interface WorkflowEditorProps {
  className?: string;
  workflow: Workflow;
}

export type SetNodesType = React.Dispatch<React.SetStateAction<FlowNode[]>>;
export type SetEdgesType = React.Dispatch<React.SetStateAction<Edge[]>>;

const nodeComponents = {
  FlowNode: NodeCard,
};
const edgeComponents = {
  default: EdgeConnection,
};

const WorkflowEditor = ({ className = "", workflow }: WorkflowEditorProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { setViewport, screenToFlowPosition, updateNodeData } = useReactFlow();
  const [dragingOver, setDragingOver] = useState<boolean>(false);

  // Load stored workflow editor data
  useEffect(() => {
    if (workflow.editorObjectJSON) {
      try {
        const editorObjectData: EditorObjectData = JSON.parse(
          workflow.editorObjectJSON
        );

        if (editorObjectData) {
          (setNodes as SetNodesType)(editorObjectData.nodes || []);
          (setEdges as SetEdgesType)(editorObjectData.edges || []);

          if (editorObjectData.viewport) {
            setViewport(editorObjectData.viewport);
          }
        }
      } catch {}
    }
  }, [workflow]);

  return (
    <div
      className={`${className} h-full w-full ${dragingOver && "animate-pulse"}`}
    >
      <ReactFlow
        onDragOver={(e) => {
          e.preventDefault();
          setDragingOver(true);
        }}
        onDragEnd={() => setDragingOver(false)}
        onDragLeave={() => setDragingOver(false)}
        onDrop={(e) => {
          onTaskDrop(e, { screenToFlowPosition, setNodes });
          setDragingOver(false);
        }}
        nodes={nodes}
        fitView
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        nodeTypes={nodeComponents}
        edgeTypes={edgeComponents}
        snapGrid={[35, 35]}
        snapToGrid
        maxZoom={1.3}
        isValidConnection={(connection) =>
          isConnectionValid(connection, nodes as FlowNode[])
        }
        onConnect={(connection) => {
          onConnect(
            connection,
            setEdges as SetEdgesType,
            nodes as FlowNode[],
            updateNodeData
          );
        }}
        fitViewOptions={{ padding: 1 }}
      >
        <Controls position="bottom-right" />
        <Background variant={BackgroundVariant.Dots} gap={35} size={1.5} />
      </ReactFlow>
    </div>
  );
};

export default WorkflowEditor;
