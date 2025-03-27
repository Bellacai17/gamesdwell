export interface Game {
  id: string;
  name: string;
  url: string;
  category: string;
}

export interface GameCategory {
  id: string;
  name: string;
  description: string;
  games: Game[];
}

export const gameCategories: GameCategory[] = [
  {
    id: 'action',
    name: 'Action Games',
    description: 'Fast-paced games that require quick reflexes and strategic thinking',
    games: [
      { id: 'giant-rush', name: 'Giant Rush', url: 'https://play.famobi.com/giant-rush', category: 'action' },
      { id: 'rise-up', name: 'Rise Up', url: 'https://play.famobi.com/rise-up', category: 'action' },
      { id: 'western-sniper', name: 'Western Sniper', url: 'https://play.famobi.com/western-sniper', category: 'action' }
    ]
  },
  {
    id: 'puzzle',
    name: 'Puzzle Games',
    description: 'Brain-teasing games that challenge your problem-solving skills',
    games: [
      { id: 'color-fill-3d', name: 'Color Fill 3D', url: 'https://play.famobi.com/color-fill-3d', category: 'puzzle' },
      { id: 'spot-the-cat', name: 'Spot the Cat', url: 'https://play.famobi.com/spot-the-cat', category: 'puzzle' },
      { id: 'color-roll-3d', name: 'Color Roll 3D', url: 'https://play.famobi.com/color-roll-3d', category: 'puzzle' }
    ]
  },
  {
    id: 'arcade',
    name: 'Arcade Games',
    description: 'Classic arcade-style games with simple controls and addictive gameplay',
    games: [
      { id: 'parking-jam', name: 'Parking Jam', url: 'https://play.famobi.com/parking-jam', category: 'arcade' },
      { id: 'fashion-battle', name: 'Fashion Battle', url: 'https://play.famobi.com/fashion-battle', category: 'arcade' },
      { id: 'fruit-party', name: 'Fruit Party', url: 'https://play.famobi.com/fruit-party', category: 'arcade' },
      { id: 'guess-their-answer', name: 'Guess Their Answer', url: 'https://play.famobi.com/guess-their-answer', category: 'arcade' },
      { id: 'peet-sneak', name: 'Peet Sneak', url: 'https://play.famobi.com/peet-sneak', category: 'arcade' },
      { id: 'cut-the-rope', name: 'Cut The Rope', url: 'https://play.famobi.com/cut-the-rope', category: 'arcade' },
      { id: 'toilet-run', name: 'Toilet Run', url: 'https://play.famobi.com/toilet-run', category: 'arcade' },
      { id: 'block-painter', name: 'Block Painter', url: 'https://play.famobi.com/block-painter', category: 'arcade' },
      { id: 'cowboy-swing', name: 'Cowboy Swing', url: 'https://play.famobi.com/cowboy-swing', category: 'arcade' },
      { id: 'pair-up-3d', name: 'Pair Up 3D', url: 'https://play.famobi.com/pair-up-3d', category: 'arcade' }
    ]
  },
  {
    id: 'sports',
    name: 'Sports Games',
    description: 'Sports-themed games including soccer, basketball, and other athletic activities',
    games: [
      { id: '3d-basketball', name: '3D Basketball', url: 'https://play.famobi.com/3d-basketball', category: 'sports' },
      { id: 'soccer-champ-2018', name: 'Soccer Champ 2018', url: 'https://play.famobi.com/soccer-champ-2018', category: 'sports' },
      { id: '3d-bowling', name: '3D Bowling', url: 'https://play.famobi.com/3d-bowling', category: 'sports' },
      { id: '3d-free-kick', name: '3D Free Kick', url: 'https://play.famobi.com/3d-free-kick', category: 'sports' },
      { id: 'street-hoops-3d', name: 'Street Hoops 3D', url: 'https://play.famobi.com/street-hoops-3d', category: 'sports' },
      { id: 'table-tennis-world-tour', name: 'Table Tennis World Tour', url: 'https://play.famobi.com/table-tennis-world-tour', category: 'sports' },
      { id: 'billiard-blitz-challenge', name: 'Billiard Blitz Challenge', url: 'https://play.famobi.com/billiard-blitz-challenge', category: 'sports' },
      { id: 'penalty-shootout-multi-league', name: 'Penalty Shootout Multi League', url: 'https://play.famobi.com/penalty-shootout-multi-league', category: 'sports' },
      { id: 'soccer-heads', name: 'Soccer Heads', url: 'https://play.famobi.com/soccer-heads', category: 'sports' },
      { id: 'goal-champion', name: 'Goal Champion', url: 'https://play.famobi.com/goal-champion', category: 'sports' }
    ]
  },
  {
    id: 'racing',
    name: 'Racing Games',
    description: 'High-speed racing games with various vehicles and tracks',
    games: [
      { id: 'train-miner', name: 'Train Miner', url: 'https://play.famobi.com/train-miner', category: 'racing' },
      { id: 'go-escape', name: 'Go Escape', url: 'https://play.famobi.com/go-escape', category: 'racing' },
      { id: 'go-around', name: 'Go Around', url: 'https://play.famobi.com/go-around', category: 'racing' },
      { id: 'green-ball', name: 'Green Ball', url: 'https://play.famobi.com/green-ball', category: 'racing' },
      { id: 'twisty-lines', name: 'Twisty Lines', url: 'https://play.famobi.com/twisty-lines', category: 'racing' },
      { id: 'lawn-mower', name: 'Lawn Mower', url: 'https://play.famobi.com/lawn-mower', category: 'racing' },
      { id: 'rising-squares', name: 'Rising Squares', url: 'https://play.famobi.com/rising-squares', category: 'racing' },
      { id: 'tower-fall', name: 'Tower Fall', url: 'https://play.famobi.com/tower-fall', category: 'racing' },
      { id: 'emoji-fun', name: 'Emoji Fun', url: 'https://play.famobi.com/emoji-fun', category: 'racing' },
      { id: 'bottle-flip', name: 'Bottle Flip', url: 'https://play.famobi.com/bottle-flip', category: 'racing' }
    ]
  },
  {
    id: 'casual',
    name: 'Casual Games',
    description: 'Easy-to-play games perfect for quick entertainment',
    games: [
      { id: 'slime-road', name: 'Slime Road', url: 'https://play.famobi.com/slime-road', category: 'casual' },
      { id: 'funny-fred', name: 'Funny Fred', url: 'https://play.famobi.com/funny-fred', category: 'casual' },
      { id: 'barbara-kent', name: 'Barbara Kent', url: 'https://play.famobi.com/barbara-and-kent', category: 'casual' },
      { id: 'parking-panic', name: 'Parking Panic', url: 'https://play.famobi.com/parking-panic', category: 'casual' },
      { id: 'super-thrower', name: 'Super Thrower', url: 'https://play.famobi.com/super-thrower', category: 'casual' },
      { id: 'food-rush', name: 'Food Rush', url: 'https://play.famobi.com/food-rush', category: 'casual' },
      { id: 'parking-rush', name: 'Parking Rush', url: 'https://play.famobi.com/parking-rush', category: 'casual' },
      { id: 'gun-spin', name: 'Gun Spin', url: 'https://play.famobi.com/gun-spin', category: 'casual' },
      { id: 'giant-attack', name: 'Giant Attack', url: 'https://play.famobi.com/giant-attack', category: 'casual' },
      { id: 'crazy-hen-level', name: 'Crazy Hen Level', url: 'https://play.famobi.com/crazy-hen-level', category: 'casual' }
    ]
  },
  {
    id: 'card',
    name: 'Card Games',
    description: 'Classic card games and card-based puzzles',
    games: [
      { id: 'solitaire-legend', name: 'Solitaire Legend', url: 'https://play.famobi.com/solitaire-legend', category: 'card' },
      { id: 'gin-rummy-plus', name: 'Gin Rummy Plus', url: 'https://play.famobi.com/gin-rummy-plus', category: 'card' },
      { id: '3d-solitaire', name: '3D Solitaire', url: 'https://play.famobi.com/3d-solitaire', category: 'card' },
      { id: 'duo-cards', name: 'Duo Cards', url: 'https://play.famobi.com/duo-cards', category: 'card' },
      { id: 'blackjack-bet', name: 'Blackjack Bet', url: 'https://play.famobi.com/blackjack-bet', category: 'card' },
      { id: 'okey-classic', name: 'Okey Classic', url: 'https://play.famobi.com/okey-classic', category: 'card' },
      { id: 'solitaire-klondike', name: 'Solitaire Klondike', url: 'https://play.famobi.com/solitaire-klondike', category: 'card' },
      { id: 'mafia-poker', name: 'Mafia Poker', url: 'https://play.famobi.com/mafia-poker', category: 'card' },
      { id: 'matching-card-heroes', name: 'Matching Card Heroes', url: 'https://play.famobi.com/matching-card-heroes', category: 'card' },
      { id: 'fairy-cards', name: 'Fairy Cards', url: 'https://play.famobi.com/fairy-cards', category: 'card' }
    ]
  },
  {
    id: 'strategy',
    name: 'Strategy Games',
    description: 'Games that require tactical thinking and planning',
    games: [
      { id: 'good-shelves', name: 'Good Shelves', url: 'https://play.famobi.com/good-shelves', category: 'strategy' },
      { id: 'dance-battle', name: 'Dance Battle', url: 'https://play.famobi.com/dance-battle', category: 'strategy' },
      { id: 'tile-journey', name: 'Tile Journey', url: 'https://play.famobi.com/tile-journey', category: 'strategy' },
      { id: 'love-tester', name: 'Love Tester', url: 'https://play.famobi.com/love-tester', category: 'strategy' },
      { id: 'emoji-match', name: 'Emoji Match', url: 'https://play.famobi.com/emoji-match', category: 'strategy' },
      { id: 'tower-smash-level', name: 'Tower Smash Level', url: 'https://play.famobi.com/tower-smash-level', category: 'strategy' },
      { id: 'tower-smash', name: 'Tower Smash', url: 'https://play.famobi.com/tower-smash', category: 'strategy' },
      { id: 'save-the-princess', name: 'Save the Princess', url: 'https://play.famobi.com/save-the-princess', category: 'strategy' },
      { id: 'peet-a-lock', name: 'Peet a Lock', url: 'https://play.famobi.com/peet-a-lock', category: 'strategy' },
      { id: 'pengu-slide', name: 'Pengu Slide', url: 'https://play.famobi.com/pengu-slide', category: 'strategy' }
    ]
  },
  {
    id: 'educational',
    name: 'Educational Games',
    description: 'Games that combine learning with entertainment',
    games: [
      { id: 'words-of-wonders', name: 'Words of Wonders', url: 'https://play.famobi.com/words-of-wonders', category: 'educational' },
      { id: 'emoji-flow', name: 'Emoji Flow', url: 'https://play.famobi.com/emoji-flow', category: 'educational' },
      { id: 'neon-swing', name: 'Neon Swing', url: 'https://play.famobi.com/neon-swing', category: 'educational' },
      { id: 'neon-tower', name: 'Neon Tower', url: 'https://play.famobi.com/neon-tower', category: 'educational' },
      { id: 'drift-dudes', name: 'Drift Dudes', url: 'https://play.famobi.com/drift-dudes', category: 'educational' },
      { id: 'slope', name: 'Slope', url: 'https://play.famobi.com/slope', category: 'educational' },
      { id: 'cubito', name: 'Cubito', url: 'https://play.famobi.com/cubito', category: 'educational' },
      { id: 'tap-tap-dunk', name: 'Tap Tap Dunk', url: 'https://play.famobi.com/tap-tap-dunk', category: 'educational' },
      { id: 'ramp', name: 'Ramp', url: 'https://play.famobi.com/ramp', category: 'educational' },
      { id: 'diamond-rush-2', name: 'Diamond Rush 2', url: 'https://play.famobi.com/diamond-rush-2', category: 'educational' }
    ]
  }
]; 