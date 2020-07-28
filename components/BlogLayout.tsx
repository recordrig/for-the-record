import React from "react";
import Link from "next/link";
import MenuBarConnected from "./MenuBarConnected";

export default function BlogLayout(frontMatter) {
  return ({ children: content }) => {
    // React hooks, for example `useState` or `useEffect`, go here.
    return (
      <div>
        <Link href="/blog" passHref>
          <a>Index</a>
        </Link>
        <Link href="/blog/page2" passHref>
          <a>Page2</a>
        </Link>
        <div>
          <h1>{frontMatter.title}</h1>
          {content}
        </div>
        <MenuBarConnected />
      </div>
    );
  };
}
