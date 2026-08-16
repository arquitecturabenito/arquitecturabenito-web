import fs from 'fs';
let content = fs.readFileSync('/app/applet/src/main.jsx', 'utf8');

const targetSection = `            </CVSection>
            <CVSection title="Formación y Cursos">`;

const replaceSection = `            </CVSection>
          </div>
          <div>
            <CVSection title="Formación y Cursos">`;

content = content.replace(targetSection, replaceSection);

const targetEndSection = `            </CVSection>
          </div>
          <div>
            <CVSection title="Publicaciones">`;

const replaceEndSection = `            </CVSection>
            <CVSection title="Publicaciones">`;

content = content.replace(targetEndSection, replaceEndSection);

fs.writeFileSync('/app/applet/src/main.jsx', content);
