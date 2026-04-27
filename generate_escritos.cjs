const fs = require('fs');

const oldModule = fs.readFileSync('EscritosModule.jsx', 'utf8');
const reactModule = fs.readFileSync('EscritosReact.jsx', 'utf8');
const newTexts = require('./newTexts.cjs');

// Extract escritosData string from 'const escritosData = [' up to the end of the array '];'
const startIdx = oldModule.indexOf('const escritosData = [');
let endIdx = oldModule.indexOf('];', startIdx) + 2;
const arrayStr = oldModule.slice(startIdx + 'const escritosData = '.length, endIdx);

// Parse the array safely by evaluating it
let parsedData = [];
try {
  parsedData = eval(arrayStr);
} catch (e) {
  console.error(e);
}

// Update existing items
parsedData.forEach(item => {
  item.category = 'critica';
  item.tags = ['crítica', 'arquitectura'];
});

// Append new texts
parsedData.push(...newTexts);

// We serialize the data manually or use JSON.stringify
// But JSON.stringify doesn't work well with backticks or raw strings unless we're careful.
// Actually, JSON stringify works perfectly and produces valid JS object notation!
const jsonString = JSON.stringify(parsedData, null, 2);

const finalContent = `
window.escritosData = ${jsonString};

${reactModule}
`;

fs.writeFileSync('EscritosPage.jsx', finalContent);
console.log('EscritosPage.jsx generated!');
