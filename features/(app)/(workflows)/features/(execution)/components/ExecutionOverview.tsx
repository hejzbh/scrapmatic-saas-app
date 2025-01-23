"use client";
import React from "react";
import { useExecutionDetails } from "../hooks/use-execution-details";
import { ExecutionStepStatusEnum } from "@prisma/client";
import { PiCoinsLight } from "react-icons/pi";
import { CiClock1 } from "react-icons/ci";
import StepStatus from "./StepStatus";

const ExecutionOverview = () => {
  const { creditsCost, duration, status } = useExecutionDetails();
  return (
    <div className="flex align-center gap-5 flex-wrap mb-5 text-textColors-primary">
      {/** Status */}
      <div className="border-[1px] border-borderColors-secondary p-2 px-4 flex items-center space-x-3 rounded-3xl">
        <div className="mr-2">
          <StepStatus status={status} />
        </div>
        Status: {status}
      </div>
      {/** Credits Cost */}
      <div className="border-[1px] border-borderColors-secondary p-2 px-4 flex items-center space-x-3 rounded-3xl">
        <PiCoinsLight className="mr-2" /> Credits:{" "}
        {status === ExecutionStepStatusEnum.FAILED ? 0 : creditsCost}
      </div>
      {/** Duration */}
      <div className="border-[1px] border-borderColors-secondary p-2 px-4 flex items-center space-x-3 rounded-3xl">
        <CiClock1 className="mr-2" />
        Duration: {duration ? duration : "Calculating..."}
      </div>
    </div>
  );
};

export default ExecutionOverview;
