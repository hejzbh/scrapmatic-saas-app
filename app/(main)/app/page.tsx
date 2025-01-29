import Text from "@/components/ui/Text";
import Title from "@/components/ui/Title";
import React from "react";

const DashboardPage = () => {
  return (
    <div>
      <Title variant="h1">Scrapmatic</Title>
      <Text className="text-white mt-5">
        Allowed web origins to test scraping:
      </Text>
      {[
        "scrapmatic.vercel.app",
        "www.webranch.team",
        "hazim-tulumovic.vercel.app",
        "www.wikipedia.org",
      ]?.map((origin, idx) => (
        <Text key={idx}>{origin}</Text>
      ))}
    </div>
  );
};

export default DashboardPage;
