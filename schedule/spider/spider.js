'use strict'
// const puppeteer = require('puppeteer-core');
const puppeteer = require('puppeteer');
const fs = require('fs/promises');
const path = require('path');
const dayjs = require('dayjs');
const gzh = require('../../constants/gongzhonghao.json');

async function mkdir(relPath) {
  const workDir = process.cwd();
  let newDir = '';
  for (const dir of relPath.split('/')) {
    newDir += (newDir ? '/' : '') + dir;
    try {
      await fs.mkdir(newDir);
    } catch (error) {
      console.log(error);
    }
  }
  return `${workDir}/${relPath}`;
}

async function spider() {
  const browser = await puppeteer.launch({
    // executablePath: path.resolve(__dirname, '../../../chrome-mac/Chromium.app/Contents/MacOS/Chromium'),
  });
  const page = await browser.newPage();
  page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36');
  try {
    const url = 'https://weixin.sogou.com/weixin?type=1&query=';
    const dir = await mkdir(`docs/${dayjs(new Date()).format('YYYY-MM-DD')}`);
    for (const item of gzh) {
      const { id, name } = item;
      await page.goto(`${url}${id}`);
      await page.waitForTimeout(3000);
      const linkHref = await page.$eval('.news-box ul li dl:nth-last-of-type(1) a', el => el.href);
      if (!linkHref) continue;
      await page.goto(linkHref);
      await page.waitForTimeout(3000);
      await page.waitForSelector('#activity-detail');
      await page.$eval('head', el => {
        const meta = document.createRange().createContextualFragment('<meta name="referrer" content="never">');
        el.appendChild(meta);
      });
      const tilte = await page.title();
      const contents = await page.content();
      await fs.writeFile(path.join(dir, `/[${name}] ${tilte}.html`), contents, 'utf-8');
      await page.waitForTimeout(2000);
    }
  } catch (error) {
    console.error(error);
  }
  await browser.close();
}

module.exports = spider;