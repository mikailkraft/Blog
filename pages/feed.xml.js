import { generateRssFeed } from '../utils/generate-rss';

export const getServerSideProps = async ({ res }) => {
  const rss = generateRssFeed();

  res.setHeader('Content-Type', 'application/xml');
  res.write(rss);
  res.end();

  return { props: {} };
};

export default function Feed() {
  return null;
}
