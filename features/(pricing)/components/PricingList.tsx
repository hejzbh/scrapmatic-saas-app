// app/products/page.jsx
import React from "react";
import stripe from "@/lib/stripe";
import BuyButton from "./BuyButton";
import Text from "@/components/ui/Text";
import Title from "@/components/ui/Title";
import Separator from "@/components/ui/Separator";

async function fetchProducts() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    active: true,
  });

  return products.data
    .map((product) => ({
      id: product.id,
      name: product.name,
      price: (product as any).default_price?.unit_amount / 100 || 0,
      currency: (product as any).default_price?.currency || "usd",
      default_price: product.default_price as { id: string },
      metadata: product.metadata,
    }))
    .sort((a, b) => a.price - b.price);
}

// Server komponenta za izlistavanje proizvoda
export default async function PricingList({
  className = "",
}: {
  className?: string;
}) {
  const products = await fetchProducts();

  return (
    <div className={`!py-20 ${className}`}>
      <Title
        variant="h1"
        size="lg"
        className="heading-clip mx-auto text-center mb-10"
      >
        Choose your pack
      </Title>
      <ul
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 `}
      >
        {products.map((product) => (
          <li
            key={product.id}
            className="border border-borderColors-primary rounded-3xl p-6  shadow hover:shadow-lg transition"
          >
            <Title variant="h2" className="heading-clip" size="sm">
              {product.name}
            </Title>
            <Text className="heading-clip !text-3xl font-semibold my-2">
              {product.price.toFixed(2)} {product.currency.toUpperCase()}
            </Text>
            <Separator className="!my-5" />
            <Text size="xl">
              +
              {product.name === "FREE"
                ? 100
                : new Intl.NumberFormat().format(
                    +product.metadata.credits
                  )}{" "}
              credits
            </Text>
            {product.name !== "FREE" && (
              <BuyButton className="mt-5" price={product.default_price} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
