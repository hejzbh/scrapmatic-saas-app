"use client";

import { useSocket } from "@/hooks/use-socket";
import { WorkflowExecutionStatusEnum } from "@prisma/client";
import { useEffect } from "react";

type Props = {
  onStatusChange: (status: WorkflowExecutionStatusEnum) => void;
};

export const useExecutionProgress = ({ onStatusChange }: Props) => {
  const { socket, loading } = useSocket();

  useEffect(() => {
    if (loading) return;

    if (!socket) {
      alert("Cannot connect to socket");
    }

    socket?.on("executionStatus", onStatusChange);
  }, [socket, loading]);

  return {};
};
