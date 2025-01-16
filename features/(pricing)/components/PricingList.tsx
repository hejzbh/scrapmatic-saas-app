// app/products/page.jsx
import React from "react";
import stripe from "@/lib/stripe";
import BuyButton from "./BuyButton";

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
    }))
    .sort((a, b) => a.price - b.price);
}

// Server komponenta za izlistavanje proizvoda
export default async function PricingList() {
  const products = await fetchProducts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="border p-4 rounded shadow hover:shadow-lg transition"
        >
          <h2 className="text-lg font-bold">{product.name}</h2>
          <p className="text-gray-700">
            Price: {product.price.toFixed(2)} {product.currency.toUpperCase()}
          </p>

          <BuyButton price={product.default_price} />
        </div>
      ))}
    </div>
  );
}
