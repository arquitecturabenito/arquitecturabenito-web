const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  page.setViewport({ width: 1200, height: 800 });
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.innerText.toUpperCase().includes('CONSTEL'));
    if (btn) btn.click();
  });
  
  await new Promise(r => setTimeout(r, 4000));
  
  await page.screenshot({ path: 'screenshot_test3.png' });
  await browser.close();
})();
