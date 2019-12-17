import React from "react";
import { NextPage } from "next";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import withRedux from "../../store/withRedux";
import { useInterval } from "../../store";
import Clock from "../../components/Clock";
import Counter from "../../components/Counter";
import Section from "../../components/Section";

const StyledBuyRecordRigPage = styled.div``;

const BuyRecordRigPage: NextPage = () => {
  // Tick the time every second
  const dispatch = useDispatch();
  useInterval(() => {
    dispatch({
      type: "TICK",
      light: true,
      lastUpdate: Date.now()
    });
  }, 1000);
  return (
    <StyledBuyRecordRigPage>
      <Section>
        <Clock />
        <Counter />
      </Section>
    </StyledBuyRecordRigPage>
  );
};

BuyRecordRigPage.getInitialProps = ({ reduxStore }) => {
  // Tick the time once, so we'll have a
  // valid time before first render
  const { dispatch } = reduxStore;
  dispatch({
    type: "TICK",
    light: typeof window === "object",
    lastUpdate: Date.now()
  });

  return {};
};

export default withRedux(BuyRecordRigPage);
