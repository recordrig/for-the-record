/* eslint-disable */
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        name: "RecordRig - Stealth Black",
        description: "Description",
        images: [""],
        amount: 2,
        currency: "eur",
        quantity: 1
      }
    ],
    success_url: "https://localhost.com/shop/thank-you",
    cancel_url: "https://localhost.com/shop/cancel"
  });
  res.json(session);
};
