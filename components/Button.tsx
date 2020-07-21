import React, { FunctionComponent, ReactNode, ReactNodeArray } from "react";
import styled, { css } from "styled-components";
import Link from "next/link";

const sharedStyles = (appearDisabled: boolean, clicked: boolean) => css`
  border-radius: 4px;
  border-left: 0;
  border-right: 0;
  border-top: 0;
  box-sizing: border-box;
  cursor: pointer;
  opacity: ${appearDisabled ? 0.6 : 1};
  outline: none;
  padding: 0;
  text-align: center;
  transition: 0.2s ease 0s;
  width: 100%;

  @media (max-width: 1023px) {
    margin: 0 auto;
  }

  @media (max-width: 549px) {
    font-size: 18px;
    line-height: 48px;
  }

  @media (min-width: 550px) {
    font-size: 21px;
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
  readonly appearDisabled: boolean;
  readonly clicked: boolean;
}

const StyledAnchorButton = styled.a<StyledButtonProps>`
  ${({ appearDisabled, clicked }) => sharedStyles(appearDisabled, clicked)}
  display: inline-block;
  text-decoration: none;
`;

const StyledButton = styled.button<StyledButtonProps>`
  ${({ appearDisabled, clicked }) => sharedStyles(appearDisabled, clicked)}
`;

interface ButtonProps {
  readonly appearDisabled?: boolean;
  readonly children: ReactNode | ReactNodeArray | Element;
  /** Optionally pass `clicked` to make the button appear... clicked. */
  readonly clicked?: boolean;
  /** Optionally pass a custom string to be rendered as an HTML data element `data-cy` to aid integration tests. */
  readonly cypressId?: string;
  /** Optionally pass a route to use the button as a link. */
  readonly href?: string;
  /** Optionally define a function to execute when the button is clicked. */
  readonly onClick?: Function;
}

/**
 * Big, blue button.
 */
const Button: FunctionComponent<ButtonProps> = ({
  appearDisabled = false,
  children,
  clicked = false,
  cypressId = undefined,
  href = undefined,
  onClick = undefined
}) => {
  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <>
      {href ? (
        <Link href={href} passHref>
          <StyledAnchorButton
            appearDisabled={appearDisabled}
            clicked={clicked}
            data-cy={cypressId}
            onClick={() => handleClick()}
          >
            {children}
          </StyledAnchorButton>
        </Link>
      ) : (
        <StyledButton
          appearDisabled={appearDisabled}
          clicked={clicked}
          data-cy={cypressId}
          onClick={() => handleClick()}
        >
          {children}
        </StyledButton>
      )}
    </>
  );
};

export default Button;
