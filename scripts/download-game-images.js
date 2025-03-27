const fs = require('fs');
const path = require('path');
const https = require('https');
const { gameCategories } = require('../src/data/gameCategories.ts');

const GAMES_DIR = path.join(__dirname, '../public/images/games');

// 确保目录存在
if (!fs.existsSync(GAMES_DIR)) {
  fs.mkdirSync(GAMES_DIR, { recursive: true });
}

// 下载图片的函数
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(fs.createWriteStream(filepath))
          .on('error', reject)
          .once('close', () => resolve(filepath));
      } else {
        response.resume();
        reject(new Error(`Request Failed With a Status Code: ${response.statusCode}`));
      }
    });
  });
}

// 主函数
async function main() {
  for (const category of gameCategories) {
    for (const game of category.games) {
      const gameId = game.id;
      const imageUrl = `https://img.cdn.famobi.com/portal/html5games/${gameId}/thumb_180.jpg`;
      const filepath = path.join(GAMES_DIR, `${gameId}.jpg`);

      try {
        console.log(`Downloading image for ${game.name}...`);
        await downloadImage(imageUrl, filepath);
        console.log(`Successfully downloaded image for ${game.name}`);
      } catch (error) {
        console.error(`Failed to download image for ${game.name}:`, error.message);
        // 如果下载失败，尝试备用 URL
        try {
          const fallbackUrl = `https://img.cdn.famobi.com/portal/html5games/${gameId}/teaser.jpg`;
          console.log(`Trying fallback URL for ${game.name}...`);
          await downloadImage(fallbackUrl, filepath);
          console.log(`Successfully downloaded fallback image for ${game.name}`);
        } catch (fallbackError) {
          console.error(`Failed to download fallback image for ${game.name}:`, fallbackError.message);
        }
      }
    }
  }
}

main().catch(console.error); 