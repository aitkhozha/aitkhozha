import { chromium } from 'playwright-core';
import { resolve } from 'path';
import { readdirSync, renameSync, rmSync } from 'fs';

const htmlPath = resolve('quran-animation.html');
const videoDir = resolve('video-tmp');

rmSync(videoDir, { recursive: true, force: true });

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--no-sandbox', '--disable-gpu'],
});

const context = await browser.newContext({
  viewport: { width: 1080, height: 1920 },
  recordVideo: {
    dir: videoDir,
    size: { width: 1080, height: 1920 },
  },
});

const page = await context.newPage();
await page.goto(`file://${htmlPath}`, { waitUntil: 'load', timeout: 60000 });

// Wait for fonts to load
await page.waitForTimeout(2000);

// Reload to restart animation cleanly with fonts loaded
await page.reload({ waitUntil: 'load', timeout: 60000 });

console.log('Recording animation...');

// Wait for full animation: 800ms delay + 3 * 4000ms + 2s extra
await page.waitForTimeout(16000);

// Close to finalize video
await context.close();
await browser.close();

// Find and rename the video
const files = readdirSync(videoDir).filter(f => f.endsWith('.webm'));
if (files.length > 0) {
  renameSync(resolve(videoDir, files[0]), resolve('quran-animation.webm'));
  rmSync(videoDir, { recursive: true, force: true });
  console.log('Done! Video saved: quran-animation.webm');
  console.log('Full path: ' + resolve('quran-animation.webm'));
} else {
  console.log('No video file found');
}
