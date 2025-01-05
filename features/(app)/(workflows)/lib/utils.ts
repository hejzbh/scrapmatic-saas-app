import { FormValidators } from "@/hooks/use-form";

export const createWorkflowValidators: FormValidators = {
  name: (value) =>
    value.length < 8
      ? "Name should be at least 8 charachters"
      : value.length > 50
      ? "Name should be less than 50 charachters"
      : null,
  description: (value) =>
    value.length > 500
      ? "Description should be less than 500 charachters"
      : null,
};
