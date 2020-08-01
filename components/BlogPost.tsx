import React, { FunctionComponent, ReactNode, ReactNodeArray } from "react";
import Head from "next/head";

interface BlogPostProps {
  readonly children: ReactNode | ReactNodeArray;
  readonly metadata: {
    readonly title: string;
    readonly description: string;
  };
}

const BlogPost: FunctionComponent<BlogPostProps> = ({
  children,
  metadata,
}: BlogPostProps) => (
  <>
    <Head>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
    </Head>
    {children}
  </>
);

export default BlogPost;
