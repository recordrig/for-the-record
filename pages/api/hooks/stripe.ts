import { buffer } from "micro";
import Cors from "micro-cors";
import { NextApiRequest, NextApiResponse } from "next";
import Airtable from "airtable";
import Stripe from "stripe";

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2020-03-02"
});

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET || "";

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false
  }
};

const cors = Cors({
  allowMethods: ["POST", "HEAD"]
});

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"] || "";

    // eslint-disable-next-line functional/no-let
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        webhookSecret
      );
    } catch (err) {
      // On error, log and return the error message.
      console.log(`❌ Error message: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    if (event.type === "payment_intent.succeeded") {
      const records = await base("order_capacity")
        .select({ maxRecords: 1, view: "Grid view" })
        .firstPage();

      const { id } = records[0];
      const limit = records[0].get("limit");

      // Reduce order_capacity by 1.
      base("order_capacity").update(
        [
          {
            id,
            fields: {
              limit: limit - 1
            }
          }
        ],
        function(err) {
          if (err) {
            console.error(err);
          }
        }
      );
    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event.
    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default cors(webhookHandler as any);
