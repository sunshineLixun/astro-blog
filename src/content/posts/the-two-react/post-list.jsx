import path from "node:path";
import { PostPreview } from "./post-preview";
import { readdir } from "node:fs/promises";
import { useEffect, useState } from "react";

const rootDirectory = path.join(process.cwd(), "src", "content", "posts");

export function PostList() {
  const [dirs, setDirs] = useState([]);

  useEffect(() => {
    async function load() {
      const entries = await readdir(rootDirectory, { withFileTypes: true });
      const dirs = entries.filter((entry) => entry.isDirectory());
      setDirs(dirs);
    }
    load();
  });

  return (
    <div className="mb-8 flex h-72 flex-col gap-2 overflow-scroll font-sans">
      {dirs.map((dir) => (
        <PostPreview key={dir.name} slug={dir.name} />
      ))}
    </div>
  );
}
