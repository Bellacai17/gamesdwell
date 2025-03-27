'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Game } from '../types/game';

interface GameScreenshotsProps {
  game: Game;
  className?: string;
}

export default function GameScreenshots({ game, className = '' }: GameScreenshotsProps) {
  // 假设游戏有多个截图，这里我们使用缩略图作为主要截图
  // 在实际应用中，可以在游戏数据模型中添加screenshots数组
  const [activeIndex, setActiveIndex] = useState(0);
  
  // 模拟游戏截图
  const screenshots = [
    game.thumbnail,
    // 在实际应用中，你可以替换为真实的截图URL
    'https://cloud.onlinegames.io/games/2025/unity/monster-survivors/screenshot1.jpg',
    'https://cloud.onlinegames.io/games/2025/unity/monster-survivors/screenshot2.jpg',
    'https://cloud.onlinegames.io/games/2025/unity/monster-survivors/screenshot3.jpg'
  ];

  return (
    <div className={`bg-dark rounded-lg p-4 ${className}`}>
      <div className="relative aspect-video mb-4">
        <Image
          src={screenshots[activeIndex]}
          alt={`${game.title} screenshot ${activeIndex + 1}`}
          fill
          className="object-cover rounded-lg"
        />
        <button
          onClick={() => setActiveIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
        >
          ←
        </button>
        <button
          onClick={() => setActiveIndex((prev) => (prev + 1) % screenshots.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
        >
          →
        </button>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {screenshots.map((screenshot, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`relative w-20 h-12 flex-shrink-0 rounded-lg overflow-hidden ${
              activeIndex === index ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <Image
              src={screenshot}
              alt={`${game.title} thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
} 