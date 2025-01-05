import React from "react";
import Text, { TextProps } from "./Text";

type LabelProps = {
  className?: string;
  children: React.ReactNode;
  required?: boolean;
  textSize?: TextProps["size"];
};

const Label = ({
  className = "",
  children,
  required,
  textSize,
}: LabelProps) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Text size={textSize} className="!text-textColors-label font-semibold">
        {children}
      </Text>
      <Text
        size="xs"
        className={
          required ? "!text-textColors-required" : "!text-textColors-optional"
        }
      >
        {required ? "(required)" : "(optional)"}
      </Text>
    </div>
  );
};

export default Label;
