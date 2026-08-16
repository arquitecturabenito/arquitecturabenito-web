const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  await page.evaluateOnNewDocument(() => {
    window.addEventListener('error', e => {
      console.log('WINDOW ERROR:', e.error ? e.error.stack : e.message);
    });
    window.addEventListener('unhandledrejection', e => {
      console.log('UNHANDLED REJECTION:', e.reason ? e.reason.stack : e.reason);
    });
  });
  
  page.on('console', msg => {
    console.log('CONSOLE:', msg.text());
  });
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  
  // Click CONSTELACIÓN
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.innerText.toUpperCase().includes('CONSTEL'));
    if (btn) btn.click();
  });
  
  await new Promise(r => setTimeout(r, 3000));
  
  await browser.close();
})();
