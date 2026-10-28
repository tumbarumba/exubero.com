import Fetch from "@11ty/eleventy-fetch";

// All webmentions received by webmention.io for the site (replies, likes and
// reposts backfed from Mastodon by Bridgy). Needs WEBMENTION_IO_TOKEN; without
// it the site builds with no mentions.
export default async function () {
  const token = process.env.WEBMENTION_IO_TOKEN;
  if (!token) return [];

  const url = `https://webmention.io/api/mentions.jf2?domain=exubero.com&per-page=1000&token=${token}`;
  try {
    const feed = await Fetch(url, { duration: "1h", type: "json" });
    return feed.children.filter((m) => m["wm-private"] !== true);
  } catch (error) {
    console.warn(`Could not fetch webmentions: ${error.message}`);
    return [];
  }
}
