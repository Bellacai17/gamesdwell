'use client';

import React from 'react';
import Link from 'next/link';
import { gameCategories } from '../src/data/gameCategories';
import Image from 'next/image';

// Generate color from string
function getColorFromString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = Math.abs(hash).toString(16).substring(0, 6);
  return color.padEnd(6, '0');
}

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Navigation */}
      <nav className="w-64 bg-white shadow-lg fixed h-full overflow-y-auto">
        <div className="p-4">
          <Link href="/" className="block">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">GamesDwell</h1>
          </Link>
          <div className="space-y-2">
            <Link
              href="/popular"
              className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="mr-2">🔥</span>
              Popular Games
            </Link>
            {gameCategories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span className="mr-2">🎮</span>
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {/* Featured Games Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            <span className="flex items-center">
              Featured Games
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {gameCategories[0].games.slice(0, 4).map((game) => (
              <Link
                key={game.id}
                href={`/games/${game.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={`/images/games/${game.id}.jpg`}
                    alt={game.name}
                    width={400}
                    height={300}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      // If image fails to load, use placeholder
                      const target = e.target as HTMLImageElement;
                      target.src = `https://placehold.co/400x300/${getColorFromString(game.id)}/1a1a1a/png?text=${encodeURIComponent(game.name)}`;
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{game.name}</h3>
                  <p className="text-sm text-gray-600">{game.category}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* New Games Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            <span className="flex items-center">
              New Games
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {gameCategories[1].games.slice(0, 8).map((game) => (
              <Link
                key={game.id}
                href={`/games/${game.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={`/images/games/${game.id}.jpg`}
                    alt={game.name}
                    width={400}
                    height={300}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      // If image fails to load, use placeholder
                      const target = e.target as HTMLImageElement;
                      target.src = `https://placehold.co/400x300/${getColorFromString(game.id)}/1a1a1a/png?text=${encodeURIComponent(game.name)}`;
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{game.name}</h3>
                  <p className="text-sm text-gray-600">{game.category}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular Games Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            <Link href="/popular" className="hover:text-blue-600 transition-colors flex items-center">
              Popular Games
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              ...gameCategories[2].games.slice(0, 4),
              ...gameCategories[3].games.slice(0, 4),
              ...gameCategories[4].games.slice(0, 4),
              ...gameCategories[5].games.slice(0, 4)
            ].slice(0, 12).map((game) => (
              <Link
                key={game.id}
                href={`/games/${game.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={`/images/games/${game.id}.jpg`}
                    alt={game.name}
                    width={400}
                    height={300}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      // If image fails to load, use placeholder
                      const target = e.target as HTMLImageElement;
                      target.src = `https://placehold.co/400x300/${getColorFromString(game.id)}/1a1a1a/png?text=${encodeURIComponent(game.name)}`;
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{game.name}</h3>
                  <p className="text-sm text-gray-600">{game.category}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}