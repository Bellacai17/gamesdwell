import { categories } from '../lib/categories';
import Link from 'next/link';
import { getAllGames } from '../lib/games';

export default async function CategoriesPage() {
  const games = await getAllGames();

  return (
    <main className="min-h-screen pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-light mb-8">Game Categories</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const categoryGames = games.filter(game => game.category === category.id);
            
            return (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className="group bg-primary/10 rounded-lg p-6 hover:bg-primary/20 transition-colors"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-3xl">{category.icon}</span>
                  <h2 className="text-xl font-semibold text-light group-hover:text-accent transition-colors">
                    {category.name}
                  </h2>
                </div>
                <p className="text-light/80 mb-4">{category.description}</p>
                <div className="flex items-center text-accent">
                  <span>{categoryGames.length} games</span>
                  <span className="mx-2">→</span>
                  <span className="group-hover:translate-x-1 transition-transform">Browse</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
} 