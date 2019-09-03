import React, { FunctionComponent } from "react";
import styled from "styled-components";

const StyledTopMenu = styled.div`
  background-color: #fff;
  height: 64px;
  width: 100%;
`;

const TopMenu: FunctionComponent = () => (
  <StyledTopMenu>
    <p>TopMenu</p>
  </StyledTopMenu>
);

export default TopMenu;
