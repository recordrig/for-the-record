export {};
declare global {
  interface Window {
    /**
     * We assume Stripe's client-side script is included on every page.
     */
    Stripe: any;
  }
}
