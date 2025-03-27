import { getGameById, incrementGamePlayCount } from '../../../lib/games';
import { NextRequest, NextResponse } from 'next/server';

// POST /api/games/play
// 记录游戏播放统计
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { gameId } = data;
    
    if (!gameId) {
      return NextResponse.json({ error: 'Game ID is required' }, { status: 400 });
    }
    
    const game = await getGameById(gameId);
    if (!game) {
      return NextResponse.json({ error: 'Game not found' }, { status: 404 });
    }
    
    // 增加游戏播放次数
    await incrementGamePlayCount(gameId);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error recording game play:', error);
    return NextResponse.json({ error: 'Failed to record game play' }, { status: 500 });
  }
}

// GET /api/games/play/stats?gameId=xxx
// 获取游戏播放统计
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get('gameId');
    
    if (!gameId) {
      return NextResponse.json(
        { error: 'Game ID is required' },
        { status: 400 }
      );
    }
    
    const game = await getGameById(gameId);
    if (!game) {
      return NextResponse.json(
        { error: 'Game not found' },
        { status: 404 }
      );
    }
    
    // 返回游戏播放统计
    return NextResponse.json({
      gameId,
      playCount: game.playCount || 0,
      lastUpdated: game.lastUpdated || null
    });
  } catch (error) {
    console.error('Error getting game play stats:', error);
    return NextResponse.json(
      { error: 'Failed to get game play stats' },
      { status: 500 }
    );
  }
} 