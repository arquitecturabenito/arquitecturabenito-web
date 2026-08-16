import fs from 'fs';
let content = fs.readFileSync('/app/applet/src/main.jsx', 'utf8');

const target1 = `          <OrbitalPage
            category="architecture"
            title="ARQUITECTURA"
            onProjectSelect={handleProjectSelect}
            onSubcategorySelect={handleSubcategorySelect}
            onProjectHover={handleProjectHover}
            showEye={true}
          />`;
const replace1 = `          <OrbitalPage
            category="architecture"
            title="ARQUITECTURA"
            onProjectSelect={handleProjectSelect}
            onSubcategorySelect={handleSubcategorySelect}
            onProjectHover={handleProjectHover}
            showEye={true}
            highlightNodeId={highlightNodeId}
          />`;
content = content.replace(target1, replace1);

const target2 = `          <OrbitalPage
            category="design"
            title="DISEÑO"
            onProjectSelect={handleProjectSelect}
            onSubcategorySelect={handleSubcategorySelect}
            onProjectHover={handleProjectHover}
            showEye={true}
          />`;
const replace2 = `          <OrbitalPage
            category="design"
            title="DISEÑO"
            onProjectSelect={handleProjectSelect}
            onSubcategorySelect={handleSubcategorySelect}
            onProjectHover={handleProjectHover}
            showEye={true}
            highlightNodeId={highlightNodeId}
          />`;
content = content.replace(target2, replace2);

const target3 = `          <OrbitalPage
            category="escenografias"
            title="ESCENOGRAFÍAS"
            onProjectSelect={handleProjectSelect}
            onSubcategorySelect={handleSubcategorySelect}
            onProjectHover={handleProjectHover}
            showEye={true}
          />`;
const replace3 = `          <OrbitalPage
            category="escenografias"
            title="ESCENOGRAFÍAS"
            onProjectSelect={handleProjectSelect}
            onSubcategorySelect={handleSubcategorySelect}
            onProjectHover={handleProjectHover}
            showEye={true}
            highlightNodeId={highlightNodeId}
          />`;
content = content.replace(target3, replace3);

const target4 = `          <OrbitalPage
            category={category}
            subcategory={view.subcategory}
            title={view.subcategory}
            onProjectSelect={handleProjectSelect}
            onProjectHover={handleProjectHover}
            showEye={true}
          />`;
const replace4 = `          <OrbitalPage
            category={category}
            subcategory={view.subcategory}
            title={view.subcategory}
            onProjectSelect={handleProjectSelect}
            onProjectHover={handleProjectHover}
            showEye={true}
            highlightNodeId={highlightNodeId}
          />`;
content = content.replace(target4, replace4);

fs.writeFileSync('/app/applet/src/main.jsx', content);
