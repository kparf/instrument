const puppeteer = require('puppeteer');

async function ssr(url) {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url, {waitUntil: 'networkidle0'});

  } catch (err) {
    throw new Error('page.goto/waitForSelector timed out.');
  }

  const body = await page.$eval('body', e => e.outerHTML);

  await browser.close();


  return body.toString();
}

module.exports = ssr;