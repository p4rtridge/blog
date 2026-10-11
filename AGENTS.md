# AGENTS.md

Guidance for coding agents working in this repository.

## Project overview

This is a personal blog built with Next.js 14 (Pages Router), React, TypeScript, and Tailwind CSS. Profile and display settings come from the root `blog.config.json`; notes and their contents come from Notion.

The homepage contains an introduction, an optional clock, recent notes, and contact links. The About page displays the biography. Navigation contains Notes and About. Work, projects, GitHub activity, books, photos, and avatars have been removed; do not restore them unless requested.

## Current structure

```text
blog.config.json                 Public profile and display settings
src/pages/
  index.tsx                      Homepage and recent notes
  about.tsx                      Biography
  notes/index.tsx                Published notes list
  notes/[slug].tsx               Individual note and next-note link
  tags/[tag].tsx                 Notes filtered by tag
  api/rss.xml.ts                 RSS feed
  api/og.tsx                     Dynamic social preview image
  _app.tsx                       Fonts, global styles, optional analytics
  _document.tsx                  HTML language, favicon links, theme metadata
  404.tsx, 500.tsx               Error pages
src/components/
  PageShell.tsx                  Shared layout, navigation, and SEO metadata
  Index.tsx                      Shared section, list, row, link, and note components
  Clock.tsx                      Clock using the configured time zone and label
  NoteContent.tsx                Note block rendering wrapper
  notion/NotionBlockRenderer.tsx Notion block renderer
src/lib/
  notesApi.ts                    Notion queries, published-note filtering, block processing
  date.ts                        Date formatting
  animation.ts                   Animation constants
  testUtil.ts                    Small placeholder utility
src/styles/
  index.css                      Color tokens, shared rows, note prose
  prism.css                      Monochrome syntax highlighting
src/middleware.ts                Rewrites /rss.xml to /api/rss.xml
public/
  favicon/                       PNG and ICO icons, site.webmanifest
  assets/font/Inter.ttf          Font for generated social preview images
  robots.txt                     Crawler policies
next-sitemap.config.js           Sitemap and robots.txt generation settings
```

There are no `src/data`, `src/images`, `public/photos`, author-image, or `screenshots` folders. Contentlayer is not installed or used; a leftover `.contentlayer/generated` entry in `tsconfig.json` does not indicate an active integration.

## Configuration and content

- Use `blog.config.json` for the name, biography, URL, language, clock settings, homepage labels and note limit, Notes/About page text, contact links, and analytics flag.
- Keep configurable profile text in JSON rather than hardcoding it in components.
- `url` supplies canonical URLs, social preview links, RSS URLs, and the sitemap origin. Set it to the deployed site's origin before deployment. `NEXT_PUBLIC_URL` and `SITE_URL` are no longer used.
- JSON imports are bundled into the site. Local development reflects edits; deployed sites require a rebuild and redeploy.
- Treat the JSON as public data. Keep `NOTION_TOKEN` and `NOTION_DATABASE_ID` in `.env.local` or hosting environment settings, never in JSON or client-side code.
- `public/favicon/site.webmanifest` is a static file with its own name and icon paths; keep it aligned when changing branding.

The Notion database must provide these properties:

| Property | Type |
| --- | --- |
| `title` | Title |
| `description` | Rich text |
| `published` | Checkbox |
| `published_at` | Date |
| `hashtags` | Multi-select |
| `cover` | Files & media (documented in README) |

`notesApi.ts` reads the page object's cover for the note cover image. Page IDs and timestamps are Notion metadata, not database properties. Only notes with `published` checked appear. Keep property names and types compatible with the mapper in `notesApi.ts`; it assumes populated title, description, and publication date values. Slugs are derived from the full title by trimming, lowercasing, and replacing consecutive whitespace with a dash; no Notion `slug` property is required. Titles must produce unique slugs, and renaming a title changes its URL.

## Routing and generation

- Use Pages Router patterns, including `getStaticProps` and `getStaticPaths` where applicable.
- The homepage revalidates after 3,600 seconds; notes and tag pages after 10 seconds. Dynamic note and tag routes use `fallback: 'blocking'`.
- `next.config.mjs` redirects `/blog/:slug*` to `/notes/:slug*` and configures remote image hosts for Notion content.
- `pnpm build` invokes the `postbuild` sitemap generator. Although the old checked-in `public/sitemap.xml` was removed, builds can generate it again and regenerate `public/robots.txt`.
- Edit crawler policies in `next-sitemap.config.js` so builds preserve them. Known AI agents receive `Disallow: /`; general crawlers are allowed. Robots.txt is advisory, not enforced access control.

## Development and validation

Use pnpm; `package.json` pins the package-manager version and `pnpm-lock.yaml` is the lockfile.

- `pnpm install` — install dependencies.
- `pnpm dev` — run the development server.
- `pnpm build` — build for production and generate sitemap/robots files; requires working Notion credentials and database access.
- `pnpm start` — serve a production build.
- `pnpm lint` — run ESLint.
- `pnpm typecheck` — run TypeScript checks.
- `pnpm format` — format files under `src`; prefer formatting only touched files when avoiding unrelated changes.
- `pnpm postbuild` — regenerate sitemap/robots files from build output.

Run checks appropriate to the change and report any failures accurately. Recent type checks reported existing errors in the Geist font imports in `_app.tsx` and `import.meta` in `api/og.tsx` under the current NodeNext configuration. Recheck rather than assuming these remain or claiming a clean type check. Documentation-only changes need no application build.

## Styling and conventions

- Use TypeScript, PascalCase component filenames, and utilities in `src/lib`.
- `tsconfig.json` defines `@/*` as `./src/*` without `baseUrl`; relative imports also work.
- Use shared `PageShell`, `Index`, and `NoteContent` components and Tailwind classes; avoid CSS modules.
- Preserve the six color tokens (`bg`, `ink`, `body`, `faint`, `rule`, `wash`) in `src/styles/index.css` and their Tailwind mappings.
- Themes follow `prefers-color-scheme`; there is no theme toggle or need for `dark:` variants.
- Geist Mono is used for interface text, Geist Sans for note prose and titles, and Geist Pixel Square for the name and clock.
- Preserve keyboard focus states, contrast, and reduced-motion behavior.
- Consult `DESIGN.md` for visual conventions. `DESIGN.md` and `PRODUCT.md` still contain references to the original author and removed features; current code, `blog.config.json`, and the user's instructions determine the active structure and content.
