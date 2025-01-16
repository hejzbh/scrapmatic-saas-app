import useForm, { FormValidators, FormValues } from "@/hooks/use-form";
import { FormFieldType } from "@/types/global";
import React from "react";
import FormField from "./FormField";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import Text from "../ui/Text";

interface FormProps {
  className?: string;
  defaultValues: FormValues;
  validators: FormValidators;
  fields: FormFieldType[];
  onSubmit: (values: FormValues) => Promise<void> | void; // eslint-disable-line
}

const Form = ({
  className = "",
  defaultValues,
  validators,
  fields = [],
  onSubmit,
}: FormProps) => {
  const { errors, handleFieldChange, handleSubmit, values, isSubmitting } =
    useForm({
      defaultValues,
      validators,
    });

  return (
    <div className="relative">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit);
        }}
        className={`space-y-6 ${className}`}
      >
        {fields?.map((field) => (
          <FormField
            field={field}
            value={values[field.name]}
            key={field.name}
            error={errors[field.name]}
            handleFieldChange={handleFieldChange}
          />
        ))}

        <Button
          variant="primary"
          disabled={isSubmitting}
          className="ml-auto"
          type="submit"
        >
          Submit
        </Button>
      </form>
      {isSubmitting && (
        <div className="absolute flex flex-col space-y-1 inset-0 top-[-10px] left-[-10px] right-[-10px] bottom-[-10px] rounded-3xl bg-opacity-50 backdrop-blur-md  justify-center items-center z-10">
          <Loader className="text-[60px]" /> {/* Your Loader component */}
          <Text>Processing...</Text>
        </div>
      )}
    </div>
  );
};

export default Form;
