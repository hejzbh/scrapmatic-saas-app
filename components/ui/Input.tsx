import React from "react";

type InputProps = {
  name: string;
  required?: boolean;
  type?: "email" | "password";
  value: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // eslint-disable-line
};

const Input = ({
  name,
  required = false,
  type,
  value,
  placeholder = "",
  onChange,
  disabled,
  className = "",
}: InputProps) => {
  return (
    <>
      <input
        name={name}
        required={required}
        type={type}
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`w-full rounded-3xl p-3 px-4 text-textColors-primary bg-transparent border-[1px] text-base border-borderColors-primary outline-none disabled:opacity-50 ${className}`}
      />
    </>
  );
};

export default Input;
