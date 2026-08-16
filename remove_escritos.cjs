const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const escStart = html.indexOf('window.escritosData = [');
if (escStart !== -1) {
  let escEnd = html.indexOf('];', escStart);
  if (escEnd !== -1) {
    // Remove from window.escritosData = [ to ];
    html = html.substring(0, escStart) + '/* Textos ya cargados desde /textos */\n' + html.substring(escEnd + 2);
    fs.writeFileSync('index.html', html);
    console.log("Removed window.escritosData");
  } else {
    console.log("Could not find end of escritosData array");
  }
} else {
  console.log("Could not find window.escritosData");
}
