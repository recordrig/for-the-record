import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";

interface StyledInfoIconProps {
  readonly color: string;
}

const StyledInfoIcon = styled.span<StyledInfoIconProps>`
  ${({ color }) => css`
    height: inherit;
    display: inline-block;
    width: inherit;

    svg {
      fill: ${color};
      height: inherit;
      width: inherit;
    }
  `}
`;

interface InfoIconProps {
  readonly color?: string;
  readonly type?: "default" | "filled" | "outline";
}

const InfoIcon: FunctionComponent<InfoIconProps> = ({
  color = "#000000",
  type = "default"
}) => (
  <StyledInfoIcon color={color}>
    {(type === "default" || type === "filled") && (
      <svg
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        aria-hidden="true"
      >
        <path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,16,7Zm4,17.125h-8v-2.25h2.875v-6.75h-1.875v-2.25h4.125v9h2.875Z" />
        <path
          fill="none"
          d="M16,7a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,16,7Zm4,17.125h-8v-2.25h2.875v-6.75h-1.875v-2.25h4.125v9h2.875Z"
          data-icon-path="inner-path"
        />
        <title>Information filled</title>
      </svg>
    )}
    {type === "outline" && (
      <svg
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        aria-hidden="true"
      >
        <path d="M17 22L17 13 13 13 13 15 15 15 15 22 12 22 12 24 20 24 20 22 17 22zM16 7a1.5 1.5 0 101.5 1.5A1.5 1.5 0 0016 7z" />
        <path d="M16,30A14,14,0,1,1,30,16,14,14,0,0,1,16,30ZM16,4A12,12,0,1,0,28,16,12,12,0,0,0,16,4Z" />
        <title>Information</title>
      </svg>
    )}
  </StyledInfoIcon>
);

export default InfoIcon;
