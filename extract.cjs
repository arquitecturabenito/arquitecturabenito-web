const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

// 1. Extract defaultProjectsData
const projStart = html.indexOf('window.defaultProjectsData = [');
let projEnd = html.indexOf('];', projStart) + 2;
const projArrayStr = html.substring(projStart + 'window.defaultProjectsData = '.length, projEnd);

// Safely parse it (it's JS code, not strict JSON)
let projects = [];
try {
  projects = eval(projArrayStr);
} catch (e) {
  console.error("Failed to eval projects", e);
}

// 2. Extract escritosData
const escStart = html.indexOf('window.escritosData = [');
let escEnd = html.indexOf('];', escStart) + 2;
const escArrayStr = html.substring(escStart + 'window.escritosData = '.length, escEnd);

let escritos = [];
try {
  escritos = eval(escArrayStr);
} catch (e) {
  console.error("Failed to eval escritos", e);
}

// Create directories
if (!fs.existsSync('proyectos')) fs.mkdirSync('proyectos');
if (!fs.existsSync('textos')) fs.mkdirSync('textos');

// Write project files
let projScripts = '<script>window.defaultProjectsData = []; window.escritosData = [];</script>\n';
projScripts += '    <!-- PROYECTOS -->\n';
for (const p of projects) {
  const code = `window.defaultProjectsData.push(${JSON.stringify(p, null, 2)});\n`;
  fs.writeFileSync(`proyectos/${p.id}.js`, code);
  projScripts += `    <script src="/proyectos/${p.id}.js"></script>\n`;
}

// Write texto files
projScripts += '\n    <!-- TEXTOS -->\n';
for (const t of escritos) {
  const code = `window.escritosData.push(${JSON.stringify(t, null, 2)});\n`;
  fs.writeFileSync(`textos/${t.id}.js`, code);
  projScripts += `    <script src="/textos/${t.id}.js"></script>\n`;
}

// Now replace in index.html
let newHtml = html.replace(
  html.substring(projStart, projEnd),
  projScripts
);

// We need to also remove the window.escritosData = [...] block.
const escStartToReplace = newHtml.indexOf('window.escritosData = [');
if(escStartToReplace !== -1) {
  const escEndToReplace = newHtml.indexOf('];', escStartToReplace) + 2;
  newHtml = newHtml.replace(newHtml.substring(escStartToReplace, escEndToReplace), '/* Textos cargados desde /textos */');
}

fs.writeFileSync('index.html', newHtml);
console.log('Extraction complete. Files written.');
