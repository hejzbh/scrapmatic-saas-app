import React from "react";
import Header from "@/features/(home)/components/Header";
import Hero from "@/features/(home)/components/Hero";
import PricingList from "@/features/(pricing)/components/PricingList";

const HomePage = async () => {
  return (
    <main>
      <Header className="fixed top-0 left-0 w-full z-[5]" />
      <Hero />
      <PricingList />
    </main>
  );
};

export default HomePage;
