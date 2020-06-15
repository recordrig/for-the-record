import React, { FunctionComponent, useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";

interface StyledIconProps {
  readonly color: string;
}

const StyledIcon = styled.span<StyledIconProps>`
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

interface ArrowRightIconProps {
  readonly color?: string;
}

export const ArrowRightIcon: FunctionComponent<ArrowRightIconProps> = ({
  color = "#000000"
}) => (
  <StyledIcon color={color}>
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
  </StyledIcon>
);

interface CheckIconProps {
  readonly color?: string;
  readonly type?: "default" | "filled" | "outline";
}

export const CheckIcon: FunctionComponent<CheckIconProps> = ({
  color = "#000000",
  type = "default"
}) => (
  <StyledIcon color={color}>
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
  </StyledIcon>
);

interface CrossIconProps {
  readonly color?: string;
  readonly type?: "default" | "filled" | "outline";
}

export const CrossIcon: FunctionComponent<CrossIconProps> = ({
  color = "#000000",
  type = "default"
}) => (
  <StyledIcon color={color}>
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
  </StyledIcon>
);

interface ErrorIconProps {
  readonly color?: string;
  readonly type?: "default" | "filled" | "outline";
}

export const ErrorIcon: FunctionComponent<ErrorIconProps> = ({
  color = "#000000",
  type = "default"
}) => (
  <StyledIcon color={color}>
    {(type === "default" || type === "filled") && (
      <svg
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        aria-hidden="true"
      >
        <path d="M16,2C8.2,2,2,8.2,2,16s6.2,14,14,14s14-6.2,14-14S23.8,2,16,2z M21.4,23L9,10.6L10.6,9L23,21.4L21.4,23z" />
        <path
          fill="none"
          d="M21.4,23L9,10.6L10.6,9L23,21.4L21.4,23z"
          data-icon-path="inner-path"
          opacity="0"
        />
        <title>Error filled</title>
      </svg>
    )}
    {type === "outline" && (
      <svg
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        aria-hidden="true"
      >
        <path d="M16,2C8.2,2,2,8.2,2,16s6.2,14,14,14s14-6.2,14-14S23.8,2,16,2z M16,28C9.4,28,4,22.6,4,16S9.4,4,16,4s12,5.4,12,12	S22.6,28,16,28z" />
        <path
          d="M14.8 7.3H17V24.900000000000002H14.8z"
          transform="rotate(-45.001 15.929 16.071)"
        />
        <title>Error outline</title>
      </svg>
    )}
  </StyledIcon>
);

interface InfoIconProps {
  readonly color?: string;
  readonly type?: "default" | "filled" | "outline";
}

export const InfoIcon: FunctionComponent<InfoIconProps> = ({
  color = "#000000",
  type = "default"
}) => (
  <StyledIcon color={color}>
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
  </StyledIcon>
);

interface StyledShoppingBagIconProps {
  readonly animate: boolean;
}

const fadeOutIcon = keyframes`
  0% {
    opacity: 1;
  }

  /* Delay fade out so that the icons will overlap. */
  10% {
    opacity: 1;
  }

  20% {
    opacity: 0;
  }

  100% {
    opacity: 0;
  }
`;

const fadeInIcon = keyframes`
  0% {
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  100% {
    opacity: 1;
  }
`;

const StyledShoppingBagIconStill = styled.object<StyledShoppingBagIconProps>`
  bottom: 0;
  position: absolute;
  width: 32px;

  ${({ animate }) => css`
    animation: ${animate && fadeOutIcon} 1.4s; /* Slightly shorter so that it is visible again. */
  `}
`;

const StyledShoppingBagIconAnimated = styled.object<StyledShoppingBagIconProps>`
  bottom: 0;
  position: absolute;
  width: 32px;

  ${({ animate }) => css`
    animation: ${animate ? fadeInIcon : fadeOutIcon} 1.5s;
  `}
`;

const bulge = keyframes`
  0% {
    transform: scale(.1, .1);
  }

  75% {
    transform: scale(.1, .1);
  }

  85% {
    transform: scale(1.1, 1.1);
  }

  100% {
    transform: scale(1, 1);
  }
`;

const StyledShoppingBagIcon = styled.div`
  height: inherit;
  min-height: 32px;

  > span {
    display: inline-block;
    height: inherit;
    min-height: 32px;
    position: relative;
    width: 0;
  }

  > span > span {
    animation: ${bulge} 1.5s ease;
    background-color: #ff4e28;
    border-radius: 8px;
    bottom: 1px;
    color: #ffffff;
    display: inline-block;
    font-size: 10px;
    font-weight: bold;
    height: 14px;
    left: 16px;
    line-height: 13px;
    min-width: 12px;
    padding: 1px 2px;
    position: absolute;
    text-align: center;
    z-index: 1;
  }
`;

interface ShoppingBagIconProps {
  readonly amount: number;
}

/**
 * Shopping bag with amount indicater.
 *
 * Animates whenever an addition is made. Inherits parent height and aligns to its bottom side.
 */
export const ShoppingBagIcon: FunctionComponent<ShoppingBagIconProps> = ({
  amount
}) => {
  // Set the local amount once from props.
  const [stateAmount, setStateAmount] = useState(amount);

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Animate addition if needed.
    if (amount > stateAmount) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 1500);
    }

    // Sync state amount.
    if (amount !== stateAmount) {
      setStateAmount(amount);
    }
  }, [amount]);

  return (
    <StyledShoppingBagIcon>
      <span>
        <StyledShoppingBagIconStill
          animate={animate}
          aria-label=""
          type="image/svg+xml"
          data="/shopping-bag-still.svg"
        />
        {animate && (
          <StyledShoppingBagIconAnimated
            animate={animate}
            aria-label=""
            type="image/svg+xml"
            data="/shopping-bag-add-animation.svg"
          />
        )}
        {amount > 0 && <span>{amount}</span>}
      </span>
    </StyledShoppingBagIcon>
  );
};

const StyledWarnIcon = styled(StyledIcon)<StyledIconProps>`
  /* The exclamation mark is a seperate path. Opacity: 0 could be set to make it translucent should future specs require this. */
  svg [data-icon-path="inner-path"] {
    fill: #000000;
    opacity: 1;
  }
`;

interface WarnIconProps {
  readonly color?: string;
  readonly type?: "default" | "filled" | "outline";
}

export const WarnIcon: FunctionComponent<WarnIconProps> = ({
  color = "#999999",
  type = "default"
}) => (
  <StyledWarnIcon color={color}>
    {(type === "default" || type === "filled") && (
      <svg
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        aria-hidden="true"
      >
        <path d="M16,2C8.3,2,2,8.3,2,16s6.3,14,14,14s14-6.3,14-14C30,8.3,23.7,2,16,2z M14.9,8h2.2v11h-2.2V8z M16,25	c-0.8,0-1.5-0.7-1.5-1.5S15.2,22,16,22c0.8,0,1.5,0.7,1.5,1.5S16.8,25,16,25z" />
        <path
          fill="blue"
          d="M17.5,23.5c0,0.8-0.7,1.5-1.5,1.5c-0.8,0-1.5-0.7-1.5-1.5S15.2,22,16,22	C16.8,22,17.5,22.7,17.5,23.5z M17.1,8h-2.2v11h2.2V8z"
          data-icon-path="inner-path"
          opacity="0"
        />
        <title>Warning filled</title>
      </svg>
    )}
    {type === "outline" && (
      <svg
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        aria-hidden="true"
      >
        <path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28Z" />
        <path d="M15 8H17V19H15zM16 22a1.5 1.5 0 101.5 1.5A1.5 1.5 0 0016 22z" />
        <title>Warning</title>
      </svg>
    )}
  </StyledWarnIcon>
);
