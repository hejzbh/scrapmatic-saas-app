"use client";

import { useSocket } from "@/hooks/use-socket";
import {
  ExecutionStepStatusEnum,
  WorkflowExecutionStatusEnum,
} from "@prisma/client";
import { useEffect } from "react";

type Props = {
  onStatusChange: (status: WorkflowExecutionStatusEnum) => void;
  onStepChange: (data: { id: string; status: ExecutionStepStatusEnum }) => void;
  onCompleted: (completedAtDateString: string) => void;
  onStarted: (startedAtDateString: string) => void;
  onSocketConnected: () => void;
};

export const useExecutionProgress = ({
  onStatusChange,
  onStepChange,
  onCompleted,
  onStarted,
  onSocketConnected,
}: Props) => {
  const { socket, loading } = useSocket();

  useEffect(() => {
    if (loading) return;

    if (!socket?.connected) {
      alert("Cannot connect to socket");
    }

    onSocketConnected();

    socket?.on("executionStatus", (status: any) => {
      console.log(status);
      console.log("---✅✅✅✅✅✅✅✅✅");
    });
    socket?.on("STEP_UPDATE", onStepChange);
    socket?.on("COMPLETED_AT", onCompleted);
    socket?.on("STARTED_AT", onStarted);
  }, [socket, loading]);

  return {};
};
