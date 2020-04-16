import React, {
  FunctionComponent,
  ReactNode,
  ReactNodeArray,
  useRef,
  useEffect,
  useState
} from "react";
import styled, { css } from "styled-components";

interface AttentionSeekerProps {
  readonly visible: boolean;
}

const AttentionSeeker = styled.div<AttentionSeekerProps>`
  background-color: #000000;
  height: 100%;
  position: fixed;
  top: 0;
  width: 100%;
  transition: opacity 0.2s ease-in-out;

  ${({ visible }) => css`
    opacity: ${visible ? 0.2 : 0};
  `}
`;

interface StyledDrawerProps {
  readonly neededHeight: number;
  readonly open: boolean;
}

const StyledDrawer = styled.div<StyledDrawerProps>`
  ${({ neededHeight, open }) => css`
    background-color: #ffffff;
    box-shadow: 0 0 64px 0 rgba(0, 0, 0, ${open ? 0.1 : 0});
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
      position: absolute;
      right: 0;
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
      ? drawerContentElement.current.offsetHeight + 32
      : 0;

  if (typeof window !== "undefined") {
    if (open) document.body.style.overflow = "hidden";
    if (!open) document.body.style.overflow = "unset";
  }

  // The darkened BG uses various delays based on the core "open" prop to achieve smooth fade-in and fade-out effects.
  const [renderBackground, setRenderBackground] = useState(false);
  const [bgVisible, setBgVisible] = useState(false);

  useEffect(() => {
    if (open === true) {
      setRenderBackground(true); // If opened, immediately mount the component.
      setTimeout(() => setBgVisible(true), 1); // Wait 1ms so it gets a chance to start at its default state and animate the change.
    }

    if (open === false) {
      setTimeout(() => setRenderBackground(false), 200); // Delay unmount so it has a chance to animate a fade-out.
      setTimeout(() => setBgVisible(false), 1);
    }
  }, [open]);

  return (
    <>
      <StyledDrawer neededHeight={neededHeight} open={open}>
        <button onClick={handleCloseClick} type="button">
          &#x2715;
        </button>
        <div ref={drawerContentElement}>{children}</div>
      </StyledDrawer>
      {renderBackground && (
        <AttentionSeeker onClick={handleCloseClick} visible={bgVisible} />
      )}
    </>
  );
};

export default Drawer;
