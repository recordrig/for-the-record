import Stripe from "stripe";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Initiate the Stripe checkout process. It returns the Session ID, which
 * ought to be used when redirecting to the checkout.
 */
export default async (_req, res): Promise<void> => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        name: "RecordRig - Stealth Black",
        description: "Description",
        images: ["https://example.com/t-shirt.png"],
        // TODO: Calculate amount based on product ID's (do not blindly accept
        // numbers sent from the frontend - these could have been tampered with).
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
