'use client';

import { useState } from 'react';
import { Game } from '../types/game';

interface GameTipsProps {
  game: Game;
  className?: string;
}

export default function GameTips({ game, className = '' }: GameTipsProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<'beginner' | 'advanced' | 'expert'>('beginner');

  const tips = game.tips || [];
  const filteredTips = tips.filter(tip => tip.difficulty === selectedDifficulty);

  return (
    <div className={`bg-gray-800 rounded-lg p-6 ${className}`}>
      <h2 className="text-xl font-tech text-secondary mb-4">Game Tips & Strategies</h2>
      
      {/* 难度选择器 */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setSelectedDifficulty('beginner')}
          className={`px-4 py-2 rounded ${
            selectedDifficulty === 'beginner'
              ? 'bg-primary text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Beginner
        </button>
        <button
          onClick={() => setSelectedDifficulty('advanced')}
          className={`px-4 py-2 rounded ${
            selectedDifficulty === 'advanced'
              ? 'bg-primary text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Advanced
        </button>
        <button
          onClick={() => setSelectedDifficulty('expert')}
          className={`px-4 py-2 rounded ${
            selectedDifficulty === 'expert'
              ? 'bg-primary text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Expert
        </button>
      </div>

      {/* 提示列表 */}
      <div className="space-y-4">
        {filteredTips.map((tip, index) => (
          <div key={index} className="bg-gray-700 rounded p-4">
            <h3 className="text-lg font-tech text-white mb-2">{tip.title}</h3>
            <p className="text-gray-300">{tip.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 