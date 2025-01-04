"use client";
import React from "react";
import Title from "@/components/ui/Title";
import Text from "@/components/ui/Text";
import Separator from "@/components/ui/Separator";
import { useModals } from "@/hooks/use-modals";
import { IoCloseSharp } from "react-icons/io5";

type ModalHeadingProps = {
  title: string;
  description: string;
  titleClassName?: string;
};

const ModalHeading = ({
  title,
  description,
  titleClassName,
}: ModalHeadingProps) => {
  const { closeLastModal } = useModals();
  return (
    <div className="space-y-2 md:space-y-1 relative">
      <Title
        variant="h2"
        className={`${titleClassName ? titleClassName : "heading-clip"}`}
      >
        {title}
      </Title>
      <Text>{description}</Text>
      <Separator className="!my-5" />
      <button
        title="Close modal"
        onClick={closeLastModal}
        className="absolute top-[-15px] right-[-15px] text-danger"
      >
        <IoCloseSharp className="text-3xl" />
      </button>
    </div>
  );
};

export default ModalHeading;
