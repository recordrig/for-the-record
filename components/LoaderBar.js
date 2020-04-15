import React from "react";
import NProgress from "nprogress";
import Router from "next/router";

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
