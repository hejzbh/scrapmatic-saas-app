"use client";
import React from "react";
import { useExecutionDetails } from "../hooks/use-execution-details";
import ExecutionStepCard from "./ExecutionStepCard";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
type Props = {
  className?: string;
};

const ExecutionStepsList = ({ className = "" }: Props) => {
  const { steps } = useExecutionDetails();
  console.log(steps);
  return (
    <Accordion
      defaultValue={[steps[0]?.id]}
      type="multiple"
      className="space-y-10"
    >
      {steps?.map((step) => (
        <ExecutionStepCard key={step.id} step={step} />
      ))}
    </Accordion>
  );
};

export default ExecutionStepsList;
