const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') console.log('ERROR:', msg.text());
  });
  page.on('pageerror', err => {
    console.log('PAGE ERROR:', err.message);
  });
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  
  // click constelación
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.innerText.toUpperCase().includes('CONSTEL'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 2000));
  
  // click ARQUITECTURA node if possible, or another button
  await page.evaluate(() => {
    // we can try clicking the "ARQUITECTURA" button if it's there
    // wait, we can't easily click a 3D node
    // Let's toggle gallery mode or use navigation to click ARQUITECTURA
  });
  
  await browser.close();
})();
