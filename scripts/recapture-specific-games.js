const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { gameCategories } = require('../src/data/gameCategories.ts');

const GAMES_DIR = path.join(__dirname, '../public/images/games');

// Ensure directory exists
if (!fs.existsSync(GAMES_DIR)) {
  fs.mkdirSync(GAMES_DIR, { recursive: true });
}

// List of games that need new screenshots
const GAMES_TO_RECAPTURE = [
  'giant-rush',
  'western-sniper',
  'color-roll-3d',
  '3d-free-kick',
  'street-hoops-3d',
  'table-tennis-world-tour',
  'billiard-blitz-challenge',
  'penalty-shootout-multi-league',
  'soccer-heads',
  'go-escape',
  'go-around',
  'gun-spin',
  'giant-attack',
  'crazy-hen-level'
];

// Find game object, return game and its category
function findGame(gameId) {
  for (const category of gameCategories) {
    const game = category.games.find(g => g.id === gameId);
    if (game) {
      return { game, category };
    }
  }
  return null;
}

async function captureGameScreenshot(page, game) {
  const gameUrl = game.url;
  const filepath = path.join(GAMES_DIR, `${game.id}.jpg`);

  try {
    console.log(`Capturing screenshot for ${game.name}...`);
    
    // Navigate to game page
    await page.goto(gameUrl, { waitUntil: 'networkidle2', timeout: 60000 });
    
    // Wait for game to load - increase wait time for better screenshots
    await new Promise(resolve => setTimeout(resolve, 8000));
    
    // Set viewport for better image quality
    await page.setViewport({
      width: 1280,
      height: 800,
      deviceScaleFactor: 1.5  // Increase clarity
    });
    
    // Try to find and click play button if it exists
    try {
      const playButton = await page.$('.start-button') || 
                          await page.$('.play-button') || 
                          await page.$('button:not([disabled])');
      if (playButton) {
        await playButton.click();
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    } catch (e) {
      console.log(`No play button found for ${game.name}`);
    }
    
    // Find proper game element with content
    let gameContent = await page.$('.game-content') || 
                       await page.$('#game-container') || 
                       await page.$('iframe') || 
                       page;
    
    // Try to handle iframe content if present
    const frames = await page.frames();
    if (frames.length > 1) {
      const gameFrame = frames.find(frame => 
        frame.url().includes('game') || 
        frame.url().includes('play')
      );
      
      if (gameFrame) {
        try {
          await gameFrame.waitForSelector('canvas', { timeout: 3000 });
          // Screenshot will capture the entire page including the iframe
        } catch (e) {
          console.log(`No canvas found in iframe for ${game.name}`);
        }
      }
    }
    
    // Take screenshot
    await page.screenshot({
      path: filepath,
      type: 'jpeg',
      quality: 90,  // Higher quality
      fullPage: false,
      clip: {
        x: 0,
        y: 0,
        width: 1280,
        height: 800
      }
    });
    
    console.log(`Successfully captured screenshot for ${game.name}`);
    return true;
  } catch (error) {
    console.error(`Failed to capture screenshot for ${game.name}:`, error.message);
    return false;
  }
}

async function main() {
  const browser = await puppeteer.launch({
    headless: 'new',  // Use new headless mode
    args: [
      '--no-sandbox', 
      '--disable-setuid-sandbox', 
      '--window-size=1280,800',
      '--disable-web-security'  // Helps with some cross-origin issues
    ]
  });
  
  try {
    const page = await browser.newPage();
    
    // Set user agent to appear as a regular browser
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    // Enable JavaScript on page
    await page.setJavaScriptEnabled(true);
    
    // Block unnecessary resources for faster loading
    await page.setRequestInterception(true);
    page.on('request', request => {
      const resourceType = request.resourceType();
      if (['image', 'stylesheet', 'font', 'media'].includes(resourceType)) {
        request.continue();
      } else if (resourceType === 'script') {
        request.continue();
      } else {
        request.continue();
      }
    });
    
    let successCount = 0;
    let failCount = 0;
    
    // Capture screenshots for each game
    for (const gameId of GAMES_TO_RECAPTURE) {
      const found = findGame(gameId);
      
      if (found) {
        const success = await captureGameScreenshot(page, found.game);
        if (success) {
          successCount++;
        } else {
          failCount++;
        }
      } else {
        console.warn(`Game with ID ${gameId} was not found in the database.`);
        failCount++;
      }
    }
    
    console.log(`\nRecapture complete: ${successCount} successful, ${failCount} failed.`);
  } finally {
    await browser.close();
  }
}

main().catch(console.error); 