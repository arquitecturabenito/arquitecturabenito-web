import fs from 'fs';
let content = fs.readFileSync('src/main.jsx', 'utf8');

const filterMatch = `      {
        [
          "home",
          "architecture",
          "design",
          "scenography",
          "subcategory",
          "contact",
        ].includes(view.page) && (
          <FilterControls
            currentFilter={filter}
            currentSubcategory={
              view.page === "subcategory" ? view.subcategory : null
            }
            onFilterChange={handleFilterChange}
          />
        )}`;

const newRender = `      {
        [
          "home",
          "architecture",
          "design",
          "scenography",
          "subcategory",
          "contact",
        ].includes(view.page) && (
          <FilterControls
            currentFilter={filter}
            currentSubcategory={
              view.page === "subcategory" ? view.subcategory : null
            }
            onFilterChange={handleFilterChange}
          />
        )}
      {
        !isGalleryMode && [
          "home",
          "architecture",
          "design",
          "scenography",
          "subcategory",
        ].includes(view.page) && (
          <ConstellationSidebars 
            currentFilter={filter} 
            onProjectSelect={handleProjectSelect} 
          />
        )}`;

content = content.replace(filterMatch, newRender);
fs.writeFileSync('src/main.jsx', content);
