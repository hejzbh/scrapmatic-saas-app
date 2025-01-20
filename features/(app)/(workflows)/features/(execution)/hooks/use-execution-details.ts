"use client";

import { useContext } from "react";
import { ExecutionDetailsContext } from "../components/providers/ExecutionDetailsProvider";

export const useExecutionDetails = () => {
  const executionDetails = useContext(ExecutionDetailsContext);

  if (!executionDetails) throw new Error("Something went wrong");

  return executionDetails;
};
