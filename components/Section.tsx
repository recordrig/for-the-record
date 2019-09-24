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

/**
 * SubSection can be used to only utilise half of the available width (on larger screens).
 * Use within SectionRow to make sure that two SubSections side by side will always fill
 * the same height.
 */
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

/**
 * SectionIntro provides a full-width, extra padded container. Works well with a Heading
 * and Paragraph. Does not need any additional wrappers; use as a direct child of Section.
 */
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

/**
 * SectionRow vertically seperates various parts of a Section. When used with SubSections,
 * it will also make sure that they will reach equal heights when rendered side-by-side.
 */
export const SectionRow: FunctionComponent<StyledSectionRowProps> = ({
  children
}: StyledSectionRowProps) => <StyledSectionRow>{children}</StyledSectionRow>;

const PositionedSectionContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  max-width: 1216px;
`;

const StyledSection = styled.div`
  margin-left: 16px;
  margin-right: 16px;
  padding-bottom: 160px;
  padding-top: 160px;
`;

type SectionProps = {
  children: ReactNode | ReactNodeArray;
};

/**
 * Section groups a logical subset of content together and visually separates it from other
 * content. Intended to span the full width of any given viewport.
 */
const Section: FunctionComponent<SectionProps> = ({
  children
}: SectionProps) => (
  <StyledSection>
    <PositionedSectionContent>{children}</PositionedSectionContent>
  </StyledSection>
);

export default Section;
