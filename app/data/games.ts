import { Game, GameCategory } from '../types/game';

export const categories: GameCategory[] = [
  {
    id: 'action',
    name: 'Action',
    description: 'Fast-paced action games',
    icon: '🎮',
    slug: 'action',
    featured: true,
    gameCount: 0,
    lastUpdated: '2024-03-20'
  },
  {
    id: 'puzzle',
    name: 'Puzzle',
    description: 'Brain-teasing puzzle games',
    icon: '🧩',
    slug: 'puzzle',
    featured: true,
    gameCount: 0,
    lastUpdated: '2024-03-20'
  },
  {
    id: 'strategy',
    name: 'Strategy',
    description: 'Strategic thinking games',
    icon: '⚔️',
    slug: 'strategy',
    featured: true,
    gameCount: 0,
    lastUpdated: '2024-03-20'
  },
  {
    id: 'sports',
    name: 'Sports',
    description: 'Sports and racing games',
    icon: 'trophy',
    slug: 'sports',
    gameCount: 10,
    lastUpdated: new Date().toISOString()
  }
];

export const games: Game[] = [
  {
    id: 'monster-survivors',
    title: 'Monster Survivors',
    description: 'Survive waves of monsters in this exciting action game. Upgrade your weapons and abilities to become stronger!',
    category: 'action',
    thumbnail: 'https://cloud.onlinegames.io/games/2025/unity/monster-survivors/thumbnail.jpg',
    url: 'https://cloud.onlinegames.io/games/2025/unity/monster-survivors/index-og.html',
    iframeWidth: 800,
    iframeHeight: 600,
    tags: ['action', 'survival', 'monsters', 'upgrade'],
    rating: 4.8,
    ratingCount: 1250,
    playCount: 0,
    comments: [],
    releaseDate: '2024-03-25',
    lastUpdated: new Date().toISOString(),
    screenshots: [
      'https://cloud.onlinegames.io/games/2025/unity/monster-survivors/screenshot1.jpg',
      'https://cloud.onlinegames.io/games/2025/unity/monster-survivors/screenshot2.jpg',
      'https://cloud.onlinegames.io/games/2025/unity/monster-survivors/screenshot3.jpg'
    ],
    highlights: [
      {
        title: 'Intense Survival Action',
        description: 'Face endless waves of monsters in this thrilling survival game',
        icon: 'gamepad'
      },
      {
        title: 'Power-ups & Weapons',
        description: 'Collect various power-ups and weapons to enhance your survival chances',
        icon: 'star'
      },
      {
        title: 'Progressive Difficulty',
        description: 'Challenge yourself as the game gets progressively harder',
        icon: 'trophy'
      }
    ],
    howToPlay: [
      'Click Play Now to start the game',
      'Use WASD to move your character',
      'Click to shoot at monsters',
      'Collect power-ups to enhance your abilities',
      'Survive as long as possible to achieve high scores'
    ],
    tips: [
      {
        title: 'Beginner Tips',
        content: 'Start with basic weapons and focus on movement. Collect power-ups whenever possible.',
        difficulty: 'beginner'
      },
      {
        title: 'Advanced Strategies',
        content: 'Learn monster patterns and use terrain to your advantage. Prioritize power-ups based on your current situation.',
        difficulty: 'advanced'
      },
      {
        title: 'Pro Tips',
        content: 'Master the art of kiting monsters and optimize your power-up collection path.',
        difficulty: 'expert'
      }
    ],
    storyBackground: 'In a world overrun by monsters, you are one of the last survivors. Armed with various weapons and power-ups, you must fight to survive against endless waves of increasingly difficult enemies.',
    developerNotes: 'Monster Survivors is designed to provide an engaging and challenging survival experience. The game features progressive difficulty and various power-ups to keep players engaged.'
  },
  {
    id: 'tower-defense-castle',
    title: 'Tower Defense Castle',
    description: 'Defend your castle against waves of enemies by strategically placing towers and upgrading your defenses.',
    category: 'strategy',
    thumbnail: '/games/tower-defense.jpg',
    url: 'https://cloud.onlinegames.io/games/2024/html5/tower-defense/index.html',
    iframeWidth: 1024,
    iframeHeight: 768,
    tags: ['strategy', 'tower defense', 'medieval', 'waves'],
    rating: 4.6,
    ratingCount: 980,
    playCount: 0,
    comments: [],
    releaseDate: '2024-02-10',
    lastUpdated: new Date().toISOString(),
    screenshots: [
      '/games/tower-defense/screenshot1.jpg',
      '/games/tower-defense/screenshot2.jpg',
      '/games/tower-defense/screenshot3.jpg'
    ],
    highlights: [
      {
        title: 'Strategic Tower Placement',
        description: 'Place towers strategically to defend your castle',
        icon: 'castle'
      },
      {
        title: 'Upgrade System',
        description: 'Upgrade your towers to become more powerful',
        icon: 'upgrade'
      },
      {
        title: 'Wave-based Challenges',
        description: 'Face increasingly difficult waves of enemies',
        icon: 'wave'
      }
    ],
    howToPlay: [
      'Click to place towers',
      'Upgrade towers by clicking on them',
      'Defend your castle from waves of enemies',
      'Earn gold to build more towers'
    ],
    tips: [
      {
        title: 'Beginner Tips',
        content: 'Start with basic towers and focus on covering all paths.',
        difficulty: 'beginner'
      },
      {
        title: 'Advanced Strategies',
        content: 'Mix different tower types for maximum effectiveness.',
        difficulty: 'advanced'
      },
      {
        title: 'Pro Tips',
        content: 'Optimize your tower placement for the best coverage.',
        difficulty: 'expert'
      }
    ],
    storyBackground: 'Your kingdom is under attack! As the castle\'s chief defender, you must strategically place and upgrade towers to protect your realm from invading forces.',
    developerNotes: 'Tower Defense Castle combines classic tower defense gameplay with unique medieval themes and strategic depth.'
  },
  {
    id: 'soccer-stars',
    title: 'Soccer Stars',
    description: 'Compete in fast-paced soccer matches with intuitive controls and physics-based gameplay.',
    category: 'sports',
    thumbnailUrl: '/games/soccer-stars.jpg',
    iframeUrl: 'https://cloud.onlinegames.io/games/2023/sports/soccer-stars/index.html',
    controls: 'Drag and release to shoot, tap to pass',
    tags: ['sports', 'soccer', 'physics', 'multiplayer'],
    featured: false,
    status: 'active',
    lastUpdated: new Date().toISOString(),
    dimensions: {
      width: 960,
      height: 540,
      aspectRatio: '16:9'
    },
    metadata: {
      developer: 'Sports Games Studio',
      publisher: 'Online Games',
      releaseDate: '2023-11-15',
      version: '2.1.0',
      rating: {
        score: 4.7,
        count: 1800
      }
    },
    performance: {
      minFPS: 30,
      targetFPS: 60,
      recommendedSpecs: {
        cpu: 'Intel Core i3 or equivalent',
        ram: '2GB',
        gpu: 'Intel HD Graphics 3000 or equivalent'
      }
    }
  },
  {
    id: 'color-blocks',
    title: 'Color Blocks',
    description: 'Match colors to clear blocks in this addictive puzzle game with challenging levels and power-ups.',
    category: 'puzzle',
    thumbnailUrl: '/games/color-blocks.jpg',
    iframeUrl: 'https://cloud.onlinegames.io/games/2024/puzzle/color-blocks/index.html',
    controls: 'Tap or click to match blocks, drag for special moves',
    tags: ['puzzle', 'matching', 'colorful', 'casual'],
    featured: true,
    status: 'active',
    lastUpdated: new Date().toISOString(),
    dimensions: {
      width: 640,
      height: 960,
      aspectRatio: '2:3'
    },
    metadata: {
      developer: 'Puzzle Masters',
      publisher: 'Mobile Games Inc',
      releaseDate: '2024-01-05',
      version: '3.0.2',
      rating: {
        score: 4.9,
        count: 2500
      }
    },
    performance: {
      minFPS: 30,
      targetFPS: 60,
      recommendedSpecs: {
        cpu: 'Any modern CPU',
        ram: '2GB',
        gpu: 'Any modern GPU'
      }
    }
  },
  {
    id: '1',
    title: 'Space Explorer',
    description: 'Explore the vast universe in this exciting space adventure',
    category: 'action',
    thumbnailUrl: '/games/space-explorer.jpg',
    iframeUrl: 'https://example.com/games/space-explorer',
    controls: 'Use WASD to move, Space to shoot',
    tags: ['space', 'shooter', 'adventure'],
    featured: true,
    status: 'active',
    lastUpdated: new Date().toISOString(),
    dimensions: {
      width: 800,
      height: 600,
      aspectRatio: '4:3'
    },
    metadata: {
      developer: 'Space Games Studio',
      publisher: 'Game Publisher',
      releaseDate: '2024-01-01',
      version: '1.0.0',
      rating: {
        score: 4.5,
        count: 800
      }
    }
  },
  {
    id: '2',
    title: 'Mind Puzzle',
    description: 'Challenge your brain with intricate puzzles',
    category: 'puzzle',
    thumbnailUrl: '/games/mind-puzzle.jpg',
    iframeUrl: 'https://example.com/games/mind-puzzle',
    controls: 'Click and drag to solve puzzles',
    tags: ['puzzle', 'brain', 'logic'],
    featured: false,
    status: 'active',
    lastUpdated: new Date().toISOString(),
    dimensions: {
      width: 800,
      height: 600,
      aspectRatio: '4:3'
    },
    metadata: {
      developer: 'Puzzle Games Inc',
      publisher: 'Game Publisher',
      releaseDate: '2024-02-15',
      version: '1.0.0',
      rating: {
        score: 4.2,
        count: 600
      }
    }
  }
];