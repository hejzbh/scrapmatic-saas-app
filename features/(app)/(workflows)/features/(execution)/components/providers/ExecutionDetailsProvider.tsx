"use client";
import React, { createContext, useEffect, useState } from "react";
import { ExecutionWithSteps } from "../../actions/getExecutionDetails";
import { ExecutionStep, WorkflowExecutionStatusEnum } from "@prisma/client";
import { startWorkflowExecution } from "../../actions/startWorkflowExecution";
import { useExecutionProgress } from "../../hooks/use-execution-progress";

// Kreiramo kontekst
const ExecutionDetailsContext = createContext<any>(null);

// Provider komponenta koja omogućava pristup kontekstu
export const ExecutionDetailsProvider = ({
  children,
  execution,
}: {
  children: React.ReactNode;
  execution: ExecutionWithSteps;
}) => {
  const [steps, setSteps] = useState<ExecutionStep[]>([]);
  const [running, setRunning] = useState<boolean>(false);
  const [status, setStatus] = useState<WorkflowExecutionStatusEnum>(
    execution.status
  );

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
    setSteps(execution.steps);

    if (status === WorkflowExecutionStatusEnum.PENDING) {
      setRunning(true);
      startWorkflowExecution(execution.id);
    }
  }, [execution?.id]);

  return (
    <ExecutionDetailsContext.Provider value={{ steps, running }}>
      {children}
      <ul className="space-y-5">
        {steps?.map((step) => {
          return (
            <li key={step.id} className="text-white font-bold text-4xl">
              {step.status}
            </li>
          );
        })}
      </ul>
    </ExecutionDetailsContext.Provider>
  );
};
