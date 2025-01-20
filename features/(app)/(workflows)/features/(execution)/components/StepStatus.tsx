"use client";
import Loader from "@/components/ui/Loader";
import { ExecutionStep, ExecutionStepStatusEnum } from "@prisma/client";
import React from "react";
import { FaRegClock, FaCheckCircle } from "react-icons/fa";
import { IoCreateOutline, IoCloseCircle } from "react-icons/io5";

type Props = {
  status: ExecutionStep["status"];
};

const StepStatus = ({ status }: Props) => {
  switch (status) {
    case ExecutionStepStatusEnum.CREATED:
      return (
        <div>
          <IoCreateOutline className="text-2xl text-[#614500]" />
        </div>
      );
    case ExecutionStepStatusEnum.PENDING:
      return (
        <div>
          <FaRegClock className="text-2xl text-[#db9d00]" />
        </div>
      );
    case ExecutionStepStatusEnum.RUNNNING:
      return (
        <div>
          <Loader />
        </div>
      );
    case ExecutionStepStatusEnum.COMPLETED:
      return (
        <div>
          <FaCheckCircle className="text-success text-2xl" />
        </div>
      );
    case ExecutionStepStatusEnum.FAILED:
      return (
        <div>
          <IoCloseCircle className="text-danger text-3xl" />
        </div>
      );
    default:
      return null;
  }
};

export default StepStatus;
