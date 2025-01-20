"use client";
import React from "react";

type TitleProps = {
  className?: string;
  variant: "h1" | "h2" | "h3";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
};

const fontSizesClasses = {
  xs: "text-[.85rem] md:text-[1rem] lg:text-[1.1rem]",
  sm: "text-[1.1rem] md:text-[1.2375rem] lg:text-[1.35rem]",
  md: "text-[1.675rem] md:text-[1.8375rem] lg:text-[2rem]",
  lg: "text-[1.875rem] md:text-[2.4375rem] lg:text-[2.875rem]",
  xl: "text-[2.125rem] md:text-[2.9125rem] lg:text-[4.7rem]",
};

const Title = ({
  className = "",
  variant = "h2",
  children,
  size = "md",
}: TitleProps) => {
  const Element = variant;

  return (
    <Element
      className={`text-textColors-primary  font-semibold leading-[1.2] tracking-wide ${fontSizesClasses[size]} ${className}`}
    >
      {children}
    </Element>
  );
};

export default Title;
