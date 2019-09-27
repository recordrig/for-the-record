import Link from "next/link";
import React, { FunctionComponent, ReactNode, ReactNodeArray } from "react";
import styled, { css } from "styled-components";

const StyledTileContainer = styled.div`
  padding-bottom: 42px;
  padding-top: 42px;

  & > p {
    font-weight: bold;
  }

  @media (max-width: 767px) {
    padding-left: 24px;
    padding-right: 24px;
  }

  @media (min-width: 768px) {
    padding-left: 32px;
    padding-right: 32px;
  }
`;

type TileContainerProps = {
  children: ReactNode | ReactNodeArray;
};

export const TileContainer: FunctionComponent<TileContainerProps> = ({
  children
}: TileContainerProps) => <StyledTileContainer>{children}</StyledTileContainer>;

type StyledLinkTileProps = {
  accentColor: string;
  backgroundColor: string;
};

const StyledLinkTile = styled.a<StyledLinkTileProps>`
  ${({ accentColor, backgroundColor }: StyledLinkTileProps) => css`
    background-color: ${backgroundColor};
    border-bottom: 8px solid ${accentColor};
    color: inherit;
    display: flex;
    text-decoration: none;
  `}
`;

type StyledTileProps = {
  backgroundColor: string;
};

const StyledTile = styled.div<StyledTileProps>`
  ${({ backgroundColor }: StyledTileProps) => css`
    background-color: ${backgroundColor};
    display: flex;
    flex-direction: column;
    width: 100%;

    /* Grow second to last child to take up entire remaining width so that the very last element
    will be aligned to the Tile's bottom. */
    > :nth-last-child(2) {
      flex-grow: 1;
    }
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
