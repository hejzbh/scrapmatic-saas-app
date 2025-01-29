"use client";

import React, { createContext, useEffect, useRef, useState } from "react";
import {
  ExecutionWithSteps,
  getExecutionDetails,
} from "../../actions/getExecutionDetails";
import { ExecutionStep, WorkflowExecutionStatusEnum } from "@prisma/client";
import { startWorkflowExecution } from "../../actions/startWorkflowExecution";
import { useExecutionProgress } from "../../hooks/use-execution-progress";
import { useUserBalance } from "@/features/(app)/(balance)/hooks/use-user-balance";
import useToats from "@/hooks/use-toats";
import { calculateDuration } from "../../lib/utils";

// Create a context for execution details
export const ExecutionDetailsContext = createContext<
  | {
      steps: ExecutionStep[];
      creditsCost: number;
      startedAt: string;
      completedAt: string;
      duration: string;
      status: WorkflowExecutionStatusEnum;
    }
  | undefined
>(undefined);

// Context provider for execution details
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
  const [duration, setDuration] = useState<string>("");
  const [startedAt, setStartedAt] = useState<string | null>(
    execution?.startedAt
  );
  const [completedAt, setCompletedAt] = useState<string | null>(
    execution?.completedAt
  );
  const mounted: any = useRef(null);

  const { chargeCredits } = useUserBalance();
  const { addToast } = useToats();

  // Track execution progress and update state accordingly
  const { isConnectedOnSocket } = useExecutionProgress({
    onStatusChange: setStatus,
    onStepChange: (updatedStep) =>
      setSteps((prevSteps) =>
        prevSteps.map((step) =>
          step.id === updatedStep.id ? { ...step, ...updatedStep } : step
        )
      ),
    onCompleted: setCompletedAt,
    onStarted: setStartedAt,
  });

  // Update the duration when both start and completion times are available
  useEffect(() => {
    if (startedAt && completedAt) {
      setDuration(calculateDuration(startedAt, completedAt));
    }
  }, [startedAt, completedAt]);

  // Handle initialization and pending execution status
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      setSteps(execution?.steps || []);
    }

    if (status === WorkflowExecutionStatusEnum.PENDING) {
      setStatus(WorkflowExecutionStatusEnum.RUNNING);
      startWorkflowExecution(execution.id)
        .then(() => {
          chargeCredits(execution.creditsCost); // Deduct credits upon successful execution

          // If there was error with socket and user didnt get real time updates from backend
          if (!isConnectedOnSocket) {
            getExecutionDetails(execution.id).then((execution) => {
              setSteps(execution.steps);
              setStartedAt(execution.startedAt);
              setCompletedAt(execution.completedAt);
              setStatus(execution.status);
            });
          }
        })
        .catch((error) => {
          addToast(error.message, "error", 10000); // Display an error toast if execution fails
        });
    }
  }, [execution?.id]);

  return (
    <ExecutionDetailsContext.Provider
      value={{
        steps,
        status,
        creditsCost: execution?.creditsCost,
        startedAt: startedAt || "",
        completedAt: completedAt || "",
        duration,
      }}
    >
      {children}
    </ExecutionDetailsContext.Provider>
  );
};
