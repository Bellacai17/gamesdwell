'use client';

import { Game } from '../types/game';

interface GamePreviewProps {
  game: Game;
  className?: string;
}

export default function GamePreview({ game, className = '' }: GamePreviewProps) {
  if (!game.previewVideo) {
    return null;
  }

  return (
    <div className={`bg-gray-800 rounded-lg overflow-hidden ${className}`}>
      <h2 className="text-xl font-tech text-secondary p-4 border-b border-gray-700">
        Game Preview
      </h2>
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={game.previewVideo}
          title={`${game.title} Preview`}
          className="absolute top-0 left-0 w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
} 