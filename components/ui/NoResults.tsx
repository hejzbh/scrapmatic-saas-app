import React from "react";
import Text from "./Text";
import { MdManageSearch } from "react-icons/md";
import Title from "./Title";
import Button, { ButtonProps } from "./Button";

type NoResultsProps = {
  className?: string;
  buttonProps?: ButtonProps;
  title: string;
  description: string;
};

const NoResults = ({
  className = "",
  title,
  description,
  buttonProps,
}: NoResultsProps) => {
  return (
    <div
      className={`text-center flex flex-col justify-center items-center space-y-2 ${className}`}
    >
      <div className="p-3 rounded-full  bg-bgColors-secondary">
        <MdManageSearch className="text-4xl md:text-[2.8rem] text-primary" />
      </div>
      <div className="py-3 space-y-1">
        <Title size="sm" variant="h3">
          {title}
        </Title>
        <Text>{description}</Text>
      </div>
      {buttonProps && <Button {...buttonProps} />}
    </div>
  );
};

export default NoResults;
