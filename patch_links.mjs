import fs from 'fs';
let content = fs.readFileSync('src/main.jsx', 'utf8');
content = content.replace(
  'const projectLinks = relevantProjects.map((p) => ({',
  'const projectLinks = filteredRelevantProjects.map((p) => ({'
);
fs.writeFileSync('src/main.jsx', content);
