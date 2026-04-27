const EscritosPage = ({ onEscritoSelect }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedTags, setSelectedTags] = React.useState([]);

  // Default tags per category
  window.escritosData.forEach(e => {
    if(!e.tags) e.tags = ['arquitectura', 'crítica'];
    if(!e.category) e.category = 'critica';
  });

  const allTags = Array.from(new Set(window.escritosData.flatMap(e => e.tags))).sort();

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const filteredData = window.escritosData.filter(item => {
    const term = searchTerm.toLowerCase();
    const matchSearch = item.title.toLowerCase().includes(term) || item.summary.toLowerCase().includes(term);
    const matchTags = selectedTags.length === 0 || selectedTags.every(tag => item.tags.includes(tag));
    return matchSearch && matchTags;
  });

  const categories = [
    { id: 'critica', title: "Crítica Arquitectónica", items: filteredData.filter(i => i.category === 'critica') },
    { id: 'ensayo', title: "Ensayos Propios", items: filteredData.filter(i => i.category === 'ensayo') },
    { id: 'historia', title: "Historia de la Arquitectura", items: filteredData.filter(i => i.category === 'historia') }
  ];

  return (
    <div className="w-full min-h-screen pt-24 pb-20 bg-[#f5f5f0] text-[#111111] border-x border-dashed border-[#b0b0a8] relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(176,176,168,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(176,176,168,0.2)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-8 font-sans relative z-10">
        
        <header className="mt-16 mb-12 sm:mt-8 sm:mb-20 text-center sm:text-left sm:pl-20 border-b-2 border-[#111111] pb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 uppercase">
            Escritos y <span className="italic font-light">Publicaciones</span>
          </h1>
          <p className="text-lg text-[#444444] max-w-2xl font-mono text-sm uppercase tracking-widest">
            Repositorio de textos, ensayos y reflexiones críticas sobre la arquitectura, la ciudad y el diseño.
          </p>
        </header>

        <div className="mb-12 space-y-6">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Buscar escritos..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full p-4 pl-12 bg-white/50 border border-[#111111] focus:outline-none focus:bg-white transition-colors font-serif text-lg"
            />
            <svg className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-[#111111]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button 
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 text-xs font-mono tracking-widest uppercase border border-[#111111] transition-colors ${selectedTags.includes(tag) ? 'bg-[#111111] text-white' : 'bg-transparent text-[#111111] hover:bg-[#111111]/10'}`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-20">
          {categories.filter(c => c.items.length > 0).map((category) => (
            <section key={category.id}>
              <div className="flex items-center mb-8">
                  <h2 className="text-sm font-mono tracking-[0.2em] text-[#111111] uppercase px-4 py-2 border border-[#111111] rounded-none inline-block bg-white/50 backdrop-blur-sm shadow-[2px_2px_0_0_#111111]">
                    {category.title}
                  </h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#111111] to-transparent ml-6"></div>
              </div>
              
              <div className="flex flex-col border-t border-[#111111]">
                {category.items.map((item) => (
                  <article key={item.id} onClick={() => onEscritoSelect(item.id)} className="group relative border-b border-[#111111] flex flex-col py-8 cursor-pointer hover:bg-white/80 backdrop-blur-sm transition-colors duration-300 px-4 -mx-4 sm:px-6 sm:-mx-6">
                      <div className="flex flex-col sm:flex-row sm:items-start w-full">
                        <div className="sm:w-32 shrink-0 mb-4 sm:mb-0 pt-1">
                            <span className="text-xs font-mono text-[#666666] tracking-widest bg-[#111111] text-[#f5f5f0] px-2 py-1">
                              {item.date}
                            </span>
                        </div>
                        <div className="flex-1 pr-6">
                          <h3 className="text-2xl sm:text-3xl font-medium mb-3 group-hover:italic transition-all duration-300 leading-tight">
                            {item.title}
                          </h3>
                          <p className="text-[#555555] font-serif text-lg leading-relaxed mb-4">
                            {item.summary}
                          </p>
                          <div className="flex flex-wrap gap-2">
                             {item.tags.map(t => (
                               <span key={t} className="text-[10px] font-mono tracking-widest uppercase text-[#888888]">#{t}</span>
                             ))}
                          </div>
                        </div>
                        <div className="self-center ml-4 transition-transform duration-300 hidden sm:block">
                          <div className="w-12 h-12 rounded-full border border-[#111111] flex items-center justify-center transform transition-transform group-hover:scale-110 text-[#111111]">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7"/></svg>
                          </div>
                        </div>
                      </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
          {filteredData.length === 0 && (
            <div className="py-12 text-center text-[#666666] font-mono uppercase tracking-widest text-sm">
               No se encontraron escritos que coincidan con la búsqueda.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const EscritoDetailPage = ({ escrito, onBack }) => {
  if (!escrito) return null;
  
  const paragraphs = escrito.text.split('\n').filter(p => p.trim() !== '');

  return (
    <div className="w-full min-h-screen pt-24 pb-20 bg-[#f5f5f0] text-[#111111] border-x border-dashed border-[#b0b0a8] relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(176,176,168,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(176,176,168,0.2)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-8 font-sans relative z-10">
        
        <header className="mb-16 border-b-2 border-[#111111] pb-12 mt-16 sm:mt-8 sm:pl-20">
          <span className="text-xs font-mono text-[#666666] tracking-widest uppercase mb-4 block">
              {escrito.date}
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight uppercase relative inline-block">
              {escrito.title}
          </h1>
          <p className="text-xl text-[#555555] font-serif italic max-w-3xl leading-relaxed mb-6">
              {escrito.summary}
          </p>
          <div className="flex flex-wrap gap-2">
             {escrito.tags && escrito.tags.map(t => (
               <span key={t} className="px-2 py-1 text-[10px] font-mono tracking-widest uppercase border border-[#dddddd] text-[#666666]">#{t}</span>
             ))}
          </div>
        </header>

        <article className="prose prose-lg max-w-none text-[#333333] font-serif leading-loose mb-20 prose-headings:font-sans prose-headings:text-[#111111] selection:bg-[#111111] selection:text-white">
          {paragraphs.map((p, idx) => {
             if (p.toUpperCase() === p && p.length > 5) {
                 return <h3 key={idx} className="text-2xl font-sans font-bold uppercase mt-12 mb-6 tracking-widest">{p}</h3>;
             }
             if (p.match(/^\d+\./)) {
                 return <h4 key={idx} className="text-xl font-sans font-bold mt-8 mb-4">{p}</h4>;
             }
             return <p key={idx} className="mb-6">{p}</p>;
          })}
        </article>

        {escrito.images && escrito.images.length > 0 && (
          <div className="mt-16 border-t-2 border-[#111111] pt-16">
            <h3 className="text-sm font-mono tracking-widest text-[#111111] uppercase mb-8">Documentación Visual</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {escrito.images.map((imgSrc, imgIdx) => (
                <figure key={imgIdx} className="group relative">
                  <div className="bg-[#ebebe6] border-2 border-[#111111] p-4 relative transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-[8px_8px_0_0_#111111]">
                     <img 
                         src={imgSrc} 
                         alt={`${escrito.title} - imagen ${imgIdx + 1}`} 
                         className="w-full h-auto object-contain mix-blend-multiply" 
                         loading="lazy" 
                     />
                     <div className="absolute inset-0 border-2 border-transparent transition-colors duration-300 group-hover:border-[#111111]/10 pointer-events-none"></div>
                  </div>
                </figure>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

window.EscritosPage = EscritosPage;
window.EscritoDetailPage = EscritoDetailPage;
