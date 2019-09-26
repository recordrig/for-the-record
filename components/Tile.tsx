import Link from "next/link";
import React, { FunctionComponent, ReactNode, ReactNodeArray } from "react";
import styled, { css } from "styled-components";

const StyledContainer = styled.div`
  padding-bottom: 42px;
  padding-top: 42px;

  /* Fix for bottom space which appears by default under images.
   * This does NOT position an image to the bottom of the tile.
   * Image positioning depends on placement within the contents (first, last or wherever).
   */
  & > img {
    vertical-align: bottom;
  }

  & > p {
    font-weight: bold;
  }

  @media (max-width: 767.9999px) {
    padding-left: 24px;
    padding-right: 24px;
  }

  @media (min-width: 768px) {
    padding-left: 32px;
    padding-right: 32px;
  }
`;

type ContainerProps = {
  children: ReactNode | ReactNodeArray;
};

export const Container: FunctionComponent<ContainerProps> = ({
  children
}: ContainerProps) => <StyledContainer>{children}</StyledContainer>;

type StyledLinkTileProps = {
  accentColor: string;
  backgroundColor: string;
};

const StyledLinkTile = styled.a<StyledLinkTileProps>`
  ${({ accentColor, backgroundColor }: StyledLinkTileProps) => css`
    background-color: ${backgroundColor};
    border-bottom: 8px solid ${accentColor};
    color: inherit;
    display: block;
    text-decoration: none;
  `}
`;

type StyledTileProps = {
  backgroundColor: string;
};

const StyledTile = styled.div<StyledTileProps>`
  ${({ backgroundColor }: StyledTileProps) => css`
    background-color: ${backgroundColor};
    width: 100%;
  `}
`;

type TileProps = {
  accentColor?: string;
  backgroundColor?: string;
  children: ReactNode | ReactNodeArray;
  link?: string;
};

const Tile: FunctionComponent<TileProps> = ({
  accentColor = "#000",
  backgroundColor = "#fff",
  children,
  link
}: TileProps) => (
  <>
    {link ? (
      <Link href={link || "/"} passHref>
        <StyledLinkTile
          accentColor={accentColor}
          backgroundColor={backgroundColor}
        >
          {children}
        </StyledLinkTile>
      </Link>
    ) : (
      <StyledTile backgroundColor={backgroundColor}>{children}</StyledTile>
    )}
  </>
);

export default Tile;
