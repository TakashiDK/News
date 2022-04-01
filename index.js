const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://noticias.uol.com.br/ultimas/');

  const imgList = await page.evaluate(() => {
  const nodeList = document.querySelectorAll('row img')
  const imgArray = [...nodeList]
  const imgList = imgArray.map( ({src}) => ({
    src
  }))
  return imgList
});
fs.writeFile('news.json', JSON.stringify(imgList, null, 2), err => {
  if(err) throw new Error('Something went wrong!')
  console.log('Well done!')
})
  await browser.close();
})();