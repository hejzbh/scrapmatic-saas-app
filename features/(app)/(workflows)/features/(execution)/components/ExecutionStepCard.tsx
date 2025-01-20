"use client";
import { ExecutionStep, ExecutionStepStatusEnum } from "@prisma/client";
import React, { useMemo } from "react";
import { TASK_REGISTRY } from "../../(editor)/lib/taskRegistry";
import { FlowNodeTaskType } from "@/types/flow-nodes";
import Title from "@/components/ui/Title";
import StepStatus from "./StepStatus";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import Separator from "@/components/ui/Separator";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
type ExecutionStepCardProps = {
  step: ExecutionStep;
  className?: string;
};

const ExecutionStepCard = ({
  className = "",
  step,
}: ExecutionStepCardProps) => {
  const task = useMemo(
    () => TASK_REGISTRY[step.taskType as FlowNodeTaskType],
    [step.taskType]
  );

  const outputResults = useMemo(
    () => (step.outputResults ? JSON.parse(step.outputResults) : {}),
    [step.outputResults]
  );
  console.log(outputResults);
  if (!task) return null;

  return (
    <AccordionItem
      value={step.id}
      className={` rounded-xl border-[1px] border-borderColors-primary ${
        step.status == ExecutionStepStatusEnum.PENDING ||
        step.status == ExecutionStepStatusEnum.CREATED
          ? "opacity-70"
          : step.status === ExecutionStepStatusEnum.COMPLETED
          ? "bg-primary/10"
          : step.status === ExecutionStepStatusEnum.FAILED
          ? "bg-danger/20"
          : ""
      } ${className}`}
    >
      {/** Task Type & Progress */}
      <AccordionTrigger className="!p-5">
        <div className="flex items-center space-x-4">
          <StepStatus status={step.status} />
          <Title variant="h2" size="sm" className="!font-[500]">
            {task.label}
          </Title>
        </div>
      </AccordionTrigger>

      {/** Inputs & Outputs */}
      <AccordionContent className="!p-0">
        <Separator />
        <div className="p-4 md:p-10 bg-black/20">
          <Text size="sm" className="mb-4 !text-textColors-label">
            OUTPUTS:
          </Text>
          {step.status === ExecutionStepStatusEnum.FAILED ? (
            <Text>Error happened. All your credits will be returned.</Text>
          ) : step.status === ExecutionStepStatusEnum.RUNNNING ? (
            <Loader />
          ) : (
            <div className="space-y-4">
              {Object.entries(outputResults).map(([key, value]) => {
                switch (key) {
                  // This output is generated download ur string
                  case "html":
                    return (
                      <div key={key}>
                        <Text
                          size="md"
                          className="!text-textColors-primary mb-1"
                        >
                          HTML:
                        </Text>
                        <Button
                          download="index.html"
                          href={value as string}
                          variant="primary"
                        >
                          Download HTML
                        </Button>
                      </div>
                    );

                  case "extractedText":
                    return (
                      <div key={key}>
                        <Text
                          size="md"
                          className="!text-textColors-primary mb-1"
                        >
                          Extracted text:
                        </Text>
                        <Text>{value as string}</Text>
                      </div>
                    );
                  case "webPage":
                    return (
                      <div key={key}>
                        <Text
                          size="md"
                          className="!text-textColors-primary mb-1"
                        >
                          Web Page:
                        </Text>
                        <Text>Successfully loaded & provided web page</Text>
                      </div>
                    );
                }

                return null;
              })}
            </div>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ExecutionStepCard;
