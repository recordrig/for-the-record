import React, { FunctionComponent, ReactNode } from "react";
import styled from "styled-components";
import LazyLoad from "react-lazyload";

const StyledImage = styled.div`
  > img {
    display: block; /* Get rid of reserved space for font descenders. */
    width: 100%;
  }
`;

interface ImageProps {
  /**
   * Image description for screen readers. An empty image tag will be included by default
   * to prevent screen reader's behaviour of reading out full URL's when the alt tag is omitted.
   * @default ""
   */
  readonly alt?: string;
  readonly src: string;
}

/**
 * Provides a ready-for-use Image node which sets some common sense base styles.
 * When using this node with `OptimizedMedia`, it'll also make sure that they
 * take up the same size so long as they are of equal aspect ratios.
 */
export const Image: FunctionComponent<ImageProps> = ({
  alt = "",
  src,
}: ImageProps) => (
  <StyledImage>
    <img alt={alt} src={src} />
  </StyledImage>
);

const StyledLowresOptimizedMedia = styled.div`
  width: 100%;
`;

const StyledHiresOptimizedMedia = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
`;

const StyledOptimizedMedia = styled.div`
  position: relative;
  width: 100%;
`;

interface OptimizedMediaProps {
  readonly hires: ReactNode;
  readonly lowres: ReactNode;
}

/**
 * OptimizedMedia takes a low quality image (or other React Node) and high quality
 * image/node as input. It'll show the low quality image by default, overlay it with
 * the high quality node when the distance to the viewport is 600px (lazyloading).
 */
const OptimizedMedia: FunctionComponent<OptimizedMediaProps> = ({
  hires,
  lowres,
}: OptimizedMediaProps) => (
  <StyledOptimizedMedia>
    <StyledLowresOptimizedMedia>{lowres}</StyledLowresOptimizedMedia>
    <StyledHiresOptimizedMedia>
      <LazyLoad offset={600}>{hires}</LazyLoad>
    </StyledHiresOptimizedMedia>
  </StyledOptimizedMedia>
);

export default OptimizedMedia;
