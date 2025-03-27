const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { gameCategories } = require('../src/data/gameCategories.ts');

const GAMES_DIR = path.join(__dirname, '../public/images/games');

// 确保目录存在
if (!fs.existsSync(GAMES_DIR)) {
  fs.mkdirSync(GAMES_DIR, { recursive: true });
}

async function captureGameScreenshot(page, game) {
  const gameUrl = game.url;
  const filepath = path.join(GAMES_DIR, `${game.id}.jpg`);

  try {
    console.log(`Capturing screenshot for ${game.name}...`);
    
    // 访问游戏页面
    await page.goto(gameUrl, { waitUntil: 'networkidle0', timeout: 60000 });
    
    // 等待游戏加载
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // 截取游戏画面
    await page.screenshot({
      path: filepath,
      type: 'jpeg',
      quality: 80,
      clip: {
        x: 0,
        y: 0,
        width: 800,
        height: 600
      }
    });
    
    console.log(`Successfully captured screenshot for ${game.name}`);
  } catch (error) {
    console.error(`Failed to capture screenshot for ${game.name}:`, error.message);
  }
}

async function main() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // 设置视口大小
    await page.setViewport({
      width: 800,
      height: 600
    });
    
    // 遍历所有游戏
    for (const category of gameCategories) {
      for (const game of category.games) {
        await captureGameScreenshot(page, game);
      }
    }
  } finally {
    await browser.close();
  }
}

main().catch(console.error); 