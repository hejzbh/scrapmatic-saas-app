"use client";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSimpleBezierPath,
  MarkerType,
  useReactFlow,
} from "@xyflow/react";
import React from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { revalidateNode } from "../actions/revalidateNode";
import { SetNodesType } from "../../../components/WorkflowEditor";

const EdgeConnection = (props: EdgeProps) => {
  const [edgePath, labelX, labelY] = getSimpleBezierPath(props);
  const { setEdges, setNodes } = useReactFlow();

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={MarkerType.Arrow}
        style={props.style}
      />
      <EdgeLabelRenderer>
        <button
          title="Remove Connection"
          className="hover:opacity-80 transition z-10"
          onClick={() => {
            // Remove edge
            setEdges((edges) =>
              edges.filter((existingEdge) => existingEdge.id !== props.id)
            );

            // Revalidate nodes
            revalidateNode(setNodes as SetNodesType, props.target);
          }}
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
        >
          <TiDeleteOutline className="text-danger text-3xl " />
        </button>
      </EdgeLabelRenderer>
    </>
  );
};

export default EdgeConnection;
