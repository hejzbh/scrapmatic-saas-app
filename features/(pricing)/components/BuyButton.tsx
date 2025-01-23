"use client";
import Button from "@/components/ui/Button";
import { useClientUser } from "@/features/(auth)/lib/useClientUser";
import { buy } from "@/lib/stripe";
import React from "react";

const BuyButton = ({
  price,
  className = "",
}: {
  price: { id: string };
  className?: string;
}) => {
  const user = useClientUser();
  if (!user) return null;
  return (
    <Button
      onClick={() => buy(price.id)}
      variant="primary"
      className={`!w-full !max-w-full ${className}`}
    >
      Choose
    </Button>
  );
};

export default BuyButton;
