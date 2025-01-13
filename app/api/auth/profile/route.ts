import { getSession } from "@auth0/nextjs-auth0";
import db from "@/lib/db";

export async function GET() {
  try {
    // 1) Retrieve the user session
    const session = await getSession();

    if (!session) {
      // If no session exists, return a 400 Bad Request
      return new Response(null, { status: 400 });
    }

    const { user } = session;

    // 2) Check if the user's balance already exists
    const existingUserBalance = await db.userBalance.findFirst({
      where: { userId: user.sub },
    });

    // 3) Create a new balance if none exists, else use the existing one
    const userBalance =
      existingUserBalance ||
      (await db.userBalance.create({
        data: {
          userId: user.sub,
          availableCredits: 100,
        },
      }));

    // Attach the balance to the user object
    user.balance = userBalance;

    // 4) Return the user object
    return Response.json(user, { status: 200 });
  } catch (error) {
    // Return a 500 Internal Server Error
    return Response.json(null, { status: 500 });
  }
}
