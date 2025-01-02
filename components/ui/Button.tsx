"use client";
import React from "react";
import Link from "next/link";
import Text from "./Text";
import { ModalType, useModals } from "@/hooks/use-modals";
export type ButtonProps = {
  className?: string;
  variant: "primary" | "secondary";
  children: React.ReactNode;
  href?: string;
  type?: "submit" | "button";
  dataTitle?: string;
  ref?: any; // eslint-disable-line
  onClick?: () => void;
  disabled?: boolean;
  modal?: ModalType;
};

const variantClasses = {
  primary:
    "bg-btnColors-primary text-white border-[1px] border-btnColors-primary hover:md:text-btnColors-primary hover:md:shadow-white hover:before:md:bg-white hover:md:after:bg-white disabled:hover:md:text-white disabled:hover:md:before:bg-btnColors-primary disabled:hover:md:after:bg-btnColors-primary ",
  secondary:
    "bg-btnColors-secondary text-textColors-primary hover:text-textColors-hover",
};

const Button = ({
  className = "",
  variant,
  children,
  disabled,
  onClick = () => {},
  dataTitle = "Click",
  ref,
  href,
  modal,
  type = "button",
}: ButtonProps) => {
  const { openModal } = useModals();

  const Element = href ? Link : "button";

  function handleClick() {
    onClick();

    if (modal) openModal(modal.name, modal.data);
  }

  return (
    <Element
      ref={ref}
      href={href + ""}
      type={type}
      onClick={handleClick}
      disabled={disabled}
      title={dataTitle}
      className={`block max-w-fit cursor-pointer py-3 px-7 disabled:!opacity-50 rounded-md transition-all active:opacity-50 duration-200 ease-in-out hover:md:opacity-80 relative overflow-hidden  shadow-md  md:before:absolute md:before:left-0 md:before:top-0 md:before:h-full md:before:w-0 md:before:duration-300 md:after:absolute md:after:right-0 md:after:top-0 md:after:h-full md:after:w-0 md:after:duration-300  hover:md:before:w-2/4  hover:md:after:w-2/4 md:after:z-[-1] md:before:z-[-1]  ${variantClasses[variant]} ${className}`}
    >
      {typeof children === "string" ? (
        <Text size="md" withoutDefaultClass>
          {children}
        </Text>
      ) : (
        children
      )}
    </Element>
  );
};

export default Button;
