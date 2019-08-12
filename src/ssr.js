const puppeteer = require('puppeteer');

async function ssr(url) {

  console.log('ssr start');

  const start = Date.now();

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url, {waitUntil: 'networkidle0'});

  } catch (err) {
    throw new Error('page.goto/waitForSelector timed out.');
  }

  const html = await page.content(); 
  await browser.close();

  const ttRenderMs = Date.now() - start;
  console.info(`Headless rendered page in: ${ttRenderMs}ms`);

  console.log('ssr end');

  return { html, ttRenderMs };
}

module.exports = ssr;