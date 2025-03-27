const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// 配置
const CSV_FILE_PATH = path.join(__dirname, 'games-data.csv');
const GAMES_DATA_FILE = path.join(__dirname, '../app/data/games.ts');
const DEFAULT_THUMBNAIL_DIR = '/games/';

// 将CSV数据转换为游戏对象
function convertCsvToGameObject(record) {
  // 生成唯一ID (基于标题的slug)
  const id = record.title
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-');

  // 解析标签
  const tags = record.tags ? record.tags.split(',').map(tag => tag.trim()) : [];

  // 解析尺寸
  let width = 800;
  let height = 600;
  let aspectRatio = '4:3';

  if (record.dimensions) {
    const dimensions = record.dimensions.split('x');
    if (dimensions.length === 2) {
      width = parseInt(dimensions[0], 10);
      height = parseInt(dimensions[1], 10);
      
      // 计算宽高比
      const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
      const divisor = gcd(width, height);
      aspectRatio = `${width / divisor}:${height / divisor}`;
    }
  }

  // 创建游戏对象
  return {
    id,
    title: record.title,
    description: record.description || `Play ${record.title} online for free`,
    category: record.category || 'action',
    thumbnailUrl: record.thumbnailUrl || `${DEFAULT_THUMBNAIL_DIR}${id}.jpg`,
    iframeUrl: record.iframeUrl,
    controls: record.controls || 'Click or tap to play',
    tags,
    featured: record.featured === 'true',
    status: record.status || 'active',
    lastUpdated: new Date().toISOString(),
    dimensions: {
      width,
      height,
      aspectRatio
    },
    metadata: {
      developer: record.developer || 'Unknown Developer',
      publisher: record.publisher || 'GamesDwell',
      releaseDate: record.releaseDate || new Date().toISOString().split('T')[0],
      version: record.version || '1.0.0',
      rating: {
        score: parseFloat(record.rating) || 4.5,
        count: parseInt(record.ratingCount, 10) || 500
      }
    },
    performance: {
      minFPS: parseInt(record.minFPS, 10) || 30,
      targetFPS: parseInt(record.targetFPS, 10) || 60,
      recommendedSpecs: {
        cpu: record.cpu || 'Any modern CPU',
        ram: record.ram || '4GB',
        gpu: record.gpu || 'Any modern GPU'
      }
    }
  };
}

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

// 将游戏数据写入TypeScript文件
function writeGamesDataToFile(games) {
  // 获取现有的文件内容以保留导入和类别定义
  const existingContent = fs.readFileSync(GAMES_DATA_FILE, 'utf8');
  
  // 提取imports和categories
  const importsMatch = existingContent.match(/(import[\s\S]*?;)/);
  const categoriesMatch = existingContent.match(/(export const categories[\s\S]*?);/);
  
  if (!importsMatch || !categoriesMatch) {
    console.error('无法提取导入和类别定义');
    return;
  }
  
  const imports = importsMatch[1];
  const categories = categoriesMatch[1];
  
  // 格式化游戏对象为TypeScript代码
  const gamesArrayString = JSON.stringify(games, null, 2)
    // 修复日期格式
    .replace(/"lastUpdated": "([^"]+)"/g, 'lastUpdated: new Date("$1").toISOString()')
    .replace(/"releaseDate": "([^"]+)"/g, 'releaseDate: "$1"');
  
  // 组装新的文件内容
  const newContent = `${imports}

${categories};

export const games: Game[] = ${gamesArrayString};
`;
  
  // 写入文件
  fs.writeFileSync(GAMES_DATA_FILE, newContent, 'utf8');
  console.log(`成功写入 ${games.length} 个游戏到 ${GAMES_DATA_FILE}`);
}

// 主函数
async function importGamesFromCsv() {
  const results = [];
  const existingGames = readExistingGamesData();
  const existingIds = new Set(existingGames.map(game => game.id));
  
  // 创建一个Promise来处理CSV解析
  return new Promise((resolve, reject) => {
    fs.createReadStream(CSV_FILE_PATH)
      .pipe(csv())
      .on('data', (data) => {
        const game = convertCsvToGameObject(data);
        results.push(game);
      })
      .on('end', () => {
        // 合并新旧游戏数据，避免重复
        const mergedGames = [...existingGames];
        
        results.forEach(newGame => {
          const existingIndex = mergedGames.findIndex(game => game.id === newGame.id);
          if (existingIndex >= 0) {
            // 更新现有游戏
            mergedGames[existingIndex] = { ...mergedGames[existingIndex], ...newGame };
            console.log(`更新游戏: ${newGame.title}`);
          } else {
            // 添加新游戏
            mergedGames.push(newGame);
            console.log(`添加新游戏: ${newGame.title}`);
          }
        });
        
        // 写入合并后的游戏数据
        writeGamesDataToFile(mergedGames);
        resolve(mergedGames);
      })
      .on('error', reject);
  });
}

// 检查CSV文件是否存在
if (!fs.existsSync(CSV_FILE_PATH)) {
  // 如果不存在，创建一个示例CSV文件
  const sampleCsvContent = `title,description,category,iframeUrl,thumbnailUrl,controls,tags,featured,dimensions,developer,publisher,releaseDate,rating,ratingCount,minFPS,targetFPS
Zombie Apocalypse,Survive the zombie apocalypse in this thrilling action game,action,https://example.com/games/zombie,/games/zombie.jpg,WASD to move Mouse to shoot,zombies action survival horror,true,1280x720,Zombie Studios,GamesDwell,2024-04-01,4.7,1200,30,60
Epic Fantasy RPG,Embark on an epic fantasy adventure,action,https://example.com/games/fantasy-rpg,/games/fantasy-rpg.jpg,Arrow keys to move Space to interact,rpg fantasy adventure,true,1024x768,Fantasy Games,GamesDwell,2024-04-05,4.8,950,30,60`;
  
  fs.writeFileSync(CSV_FILE_PATH, sampleCsvContent, 'utf8');
  console.log(`示例CSV文件已创建: ${CSV_FILE_PATH}`);
}

// 执行导入
importGamesFromCsv()
  .then(games => {
    console.log(`导入完成，共 ${games.length} 个游戏`);
  })
  .catch(error => {
    console.error('导入过程中出错:', error);
  }); 