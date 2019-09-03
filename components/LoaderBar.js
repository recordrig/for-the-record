import React from "react";
import NProgress from "nprogress";
import Router from "next/router";

/**
 * Loaderbar heavily relies on [NProgress](https://github.com/rstacruz/nprogress) and as such, requires various global styles.
 * Import and include the below styles in e.g. a globablly available CSS file,
 * or, when using [Styled Components](https://github.com/styled-components/styled-components), as a template literal in `createGlobalStyle`.
 */
export const loaderBarStyles = `
  #nprogress {
    pointer-events: none;
  }
  #nprogress .bar {
    background: blue;
    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
  }
  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px blue, 0 0 5px blue;
    opacity: 1;
    -webkit-transform: rotate(3deg) translate(0px, -4px);
    -ms-transform: rotate(3deg) translate(0px, -4px);
    transform: rotate(3deg) translate(0px, -4px);
  }
  #nprogress .spinner {
    display: none; /* Needs to be "block" if spinner should be visible. */
    position: fixed;
    z-index: 1031;
    top: 15px;
    right: 15px;
  }
  #nprogress .spinner-icon {
    width: 18px;
    height: 18px;
    box-sizing: border-box;
    border: solid 2px transparent;
    border-top-color: blue;
    border-left-color: blue;
    border-radius: 50%;
    -webkit-animation: nprogresss-spinner 400ms linear infinite;
    animation: nprogress-spinner 400ms linear infinite;
  }
  .nprogress-custom-parent {
    overflow: hidden;
    position: relative;
  }
  .nprogress-custom-parent #nprogress .spinner,
  .nprogress-custom-parent #nprogress .bar {
    position: absolute;
  }
  @-webkit-keyframes nprogress-spinner {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes nprogress-spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

/**
 * Loaderbar heavily relies on [NProgress](https://github.com/rstacruz/nprogress) and as such, requires various global styles.
 * HOC inspired by [next-nprogress](https://github.com/sergiodxa/next-nprogress)
 */
class LoaderBar extends React.Component {
  timer = null;

  componentDidMount() {
    Router.events.on("routeChangeStart", this.routeChangeStart);
    Router.events.on("routeChangeComplete", this.routeChangeEnd);
    Router.events.on("routeChangeError", this.routeChangeEnd);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    Router.events.off("routeChangeStart", this.routeChangeStart);
    Router.events.off("routeChangeComplete", this.routeChangeEnd);
    Router.events.off("routeChangeError", this.routeChangeEnd);
  }

  routeChangeStart = () => {
    // Since this is the only component in the entire project that would benefit
    // from prop-types, we'll make an exception and disable the rule.
    const { showAfterMs } = this.props; // eslint-disable-line react/prop-types
    clearTimeout(this.timer);
    this.timer = setTimeout(NProgress.start, showAfterMs);
  };

  routeChangeEnd = () => {
    clearTimeout(this.timer);
    NProgress.done();
  };

  render() {
    return null;
  }
}

LoaderBar.defaultProps = {
  showAfterMs: 0
};

export default LoaderBar;
