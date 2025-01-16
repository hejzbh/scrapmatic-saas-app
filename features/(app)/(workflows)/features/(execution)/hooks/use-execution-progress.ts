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
};

export const useExecutionProgress = ({
  onStatusChange,
  onStepChange,
}: Props) => {
  const { socket, loading } = useSocket();

  useEffect(() => {
    if (loading) return;

    if (!socket) {
      alert("Cannot connect to socket");
    }

    socket?.on("executionStatus", onStatusChange);
    socket?.on("STEP_UPDATE", onStepChange);
  }, [socket, loading]);

  return {};
};
