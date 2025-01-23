"use client";
import { useClientUser } from "@/features/(auth)/lib/useClientUser";
import { useUserBalance } from "@/features/(app)/(balance)/hooks/use-user-balance";
import React, { useEffect } from "react";
import { PiCoinsLight } from "react-icons/pi";
import Text from "@/components/ui/Text";

const UserBalance = () => {
  const { availableCredits, loadCredits, areCreditsLoaded } = useUserBalance();
  const user = useClientUser();

  useEffect(() => {
    if (areCreditsLoaded || !user?.balance) return;

    loadCredits(user.balance.availableCredits);
  }, [areCreditsLoaded, user]);

  return (
    <div className="p-3 flex items-center flex-col justify-center">
      {" "}
      <Text size="md" className="!text-textColors-label">
        Available credits
      </Text>
      <div className="flex items-center">
        <PiCoinsLight className="text-credits text-3xl mr-3" />
        <Text className="!text-credits">{availableCredits}</Text>
      </div>
    </div>
  );
};

export default UserBalance;
