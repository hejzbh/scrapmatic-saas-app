import { FormFieldType } from "@/types/global";
import React from "react";
import Text from "@/components/ui/Text";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";

interface FormFieldProps {
  className?: string;
  field: FormFieldType;
  error: string | null | undefined;
  handleFieldChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> // eslint-disable-line
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
      <Label required={field.required} className="mb-2">
        {field.label}
      </Label>
      {/** Field */}
      {field.type === "input" ? (
        <Input
          name={field.name}
          required={field.required}
          type={field.inputType}
          value={value}
          placeholder={field.placeholder}
          onChange={handleFieldChange}
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
