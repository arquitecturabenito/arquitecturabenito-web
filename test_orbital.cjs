const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') console.log('ERROR:', msg.text());
  });
  page.on('pageerror', err => {
    console.log('PAGE ERROR:', err.message);
    console.log('STACK:', err.stack);
  });
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  
  // click GALERÍA
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.innerText.toUpperCase().includes('GALER'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  // Then click "MODO CONSTELACIÓN" to switch? Or we are in gallery mode, just click "ARQUITECTURA" tab
  await page.evaluate(() => {
    const tabs = Array.from(document.querySelectorAll('button, div')).filter(b => b.innerText === 'ARQUITECTURA');
    if (tabs.length > 0) tabs[0].click();
  });
  
  await new Promise(r => setTimeout(r, 1000));
  
  // click "MODO CONSTELACIÓN" to load OrbitalPage?
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.innerText.toUpperCase().includes('CONSTELAC'));
    if (btn) btn.click();
  });
  
  await new Promise(r => setTimeout(r, 2000));
  
  await browser.close();
})();
