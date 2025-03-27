'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Game } from '../types/game';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <Link href={`/game/${game.id}`} className="group">
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
        <div className="relative aspect-video">
          <Image
            src={game.thumbnail}
            alt={game.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
            {game.title}
          </h3>
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
            {game.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {game.category}
            </span>
            {game.rating && (
              <div className="flex items-center">
                <span className="text-yellow-400 mr-1">★</span>
                <span className="text-sm text-gray-300">
                  {game.rating.toFixed(1)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}