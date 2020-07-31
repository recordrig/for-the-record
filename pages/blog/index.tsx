import React from "react";
import { statSync, readdirSync } from "fs";
import { join } from "path";

export default function Blog({ posts }) {
  return (
    <div>
      {posts.map((post) => (
        <article key={post}>
          <p>{post}</p>
        </article>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const isDirectory = (path) => statSync(path).isDirectory();
  const getDirectories = (path) =>
    readdirSync(path)
      .map((name) => join(path, name))
      .filter(isDirectory);

  const isFile = (path) => statSync(path).isFile();
  const getFiles = (path) =>
    readdirSync(path)
      .map((name) => join(path, name))
      .filter(isFile);

  const getFilesRecursively = (path) => {
    const dirs = getDirectories(path);
    const files = dirs
      .map((dir) => getFilesRecursively(dir))
      .reduce((a, b) => a.concat(b), []);
    return files.concat(getFiles(path));
  };

  const files = getFilesRecursively("./pages/blog/posts");
  console.log("files:", files);
  const posts = files.map((fileName) => fileName.replace(".mdx", ""));

  return {
    props: {
      posts,
    },
  };
}
