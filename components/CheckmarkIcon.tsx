import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";

interface StyledCheckmarkIconProps {
  readonly color: string;
}

const StyledCheckmarkIcon = styled.span<StyledCheckmarkIconProps>`
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

interface CheckmarkIconProps {
  readonly color?: string;
  readonly type?: "default" | "filled" | "outline";
}

const CheckmarkIcon: FunctionComponent<CheckmarkIconProps> = ({
  color = "#000000",
  type = "default"
}) => (
  <StyledCheckmarkIcon color={color}>
    {type === "default" && (
      <svg
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        aria-hidden="true"
      >
        <polygon points="12,21.2 4.9,14.1 3.5,15.5 10.6,22.6 12,24 26.1,9.9 24.7,8.4" />
        <title>Checkmark</title>
      </svg>
    )}
    {type === "filled" && (
      <svg
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        aria-hidden="true"
      >
        <path d="M16,2C8.3,2,2,8.3,2,16s6.3,14,14,14s14-6.3,14-14S23.7,2,16,2z M14,21.5l-5-5l1.6-1.5l3.4,3.4l7.4-7.4l1.6,1.6L14,21.5z" />
        <path
          d="M14,21.5l-5-5l1.6-1.5l3.4,3.4l7.4-7.4l1.6,1.6L14,21.5z"
          data-icon-path="inner-path"
          opacity="0"
        />
        <title>Checkmark filled</title>
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
        <path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28Z" />
        <polygon points="14 21.5 9 16.54 10.59 14.97 14 18.35 21.41 11 23 12.58 14 21.5" />
        <title>Checkmark outline</title>
      </svg>
    )}
  </StyledCheckmarkIcon>
);

export default CheckmarkIcon;
