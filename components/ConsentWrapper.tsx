import React, {
  FunctionComponent,
  ReactNode,
  useState,
  useEffect
} from "react";
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
  const [consentGivenState, setConsentGivenState] = useState(false);

  // Needed to sync post-mount. E.g. when loading state from localStorage and passing consent
  // as a prop, if you reload the page, React might not detect the prop change. Adding this
  // method guarantees that we sync post-mount and use the correct, up-to-date value.
  useEffect(() => {
    if (consentGiven === true) {
      setConsentGivenState(true);
    } else {
      setConsentGivenState(false);
    }
  }, [consentGiven]);

  return (
    <StyledConsentWrapper>
      {consentGivenState ? content : placeholder}
    </StyledConsentWrapper>
  );
};

export default ConsentWrapper;
