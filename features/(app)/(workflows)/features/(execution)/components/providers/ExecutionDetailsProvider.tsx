"use client";
import React, {
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ExecutionWithSteps } from "../../actions/getExecutionDetails";
import { ExecutionStep, WorkflowExecutionStatusEnum } from "@prisma/client";
import { startWorkflowExecution } from "../../actions/startWorkflowExecution";
import { useExecutionProgress } from "../../hooks/use-execution-progress";
import { useUserBalance } from "@/features/(app)/(balance)/hooks/use-user-balance";
import useToats from "@/hooks/use-toats";

// Kreiramo kontekst
export const ExecutionDetailsContext = createContext<
  { steps: ExecutionStep[] } | undefined
>(undefined);

// Provider komponenta koja omogućava pristup kontekstu
export const ExecutionDetailsProvider = ({
  children,
  execution,
}: {
  children: React.ReactNode;
  execution: ExecutionWithSteps;
}) => {
  const [steps, setSteps] = useState<ExecutionStep[]>(execution?.steps);
  const [status, setStatus] = useState<WorkflowExecutionStatusEnum>(
    execution.status
  );
  const { chargeCredits } = useUserBalance();
  const mounted = useRef(false);
  const { addToast } = useToats();

  useExecutionProgress({
    onStatusChange: setStatus,
    onStepChange: (updatedStep) =>
      setSteps((steps) =>
        steps.map((step) =>
          step.id === updatedStep.id ? { ...step, ...updatedStep } : step
        )
      ),
  });

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      setSteps(execution.steps);
      return;
    }

    if (status === WorkflowExecutionStatusEnum.PENDING) {
      setStatus(WorkflowExecutionStatusEnum.RUNNNING);
      startWorkflowExecution(execution.id)
        .then(() => {
          // If execution is successfully executed, charge credits.
          chargeCredits(execution.creditsCost);
        })
        .catch((error) => {
          addToast(error.message, "error");
        });
    }
  }, [execution?.id]);

  return (
    <ExecutionDetailsContext.Provider value={{ steps }}>
      {children}
    </ExecutionDetailsContext.Provider>
  );
};
