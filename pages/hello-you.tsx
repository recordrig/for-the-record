import React, { FunctionComponent } from "react";
import styled from "styled-components";
import Link from "next/link";

const StyledHelloYouPage = styled.div`
  padding-top: 64px;
`;

const IndexPage: FunctionComponent = () => (
  <StyledHelloYouPage>
    <p>Hello you</p>
    <p>
      <Link href="/">
        <a>To Home</a>
      </Link>
    </p>
  </StyledHelloYouPage>
);

export default IndexPage;
