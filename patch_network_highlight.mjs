import fs from 'fs';
let content = fs.readFileSync('/app/applet/src/main.jsx', 'utf8');

const targetObj = `          const nodeGeo = new THREE.SphereGeometry(radius, 16, 16);
          const nodeMat = new THREE.MeshBasicMaterial({
            color: color,
            wireframe: true,
            transparent: true,
            opacity: 0.5,
          });
          group.add(new THREE.Mesh(nodeGeo, nodeMat));

          const sprite = new SpriteText(node.id);
          sprite.color = textColor;
          sprite.textHeight = textHeight;
          sprite.position.y = radius + 2;
          group.add(sprite);

          return group;
        }}`;

const replaceObj = `          const nodeGeo = new THREE.SphereGeometry(radius, 16, 16);
          const nodeMat = new THREE.MeshBasicMaterial({
            color: color,
            wireframe: true,
            transparent: true,
            opacity: 0.5,
          });
          const mesh = new THREE.Mesh(nodeGeo, nodeMat);
          group.add(mesh);

          const sprite = new SpriteText(node.id);
          sprite.color = textColor;
          sprite.textHeight = textHeight;
          sprite.position.y = radius + 2;
          group.add(sprite);
          
          node.__baseRadius = radius;
          node.__baseColor = color;
          node.__baseTextColor = textColor;
          node.__baseTextHeight = textHeight;
          node.__nodeMat = nodeMat;
          node.__sprite = sprite;
          node.__mesh = mesh;

          return group;
        }}`;

content = content.replace(targetObj, replaceObj);

fs.writeFileSync('/app/applet/src/main.jsx', content);
