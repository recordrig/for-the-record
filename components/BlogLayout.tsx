import React, { FunctionComponent, ReactNode, ReactNodeArray } from "react";
import styled from "styled-components";
import Link from "next/link";
import MenuBarConnected from "./MenuBarConnected";

const StyledBlogLayout = styled.div`
  background: blue;
`;

interface BlogLayoutProps {
  readonly children: ReactNode | ReactNodeArray;
}

const BlogLayout: FunctionComponent<BlogLayoutProps> = ({
  children,
}: BlogLayoutProps) => (
  <StyledBlogLayout>
    <Link href="/blog" passHref>
      <a>Index</a>
    </Link>
    <Link href="/blog/page2" passHref>
      <a>Page2</a>
    </Link>
    <div>{children}</div>
    <MenuBarConnected />
  </StyledBlogLayout>
);

export default BlogLayout;
