import React, { FunctionComponent, ReactNode, ReactNodeArray } from "react";
import styled from "styled-components";

const StyledSubSection = styled.div`
  display: flex; /* Immediate children will expand to full height. */
  width: 50%;

  :nth-child(odd) {
    margin-right: 8px;
  }

  :nth-child(even) {
    margin-left: 8px;
  }
`;

type SubSectionProps = {
  children: ReactNode | ReactNodeArray;
};

export const SubSection: FunctionComponent<SubSectionProps> = ({
  children
}: SectionProps) => <StyledSubSection>{children}</StyledSubSection>;

const StyledSectionIntro = styled.div`
  padding-bottom: 64px;
  padding-left: 32px;
  padding-right: 32px;
`;

type SectionIntroProps = {
  children: ReactNode | ReactNodeArray;
};

export const SectionIntro: FunctionComponent<SectionIntroProps> = ({
  children
}: SectionIntroProps) => <StyledSectionIntro>{children}</StyledSectionIntro>;

const StyledSectionRow = styled.div`
  display: flex; /* Immediate children will expand to full height. */
  width: 100%;

  :nth-last-child(n + 2) {
    margin-bottom: 16px;
  }
`;

type StyledSectionRowProps = {
  children: ReactNode | ReactNodeArray;
};

export const SectionRow: FunctionComponent<StyledSectionRowProps> = ({
  children
}: StyledSectionRowProps) => <StyledSectionRow>{children}</StyledSectionRow>;

const StyledSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  margin-right: 16px;
  padding-bottom: 160px;
  padding-top: 160px;
`;

type SectionProps = {
  children: ReactNode | ReactNodeArray;
};

const Section: FunctionComponent<SectionProps> = ({
  children
}: SectionProps) => <StyledSection>{children}</StyledSection>;

export default Section;
