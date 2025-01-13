"use client";
import { buy } from "@/lib/stripe";
import React from "react";

const BuyButton = ({ price }: { price: { id: string } }) => {
  console.log(price);
  return (
    <button
      onClick={() => buy(price.id)}
      className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Buy
    </button>
  );
};

export default BuyButton;
