import {
  TaskInputObject,
  TaskOutputObject,
  TaskParamEnum,
} from "@/types/flow-nodes";
export const INPUTS: Record<"WEB_PAGE" | "HTML" | "SELECTOR", TaskInputObject> =
  {
    WEB_PAGE: {
      name: "webPage",
      label: "Web Page",
      type: TaskParamEnum.WEB_PAGE,
      required: true,
      helperText: "Connect web page from previous node",
    },
    HTML: {
      name: "html",
      label: "HTML",
      required: true,
      type: TaskParamEnum.STRING,
      helperText: "Connect HTML or input manually",
    },
    SELECTOR: {
      name: "selector",
      label: "Selector",
      required: true,
      type: TaskParamEnum.STRING,
      helperText: "Selector (exmpl: main .text div h1)",
    },
  };

export const OUTPUTS: Record<
  "WEB_PAGE" | "HTML" | "EXTRACTED_TEXT",
  TaskOutputObject
> = {
  HTML: {
    name: "html",
    label: "HTML",
    type: TaskParamEnum.STRING,
    canConnectTo: [INPUTS.HTML],
  },
  WEB_PAGE: {
    name: "webPage",
    label: "Web Page",
    type: TaskParamEnum.WEB_PAGE,
    canConnectTo: [INPUTS.WEB_PAGE],
  },
  EXTRACTED_TEXT: {
    name: "extractedText",
    label: "Extracted text",
    type: TaskParamEnum.STRING,
    canConnectTo: [],
  },
};
