import React, { FunctionComponent } from "react";
import styled from "styled-components";

const StyledIndexPage = styled.div`
  padding-top: 64px;
`;

const IndexPage: FunctionComponent = () => (
  <StyledIndexPage>
    <p>Hello world</p>
  </StyledIndexPage>
);

export default IndexPage;
