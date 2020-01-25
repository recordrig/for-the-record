import React, {
  FunctionComponent,
  ReactNode,
  ReactNodeArray,
  useRef
} from "react";
import styled, { css } from "styled-components";

const AttentionSeeker = styled.div`
  background-color: #000000;
  height: 100%;
  position: fixed;
  top: 0;
  width: 100%;
  opacity: 0.2;
  z-index: 9;
`;

interface StyledDrawerProps {
  readonly neededHeight: number;
  readonly open: boolean;
}

const StyledDrawer = styled.div<StyledDrawerProps>`
  ${({ neededHeight, open }) => css`
    background-color: #ffffff;
    position: fixed;
    will-change: transform;
    z-index: 10;

    > button {
      background-color: transparent;
      border: 0;
      border-radius: 8px;
      cursor: pointer;
      display: block;
      float: right;
      font-size: 32px;
      line-height: 50px;
      outline: none;
      width: 50px;
    }

    > div {
      max-height: calc(100% - 128px);
    }

    @media (max-width: 575px) {
      border-radius: 12px 12px 0 0;
      top: 100%;
      transform: translateY(${open ? `-${neededHeight}px` : 0});
      transition: transform 0.3s ease-in-out;
      width: 100%;
    }

    @media (min-width: 576px) {
      height: 100%;
      left: 100vw;
      top: 0;
      transform: translateX(${open ? "-500px" : 0});
      transition: transform 0.3s ease-in-out;
      width: 500px;
    }
  `}
`;

interface DrawerProps {
  readonly children: ReactNode | ReactNodeArray | Element | void;
  readonly onClose: Function;
  readonly open: boolean;
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
  const handleCloseClick = () => onClose();
  const drawerContentElement = useRef<null | HTMLDivElement>(null);

  const neededHeight =
    drawerContentElement.current !== null
      ? drawerContentElement.current.offsetHeight
      : 0;

  if (typeof window !== "undefined") {
    if (open) document.body.style.overflow = "hidden";
    if (!open) document.body.style.overflow = "unset";
  }

  return (
    <>
      <StyledDrawer neededHeight={neededHeight} open={open}>
        <button onClick={handleCloseClick} type="button">
          &#x2715;
        </button>
        <div ref={drawerContentElement}>{children}</div>
      </StyledDrawer>
      {open && <AttentionSeeker onClick={handleCloseClick} />}
    </>
  );
};

export default Drawer;
