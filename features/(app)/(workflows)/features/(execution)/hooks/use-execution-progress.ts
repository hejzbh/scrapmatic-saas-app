"use client";

import { useSocket } from "@/hooks/use-socket";
import { ExecutionPhase } from "@prisma/client";
import { useEffect } from "react";

type Props = {
  onPhaseChanges: (phaseId: string, newData: Partial<ExecutionPhase>) => void;
};

export const useExecutionProgress = ({}: Props) => {
  const { socket, loading } = useSocket();

  useEffect(() => {
    if (loading) return;

    if (!socket) {
      alert("Cannot connect to socket");
    }

    socket?.on("phase_updated", (data) => {});
  }, [socket, loading]);

  return {};
};
