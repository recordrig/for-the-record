import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";

type StyledHeadingProps = {
  center: boolean;
  fontColor: string;
};

const StyledHeading = styled.div<StyledHeadingProps>`
  ${({ center, fontColor }: StyledHeadingProps) => css`
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: ${fontColor};
      margin-bottom: 0;
      margin-top: 0;
      text-align: ${center ? "center" : "left"};
    }

    span {
      display: inline-block;
    }

    @media (max-width: 767.9999px) {
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-size: 44px;
        line-height: 52px;
      }

      span {
        max-width: ${center ? "90%" : "480px"};
      }
    }

    @media (min-width: 768px) {
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-size: 56px;
        line-height: 64px;
      }
    }

    @media (min-width: 768px) and (max-width: 1023.9999px) {
      span {
        max-width: ${center ? "80%" : "592px"};
      }
    }

    @media (min-width: 1024px) {
      span {
        max-width: 640px;
      }
    }
  `}
`;

type HeadingProps = {
  center?: boolean;
  fontColor?: string;
  selector?: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
};

const Heading: FunctionComponent<HeadingProps> = ({
  center = false,
  fontColor = "#000",
  selector = 2,
  text
}: HeadingProps) => {
  /**
   * NOTE: Dynamic elements currently throw type errors - no good fix as of typescript@3.5.2.
   * As a workaround we explicitely assign the `any` type so that it won't error on `<TagElem>`.
   * See [issue on GitHub](https://github.com/microsoft/TypeScript/issues/28768)
   * and also [this issue](https://github.com/Microsoft/TypeScript/issues/28892).
   */
  const TagElem: any = `h${selector}`;

  return (
    <StyledHeading center={center} fontColor={fontColor}>
      <TagElem>
        <span>{text}</span>
      </TagElem>
    </StyledHeading>
  );
};

export default Heading;
