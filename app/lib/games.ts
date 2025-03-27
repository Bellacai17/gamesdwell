import { Game } from '../types/game';
import path from 'path';
import fs from 'fs/promises';

// 游戏数据文件路径
const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'games.json');

// 获取所有游戏列表
export async function getAllGames(): Promise<Game[]> {
  try {
    const fileData = await fs.readFile(DATA_FILE_PATH, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error('Error loading games data:', error);
    return [];
  }
}

// 通过ID获取单个游戏
export async function getGameById(id: string): Promise<Game | null> {
  try {
    const games = await getAllGames();
    console.log('Loading game with ID:', id);
    console.log('Available games:', games.map(g => g.id));
    const game = games.find(game => game.id === id);
    return game || null;
  } catch (error) {
    console.error(`Error getting game with id ${id}:`, error);
    return null;
  }
}

// 获取按类别分类的游戏
export async function getGamesByCategory(category: string): Promise<Game[]> {
  try {
    const games = await getAllGames();
    return games.filter(game => game.category === category);
  } catch (error) {
    console.error(`Error getting games with category ${category}:`, error);
    return [];
  }
}

// 获取精选游戏列表
export async function getFeaturedGames(limit = 6): Promise<Game[]> {
  try {
    const games = await getAllGames();
    // 这里可以基于某些标准选择精选游戏，例如高评分或特殊标签
    return games
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, limit);
  } catch (error) {
    console.error('Error getting featured games:', error);
    return [];
  }
}

// 获取最新游戏列表
export async function getLatestGames(limit = 6): Promise<Game[]> {
  try {
    const games = await getAllGames();
    // 基于发布日期排序
    return games
      .sort((a, b) => {
        const dateA = a.releaseDate ? new Date(a.releaseDate).getTime() : 0;
        const dateB = b.releaseDate ? new Date(b.releaseDate).getTime() : 0;
        return dateB - dateA;
      })
      .slice(0, limit);
  } catch (error) {
    console.error('Error getting latest games:', error);
    return [];
  }
}

// 获取流行游戏列表
export async function getPopularGames(limit = 6): Promise<Game[]> {
  try {
    const games = await getAllGames();
    // 基于游戏播放次数排序
    return games
      .sort((a, b) => (b.playCount || 0) - (a.playCount || 0))
      .slice(0, limit);
  } catch (error) {
    console.error('Error getting popular games:', error);
    return [];
  }
}

// 搜索游戏
export async function searchGames(query: string): Promise<Game[]> {
  try {
    const games = await getAllGames();
    const lowercaseQuery = query.toLowerCase();
    
    return games.filter(game => 
      game.title.toLowerCase().includes(lowercaseQuery) ||
      game.description.toLowerCase().includes(lowercaseQuery) ||
      game.category.toLowerCase().includes(lowercaseQuery) ||
      game.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  } catch (error) {
    console.error(`Error searching games with query ${query}:`, error);
    return [];
  }
}

// 更新游戏数据（例如增加游戏播放次数或评分）
export async function updateGameData(gameId: string, updateData: Partial<Game>): Promise<Game | null> {
  try {
    const games = await getAllGames();
    const gameIndex = games.findIndex(game => game.id === gameId);
    
    if (gameIndex === -1) {
      return null;
    }
    
    // 更新游戏数据
    const updatedGame = { ...games[gameIndex], ...updateData };
    games[gameIndex] = updatedGame;
    
    // 保存回文件
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(games, null, 2), 'utf8');
    
    return updatedGame;
  } catch (error) {
    console.error(`Error updating game with id ${gameId}:`, error);
    return null;
  }
} 