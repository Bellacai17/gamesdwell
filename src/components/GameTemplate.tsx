import React from 'react';
import { Game } from '../data/gameCategories';

interface GameTemplateProps {
  game: Game;
  description?: string;
  instructions?: string[];
  tips?: string[];
}

const GameTemplate: React.FC<GameTemplateProps> = ({
  game,
  description = 'Enjoy this exciting game!',
  instructions = [],
  tips = []
}) => {
  // 转换游戏 URL 为嵌入链接
  const getEmbedUrl = (url: string) => {
    // 从原始 URL 中提取游戏 ID
    const gameId = url.split('/').pop() || '';
    // 返回嵌入链接
    return `https://play.famobi.com/${gameId}?fg_embed=1&fg_share=1`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Game Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{game.name}</h1>
        <p className="text-xl text-gray-600">{description}</p>
      </div>

      {/* Game Container */}
      <div className="bg-white rounded-lg shadow-lg p-4 mb-8">
        <div className="relative w-full" style={{ paddingTop: '75%' }}>
          <iframe
            src={getEmbedUrl(game.url)}
            className="absolute top-0 left-0 w-full h-full border-0"
            title={game.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </div>
      </div>

      {/* Game Instructions */}
      {instructions.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Play</h2>
          <ul className="space-y-3">
            {instructions.map((instruction, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3">
                  {index + 1}
                </span>
                <span className="text-gray-700">{instruction}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Game Tips */}
      {tips.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips & Tricks</h2>
          <ul className="space-y-3">
            {tips.map((tip, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center mr-3">
                  {index + 1}
                </span>
                <span className="text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GameTemplate; 