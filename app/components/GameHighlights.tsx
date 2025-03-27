import { Game } from '../types/game';

interface GameHighlightsProps {
  game: Game;
  className?: string;
}

export default function GameHighlights({ game, className = '' }: GameHighlightsProps) {
  // 游戏亮点与玩法内容 - 实际应用中可以在游戏数据模型中添加这些字段
  const highlights = [
    {
      title: 'Engaging Gameplay',
      description: `Experience the thrill of ${game.title} with its unique gameplay mechanics designed to keep you engaged for hours.`,
      icon: (
        <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      )
    },
    {
      title: 'Challenge Yourself',
      description: `Test your skills against increasingly difficult levels and unlock new achievements as you progress.`,
      icon: (
        <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: 'Stunning Visuals',
      description: `Immerse yourself in beautifully designed environments with attention to detail and smooth animations.`,
      icon: (
        <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <div className={`game-highlights ${className}`}>
      <h2 className="text-2xl font-tech text-accent mb-6">Game Highlights</h2>
      
      {/* 游戏亮点 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {highlights.map((highlight, index) => (
          <div key={index} className="bg-dark rounded-lg p-6 hover:bg-dark/70 transition-colors">
            <div className="mb-4">{highlight.icon}</div>
            <h3 className="text-xl font-tech text-secondary mb-2">{highlight.title}</h3>
            <p className="text-text-secondary">{highlight.description}</p>
          </div>
        ))}
      </div>
      
      {/* 玩法介绍 */}
      <div className="bg-dark rounded-lg p-6">
        <h3 className="text-xl font-tech text-accent mb-4">How to Play</h3>
        <div className="space-y-4">
          <p className="text-text-secondary">
            Jump into the action of {game.title} with these simple steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-text-secondary ml-4">
            <li>Click the <strong className="text-accent">Play Now</strong> button to load the game</li>
            <li>Use the controls to start interacting with the game</li>
            <li>Complete objectives and progress through levels</li>
            <li>Challenge yourself to achieve the highest score</li>
          </ol>
          <p className="text-text-secondary mt-4">
            Master the basics, then discover advanced techniques as you play more!
          </p>
        </div>
      </div>
    </div>
  );
} 