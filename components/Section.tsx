import React, { FunctionComponent, ReactNode, ReactNodeArray } from "react";
import styled, { css, FlattenSimpleInterpolation } from "styled-components";

const StyledSubSection = styled.div`
  @media (max-width: 734px) {
    display: block;
    width: 100%;

    /* Visually separate from its sibling on small devices. */
    :nth-child(odd) {
      margin-bottom: 16px;
    }
  }

  @media (min-width: 735px) {
    display: flex; /* Immediate children will expand to full height. */
    width: 50%;

    :nth-child(odd) {
      margin-right: 8px;
    }

    :nth-child(even) {
      margin-left: 8px;
    }
  }
`;

interface SubSectionProps {
  readonly children: ReactNode | ReactNodeArray;
}

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

  @media (max-width: 474px) {
    padding-left: 12px;
    padding-right: 12px;
  }

  @media (min-width: 475px) {
    padding-left: 32px;
    padding-right: 32px;
  }
`;

interface SectionIntroProps {
  readonly children: ReactNode | ReactNodeArray;
}

/**
 * SectionIntro provides a full-width, extra padded container. Works well with a Heading
 * and Paragraph. Does not need any additional wrappers; use as a direct child of Section.
 */
export const SectionIntro: FunctionComponent<SectionIntroProps> = ({
  children
}: SectionIntroProps) => <StyledSectionIntro>{children}</StyledSectionIntro>;

const StyledSectionRow = styled.div`
  width: 100%;

  /* No bottom margin on last row. */
  :nth-last-child(n + 2) {
    margin-bottom: 16px;
  }

  @media (max-width: 734px) {
    display: block;
  }

  @media (min-width: 735px) {
    display: flex; /* Immediate children will expand to full height. */
  }
`;

interface StyledSectionRowProps {
  readonly children: ReactNode | ReactNodeArray;
}

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
  width: 100%;
`;

interface StyledSectionProps {
  readonly backgroundColor: string;
}

const StyledSection = styled.div<StyledSectionProps>`
  ${({
    backgroundColor
  }: StyledSectionProps): FlattenSimpleInterpolation => css`
    background-color: ${backgroundColor};
    margin: 0;

    @media (max-width: 474px) {
      padding-left: 0;
      padding-right: 0;
    }

    @media (min-width: 475px) {
      padding-left: 16px;
      padding-right: 16px;
    }

    @media (max-width: 734px) {
      display: block;
      padding-bottom: 128px;
      padding-top: 128px;
    }

    @media (min-width: 735px) {
      display: flex; /* Immediate children will expand to full height. */
    }

    @media (min-width: 735px) and (max-width: 1023px) {
      padding-bottom: 192px;
      padding-top: 192px;
    }

    @media (min-width: 1024px) {
      padding-bottom: 256px;
      padding-top: 256px;
    }
  `}
`;

interface SectionProps {
  readonly children: ReactNode | ReactNodeArray;
  readonly dark?: boolean;
}

/**
 * Section groups a logical subset of content together and visually separates it from other
 * content. Intended to span the full width of any given viewport.
 */
const Section: FunctionComponent<SectionProps> = ({
  children,
  dark = false
}: SectionProps) => (
  <StyledSection backgroundColor={dark ? "#000000" : "transparent"}>
    <PositionedSectionContent>{children}</PositionedSectionContent>
  </StyledSection>
);

export default Section;
