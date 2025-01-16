import { getSession } from "@auth0/nextjs-auth0";
import db from "@/lib/db";
import { getLastPurchasedPack } from "@/lib/stripe";

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

    // Function is done if user didnt have user balance created
    if (!existingUserBalance) return Response.json(user, { status: 200 });

    //  Check user last purchased plan (credits) and compare is it loaded
    const lastPurchasedPack = await getLastPurchasedPack(user.stripeCustomerId);

    if (
      lastPurchasedPack &&
      userBalance.lastLoadedPackId !== lastPurchasedPack.id
    ) {
      userBalance.availableCredits += Number(
        lastPurchasedPack.metadata.credits || 0
      );
      await db.userBalance.update({
        where: { id: userBalance.id },
        data: {
          availableCredits: userBalance.availableCredits,
          lastLoadedPackId: lastPurchasedPack.id,
        },
      });
    }

    // 4) Return the user object
    return Response.json(user, { status: 200 });
  } catch (error: any) {
    // Return a 500 Internal Server Error
    return Response.json(error.message, { status: 500 });
  }
}

/**    const sessions = await stripe.checkout.sessions.list({
      customer: customerId,
      limit: 1,
      payment_status: "paid",
      order: "desc",
    }); */
