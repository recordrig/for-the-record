import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";

type StyledCapsHeadingProps = {
  fontColor: string;
};

const StyledCapsHeading = styled.div<StyledCapsHeadingProps>`
  ${({ fontColor }: StyledCapsHeadingProps) => css`
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: ${fontColor};
      margin: 0;
      padding: 0;
      text-transform: uppercase;
    }

    @media (max-width: 767.9999px) {
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-size: 14px;
        line-height: 14px;
      }
    }

    @media (min-width: 768px) {
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-size: 16px;
        line-height: 16px;
      }
    }
  `}
`;

type CapsHeadingProps = {
  fontColor?: string;
  selector?: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
};

const CapsHeading: FunctionComponent<CapsHeadingProps> = ({
  fontColor = "#000",
  selector = 3,
  text
}: CapsHeadingProps) => {
  /**
   * NOTE: Dynamic elements currently throw type errors - no good fix as of typescript@3.5.2.
   * As a workaround we explicitely assign the `any` type so that it won't error on `<TagElem>`.
   * See [issue on GitHub](https://github.com/microsoft/TypeScript/issues/28768)
   * and also [this issue](https://github.com/Microsoft/TypeScript/issues/28892).
   */
  const TagElem: any = `h${selector}`;

  return (
    <StyledCapsHeading fontColor={fontColor}>
      <TagElem>{text}</TagElem>
    </StyledCapsHeading>
  );
};

export default CapsHeading;
