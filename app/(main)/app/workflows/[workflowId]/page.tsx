"use client";
import Loader from "@/components/ui/Loader";
import Text from "@/components/ui/Text";
import { routes } from "@/lib/routes";
import { useRouter } from "next/navigation";
import React from "react";

interface WorkflowPageProps {
  params: Promise<{ workflowId: string }>;
}

const WorkflowPage = (props: WorkflowPageProps) => {
  const router = useRouter();

  props.params.then((params) =>
    router.push(routes.app.workflowEditor(params.workflowId))
  );

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <Loader className="text-[50px] mb-5" />
      <Text size="xl">Redirecting...</Text>
    </div>
  );
};

export default WorkflowPage;
