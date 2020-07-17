import React, {
  FunctionComponent,
  ReactNode,
  ReactNodeArray,
  useRef,
  useEffect,
  useState
} from "react";
import Router from "next/router";
import styled, { css } from "styled-components";
import { CrossIcon } from "./Icon";

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
  z-index: 9; /* Keep in mind MenuBar uses 1, while Drawer uses 10. */

  ${({ visible }) => css`
    opacity: ${visible ? 0.2 : 0};
  `}
`;

interface StyledDrawerProps {
  readonly visibleHeight: number;
  readonly open: boolean;
}

const StyledDrawer = styled.div<StyledDrawerProps>`
  ${({ visibleHeight, open }) => css`
    background-color: #ffffff;
    box-shadow: 0 0 64px 0 rgba(0, 0, 0, ${open ? 0.1 : 0});
    position: fixed;
    will-change: transform;
    z-index: 10; /* Keep in mind AttentionSeeker (dark overlay) uses 9, while MenuBar uses 1. */

    > button {
      background-color: transparent;
      border: 0;
      cursor: pointer;
      display: block;
      height: 50px;
      padding: 0;
      outline: none;
      position: absolute;
      right: 0;
      top: 0;
      width: 50px;

      svg {
        /* Disable SVG's "Cross" title so that we can show our button's "Close" instead. */
        pointer-events: none;
      }
    }

    > div {
      overflow: scroll;
    }

    @media (max-width: 575px) {
      border-radius: 12px 12px 0 0;
      top: 100%;
      transform: translateY(${open ? `-${visibleHeight}px` : 0});
      transition: transform 0.3s ease-in-out;
      width: 100%;

      > div {
        height: ${visibleHeight}px;
      }
    }

    @media (min-width: 576px) {
      height: 100%;
      left: 100vw;
      top: 0;
      transform: translateX(${open ? "-500px" : 0});
      transition: transform 0.3s ease-in-out;
      width: 500px;

      > div {
        height: 100%;
      }
    }
  `}
`;

interface DrawerProps {
  /** Content. Drawer will adjust its height responsively, and provide a scrollbar if needed. */
  readonly children: ReactNode | ReactNodeArray | Element | void;
  /** The parent should manage the Drawer's state, and tell it how to close (set passed `open` prop to `false`). */
  readonly closeDrawer: Function;
  /** Initial state of the Drawer when rendering. */
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
  closeDrawer
}) => {
  const drawerContentElement = useRef<null | HTMLDivElement>(null);
  const isClient = typeof window !== "undefined";

  // Relevant for rendering to the bottom on small devices. The total height of the Drawer itself will depend on how
  // much space its contents need.
  const neededHeight =
    drawerContentElement.current !== null
      ? drawerContentElement.current.offsetHeight + 32
      : 0;

  // The maximum available height. Only relevant on small devices, where the Drawer opens from the bottom.
  const maxHeight = isClient ? window.innerHeight - 192 : 0;

  // If the needed height, based on Drawer content, is larger than the amoung of vertical space available, we will
  // use the maxHeight to define the height. Otherwise, if there's plenty of space, using the needed height is fine.
  const height = neededHeight > maxHeight ? maxHeight : neededHeight;

  // Disable page scrolling while the drawer is opened.
  if (isClient) {
    if (open) document.body.style.overflow = "hidden";
    if (!open) document.body.style.overflow = "unset";
  }

  const [mountComponents, setMountComponents] = useState(false);

  // The darkened BG uses various delays based on the core "open" prop to achieve smooth fade-in and fade-out effects.
  const [bgVisible, setBgVisible] = useState(false);

  // Manage the mounting and unmounting of components based on the "open" prop, and relevant animations.
  useEffect(() => {
    if (open === true) {
      setMountComponents(true); // If opened, immediately mount the components.
      setTimeout(() => setBgVisible(true), 1); // Wait 1ms so it gets a chance to start at its default state and animate the change.
    }

    if (open === false) {
      setTimeout(() => setMountComponents(false), 200); // Delay unmount so everything has a chance to animate a fade-out/move outside of the screen.
      setTimeout(() => setBgVisible(false), 1);
    }
  }, [open]);

  const drawerWrapperElement = useRef<null | HTMLDivElement>(null);

  // Manage generic clicks outside the Drawer. This is especially relevant when, for example, a user performs an action
  // that opens a different drawer. Since ANY click outside of this drawer is caught, it will always close this Drawer,
  // preventing multiple Drawers from being opened at the same time.
  const handleInteractionOutside = (event: MouseEvent | TouchEvent) => {
    if (
      drawerWrapperElement.current &&
      !drawerWrapperElement.current.contains(event.target as Node)
    ) {
      closeDrawer();
    }
  };

  useEffect(() => {
    if (open === true) {
      document.addEventListener("click", handleInteractionOutside, true);
      document.addEventListener("touchstart", handleInteractionOutside, true);
    }

    if (open === false) {
      document.removeEventListener("click", handleInteractionOutside, true);
      document.removeEventListener(
        "touchstart",
        handleInteractionOutside,
        true
      );
    }
  }, [open]);

  const onNavigate = () => closeDrawer();

  // Close on any navigation event. Whenever navigation to a different page occurs, we can reasonably assume the Drawer
  // ought to close as the user intends to go elsewhere. It wouldn't make sense to continue to overlay the new screen
  // with a Drawer.
  React.useEffect(() => {
    if (open === true) {
      Router.events.on("routeChangeStart", onNavigate);
    }

    return () => {
      Router.events.off("routeChangeStart", onNavigate);
    };
  });

  return (
    <>
      <StyledDrawer
        visibleHeight={height}
        open={open}
        ref={drawerWrapperElement}
      >
        <button
          data-cy="close-drawer"
          onClick={() => closeDrawer()}
          title="Close"
          type="button"
        >
          <span
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "100%",
              display: "inline-block",
              height: "32px",
              width: "32px"
            }}
          >
            <CrossIcon color="#dde1e6" />
          </span>
        </button>
        <div>
          <div ref={drawerContentElement}>{children}</div>
        </div>
      </StyledDrawer>
      {mountComponents && <AttentionSeeker visible={bgVisible} />}
    </>
  );
};

export default Drawer;
