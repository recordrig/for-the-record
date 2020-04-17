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
  readonly rounded: boolean;
}

const StyledLinkTile = styled.a<StyledLinkTileProps>`
  ${({
    accentColor,
    backgroundColor,
    rounded
  }: StyledLinkTileProps): FlattenSimpleInterpolation => css`
    background-color: ${backgroundColor};
    border-bottom: 8px solid ${accentColor};
    border-radius: ${rounded ? "12px" : 0};
    color: inherit;
    display: flex;
    text-decoration: none;
  `}
`;

interface StyledTileProps {
  readonly backgroundColor: string;
  readonly rounded: boolean;
}

const StyledTile = styled.div<StyledTileProps>`
  ${({
    backgroundColor,
    rounded
  }: StyledTileProps): FlattenSimpleInterpolation => css`
    background-color: ${backgroundColor};
    border-radius: ${rounded ? "12px" : 0};
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
  readonly rounded?: boolean;
}

/**
 * Visual wrapper for related elements to make an informative whole.
 */
const Tile: FunctionComponent<TileProps> = ({
  accentColor = "#000",
  backgroundColor = "#fff",
  children,
  link,
  rounded = false
}: TileProps) => (
  <>
    {link ? (
      <Link href={link || "/"} passHref>
        <StyledLinkTile
          accentColor={accentColor}
          backgroundColor={backgroundColor}
          rounded={rounded}
        >
          {children}
        </StyledLinkTile>
      </Link>
    ) : (
      <StyledTile backgroundColor={backgroundColor} rounded={rounded}>
        {children}
      </StyledTile>
    )}
  </>
);

export default Tile;
