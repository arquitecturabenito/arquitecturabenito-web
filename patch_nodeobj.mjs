import fs from 'fs';
let content = fs.readFileSync('/app/applet/src/main.jsx', 'utf8');

const targetNodeThreeObject = `        nodeThreeObject={(node) => {`;

const replaceNodeThreeObject = `        nodeThreeObject={React.useCallback((node) => {`;

content = content.replace(targetNodeThreeObject, replaceNodeThreeObject);

const targetNodeThreeObjectEnd = `          return group;
        }}
        linkWidth={(link) => highlightLinks.has(link) ? 3 : (link.value === 1 ? 2.5 : link.value === 2 ? 1.5 : 0.8)}`;

const replaceNodeThreeObjectEnd = `          return group;
        }, [filter])}
        linkWidth={React.useCallback((link) => highlightLinks.has(link) ? 3 : (link.value === 1 ? 2.5 : link.value === 2 ? 1.5 : 0.8), [highlightLinks])}`;

content = content.replace(targetNodeThreeObjectEnd, replaceNodeThreeObjectEnd);

fs.writeFileSync('/app/applet/src/main.jsx', content);
