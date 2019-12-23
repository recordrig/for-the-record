/**
 * The Stripe publishable key is intended for identification and may be included
 * in the client side package (sent to the frontend).
 *
 * When running in the production environment, its value is automatically set to the
 * "live" key, which will work on production data. When not running in production, it
 * will hold the value of the "test" key, which will only work on test data.
 *
 * The "live" key is set as an environment variable through `now secrets` and as such,
 * will be available in production.
 */
export const STRIPE_PUBLISHABLE_KEY =
  process.env.NODE_ENV === "production"
    ? process.env.STRIPE_PUBLISHABLE_KEY || ""
    : "pk_test_3G6ypK6zJ54md42jmxHuFC1R";

/**
 * The Stripe secret key provides access to the Stripe API.
 *
 * When running in the production environment, its value is automatically set to the
 * "live" key, which will work on production data. When not running in production, it
 * will hold the value of the "test" key, which will only work on test data.
 *
 * The "live" key is set as an environment variable through `now secrets` and as such,
 * will be available in production.
 */
export const STRIPE_SECRET_KEY =
  process.env.NODE_ENV === "production"
    ? process.env.STRIPE_SECRET_KEY || ""
    : "sk_test_8IPWrUeIxJqkkvKYATiGqX4a";
