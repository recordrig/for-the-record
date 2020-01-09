import React from "react";
import { NextPage } from "next";
import styled from "styled-components";
import withRedux from "../../store/_withRedux";
import Section from "../../components/Section";
import { Heading } from "../../components/Text";

const StyledBuyRecordRigPage = styled.div``;

const BuyRecordRigPage: NextPage = () => (
  <StyledBuyRecordRigPage>
    <Section>
      <Heading center>Choose your RecordRig.</Heading>
      <div>
        <p>
          RecordRig -&nbsp;
          <br />
          <i>Stealth Black</i>
        </p>
        <img alt="" src="/recordrig-black.png" />
        <span>From € 2299</span>
        <button type="button">Select</button>
      </div>
      <div>
        <p>
          RecordRig -&nbsp;
          <br />
          <i>Pristine White</i>
        </p>
        <img alt="" src="/recordrig-white.png" />
        <span>From € 2299</span>
        <button type="button">Select</button>
      </div>
    </Section>
  </StyledBuyRecordRigPage>
);

export default withRedux(BuyRecordRigPage);
