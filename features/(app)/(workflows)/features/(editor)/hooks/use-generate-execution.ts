import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import { flowToExecutionPlan } from "../lib/utils";
import { FlowNode } from "@/types/flow-nodes";
import { useInvalidInputs } from "../features/(nodes)/hooks/use-invalid-inputs";

export const useGenerateExecution = () => {
  const { toObject } = useReactFlow();

  const { setInvalidInputs, clearInvalidInputs } = useInvalidInputs();

  const generateExecutionPlan = useCallback(async () => {
    const { nodes, edges } = toObject();

    clearInvalidInputs();

    return await flowToExecutionPlan(nodes as FlowNode[], edges).then((res) => {
      console.log(res);
      console.log("😶😶😶😶");
      // Inputs are missing...
      if (res.invalidInputs) {
        setInvalidInputs(res.invalidInputs);
        throw new Error("Please fill an required inputs");
      }

      return res.executionPlan;
    });
  }, [toObject]);

  return generateExecutionPlan;
};
