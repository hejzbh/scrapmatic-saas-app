"use client";
import React from "react";
import Text from "./Text";

type ButtonProps = {
  className?: string;
  variant: "primary" | "secondary";
  children: React.ReactNode;
  dataTitle?: string;
  ref?: any; // eslint-disable-line
  onClick?: () => void;
  disabled?: boolean;
};

const variantClasses = {
  primary:
    "bg-btnColors-primary text-white border-[1px] border-btnColors-primary hover:md:text-btnColors-primary hover:md:shadow-white hover:before:md:bg-white hover:md:after:bg-white",
  secondary:
    "bg-btnColors-secondary text-textColors-primary hover:md:text-white hover:md:shadow-white hover:md:before:bg-btnColors-primary hover:md:after:bg-btnColors-primary",
};

const Button = ({
  className = "",
  variant,
  children,
  disabled,
  onClick = () => {},
  dataTitle = "Click",
  ref,
}: ButtonProps) => {
  return (
    <button
      ref={ref}
      onClick={() => {
        onClick();
      }}
      disabled={disabled}
      title={dataTitle}
      className={`py-3 px-7 disabled:opacity-70 rounded-md transition-all active:opacity-60 duration-200 ease-in-out hover:md:opacity-90 relative overflow-hidden  min-w-40  shadow-2xl  md:before:absolute md:before:left-0 md:before:top-0 md:before:h-full md:before:w-0 md:before:duration-300 md:after:absolute md:after:right-0 md:after:top-0 md:after:h-full md:after:w-0 md:after:duration-300  hover:md:before:w-2/4  hover:md:after:w-2/4 md:after:z-[-1] md:before:z-[-1]  ${variantClasses[variant]} ${className}`}
    >
      <Text size="md" withoutDefaultClass>
        {children}
      </Text>
    </button>
  );
};

export default Button;
