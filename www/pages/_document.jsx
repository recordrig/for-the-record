import React from "react";
import Document from "next/document";
import { ServerStyleSheet } from "styled-components";

/**
 * Extends Next.js' `Document` and injects the server side rendered styles into the `<head>`.
 * Result is universal styles: serve within HTML on first render, then load the rest in the client.
 * See [Zeit's with-styled-components full example](https://github.com/zeit/next.js/tree/canary/examples/with-styled-components)
 */
export default class RecordRigDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }
}
