import rss from "@astrojs/rss";

export async function GET(context) {
  const postImportResult = import.meta.glob("../content/posts/**/*.mdx", {
    eager: true,
  });
  const posts = Object.values(postImportResult);

  return rss({
    title: "Dan Blog",
    description: "Welcome to subscribe to my blog",
    site: context.site,
    items: posts.map((post) => ({
      title: post.frontmatter.title,
      description: post.frontmatter.spoiler,
      link: post.frontmatter.href,
      pubDate: new Date(post.frontmatter.date),
    })),
  });
}
