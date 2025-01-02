import { FormValidators } from "@/hooks/use-form";

export const createWorkflowValidators: FormValidators = {
  name: (value) =>
    value.length < 8 ? "Name should be at least 8 charachters" : null,
};
