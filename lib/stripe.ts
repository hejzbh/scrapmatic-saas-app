import { useServerUser } from "@/features/(auth)/lib/useServerUser";
import { Stripe } from "stripe";

export const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);

export const getLastPurchasedPack = async (customer: string) => {
  if (!customer) return null;
  const sessions = await stripe.checkout.sessions.list({
    customer,
    limit: 1,
    expand: ["data.line_items"],
  });

  if (!sessions?.data?.length) return null;

  const recentSession = sessions.data[0];

  const item = recentSession.line_items?.data[0];

  if (!item?.price?.product) return null;

  const pack = await stripe.products.retrieve(item?.price?.product as string);

  return pack;
};

// TODO: Move to the api bakcendn
export const buy = async function (priceId: string) {
  const user = await useServerUser();

  if (!user) throw new Error("Unauthorized");

  if (!user.stripeCustomerId) throw new Error("Not stripe customer");

  const session = await stripe.checkout.sessions.create({
    success_url: window.origin + "/app",
    cancel_url: window.location.href,
    payment_method_types: ["card", "paypal"],
    line_items: [{ quantity: 1, price: priceId }],
    customer: user.stripeCustomerId,
    mode: "payment",
  });

  if (session?.url) {
    window.location.assign(session.url);
  }
};

export default stripe;
