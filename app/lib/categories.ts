export interface GameCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const categories: GameCategory[] = [
  {
    id: 'action',
    name: 'Action Games',
    description: 'Fast-paced games with combat and challenges',
    icon: '🎮'
  },
  {
    id: 'arcade',
    name: 'Arcade Games',
    description: 'Classic arcade-style games',
    icon: '🕹️'
  },
  {
    id: 'puzzle',
    name: 'Puzzle Games',
    description: 'Brain-teasing puzzle games',
    icon: '🧩'
  },
  {
    id: 'sports',
    name: 'Sports Games',
    description: 'Sports and racing games',
    icon: '⚽'
  },
  {
    id: 'adventure',
    name: 'Adventure Games',
    description: 'Story-driven adventure games',
    icon: '🗺️'
  },
  {
    id: 'strategy',
    name: 'Strategy Games',
    description: 'Tactical and strategic games',
    icon: '🎯'
  },
  {
    id: 'casual',
    name: 'Casual Games',
    description: 'Easy-to-play casual games',
    icon: '🎲'
  }
]; 