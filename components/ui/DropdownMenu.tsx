"use client";
import React, { useState } from "react";
import Button from "./Button";
import { HiDotsHorizontal } from "react-icons/hi";

interface DropdownOption {
  className?: string;
  onClick: () => void;
  style?: React.CSSProperties;
  name: string;
}

interface DropdownProps {
  options: DropdownOption[];
  className?: string;
}

function Dropdown({ options, className = "" }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <div className={`relative inline-block  ${className}`}>
      <Button
        size="sm"
        variant="secondary"
        className="!px-2 !py-2"
        textSize="sm"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          toggleDropdown();
        }}
      >
        <HiDotsHorizontal className="text-xl" />
      </Button>

      {isOpen && (
        <div className="absolute top-[102%] border border-borderColors-primary right-0 w-48 bg-bgColors-primary p-2 space-y-2  rounded-md shadow-lg !z-20">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setIsOpen(false);
                option.onClick();
              }}
              className={`px-4 py-2 cursor-pointer text-textColors-primary rounded-lg hover:bg-bgColors-secondary transition p-2 ${option.className}`}
              style={option.style}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
