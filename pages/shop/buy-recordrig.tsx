import React from "react";
import { NextPage } from "next";
import styled from "styled-components";
import withRedux from "../../store/_withRedux";
import Section from "../../components/Section";

const StyledBuyRecordRigPage = styled.div``;

const BuyRecordRigPage: NextPage = () => (
  <StyledBuyRecordRigPage>
    <Section>
      <h1>Buy RecordRig.</h1>
    </Section>
  </StyledBuyRecordRigPage>
);

export default withRedux(BuyRecordRigPage);
