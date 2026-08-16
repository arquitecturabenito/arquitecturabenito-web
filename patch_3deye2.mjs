import fs from 'fs';
let content = fs.readFileSync('/app/applet/src/main.jsx', 'utf8');

const targetMidMat = `            const midMat = new THREE.MeshPhongMaterial({
              color: 0x00ffff,
              transparent: true,
              opacity: 0.25,
            });`;

const replaceMidMat = `            const midMat = new THREE.MeshPhongMaterial({
              color: filter === "design" ? 0xff0000 : 0x00ffff,
              transparent: true,
              opacity: 0.25,
            });`;

content = content.replace(targetMidMat, replaceMidMat);
fs.writeFileSync('/app/applet/src/main.jsx', content);
