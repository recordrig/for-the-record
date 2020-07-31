import React, { FunctionComponent, ReactNode, ReactNodeArray } from "react";
import Head from "next/head";

interface BlogPageProps {
  readonly children: ReactNode | ReactNodeArray;
  readonly metadata: {
    readonly title: string;
    readonly description: string;
  };
}

const BlogPage: FunctionComponent<BlogPageProps> = ({
  children,
  metadata,
}: BlogPageProps) => (
  <>
    <Head>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
    </Head>
    {children}
  </>
);

export default BlogPage;
