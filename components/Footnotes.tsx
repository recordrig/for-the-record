import React, { FunctionComponent, ReactNode, ReactNodeArray } from "react";
import styled from "styled-components";

const StyledFootnotes = styled.div`
  color: #6f6f6f;
  margin: 0 auto;
  max-width: 1216px;
  padding-bottom: 64px;

  @media (max-width: 767px) {
    font-size: 10px;
    padding-left: 12px;
    padding-right: 12px;
  }

  @media (min-width: 768px) {
    font-size: 11px;
    padding-left: 32px;
    padding-right: 32px;
  }
`;

interface SectionProps {
  children: ReactNode | ReactNodeArray;
}

/**
 * A section of textual remarks or clarifications. Intended to be placed just above the
 * page's Footer.
 */
const Footnotes: FunctionComponent<SectionProps> = ({
  children
}: SectionProps) => <StyledFootnotes>{children}</StyledFootnotes>;

export default Footnotes;
