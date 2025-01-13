"use client";
import React, { createContext, useEffect, useState } from "react";
import { ExecutionWithPhases } from "../../actions/getExecutionDetails";
import { ExecutionPhase, WorkflowExecutionStatusEnum } from "@prisma/client";
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
  execution: ExecutionWithPhases;
}) => {
  const [phases, setPhases] = useState<ExecutionPhase[]>([]);
  const [running, setRunning] = useState<boolean>(false);

  useExecutionProgress({
    onPhaseChanges: (phaseId, newData) =>
      setPhases((phases) =>
        phases.map((phase) =>
          phase.id === phaseId ? { ...phase, ...newData } : phase
        )
      ),
  });

  useEffect(() => {
    setPhases(execution.phases);
    setRunning(execution.status === WorkflowExecutionStatusEnum.RUNNNING);

    if (execution.status === WorkflowExecutionStatusEnum.PENDING) {
      startWorkflowExecution(execution.id);
      console.log(execution.id);
      console.log("🐢🐢🐢🐢");
    }
  }, [execution]);

  return (
    <ExecutionDetailsContext.Provider value={{ phases, running }}>
      {children}
    </ExecutionDetailsContext.Provider>
  );
};
