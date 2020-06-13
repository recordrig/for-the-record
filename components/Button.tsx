import React, { FunctionComponent, ReactNode, ReactNodeArray } from "react";
import styled, { css } from "styled-components";

const sharedStyles = (clicked: boolean) => css`
  border-radius: 4px;
  border-left: 0;
  border-right: 0;
  border-top: 0;
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
  padding: 0;
  text-align: center;
  transition: 0.2s ease 0s;
  width: 100%;

  @media (max-width: 1023px) {
    margin: 0 auto;
  }

  @media (max-width: 449px) {
    font-size: 18px;
    line-height: 48px;
  }

  @media (min-width: 450px) and (max-width: 1023px) {
    font-size: 18px;
    line-height: 48px;
  }

  @media (min-width: 550px) and (max-width: 1023px) {
    font-size: 24px;
    line-height: 64px;
  }

  @media (min-width: 700px) {
    font-size: 24px;
    line-height: 64px;
  }

  background-color: ${clicked ? "transparent" : "#0f62fe"};
  border-bottom: ${clicked ? "1px solid #24a148" : "2px solid #002d9c"};
  border-top: ${clicked ? "1px solid #24a148" : 0};
  border-right: ${clicked ? "1px solid #24a148" : 0};
  border-left: ${clicked ? "1px solid #24a148" : 0};
  color: ${clicked ? "#24a148" : "#ffffff"};
  font-size: ${clicked ? "21px" : "24px"};
`;

interface StyledButtonProps {
  readonly clicked: boolean;
}

const StyledAnchorButton = styled.a<StyledButtonProps>`
  ${({ clicked }) => sharedStyles(clicked)}
  display: inline-block;
`;

const StyledButton = styled.button<StyledButtonProps>`
  ${({ clicked }) => sharedStyles(clicked)}
`;

interface ButtonProps {
  readonly children: ReactNode | ReactNodeArray | Element;
  /** Optionally pass `clicked` to make the button appear... clicked. */
  readonly clicked?: boolean;
  /** Optionally pass a custom string to be rendered as an HTML data element `data-cy` to aid integration tests. */
  readonly dataCy?: string;
  /** Optionally define a function to execute when the button is clicked. */
  readonly onClick?: Function;
  /** Optionally use an `anchor` instead of a `button` element. */
  readonly isLink?: boolean;
}

/**
 * Big, blue button.
 */
const Button: FunctionComponent<ButtonProps> = ({
  children,
  clicked = false,
  dataCy = undefined,
  onClick = undefined,
  isLink = false
}) => {
  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <>
      {isLink ? (
        <StyledAnchorButton
          clicked={clicked}
          data-cy={dataCy}
          onClick={() => handleClick()}
        >
          {children}
        </StyledAnchorButton>
      ) : (
        <StyledButton
          clicked={clicked}
          data-cy={dataCy}
          onClick={() => handleClick()}
        >
          {children}
        </StyledButton>
      )}
    </>
  );
};

export default Button;
