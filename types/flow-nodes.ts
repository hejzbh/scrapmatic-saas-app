import { Edge, Node, ReactFlowJsonObject } from "@xyflow/react";
import { IconType } from "react-icons";

export enum FlowNodeTaskType {
  LAUNCH_BROWSER = "LAUNCH_BROWSER",
  PAGE_TO_HTML = "PAGE_TO_HTML",
  EXTRACT_TEXT_FROM_ELEMENT = "EXTRACT_TEXT_FROM_ELEMENT",
}

export interface FlowNodeData {
  taskType: FlowNodeTaskType;
  inputs: Record<string, string>;
  [key: string]: any;
}

export interface FlowNode extends Node {
  data: FlowNodeData;
}

export type EditorObjectData = ReactFlowJsonObject<FlowNode, Edge>;

export enum TaskParamEnum {
  STRING = "STRING",
  WEB_PAGE = "WEB_PAGE",
}

export type TaskInputObject = {
  name: string;
  type: TaskParamEnum;
  label: string;
  placeholder?: string;
  helperText: string;
  required?: boolean;
  hideHandle?: boolean;
  [key: string]: any;
};

export type TaskOutputObject = {
  label: string;
  name: string;
  type: TaskParamEnum;
  hideHandle?: boolean;
  canConnectTo: TaskInputObject[];
};

export type FlowNodeTaskObject = {
  type: FlowNodeTaskType;
  label: string;
  Icon: IconType;
  isEntryPoint?: boolean;
  iconProps?: any;
  inputs: TaskInputObject[];
  outputs: TaskOutputObject[];
  credits: number;
};
