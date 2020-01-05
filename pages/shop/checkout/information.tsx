import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import fetch from "isomorphic-unfetch";
import absoluteUrl from "next-absolute-url";
import withRedux from "../../../store/_withRedux";
import Section from "../../../components/Section";

type CheckoutInformationPageProps = {
  myVar: string;
};

const CheckoutInformationPage: NextPage<CheckoutInformationPageProps> = ({
  myVar
}: CheckoutInformationPageProps) => {
  return <Section>Personal Info</Section>;
};

CheckoutInformationPage.getInitialProps = async ({
  req
}): Promise<CheckoutInformationPageProps> => {
  const { origin } = absoluteUrl(req);
  const res = await fetch(`${origin}/api/checkout/create`);
  const data = await res.json();

  return {
    customerId: data.id
  };
};

export default withRedux(CheckoutInformationPage);
