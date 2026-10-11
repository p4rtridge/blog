const site = require('./blog.config.json');

// robots.txt is advisory; enforce access restrictions at the server or WAF.
const aiAgents = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'Google-Extended',
  'PerplexityBot',
  'Perplexity-User',
  'CCBot',
];

module.exports = {
  siteUrl: site.url,
  generateRobotsTxt: true,
  autoLastmod: false,
  generateIndexSitemap: false,
  changefreq: null,
  priority: null,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      ...aiAgents.map((userAgent) => ({ userAgent, disallow: '/' })),
    ],
  },
};
