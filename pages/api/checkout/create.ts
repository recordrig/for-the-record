// We allow non-camelcase since we are dealing with an external API here
// which follows a different convention for key names.
/* eslint-disable @typescript-eslint/camelcase */
import Stripe from "stripe";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Initiate the Stripe checkout process. It returns the Session ID, which
 * ought to be used when redirecting to the checkout.
 */
export default async (_req, res): Promise<void> => {
  const session = await stripe.checkout.sessions.create({
    billing_address_collection: "required",
    payment_method_types: ["card"],
    line_items: [
      {
        name: "RecordRig - Stealth Black",
        description: "Description",
        images: ["https://example.com/t-shirt.png"],
        amount: 239900,
        currency: "eur",
        quantity: 1
      }
    ],
    success_url: "https://example.com/success",
    cancel_url: "https://example.com/cancel"
  });

  res.json(session);
};
