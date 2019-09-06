import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";

type StyledParagraphProps = {
  fontColor: string;
};

const StyledParagraph = styled.p<StyledParagraphProps>`
  ${({ fontColor }: StyledParagraphProps) => css`
    color: ${fontColor};

    @media (max-width: 767.9999px) {
      font-size: 16px;
      line-height: 21px;
    }

    @media (min-width: 768px) {
      font-size: 18px;
      line-height: 24px;
    }

    @media (min-width: 768px) and (max-width: 1023.9999px) {
      max-width: 656px;
    }

    @media (min-width: 1024px) {
      max-width: 720px;
    }
  `}
`;

type ParagraphProps = {
  fontColor?: string;
  text: string;
};

const Paragraph: FunctionComponent<ParagraphProps> = ({
  fontColor = "#000",
  text
}: ParagraphProps) => (
  <StyledParagraph fontColor={fontColor}>{text}</StyledParagraph>
);

export default Paragraph;
