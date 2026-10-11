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
| `language` | HTML language |
| `clock` | Visibility, IANA time zone (such as `Asia/Bangkok`), and location label |
| `home` | Section labels and number of latest notes |
| `notes`, `about` | Page titles, descriptions, introduction, and section labels |
| `links` | Social/contact entries with `key`, `value`, and `href` |
| `analyticsEnabled` | Vercel Analytics visibility |

Set `clock.enabled` to `false` to hide the clock.

The existing links were preserved during migration; replace them with your own entries. The default `url` is `http://localhost:3000`; change it before deployment. `NEXT_PUBLIC_URL` and `SITE_URL` are no longer used.

JSON edits update during local development. Rebuild and redeploy to apply them to a deployed site. Notes and their contents still come from Notion. Keep Notion credentials in `.env.local`, never in this public JSON file.

## Notion schema

Notes database properties:

| Property      | Type          |
| ------------- | ------------- |
| `title`       | Title         |
| `slug`        | Rich Text     |
| `description` | Rich Text     |
| `published`   | Checkbox      |
| `publishedAt` | Date          |
| `hashtags`    | Multi-select  |
| `inProgress`  | Checkbox      |
| `cover`       | Files & Media |

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
