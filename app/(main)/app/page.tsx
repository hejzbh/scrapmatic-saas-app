import Text from "@/components/ui/Text";
import Title from "@/components/ui/Title";
import Image from "next/image";
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

      <div>
        <Text className="text-white mt-5 mb-1">
          Test card for stripe (Purchasing new credits)
        </Text>
        <div className="flex items-start space-x-2">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/1200px-Mastercard_2019_logo.svg.png"
            width={30}
            height={30}
            alt="Mastercard"
          />
          <div>
            <Text>Number: 5555555555554444</Text>
            <Text>CVC: Any 3 digits</Text>
            <Text>Date: Any future date</Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
