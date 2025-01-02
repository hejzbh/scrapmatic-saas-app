"use client";
import React from "react";
import { FiLoader } from "react-icons/fi";

type LoaderProps = {
  className?: string;
};

const Loader = ({ className = "" }: LoaderProps) => {
  return (
    <FiLoader
      className={`animate-spin text-3xl text-textColors-primary ${className}`}
    />
  );
};

export default Loader;
