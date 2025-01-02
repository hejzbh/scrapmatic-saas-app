import React from "react";

type SeparatorProps = {
  className?: string;
};

const Separator = ({ className = "" }: SeparatorProps) => {
  return (
    <div
      className={`bg-borderColors-primary h-[1.5px] w-full ${className}`}
    ></div>
  );
};

export default Separator;
