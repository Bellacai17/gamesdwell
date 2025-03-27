'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { gameCategories } from '../../../src/data/gameCategories';

// 定义游戏类型
interface Game {
  id: string;
  name: string;
  category: string;
  url: string;
  // 添加其他可能的属性
}

// Generate color from string
function getColorFromString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = Math.abs(hash).toString(16).substring(0, 6);
  return color.padEnd(6, '0');
}

// Get embed URL
function getEmbedUrl(url: string): string {
  // Build embed URL
  return `${url}?embed=1&fg_zone=play.famobi.com&fg_share=1&fg_embed=1&original_ref=${encodeURIComponent(url)}`;
}

export default function GamePage() {
  const params = useParams();
  const gameId = params?.id as string || '';
  
  // Find game
  let foundGame: Game | null = null;
  let categoryId = '';
  
  for (const category of gameCategories) {
    const game = category.games.find(g => g.id === gameId);
    if (game) {
      foundGame = game as Game;
      categoryId = category.id;
      break;
    }
  }
  
  if (!foundGame) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Game Not Found</h1>
          <Link href="/" className="text-blue-500 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }
  
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
                className={`flex items-center p-2 ${category.id === categoryId ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'} rounded-lg transition-colors`}
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
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link href={`/category/${categoryId}`} className="flex items-center text-blue-500 hover:underline">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Category
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">{foundGame.name}</h1>
          <p className="text-gray-600 mt-2">Category: {foundGame.category}</p>
        </div>
        
        {/* Game Preview */}
        <div className="mb-8">
          <div className="relative h-80 rounded-lg overflow-hidden">
            <Image
              src={`/images/games/${foundGame.id}.jpg`}
              alt={foundGame.name}
              width={800}
              height={600}
              className="object-cover w-full h-full"
              onError={(e) => {
                // If image fails to load, use placeholder
                const target = e.target as HTMLImageElement;
                target.src = `https://placehold.co/800x600/${getColorFromString(foundGame.id)}/1a1a1a/png?text=${encodeURIComponent(foundGame.name)}`;
              }}
            />
          </div>
        </div>
        
        {/* Game Embed */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Play Game</h2>
          </div>
          <div className="aspect-w-16 aspect-h-9 w-full">
            <iframe
              src={getEmbedUrl(foundGame.url)}
              className="w-full h-[600px]"
              frameBorder="0"
              allowFullScreen
              title={foundGame.name}
            ></iframe>
          </div>
        </div>
      </main>
    </div>
  );
} 