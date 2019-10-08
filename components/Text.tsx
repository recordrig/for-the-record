import React, { FunctionComponent, ReactNode, ReactNodeArray } from "react";
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

    @media (max-width: 399px) {
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

    @media (min-width: 400px) {
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-size: 16px;
        line-height: 21px;
      }
    }
  `}
`;

type CapsHeadingProps = {
  children: string;
  color?: string;
  h?: 1 | 2 | 3 | 4 | 5 | 6;
};

export const CapsHeading: FunctionComponent<CapsHeadingProps> = ({
  children,
  color = "#000",
  h = 3
}: CapsHeadingProps) => {
  /**
   * NOTE: Dynamic elements currently throw type errors - no good fix as of typescript@3.5.2.
   * As a workaround we explicitely assign the `any` type so that it won't error on `<TagElem>`.
   * See [issue on GitHub](https://github.com/microsoft/TypeScript/issues/28768)
   * and also [this issue](https://github.com/Microsoft/TypeScript/issues/28892).
   */
  const TagElem: any = `h${h}`;

  return (
    <StyledCapsHeading fontColor={color}>
      <TagElem>{children}</TagElem>
    </StyledCapsHeading>
  );
};

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

    /* Headings stay small for longer than other types of text, because due to its
    relatively large size you quickly get into trouble with words being too long to even
    fit on the screen. */
    @media (max-width: 575px) {
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
        max-width: ${center ? "96%" : "480px"};
      }
    }

    @media (min-width: 576px) {
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

    @media (min-width: 735px) and (max-width: 1023px) {
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
  children: string | ReactNode | ReactNodeArray;
  color?: string;
  h?: 1 | 2 | 3 | 4 | 5 | 6;
};

export const Heading: FunctionComponent<HeadingProps> = ({
  center = false,
  children,
  color = "#000",
  h = 2
}: HeadingProps) => {
  /**
   * NOTE: Dynamic elements currently throw type errors - no good fix as of typescript@3.5.2.
   * As a workaround we explicitely assign the `any` type so that it won't error on `<TagElem>`.
   * See [issue on GitHub](https://github.com/microsoft/TypeScript/issues/28768)
   * and also [this issue](https://github.com/Microsoft/TypeScript/issues/28892).
   */
  const TagElem: any = `h${h}`;

  return (
    <StyledHeading center={center} fontColor={color}>
      <TagElem>
        <span>{children}</span>
      </TagElem>
    </StyledHeading>
  );
};

type StyledParagraphProps = {
  fontColor: string;
};

const StyledParagraph = styled.p<StyledParagraphProps>`
  ${({ fontColor }: StyledParagraphProps) => css`
    color: ${fontColor};

    @media (max-width: 399px) {
      font-size: 16px;
      line-height: 21px;
    }

    @media (min-width: 400px) {
      font-size: 18px;
      line-height: 24px;
    }

    @media (max-width: 1023px) {
      max-width: 656px;
    }

    @media (min-width: 1024px) {
      max-width: 720px;
    }
  `}
`;

type ParagraphProps = {
  children: string;
  color?: string;
};

export const Paragraph: FunctionComponent<ParagraphProps> = ({
  children,
  color = "#000"
}: ParagraphProps) => (
  <StyledParagraph fontColor={color}>{children}</StyledParagraph>
);

type StyledTextProps = {
  fontColor: string;
};

const StyledText = styled.span<StyledTextProps>`
  ${({ fontColor }: StyledParagraphProps) => css`
    color: ${fontColor};

    @media (max-width: 399px) {
      font-size: 16px;
      line-height: 21px;
    }

    @media (min-width: 400px) {
      font-size: 18px;
      line-height: 24px;
    }

    @media (max-width: 1023px) {
      max-width: 656px;
    }

    @media (min-width: 1024px) {
      max-width: 720px;
    }
  `}
`;

type TextProps = {
  children: string;
  color?: string;
};

const Text: FunctionComponent<TextProps> = ({
  children,
  color = "#000"
}: TextProps) => <StyledText fontColor={color}>{children}</StyledText>;

export default Text;
