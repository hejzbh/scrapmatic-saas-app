import { useEffect, useState, useCallback } from "react";

export type FormValues = { [key: string]: any };
type FormErrors = { [key: string]: string };
export type FormValidators = {
  [key: string]: (value: string) => string | undefined | null;
};

export const useForm = ({
  defaultValues,
  validators,
}: {
  defaultValues: FormValues;
  validators: FormValidators;
}) => {
  const [values, setValues] = useState<FormValues>(defaultValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initializing default values
  useEffect(() => {
    if (!values) setValues(defaultValues);
  }, [defaultValues]);

  const handleFieldChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;

      setValues((values) => ({ ...values, [name]: value }));

      // Clear errors when field changes
      if (errors[name]) {
        if (!validators[name](value)) {
          clearErrors(name);
        }
      }
    },
    [errors, validators]
  );

  const clearErrors = useCallback((name?: string) => {
    setErrors((errors) => {
      if (name) {
        delete errors[name];
        return { ...errors };
      } else {
        return {};
      }
    });
  }, []);

  const validateForm = useCallback(() => {
    let newErrors: FormErrors = {};

    for (const key in validators) {
      const validateFunction = validators[key];

      const errorMsg = validateFunction(values[key]);

      if (errorMsg) {
        newErrors[key] = errorMsg;
      }
    }

    setErrors(newErrors);

    return Object.values(newErrors).length === 0; // Form is valid if there are no errors
  }, [validators, values]);

  const handleSubmit = useCallback(
    async (onSubmit: (values: FormValues) => Promise<void> | void) => {
      try {
        if (isSubmitting) return;

        setIsSubmitting(true);

        if (validateForm()) {
          await onSubmit(values);
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [isSubmitting, validateForm, values]
  );

  return {
    values,
    errors,
    isSubmitting,
    clearErrors,
    handleFieldChange,
    validateForm,
    handleSubmit,
  };
};

export default useForm;
