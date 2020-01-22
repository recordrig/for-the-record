import Link from "next/link";
import React, { FunctionComponent, ReactNode, ReactNodeArray } from "react";
import styled, { css, FlattenSimpleInterpolation } from "styled-components";

const StyledTileContainer = styled.div`
  box-sizing: border-box;
  padding-bottom: 42px;
  padding-top: 42px;
  width: 100%;

  & > p {
    font-weight: bold;
  }

  @media (max-width: 474px) {
    padding-left: 12px;
    padding-right: 12px;
  }

  @media (min-width: 475px) and (max-width: 767px) {
    padding-left: 24px;
    padding-right: 24px;
  }

  @media (min-width: 768px) {
    padding-left: 32px;
    padding-right: 32px;
  }
`;

interface TileContainerProps {
  readonly children: ReactNode | ReactNodeArray;
}

export const TileContainer: FunctionComponent<TileContainerProps> = ({
  children
}: TileContainerProps) => <StyledTileContainer>{children}</StyledTileContainer>;

interface StyledLinkTileProps {
  readonly accentColor: string;
  readonly backgroundColor: string;
}

const StyledLinkTile = styled.a<StyledLinkTileProps>`
  ${({
    accentColor,
    backgroundColor
  }: StyledLinkTileProps): FlattenSimpleInterpolation => css`
    background-color: ${backgroundColor};
    border-bottom: 8px solid ${accentColor};
    color: inherit;
    display: flex;
    text-decoration: none;
  `}
`;

interface StyledTileProps {
  readonly backgroundColor: string;
}

const StyledTile = styled.div<StyledTileProps>`
  ${({ backgroundColor }: StyledTileProps): FlattenSimpleInterpolation => css`
    background-color: ${backgroundColor};
    display: flex;
    flex-direction: column;
    width: 100%;

    /* Grow the last child to take up entire remaining width so that it will be aligned to the Tile's bottom. */
    > :last-child {
      flex-grow: 1;
    }
  `}
`;

interface TileProps {
  readonly accentColor?: string;
  readonly backgroundColor?: string;
  readonly children: ReactNode | ReactNodeArray;
  readonly link?: string;
}

/**
 * Visual wrapper for related elements to make an informative whole.
 */
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
