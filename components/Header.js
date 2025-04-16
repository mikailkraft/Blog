import Link from 'next/link';

export default function Header({ name }) {
  return (
    <header className="pt-20 pb-12">
      <img src="https://miro.medium.com/v2/resize:fill:512:512/1*R6OccSZJGVg_-Zgb4rw_4g.jpeg" className="block w-24 h-24 mx-auto mb-4 rounded-full" />
      <p className="text-2xl text-center dark:text-white">
        <Link href="/">{name}</Link>
      </p>
    </header>
  );
}
