"use client";
import { useModals } from "@/hooks/use-modals";
import React from "react";

const ModalProvider = () => {
  const { modals, openModal, closeLastModal } = useModals();

  if (!modals.length) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black/80"
      onClick={closeLastModal}
    >
      {modals?.map((modal, i) => {
        return <div style={{ zIndex: i + 1 }}>{modal.name}</div>;
      })}
    </div>
  );
};

export default ModalProvider;
