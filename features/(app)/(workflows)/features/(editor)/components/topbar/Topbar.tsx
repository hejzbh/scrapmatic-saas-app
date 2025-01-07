"use client";
import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import { truncString } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import EditorActions from "./EditorActions";

interface TopbarProps {
  className?: string;

  name: string;
  description?: string | null;
  workflowId?: string;
}

const Topbar = ({
  className = "",
  name,
  description,
  workflowId,
}: TopbarProps) => {
  const router = useRouter();

  return (
    <div
      className={`sticky top-0 left-0 w-full min-h-[60px] flex items-center justify-between drop-shadow-sm py-4 px-6 border-b-[1px] z-10 border-borderColors-primary bg-sidebarGradient rounded-xl ${className}`}
    >
      {/** Back & Title */}
      <div className="flex  items-center space-x-5">
        <Button
          onClick={() => router.back()}
          variant="secondary"
          className="!p-3"
        >
          <IoChevronBackOutline className="text-xl" />
        </Button>
        <div>
          <Text className="!text-textColors-primary">
            {truncString(name, 45)}
          </Text>
          {description && <Text size="sm">{truncString(description, 35)}</Text>}
        </div>
      </div>

      {/** ??? */}
      <div></div>

      {/** Actions  */}
      {workflowId && <EditorActions workflowId={workflowId} />}
    </div>
  );
};

export default Topbar;
