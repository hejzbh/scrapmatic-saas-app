"use client";
import React from "react";

export type TextProps = {
  className?: string;
  variant?: "p" | "span";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "biggerSm";
  children: React.ReactNode;
  withoutDefaultClass?: boolean;
};

const sizeClasses = {
  xs: "text-[0.725rem] sm:text-[0.75rem] md:text-[0.875rem]",
  sm: "text-[0.9rem] sm:text-[0.875rem] md:text-[0.95rem]",
  md: "text-[1.050rem] sm:text-[0.9375rem] md:text-[0.950rem] xl:text-[1.050rem]",
  lg: "text-[1.125rem] sm:text-[1.1rem] md:text-[1.225rem]",
  xl: "text-[1.4rem] sm:text-[1.25rem] md:text-[1.75rem] lg:text-[1.3rem]",
  biggerSm: "text-[1.2rem] sm:text-[0.875rem] md:text-[0.9375rem]",
};

const Text = ({
  className = "",
  variant = "p",
  size = "lg",
  children,
  withoutDefaultClass,
}: TextProps) => {
  const Element = variant;

  return (
    <Element
      className={`${!withoutDefaultClass && "text-textColors-secondary"} ${
        sizeClasses[size]
      } ${className}`}
    >
      {children}
    </Element>
  );
};

export default Text;
