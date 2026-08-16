import fs from 'fs';
let content = fs.readFileSync('src/main.jsx', 'utf8');

const targetRender = `{
        [
          "home",
          "architecture",
          "design",
          "scenography",
          "subcategory",
        ].includes(view.page) && (
          <FilterControls
            currentFilter={filter}
            currentSubcategory={
              view.page === "subcategory" ? view.subcategory : null
            }
            onFilterChange={handleFilterChange}
          />
        )}`;

const replaceRender = `{
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

// I noticed the original block might have `contact` missing in the includes list for FilterControls or maybe not. 
// Let's use string replace carefully.
