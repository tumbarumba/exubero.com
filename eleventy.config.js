import fs from "node:fs";
import path from "node:path";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import markdownItAnchor from "markdown-it-anchor";

// Post dates are WordPress local times stored as UTC, so display them in UTC.
const DISPLAY_TIME_ZONE = "UTC";

// Heading ids as WordPress generated them ("Setting Strategy & Goals" ->
// "setting-strategy-goals"), so imported tables of contents keep working.
function headingSlug(text) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-");
}

export default function (eleventyConfig) {
  eleventyConfig.amendLibrary("md", (md) => md.use(markdownItAnchor, { slugify: headingSlug }));

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  eleventyConfig.addCollection("posts", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/posts/**/*.md"),
  );

  eleventyConfig.addCollection("pages", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/pages/**/*.md").sort((a, b) => a.data.title.localeCompare(b.data.title)),
  );

  // Pages directly below url, e.g. /ant/dependencies/ for /ant/.
  eleventyConfig.addFilter("childrenOf", (pages, url) =>
    pages.filter((p) => p.url.startsWith(url) && p.url.slice(url.length).match(/^[^/]+\/$/)),
  );
  eleventyConfig.addFilter("pageAt", (pages, url) => pages.find((p) => p.url === url));
  eleventyConfig.addFilter("inSection", (url, link) =>
    Boolean(url) && [link.url, ...(link.sections ?? [])].some((prefix) => url.startsWith(prefix)),
  );
  eleventyConfig.addFilter("readableDate", (date) =>
    new Intl.DateTimeFormat("en-AU", { dateStyle: "long", timeZone: DISPLAY_TIME_ZONE }).format(new Date(date)),
  );
  eleventyConfig.addFilter("isoDate", (date) => new Date(date).toISOString());
  eleventyConfig.addFilter("year", (date) =>
    new Intl.DateTimeFormat("en-AU", { year: "numeric", timeZone: DISPLAY_TIME_ZONE }).format(new Date(date)),
  );
  eleventyConfig.addFilter("inCategory", (posts, slug) =>
    posts.filter((post) => post.data.categories?.includes(slug)),
  );
  eleventyConfig.addFilter("groupByYear", (posts) => {
    const groups = new Map();
    for (const post of posts) {
      const year = post.url.slice(1, 5);
      if (!groups.has(year)) groups.set(year, []);
      groups.get(year).push(post);
    }
    return [...groups].map(([year, posts]) => ({ year, posts }));
  });
  eleventyConfig.addFilter("mentionsFor", (mentions, url) =>
    mentions.filter((m) => new URL(m["wm-target"]).pathname === url),
  );
  eleventyConfig.addFilter("mentionsOfType", (mentions, ...types) =>
    mentions.filter((m) => types.includes(m["wm-property"])),
  );

  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed.xml",
    collection: { name: "posts", limit: 20 },
    metadata: {
      language: "en-GB",
      title: "Renaissance Developer",
      base: "https://exubero.com/",
      author: { name: "Joe Schmetzer", email: "joe@exubero.com" },
    },
  });

  // Each post keeps its images in an images/ folder next to its index.md. Copy
  // that folder next to the rendered page so relative image URLs keep working
  // in the HTML and (made absolute) in the feed.
  eleventyConfig.on("eleventy.after", ({ results }) => {
    for (const { inputPath, outputPath } of results) {
      if (!outputPath?.endsWith("index.html")) continue;
      const images = path.join(path.dirname(inputPath), "images");
      if (fs.existsSync(images)) {
        fs.cpSync(images, path.join(path.dirname(outputPath), "images"), { recursive: true });
      }
    }
  });

  return {
    dir: { input: "src", includes: "_includes", data: "_data" },
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
  };
}
