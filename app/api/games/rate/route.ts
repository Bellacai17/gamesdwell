import { NextRequest, NextResponse } from 'next/server';
import { updateGameData, getGameById } from '@/app/lib/games';
import { GameComment } from '@/app/types/game';
import { v4 as uuidv4 } from 'uuid';

// POST /api/games/rate
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { gameId, userId, username, rating, comment } = body;
    
    // 验证必填字段
    if (!gameId || !userId || !username || !rating) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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
    
    // 创建新评论
    const newComment: GameComment = {
      id: uuidv4(),
      userId,
      username,
      rating: Number(rating),
      comment: comment || '',
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      replies: []
    };
    
    // 计算新的平均评分
    const comments = [...(game.comments || []), newComment];
    const totalRatings = comments.reduce((sum, comment) => sum + comment.rating, 0);
    const averageRating = totalRatings / comments.length;
    
    // 更新游戏数据
    const updatedGame = await updateGameData(gameId, {
      comments,
      rating: parseFloat(averageRating.toFixed(1)),
      ratingCount: comments.length
    });
    
    return NextResponse.json({
      success: true,
      comment: newComment,
      game: {
        id: updatedGame?.id,
        rating: updatedGame?.rating,
        ratingCount: updatedGame?.ratingCount
      }
    });
  } catch (error) {
    console.error('Error rating game:', error);
    return NextResponse.json(
      { error: 'Failed to rate game' },
      { status: 500 }
    );
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