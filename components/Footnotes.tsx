import React, { FunctionComponent, ReactNode, ReactNodeArray } from "react";
import styled from "styled-components";

const StyledFootnotes = styled.div`
  color: #6f6f6f;

  @media (max-width: 474px) {
    padding-left: 12px;
    padding-right: 12px;
  }

  @media (min-width: 475px) {
    padding-left: 16px;
    padding-right: 16px;
  }

  @media (max-width: 734px) {
    font-size: 10px;
    padding-bottom: 12px;
    padding-top: 32px;
  }

  @media (min-width: 735px) and (max-width: 1023px) {
    font-size: 11px;
    padding-bottom: 32px;
    padding-top: 64px;
  }

  @media (min-width: 1024px) {
    font-size: 12px;
    padding-bottom: 64px;
    padding-top: 128px;
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
