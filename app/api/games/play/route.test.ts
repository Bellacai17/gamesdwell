import { NextRequest } from 'next/server';
import { POST } from '../../../api/games/play/route';
import * as gamesLib from '../../../lib/games';

// 模拟 games 库函数
jest.mock('../../../lib/games', () => ({
  getGameById: jest.fn(),
  incrementGamePlayCount: jest.fn()
}));

describe('POST /api/games/play', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('should return 400 if gameId is missing', async () => {
    const req = new NextRequest('http://localhost:3000/api/games/play', {
      method: 'POST',
      body: JSON.stringify({})
    });
    
    const response = await POST(req);
    const data = await response.json();
    
    expect(response.status).toBe(400);
    expect(data.error).toBe('Game ID is required');
  });
  
  it('should return 404 if game not found', async () => {
    // 模拟游戏不存在
    (gamesLib.getGameById as jest.Mock).mockResolvedValue(null);
    
    const req = new NextRequest('http://localhost:3000/api/games/play', {
      method: 'POST',
      body: JSON.stringify({ gameId: 'non-existent-game' })
    });
    
    const response = await POST(req);
    const data = await response.json();
    
    expect(response.status).toBe(404);
    expect(data.error).toBe('Game not found');
    expect(gamesLib.getGameById).toHaveBeenCalledWith('non-existent-game');
  });
  
  it('should increment play count and return success', async () => {
    // 模拟游戏存在
    (gamesLib.getGameById as jest.Mock).mockResolvedValue({ id: 'test-game' });
    (gamesLib.incrementGamePlayCount as jest.Mock).mockResolvedValue({ id: 'test-game', playCount: 6 });
    
    const req = new NextRequest('http://localhost:3000/api/games/play', {
      method: 'POST',
      body: JSON.stringify({ gameId: 'test-game' })
    });
    
    const response = await POST(req);
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(gamesLib.incrementGamePlayCount).toHaveBeenCalledWith('test-game');
  });
}); 