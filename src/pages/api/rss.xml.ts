import { NextApiHandler } from 'next';
import RSS from 'rss';

import site from '../../../blog.config.json';
import { notesApi } from '../../lib/notesApi';

const rss: NextApiHandler = async (req, res) => {
  const feed = new RSS({
    title: site.name,
    site_url: site.url.replace(/\/$/, ''),
    feed_url: `${site.url.replace(/\/$/, '')}/rss.xml`,
  });

  const allPosts = await notesApi.getNotes();
  allPosts.map((post) => {
    feed.item({
      title: post.title,
      url: `${site.url.replace(/\/$/, '')}/notes/${post.slug}`,
      date: post.publishedAt,
      description: post.description,
    });
  });

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=1200, stale-while-revalidate=600');
  res.write(feed.xml({ indent: true }));
  res.end();
};

export default rss;
