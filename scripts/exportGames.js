const fs = require('fs');
const path = require('path');
const { createObjectCsvWriter } = require('csv-writer');

// 配置
const GAMES_DATA_FILE = path.join(__dirname, '../app/data/games.ts');
const CSV_FILE_PATH = path.join(__dirname, 'games-export.csv');

// 读取现有的游戏数据
function readExistingGamesData() {
  try {
    // 这里我们不能直接require，因为它是TypeScript文件
    // 我们将通过文本方式读取并解析
    const fileContent = fs.readFileSync(GAMES_DATA_FILE, 'utf8');
    
    // 提取游戏数组部分
    const gamesArrayMatch = fileContent.match(/export const games: Game\[\] = \[([\s\S]*?)\];/);
    if (!gamesArrayMatch) {
      console.error('无法在文件中找到游戏数组');
      return [];
    }
    
    // 使用eval（在生产环境中不推荐）解析游戏数组
    // 这只是一个简单的示例，实际生产中应使用更安全的方法
    const gamesArrayString = `[${gamesArrayMatch[1]}]`;
    // 注意：这是不安全的，仅用于示例
    return eval(gamesArrayString);
  } catch (error) {
    console.error('读取现有游戏数据时出错:', error);
    return [];
  }
}

// 将游戏对象转换为CSV格式的对象
function convertGameToCsvObject(game) {
  return {
    title: game.title,
    description: game.description,
    category: game.category,
    iframeUrl: game.iframeUrl,
    thumbnailUrl: game.thumbnailUrl,
    controls: game.controls,
    tags: game.tags.join(', '),
    featured: game.featured.toString(),
    dimensions: `${game.dimensions.width}x${game.dimensions.height}`,
    developer: game.metadata?.developer || '',
    publisher: game.metadata?.publisher || '',
    releaseDate: game.metadata?.releaseDate || '',
    rating: game.metadata?.rating?.score || '',
    ratingCount: game.metadata?.rating?.count || '',
    minFPS: game.performance?.minFPS || '',
    targetFPS: game.performance?.targetFPS || '',
    cpu: game.performance?.recommendedSpecs?.cpu || '',
    ram: game.performance?.recommendedSpecs?.ram || '',
    gpu: game.performance?.recommendedSpecs?.gpu || ''
  };
}

// 主函数
async function exportGamesToCSV() {
  // 读取游戏数据
  const games = readExistingGamesData();
  
  if (!games || games.length === 0) {
    console.error('无游戏数据可导出');
    return;
  }
  
  // 定义CSV结构
  const csvWriter = createObjectCsvWriter({
    path: CSV_FILE_PATH,
    header: [
      { id: 'title', title: 'title' },
      { id: 'description', title: 'description' },
      { id: 'category', title: 'category' },
      { id: 'iframeUrl', title: 'iframeUrl' },
      { id: 'thumbnailUrl', title: 'thumbnailUrl' },
      { id: 'controls', title: 'controls' },
      { id: 'tags', title: 'tags' },
      { id: 'featured', title: 'featured' },
      { id: 'dimensions', title: 'dimensions' },
      { id: 'developer', title: 'developer' },
      { id: 'publisher', title: 'publisher' },
      { id: 'releaseDate', title: 'releaseDate' },
      { id: 'rating', title: 'rating' },
      { id: 'ratingCount', title: 'ratingCount' },
      { id: 'minFPS', title: 'minFPS' },
      { id: 'targetFPS', title: 'targetFPS' },
      { id: 'cpu', title: 'cpu' },
      { id: 'ram', title: 'ram' },
      { id: 'gpu', title: 'gpu' }
    ]
  });
  
  // 将游戏数据转换为CSV格式
  const csvData = games.map(game => convertGameToCsvObject(game));
  
  // 写入CSV文件
  try {
    await csvWriter.writeRecords(csvData);
    console.log(`成功导出 ${games.length} 个游戏到 ${CSV_FILE_PATH}`);
  } catch (error) {
    console.error('导出游戏数据时出错:', error);
  }
}

// 执行导出
exportGamesToCSV(); 