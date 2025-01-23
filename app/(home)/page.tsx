import React from "react";
import Header from "@/features/(home)/components/Header";
import Hero from "@/features/(home)/components/Hero";
import PricingList from "@/features/(pricing)/components/PricingList";
import { Presentation } from "@/features/(home)/components/Presentation";

const HomePage = async () => {
  return (
    <main className="!bg-[#020B13]">
      <Header className="fixed top-0 left-0 w-full z-[5]" />
      <Hero />
      <Presentation />
      <PricingList className="container mx-auto" />
    </main>
  );
};

export default HomePage;
