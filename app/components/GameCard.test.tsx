import { render, screen } from '@testing-library/react';
import GameCard from './GameCard';

// 模拟数据
const mockGame = {
  id: 'test-game',
  title: 'Test Game',
  description: 'A test game for unit testing',
  category: 'action',
  thumbnail: '/images/games/test-game.jpg',
  url: 'https://example.com/game',
  tags: ['action', 'test'],
  iframeWidth: 800,
  iframeHeight: 600,
  rating: 4.5,
  ratingCount: 100,
  playCount: 500
};

describe('GameCard', () => {
  it('renders game information correctly', () => {
    render(<GameCard game={mockGame} />);
    
    // 检查游戏标题是否正确渲染
    expect(screen.getByText('Test Game')).toBeInTheDocument();
    
    // 检查游戏分类是否显示
    expect(screen.getByText('action')).toBeInTheDocument();
    
    // 检查图片是否存在
    const image = screen.getByAltText('Test Game');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining('test-game'));
  });
  
  it('displays rating when available', () => {
    render(<GameCard game={mockGame} />);
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });
}); 