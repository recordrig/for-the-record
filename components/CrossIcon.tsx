import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";

interface StyledCrossIconProps {
  readonly color: string;
}

const StyledCrossIcon = styled.span<StyledCrossIconProps>`
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

interface CrossIconProps {
  readonly color?: string;
  readonly type?: "default" | "filled" | "outline";
}

const CrossIcon: FunctionComponent<CrossIconProps> = ({
  color = "#000000",
  type = "default"
}) => (
  <StyledCrossIcon color={color}>
    {(type === "default" || type === "filled") && (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        aria-hidden="true"
      >
        <path d="M16,2C8.3,2,2,8.3,2,16s6.3,14,14,14s14-6.3,14-14S23.7,2,16,2z M21.4,23L16,17.6L10.6,23L9,21.4l5.4-5.4L9,10.6L10.6,9 l5.4,5.4L21.4,9l1.6,1.6L17.6,16l5.4,5.4L21.4,23z" />
        <path
          fill="none"
          d="M21.4,23L16,17.6L10.6,23L9,21.4l5.4-5.4L9,10.6L10.6,9l5.4,5.4L21.4,9l1.6,1.6L17.6,16 l5.4,5.4L21.4,23z"
          data-icon-path="inner-path"
          opacity="0"
        />
        <title>Cross</title>
      </svg>
    )}
    {type === "outline" && (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        aria-hidden="true"
      >
        <path d="M16,2C8.2,2,2,8.2,2,16s6.2,14,14,14s14-6.2,14-14S23.8,2,16,2z M16,28C9.4,28,4,22.6,4,16S9.4,4,16,4s12,5.4,12,12 S22.6,28,16,28z" />
        <polygon points="21.4,23 16,17.6 10.6,23 9,21.4 14.4,16 9,10.6 10.6,9 16,14.4 21.4,9 23,10.6 17.6,16 23,21.4" />
        <title>Cross outline</title>
      </svg>
    )}
  </StyledCrossIcon>
);

export default CrossIcon;
