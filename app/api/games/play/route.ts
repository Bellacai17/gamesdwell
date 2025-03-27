import { NextRequest, NextResponse } from 'next/server';
import { updateGameData, getGameById } from '@/app/lib/games';

// POST /api/games/play
// 记录游戏播放统计
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { gameId } = body;
    
    if (!gameId) {
      return NextResponse.json(
        { error: 'Game ID is required' },
        { status: 400 }
      );
    }
    
    // 获取游戏数据
    const game = await getGameById(gameId);
    if (!game) {
      return NextResponse.json(
        { error: 'Game not found' },
        { status: 404 }
      );
    }
    
    // 增加游戏播放次数
    const currentPlayCount = game.playCount || 0;
    const updatedGame = await updateGameData(gameId, {
      playCount: currentPlayCount + 1
    });
    
    return NextResponse.json({
      success: true,
      gameId,
      playCount: updatedGame?.playCount || currentPlayCount + 1
    });
  } catch (error) {
    console.error('Error recording game play:', error);
    return NextResponse.json(
      { error: 'Failed to record game play' },
      { status: 500 }
    );
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