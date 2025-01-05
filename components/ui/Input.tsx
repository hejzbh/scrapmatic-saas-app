import React from "react";

type InputProps = {
  name: string;
  required?: boolean;
  type?: "email" | "password";
  value: string;
  placeholder?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
  name,
  required = false,
  type,
  value,
  placeholder = "",
  onChange,
  className = "",
}: InputProps) => {
  return (
    <>
      <input
        name={name}
        required={required}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`w-full rounded-3xl p-3 px-4 text-textColors-primary bg-transparent border-[1px] text-sm border-borderColors-primary outline-none ${className}`}
      />
    </>
  );
};

export default Input;
