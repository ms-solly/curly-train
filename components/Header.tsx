import Link from 'next/link';

const Header = () => (
  <div className="bg-gray-800 p-4 sticky">
    <nav className="flex items-center">
      <ul className="flex space-x-4 justify-between items-center">
        <li><Link href="/live-matches" className="text-white hover:text-gray-200">Live Matches</Link></li>
        <li><Link href="/upcoming-matches" className="text-white hover:text-gray-200">Upcoming Matches</Link></li>
        <li><Link href="/tournaments" className="text-white hover:text-gray-200">Tournaments</Link></li>

      </ul>
    </nav>
  </div>
);

export default Header;