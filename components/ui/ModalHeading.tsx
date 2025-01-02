import React from "react";
import Title from "@/components/ui/Title";
import Text from "@/components/ui/Text";
import Separator from "@/components/ui/Separator";

type ModalHeadingProps = {
  title: string;
  description: string;
};

const ModalHeading = ({ title, description }: ModalHeadingProps) => {
  return (
    <div className="space-y-2 md:space-y-1">
      <Title variant="h2" className="heading-clip">
        {title}
      </Title>
      <Text>{description}</Text>
      <Separator className="!my-5" />
    </div>
  );
};

export default ModalHeading;
