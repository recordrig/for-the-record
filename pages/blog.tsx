import React from "react";
import { statSync, readdirSync } from "fs";
import { join } from "path";

export default function Blog({ postLinks }) {
  return (
    <div>
      {postLinks.map((postLink) => (
        <article key={postLink}>
          <p>{postLink}</p>
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

  const files = getFilesRecursively("./pages/blog/for-the-record/posts");
  const postLinks = files.map((fileName) =>
    fileName.replace(".mdx", "").replace("/index", "").replace("pages", "")
  );

  return {
    props: {
      postLinks,
    },
  };
}
