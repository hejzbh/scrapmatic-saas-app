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
      setStatus(WorkflowExecutionStatusEnum.RUNNNING);
      startWorkflowExecution(execution.id);
    }
  }, [execution?.id]);
  console.log(steps);
  return (
    <ExecutionDetailsContext.Provider value={{ steps }}>
      {children}
      <ul className="space-y-5">
        {steps?.map((step) => {
          const outputResults = step.outputResults
            ? JSON.parse(step.outputResults)
            : null;

          return (
            <li key={step.id} className="text-white font-bold text-4xl">
              {step.status}
              {outputResults && outputResults.html && (
                <div
                  className="text-blue-600 text-sm"
                  dangerouslySetInnerHTML={{ __html: outputResults.html }}
                ></div>
              )}
            </li>
          );
        })}
      </ul>
    </ExecutionDetailsContext.Provider>
  );
};
