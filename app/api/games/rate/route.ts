import { getGameById, updateGameRating } from '../../../lib/games';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// POST /api/games/rate
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { gameId, rating, comment, userId } = data;
    
    if (!gameId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Valid game ID and rating (1-5) are required' }, { status: 400 });
    }
    
    const game = await getGameById(gameId);
    if (!game) {
      return NextResponse.json({ error: 'Game not found' }, { status: 404 });
    }
    
    // 生成唯一的评论ID
    const commentId = uuidv4();
    
    // 更新游戏评分
    const result = await updateGameRating(gameId, {
      rating,
      comment,
      userId: userId || `anonymous-${commentId}`,
      commentId,
      date: new Date().toISOString()
    });
    
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error('Error rating game:', error);
    return NextResponse.json({ error: 'Failed to save rating' }, { status: 500 });
  }
}

// GET /api/games/rate?gameId=xxx
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
    
    return NextResponse.json({
      rating: game.rating || 0,
      ratingCount: game.ratingCount || 0,
      comments: game.comments || []
    });
  } catch (error) {
    console.error('Error getting game ratings:', error);
    return NextResponse.json(
      { error: 'Failed to get game ratings' },
      { status: 500 }
    );
  }
} 