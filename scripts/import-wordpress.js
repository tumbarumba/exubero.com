// Turns wordpress-export-to-markdown output into Eleventy content.
//
// The converter does the HTML -> Markdown work and downloads images. This script
// joins each converted file back to the WXR export (by WordPress id) to recover
// the exact original URL and the approved comments, cleans up WordPress-isms, and
// writes posts to src/posts, pages to src/pages and drafts to drafts/.
//
// Usage: node scripts/import-wordpress.js <export.xml> <converter-output-dir>

import fs from "node:fs";
import path from "node:path";
import { XMLParser } from "fast-xml-parser";
import matter from "gray-matter";

const [wxrPath, markdownDir] = process.argv.slice(2);
if (!wxrPath || !markdownDir) {
  console.error("Usage: node scripts/import-wordpress.js <export.xml> <converter-output-dir>");
  process.exit(1);
}

const SITE_ORIGIN = /^https?:\/\/(www\.)?exubero\.com/;
// Theme placeholder pages that should not be carried over.
const SKIPPED_PAGES = new Set(["/joe/"]);

const wxr = new XMLParser({
  ignoreAttributes: false,
  cdataPropName: false,
  isArray: (name) => ["item", "wp:comment", "wp:category", "category"].includes(name),
}).parse(fs.readFileSync(wxrPath, "utf8"));
const channel = wxr.rss.channel;

const items = new Map(channel.item.map((item) => [String(item["wp:post_id"]), item]));

const categories = Object.fromEntries(
  channel["wp:category"].map((c) => [c["wp:category_nicename"], decodeEntities(String(c["wp:cat_name"]))]),
);

function decodeEntities(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'");
}

function urlPath(link) {
  return new URL(link).pathname;
}

// Real, approved comments only: pingbacks and trackbacks are dropped, and so is
// everything private (email, IP address).
function commentsFor(item) {
  return (item["wp:comment"] ?? [])
    .filter((c) => String(c["wp:comment_approved"]) === "1" && !c["wp:comment_type"])
    .map((c) => ({
      id: c["wp:comment_id"],
      ...(c["wp:comment_parent"] ? { parent: c["wp:comment_parent"] } : {}),
      author: String(c["wp:comment_author"]),
      ...(c["wp:comment_author_url"] ? { url: c["wp:comment_author_url"] } : {}),
      date: new Date(`${c["wp:comment_date_gmt"]}Z`),
      content: String(c["wp:comment_content"]),
    }))
    .sort((a, b) => a.date - b.date);
}

// Maps old self-hosted blog URLs (/joe/YYYY/MM/slug/) to new permalinks.
const legacyUrls = new Map();

// imageBase is the page's permalink: images are served from <permalink>images/,
// so absolute paths work on the page itself, on listing pages and in the feed.
function cleanBody(body, imageBase) {
  return (
    body
      // [caption ...]<image> Caption text[/caption] -> <figure>
      .replace(/\\\[caption([^\]]*?)\\\]([\s\S]*?)\\\[\/caption\\\]/g, (_, attrs, inner) => {
        const image = inner.match(/^\[?!\[[^\]]*\]\([^)]*\)(\]\([^)]*\))?/)?.[0] ?? "";
        const text = inner.slice(image.length).trim() || attrs.match(/caption="([^"]*)"/)?.[1] || "";
        return `<figure>\n\n${image}\n\n<figcaption>${text}</figcaption>\n</figure>`;
      })
      // Unwrap images linked to the full-size original in wp-content (those URLs go away).
      .replace(/\[(!\[[^\]]*\]\(images\/[^)]+\))\]\([^)]*wp-content\/uploads\/[^)]*\)/g, "$1")
      // Empty divs left behind by the block editor.
      .replace(/^<div><\/div>\n?/gm, "")
      // Site-absolute links become root-relative; old /joe/ links point at the new URLs.
      .replace(/\]\((https?:\/\/(?:www\.)?exubero\.com)?(\/[^)\s]*)/g, (match, origin, href) => {
        if (!origin && !href.startsWith("/joe/")) return match;
        const [hrefPath, fragment = ""] = href.split("#");
        const target = legacyUrls.get(hrefPath) ?? hrefPath;
        return `](${target}${fragment ? `#${fragment}` : ""}`;
      })
      .replace(/\]\(images\//g, `](${imageBase ?? ""}images/`)
  );
}

function convertedFiles(dir) {
  return fs
    .readdirSync(dir, { recursive: true })
    .filter((f) => path.basename(f) === "index.md")
    .map((f) => path.join(dir, f));
}

function toMarkdown(body, frontMatter) {
  const defined = Object.fromEntries(Object.entries(frontMatter).filter(([, v]) => v !== undefined));
  return matter.stringify(cleanBody(body, frontMatter.permalink), defined);
}

function copyFolder(fromDir, toDir, markdown) {
  fs.mkdirSync(toDir, { recursive: true });
  for (const entry of fs.readdirSync(fromDir)) {
    if (entry === "index.md") continue;
    fs.cpSync(path.join(fromDir, entry), path.join(toDir, entry), { recursive: true });
  }
  fs.writeFileSync(path.join(toDir, "index.md"), markdown);
}

const files = convertedFiles(markdownDir).map((file) => {
  const parsed = matter(fs.readFileSync(file, "utf8"));
  return { file, parsed, item: items.get(String(parsed.data.id)) };
});

for (const { parsed, item } of files) {
  if (parsed.data.type === "post" && !parsed.data.draft && item) {
    const permalink = urlPath(item.link);
    const [, year, month] = permalink.match(/^\/(\d{4})\/(\d{2})\//) ?? [];
    if (year) legacyUrls.set(`/joe/${year}/${month}/${parsed.data.slug}/`, permalink);
  }
}

// Clear previously imported folders, keeping hand-written files such as *.11tydata.js.
for (const dir of ["src/posts", "src/pages", "drafts"]) {
  if (!fs.existsSync(dir)) continue;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) fs.rmSync(path.join(dir, entry.name), { recursive: true });
  }
}

const counts = { posts: 0, pages: 0, drafts: 0, comments: 0 };

for (const { file, parsed, item } of files) {
  const { data } = parsed;
  if (!item) {
    console.warn(`No WXR item for id ${data.id} (${file}), skipping`);
    continue;
  }
  const folder = path.basename(path.dirname(file));
  const isDraft = Boolean(data.draft) || item["wp:status"] !== "publish";

  const permalink = isDraft ? undefined : urlPath(item.link);
  const frontMatter = {
    title: data.title,
    // WordPress's local post time, stored as if UTC: it matches the date in the URL
    // and displays without time zone conversion.
    date: item["wp:post_date"] ? new Date(`${item["wp:post_date"].replace(" ", "T")}Z`) : data.date,
    permalink,
    ...(data.categories?.length ? { categories: data.categories.filter((c) => c !== "uncategorized") } : {}),
    ...(data.tags?.length ? { tags: data.tags } : {}),
    ...(data.coverImage ? { coverImage: `${permalink ?? ""}images/${data.coverImage}` } : {}),
    ...(data.type === "post" && data.excerpt ? { excerpt: data.excerpt } : {}),
    wordpressId: data.id,
  };
  if (frontMatter.categories?.length === 0) delete frontMatter.categories;

  const comments = commentsFor(item);
  if (comments.length) frontMatter.comments = comments;

  if (isDraft) {
    copyFolder(path.dirname(file), path.join("drafts", folder), toMarkdown(parsed.content, frontMatter));
    counts.drafts++;
    continue;
  }
  if (data.type === "page" && SKIPPED_PAGES.has(frontMatter.permalink)) continue;

  const outDir =
    data.type === "post"
      ? path.join("src/posts", folder.slice(0, 4), folder)
      : path.join("src/pages", frontMatter.permalink);
  copyFolder(path.dirname(file), outDir, toMarkdown(parsed.content, frontMatter));
  counts[data.type === "post" ? "posts" : "pages"]++;
  counts.comments += comments.length;
}

fs.mkdirSync("src/_data", { recursive: true });
fs.writeFileSync("src/_data/categoryNames.json", JSON.stringify(categories, null, 2) + "\n");
fs.writeFileSync(
  "src/_data/legacyRedirects.json",
  JSON.stringify(Object.fromEntries([...legacyUrls].sort()), null, 2) + "\n",
);

console.log(
  `Imported ${counts.posts} posts, ${counts.pages} pages, ${counts.comments} comments; ` +
    `${counts.drafts} drafts written to drafts/; ${legacyUrls.size} legacy redirects.`,
);
