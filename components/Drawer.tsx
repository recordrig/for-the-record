import React, { FunctionComponent, ReactNode, ReactNodeArray } from "react";
import styled, { css } from "styled-components";

// interface StyledDrawerContentProps {
//   open: boolean;
// }

// const StyledDrawerContent = styled.span<StyledDrawerContentProps>`
//   ${({ open }) => css`
//     position: absolute;

//     @media (max-width: 575px) {
//       bottom: bottom: ${open ? "500px" : 0};
//     }
//   `}
// `;

interface StyledDrawerProps {
  open: boolean;
}

const StyledDrawer = styled.span<StyledDrawerProps>`
  ${({ open }) => css`
    background-color: ${open ? "pink" : "red"};
    position: absolute;

    @media (max-width: 575px) {
      bottom: bottom: ${open ? "500px" : 0};
    }
  `}
`;

interface DrawerProps {
  children: ReactNode | ReactNodeArray;
  onClose: Function;
  open: boolean;
}

/**
 * Drawer with can hold additional or contextual content. Opens from the right on desktop;
 * from the bottom on mobile.
 *
 * May be included in the page structure anywhere, but recommended
 * to include as high up on the page structure as possible since it'll span the full
 * screen and does not inject itself anywhere.
 */
const Drawer: FunctionComponent<DrawerProps> = ({
  children,
  open,
  onClose
}) => {
  const handleCloseClick = () => {
    console.log("handleCloseClick");
    onClose();
  };

  return (
    <StyledDrawer open={open}>
      <button onClick={handleCloseClick} type="button">
        X
      </button>
      {children}
    </StyledDrawer>
  );
};

export default Drawer;
