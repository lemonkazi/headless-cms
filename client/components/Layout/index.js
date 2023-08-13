import Link from "next/link";

export default function Layout() {
  return (
    <nav className="flex justify-between items-center py-6 px-4 bg-gray-100">
      <h1 className="uppercase text-gray-900 font-bold text-3xl">
        <Link href="/">MAMUN</Link>
      </h1>
      <ul className="flex gap-3">
        <li>
          <Link
            href="/"
            className="text-gray-900 hover:text-red-400 duration-300 hover:border-b-red-400"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/projects"
            className="text-gray-900 hover:text-red-400 duration-300 hover:border-b-red-400"
          >
            Projects
          </Link>
        </li>
        <li>
          <Link
            href="/blog"
            className="text-gray-900 hover:text-red-400 duration-300 hover:border-b-red-400"
          >
            Blog
          </Link>
        </li>
        <li>
          <Link
            href="/aboutMe"
            className="text-gray-900 hover:text-red-400 duration-300 hover:border-b-red-400"
          >
            About me
          </Link>
        </li>
      </ul>
    </nav>
  );
}
