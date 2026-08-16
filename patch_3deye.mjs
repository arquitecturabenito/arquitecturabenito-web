import fs from 'fs';
let content = fs.readFileSync('/app/applet/src/main.jsx', 'utf8');

const targetPupil = `            const pupilGeo = new THREE.SphereGeometry(4, 32, 32);
            const pupilMat = new THREE.MeshPhongMaterial({
              color: 0x00ffff,
            });`;

const replacePupil = `            const pupilGeo = new THREE.SphereGeometry(4, 32, 32);
            const pupilMat = new THREE.MeshPhongMaterial({
              color: filter === "design" ? 0xff0000 : 0x00ffff,
            });`;

content = content.replace(targetPupil, replacePupil);
fs.writeFileSync('/app/applet/src/main.jsx', content);
