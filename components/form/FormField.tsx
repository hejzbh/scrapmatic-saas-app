import { FormFieldType } from "@/types/global";
import React from "react";
import Text from "@/components/ui/Text";

interface FormFieldProps {
  className?: string;
  field: FormFieldType;
  error: string | null | undefined;
  handleFieldChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  value: any; // eslint-disable-line
}

const FormField = ({
  className,
  field,
  error,
  handleFieldChange,
  value,
}: FormFieldProps) => {
  return (
    <div className={`${className}`}>
      {/** Label */}
      <div className="flex items-center space-x-2 mb-2">
        <Text className="!text-textColors-label font-semibold">
          {field.label}
        </Text>
        <Text
          size="xs"
          className={
            field.required
              ? "!text-textColors-required"
              : "!text-textColors-optional"
          }
        >
          {field.required ? "(required)" : "(optional)"}
        </Text>
      </div>
      {/** Field */}
      {field.type === "input" ? (
        <input
          name={field.name}
          required={field.required}
          type={field.inputType}
          value={value}
          placeholder={field.placeholder}
          onChange={handleFieldChange}
          className="w-full rounded-3xl p-3 px-4 text-textColors-primary bg-transparent border-[1px] border-borderColors-primary outline-none"
        />
      ) : field.type === "textarea" ? (
        <textarea
          name={field.name}
          required={field.required}
          value={value}
          rows={4}
          placeholder={field.placeholder}
          onChange={handleFieldChange}
          className="w-full rounded-3xl p-3 px-4 text-textColors-primary bg-transparent border-[1px] border-borderColors-primary outline-none resize-none"
        />
      ) : field.type === "checkbox" ? (
        "Checkbox"
      ) : null}

      {/** Error */}
      {error && (
        <Text size="sm" className="!text-danger">
          {error}
        </Text>
      )}
    </div>
  );
};

export default FormField;
