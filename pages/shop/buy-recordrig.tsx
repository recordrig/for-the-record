import React from "react";
import { NextPage } from "next";
import styled from "styled-components";
import Link from "next/link";
import withRedux from "../../store/_withRedux";
import Section from "../../components/Section";

const StyledBuyRecordRigPage = styled.div``;

const BuyRecordRigPage: NextPage = () => (
  <StyledBuyRecordRigPage>
    <Section>
      <h1>Choose your RecordRig.</h1>
      <p>Starting at €1799.</p>
      <Link href="/shop/checkout">Go to checkout</Link>
    </Section>
  </StyledBuyRecordRigPage>
);

export default withRedux(BuyRecordRigPage);
