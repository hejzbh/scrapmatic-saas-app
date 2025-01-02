import React from "react";
import Title from "@/components/ui/Title";
import Text from "@/components/ui/Text";
import Breadcrumb from "@/features/(app)/(navigation)/components/Breadcrumb";
import Button, { ButtonProps } from "./Button";
import Separator from "./Separator";

type PageHeadingProps = {
  className?: string;
  title: string;
  description: string;
  buttonProps?: ButtonProps;
};

const PageHeading = ({
  className = "",
  title,
  description,
  buttonProps,
}: PageHeadingProps) => {
  return (
    <div className={`mb-10 ${className}`}>
      <Breadcrumb className="flex lg:hidden" />
      <div className={buttonProps ? "flex items-center justify-between" : ""}>
        <div>
          <Title variant="h1" className="mt-3 !text-primary">
            {title}
          </Title>
          <Text size="md">{description}</Text>
        </div>

        {buttonProps && <Button {...buttonProps} />}
      </div>

      <Separator className="my-7 opacity-30" />
    </div>
  );
};

export default PageHeading;
