"use client";
import React from "react";
import Link from "next/link";
import Text, { TextProps } from "./Text";
import { ModalType, useModals } from "@/hooks/use-modals";
import Loader from "./Loader";

export type ButtonProps = {
  className?: string;
  variant: "primary" | "secondary" | "empty";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  href?: string;
  type?: "submit" | "button";
  dataTitle?: string;
  ref?: any; // eslint-disable-line
  onClick?: (
    e:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  disabled?: boolean;
  modal?: ModalType;
  textSize?: TextProps["size"];
  loading?: boolean;
};

const variantClasses = {
  primary:
    "bg-btnColors-primary text-white border-[1px] border-btnColors-primary hover:md:text-btnColors-primary hover:md:shadow-white hover:before:md:bg-white hover:md:after:bg-white disabled:hover:md:text-white disabled:hover:md:after:bg-btnColors-primary disabled:hover:md:before:bg-btnColors-primary",
  secondary:
    "border border-borderColors-primary text-textColors-secondary hover:text-white hover:bg-btnColors-primary",
  empty: "",
};

const sizeClasses = {
  sm: "py-2 px-4 text-sm",
  md: "py-3 px-6 text-base",
  lg: "py-4 px-8 text-lg",
};

const Button = ({
  className = "",
  variant,
  size = "md",
  children,
  disabled,
  onClick = () => {},
  dataTitle = "Click",
  ref,
  href,
  modal,
  loading,
  type = "button",
  textSize = "md",
}: ButtonProps) => {
  const { openModal } = useModals();

  const Element = href ? Link : "button";

  const handleClick = (
    e:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onClick(e);
    if (modal) openModal(modal.name, modal.data);
  };

  return (
    <Element
      ref={ref}
      href={href || "/"}
      type={type}
      onClick={handleClick}
      disabled={disabled}
      title={dataTitle}
      className={`block max-w-fit cursor-pointer disabled:!opacity-50 rounded-md transition-all active:opacity-50 duration-200 ease-in-out hover:md:opacity-80 relative overflow-hidden  shadow-sm  md:before:absolute md:before:left-0 md:before:top-0 md:before:h-full md:before:w-0 md:before:duration-300 md:after:absolute md:after:right-0 md:after:top-0 md:after:h-full md:after:w-0 md:after:duration-300  hover:md:before:w-2/4  hover:md:after:w-2/4 md:after:z-[-1] md:before:z-[-1] ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {loading ? (
        <Loader className="!text-[20px]" />
      ) : (
        <>
          {typeof children === "string" ? (
            <Text size={textSize} withoutDefaultClass>
              {children}
            </Text>
          ) : (
            children
          )}
        </>
      )}
    </Element>
  );
};

export default Button;
