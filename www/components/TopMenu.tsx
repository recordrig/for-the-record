import React, { FunctionComponent } from "react";
import styled from "styled-components";

const StyledTopMenu = styled.div`
  background-color: #ccc;
  height: 64px;
  position: fixed;
  width: 100%;
  z-index: 1;
`;

const TopMenu: FunctionComponent = () => (
  <StyledTopMenu>
    <p>TopMenu</p>
  </StyledTopMenu>
);

export default TopMenu;
