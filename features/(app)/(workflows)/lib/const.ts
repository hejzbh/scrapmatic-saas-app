import { FormFieldType } from "@/types";

export const workflowFormFields: FormFieldType[] = [
  {
    name: "name",
    label: "Name",
    type: "input",
    placeholder: "Enter workflow's name",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Provide a brief description of what your workflow does.",
    required: false,
  },
];
