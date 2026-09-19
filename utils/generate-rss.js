import { getPosts } from './mdx-utils';
import { getGlobalData } from './global-data';

const getSiteUrl = () => {
  const configured = process.env.BLOG_URL || process.env.URL;
  return (configured ? decodeURI(configured) : 'http://localhost:3000').replace(
    /\/$/,
    ''
  );
};

const escapeXml = (unsafe = '') =>
  unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export const generateRssFeed = () => {
  const siteUrl = getSiteUrl();
  const { blogTitle, footerText } = getGlobalData();
  const posts = getPosts();

  const items = posts
    .map((post) => {
      const slug = post.filePath.replace(/\.mdx?$/, '');
      const postUrl = `${siteUrl}/posts/${slug}`;
      const pubDate = post.data.date
        ? new Date(post.data.date).toUTCString()
        : '';

      return `
    <item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${postUrl}</link>
      <guid>${postUrl}</guid>
      ${pubDate ? `<pubDate>${pubDate}</pubDate>` : ''}
      ${
        post.data.description
          ? `<description>${escapeXml(post.data.description)}</description>`
          : ''
      }
    </item>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(blogTitle)}</title>
    <link>${siteUrl}</link>
    <description>${escapeXml(footerText)}</description>${items}
  </channel>
</rss>`;
};
