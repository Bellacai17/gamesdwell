'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { gameCategories } from '../data/gameCategories';

const GameCategories: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = gameCategories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.games.some(game => game.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search games or categories..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div
              className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white cursor-pointer"
              onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
            >
              <h2 className="text-xl font-bold">{category.name}</h2>
              <p className="text-sm opacity-90">{category.description}</p>
            </div>
            
            {selectedCategory === category.id && (
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  {category.games.map((game) => (
                    <Link
                      key={game.id}
                      href={`/games/${game.id}`}
                      className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      <h3 className="text-sm font-medium text-gray-900">{game.name}</h3>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameCategories; 