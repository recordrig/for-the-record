import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";

interface StyledArrowRightIconProps {
  readonly color: string;
}

const StyledArrowRightIcon = styled.div<StyledArrowRightIconProps>`
  ${({ color }) => css`
    svg {
      fill: ${color};
    }
  `}
`;

interface ArrowRightIconProps {
  readonly color?: string;
}

const ArrowRightIcon: FunctionComponent<ArrowRightIconProps> = ({
  color = "#000000"
}) => (
  <StyledArrowRightIcon color={color}>
    <svg
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      aria-hidden="true"
    >
      <polygon points="18,6 16.6,7.4 24.1,15 3,15 3,17 24.1,17 16.6,24.6 18,26 28,16" />
      <title>Arrow right</title>
    </svg>
  </StyledArrowRightIcon>
);

export default ArrowRightIcon;
