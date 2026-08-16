const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The top one is actually: `<script>\nwindow.defaultProjectsData = [];\n/* Textos ya cargados desde /textos */\n</script>` 
// because `remove_escritos.cjs` replaced `window.escritosData = [];` with `/* Textos ya cargados desde /textos */`.

// Let's restore the initialization at the top!
html = html.replace('window.defaultProjectsData = [];\n/* Textos ya cargados desde /textos */', 'window.defaultProjectsData = [];\nwindow.escritosData = [];');

// Now let's remove the BIG block further down!
const bigBlockStart = html.indexOf('window.escritosData = [\n  {');
if (bigBlockStart !== -1) {
  // we want to find the exact end of this block
  // It ends right before `        function getCategoryData()` or something? Let's just find the `];` that ends it.
  // Actually, let's search for `  }\n];`
  const bigBlockEndStr = '  }\n];';
  const bigBlockEnd = html.indexOf(bigBlockEndStr, bigBlockStart);
  if (bigBlockEnd !== -1) {
    html = html.substring(0, bigBlockStart) + html.substring(bigBlockEnd + bigBlockEndStr.length);
    console.log("Big block removed!");
  } else {
    console.log("Could not find end of big block");
  }
} else {
  console.log("Could not find start of big block");
}

fs.writeFileSync('index.html', html);
