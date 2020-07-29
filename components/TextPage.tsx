import React, { FunctionComponent, ReactNode, ReactNodeArray } from "react";
import Head from "next/head";
import Section from "./Section";
import Text from "./Text";

interface TextPageProps {
  readonly children: ReactNode | ReactNodeArray;
  readonly metadata: {
    readonly title: string;
    readonly description: string;
  };
}

const TextPage: FunctionComponent<TextPageProps> = ({
  metadata,
  children,
}: TextPageProps) => (
  <>
    <Head>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
    </Head>
    <Section>
      <Text>{children}</Text>
    </Section>
  </>
);

export default TextPage;
