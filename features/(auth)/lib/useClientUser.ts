"use server";
import { AuthUserType } from "@/types/global";
import { useUser } from "@auth0/nextjs-auth0/client";

export function useClientUser(): AuthUserType | null {
  const { user } = useUser();

  if (!user) return null;

  user.id = user.sub;

  return user as AuthUserType;
}
