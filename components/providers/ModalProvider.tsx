"use client";
import { ModalName, useModals } from "@/hooks/use-modals";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";

const modalComponents: Record<ModalName, React.ComponentType> = {
  createWorkflow: dynamic(
    () =>
      import(
        "@/features/(app)/(workflows)/components/modals/CreateWorkflowModal"
      )
  ),
  editWorkflow: dynamic(
    () =>
      import("@/features/(app)/(workflows)/components/modals/EditWorkflowModal")
  ),
  deleteWorkflow: dynamic(
    () =>
      import(
        "@/features/(app)/(workflows)/components/modals/DeleteWorkflowModal"
      )
  ),
};

const ModalProvider = () => {
  const { modals, closeLastModal } = useModals();

  if (!modals.length) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-[#020b13]/95 flex items-center justify-center"
      onClick={closeLastModal}
    >
      {modals.map((modal, i) => {
        const Modal = modalComponents[modal.name];

        return (
          <div
            className="p-10 rounded-3xl absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] border-[1px] border-borderColors-primary w-full max-w-[90%] lg:max-w-[768px] bg-modalGradient"
            onClick={(e) => e.stopPropagation()}
            key={modal.name}
            style={{ zIndex: i + 10 }}
          >
            <Modal />
          </div>
        );
      })}

      <Image
        src="/images/reflection.avif"
        alt="Reflection"
        width={1920}
        height={300}
        loading="eager"
        className="absolute top-0 right-0 z-[-2] w-full h-auto"
      />
    </div>
  );
};

export default ModalProvider;
