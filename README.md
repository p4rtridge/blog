# Personal blog

Personal site configured through JSON, with Notion-backed notes and light and dark themes following the system.

## Stack

Next.js (Pages Router) · Tailwind · Notion API · Geist Sans/Mono/Pixel · Vercel.

## Develop

Requires Node 18+ and pnpm.

```bash
# Create .env.local with NOTION_TOKEN and NOTION_DATABASE_ID.

pnpm install
pnpm dev
```

## Site configuration

Edit `blog.config.json` to configure the site. It replaces the former `bio.ts` and `links.ts` files.

| Setting | Controls |
| --- | --- |
| `name`, `bio` | Header, homepage introduction, about text, author metadata, and RSS title |
| `url` | Canonical URLs, social preview URLs, RSS links, and sitemap; set this to your deployed site's URL |
| `clock` | Visibility, IANA time zone (such as `Asia/Bangkok`), and location label |
| `blog.latestNotesLimit` | Number of latest posts displayed on the homepage |
| `blog.revalidateSeconds` | ISR interval for the homepage, blog list, posts, and tag pages; default `1800` (30 minutes) |
| `links` | Social/contact entries with `key`, `value`, and `href` |
| `analyticsEnabled` | Vercel Analytics visibility |

The HTML language is hardcoded as `en` in `src/pages/_document.tsx`. The Blog title, description, and introduction are hardcoded in `src/pages/blog/index.tsx`, with navigation labels in `src/components/PageShell.tsx`. The homepage section labels (`blog` and `contact`) are hardcoded in `src/pages/index.tsx`. The About title and description are hardcoded in `src/pages/about.tsx`; its biography still uses `bio` from the config.

Set `clock.enabled` to `false` to hide the clock. Set `blog.revalidateSeconds` to a positive integer in seconds. Pages regenerate when visited after this interval; the setting is not a scheduled background fetch.

The existing links were preserved during migration; replace them with your own entries. The default `url` is `http://localhost:3000`; change it before deployment. `NEXT_PUBLIC_URL` and `SITE_URL` are no longer used.

JSON edits update during local development. Rebuild and redeploy to apply them to a deployed site. Notes and their contents still come from Notion. Keep Notion credentials in `.env.local`, never in this public JSON file.

## Notion schema

Notes database properties:

| Property      | Type          |
| ------------- | ------------- |
| `title`       | Title         |
| `description` | Rich Text     |
| `published`   | Checkbox      |
| `published_at` | Date         |
| `hashtags`    | Multi-select  |
| `cover`       | Files & Media |

Post slugs are generated from the full title: lowercase with spaces replaced by dashes (for example, `My First Post` becomes `/blog/my-first-post`). No Notion `slug` property is needed. Use titles that produce unique slugs; changing a title changes the post URL.

## Layout

```
src/pages/         Routes (Pages Router)
src/components/    PageShell, Index (rows), Clock, NoteContent
blog.config.json   Profile and display configuration
src/lib/           notesApi (Notion client)
src/styles/        Color tokens, row and prose styles, monochrome Prism theme
```

## License

MIT.
