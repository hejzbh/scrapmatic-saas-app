import React from "react";
import Text from "./Text";

type BadgeProps = {
  className?: string;
  children: React.ReactNode;
};

const Badge = ({ className = "", children }: BadgeProps) => {
  return (
    <div className={`bg-primary py-2 px-4 rounded-3xl ${className}`}>
      <Text
        size="xs"
        className="text-white flex items-center gap-2"
        withoutDefaultClass
      >
        {children}
      </Text>
    </div>
  );
};

export default Badge;
