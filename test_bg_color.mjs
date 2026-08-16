import fs from 'fs';
let content = fs.readFileSync('src/main.jsx', 'utf8');

const m = content.match(/let bgColor = "#000"; \/\/ default dark[\s\S]*?if \([^\{]*\) \{/m);
console.log(m ? m[0] : "NOT FOUND");
