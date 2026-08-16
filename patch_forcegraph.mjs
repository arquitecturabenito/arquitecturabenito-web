import fs from 'fs';
let content = fs.readFileSync('/app/applet/src/main.jsx', 'utf8');

const targetForce = `        linkDirectionalParticles={(link) => highlightLinks.has(link) ? 4 : 0}
        linkDirectionalParticleWidth={2}
        linkDirectionalParticleSpeed={0.01}`;

const replaceForce = `        linkDirectionalParticles={0}
        warmupTicks={30}
        cooldownTicks={100}`;

content = content.replace(targetForce, replaceForce);

fs.writeFileSync('/app/applet/src/main.jsx', content);
