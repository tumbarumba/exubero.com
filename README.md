# exubero.com

Source for [Renaissance Developer](https://exubero.com), Joe Schmetzer's blog. It is a static site built with [Eleventy](https://www.11ty.dev/) and hosted on [Cloudflare Workers](https://developers.cloudflare.com/workers/static-assets/). It follows the [POSSE](https://indieweb.org/POSSE) approach: posts are published here first and then syndicated to Mastodon.

## Requirements

- Node.js 22 or later
- npm

Install dependencies once:

```sh
npm install
```

## Writing a post

Each post is a folder under `src/posts/<year>/`, holding an `index.md` and, optionally, an `images/` folder:

```
src/posts/2026/2026-11-02-my-new-post/
├── index.md
└── images/
    └── diagram.png
```

`index.md` starts with front matter:

```markdown
---
title: My New Post
date: 2026-11-02T09:00:00Z
permalink: /2026/11/02/my-new-post/
categories:
  - agile
excerpt: One-sentence summary, used for the page description.
---

Post body in Markdown.

![A diagram](/2026/11/02/my-new-post/images/diagram.png)
```

- **`permalink`** must follow the `/YYYY/MM/DD/slug/` pattern, using the same date as `date`.
- **Image paths** start with the post's permalink. The build copies each post's `images/` folder next to the published page.
- **`categories`** must use slugs listed in `src/_data/categoryNames.json`.

Unfinished posts can live in `drafts/`, which is not built. Move a post into `src/posts/` to publish it.

Pages (About, Contact, etc.) live in `src/pages/` and work the same way.

## Building and testing locally

| Command | What it does |
|---|---|
| `npm start` | Builds the site and serves it at http://localhost:8080, rebuilding when files change. Use this while writing. |
| `npm run build` | Builds the site into `_site/`. |
| `npm run preview` | Builds the site and serves it with Cloudflare's local runtime (`wrangler dev`) at http://localhost:8787. This applies `_redirects` and the 404 page exactly as production does. |

Before publishing, run `npm run preview` and check:

- the new post renders, with its images, on its own page and on the home page
- the post appears in `/archive/` and on its category pages
- `/feed.xml` includes the post
- the build output and the `wrangler dev` console show no errors or `[wrangler:warn]` lines (for example invalid redirect rules)

Eleventy does not delete old files from `_site/`. If you rename or remove a page, run `rm -rf _site` before building.

Webmentions (replies and likes from Mastodon) are only included when `WEBMENTION_IO_TOKEN` is set:

```sh
WEBMENTION_IO_TOKEN=... npm start
```

Fetched webmentions are cached in `.cache/` for an hour.

## Publishing

Commit and push to `main`:

```sh
git add src/posts/2026/2026-11-02-my-new-post
git commit -m "Post: My New Post"
git push
```

The [Deploy workflow](.github/workflows/deploy.yml) builds the site and deploys it to Cloudflare. It also runs daily to pick up new webmentions, and can be started manually from the repository's Actions tab.

### One-time setup

The workflow needs these GitHub repository secrets:

| Secret | Where to get it |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Cloudflare dashboard → My Profile → API Tokens → create from the "Edit Cloudflare Workers" template |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare dashboard home page |
| `WEBMENTION_IO_TOKEN` | [webmention.io](https://webmention.io/settings) settings page (optional) |

The Worker configuration is in `wrangler.jsonc`. The custom domains `exubero.com` and `www.exubero.com` are attached to the Worker in the Cloudflare dashboard (Worker → Settings → Domains & Routes).

### Deploying by hand

If you need to deploy without GitHub Actions:

```sh
npx wrangler login   # once
npm run deploy
```

## Redirects

`src/redirects.njk` generates `_site/_redirects`, which keeps old WordPress URLs working:

- feed URLs
- `/tag/…` and `/author/…` URLs
- the old self-hosted blog at `/joe/…`, from `src/_data/legacyRedirects.json`

Cloudflare allows at most 100 dynamic rules (rules with `*` or `:placeholder`), and counts every rule after the first dynamic one against that limit. Keep static rules above the dynamic rules at the end of the file.

## Re-importing from WordPress

The content was imported from a WordPress.com export. To re-run the import, for example to pick up posts published on WordPress before the switch:

1. In WordPress admin, go to Tools → Export and download the full export.
2. Save it as `import/export.xml`. The `import/` folder is git-ignored because the export contains commenters' email and IP addresses.
3. Run the import:

   ```sh
   npm run import:convert   # WordPress XML → Markdown, downloads images into import/markdown
   npm run import           # Markdown → src/posts, src/pages and drafts/
   ```

`npm run import` replaces every folder under `src/posts/`, `src/pages/` and `drafts/`, so it overwrites any edits made to imported posts since the last import. Run it only before you start editing content here.
