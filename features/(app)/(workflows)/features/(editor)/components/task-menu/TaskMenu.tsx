"use client";
import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { AccordionContent } from "@radix-ui/react-accordion";
import { FlowNodeTaskType } from "@/types/flow-nodes";

import TaskCard from "./TaskCard";

interface TaskMenuProps {
  className?: string;
}

const tasksByGroup: {
  groupName: string;
  tasks: FlowNodeTaskType[];
}[] = [
  {
    groupName: "User interactions",
    tasks: [],
  },
  {
    groupName: "Data Retrieval",
    tasks: [
      FlowNodeTaskType.PAGE_TO_HTML,
      FlowNodeTaskType.EXTRACT_TEXT_FROM_ELEMENT,
    ],
  },
  {
    groupName: "Data Management",
    tasks: [],
  },
  {
    groupName: "Flow Control",
    tasks: [],
  },
  {
    groupName: "Data Delivery",
    tasks: [],
  },
];

const TaskMenu = ({ className = "" }: TaskMenuProps) => {
  return (
    <Accordion
      type="multiple"
      className={`z-[10] w-[325px] px-4 bg-sidebarGradient rounded-r-xl rounded-bl-xl ${className}`}
    >
      <AccordionItem value="task-menu">
        <AccordionTrigger className="font-bold text-xl text-textColors-hover">
          TASK MENU
        </AccordionTrigger>
        <AccordionContent>
          <Accordion type="multiple">
            {tasksByGroup?.map((group, idx) => (
              <AccordionItem key={idx} value={group.groupName}>
                <AccordionTrigger className="text-textColors-hover/90">
                  {group.groupName}{" "}
                  {group.tasks.length ? ` - ${group.tasks.length}` : ``}
                </AccordionTrigger>
                <AccordionContent className="space-y-3">
                  {group?.tasks?.map((taskType) => (
                    <TaskCard key={taskType} type={taskType} />
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TaskMenu;
