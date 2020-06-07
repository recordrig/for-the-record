import React from "react";
import { NextPage } from "next";
import Router from "next/router";
import Section from "../../components/Section";

const ShopPage: NextPage = () => (
  <Section>
    <p>
      Redirecting to <a href="/shop/buy-recordrig">/shop/buy-recordrig</a>
      ...
    </p>
  </Section>
);

ShopPage.getInitialProps = async ({ res }) => {
  if (typeof window === "undefined" && res) {
    res.writeHead(302, { Location: "/shop/buy-recordrig" });
    res.end();
  } else {
    Router.push("/shop/buy-recordrig");
  }

  return {};
};

export default ShopPage;
