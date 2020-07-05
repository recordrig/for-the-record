import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import { connect, useDispatch } from "react-redux";
import Text, { Heading, Paragraph } from "../components/Text";
import Section, { SectionIntro} from "../components/Section";

const StyledCookiesPage = styled.div``;

interface IndexPageProps {
  /** Made available through `connect()`. */
  readonly cookieConsent: boolean;
}

const CookiesPage: NextPage<IndexPageProps> = ({ cookieConsent }) => {
  const dispatch = useDispatch();

  return (
    <StyledCookiesPage>
      <Head>
        <title>Cookies.</title>
      </Head>
      <Section>
        <SectionIntro>
          <Heading color="#000000" h={1}>
            Cookies.
          </Heading>
          <Paragraph color="#000000">
            For some website features, RecordRig may use &quot;cookies&quot;.
            These are are small (temporary) text files which are stored inside
            your browser. On this page, we&apos;ll inform you of our cookie use.
            Feel free te adjust your cookie settings anytime.
          </Paragraph>
        </SectionIntro>
        <Text>
          <h3>Functional Cookies.</h3>
          <p>
            These are the cookies required for the website to function as
            expected.
          </p>
        </Text>
      </Section>
    </StyledCookiesPage>
  );
};

export default CookiesPage;
