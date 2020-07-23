import React, { FunctionComponent, ReactNode, ReactNodeArray } from "react";
import styled from "styled-components";

const StyledFootnotes = styled.div`
  color: #a2a9b0;
  margin: 0 auto;
  max-width: 1216px;

  @media (max-width: 767px) {
    font-size: 10px;
  }

  @media (min-width: 768px) {
    font-size: 11px;
  }
`;

interface SectionProps {
  readonly children: ReactNode | ReactNodeArray;
}

/**
 * A section of textual remarks or clarifications. Intended to be placed just above the
 * page's Footer.
 */
const Footnotes: FunctionComponent<SectionProps> = ({
  children,
}: SectionProps) => <StyledFootnotes>{children}</StyledFootnotes>;

export default Footnotes;
