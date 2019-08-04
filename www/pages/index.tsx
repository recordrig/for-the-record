import React, { FunctionComponent } from "react";
import styled from "styled-components";
import Link from "next/link";

const StyledIndexPage = styled.div`
  padding-top: 64px;
`;

const IndexPage: FunctionComponent = () => (
  <StyledIndexPage>
    <p>Hello world</p>
    <p>
      <Link href="/hello-you">
        <a>To other page</a>
      </Link>
    </p>
  </StyledIndexPage>
);

export default IndexPage;
