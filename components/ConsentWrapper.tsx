import React, { FunctionComponent, ReactNode } from "react";
import styled from "styled-components";

const StyledConsentWrapper = styled.div`
  height: inherit;
  width: inherit;
`;

interface ConsentWrapperProps {
  readonly content: ReactNode;
  readonly consentGiven?: boolean;
  readonly placeholder: ReactNode;
}

/**
 * ConsentWrapper prevents loading of content unless consent is explicitely given.
 *
 * Make sure that `content` and `placeholder` are equal in dimensions if you'd like them to
 * overlap (prevent layout recalculations).
 */
const ConsentWrapper: FunctionComponent<ConsentWrapperProps> = ({
  content,
  consentGiven = false,
  placeholder
}: ConsentWrapperProps) => {
  return (
    <StyledConsentWrapper>
      {consentGiven ? content : placeholder}
    </StyledConsentWrapper>
  );
};

export default ConsentWrapper;
