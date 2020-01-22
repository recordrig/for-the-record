import "next";
import { Store } from "redux";

/*
 * Add typings for passing the reduxStore in pages (when using `getInitialProps()`).
 * See [discussion about NextPageContext typings on the Next.js Community](https://spectrum.chat/next-js/general/how-would-you-type-this~662bfdb5-b174-4503-94a6-e6ad83bca204).
 */
declare module "next" {
  export interface NextPageContext {
    readonly reduxStore: Store;
  }
}
