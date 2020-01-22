export {};
declare global {
  interface Window {
    /**
     * Refers to Stripe's client-side script which we assume to be present on
     * the browser's window object. This means we assume any page that's rendered
     * to have the script included through a script tag.
     *
     * Official Stripe typings an in the process of being added in their repo,
     * but we've found them to be buggy at the time of writing (they're still in
     * alpha) so we won't bother typing Stripe for now.
     */
    readonly Stripe: any;
  }
}
