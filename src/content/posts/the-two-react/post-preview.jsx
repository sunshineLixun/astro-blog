import { readFile } from "node:fs/promises";
import matter from "gray-matter";
import path from "node:path";
import { useEffect, useState } from "react";

const rootDirectory = path.join(process.cwd(), "src", "content", "posts");

export function PostPreview({ slug }) {
  const [data, setData] = useState({});

  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    async function load() {
      const fileContent = await readFile(
        rootDirectory + "/" + slug + "/index.mdx",
        "utf8"
      );
      const { data, content } = matter(fileContent);
      const wordCount = content.split(" ").filter(Boolean).length;

      setData(data);
      setWordCount(wordCount);
    }
    load();
  }, [slug]);

  return (
    <section className="rounded-md bg-black/5 p-2">
      <h5 className="font-bold">
        <a href={"/" + slug} target="_blank">
          {data.title}
        </a>
      </h5>
      <i>{wordCount} words</i>
    </section>
  );
}
