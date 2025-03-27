'use client';

import { Game } from '../types/game';
import GameCard from './GameCard';

interface PopularGamesProps {
  games: Game[];
}

export default function PopularGames({ games }: PopularGamesProps) {
  // 按评分排序，取前5个游戏
  const popularGames = [...games]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {popularGames.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
} 