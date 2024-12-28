import React from "react";
import Header from "@/features/(home)/components/Header";
import Hero from "@/features/(home)/components/Hero";

const HomePage = async () => {
  return (
    <main>
      <Header className="fixed top-0 left-0 w-full z-[5]" />
      <Hero />
    </main>
  );
};

export default HomePage;
