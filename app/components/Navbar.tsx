import Link from 'next/link';
import { categories } from '../data/games';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-title text-gradient">GamesDwell</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className="text-text-secondary hover:text-accent transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button className="button-primary">
              Play Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}