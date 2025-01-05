"use server";
import { AuthUserType } from "@/types/global";
import { getSession } from "@auth0/nextjs-auth0";

export async function useServerUser(): Promise<AuthUserType> {
  try {
    const session = await getSession();

    if (!session?.user) throw new Error();

    session.user.id = session.user.sub;

    return session?.user as AuthUserType;
  } catch (err) {
    throw new Error("Unauthorized");
  }
}
