import React from "react";
import ReactDOM from "react-dom/client";
import ForceGraph3D from 'react-force-graph-3d';
import SpriteText from 'three-spritetext';
import * as THREE from 'three';
import * as d3 from 'd3';

// ==========================================
// PERFORMANCE & MEDIA OPTIMIZATION ENGINE
// ==========================================

const OptimizedImage = ({
  src,
  alt = "",
  className = "",
  style = {},
  loading = "lazy",
  decoding = "async",
  onClick,
  fallbackSrc,
  containerClassName = "",
  theme = "dark",
}) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const [currentSrc, setCurrentSrc] = React.useState(src);

  React.useEffect(() => {
    setCurrentSrc(src);
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  // Construct WebP candidate if current src is png/jpg/jpeg
  const webpCandidate = React.useMemo(() => {
    if (!src || typeof src !== "string") return null;
    if (src.endsWith(".png") || src.endsWith(".jpg") || src.endsWith(".jpeg")) {
      return src.replace(/\.(png|jpg|jpeg)$/i, ".webp");
    }
    return null;
  }, [src]);

  const handleError = () => {
    if (webpCandidate && currentSrc === webpCandidate) {
      // Fallback to original format
      setCurrentSrc(src);
    } else if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setHasError(true);
      setIsLoaded(true);
    }
  };

  const isLight = theme === "light";
  const isDesign = theme === "design";

  return (
    <div
      className={`relative overflow-hidden flex items-center justify-center ${containerClassName}`}
      onClick={onClick}
    >
      {/* Loading Skeleton Shimmer */}
      {!isLoaded && !hasError && (
        <div
          className={`absolute inset-0 z-10 flex flex-col items-center justify-center transition-opacity duration-300 ${
            isLight
              ? "bg-[#e2e2dc] text-gray-400"
              : isDesign
              ? "bg-blue-950/60 text-[#ffcc00]"
              : "bg-gray-900/80 text-cyan-400/60"
          }`}
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div
              className={`w-6 h-6 border rounded-full ${
                isLight
                  ? "border-gray-400 border-t-transparent"
                  : isDesign
                  ? "border-[#ffcc00] border-t-transparent"
                  : "border-cyan-400 border-t-transparent"
              } animate-spin`}
            />
          </div>
          <span className="text-[8px] font-mono tracking-widest uppercase mt-2 opacity-60">
            Cargando
          </span>
        </div>
      )}

      {/* Fallback / Error State */}
      {hasError ? (
        <div
          className={`w-full h-full min-h-[120px] flex flex-col items-center justify-center p-4 border border-dashed ${
            isLight
              ? "border-gray-300 bg-gray-100 text-gray-500"
              : "border-gray-800 bg-gray-950/80 text-gray-400"
          } font-mono text-[9px] text-center`}
        >
          <svg
            className="w-5 h-5 mb-1.5 opacity-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="uppercase tracking-wider truncate max-w-full">{alt || "Visual"}</span>
        </div>
      ) : (
        <picture className="w-full h-full flex items-center justify-center">
          {webpCandidate && (
            <source srcSet={webpCandidate} type="image/webp" />
          )}
          <img
            src={currentSrc}
            alt={alt}
            loading={loading}
            decoding={decoding}
            onLoad={() => setIsLoaded(true)}
            onError={handleError}
            className={`${className} transition-opacity duration-500 ease-out ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={style}
          />
        </picture>
      )}
    </div>
    
  );
};


// Contexto de Idioma
const LanguageContext = React.createContext({ lang: "es", setLang: () => {} });

const useTranslation = (overrideLang) => {
  const context = React.useContext(LanguageContext);
  const lang = overrideLang || context.lang;
  
  const translations = {
    es: {
      "ARQUITECTURA": "ARQUITECTURA",
      "DISEÑO": "DISEÑO",
      "ESCENOGRAFÍAS": "ESCENOGRAFÍAS",
      "CONTACTO": "CONTACTO",
      "TEXTOS": "TEXTOS",
      "PROYECTOS": "PROYECTOS",
      "Volver al Menú Principal": "Volver al Menú Principal",
      "Volver": "Volver",
      "Próximo Proyecto": "Próximo Proyecto",
      "Ver Galería": "Ver Galería",
      "Prev": "Ant",
      "Siguiente": "Sig",
      "INICIANDO CONSTELACIÓN 3D...": "INICIANDO CONSTELACIÓN 3D...",
      "CALCULANDO ÓRBITAS Y NODOS...": "CALCULANDO ÓRBITAS Y NODOS...",
      "OPTIMIZANDO TEXTURAS Y FORMATO WEBP...": "OPTIMIZANDO TEXTURAS Y FORMATO WEBP...",
      "SISTEMA VECTORIAL LISTO": "SISTEMA VECTORIAL LISTO",
      "Introducción": "Introducción",
      "Foocus": "Foocus",
      "Comfy UI": "Comfy UI",
      "Web UI": "Web UI",
      "Galería de Carteles": "Galería de Carteles",
      "Documentación Visual": "Documentación Visual",
      "Explorar Proyectos": "Explorar Proyectos",
      "Probar suerte": "Probar suerte",
      "Constelación": "Constelación",
      "Galería": "Galería",
      "Visualización clásica en parrilla": "Visualización clásica en parrilla",
      "TODOS": "TODOS",
      "Todos los proyectos": "TODOS",
      "Todos": "TODOS"
    },
    en: {
      "ARQUITECTURA": "ARCHITECTURE",
      "DISEÑO": "DESIGN",
      "ESCENOGRAFÍAS": "SCENOGRAPHY",
      "CONTACTO": "CONTACT",
      "TEXTOS": "TEXTS",
      "PROYECTOS": "PROJECTS",
      "Volver al Menú Principal": "Back to Main Menu",
      "Volver": "Back",
      "Próximo Proyecto": "Next Project",
      "Ver Galería": "View Gallery",
      "Prev": "Prev",
      "Siguiente": "Next",
      "INICIANDO CONSTELACIÓN 3D...": "INITIALIZING 3D CONSTELLATION...",
      "CALCULANDO ÓRBITAS Y NODOS...": "CALCULATING ORBITS AND NODES...",
      "OPTIMIZANDO TEXTURAS Y FORMATO WEBP...": "OPTIMIZING TEXTURES AND WEBP FORMAT...",
      "SISTEMA VECTORIAL LISTO": "VECTOR SYSTEM READY",
      "Introducción": "Introduction",
      "Foocus": "Foocus",
      "Comfy UI": "Comfy UI",
      "Web UI": "Web UI",
      "Galería de Carteles": "Poster Gallery",
      "Documentación Visual": "Visual Documentation",
      "Explorar Proyectos": "Explore Projects",
      "TODOS": "ALL",
      "Todos los proyectos": "ALL",
      "Todos": "ALL",
      "GRITAR LO PÚBLICO": "SHOUT THE PUBLIC",
      "ANEXO AEMET": "AEMET ANNEX",
      "HASHIMA ANIMAL PARK": "HASHIMA ANIMAL PARK",
      "PASEO DE LA DEHESA": "DEHESA PROMENADE",
      "REHABILITACIÓN EL ESCORIAL": "EL ESCORIAL REHABILITATION",
      "RENDERIZADO IA": "AI RENDERING",
      "COLECCIÓN DE CURVAS": "CURVES COLLECTION",
      "ÁRBOLES Y TELAS": "TREES AND FABRICS",
      "PRATO FOOD CITY": "PRATO FOOD CITY",
      "TERRITORIOS DIGITALES": "DIGITAL TERRITORIES",
      "CARTELERÍA": "POSTERS",
      "GENERACIÓN IA": "AI GENERATION",
      "DISEÑO WEB": "WEB DESIGN",
      "LÁMPARA ONEIROS": "ONEIROS LAMP",
      "ESTUCHE": "PENCIL CASE",
      "LÁMPARA NATURAL": "NATURAL LAMP",
      "JUEGO DE MESA": "BOARD GAME",
      "CMFX WALKMAN": "CMFX WALKMAN",
      "COLECCIÓN DE GRABADOS": "ENGRAVINGS COLLECTION",
      "PROTO-TAB": "PROTO-TAB",
      "ARCHIGLOSS": "ARCHIGLOSS",
      "PORTA-VINILOS": "VINYL HOLDER",
      "FESTA NA TERRA": "FESTA NA TERRA",
      "CRONOLOGÍA DEL ADIÓS": "CHRONOLOGY OF GOODBYE",
      "Textos de Arquitectura": "Architecture Texts",
      "Portfolio": "Portfolio"

    }
  };

  const t = (key) => translations[lang][key] || key;
  
  // Custom translation helper for project dynamic fields
  const pt = (project, field) => {
    if (!project) return "";
    if (lang === "en") {
      if (project[field + "_en"]) return project[field + "_en"];
      if (field === "title" && translations.en && translations.en[project.title]) return translations.en[project.title];
    }
    if (lang === "es") {
      if (project[field + "_es"]) return project[field + "_es"];
    }
    return project[field] || "";
  };

  return { t, pt, lang };
};

const ConstellationLoader = ({ message = "CALIBRANDO CONSTELACIÓN 3D..." }) => {
  const { t } = useTranslation();
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm pointer-events-none animate-fade-in">
      <div className="relative w-20 h-20 flex items-center justify-center mb-4">
        <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/40 animate-[spin_10s_linear_infinite]" />
        <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#00ffff] animate-pulse" />
        </div>
      </div>
      <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-cyan-300">
        {t(message)}
      </p>
    </div>
  );
};

const AppLoader = ({ isVisible, progress, statusText }) => {
  const { t } = useTranslation();
  return (
    <div
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#050508] transition-all duration-700 ${
        isVisible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none blur-sm"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />

      {/* Central Animated Constellation Reticle */}
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center mb-8">
        {/* Outer orbital ring */}
        <div className="absolute inset-0 rounded-full border border-dashed border-cyan-500/30 animate-[spin_18s_linear_infinite]" />
        
        {/* Middle orbital ring */}
        <div className="absolute inset-3 rounded-full border border-white/20 animate-[spin_12s_linear_infinite_reverse]" />
        
        {/* Reticle crosshairs */}
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
        <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent" />
        
        {/* Orbiting constellation satellite nodes */}
        <div className="absolute inset-0 animate-[spin_8s_linear_infinite]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#00ffff]" />
          <div className="absolute bottom-2 right-4 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
        </div>
        
        {/* Central Core Eye Motif */}
        <div className="relative w-12 h-12 rounded-full bg-cyan-950/60 border border-cyan-400/80 flex items-center justify-center shadow-[0_0_25px_rgba(0,255,255,0.4)]">
          <div className="w-5 h-5 rounded-full bg-cyan-400 animate-ping opacity-75" />
          <div className="absolute w-4 h-4 rounded-full bg-white shadow-[0_0_10px_#ffffff]" />
        </div>
      </div>

      {/* Brand Identity */}
      <div className="text-center z-10 px-4 mb-6">
        <h1 className="text-sm sm:text-base md:text-lg font-mono font-bold uppercase tracking-[0.25em] text-white">
          Benito González Quiñones
        </h1>
        <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.35em] text-cyan-400/80 mt-1">
          Arquitectura &middot; Diseño &middot; Espacio Tridimensional
        </p>
      </div>

      {/* Sleek Progress Bar */}
      <div className="w-64 sm:w-80 max-w-[85vw] flex flex-col gap-2 z-10">
        <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-cyan-300 to-white transition-all duration-300 ease-out shadow-[0_0_10px_#00ffff]"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-mono tracking-wider text-gray-400">
          <span className="truncate pr-2 uppercase">{statusText || "CARGANDO ENTORNO..."}</span>
          <span className="text-cyan-400 font-bold">{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
};



const EscritosPage = ({ onEscritoSelect }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState([]);

  // Default tags per category
  window.escritosData.forEach((e) => {
    if (!e.tags) e.tags = ["arquitectura", "crítica"];
    if (!e.category) e.category = "critica";
  });

  const allTags = Array.from(
    new Set(window.escritosData.flatMap((e) => e.tags)),
  ).sort();

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const filteredData = window.escritosData.filter((item) => {
    const term = searchTerm.toLowerCase();
    const matchSearch =
      item.title.toLowerCase().includes(term) ||
      item.summary.toLowerCase().includes(term);
    const matchTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => item.tags.includes(tag));
    return matchSearch && matchTags;
  });

  const categories = [
    {
      id: "critica",
      title: "Crítica Arquitectónica",
      items: filteredData.filter((i) => i.category === "critica"),
    },
    {
      id: "ensayo",
      title: "Ensayos Propios",
      items: filteredData.filter((i) => i.category === "ensayo"),
    },
    {
      id: "historia",
      title: "Historia de la Arquitectura",
      items: filteredData.filter((i) => i.category === "historia"),
    },
  ];

  return (
    <div className="w-full min-h-screen pt-24 pb-20 bg-[#f5f5f0] text-[#111111] border-x border-dashed border-[#b0b0a8] relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(176,176,168,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(176,176,168,0.2)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-8 font-sans relative z-10">
        <header className="mb-12 sm:mb-20 text-center sm:text-left border-b-2 border-[#111111] pb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 uppercase">
            Escritos y <span className="italic font-light">Publicaciones</span>
          </h1>
          <p className="text-lg text-[#444444] max-w-2xl font-mono text-sm uppercase tracking-widest">
            Repositorio de textos, ensayos y reflexiones críticas sobre la
            arquitectura, la ciudad y el diseño.
          </p>
        </header>

        <div className="mb-12 space-y-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar escritos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 pl-12 bg-white/50 border border-[#111111] focus:outline-none focus:bg-white transition-colors font-serif text-lg"
            />
            <svg
              className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-[#111111]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 text-xs font-mono tracking-widest uppercase border border-[#111111] transition-colors ${selectedTags.includes(tag) ? "bg-[#111111] text-white" : "bg-transparent text-[#111111] hover:bg-[#111111]/10"}`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-20">
          {categories
            .filter((c) => c.items.length > 0)
            .map((category) => (
              <section key={category.id}>
                <div className="flex items-center mb-8">
                  <h2 className="text-sm font-mono tracking-[0.2em] text-[#111111] uppercase px-4 py-2 border border-[#111111] rounded-none inline-block bg-white/50 backdrop-blur-sm shadow-[2px_2px_0_0_#111111]">
                    {category.title}
                  </h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#111111] to-transparent ml-6"></div>
                </div>

                <div className="flex flex-col border-t border-[#111111]">
                  {category.items.map((item) => (
                    <article
                      key={item.id}
                      onClick={() => onEscritoSelect(item.id)}
                      className="group relative border-b border-[#111111] flex flex-col py-8 cursor-pointer hover:bg-white/80 backdrop-blur-sm transition-colors duration-300 px-4 -mx-4 sm:px-6 sm:-mx-6"
                    >
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
                            {item.tags.map((t) => (
                              <span
                                key={t}
                                className="text-[10px] font-mono tracking-widest uppercase text-[#888888]"
                              >
                                #{t}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="self-center ml-4 transition-transform duration-300 hidden sm:block">
                          <div className="w-12 h-12 rounded-full border border-[#111111] flex items-center justify-center transform transition-transform group-hover:scale-110 text-[#111111]">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
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
  const { t, pt } = useTranslation();
  if (!escrito) return null;

  const text = pt(escrito, "text");
  const paragraphs = text ? text.split("\n").filter((p) => p.trim() !== "") : [];

  return (
    <div className="w-full min-h-screen pt-24 pb-20 bg-[#f5f5f0] text-[#111111] border-x border-dashed border-[#b0b0a8] relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(176,176,168,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(176,176,168,0.2)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-8 font-sans relative z-10">
        <header className="mb-16 border-b-2 border-[#111111] pb-12 mt-8">
          <span className="text-xs font-mono text-[#666666] tracking-widest uppercase mb-4 block">
            {escrito.date}
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight uppercase relative inline-block">
            {pt(escrito, "title")}
          </h1>
          <p className="text-xl text-[#555555] font-serif italic max-w-3xl leading-relaxed mb-6">
            {escrito.summary}
          </p>
          <div className="flex flex-wrap gap-2">
            {escrito.tags &&
              escrito.tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-1 text-[10px] font-mono tracking-widest uppercase border border-[#dddddd] text-[#666666]"
                >
                  #{t}
                </span>
              ))}
          </div>
        </header>

        <article className="prose prose-lg max-w-none text-[#333333] font-serif leading-loose mb-20 prose-headings:font-sans prose-headings:text-[#111111] selection:bg-[#111111] selection:text-white">
          {paragraphs.map((p, idx) => {
            if (p.toUpperCase() === p && p.length > 5) {
              return (
                <h3
                  key={idx}
                  className="text-2xl font-sans font-bold uppercase mt-12 mb-6 tracking-widest"
                >
                  {p}
                </h3>
              );
            }
            if (p.match(/^\d+\./)) {
              return (
                <h4 key={idx} className="text-xl font-sans font-bold mt-8 mb-4">
                  {p}
                </h4>
              );
            }
            return (
              <p key={idx} className="mb-6">
                {p}
              </p>
            );
          })}
        </article>

        {escrito.images && escrito.images.length > 0 && (
          <div className="mt-16 border-t-2 border-[#111111] pt-16">
            <h3 className="text-sm font-mono tracking-widest text-[#111111] uppercase mb-8">
              Documentación Visual
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {escrito.images.map((imgSrc, imgIdx) => (
                <figure key={imgIdx} className="group relative">
                  <div className="bg-[#ebebe6] border-2 border-[#111111] p-4 relative transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-[8px_8px_0_0_#111111]">
                    <OptimizedImage
                      src={imgSrc}
                      alt={`${escrito.title} - imagen ${imgIdx + 1}`}
                      className="w-full h-auto object-contain mix-blend-multiply"
                      loading="lazy"
                      theme="light"
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

// DATA STORE
// La variable allProjectsData ahora se carga desde el bloque de script superior.
const territoriosDigitalesImages = window.territoriosDigitalesImages;
const defaultProjectsData = window.defaultProjectsData;
const allProjectsData = window.defaultProjectsData;

// COMPONENTS
const EyeIcon = ({ color = "#00ffff" }) => {
  const [pupilTransform, setPupilTransform] = React.useState("translate(0, 0)");

  React.useEffect(() => {
    const isMobile =
      window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
      window.innerWidth < 768;

    if (isMobile) {
      const handleOrientation = (event) => {
        const { beta, gamma } = event; // beta: front-to-back, gamma: left-to-right
        if (beta === null || gamma === null) return;

        const maxPupilOffset = 15;
        // Normalize gamma and beta to a range of [-1, 1] and apply offset
        const pupilX = Math.max(-1, Math.min(1, gamma / 45)) * maxPupilOffset;
        // Subtract 45 from beta to make the eye look forward when the phone is held at a natural angle
        const pupilY =
          Math.max(-1, Math.min(1, (beta - 45) / 45)) * maxPupilOffset;

        setPupilTransform(`translate(${pupilX}, ${pupilY})`);
      };

      window.addEventListener("deviceorientation", handleOrientation);
      return () =>
        window.removeEventListener("deviceorientation", handleOrientation);
    } else {
      let animationFrameId;
      const handleMouseMove = (event) => {
        const x = event.clientX - window.innerWidth / 2;
        const y = event.clientY - window.innerHeight / 2;

        // Use requestAnimationFrame for smoother performance
        if (animationFrameId) cancelAnimationFrame(animationFrameId);

        animationFrameId = requestAnimationFrame(() => {
          const maxPupilOffset = 15;
          const angle = Math.atan2(y, x);
          const screenHypot =
            Math.sqrt(
              window.innerWidth * window.innerWidth +
                window.innerHeight * window.innerHeight,
            ) / 2;
          const mouseHypot = Math.sqrt(x * x + y * y);
          const normalizedDistance = Math.min(mouseHypot, screenHypot);
          const pupilX =
            Math.cos(angle) *
            maxPupilOffset *
            (normalizedDistance / screenHypot);
          const pupilY =
            Math.sin(angle) *
            maxPupilOffset *
            (normalizedDistance / screenHypot);
          setPupilTransform(`translate(${pupilX}, ${pupilY})`);
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      };
    }
  }, []);

  return (
    <svg
      viewBox="-100 -100 200 200"
      className="w-[120px] h-[120px] md:w-[200px] md:h-[200px]"
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g opacity="0.15">
        <path
          d="M 0 -80 C 40 -40, 40 40, 0 80 C -40 40, -40 -40, 0 -80 Z"
          fill="white"
          transform="rotate(45)"
        />
        <path
          d="M 0 -80 C 40 -40, 40 40, 0 80 C -40 40, -40 -40, 0 -80 Z"
          fill="white"
          transform="rotate(-45)"
        />
      </g>
      <g>
        <path
          d="M 0 -70 L 70 0 L 0 70 L -70 0 Z"
          fill="#333333"
          stroke="gray"
          strokeWidth="0.5"
        />
      </g>
      <g
        filter="url(#glow)"
        transform={pupilTransform}
        style={{ transition: "transform 0.1s ease-out" }}
      >
        <circle
          cx="0"
          cy="0"
          r="35"
          fill="none"
          stroke={color}
          strokeOpacity="0.1"
          strokeWidth="1"
        />
        <circle cx="0" cy="0" r="25" fill={color} fillOpacity="0.1" />
        <circle cx="0" cy="0" r="12" fill={color} fillOpacity="0.25" />
        <circle cx="0" cy="0" r="7" fill={color} />
      </g>
    </svg>
  );
};

const HomeButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed top-4 right-4 z-50 w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white backdrop-blur-sm border border-gray-700 transition-all duration-300 hover:bg-opacity-75 hover:border-gray-500 hover:scale-110"
    aria-label="Volver al inicio"
  >
    <svg width="24" height="24" viewBox="-50 -50 100 100">
      <g opacity="0.6">
        <path
          d="M 0 -40 C 20 -20, 20 20, 0 40 C -20 20, -20 -20, 0 -40 Z"
          fill="currentColor"
          transform="rotate(45)"
        />
        <path
          d="M 0 -40 C 20 -20, 20 20, 0 40 C -20 20, -20 -20, 0 -40 Z"
          fill="currentColor"
          transform="rotate(-45)"
        />
      </g>
      <g>
        <circle cx="0" cy="0" r="10" fill="currentColor" />
      </g>
    </svg>
  </button>
);

const BackButton = ({ onClick, theme = "dark" }) => {
  const { t } = useTranslation();
  const baseClasses =
    "fixed top-4 left-4 z-50 font-mono uppercase tracking-widest text-sm px-4 py-2 rounded-full border transition-all duration-300";
  const themeClasses =
    theme === "dark"
      ? "text-white bg-black bg-opacity-30 backdrop-blur-sm border-gray-700 hover:bg-opacity-50 hover:border-gray-500"
      : "text-black bg-white bg-opacity-50 backdrop-blur-sm border-gray-300 hover:bg-opacity-80 hover:border-gray-500";

  return (
    <button onClick={onClick} className={`${baseClasses} ${themeClasses}`}>
      &larr; {t("Volver")}
    </button>
  );
};

const NetworkGraph = ({ onNodeClick, filter, disruptSignal, zoomTarget, highlightNodeId }) => {
  const { t, pt, lang } = useTranslation();
  const [graphData, setGraphData] = React.useState({ nodes: [], links: [] });
  const [dimensions, setDimensions] = React.useState({
    width: typeof window !== "undefined" ? window.innerWidth : 800,
    height: typeof window !== "undefined" ? window.innerHeight : 600,
  });
  const [isLoaded, setIsLoaded] = React.useState(true);
  const eyeRef = React.useRef(null);
  const [highlightLinks, setHighlightLinks] = React.useState(new Set());
  const [highlightNodes, setHighlightNodes] = React.useState(new Set());

  React.useEffect(() => {
    const newHighlightNodes = new Set();
    const newHighlightLinks = new Set();

    if (highlightNodeId) {
      const targetNode = graphData.nodes.find(n => n.id === highlightNodeId || n.projectId === highlightNodeId);
      if (targetNode) {
        newHighlightNodes.add(targetNode);
      }
    }
    
    setHighlightNodes(newHighlightNodes);
    setHighlightLinks(newHighlightLinks);

    // Direct THREE object updates - Set Targets for Animation
    graphData.nodes.forEach(node => {
      if (node.__nodeMat && node.__sprite && node.__mesh) {
        const isHighlighted = newHighlightNodes.has(node);
        const isTarget = highlightNodeId && (node.id === highlightNodeId || node.projectId === highlightNodeId);

        if (isHighlighted) {
          node.__targetColor = 0x00ff00;
          node.__targetOpacity = isTarget ? 1.0 : 0.8;
          node.__targetWireframe = isTarget ? false : true;
          node.__targetTextColor = "#00ff00";
          node.__targetTextHeight = node.__baseTextHeight * (isTarget ? 2 : 1.5);
          node.__targetScale = isTarget ? 2.5 : 1.5;
        } else {
          node.__targetColor = node.__baseColor;
          node.__targetOpacity = 0.5;
          node.__targetWireframe = true;
          node.__targetTextColor = node.__baseTextColor;
          node.__targetTextHeight = node.__baseTextHeight;
          node.__targetScale = 1;
        }
      }
    });
  }, [highlightNodeId, graphData]);

  // Smooth Animation Loop
  React.useEffect(() => {
    let animationFrameId;
    const animate = () => {
      if (graphData && graphData.nodes) {
        graphData.nodes.forEach(node => {
          if (node.__nodeMat && node.__sprite && node.__mesh && node.__targetScale !== undefined) {
            
            // Lerp Scale
            const currentScale = node.__mesh.scale.x;
            const targetScale = node.__targetScale;
            if (Math.abs(currentScale - targetScale) > 0.005) {
              const nextScale = currentScale + (targetScale - currentScale) * 0.15;
              node.__mesh.scale.set(nextScale, nextScale, nextScale);
              node.__sprite.position.y = (node.__baseRadius * nextScale) + 2;
            } else if (currentScale !== targetScale) {
              node.__mesh.scale.set(targetScale, targetScale, targetScale);
              node.__sprite.position.y = (node.__baseRadius * targetScale) + 2;
            }

            // Lerp Opacity
            const currentOpacity = node.__nodeMat.opacity;
            const targetOpacity = node.__targetOpacity;
            if (Math.abs(currentOpacity - targetOpacity) > 0.005) {
              node.__nodeMat.opacity = currentOpacity + (targetOpacity - currentOpacity) * 0.15;
            } else if (currentOpacity !== targetOpacity) {
              node.__nodeMat.opacity = targetOpacity;
            }

            // Wireframe
            if (node.__nodeMat.wireframe !== node.__targetWireframe) {
              node.__nodeMat.wireframe = node.__targetWireframe;
              node.__nodeMat.needsUpdate = true;
            }

            // Text Color (Snap)
            if (node.__sprite.color !== node.__targetTextColor) {
              node.__sprite.color = node.__targetTextColor;
            }

            // Lerp Text Height
            const currentTextHeight = node.__sprite.textHeight;
            const targetTextHeight = node.__targetTextHeight;
            if (Math.abs(currentTextHeight - targetTextHeight) > 0.005) {
              node.__sprite.textHeight = currentTextHeight + (targetTextHeight - currentTextHeight) * 0.15;
            } else if (currentTextHeight !== targetTextHeight) {
              node.__sprite.textHeight = targetTextHeight;
            }

            // Lerp Node Color
            if (!node.__targetColorObj) {
              node.__targetColorObj = new THREE.Color();
            }
            if (node.__lastTargetColorValue !== node.__targetColor) {
              node.__targetColorObj.set(node.__targetColor);
              node.__lastTargetColorValue = node.__targetColor;
            }
            node.__nodeMat.color.lerp(node.__targetColorObj, 0.15);
          }
        });
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [graphData]);

  React.useEffect(() => {
    let animationFrameId;
    const handleMouseMove = (event) => {
      if (!eyeRef.current) return;

      const x = event.clientX - dimensions.width / 2;
      const y = event.clientY - dimensions.height / 2;

      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        const maxPupilOffset = 2; // For the 3D pupil inside the sphere
        const angle = Math.atan2(y, x);

        const screenHypot =
          Math.sqrt(
            dimensions.width * dimensions.width +
              dimensions.height * dimensions.height,
          ) / 2;
        const mouseHypot = Math.sqrt(x * x + y * y);
        const normalizedDistance = Math.min(mouseHypot, screenHypot);

        const pupilX =
          Math.cos(angle) * maxPupilOffset * (normalizedDistance / screenHypot);
        const pupilY =
          -Math.sin(angle) *
          maxPupilOffset *
          (normalizedDistance / screenHypot); // Y is inverted in 3D

        if (eyeRef.current) {
          eyeRef.current.position.x = pupilX;
          eyeRef.current.position.y = pupilY;
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions]);

  React.useEffect(() => {
    const handleResize = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);

    setIsLoaded(true);

    return () => {
      window.removeEventListener("resize", handleResize);
      
    };
  }, []);

  React.useEffect(() => {
    const baseNodesRaw = [
      { id: "CENTRAL_HUB", group: 0, isCentral: true, fx: 0, fy: 0, fz: 0 },
      {
        id: "ARQUITECTURA",
        group: 1,
        isNavLink: true,
        isCategoryNode: true,
        targetCategory: "architecture",
      },
      {
        id: "DISEÑO",
        group: 2,
        isNavLink: true,
        isCategoryNode: true,
        targetCategory: "design",
      },
      {
        id: "ESCENOGRAFÍAS",
        group: 2,
        isNavLink: true,
        isCategoryNode: true,
        targetCategory: "scenography",
      },
      {
        id: "CONTACTO",
        group: 2,
        isNavLink: true,
        isPage: true,
        targetPage: "contact",
      },
    ];

    const archNodes = [
      ...new Set(
        allProjectsData
          .filter((p) => p.category === "architecture" && p.subcategory)
          .map((p) => p.subcategory),
      ),
    ].map((sub) => ({
      id: sub,
      group: 2,
      isNavLink: true,
      isSubcategory: true,
      targetCategory: "architecture",
      targetSubcategory: sub,
    }));

    const designSubcategories = [
      ...new Set(
        allProjectsData
          .filter((p) => p.category === "design" && p.subcategory)
          .map((p) => p.subcategory),
      ),
    ];
    const designNodes = designSubcategories.map((sub) => ({
      id: sub,
      group: 2,
      isNavLink: true,
      isSubcategory: true,
      targetCategory: "design",
      targetSubcategory: sub,
    }));

    baseNodesRaw.push(...archNodes, ...designNodes);

    const baseLinksRaw = [
      { source: "CENTRAL_HUB", target: "ARQUITECTURA", value: 1 },
      { source: "CENTRAL_HUB", target: "DISEÑO", value: 1 },
      { source: "CENTRAL_HUB", target: "ESCENOGRAFÍAS", value: 1 },
      { source: "CENTRAL_HUB", target: "CONTACTO", value: 1 },
      ...archNodes.map((n) => ({
        source: "ARQUITECTURA",
        target: n.id,
        value: 2,
      })),
      ...designNodes.map((n) => ({ source: "DISEÑO", target: n.id, value: 2 })),
    ];

    const getSourceNode = (project) => {
      if (project.category === "architecture")
        return project.subcategory || "ARQUITECTURA";
      if (project.category === "design") return project.subcategory || "DISEÑO";
      if (
        project.category === "escenografias" ||
        project.category === "scenography"
      )
        return "ESCENOGRAFÍAS";
      return "CENTRAL_HUB";
    };

    let nodesData = [];
    let linksData = [];

    const relevantProjects = allProjectsData.filter(
      (p) =>
        p.id !== "cat-proyectos" &&
        p.id !== "cat-investigacion" &&
        p.id !== "escritos-arquitectura",
    );

    if (filter === "all" || filter === "home" || filter === "contact") {
      nodesData = [...baseNodesRaw];
      linksData = [...baseLinksRaw];

      const isMobile = window.innerWidth < 768;
      
      const filteredRelevantProjects = isMobile 
        ? relevantProjects.filter(p => p.category === "scenography" || p.category === "escenografias") 
        : relevantProjects;
        
      const projectNodes = filteredRelevantProjects.map((p) => ({
            id: p.title,
            group: 4,
            isNavLink: true,
            isProject: true,
            projectId: p.id,
            isPage: !!p.isPage,
            targetPage: p.targetPage || p.id,
          }));
          const projectLinks = filteredRelevantProjects.map((p) => ({
            source: getSourceNode(p),
            target: p.title,
            value: 5,
          }));

          nodesData.push(...projectNodes);
          linksData.push(...projectLinks);
    } else {
      const categoryMap = {
        architecture: "ARQUITECTURA",
        design: "DISEÑO",
        scenography: "ESCENOGRAFÍAS",
        escenografias: "ESCENOGRAFÍAS",
      };
      const categoryName = categoryMap[filter];
      if (categoryName) {
        let localProjects = relevantProjects.filter(
          (p) =>
            p.category === filter ||
            (filter === "escenografias" && p.category === "scenography") ||
            (filter === "scenography" && p.category === "escenografias"),
        );
        let localSubcategories = [];

        if (filter === "architecture") {
          localSubcategories = archNodes;
          localProjects = []; // Do not display projects directly if filter is just architecture
        } else if (filter === "design") {
          localSubcategories = designNodes;
        }

        const projectNodes = localProjects.map((p) => ({
          id: p.title,
          group: 4,
          isNavLink: true,
          isProject: true,
          projectId: p.id,
          isPage: !!p.isPage,
          targetPage: p.targetPage || p.id,
        }));

        const projectLinks = localProjects.map((p) => {
          const src = getSourceNode(p);
          return { source: src, target: p.title, value: 5 };
        });

        nodesData = [
          { id: "CENTRAL_HUB", group: 0, isCentral: true, fx: 0, fy: 0, fz: 0 },
          { id: categoryName, group: 1, isNavLink: true },
          ...localSubcategories,
          ...projectNodes,
        ];
        linksData = [
          { source: "CENTRAL_HUB", target: categoryName, value: 1 },
          ...localSubcategories.map((n) => ({
            source: categoryName,
            target: n.id,
            value: 2,
          })),
          ...projectLinks,
        ];
      }
    }

    setGraphData({ nodes: nodesData, links: linksData });
  }, [filter]);

  const fgRef = React.useRef();

  React.useEffect(() => {
    if (disruptSignal > 0 && fgRef.current) {
      fgRef.current.d3ReheatSimulation();
    }
  }, [disruptSignal]);

  React.useEffect(() => {
    if (fgRef.current) {
      const isMobile = window.innerWidth < 768;
      fgRef.current.d3Force("link").distance((link) => {
        if (link.value === 1) return isMobile ? 120 : 200; // Central to Category
        if (link.value === 2) return isMobile ? 60 : 100; // Category to Subcategory
        return isMobile ? 40 : 60; // Subcat/Cat to Project
      });
      fgRef.current.d3Force("charge").strength(isMobile ? -80 : -150);
    }
  }, [graphData]);

  React.useEffect(() => {
    if (zoomTarget && fgRef.current && isLoaded) {
      const mappedZoomTarget =
        zoomTarget === "escenografias" ? "scenography" : zoomTarget;
      const targetNode = graphData.nodes.find(
        (n) =>
          n.targetCategory === mappedZoomTarget ||
          n.id.toLowerCase() === mappedZoomTarget.toLowerCase() ||
          n.targetPage === mappedZoomTarget ||
          n.projectId === mappedZoomTarget,
      );
      if (targetNode) {
        const isMobile = window.innerWidth <= 768;
        const distance = isMobile ? 180 : 80;
        const targetX = targetNode.x || 0.1;
        const targetY = targetNode.y || 0.1;
        const targetZ = targetNode.z || 0.1;
        const distRatio = 1 + distance / Math.hypot(targetX, targetY, targetZ);
        fgRef.current.cameraPosition(
          {
            x: targetX * distRatio,
            y: targetY * distRatio,
            z: targetZ * distRatio,
          },
          targetNode,
          2600,
        );
      }
    }
  }, [zoomTarget, graphData.nodes, isLoaded]);

  if (!isLoaded) {
    return <ConstellationLoader message="INICIANDO CONSTELACIÓN 3D..." />;
  }

  
  

  return (
    <div className="w-full h-full relative cursor-move">
      <ForceGraph3D
        ref={fgRef}
        width={dimensions.width}
        height={dimensions.height}
        graphData={graphData}
        nodeLabel={React.useCallback(() => "", [])}
        onNodeClick={React.useCallback((node) => {
          if (
            node.isNavLink ||
            node.isProject ||
            node.isPage ||
            node.isCategoryNode
          ) {
            setTimeout(() => {
              onNodeClick(node);
            }, 0);
          }
        }, [onNodeClick])}
        nodeThreeObject={React.useCallback((node) => {
          if (node.isCentral) {
            const group = new THREE.Group();

            const outerGeo = new THREE.SphereGeometry(15, 32, 32);
            const outerMat = new THREE.MeshPhongMaterial({
              color: 0xffffff,
              transparent: true,
              opacity: 0.15,
            });
            group.add(new THREE.Mesh(outerGeo, outerMat));

            const midGeo = new THREE.SphereGeometry(10, 32, 32);
            const midMat = new THREE.MeshPhongMaterial({
              color: filter === "design" ? 0xff0000 : 0x00ffff,
              transparent: true,
              opacity: 0.25,
            });
            group.add(new THREE.Mesh(midGeo, midMat));

            const pupilGeo = new THREE.SphereGeometry(4, 32, 32);
            const pupilMat = new THREE.MeshPhongMaterial({
              color: filter === "design" ? 0xff0000 : 0x00ffff,
            });
            const pupil = new THREE.Mesh(pupilGeo, pupilMat);
            group.add(pupil);

            eyeRef.current = pupil;

            return group;
          }

          const group = new THREE.Group();

          let radius = node.isProject ? 2 : node.isSubcategory ? 4 : 6;
          let color = node.isProject ? 0xaaaaaa : 0xffffff;
          let textColor = node.isProject ? "#aaaaaa" : "#ffffff";
          let textHeight = node.isProject ? 3 : node.isSubcategory ? 4 : 5;

          if (
            node.isCategoryNode ||
            ["ARQUITECTURA", "DISEÑO", "ESCENOGRAFÍAS", "CONTACTO"].includes(
              node.id,
            )
          ) {
            color = 0x00ffff;
            textColor = "#00ffff";
            radius = 6;
            textHeight = 5;
            
            if (filter === "design" && node.id === "DISEÑO") {
              color = "#ff0000";
              textColor = "#ff0000";
              radius = 8;
            }
          } else if (filter === "design" && (node.isSubcategory || node.isProject)) {
             color = Math.random() > 0.5 ? "#ff0000" : "#ffcc00";
             textColor = "#ffcc00";
          }

          const nodeGeo = new THREE.SphereGeometry(radius, 16, 16);
          const nodeMat = new THREE.MeshBasicMaterial({
            color: color,
            wireframe: true,
            transparent: true,
            opacity: 0.5,
          });
          const mesh = new THREE.Mesh(nodeGeo, nodeMat);
          group.add(mesh);

          const sprite = new SpriteText(t(node.id));
          sprite.color = textColor;
          sprite.textHeight = textHeight;
          sprite.fontFace = "'Space Mono', monospace";
          sprite.backgroundColor = "rgba(0,0,0,0.4)";
          sprite.padding = 2;
          sprite.position.y = radius + textHeight + 1;
          group.add(sprite);

          node.__mesh = mesh;
          node.__nodeMat = nodeMat;
          node.__sprite = sprite;
          node.__baseColor = color;
          node.__baseTextColor = textColor;
          node.__baseTextHeight = textHeight;
          node.__baseRadius = radius;

          return group;
        }, [filter, lang, t])}
        linkWidth={React.useCallback((link) => highlightLinks.has(link) ? 3 : (link.value === 1 ? 2.5 : link.value === 2 ? 1.5 : 0.8), [highlightLinks])}
        linkColor={React.useCallback((link) => {
          if (highlightLinks.has(link)) return "rgba(0,255,0,1)";
          if (filter === "design") {
            return "rgba(255,0,0,0.7)";
          }
          return link.value > 2 ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.9)";
        }, [highlightLinks, filter])}
        linkDirectionalParticles={0}
        warmupTicks={30}
        cooldownTicks={100}
        backgroundColor="rgba(0,0,0,0)"
        showNavInfo={false}
        onNodeHover={React.useCallback((node) => {
          if (node && (node.isNavLink || node.isProject)) {
            document.body.style.cursor = "pointer";
          } else {
            document.body.style.cursor = "grab";
          }
        }, [])}
      />
    </div>
  );
};

const OrbitalPage = ({
  category,
  subcategory,
  title,
  onProjectSelect,
  onSubcategorySelect,
  onProjectHover = () => {},
  showEye = false,
  highlightNodeId = null,
}) => {
  const { t, pt, lang } = useTranslation();
  const svgRef = React.useRef(null);
  const [tooltip, setTooltip] = React.useState({
    visible: false,
    content: "",
    x: 0,
    y: 0,
  });

  const onProjectHoverRef = React.useRef(onProjectHover);
  React.useEffect(() => {
    onProjectHoverRef.current = onProjectHover;
  }, [onProjectHover]);

  React.useEffect(() => {
    if (!svgRef.current || !d3) return;
    const svg = d3.select(svgRef.current);
    const isDesign = category === "design";
    const isMobile = window.innerWidth < 768;

    let pathNodeIds = new Set();
    if (highlightNodeId) {
      let targetNode = null;
      svg.selectAll("g").each(function(d) {
        if (d && d.projectId === highlightNodeId) targetNode = d;
      });
      if (targetNode) {
        pathNodeIds.add(targetNode.id);
        if (targetNode.sun) pathNodeIds.add(targetNode.sun);
        pathNodeIds.add(title);
      }
    }

    svg.selectAll(".animated-link").each(function(d) {
      if (!d || !d.source || !d.target) return;
      const isHighlighted = pathNodeIds.has(d.source.id) && pathNodeIds.has(d.target.id);
      d3.select(this)
        .transition().duration(200)
        .attr("stroke", isHighlighted ? (isDesign ? "#ffcc00" : "#00ffff") : (isDesign ? "rgba(255,0,0,0.7)" : "#fff"))
        .attr("stroke-width", isHighlighted ? 3 : (d.target.isSubSun ? 3 : 1.5))
        .attr("stroke-opacity", isHighlighted ? 1 : (d.target.isSubSun ? 1 : 0.7));
    });

    svg.selectAll("g").each(function(d) {
      if (!d) return;
      const isHighlighted = pathNodeIds.has(d.id) && d.isProject;
      if (d.isProject && !d.isPage) {
        d3.select(this).select("circle").transition().duration(200)
          .attr("fill", isHighlighted ? "#00ffff" : (isDesign ? "#ffcc00" : "#999"))
          .attr("stroke", isHighlighted ? "#00ffff" : (isDesign ? "#ff0000" : "#fff"))
          .attr("r", isHighlighted ? (isMobile ? 7 : 5) : (isMobile ? 3 : 2));
        d3.select(this).select("text").transition().duration(200)
          .attr("fill", isHighlighted ? "#00ffff" : (isDesign ? "#ffcc00" : "#aaa"))
          .style("font-size", isHighlighted ? (isMobile ? "0.8rem" : "0.85rem") : (isMobile ? "0.6rem" : "0.65rem"));
      }
      if (d.isProject && d.isPage) {
        d3.select(this).select("text").transition().duration(200)
          .attr("fill", isHighlighted ? "#00ffff" : (isDesign ? "#ffcc00" : "#fff"));
        d3.select(this).select("circle").transition().duration(200)
          .attr("stroke", isHighlighted ? "#00ffff" : (isDesign ? "#ffcc00" : "#fff"));
      }
    });
  }, [highlightNodeId, category, title]);

  const simulationCallback = React.useCallback(
    (category, subcategory, title, onProjectSelect, onSubcategorySelect) => {
      if (!svgRef.current) return;

      let projects = allProjectsData.filter((p) => p.category === category);
      if (subcategory) {
        projects = projects.filter((p) => p.subcategory === subcategory);
      }

      const isMobile = window.innerWidth < 768;
      const width = window.innerWidth;
      const height = window.innerHeight;

      const baseNodes = [{ id: title, isSun: true, fx: 0, fy: 0 }];

      const subcategories = subcategory
        ? []
        : [...new Set(projects.map((p) => p.subcategory).filter(Boolean))];
      const subcategoryNodes = subcategories.map((sub) => ({
        id: sub,
        isSubSun: true,
        sun: title,
      }));

      let projectNodes = projects.map((p) => ({
        id: p.title,
        isProject: true,
        isPage: !!p.isPage || !!p.isCategoryNode,
        isCategoryNode: !!p.isCategoryNode,
        projectId: p.id,
        sun: subcategory ? title : p.subcategory || title,
      }));
      if (isMobile && !subcategory && category !== "escenografias" && category !== "scenography") {
        projectNodes = [];
      }

      projectNodes.forEach((node) => {
        node.x = 0;
        node.y = 0;
      });
      subcategoryNodes.forEach((node) => {
        node.x = 0;
        node.y = 0;
      });

      const nodesData = [...baseNodes, ...subcategoryNodes, ...projectNodes];
      const linksData = [
        ...subcategoryNodes.map((sub) => ({ source: title, target: sub.id })),
        ...projectNodes.map((p) => ({ source: p.sun, target: p.id })),
      ];

      const svg = d3
        .select(svgRef.current)
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height]);
      svg.selectAll("*").remove();

      const simulation = d3
        .forceSimulation(nodesData)
        .force(
          "link",
          d3
            .forceLink(linksData)
            .id((d) => d.id)
            .distance((d) => {
              if (
                d.target.isSubSun ||
                d.target.isPage ||
                d.target.isCategoryNode
              )
                return isMobile ? 200 : 350;
              return isMobile ? 100 : 180;
            })
            .strength(0.5),
        )
        .force(
          "charge",
          d3.forceManyBody().strength((d) => {
            if (d.isSun) return isMobile ? -3000 : -6000;
            if (d.isSubSun || d.isPage || d.isCategoryNode)
              return isMobile ? -1500 : -2500;
            return isMobile ? -400 : -600;
          }),
        )
        .force("center", d3.forceCenter(0, 0))
        .force(
          "collide",
          d3.forceCollide().radius((d) => {
            if (d.isSun) return isMobile ? 120 : 200;
            if (d.isSubSun || d.isPage) return 60;
            return 35;
          }),
        );

      const link = svg
        .append("g")
        .attr("stroke", category === "design" ? "rgba(255,0,0,0.7)" : "#fff")
        .attr("stroke-opacity", 0)
        .selectAll("line")
        .data(linksData)
        .join("line")
        .attr("class", "animated-link")
        .attr("stroke-width", (d) => (d.target.isSubSun ? 3 : 1.5));
      link
        .transition()
        .duration(1000)
        .delay(800)
        .attr("stroke-opacity", (d) => (d.target.isSubSun ? 1 : 0.7));

      const node = svg
        .append("g")
        .selectAll("g")
        .data(nodesData)
        .join("g")
        .style("cursor", (d) =>
          d.isProject || d.isSubSun ? "pointer" : "default",
        )
        .on("click", (event, d) => {
          if (d.isProject) {
            // Illuminate path
            let pathNodeIds = new Set();
            pathNodeIds.add(d.id);
            if (d.sun) pathNodeIds.add(d.sun);
            pathNodeIds.add(title);
            
            const isDesign = category === "design";
            
            svg.selectAll(".animated-link").each(function(linkD) {
              if (!linkD || !linkD.source || !linkD.target) return;
              const isHighlighted = pathNodeIds.has(linkD.source.id) && pathNodeIds.has(linkD.target.id);
              if (isHighlighted) {
                d3.select(this)
                  .transition().duration(200)
                  .attr("stroke", "#00ffff")
                  .attr("stroke-width", 3)
                  .attr("stroke-opacity", 1);
              }
            });

            svg.selectAll("g").each(function(nodeD) {
              if (!nodeD) return;
              const isHighlighted = pathNodeIds.has(nodeD.id) && nodeD.isProject;
              if (isHighlighted && nodeD.isProject && !nodeD.isPage) {
                d3.select(this).select("circle").transition().duration(200)
                  .attr("fill", "#00ffff")
                  .attr("stroke", "#00ffff")
                  .attr("r", isMobile ? 7 : 5);
                d3.select(this).select("text").transition().duration(200)
                  .attr("fill", "#00ffff")
                  .style("font-size", isMobile ? "0.8rem" : "0.85rem");
              } else if (isHighlighted && nodeD.isProject && nodeD.isPage) {
                d3.select(this).select("circle").transition().duration(200).attr("stroke", "#00ffff");
                d3.select(this).select("text").transition().duration(200).attr("fill", "#00ffff");
              }
            });

            // Disable pointer events during transition to prevent mouseout from resetting styles
            svg.style("pointer-events", "none");

            // Zoom in
            svg.transition().duration(3200).ease(window.d3 ? window.d3.easeCubicInOut : d3.easeCubicInOut)
               .attr("viewBox", `${d.x - width/8} ${d.y - height/8} ${width/4} ${height/4}`);

            // Delay navigation
            setTimeout(() => {
              svg.style("pointer-events", "auto");
              if (d.isPage) {
                onProjectSelect(d.projectId, true);
              } else {
                onProjectSelect(d.projectId, false);
              }
            }, 3200);

          } else if (d.isSubSun && onSubcategorySelect) {
            onSubcategorySelect(d.id);
          }
        });

      const sunNodes = node.filter((d) => d.isSun);
      if (!showEye) {
        sunNodes
          .classed("sun-node", true)
          .append("text")
          .text((d) => t(d.id))
          .attr("text-anchor", "middle")
          .attr("y", 5)
          .attr("fill", category === "design" ? "#ff0000" : "#fff")
          .style("font-size", (d) => isMobile ? (d.id === "ESCENOGRAFÍAS" ? "1.3rem" : "1.8rem") : "2.5rem")
          .style("font-family", "'Cormorant Garamond', serif")
          .style("text-transform", "uppercase")
          .style("letter-spacing", "0.1em");
      }

      const subSunNodes = node.filter((d) => d.isSubSun);
      subSunNodes
        .append("circle")
        .attr("r", isMobile ? 15 : 20)
        .attr("fill", "none")
        .attr("stroke", category === "design" ? "#ffcc00" : "#fff")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "4 4");
      subSunNodes
        .append("text")
        .text((d) => t(d.id))
        .attr("text-anchor", "middle")
        .attr("y", isMobile ? 25 : 35)
        .attr("fill", category === "design" ? "#ffcc00" : "#fff")
        .style("font-size", isMobile ? "0.7rem" : "0.9rem")
        .style("text-transform", "uppercase")
        .style("letter-spacing", "0.1em")
        .style("font-weight", "bold");

      const pageProjectGroups = node.filter((d) => d.isProject && d.isPage);
      pageProjectGroups
        .append("circle")
        .attr("r", isMobile ? 15 : 20)
        .attr("fill", "none")
        .attr("stroke", category === "design" ? "#ffcc00" : "#fff")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "4 4");
      pageProjectGroups
        .append("text")
        .text((d) => t(d.id))
        .attr("text-anchor", "middle")
        .attr("y", isMobile ? 25 : 35)
        .attr("fill", category === "design" ? "#ffcc00" : "#fff")
        .style("font-size", isMobile ? "0.7rem" : "0.9rem")
        .style("text-transform", "uppercase")
        .style("letter-spacing", "0.1em")
        .style("font-weight", "bold");

      pageProjectGroups
        .on("mouseover", function () {
          d3.select(this)
            .select("text")
            .transition()
            .duration(200)
            .attr("fill", category === "design" ? "#ff0000" : "#00ffff");
          d3.select(this)
            .select("circle")
            .transition()
            .duration(200)
            .attr("stroke", category === "design" ? "#ff0000" : "#00ffff");
        })
        .on("mouseout", function () {
          d3.select(this)
            .select("text")
            .transition()
            .duration(200)
            .attr("fill", category === "design" ? "#ffcc00" : "#fff");
          d3.select(this)
            .select("circle")
            .transition()
            .duration(200)
            .attr("stroke", category === "design" ? "#ffcc00" : "#fff");
        });

      const projectNodeGroups = node.filter((d) => d.isProject && !d.isPage);
      projectNodeGroups
        .append("circle")
        .attr("r", isMobile ? 3 : 2)
        .attr("fill", category === "design" ? "#ffcc00" : "#999")
        .attr("stroke", category === "design" ? "#ff0000" : "#fff")
        .attr("stroke-width", 1);

      const projectTexts = projectNodeGroups
        .append("text")
        .text((d) => t(d.id))
        .attr("y", 4)
        .attr("fill", category === "design" ? "#ffcc00" : "#aaa")
        .style("font-size", isMobile ? "0.6rem" : "0.65rem")
        .style("text-transform", "uppercase");

      projectNodeGroups
        .on("mouseover", function (event, d) {
          d3.select(this)
            .select("text")
            .transition()
            .duration(200)
            .attr("fill", category === "design" ? "#ff0000" : "#00ffff");
          d3.select(this)
            .select("circle")
            .transition()
            .duration(200)
            .attr("fill", category === "design" ? "#ff0000" : "#00ffff")
            .attr("r", isMobile ? 7 : 5);
          const project = allProjectsData.find((p) => p.id === d.projectId);
          if (project) {
            onProjectHoverRef.current(project);
            if (!project.isPage) {
              const projectSummary = pt(project, "summary");
              const projectDesc = pt(project, "description");
              const content =
                projectSummary ||
                (projectDesc &&
                  (projectDesc.length > 150
                    ? projectDesc.substring(0, 150) + "..."
                    : projectDesc));
              if (content) {
                setTooltip({
                  visible: true,
                  content: content,
                  x: event.pageX,
                  y: event.pageY,
                });
              }
            }
          }
        })
        .on("mousemove", function (event, d) {
          setTooltip((prev) => ({ ...prev, x: event.pageX, y: event.pageY }));
        })
        .on("mouseout", function () {
          d3.select(this)
            .select("text")
            .transition()
            .duration(200)
            .attr("fill", category === "design" ? "#ffcc00" : "#aaa");
          d3.select(this)
            .select("circle")
            .transition()
            .duration(200)
            .attr("fill", category === "design" ? "#ffcc00" : "#999")
            .attr("r", isMobile ? 5 : 3);
          setTooltip({ visible: false, content: "", x: 0, y: 0 });
          onProjectHoverRef.current(null);
        });

      node.call(
        d3
          .drag()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            if (!d.isSun) {
              d.fx = null;
              d.fy = null;
            }
          }),
      );

      node
        .style("opacity", 0)
        .transition()
        .duration(1200)
        .delay((d, i) => (d.isSun ? 0 : 500 + i * 50))
        .style("opacity", 1);

      simulation.on("tick", () => {
        const marginX = isMobile ? 30 : 200;
        const marginY = isMobile ? 50 : 120;
        const centerKeepout = isMobile ? 80 : 220;
        const textOffset = 12;

        node.each((d) => {
          if (d.isSun) {
            d.x = 0;
            d.y = 0;
            return;
          }

          const leftBound = -width / 2 + marginX;
          const rightBound = width / 2 - marginX;
          const topBound = -height / 2 + marginY;
          const bottomBound = height / 2 - marginY;

          d.x = Math.max(leftBound, Math.min(rightBound, d.x));
          d.y = Math.max(topBound, Math.min(bottomBound, d.y));

          const dist = Math.sqrt(d.x * d.x + d.y * d.y);
          if (dist > 0 && dist < centerKeepout) {
            const factor = centerKeepout / dist;
            d.x *= factor;
            d.y *= factor;
            // re-clamp after push out
            d.x = Math.max(leftBound, Math.min(rightBound, d.x));
            d.y = Math.max(topBound, Math.min(bottomBound, d.y));
          }
        });
        link
          .attr("x1", (d) => d.source.x || 0)
          .attr("y1", (d) => d.source.y || 0)
          .attr("x2", (d) => d.target.x || 0)
          .attr("y2", (d) => d.target.y || 0);
        node.attr("transform", (d) => `translate(${d.x || 0}, ${d.y || 0})`);

        projectTexts
          .attr("x", (d) => ((d.x || 0) >= 0 ? -textOffset : textOffset))
          .attr("text-anchor", (d) => ((d.x || 0) >= 0 ? "end" : "start"));
      });
      return simulation;
    },
    [showEye, lang, t],
  );

  React.useEffect(() => {
    const simulation = simulationCallback(
      category,
      subcategory,
      title,
      onProjectSelect,
      onSubcategorySelect,
    );
    return () => simulation.stop();
  }, [
    category,
    subcategory,
    title,
    onProjectSelect,
    onSubcategorySelect,
    simulationCallback,
  ]);

  return (
    <div className="w-full h-screen bg-transparent text-white animate-fade-in relative">
      <svg
        ref={svgRef}
        className="w-full h-full bg-transparent relative z-10"
      />
      {showEye && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <EyeIcon color={category === "design" ? "#ff0000" : "#00ffff"} />
        </div>
      )}
      {tooltip.visible && (
        <div
          className="absolute z-30 p-3 text-sm bg-gray-900 bg-opacity-80 backdrop-blur-sm text-white rounded-md shadow-lg max-w-xs pointer-events-none transition-opacity duration-200"
          style={{
            top: tooltip.y + 15,
            left: tooltip.x + 15,
            fontFamily: "'Space Mono', monospace",
          }}
        >
          {tooltip.content}
        </div>
      )}
      <footer className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-500 z-10">
        © 2024 Benito González Quiñones
      </footer>
    </div>
  );
};

const InteractiveGridBackground = ({ theme = "dark" }) => {
  return null;
  const [centerPos, setCenterPos] = React.useState({ x: -9999, y: -9999 });
  const dotColor = theme === "dark" ? "#00ffff" : theme === "design" ? "#ffffff" : "#cccccc";

  React.useEffect(() => {
    const isMobile =
      window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
      window.innerWidth < 768;

    if (isMobile) {
      const handleOrientation = (event) => {
        const { beta, gamma } = event;
        if (beta === null || gamma === null) return;

        const sensitivity = 3;
        const offsetX =
          (Math.max(-1, Math.min(1, gamma / 45)) * window.innerWidth) /
          sensitivity;
        const offsetY =
          (Math.max(-1, Math.min(1, (beta - 45) / 45)) * window.innerHeight) /
          sensitivity;

        setCenterPos({
          x: window.innerWidth / 2 - offsetX,
          y: window.innerHeight / 2 - offsetY,
        });
      };
      window.addEventListener("deviceorientation", handleOrientation);
      return () =>
        window.removeEventListener("deviceorientation", handleOrientation);
    } else {
      const handleMouseMove = (event) => {
        setCenterPos({ x: event.clientX, y: event.clientY });
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  const memoizedDots = React.useMemo(() => {
    const dots = [];
    const gridSize = 50;
    const numCols = Math.ceil(window.innerWidth / gridSize);
    const numRows = Math.ceil(window.innerHeight / gridSize);

    for (let i = 0; i < numCols; i++) {
      for (let j = 0; j < numRows; j++) {
        const x = i * gridSize;
        const y = j * gridSize;
        const dx = x - centerPos.x;
        const dy = y - centerPos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const maxDist = 250;
        const influence = Math.max(0, 1 - dist / maxDist);

        const displacement = influence * 15;
        const finalX = x - (dx / (dist || 1)) * displacement; // Avoid division by zero
        const finalY = y - (dy / (dist || 1)) * displacement; // Avoid division by zero

        const opacity = (theme === "dark" ? 0.05 : theme === "design" ? 0.2 : 0.2) + influence * 0.4;

        dots.push({
          key: `${i}-${j}`,
          cx: finalX,
          cy: finalY,
          r: 1,
          opacity: opacity,
        });
      }
    }
    return dots;
  }, [centerPos.x, centerPos.y, theme]);

  return (
    <svg className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
      <g>
        {memoizedDots.map((dot) => (
          <circle
            key={dot.key}
            cx={dot.cx}
            cy={dot.cy}
            r={dot.r}
            fill={dotColor}
            fillOpacity={dot.opacity}
            style={{
              transition:
                "cx 0.1s ease-out, cy 0.1s ease-out, fill-opacity 0.1s ease-out",
            }}
          />
        ))}
      </g>
    </svg>
  );
};

const ContactPage = () => {
  const CVSection = ({ title, children }) => (
    <div className="mb-8">
      <h3 className="font-mono text-xl font-bold uppercase tracking-widest text-cyan-400 border-b border-gray-800 pb-2 mb-4">
        {title}
      </h3>
      <div className="text-gray-400">{children}</div>
    </div>
  );
  const CVEntry = ({ title, period, place }) => (
    <div className="mb-3 transition-transform duration-300 group hover:translate-x-2">
      <p className="font-bold text-gray-200 transition-colors duration-300 group-hover:text-white">
        {title}
      </p>
      <p className="text-sm">{period}</p>
      <p className="text-sm text-gray-500">{place}</p>
    </div>
  );
  const PublicationEntry = ({ title, details }) => (
    <div className="mb-3 transition-transform duration-300 group hover:translate-x-2">
      <p className="font-bold text-gray-200 transition-colors duration-300 group-hover:text-white">
        {title}
      </p>
      <p className="text-sm text-gray-500">{details}</p>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-black text-gray-300 animate-fade-in flex flex-col items-center justify-start p-4 relative overflow-auto">
      <InteractiveGridBackground />
      <div className="w-full max-w-6xl mx-auto z-10 relative mt-24 mb-12 px-4 sm:px-8">
        <div className="text-center mb-16 w-full flex flex-col items-center">
          <h1 className="font-mono text-5xl md:text-7xl font-bold tracking-wider uppercase text-white mb-6">
            CONTACTO
          </h1>
          <p className="text-base md:text-lg text-gray-400 mb-10 max-w-xl">
            Para colaboraciones, consultas sobre proyectos o cualquier otra
            pregunta, por favor, póngase en contacto a través del siguiente
            correo electrónico.
          </p>
          <a
            href="mailto:arquitecturabenito@gmail.com"
            className="inline-block text-base md:text-lg font-bold text-cyan-400 border-2 border-cyan-400 px-8 py-3 tracking-widest uppercase transition-all duration-300 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_20px_#00ffff]"
          >
            arquitecturabenito@gmail.com
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-12 lg:gap-x-16">
          <div>
            <CVSection title="Experiencia">
              <CVEntry
                title={
                  <a href="https://madhel.eu/" target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4 decoration-white/50 cursor-pointer">
                    Prácticas en MADHEL
                  </a>
                }
                period="Junio 2026 - Actualidad"
                place="Madrid"
              />
              <CVEntry
                title="Docente en ESMP EPU Fundamentos de la IA en arquitectura"
                period="Junio 2026 - Julio 2026"
                place="Perú, Arequipa"
              />
              <CVEntry
                title={
                  <a href="https://www.fusterarquitectos.es/madrid/" target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4 decoration-white/50 cursor-pointer">
                    Prácticas en FUSTER + NOHALES Arquitectura
                  </a>
                }
                period="Junio 2025 - Septiembre 2025"
                place="Madrid"
              />
              <CVEntry
                title="Becario de profesor de Hª de la arquitectura y el urbanismo"
                period="Septiembre 2024 - Diciembre 2024"
                place="ETSAMadrid (3er curso)"
              />
              <CVEntry
                title="Becario de profesor de Hª del arte y la arquitectura"
                period="Enero 2024 - Mayo 2024"
                place="ETSAMadrid (1er curso)"
              />
              <CVEntry
                title={
                  <a href="https://velzia.com/" target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4 decoration-white/50 cursor-pointer">
                    Contrato en estudio Chapnik Giessen
                  </a>
                }
                period="Julio 2023 - Septiembre 2023"
                place="Madrid (Dep. Renders)"
              />
              <CVEntry
                title="Prácticas de reportaje arquitectónico para CAPA"
                period="Enero 2022"
                place="Madrid"
              />
              <CVEntry
                title="Prácticas de reportaje para Cosentino"
                period="Agosto 2021"
                place="Madrid"
              />
              <CVEntry
                title="Gestión de un voluntariado para la limpieza de playas"
                period="2019 y 2020"
                place="Mar Menor, Murcia"
              />
            </CVSection>
            
          </div>
          <div>
            <CVSection title="Formación y Cursos">
              <CVEntry
                title="Curso Revit+BIM"
                period="Junio 2026"
                place="Universidad Europea"
              />
              <CVEntry
                title="SIHMA II - Seminario de Investigación"
                period="Septiembre 2024 - Febrero 2025"
                place="UPM"
              />
              <CVEntry
                title="IV Congreso de la AHAU - Ciudad y naturaleza"
                period="25 y 26 Octubre 2024"
                place="Monasterio de El Escorial, Madrid"
              />
              <CVEntry
                title="Ciclo formativo Artificial Architectures(AA)"
                period="13, 14 y 15 Noviembre 2024"
                place="ETSAM, UPM"
              />
              <CVEntry
                title="Seminario - Workshop BIP Erasmus+ FoodCity"
                period="Enero 2024 - Febrero 2024"
                place="Prato/Florence"
              />
              <CVEntry
                title="SIHMA I - Seminario de Investigación"
                period="Septiembre 2023 - Febrero 2024"
                place="UPM"
              />
              <CVEntry
                title="V Seminarios de Accesibilidad"
                period="17 Noviembre 2023"
                place=""
              />
              <CVEntry
                title="Curso de Rhinoceros 7"
                period="ETSAM 2021"
                place=""
              />
            </CVSection>
          </div>
          <div>
<CVSection title="Logros">
              <CVEntry
                title="Meta XR Lab, fundador y presidente"
                period="2021 - Actualmente"
                place=""
              />
              <CVEntry
                title="1er premio en el concurso de fotografía: moda y arquitectura"
                period="2021"
                place="CEMEX"
              />
            </CVSection>
            <CVSection title="Publicaciones">
              <PublicationEntry
                title="Maquetas de luz: «Light painting» arquitectónico"
                details="(2025), Madrid"
              />
              <PublicationEntry
                title="El monasterio de El Escorial: una historia medioambiental"
                details="(2024), Madrid, con Eduardo Prieto"
              />
              <PublicationEntry
                title="V de Vigueta n°11"
                details="(2023) Artículo ilustrado"
              />
              <PublicationEntry
                title="Estableciendo “puentes” entre la Universidad y el tejido social madrileño"
                details="(2023), ETSAM, UPM, Madrid"
              />
            </CVSection>
          </div>
        </div>
      </div>
      <footer className="relative text-xs text-gray-500 z-10 text-center py-4">
        © 2024 Benito González Quiñones
      </footer>
    </div>
  );
};

const GalleryView = ({
  filter,
  subcategory,
  onProjectSelect,
  onSubcategorySelect,
  onFilterChange,
}) => {
  const { t, pt } = useTranslation();
  let items = [];
  if (subcategory) {
    items = allProjectsData
      .filter((p) => !p.isPage && p.subcategory === subcategory)
      .map((p) => ({ ...p, isGroup: false }));
  } else if (filter === "all") {
    const addCategoryGroups = (catId, catTitle) => {
      items.push({
        id: `cat-${catId}`,
        title: catTitle,
        isGroup: true,
        type: "category",
        targetCategory: catId,
      });
      const catProjects = allProjectsData.filter((p) => p.category === catId);

      catProjects
        .filter((p) => p.isPage)
        .forEach((p) => {
          items.push({
            id: p.id,
            title: p.title,
            isGroup: true,
            type: "page",
            pageId: p.id,
          });
        });

      catProjects
        .filter((p) => !p.isPage && !p.subcategory)
        .forEach((p) => {
          items.push({ ...p, isGroup: false });
        });

      const subcats = [
        ...new Set(
          catProjects
            .filter((p) => !p.isPage && p.subcategory)
            .map((p) => p.subcategory),
        ),
      ];
      subcats.forEach((sub) => {
        items.push({
          id: `${catId}-${sub}`,
          title: sub,
          isGroup: true,
          type: "subcategory",
          subcategory: sub,
        });
        catProjects
          .filter((p) => !p.isPage && p.subcategory === sub)
          .forEach((p) => {
            items.push({ ...p, isGroup: false });
          });
      });
    };

    addCategoryGroups("architecture", "ARQUITECTURA");
    addCategoryGroups("design", "DISEÑO");
    addCategoryGroups("escenografias", "ESCENOGRAFÍAS");
  } else {
    let filterCat =
      filter === "all"
        ? null
        : filter === "scenography" || filter === "escenografias"
          ? "escenografias"
          : filter;
    const seenSubcategories = new Set();

    allProjectsData.forEach((p) => {
      if (filterCat && p.category !== filterCat) return;

      if (p.isPage) {
        items.push({
          id: p.id,
          title: p.title,
          isGroup: true,
          type: "page",
          pageId: p.id,
        });
      } else if (p.subcategory && !p.isPage) {
        if (!seenSubcategories.has(p.subcategory)) {
          seenSubcategories.add(p.subcategory);
          items.push({
            id: p.subcategory,
            title: p.subcategory,
            isGroup: true,
            type: "subcategory",
            subcategory: p.subcategory,
          });
        }
        items.push({ ...p, isGroup: false });
      } else {
        items.push({ ...p, isGroup: false });
      }
    });
  }

  return (
    <div
      className="w-full h-full overflow-y-auto hide-scrollbar pt-32 pb-24 px-4 sm:px-8 md:px-16"
      style={{ backgroundColor: "transparent" }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
        {items.map((item, index) => {
          const isDesignMode = filter === "design";
          const organicRadii = [
            "rounded-[60%_40%_30%_70%/60%_30%_70%_40%]",
            "rounded-[30%_60%_70%_40%/50%_60%_30%_60%]",
            "rounded-[50%_50%_20%_80%/25%_80%_20%_75%]",
            "rounded-[40%_60%_70%_30%/40%_50%_60%_50%]",
            "rounded-[20%_80%_30%_70%/50%_40%_60%_40%]"
          ];
          const randomRadius = organicRadii[index % organicRadii.length];
          const designBorder = index % 2 === 0 ? "border-[#FF0000]" : "border-[#FFCC00]";
          const designColorGroup = isDesignMode ? `border-[3px] bg-black/40 ${randomRadius} ${designBorder}` : "";
          
          if (item.isGroup) {
            const isMainCategory = item.type === "category";
            const shapeClass = isDesignMode 
              ? designColorGroup 
              : isMainCategory
              ? "rounded-none border-2 sm:border-4 border-white/70 bg-white/5"
              : "rounded-full border border-white/10 bg-white/5";

            return (
              <div
                key={item.id}
                className={`group relative cursor-pointer flex items-center justify-center hover:bg-white/10 hover:border-cyan-400/50 hover:scale-105 backdrop-blur-md transition-all duration-300 w-full aspect-square shadow-lg flex-col p-4 sm:p-6 ${shapeClass}`}
                onClick={() => {
                  if (item.type === "page") {
                    onProjectSelect(item.pageId, true);
                  } else if (item.type === "category") {
                    if (onFilterChange) onFilterChange(item.targetCategory);
                  } else {
                    if (onSubcategorySelect)
                      onSubcategorySelect(item.subcategory);
                  }
                }}
              >
                {!isMainCategory && (
                  <>
                    <div className="absolute inset-[-1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-center overflow-visible">
                      <svg
                        className="w-full h-full origin-center animate-spin"
                        viewBox="0 0 100 100"
                        style={{ animationDuration: "3s" }}
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="49"
                          fill="none"
                          stroke="transparent"
                          strokeWidth="1"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="49"
                          fill="none"
                          stroke={isDesignMode ? "rgba(255, 0, 0, 0.8)" : "rgba(34, 211, 238, 0.8)"}
                          strokeWidth={isDesignMode ? "3" : "1"}
                          strokeDasharray="30 400"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </>
                )}
                <h3
                  className={`text-center uppercase font-serif font-bold text-base sm:text-lg md:text-xl lg:text-2xl tracking-wider leading-tight px-3 sm:px-6 select-none transition-colors duration-300 relative z-10 ${isDesignMode ? "text-[#FFCC00] group-hover:text-[#FF0000]" : "text-white/95 group-hover:text-cyan-400"}`}
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {pt(item, "title")}
                </h3>
              </div>
            );
          }

          return (
            <div
              key={item.id}
              className={`group relative cursor-pointer transition-all duration-300 flex flex-col items-center justify-center aspect-square ${isDesignMode ? "p-4 " + designColorGroup + " hover:bg-[#0000ff]/20" : "border border-dashed border-gray-700 hover:border-white hover:bg-gray-900/50 p-2"}`}
              onClick={() => onProjectSelect(item.id)}
            >
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full border border-gray-400 group-hover:border-white transition-colors bg-black/50"></div>
              {item.normalImage && (
                <div className={`absolute ${isDesignMode ? "inset-3 sm:inset-5 " + randomRadius : "inset-2 sm:inset-3"} overflow-hidden grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-500 pointer-events-none`}>
                  <OptimizedImage
                    src={item.normalImage}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    containerClassName="w-full h-full"
                    theme={isDesignMode ? "design" : "dark"}
                  />
                </div>
              )}
              <div className={`absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 bg-black/70 backdrop-blur-sm pt-1 pb-1.5 z-10 ${isDesignMode ? "border-none rounded-full" : "border-t border-gray-800"} pointer-events-none`}>
                <h3 className={`text-center font-mono text-[9px] sm:text-xs tracking-widest uppercase transition-colors truncate px-1 ${isDesignMode ? "text-[#FFCC00] group-hover:text-[#FF0000] font-bold" : "text-gray-300 group-hover:text-white"}`}>
                  {pt(item, "title")}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CarteleriaPage = ({ project }) => {
  const { t, pt } = useTranslation();
  const [modalImage, setModalImage] = React.useState(null);

  if (!project) return null;

  const openModal = (imgSrc) => setModalImage(imgSrc);
  const closeModal = () => setModalImage(null);

  return (
    <div className="w-full min-h-screen bg-black text-white animate-fade-in relative overflow-y-auto">
      <InteractiveGridBackground theme="dark" />
      <main className="max-w-6xl mx-auto z-10 relative pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-6xl font-bold font-mono uppercase tracking-wider text-white mb-16 text-center">
          {pt(project, "title")}
        </h1>

        <div className="mb-16">
          <h2 className="text-3xl font-bold uppercase tracking-wider mb-6 text-white">
            Descripción
          </h2>
          <div className="border-l-2 border-cyan-400 pl-6">
            <p className="text-gray-400 leading-relaxed">
              {pt(project, "description")}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold uppercase tracking-wider mb-6 text-white">
            Galería de Carteles
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {project.posterImages &&
              project.posterImages.map((src, index) => (
                <div
                  key={index}
                  className="group cursor-pointer"
                  onClick={() => openModal(src)}
                >
                  <OptimizedImage
                    src={src}
                    alt={`Cartel ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-cover transition-transform duration-300 transform group-hover:scale-105 rounded-md shadow-lg"
                  />
                </div>
              ))}
          </div>
        </div>
      </main>

      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeModal}
        >
          <OptimizedImage
            src={modalImage}
            alt="Vista ampliada del cartel"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-gray-300"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

const AIStudioPage = () => {
  const { t } = useTranslation();
  const [activeTool, setActiveTool] = React.useState("intro");

  const LinkEntry = ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center space-x-2 text-cyan-400 hover:text-white transition-colors duration-300"
    >
      <span>{children}</span>
      <svg
        stroke="currentColor"
        fill="none"
        strokeWidth="0"
        viewBox="0 0 15 15"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
          fill="currentColor"
        ></path>
      </svg>
    </a>
  );

  const Section = ({ title, children }) => (
    <div className="mb-12">
      <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider mb-6 text-white border-b border-cyan-900/50 pb-2">
        {title}
      </h2>
      <div className="">{children}</div>
    </div>
  );

  const SubSection = ({ title, children }) => (
    <div className="mb-8 p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
      <h3 className="text-xl font-bold font-mono tracking-wider mb-4 text-cyan-400">
        {title}
      </h3>
      <div className="text-gray-300 space-y-4">{children}</div>
    </div>
  );

  const ToolTab = ({ id, label, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-4 py-2 font-mono text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 border-b-2 ${
        active
          ? "border-cyan-400 text-cyan-400"
          : "border-transparent text-gray-500 hover:text-gray-300"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="w-full min-h-screen bg-black text-gray-300 animate-fade-in pb-12 relative overflow-auto">
      <InteractiveGridBackground />

      <div className="max-w-5xl mx-auto z-10 relative px-4 sm:px-8">
        <header className="pt-24 pb-12 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold font-mono uppercase tracking-tighter text-white mb-4">
            TUTORIAL IA
          </h1>
          <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase">
            Arquitectura, Diseño y Herramientas Generativas
          </p>
        </header>

        <nav className="flex justify-center flex-wrap gap-2 mb-12 border-b border-white/10 sticky top-0 bg-black/80 backdrop-blur-md z-20 py-2">
          <ToolTab
            id="intro"
            label={t("Introducción")}
            active={activeTool === "intro"}
            onClick={setActiveTool}
          />
          <ToolTab
            id="foocus"
            label={t("Foocus")}
            active={activeTool === "foocus"}
            onClick={setActiveTool}
          />
          <ToolTab
            id="comfy"
            label={t("Comfy UI")}
            active={activeTool === "comfy"}
            onClick={setActiveTool}
          />
          <ToolTab
            id="webui"
            label={t("Web UI")}
            active={activeTool === "webui"}
            onClick={setActiveTool}
          />
        </nav>

        <main className="animate-fade-in-up">
          {activeTool === "intro" && (
            <div className="space-y-12">
              <Section title="Bienvenidos al Curso">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6 text-lg leading-relaxed">
                    <p>
                      En este curso exploraremos cómo la{" "}
                      <span className="text-white font-bold">
                        Inteligencia Artificial
                      </span>{" "}
                      está transformando el flujo de trabajo en arquitectura y
                      diseño.
                    </p>
                    <p>
                      No se trata solo de generar imágenes, sino de entender
                      cómo usar estas herramientas para potenciar nuestra
                      creatividad y optimizar procesos de ideación.
                    </p>
                    <div className="p-4 bg-cyan-900/20 border-l-4 border-cyan-400 rounded-r-lg">
                      <p className="text-sm italic text-cyan-200">
                        "La IA no reemplaza al diseñador, el diseñador que usa
                        IA reemplaza al que no la usa."
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                      <OptimizedImage
                        src="imagenes/gif-animacion-ia.gif"
                        alt="IA Concept"
                        className="relative rounded-lg shadow-2xl w-full max-w-sm border border-white/10"
                      />
                    </div>
                  </div>
                </div>
              </Section>

              <Section title="Nuestras Herramientas">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div
                    className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                    onClick={() => setActiveTool("foocus")}
                  >
                    <h3 className="text-cyan-400 font-bold mb-2">FOOCUS</h3>
                    <p className="text-sm text-gray-400">
                      Poder absoluto con simplicidad. Ideal para resultados
                      rápidos de alta calidad.
                    </p>
                  </div>
                  <div
                    className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                    onClick={() => setActiveTool("comfy")}
                  >
                    <h3 className="text-cyan-400 font-bold mb-2">COMFY UI</h3>
                    <p className="text-sm text-gray-400">
                      Flujos de trabajo basados en nodos. Control total y
                      personalización granular.
                    </p>
                  </div>
                  <div
                    className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                    onClick={() => setActiveTool("webui")}
                  >
                    <h3 className="text-cyan-400 font-bold mb-2">WEB UI</h3>
                    <p className="text-sm text-gray-400">
                      El estándar de la comunidad. Versátil y compatible con
                      miles de extensiones.
                    </p>
                  </div>
                </div>
              </Section>

              <Section title="Conceptos Clave">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gray-900/50 rounded-xl border border-white/10">
                    <h3 className="text-cyan-400 font-bold mb-3 flex items-center gap-2">
                      <span className="text-xl">📝</span> Prompts (Positivo y
                      Negativo)
                    </h3>
                    <p className="text-sm text-gray-400">
                      Es el texto que usamos para comunicarnos con la IA. El{" "}
                      <span className="text-white font-bold">Positivo</span>{" "}
                      describe lo que queremos ver, mientras que el{" "}
                      <span className="text-white font-bold">Negativo</span> le
                      indica qué elementos o defectos debe evitar.
                    </p>
                  </div>

                  <div className="p-6 bg-gray-900/50 rounded-xl border border-white/10">
                    <h3 className="text-cyan-400 font-bold mb-3 flex items-center gap-2">
                      <span className="text-xl">⚙️</span> Preprocesador
                    </h3>
                    <p className="text-sm text-gray-400">
                      Herramienta que analiza una imagen base (ej. un croquis o
                      render sin materiales) para extraer información
                      geométrica, como bordes (Canny/Lineart) o profundidad
                      (Depth), antes de pasársela a la IA.
                    </p>
                  </div>

                  <div className="p-6 bg-gray-900/50 rounded-xl border border-white/10">
                    <h3 className="text-cyan-400 font-bold mb-3 flex items-center gap-2">
                      <span className="text-xl">⚖️</span> Weight (Peso)
                    </h3>
                    <p className="text-sm text-gray-400">
                      Determina la influencia de una imagen de referencia o
                      ControlNet sobre la generación final. Un peso de 1.0
                      obliga a la IA a respetar la forma al máximo, mientras que
                      0.3 le da más libertad creativa.
                    </p>
                  </div>

                  <div className="p-6 bg-gray-900/50 rounded-xl border border-white/10">
                    <h3 className="text-cyan-400 font-bold mb-3 flex items-center gap-2">
                      <span className="text-xl">🧠</span> Denoising Strength
                    </h3>
                    <p className="text-sm text-gray-400">
                      En procesos de modificación (Image-to-Image o Inpainting),
                      define cuánto se alterará la imagen original. Valores
                      bajos (0.2-0.4) cambian sutilmente texturas; valores altos
                      (0.7-1.0) rediseñan por completo.
                    </p>
                  </div>

                  <div className="p-6 bg-gray-900/50 rounded-xl border border-white/10 md:col-span-2">
                    <h3 className="text-cyan-400 font-bold mb-3 flex items-center gap-2">
                      <span className="text-xl">✨</span> Otros Parámetros
                      Importantes
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm mt-4">
                      <div>
                        <strong className="text-white block mb-1">
                          Checkpoint / Modelo Base:
                        </strong>
                        <span className="text-gray-400">
                          Es el "cerebro". Contiene todo el conocimiento visual
                          preentrenado (ej. SDXL, SD 1.5).
                        </span>
                      </div>
                      <div>
                        <strong className="text-white block mb-1">
                          Steps (Pasos):
                        </strong>
                        <span className="text-gray-400">
                          Iteraciones que realiza la IA para limpiar el ruido y
                          generar detalles. Lo normal es entre 20 y 30.
                        </span>
                      </div>
                      <div>
                        <strong className="text-white block mb-1">
                          CFG Scale:
                        </strong>
                        <span className="text-gray-400">
                          Qué tanto caso le hace la IA a tu prompt frente a su
                          propia "imaginación" (valores comunes: 5 a 7).
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Section>

              <Section title="Conceptos Avanzados">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-cyan-900/10 rounded-xl border border-cyan-800/30">
                    <h3 className="text-cyan-400 font-bold mb-3 flex items-center gap-2">
                      <span className="text-xl">🧬</span> LoRA (Low-Rank
                      Adaptation)
                    </h3>
                    <p className="text-sm text-gray-400">
                      Son "micro-modelos" que se añaden al modelo principal para
                      enseñarle conceptos muy específicos sin tener que
                      reentrenar todo desde cero. En arquitectura, se usan para
                      inyectar estilos de arquitectos concretos (ej. Zaha
                      Hadid), materiales específicos (hormigón visto perfecto) o
                      tipos concretos de vegetación.
                    </p>
                  </div>

                  <div className="p-6 bg-cyan-900/10 rounded-xl border border-cyan-800/30">
                    <h3 className="text-cyan-400 font-bold mb-3 flex items-center gap-2">
                      <span className="text-xl">🕸️</span> ControlNet Superior
                    </h3>
                    <p className="text-sm text-gray-400">
                      A diferencia del Image-to-Image tradicional, ControlNet
                      usa mapas precisos para "obligar" a la IA a respetar un
                      dibujo espacial. Existen varios tipos clave:{" "}
                      <span className="text-white font-bold">
                        Canny/Lineart
                      </span>{" "}
                      (para trazos),{" "}
                      <span className="text-white font-bold">Depth</span> (para
                      mapas de profundidad extraídos de 3D) y{" "}
                      <span className="text-white font-bold">MLSD</span>{" "}
                      (especializado en líneas rectas y fugas de arquitectura).
                    </p>
                  </div>

                  <div className="p-6 bg-cyan-900/10 rounded-xl border border-cyan-800/30">
                    <h3 className="text-cyan-400 font-bold mb-3 flex items-center gap-2">
                      <span className="text-xl">🔍</span> Upscaling (Escalado
                      Latente)
                    </h3>
                    <p className="text-sm text-gray-400">
                      La IA genera de forma óptima a resoluciones medias (ej.
                      1024x1024). Para renders de presentación 4K, usamos
                      algoritmos de escalado (Ultimate SD Upscale, ControlNet
                      Tile) que no se limitan a agrandar los píxeles, sino que
                      "alucinan" e insertan detalles arquitectónicos finos
                      (juntas, texturas, hojas) en alta resolución.
                    </p>
                  </div>

                  <div className="p-6 bg-cyan-900/10 rounded-xl border border-cyan-800/30">
                    <h3 className="text-cyan-400 font-bold mb-3 flex items-center gap-2">
                      <span className="text-xl">🌱</span> Seed (Semilla de
                      Ruido)
                    </h3>
                    <p className="text-sm text-gray-400">
                      Todo proceso generativo empieza con ruido aleatorio, y la
                      "Seed" es el número que define exactamente ese ruido. Si
                      usas el mismo Prompt, Ajustes y la misma Seed, obtendrás
                      el mismo resultado. Es la técnica clave para hacer cambios
                      sutiles sin que todo el edificio cambie de composición al
                      volver a darle a Generar.
                    </p>
                  </div>
                </div>
              </Section>

              <Section title="ControlNet: Tipos y Modelos">
                <div className="space-y-6 text-sm text-gray-400 leading-relaxed">
                  <p>
                    ControlNet es una arquitectura de red neuronal que permite
                    controlar espacialmente grandes modelos de difusión mediante
                    mapas precisos. Aquí se explican los tipos más importantes:
                  </p>

                  <div className="space-y-4">
                    <h4 className="text-white font-bold text-base border-b border-white/10 pb-2">
                      1. Detección de Bordes y Contornos
                    </h4>
                    <ul className="space-y-3">
                      <li>
                        <strong className="text-cyan-400">Canny:</strong>{" "}
                        Utiliza el algoritmo homónimo para extraer contornos
                        precisos de una imagen. Es ideal para replicar la
                        estructura exacta de un objeto, un vehículo o una
                        persona.
                      </li>
                      <li>
                        <strong className="text-cyan-400">Lineart:</strong>{" "}
                        Transforma una imagen en un dibujo de líneas limpias
                        tipo arte lineal.
                      </li>
                      <li>
                        <strong className="text-cyan-400">Scribble:</strong>{" "}
                        Funciona a partir de bocetos y garabatos básicos,
                        permitiendo que la IA interprete dibujos simples y los
                        convierta en imágenes fotorrealistas.
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-white font-bold text-base border-b border-white/10 pb-2">
                      2. Estructura y Composición
                    </h4>
                    <ul className="space-y-3">
                      <li>
                        <strong className="text-cyan-400">OpenPose:</strong>{" "}
                        Detecta y localiza las articulaciones, el rostro y las
                        manos de los sujetos humanos en la imagen de control.
                        Garantiza que los personajes generados mantengan
                        exactamente la misma postura.
                      </li>
                      <li>
                        <strong className="text-cyan-400">Depth:</strong> Genera
                        un mapa en escala de grises que representa la distancia
                        de los elementos en la escena (objetos cercanos en
                        blanco, fondos lejanos en oscuro). Sirve para mantener
                        la composición 3D y el espacio.
                      </li>
                      <li>
                        <strong className="text-cyan-400">Normal Map:</strong>{" "}
                        Extrae información de las texturas, luces y relieves,
                        preservando la orientación y volumen exacto de los
                        objetos.
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-white font-bold text-base border-b border-white/10 pb-2">
                      3. Modificaciones Avanzadas y Reescalado
                    </h4>
                    <ul className="space-y-3">
                      <li>
                        <strong className="text-cyan-400">
                          Tile (Desenfoque):
                        </strong>{" "}
                        Analiza la imagen original por fragmentos (tiles) para
                        realizar ampliaciones de alta resolución (upscaling)
                        añadiendo detalles sin cambiar la estructura.
                      </li>
                      <li>
                        <strong className="text-cyan-400">
                          Seg (Segmentation):
                        </strong>{" "}
                        Crea un mapa de colores donde cada color representa un
                        elemento semántico (ej. azul para el cielo, rojo para el
                        coche, verde para el césped). Es ideal para
                        reestructurar escenarios respetando la composición.
                      </li>
                      <li>
                        <strong className="text-cyan-400">Reference:</strong>{" "}
                        Utiliza el color, la composición y el estilo directo de
                        una imagen de referencia sin necesidad de extraer un
                        mapa geométrico previo.
                      </li>
                      <li>
                        <strong className="text-cyan-400">
                          Modelos Union:
                        </strong>{" "}
                        Son modelos avanzados (como Union Pro) que agrupan
                        varias de estas funciones en un solo modelo, permitiendo
                        alternar entre modos como Canny, Depth o Pose sin tener
                        que cargar un modelo distinto para cada uno.
                      </li>
                    </ul>
                  </div>
                </div>
              </Section>

              <Section title="Otros Conceptos Clave">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-cyan-900/10 rounded-xl border border-cyan-800/30">
                    <h3 className="text-cyan-400 font-bold mb-3 flex items-center gap-2">
                      <span className="text-xl">🎛️</span> KSampler
                    </h3>
                    <p className="text-sm text-gray-400">
                      El KSampler (o simplemente Sampler) es el algoritmo
                      encargado de guiar el proceso de "denoising" (eliminación
                      de ruido) paso a paso. Define la estrategia matemática que
                      usa la IA para ir desde el ruido inicial hasta la imagen
                      final. Diferentes samplers (como Euler a, DPM++ 2M Karras,
                      o LMS) ofrecen resultados ligeramente diferentes en
                      términos de texturas, suavidad y velocidad.
                    </p>
                  </div>

                  <div className="p-6 bg-cyan-900/10 rounded-xl border border-cyan-800/30">
                    <h3 className="text-cyan-400 font-bold mb-3 flex items-center gap-2">
                      <span className="text-xl">🎨</span> VAE (Variational
                      Autoencoder)
                    </h3>
                    <p className="text-sm text-gray-400">
                      El VAE actúa como el traductor de color y luz de la
                      imagen. Es el componente final encargado de decodificar la
                      información que la IA ha procesado en su "espacio latente"
                      (donde hace los cálculos) para convertirla en píxeles
                      visibles. Un buen VAE asegura que la imagen tenga colores
                      vibrantes, negros profundos y evite el aspecto lavado o
                      grisáceo.
                    </p>
                  </div>
                </div>
              </Section>
            </div>
          )}

          {activeTool === "foocus" && (
            <div className="space-y-8">
              <Section title="Tutorial FOOOCUS">
                <div className="mb-8">
                  <p className="mb-4">
                    Fooocus es un rediseño de Stable Diffusion centrado en la
                    calidad y la facilidad de uso.
                  </p>
                  <LinkEntry href="https://colab.research.google.com/github/lllyasviel/Fooocus/blob/main/fooocus_colab.ipynb">
                    Abrir en Google Colab
                  </LinkEntry>
                </div>

                <div className="space-y-16">
                  <SubSection title="1. INICIAR FOOOCUS">
                    <p>
                      Ejecuta la celda en Colab y espera a que aparezca el
                      enlace "gradio.live".
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <OptimizedImage
                        src="imagenes/focus 1.png"
                        alt="Paso 1"
                        className="rounded-lg border border-white/10"
                      />
                      <OptimizedImage
                        src="imagenes/focus 2.png"
                        alt="Paso 2"
                        className="rounded-lg border border-white/10"
                      />
                    </div>
                  </SubSection>

                  <SubSection title="2. GENERAR CON TEXTO">
                    <p>
                      Escribe tu prompt en la caja inferior y pulsa "Generate".
                    </p>
                    <OptimizedImage
                      src="imagenes/focus 3.png"
                      alt="Text to Image"
                      className="rounded-lg border border-white/10 w-full"
                    />
                  </SubSection>

                  <SubSection title="3. IMÁGENES DE REFERENCIA">
                    <p>
                      Usa "Input Image" para guiar la generación con una
                      estructura o estilo previo.
                    </p>
                    <div className="space-y-4">
                      <OptimizedImage
                        src="imagenes/focus 4.png"
                        alt="Ref 1"
                        className="rounded-lg border border-white/10 w-full"
                      />
                      <OptimizedImage
                        src="imagenes/focus 5.png"
                        alt="Ref 2"
                        className="rounded-lg border border-white/10 w-full"
                      />
                    </div>
                  </SubSection>

                  <SubSection title="4. INPAINTING">
                    <p>
                      Pinta sobre las zonas que quieras modificar de una imagen
                      existente.
                    </p>
                    <OptimizedImage
                      src="imagenes/focus 6.png"
                      alt="Inpaint"
                      className="rounded-lg border border-white/10 w-full"
                    />
                  </SubSection>

                  <SubSection title="5. AJUSTES AVANZADOS">
                    <p>
                      Controla el aspect ratio, número de imágenes y estilos
                      artísticos.
                    </p>
                    <OptimizedImage
                      src="imagenes/focus 7.png"
                      alt="Ajustes"
                      className="rounded-lg border border-white/10 w-full"
                    />
                  </SubSection>
                </div>
              </Section>
            </div>
          )}

          {activeTool === "comfy" && (
            <div className="space-y-8">
              <Section title="Tutorial ComfyUI">
                <div className="mb-8">
                  <p className="mb-4">
                    ComfyUI utiliza un sistema de nodos que permite visualizar y
                    entender exactamente cómo se procesa la imagen.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <LinkEntry href="https://comfy.org/cloud/">
                      Comfy Cloud
                    </LinkEntry>
                    <LinkEntry href="https://comfyui-wiki.com/es/tutorial/basic/creating-your-first-image-by-the-first-time">
                      Tutorial Básico Oficial
                    </LinkEntry>
                  </div>
                </div>

                <div className="space-y-12">
                  <SubSection title="1. El Lenguaje del Arquitecto (Prompting)">
                    <p className="mb-4">
                      El primer paso es aprender a "hablarle" a la IA para
                      obtener resultados espaciales coherentes.
                    </p>
                    <div className="space-y-6">
                      <div className="bg-gray-900/50 p-4 rounded-lg border border-cyan-900/30">
                        <h4 className="text-green-400 font-bold mb-2">
                          Prompt Positivo
                        </h4>
                        <p className="text-sm mb-2">
                          Debe seguir una jerarquía:
                        </p>
                        <code className="block bg-black/50 p-3 rounded text-sm text-cyan-200 mb-2">
                          [Sujeto arquitectónico] + [Estilo/Arquitecto] +
                          [Materiales] + [Iluminación] + [Calidad de render]
                        </code>
                        <p className="text-sm italic text-gray-400">
                          <span className="font-bold text-gray-300">
                            Ejemplo:
                          </span>{" "}
                          "Modernist pavilion in Arequipa, sillar stone walls,
                          large glass windows, sunset lighting, cinematic
                          photography, 8k."
                        </p>
                      </div>

                      <div className="bg-gray-900/50 p-4 rounded-lg border border-red-900/30">
                        <h4 className="text-red-400 font-bold mb-2">
                          Prompt Negativo
                        </h4>
                        <p className="text-sm mb-2">
                          Filtra lo que no queremos.
                        </p>
                        <p className="text-sm italic text-gray-400">
                          <span className="font-bold text-gray-300">
                            Básico:
                          </span>{" "}
                          "low quality, blurry, deformed architecture, messy
                          layout, unrealistic shadows."
                        </p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <div className="relative group overflow-hidden rounded-lg border border-white/10">
                        <OptimizedImage
                          src="imagenes/tutorialcomfy1.png"
                          alt="Ejemplo de Prompting"
                          className="w-full h-auto object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-center pointer-events-none">
                          <p className="text-cyan-400 font-mono text-sm border border-cyan-400/50 p-3 rounded bg-black/50">
                            💡 Arrastra esta imagen a ComfyUI para cargar este
                            flujo de trabajo automáticamente
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        Flujo básico de Text-to-Image. Arrastra la imagen a
                        ComfyUI.
                      </p>
                    </div>
                  </SubSection>

                  <SubSection title="2. ControlNet: El Respeto a la Geometría">
                    <p className="mb-4">
                      Para un estudiante de arquitectura, la IA no debe ser
                      aleatoria; debe seguir su dibujo. Usaremos el modelo Canny
                      o Lineart.
                    </p>
                    <ul className="list-none space-y-4 text-sm mb-6">
                      <li className="flex items-start">
                        <span className="text-cyan-400 font-bold w-32 shrink-0">
                          Cargar Imagen:
                        </span>
                        <span className="text-gray-300">
                          Sube un boceto a mano alzada o un dibujo técnico
                          simple.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-cyan-400 font-bold w-32 shrink-0">
                          Pre-procesador:
                        </span>
                        <span className="text-gray-300">
                          Selecciona{" "}
                          <strong className="text-white">Canny</strong> para
                          detectar bordes precisos.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-cyan-400 font-bold w-32 shrink-0">
                          Peso (Weight):
                        </span>
                        <span className="text-gray-300">
                          Ajusta a <strong className="text-white">1.0</strong>{" "}
                          para que la IA siga fielmente tu dibujo.
                        </span>
                      </li>
                      <li className="flex items-start bg-cyan-900/20 p-3 rounded border border-cyan-800/30 mt-2">
                        <span className="text-cyan-300 font-bold w-32 shrink-0">
                          Resultado:
                        </span>
                        <span className="text-cyan-100">
                          La IA generará materiales y luces sobre tu propia
                          volumetría, no sobre una inventada.
                        </span>
                      </li>
                    </ul>
                    <div className="mt-6">
                      <div className="relative group overflow-hidden rounded-lg border border-white/10">
                        <OptimizedImage
                          src="imagenes/tutorialcomfy2.png"
                          alt="Ejemplo de ControlNet"
                          className="w-full h-auto object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-center pointer-events-none">
                          <p className="text-cyan-400 font-mono text-sm border border-cyan-400/50 p-3 rounded bg-black/50">
                            💡 Arrastra esta imagen a ComfyUI para cargar este
                            flujo de trabajo automáticamente
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        Flujo con ControlNet Canny. Arrastra la imagen a
                        ComfyUI.
                      </p>
                    </div>
                  </SubSection>

                  <SubSection title="3. Inpaint: Edición Quirúrgica">
                    <p className="mb-4">
                      ¿Qué pasa si el edificio es perfecto pero la ventana no te
                      gusta? No hay que generar todo de nuevo.
                    </p>
                    <div className="space-y-4 text-sm mb-6">
                      <div className="bg-gray-900 p-4 rounded-lg flex flex-col gap-2">
                        <h4 className="text-white font-bold flex items-center gap-2">
                          <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                          Herramienta Máscara
                        </h4>
                        <p className="text-gray-400">
                          Pinta sobre la zona específica que deseas cambiar (ej.
                          cambiar una puerta de madera por una de metal).
                        </p>
                      </div>

                      <div className="bg-gray-900 p-4 rounded-lg">
                        <h4 className="text-white font-bold mb-3">
                          Denoising Strength
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="border border-white/10 p-3 rounded">
                            <span className="text-cyan-400 font-mono font-bold block mb-1">
                              0.4 - 0.5
                            </span>
                            <span className="text-gray-400">
                              Cambios sutiles que respetan la forma original.
                            </span>
                          </div>
                          <div className="border border-white/10 p-3 rounded">
                            <span className="text-red-400 font-mono font-bold block mb-1">
                              0.7 - 0.8
                            </span>
                            <span className="text-gray-400">
                              Cambios drásticos (permite a la IA rediseñar esa
                              zona por completo).
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <div className="relative group overflow-hidden rounded-lg border border-white/10">
                        <OptimizedImage
                          src="imagenes/tutorialcomfy3.png"
                          alt="Ejemplo de Inpaint"
                          className="w-full h-auto object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-center pointer-events-none">
                          <p className="text-cyan-400 font-mono text-sm border border-cyan-400/50 p-3 rounded bg-black/50">
                            💡 Arrastra esta imagen a ComfyUI para cargar este
                            flujo de trabajo automáticamente
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        Flujo de Inpainting. Arrastra la imagen a ComfyUI.
                      </p>
                    </div>
                  </SubSection>
                </div>
              </Section>
            </div>
          )}

          {activeTool === "webui" && (
            <div className="space-y-8">
              <Section title="Tutorial Web UI (A1111)">
                <div className="mb-8">
                  <p className="mb-4">
                    Stable Diffusion Web UI (Automatic1111) es la interfaz más
                    popular y con mayor ecosistema de extensiones.
                  </p>
                  <LinkEntry href="https://github.com/AUTOMATIC1111/stable-diffusion-webui">
                    Repositorio en GitHub
                  </LinkEntry>
                </div>

                <div className="space-y-12">
                  <SubSection title="INTERFAZ PRINCIPAL">
                    <ol className="list-decimal pl-5 space-y-4">
                      <li>
                        <span className="text-white font-bold">
                          Checkpoint Selection:
                        </span>{" "}
                        Arriba a la izquierda, elige tu modelo.
                      </li>
                      <li>
                        <span className="text-white font-bold">
                          txt2img Tab:
                        </span>{" "}
                        La pestaña principal para generar desde texto.
                      </li>
                      <li>
                        <span className="text-white font-bold">Prompts:</span>{" "}
                        El cuadro superior es para lo que quieres ver. El
                        inferior para lo que NO quieres (Negative Prompt).
                      </li>
                      <li>
                        <span className="text-white font-bold">Sampling:</span>{" "}
                        "DPM++ 2M Karras" es una opción excelente y rápida.
                      </li>
                      <li>
                        <span className="text-white font-bold">Generate:</span>{" "}
                        Pulsa el gran botón naranja.
                      </li>
                    </ol>
                  </SubSection>

                  <SubSection title="CONTROLNET">
                    <p>
                      La herramienta más potente para arquitectos. Permite
                      calcar la geometría de un dibujo, una foto o un render
                      previo para aplicarle nuevos materiales o estilos.
                    </p>
                    <div className="p-4 bg-cyan-900/10 border border-cyan-800/30 rounded-lg">
                      <p className="text-sm">
                        En el curso nos enfocaremos especialmente en los modelos{" "}
                        <span className="text-cyan-400">Canny</span> y{" "}
                        <span className="text-cyan-400">MLSD</span> para control
                        de líneas arquitectónicas.
                      </p>
                    </div>
                  </SubSection>
                </div>
              </Section>
            </div>
          )}
        </main>
      </div>

      <footer className="relative text-xs text-gray-600 z-10 text-center py-12 mt-12 border-t border-white/5">
        © 2024 Benito González Quiñones · Workshop IA & Arquitectura
      </footer>
    </div>
  );
};

const ImageCarousel = ({ images, title }) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-8 relative">
      <h2 className="text-3xl font-bold uppercase tracking-wider mb-6 text-white text-center">{t("Galería")}</h2>
      <div className="relative h-[60vh] rounded-lg overflow-hidden shadow-2xl shadow-cyan-500/10 mb-4 bg-black/50">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
          >
            <OptimizedImage
              src={img}
              alt={`${title} - Imagen ${index + 1}`}
              className="w-full h-full object-contain"
              containerClassName="w-full h-full"
            />
          </div>
        ))}
        <button
          onClick={goToPrevious}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/70 transition-all z-10 backdrop-blur-sm"
          aria-label="Imagen anterior"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/70 transition-all z-10 backdrop-blur-sm"
          aria-label="Siguiente imagen"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        <div className="absolute bottom-4 right-4 bg-black/50 text-white text-sm px-3 py-1 rounded-full font-mono z-10 backdrop-blur-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
      <div className="flex justify-center p-2 space-x-2 overflow-x-auto">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="flex-shrink-0"
          >
            <OptimizedImage
              src={img}
              alt={`Miniatura ${index + 1}`}
              className={`w-20 h-14 object-cover rounded-md transition-all border-2 ${currentIndex === index ? "border-cyan-400 scale-110" : "border-transparent opacity-60 hover:opacity-100"}`}
              containerClassName="w-20 h-14 rounded-md"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

const WebDesignPage = () => {
  const webs = [
    { url: "https://inter-easy.vercel.app/", title: "Inter Easy" },
    { url: "https://doca.aq.upm.es/", title: "DOCA UPM" },
    { url: "https://archigloss.vercel.app/", title: "Archigloss" },
  ];

  return (
    <div className="w-full min-h-screen bg-black text-gray-300 animate-fade-in overflow-y-auto">
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 pt-32 pb-16">
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-light font-mono text-white tracking-widest uppercase mb-4">
            DISEÑO WEB
          </h1>
          <div className="h-[1px] w-24 bg-red-500 mb-8"></div>
          <p className="text-lg md:text-xl font-mono text-gray-400 max-w-2xl leading-relaxed">
            Exploración y desarrollo de interfaces digitales. Sitios web
            diseñados y desarrollados a medida, priorizando la experiencia de
            usuario y una estética limpia y funcional.
          </p>
        </div>

        <div className="flex flex-col gap-24">
          {webs.map((site, index) => (
            <div key={index} className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-800 pb-4">
                <h2 className="text-2xl font-mono uppercase tracking-widest text-white">
                  {site.title}
                </h2>
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-white transition-colors"
                >
                  Visitar sitio web
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
              <div className="w-full h-[70vh] min-h-[500px] border border-gray-800 rounded-lg overflow-hidden relative group bg-white shadow-2xl">
                <iframe
                  src={site.url}
                  title={site.title}
                  className="w-full h-full border-none opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 pointer-events-none group-hover:bg-transparent bg-black/5 transition-colors duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-black text-gray-600 text-center p-6 mt-12 border-t border-gray-900 z-10 relative">
        <p className="text-xs font-mono">
          © 2024 Benito González Quiñones - Todos los derechos reservados -
          arquitecturabenito@gmail.com
        </p>
      </footer>
    </div>
  );
};

const HorizontalImageCarousel = ({ media, isDarkTheme }) => {
  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount =
        direction === "left"
          ? -window.innerWidth * 0.8
          : window.innerWidth * 0.8;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full overflow-hidden my-12 group">
      <div className="absolute left-2 sm:left-6 top-1/2 transform -translate-y-1/2 z-20 transition-opacity duration-300">
        <button
          onClick={() => scroll("left")}
          className={`p-3 rounded-full shadow-lg border ${isDarkTheme ? "bg-black/50 border-gray-700 text-white hover:bg-gray-800" : "bg-white/50 border-gray-300 text-black hover:bg-white"} backdrop-blur-sm transition-all`}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>
      <div className="absolute right-2 sm:right-6 top-1/2 transform -translate-y-1/2 z-20 transition-opacity duration-300">
        <button
          onClick={() => scroll("right")}
          className={`p-3 rounded-full shadow-lg border ${isDarkTheme ? "bg-black/50 border-gray-700 text-white hover:bg-gray-800" : "bg-white/50 border-gray-300 text-black hover:bg-white"} backdrop-blur-sm transition-all`}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-8 px-4 sm:px-16 py-8 snap-x scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {media.map((m, idx) => (
          <div
            key={idx}
            className="flex-none w-[90vw] sm:w-[85vw] max-w-[1200px] snap-center flex justify-center items-center"
          >
            {m.type === "image" && (
              <OptimizedImage
                src={m.src}
                alt={`Gallery item ${idx + 1}`}
                className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-sm shadow-xl"
                loading="lazy"
                theme={isDarkTheme ? "dark" : "light"}
              />
            )}
            {m.type === "video" && (
              <video
                src={m.src}
                autoPlay
                loop
                muted
                playsInline
                className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-sm shadow-xl"
              />
            )}
            {m.type === "gif" && (
              <OptimizedImage
                src={m.src}
                alt={`Gallery item ${idx + 1}`}
                className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-sm shadow-xl"
                loading="lazy"
                theme={isDarkTheme ? "dark" : "light"}
              />
            )}
          </div>
        ))}
      </div>
      <style>
        {`
                      .scrollbar-hide::-webkit-scrollbar {
                          display: none;
                      }
                      `}
      </style>
    </div>
  );
};

const ProjectDetailPage = ({
  project,
  allProjectsData,
  onProjectSelect,
  onBack,
}) => {
  const { t, pt, lang } = useTranslation();
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [project?.id]);

  if (!project) return null;

  const carouselProjects = [
    "festa-na-terra",
    "cronologia-adios",
    "coleccion-grabados",
    "territorios-digitales",
  ];
  const isCarouselView = carouselProjects.includes(project.id);

  const isDesignTheme = project.category === "design";
  const isDarkTheme = project.id === "hashima-animal-park" || isCarouselView || isDesignTheme;
  const theme = isDesignTheme ? "design" : (isDarkTheme ? "dark" : "light");

  const relatedProjects = allProjectsData.filter(
    (p) => p.category === project.category && !p.isPage,
  );
  const currentIndex = relatedProjects.findIndex((p) => p.id === project.id);
  const prevProject =
    currentIndex > 0 ? relatedProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < relatedProjects.length - 1
      ? relatedProjects[currentIndex + 1]
      : null;

  const descriptionToUse = pt(project, "description");
  const paragraphs = descriptionToUse
    ? descriptionToUse.split("\n").filter((p) => p.trim() !== "")
    : [];
  const allMedia = [
    ...(project.videos || []).map((src) => ({ type: "video", src })),
    ...(project.gifs || []).map((src) => ({ type: "gif", src })),
    ...(project.images || []).map((src) => ({ type: "image", src })),
  ];

  const renderEditorialContent = () => {
    const blocks = [];
    let pIdx = 0;
    let mIdx = 0;

    const getNextMediaLayout = () => {
      if (mIdx >= allMedia.length) return null;
      const layoutType = [1, 2, 1, 1, 2][mIdx % 5];
      if (layoutType === 2 && mIdx + 1 < allMedia.length) {
        const items = [allMedia[mIdx], allMedia[mIdx + 1]];
        mIdx += 2;
        return { type: "media-group", items, layout: "half" };
      } else {
        const items = [allMedia[mIdx]];
        mIdx += 1;
        return { type: "media-group", items, layout: "full" };
      }
    };

    while (pIdx < paragraphs.length || mIdx < allMedia.length) {
      const mediaGroup = getNextMediaLayout();
      if (mediaGroup) blocks.push(mediaGroup);

      if (pIdx < paragraphs.length) {
        blocks.push({ type: "text", content: paragraphs[pIdx] });
        pIdx++;
      }
    }

    return blocks.map((block, i) => {
      if (block.type === "text") {
        return (
          <div
            key={`txt-${i}`}
            className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 my-12 md:my-16"
          >
            <p
              className={`text-base md:text-xl font-light leading-relaxed tracking-wide ${isDarkTheme ? "text-gray-300" : "text-gray-700"}`}
            >
              {block.content}
            </p>
          </div>
        );
      }

      if (block.type === "media-group") {
        if (block.layout === "half") {
          return (
            <div key={`media-${i}`} className="w-full my-8">
              <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 md:grid md:grid-cols-2 md:gap-8 max-w-7xl mx-auto px-4 sm:px-8">
                {block.items.map((m, j) => (
                  <div
                    key={j}
                    className={`w-[85vw] md:w-full flex-shrink-0 snap-center rounded-sm overflow-hidden flex items-center justify-center ${isDarkTheme ? "bg-gray-900 border-gray-800" : "bg-gray-50 border-gray-100"} border`}
                  >
                    {m.type === "video" ? (
                      <video
                        src={m.src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="max-h-[70vh] w-full object-contain"
                      />
                    ) : (
                      <OptimizedImage
                        src={m.src}
                        loading="lazy"
                        alt=""
                        className="max-h-[70vh] w-full object-contain hover:scale-105 transition-transform duration-700"
                        theme={isDarkTheme ? "dark" : isDesignTheme ? "design" : "light"}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        } else {
          return (
            <div
              key={`media-${i}`}
              className="w-full my-12 max-w-7xl mx-auto px-4 sm:px-8"
            >
              <div
                className={`w-full rounded-sm overflow-hidden flex items-center justify-center ${isDarkTheme ? "bg-gray-900 border-gray-800" : "bg-gray-50 border-gray-100"} border`}
              >
                {block.items[0].type === "video" ? (
                  <video
                    src={block.items[0].src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="max-h-[85vh] w-full object-contain"
                  />
                ) : (
                  <OptimizedImage
                    src={block.items[0].src}
                    loading="lazy"
                    alt=""
                    className="max-h-[85vh] w-full object-contain"
                    theme={isDarkTheme ? "dark" : isDesignTheme ? "design" : "light"}
                  />
                )}
              </div>
            </div>
          );
        }
      }
      return null;
    });
  };

  return (
    <div
      ref={containerRef}
      className={`w-full min-h-screen ${
        isDesignTheme ? "bg-[#001aff] text-white" : isDarkTheme ? "bg-black text-gray-300" : "bg-white text-black"
      } animate-fade-in overflow-y-auto relative`}
    >
      <InteractiveGridBackground theme={theme} />

      <main className={`relative z-10 w-full pt-32 pb-24`}>
        <header className="mb-12 md:mb-20 text-center max-w-5xl mx-auto px-4">
          <h1
            className={`text-4xl sm:text-6xl md:text-7xl font-bold font-mono uppercase tracking-widest ${isDarkTheme ? "text-white" : "text-black"}`}
          >
            {pt(project, 'title')}
          </h1>
        </header>

        <div className="w-full">
          {isCarouselView ? (
            <>
              <div className="max-w-4xl mx-auto px-4 sm:px-8 mb-8">
                {paragraphs.map((p, i) => (
                  <p
                    key={`top-p-${i}`}
                    className={`text-base md:text-lg leading-relaxed mb-6 font-sans ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}
                  >
                    {p}
                  </p>
                ))}
              </div>
              <HorizontalImageCarousel
                media={allMedia}
                isDarkTheme={isDarkTheme}
              />
            </>
          ) : (
            renderEditorialContent()
          )}
        </div>

        {project.pdf && (
          <div className="mt-24 mb-8 max-w-6xl mx-auto px-4 md:px-8">
            <h2
              className={`text-2xl sm:text-3xl font-bold font-mono uppercase tracking-wider mb-8 text-center ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}
            >
              Documentación Adjunta
            </h2>
            <div
              className={`w-full h-[80vh] min-h-[600px] rounded-sm overflow-hidden shadow-2xl border ${isDarkTheme ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-gray-50"}`}
            >
              <object
                data={`${project.pdf}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
                type="application/pdf"
                className="w-full h-full border-0"
              >
                <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-gray-100 dark:bg-gray-800">
                  <svg
                    className={`w-16 h-16 mb-4 ${isDarkTheme ? "text-gray-400" : "text-gray-500"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p
                    className={`mb-6 font-mono text-sm ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}
                  >
                    El archivo PDF no se ha encontrado o tu navegador no soporta
                    la previsualización.
                  </p>
                  <a
                    href={project.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-block px-8 py-4 border ${isDarkTheme ? "border-gray-600 text-white hover:bg-white hover:text-black" : "border-gray-400 text-black hover:bg-black hover:text-white"} rounded-full font-mono text-sm uppercase tracking-widest transition-colors`}
                  >
                    Descargar o Abrir PDF
                  </a>
                </div>
              </object>
            </div>
          </div>
        )}
      </main>

      {(prevProject || nextProject) && (
        <nav
          className={`w-full mt-12 md:mt-24 border-t border-dashed ${isDarkTheme ? "border-gray-700" : "border-gray-300"} z-10 relative flex flex-col sm:flex-row`}
        >
          {prevProject ? (
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                onProjectSelect(prevProject.id);
              }}
              className={`group flex-1 p-8 sm:p-16 text-left transition-all duration-500 ${isDarkTheme ? "hover:bg-gray-900/50" : "hover:bg-gray-100/50"} ${nextProject ? (isDarkTheme ? "border-b border-dashed sm:border-b-0 sm:border-r border-gray-700" : "border-b border-dashed sm:border-b-0 sm:border-r border-gray-300") : ""}`}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div
                  className={`w-8 h-[1px] ${isDarkTheme ? "bg-red-500" : "bg-red-600"} transition-all duration-500 group-hover:w-16`}
                ></div>
                <span
                  className={`block text-xs font-mono uppercase tracking-widest ${isDarkTheme ? "text-gray-500" : "text-gray-400"}`}
                >
                  Prev
                </span>
              </div>
              <p
                className={`text-2xl sm:text-4xl font-light font-mono uppercase tracking-wider ${isDarkTheme ? "text-white" : "text-gray-900"}`}
              >
                {pt(prevProject, 'title')}
              </p>
            </button>
          ) : (
            <div className="flex-1 hidden sm:block"></div>
          )}

          {nextProject ? (
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                onProjectSelect(nextProject.id);
              }}
              className={`group flex-1 p-8 sm:p-16 text-right transition-all duration-500 ${isDarkTheme ? "hover:bg-gray-900/50" : "hover:bg-gray-100/50"}`}
            >
              <div className="flex items-center justify-end space-x-4 mb-4">
                <span
                  className={`block text-xs font-mono uppercase tracking-widest ${isDarkTheme ? "text-gray-500" : "text-gray-400"}`}
                >
                  Next
                </span>
                <div
                  className={`w-8 h-[1px] ${isDarkTheme ? "bg-red-500" : "bg-red-600"} transition-all duration-500 group-hover:w-16`}
                ></div>
              </div>
              <p
                className={`text-2xl sm:text-4xl font-light font-mono uppercase tracking-wider ${isDarkTheme ? "text-white" : "text-gray-900"}`}
              >
                {pt(nextProject, 'title')}
              </p>
            </button>
          ) : (
            <div className="flex-1 hidden sm:block"></div>
          )}
        </nav>
      )}

      <footer
        className={`${isDarkTheme ? "bg-black text-gray-600" : "bg-gray-50 text-gray-600"} text-center p-6 mt-0 z-10 relative`}
      >
        <p className="text-xs">
          © 2024 Benito González Quiñones - Todos los derechos reservados -
          arquitecturabenito@gmail.com
        </p>
      </footer>
    </div>
  );
};

const FilterControls = ({
  currentFilter,
  onFilterChange,
  currentSubcategory,
}) => {
  const { t } = useTranslation();
  const filters = [
    { key: "all", label: "TODOS" },
    { key: "architecture", label: "ARQUITECTURA" },
    { key: "design", label: "DISEÑO" },
    { key: "escenografias", label: "ESCENOGRAFÍAS" },
    { key: "contact", label: "CONTACTO" },
  ];

  const contactFilter = { key: "contact", label: "Contacto" };

  return (
    <React.Fragment>
      {/* Desktop and Mobile Top Bar */}
      <div className="hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 z-20 space-x-2 bg-black/30 backdrop-blur-sm p-1.5 rounded-full items-center justify-center border border-white/10 shadow-lg">
        {filters.map((filter) => (
          <div key={filter.key} className="flex flex-col items-center relative">
            <button
              onClick={() => onFilterChange(filter.key)}
              className={`px-3 py-1 text-xs sm:text-sm font-mono uppercase tracking-wider rounded-full transition-all duration-200 ${
                currentFilter === filter.key
                  ? "bg-cyan-400 text-black shadow-lg"
                  : "text-white hover:bg-white/20"
              }`}
            >
              {t(filter.label)}
            </button>
            {currentFilter === filter.key && currentSubcategory && (
              <div className="absolute top-[105%] mt-1 flex justify-center w-full pointer-events-none">
                <span
                  className="text-gray-300 font-mono text-[9px] uppercase tracking-widest px-2.5 py-0.5 whitespace-nowrap"
                  style={{
                    border: "1px dashed rgba(255, 255, 255, 0.4)",
                    borderRadius: "100px",
                  }}
                >
                  {currentSubcategory}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Mobile */}
      <div className="md:hidden fixed top-0 left-0 right-0 max-w-[100vw] z-20 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="flex flex-wrap justify-center gap-1.5 px-2 py-2 w-full">
        {filters.map((filter) => (
          <div
            key={filter.key}
            className="flex flex-col items-center relative"
          >
            <button
              onClick={() => onFilterChange(filter.key)}
              className={`px-2 py-1 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider rounded-full transition-all duration-200 ${
                currentFilter === filter.key
                  ? "bg-cyan-400 text-black shadow-lg"
                  : "text-white hover:bg-white/20"
              }`}
            >
              {t(filter.label)}
            </button>
            {currentFilter === filter.key && currentSubcategory && (
              <div className="absolute top-[105%] mt-0.5 flex justify-center w-full pointer-events-none">
                <span
                  className="text-gray-300 font-mono text-[8px] uppercase tracking-widest px-1.5 py-0.5 whitespace-nowrap"
                  style={{
                    border: "1px dashed rgba(255, 255, 255, 0.4)",
                    borderRadius: "100px",
                  }}
                >
                  {currentSubcategory}
                </span>
              </div>
            )}
          </div>
        ))}
        </div>
      </div>

      {/* Shared Bottom Contact Button */}
      <div className="fixed bottom-6 left-0 w-full z-20 flex justify-center p-2 pointer-events-none">
        <button
          key={contactFilter.key}
          onClick={() => onFilterChange(contactFilter.key)}
          className={`pointer-events-auto px-4 py-2 sm:px-5 sm:py-2.5 font-mono text-[10px] sm:text-xs uppercase tracking-wider rounded-full bg-black bg-opacity-50 border transition-all duration-300 backdrop-blur-sm ${
            currentFilter === contactFilter.key
              ? "text-black bg-white border-white"
              : "border-gray-700 text-gray-400 hover:bg-white/10 hover:border-gray-500 hover:text-white"
          }`}
        >
          {contactFilter.label}
        </button>
      </div>
    </React.Fragment>
  );
};

const NavigationOverlay = () => (
  <div
    className="fixed inset-0 bg-[#050505] z-[120] flex flex-col justify-center items-center p-6 md:p-12 overflow-hidden"
    style={{
      backgroundImage:
        "radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
      backgroundSize: "30px 30px",
    }}
  >
    <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
      <svg
        className="w-full h-full absolute inset-0 origin-center animate-spin"
        viewBox="0 0 100 100"
        style={{
          animationDuration: "3s",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="1"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="rgba(34, 211, 238, 0.8)"
          strokeWidth="2"
          strokeDasharray="40 240"
          strokeLinecap="round"
        />
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="1"
        />
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke="rgba(34, 211, 238, 0.5)"
          strokeWidth="2"
          strokeDasharray="20 200"
          strokeLinecap="round"
          style={{
            animationDirection: "reverse",
            animationDuration: "2s",
            transformOrigin: "center",
          }}
        />
      </svg>

      {/* Central pulsing node */}
      <div className="w-4 h-4 bg-cyan-400 rounded-full animate-ping absolute"></div>
      <div className="w-2 h-2 bg-white rounded-full absolute z-10"></div>
    </div>

    <div className="mt-12 text-center pointer-events-none z-20">
      <span className="text-sm md:text-base font-mono text-cyan-400 tracking-[0.3em] uppercase animate-pulse">
        &gt; Navegando el interespacio...
      </span>
    </div>
  </div>
);

const ModeSelectionScreen = ({ onSelect }) => {
  const { t } = useTranslation();
  const [isNavigating, setIsNavigating] = React.useState(false);

  const handleSelect = (mode) => {
    setIsNavigating(true);
    setTimeout(() => {
      onSelect(mode);
    }, 2000);
  };

  if (isNavigating) {
    return <NavigationOverlay />;
  }

  return (
    <div
      className="fixed inset-0 bg-[#050505] z-[100] flex flex-col justify-center items-center p-6 md:p-12 animate-fade-in overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }}
    >
      <div className="flex flex-col items-center justify-center space-y-3 md:space-y-4 mb-8 md:mb-12 pointer-events-none w-full max-w-5xl text-center">
        <div className="text-cyan-400 font-mono tracking-widest text-xs md:text-sm uppercase opacity-90 border-b border-cyan-400/30 inline-block pb-1">
          Portfolio digital de Benito G. Quiñones
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-mono uppercase tracking-widest text-white drop-shadow-lg leading-tight">
          ¿Cómo prefieres ordenar la información?
        </h1>
      </div>

      <div className="flex flex-col md:flex-row w-full max-w-5xl gap-6 md:gap-10">
        {/* CONSTELACIÓN */}
        <button
          onClick={() => handleSelect("constellation")}
          className="flex-1 w-full relative group overflow-hidden border border-white/20 hover:border-cyan-400/80 transition-colors duration-500 rounded-2xl flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-6 md:p-8 min-h-[220px] md:min-h-[300px]"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 mb-3 md:mb-6 flex-shrink-0">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full stroke-gray-500 group-hover:stroke-cyan-400 transition-all duration-500 fill-transparent stroke-[1]"
            >
              <circle
                cx="50"
                cy="50"
                r="4"
                className="fill-gray-500 group-hover:fill-cyan-400"
              />
              <circle
                cx="20"
                cy="30"
                r="2"
                className="fill-gray-500 group-hover:fill-cyan-400"
              />
              <circle
                cx="80"
                cy="40"
                r="2"
                className="fill-gray-500 group-hover:fill-cyan-400"
              />
              <circle
                cx="30"
                cy="75"
                r="2"
                className="fill-gray-500 group-hover:fill-cyan-400"
              />
              <circle
                cx="70"
                cy="75"
                r="2"
                className="fill-gray-500 group-hover:fill-cyan-400"
              />

              <line x1="50" y1="50" x2="20" y2="30" strokeDasharray="3,3" />
              <line x1="50" y1="50" x2="80" y2="40" strokeDasharray="3,3" />
              <line x1="50" y1="50" x2="30" y2="75" strokeDasharray="3,3" />
              <line x1="50" y1="50" x2="70" y2="75" strokeDasharray="3,3" />
              <line
                x1="20"
                y1="30"
                x2="80"
                y2="40"
                strokeDasharray="1,2"
                opacity="0.5"
              />
            </svg>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-mono tracking-widest text-gray-300 group-hover:text-cyan-400 transition-colors uppercase">
            Constelación
          </h2>
          <p className="mt-2 md:mt-4 text-gray-500 font-mono tracking-wider text-[10px] sm:text-xs md:text-sm uppercase group-hover:text-cyan-200">
            Exploración relacional interactiva
          </p>
        </button>

        {/* GALERÍA */}
        <button
          onClick={() => handleSelect("gallery")}
          className="flex-1 w-full relative group overflow-hidden border border-white/20 hover:border-cyan-400/80 transition-colors duration-500 rounded-2xl flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-6 md:p-8 min-h-[220px] md:min-h-[300px]"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 mb-3 md:mb-6 grid grid-cols-2 grid-rows-2 gap-1 sm:gap-2 p-1 sm:p-2 flex-shrink-0">
            <div className="border border-gray-500 group-hover:border-cyan-400 transition-all duration-500 rounded-md bg-gray-800/50 group-hover:bg-cyan-900/50"></div>
            <div className="border border-gray-500 group-hover:border-cyan-400 transition-all duration-500 rounded-md bg-gray-800/50 group-hover:bg-cyan-900/50"></div>
            <div className="border border-gray-500 group-hover:border-cyan-400 transition-all duration-500 rounded-md bg-gray-800/50 group-hover:bg-cyan-900/50"></div>
            <div className="border border-gray-500 group-hover:border-cyan-400 transition-all duration-500 rounded-md bg-gray-800/50 group-hover:bg-cyan-900/50"></div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-mono tracking-widest text-gray-300 group-hover:text-cyan-400 transition-colors uppercase">{t("Galería")}</h2>
          <p className="mt-2 md:mt-4 text-gray-500 font-mono tracking-wider text-[10px] sm:text-xs md:text-sm uppercase group-hover:text-cyan-200">{t("Visualización clásica en parrilla")}</p>
        </button>
      </div>

      <a
        href="https://drive.google.com/file/d/1h-SuLrKgAEDFt16S2rM1tHqEd_F8T5jO/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-6 right-6 md:bottom-12 md:right-12 flex flex-col items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/20 hover:border-cyan-400 bg-black/50 backdrop-blur-sm group transition-all duration-500 hover:scale-105 z-50 cursor-pointer"
      >
        <svg
          viewBox="0 0 100 100"
          className="w-8 h-8 md:w-10 md:h-10 mb-1 stroke-gray-400 group-hover:stroke-cyan-400 transition-all duration-500 fill-transparent stroke-[4]"
        >
          <rect x="25" y="30" width="22" height="28" rx="2" />
          <rect x="53" y="30" width="22" height="28" rx="2" />
        </svg>
        <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-gray-400 group-hover:text-cyan-400 transition-colors text-center w-full">
          porfolio
        </span>
      </a>
    </div>
  );
};

const CustomCursor = () => {
  const [position, setPosition] = React.useState({ x: -100, y: -100 });
  const [isTouchDevice, setIsTouchDevice] = React.useState(false);

  React.useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
          window.innerWidth < 1024,
      );
    };
    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  React.useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updatePosition);
    return () => window.removeEventListener("mousemove", updatePosition);
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      <style>
        {`
          * {
            cursor: none !important;
          }
        `}
      </style>
      <div
        className="fixed pointer-events-none z-[9999] flex flex-col items-start justify-start mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="relative flex items-center justify-center">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            className="text-white"
          >
            <circle cx="16" cy="16" r="2" fill="currentColor" />
            <line x1="16" y1="4" x2="16" y2="10" stroke="currentColor" strokeWidth="1" />
            <line x1="16" y1="22" x2="16" y2="28" stroke="currentColor" strokeWidth="1" />
            <line x1="4" y1="16" x2="10" y2="16" stroke="currentColor" strokeWidth="1" />
            <line x1="22" y1="16" x2="28" y2="16" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
      </div>
    </>
  );
};

// MAIN APP

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div id="error-boundary-msg" style={{color: 'red', zIndex: 9999, position: 'absolute'}}>{this.state.error.toString()}</div>;
    }

    return this.props.children; 
  }
}


const ConstellationSidebars = ({ currentFilter, onProjectSelect, onProjectHover }) => {
  const { pt } = useTranslation();
  // Only display on desktop
  const validProjects = allProjectsData.filter(
    (p) => !p.isCategoryNode && p.id !== "CENTRAL_HUB" && !p.isPage
  );

  let displayedProjects = validProjects;
  if (currentFilter !== "all" && currentFilter !== "home") {
    displayedProjects = validProjects.filter((p) => {
      if (currentFilter === "escenografias" || currentFilter === "scenography") {
        return p.category === "scenography" || p.category === "escenografias";
      }
      return p.category === currentFilter;
    });
  }

  // Split into left and right
  const mid = Math.ceil(displayedProjects.length / 2);
  const leftProjects = displayedProjects.slice(0, mid);
  const rightProjects = displayedProjects.slice(mid);

  return (
    <div className="hidden lg:block pointer-events-none">


      {/* Left Sidebar */}
      <div className="fixed top-1/2 -translate-y-1/2 left-8 z-20 flex flex-col gap-3 xl:gap-4 h-[70vh] overflow-y-auto hide-scrollbar w-48 xl:w-56" style={{ maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)" }}>
        <div className="py-10 flex flex-col gap-3 xl:gap-4">
          {leftProjects.map(p => (
            <button 
              key={p.id}
              onClick={() => onProjectSelect(p.id)}
              onMouseEnter={() => onProjectHover && onProjectHover(p.id)}
              onMouseLeave={() => onProjectHover && onProjectHover(null)}
              className={`text-left text-[10px] xl:text-xs ${currentFilter === 'design' ? 'text-[#ffcc00] hover:text-[#ff0000]' : 'text-gray-500 hover:text-cyan-400'} font-mono uppercase tracking-widest transition-colors pointer-events-auto`}
            >
              {pt(p, "title")}
            </button>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="fixed top-1/2 -translate-y-1/2 right-8 z-20 flex flex-col gap-3 xl:gap-4 h-[70vh] overflow-y-auto hide-scrollbar w-48 xl:w-56" style={{ maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)" }}>
        <div className="py-10 flex flex-col gap-3 xl:gap-4 text-right">
          {rightProjects.map(p => (
            <button 
              key={p.id}
              onClick={() => onProjectSelect(p.id)}
              onMouseEnter={() => onProjectHover && onProjectHover(p.id)}
              onMouseLeave={() => onProjectHover && onProjectHover(null)}
              className={`text-right text-[10px] xl:text-xs ${currentFilter === 'design' ? 'text-[#ffcc00] hover:text-[#ff0000]' : 'text-gray-500 hover:text-cyan-400'} font-mono uppercase tracking-widest transition-colors pointer-events-auto w-full`}
            >
              {pt(p, "title")}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const BrandLogo = ({ theme = "dark", compact = false }) => {
  let titleColor, subColor, shadow;
  if (theme === "design") {
    titleColor = "text-[#ff0000]";
    subColor = "text-[#ff0000]";
    shadow = "0 2px 10px rgba(0,0,0,0.3)";
  } else if (theme === "light") {
    titleColor = "text-black";
    subColor = "text-gray-600";
    shadow = "none";
  } else {
    titleColor = "text-white";
    subColor = "text-gray-400";
    shadow = "0 2px 10px rgba(0,0,0,0.5)";
  }

  const containerClasses = compact
    ? "fixed top-6 right-4 md:top-6 md:right-8 z-[100] text-right pointer-events-none drop-shadow-lg"
    : "fixed top-[70px] left-4 md:top-8 md:left-8 z-[100] text-left pointer-events-none drop-shadow-lg";
    
  const h1Classes = compact
    ? `text-[10px] md:text-xs font-mono tracking-[0.1em] uppercase ${titleColor}`
    : `text-xl md:text-2xl xl:text-3xl font-mono tracking-widest uppercase ${titleColor}`;
    
  const pClasses = compact
    ? `text-[7px] md:text-[8px] font-mono tracking-[0.2em] uppercase mt-0.5 md:mt-1 drop-shadow-md ${subColor}`
    : `text-[9px] md:text-xs xl:text-sm font-mono tracking-[0.2em] uppercase mt-1 md:mt-2 drop-shadow-md ${subColor}`;

  return (
    <div className={containerClasses}>
      <h1 className={h1Classes} style={{ textShadow: shadow }}>
        {compact ? "Benito G. Quiñones" : <React.Fragment>Benito G.<br/>Quiñones</React.Fragment>}
      </h1>
      <p className={pClasses}>
        Portfolio
      </p>
    </div>
  );
};


const LanguageToggle = ({ compact, theme = "dark" }) => {
  const { lang, setLang } = React.useContext(LanguageContext);
  
  // Si BrandLogo es compact, está en top-right. Entonces Toggle va en top-left.
  // Si BrandLogo no es compact, está en top-left. Entonces Toggle va en top-right.
  const positionClasses = compact
    ? "fixed bottom-6 left-4 md:bottom-8 md:left-8" // moved to bottom-left to avoid Back button
    : "fixed top-[70px] right-4 md:top-8 md:right-8";

  let activeColor = "text-white border-white";
  let inactiveHover = "text-gray-500 hover:text-white";
  let separatorColor = "text-white opacity-30";
  
  if (theme === "design") {
    activeColor = "text-[#ff0000] border-[#ff0000]";
    inactiveHover = "text-[#ff0000]/50 hover:text-[#ff0000]";
    separatorColor = "text-[#ff0000] opacity-30";
  } else if (theme === "light") {
    activeColor = "text-black border-black";
    inactiveHover = "text-gray-400 hover:text-black";
    separatorColor = "text-black opacity-30";
  }

  return (
    <div className={`z-[110] flex gap-2 ${positionClasses} pointer-events-auto`}>
      <button
        onClick={() => setLang('es')}
        className={`text-[10px] md:text-xs font-mono px-1 md:px-2 py-0.5 md:py-1 transition-colors ${lang === 'es' ? 'border-b ' + activeColor : inactiveHover}`}
      >
        ES
      </button>
      <span className={`text-[10px] md:text-xs py-0.5 md:py-1 ${separatorColor}`}>|</span>
      <button
        onClick={() => setLang('en')}
        className={`text-[10px] md:text-xs font-mono px-1 md:px-2 py-0.5 md:py-1 transition-colors ${lang === 'en' ? 'border-b ' + activeColor : inactiveHover}`}
      >
        EN
      </button>
    </div>
  );
};
const App = () => {
  const [lang, setLang] = React.useState("es");
  const { t } = useTranslation(lang);

  React.useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const [view, setView] = React.useState({ page: "home", projectId: null });
  const [filter, setFilter] = React.useState("all");
  const [zoomTarget, setZoomTarget] = React.useState(null);
  const [hoveredProjectImage, setHoveredProjectImage] = React.useState(null);
  const [slideshowImage, setSlideshowImage] = React.useState(null);
  const [bgImage, setBgImage] = React.useState(null);
  const [bgOpacity, setBgOpacity] = React.useState(0);
  const [disruptSignal, setDisruptSignal] = React.useState(0);
  const [isGalleryMode, setIsGalleryMode] = React.useState(false);
  const [isNavigatingMode, setIsNavigatingMode] = React.useState(false);
  const [highlightNodeId, setHighlightNodeId] = React.useState(null);
  
  // App-level loading and performance states
  const [appProgress, setAppProgress] = React.useState(15);
  const [appStatusText, setAppStatusText] = React.useState("INICIALIZANDO MATRIZ ESPACIAL...");
  const [isAppLoading, setIsAppLoading] = React.useState(true);

  React.useEffect(() => {
    const t1 = setTimeout(() => {
      setAppProgress(50);
      setAppStatusText("CALCULANDO ÓRBITAS Y NODOS...");
    }, 280);

    const t2 = setTimeout(() => {
      setAppProgress(85);
      setAppStatusText("OPTIMIZANDO TEXTURAS Y FORMATO WEBP...");
    }, 680);

    const t3 = setTimeout(() => {
      setAppProgress(100);
      setAppStatusText("SISTEMA VECTORIAL LISTO");
    }, 1100);

    const t4 = setTimeout(() => {
      setIsAppLoading(false);
    }, 1500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  // Handle routing for /tutorialia
  React.useEffect(() => {
    const handlePath = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path.includes("/tutorialia") || hash === "#/tutorialia") {
        setView({ page: "generacion-ia", projectId: null });
      } else if (path === "/" || path === "" || hash === "#/" || hash === "") {
        setView({ page: "home", projectId: null });
      }
    };

    handlePath();
    window.addEventListener("popstate", handlePath);
    window.addEventListener("hashchange", handlePath);
    return () => {
      window.removeEventListener("popstate", handlePath);
      window.removeEventListener("hashchange", handlePath);
    };
  }, []);

  React.useEffect(() => {
    if (view.page === "generacion-ia") {
      if (window.location.hash !== "#/tutorialia") {
        window.history.pushState(null, "", "#/tutorialia");
      }
    } else if (view.page === "home") {
      if (window.location.hash === "#/tutorialia") {
        window.history.pushState(null, "", "#/");
      }
    }
  }, [view.page]);

  const handleEyeClick = () => {
    setDisruptSignal((c) => c + 1);
  };

  const toggleGalleryMode = () => {
    setIsNavigatingMode(true);
    setTimeout(() => {
      setIsGalleryMode((prev) => !prev);
      setIsNavigatingMode(false);
    }, 2000);
  };

  React.useEffect(() => {
    // Preload ALL project images lazily
    setTimeout(() => {
      const allImages = allProjectsData
        .filter((p) => p.normalImage)
        .map((p) => p.normalImage);

      allImages.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }, 2000);
  }, []); // Run only once on component mount

  React.useEffect(() => {
    // interval logic removed
  }, [hoveredProjectImage, view.page]);

  React.useEffect(() => {
    const validPages = [
      "home",
      "architecture",
      "design",
      "scenography",
      "subcategory",
    ];
    if (hoveredProjectImage && validPages.includes(view.page)) {
      setBgImage(hoveredProjectImage);
      setBgOpacity(1);
    } else {
      setBgOpacity(0);
    }
  }, [hoveredProjectImage, view.page]);

  React.useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (
      ["home", "architecture", "design", "scenography", "subcategory"].includes(
        view.page,
      )
    ) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
    } else {
      html.style.overflow = "auto";
      body.style.overflow = "auto";
    }

    window.scrollTo(0, 0);

    let bgColor = "#000"; // default dark
    if (view.page === "design" || filter === "design") {
      bgColor = "#0000ff"; // electric blue
    } else if (view.page === "project") {
      const project = allProjectsData.find((p) => p.id === view.projectId);
      const carouselProjects = [
        "festa-na-terra",
        "cronologia-adios",
        "coleccion-grabados",
        "territorios-digitales",
      ];
      const isCarouselView = carouselProjects.includes(project?.id);
      if (project && project.id !== "hashima-animal-park" && !isCarouselView) {
        bgColor = "#fff"; // light for all projects except Hashima and carousel projects
      }
    }

    html.style.backgroundColor = bgColor;
    body.style.backgroundColor = bgColor;

    return () => {
      html.style.overflow = "auto";
      body.style.overflow = "auto";
    };
  }, [view.page, view.projectId, filter]);

  const handleFilterChange = (newFilterKey) => {
    setHoveredProjectImage(null);

    const pageMap = {
      architecture: "architecture",
      design: "design",
      escenografias: "scenography",
      contact: "contact",
    };

    const targetPage = pageMap[newFilterKey] ? pageMap[newFilterKey] : "home";

    if (view.page === "home" && targetPage !== "home") {
      setZoomTarget(newFilterKey);
      setTimeout(() => {
        setFilter(newFilterKey);
        setView({ page: targetPage, projectId: null });
        setZoomTarget(null);
      }, 3200);
    } else {
      setFilter(newFilterKey);
      setView({ page: targetPage, projectId: null });
    }
  };

  const handleProjectSelect = React.useCallback((projectId, isPage = false) => {
    const project = allProjectsData.find((p) => p.id === projectId);
    if (project?.isPage && project.targetPage) {
      setView({ page: project.targetPage, projectId: null });
      return;
    }
    if (project?.isCategoryNode) {
      setFilter(project.targetCategory);
      setView({ page: project.targetCategory, projectId: null });
      return;
    }
    if (isPage || project?.isPage) {
      setView({ page: projectId, projectId: null });
      return;
    }
    if (project && project.id === "carteleria") {
      setView({ page: "carteleria", projectId });
    } else {
      setView({ page: "project", projectId });
    }
  }, []);

  const handleNodeClick = React.useCallback(
    (node) => {
      if (view.page === "home") {
        setZoomTarget(node.projectId || node.id);
        setHighlightNodeId(node.projectId || node.id);
        setTimeout(() => {
          if (node.isProject && node.projectId) {
            const project = allProjectsData.find(
              (p) => p.id === node.projectId,
            );
            if (project?.isPage) {
              handleProjectSelect(node.projectId, true);
            } else {
              handleProjectSelect(node.projectId, false);
            }
          } else if (
            ["ARQUITECTURA", "DISEÑO", "ESCENOGRAFÍAS", "CONTACTO"].includes(
              node.id,
            )
          ) {
            let filterKey =
              node.id === "ARQUITECTURA"
                ? "architecture"
                : node.id === "DISEÑO"
                  ? "design"
                  : node.id === "ESCENOGRAFÍAS"
                    ? "scenography"
                    : "contact";
            setFilter(filterKey);
            setView({ page: filterKey, projectId: null });
          } else if (node.isSubcategory) {
            setView({ page: "subcategory", subcategory: node.id });
          }
          setZoomTarget(null);
          setHighlightNodeId(null);
        }, 3200);
        return;
      }

      if (node.isProject && node.projectId) {
        const project = allProjectsData.find((p) => p.id === node.projectId);
        if (project?.isPage) {
          handleProjectSelect(node.projectId, true);
        } else {
          handleProjectSelect(node.projectId, false);
        }
        return;
      }

      if (
        ["ARQUITECTURA", "DISEÑO", "ESCENOGRAFÍAS", "CONTACTO"].includes(
          node.id,
        )
      ) {
        let filterKey =
          node.id === "ARQUITECTURA"
            ? "architecture"
            : node.id === "DISEÑO"
              ? "design"
              : node.id === "ESCENOGRAFÍAS"
                ? "scenography"
                : "contact";
        setFilter(filterKey);
        setView({ page: filterKey, projectId: null });
        return;
      }
      if (node.isSubcategory) {
        setView({ page: "subcategory", subcategory: node.id });
        return;
      }
    },
    [handleProjectSelect, view.page],
  );

  const handleGoHome = () => {
    setHoveredProjectImage(null);
    setFilter("all");
    setView({ page: "home", projectId: null });
  };

  const handleRandomProject = React.useCallback(() => {
    const validProjects = allProjectsData.filter(
      (p) => !p.isCategoryNode && p.id !== "CENTRAL_HUB",
    );
    if (validProjects.length > 0) {
      const randomProject =
        validProjects[Math.floor(Math.random() * validProjects.length)];
      handleProjectSelect(randomProject.id, !!randomProject.isPage);
    }
  }, [handleProjectSelect]);

  const handleBack = () => {
    setHoveredProjectImage(null);
    const standalonePages = [
      "generacion-ia",
      "web-design",
      "escritos-arquitectura",
      "escrito-detail",
    ];
    if (
      view.page === "project" ||
      view.page === "carteleria" ||
      standalonePages.includes(view.page)
    ) {
      if (view.page === "escritos-arquitectura") {
        setFilter("architecture");
        setView({ page: "architecture", projectId: null });
        return;
      }
      if (view.page === "escrito-detail") {
        setView({
          page: "escritos-arquitectura",
          projectId: null,
          escritoId: null,
        });
        return;
      }
      const project = allProjectsData.find((p) => p.id === view.projectId);

      if (
        standalonePages.includes(view.page) ||
        (project && project.category === "design")
      ) {
        if (project && project.subcategory) {
          setView({ page: "subcategory", subcategory: project.subcategory });
        } else {
          setFilter("design");
          setView({ page: "design", projectId: null });
        }
        return;
      }

      if (project && project.category === "architecture") {
        setFilter(project.category);
        setView({ page: project.category, projectId: null });
        return;
      }

      if (project && project.category === "escenografias") {
        setFilter("scenography");
        setView({ page: "scenography", projectId: null });
        return;
      }

      handleGoHome();
    } else if (["architecture"].includes(view.page)) {
      setFilter("architecture");
      setView({ page: "architecture", projectId: null });
    } else if (view.page === "subcategory") {
      const subcategoryProjects = allProjectsData.filter(
        (p) => p.subcategory === view.subcategory,
      );
      const category =
        subcategoryProjects.length > 0
          ? subcategoryProjects[0].category
          : "design";
      setFilter(category);
      setView({ page: category, projectId: null });
    } else if (
      ["architecture", "design", "scenography", "contact"].includes(view.page)
    ) {
      handleGoHome();
    }
  };

  const handleProjectHover = React.useCallback((project) => {
    setHoveredProjectImage(project ? project.normalImage : null);
  }, []);

  const backButtonTheme = React.useMemo(() => {
    if (view.page === "project") {
      const project = allProjectsData.find((p) => p.id === view.projectId);
      const carouselProjects = [
        "festa-na-terra",
        "cronologia-adios",
        "coleccion-grabados",
        "territorios-digitales",
      ];
      const isCarouselView = carouselProjects.includes(project?.id);
      return project && (project.id === "hashima-animal-park" || isCarouselView)
        ? "dark"
        : "light";
    }
    return "dark";
  }, [view.page, view.projectId]);

  const handleSubcategorySelect = React.useCallback((subcategory) => {
    setView({ page: "subcategory", subcategory });
  }, []);

  const renderContent = () => {
    switch (view.page) {
      case "home":
        return (
          <div className="w-full h-full flex items-center justify-center relative">
            <h1 className="sr-only">
              Benito González Quiñones - Portfolio de Arquitectura y Diseño.
              Arquitecto Madrid.
            </h1>
            {!isGalleryMode && (
              <div className="absolute top-0 left-0 w-full h-full z-10">
                <NetworkGraph
                  onNodeClick={handleNodeClick}
                  filter={filter}
                  disruptSignal={disruptSignal}
                  zoomTarget={zoomTarget}
                  highlightNodeId={highlightNodeId}
                />
                <div className="fixed bottom-24 left-4 md:bottom-8 md:left-8 p-2 sm:p-3 bg-black/40 backdrop-blur-md rounded-xl md:rounded-lg border border-white/10 text-white/70 text-[9px] sm:text-[10px] md:text-xs font-mono tracking-wider pointer-events-none opacity-70 text-left whitespace-pre-line z-50 min-w-max">
                  {typeof window !== "undefined" &&
                  ("ontouchstart" in window || navigator.maxTouchPoints > 0)
                    ? "Arrastra para orbitar\nPellizca para zoom\nToca para explorar"
                    : "Arrastra: Orbitar\nScroll: Zoom\nClic: Explorar"}
                </div>
              </div>
            )}
            {isGalleryMode && (
              <div className="absolute top-0 left-0 w-full h-full z-10">
                <GalleryView
                  filter={filter}
                  onProjectSelect={handleProjectSelect}
                  onSubcategorySelect={handleSubcategorySelect}
                  onFilterChange={handleFilterChange}
                />
              </div>
            )}
          </div>
        );
      case "architecture":
        if (isGalleryMode)
          return (
            <div className="absolute top-0 left-0 w-full h-full z-10">
              <GalleryView
                filter="architecture"
                onProjectSelect={handleProjectSelect}
                onSubcategorySelect={handleSubcategorySelect}
                onFilterChange={handleFilterChange}
              />
            </div>
          );
        return (
          <OrbitalPage
            category="architecture"
            title="ARQUITECTURA"
            onProjectSelect={handleProjectSelect}
            onSubcategorySelect={handleSubcategorySelect}
            onProjectHover={handleProjectHover}
            showEye={true}
            highlightNodeId={highlightNodeId}
          />
        );

      case "design":
        if (isGalleryMode)
          return (
            <div className="absolute top-0 left-0 w-full h-full z-10">
              <GalleryView
                filter="design"
                onProjectSelect={handleProjectSelect}
                onSubcategorySelect={handleSubcategorySelect}
                onFilterChange={handleFilterChange}
              />
            </div>
          );
        return (
          <OrbitalPage
            category="design"
            title="DISEÑO"
            onProjectSelect={handleProjectSelect}
            onSubcategorySelect={handleSubcategorySelect}
            onProjectHover={handleProjectHover}
            showEye={true}
            highlightNodeId={highlightNodeId}
          />
        );
      case "scenography":
        if (isGalleryMode)
          return (
            <div className="absolute top-0 left-0 w-full h-full z-10">
              <GalleryView
                filter="scenography"
                onProjectSelect={handleProjectSelect}
                onSubcategorySelect={handleSubcategorySelect}
                onFilterChange={handleFilterChange}
              />
            </div>
          );
        return (
          <OrbitalPage
            category="escenografias"
            title="ESCENOGRAFÍAS"
            onProjectSelect={handleProjectSelect}
            onSubcategorySelect={handleSubcategorySelect}
            onProjectHover={handleProjectHover}
            showEye={true}
            highlightNodeId={highlightNodeId}
          />
        );
      case "subcategory": {
        if (isGalleryMode)
          return (
            <div className="absolute top-0 left-0 w-full h-full z-10">
              <GalleryView
                filter={filter}
                subcategory={view.subcategory}
                onProjectSelect={handleProjectSelect}
                onSubcategorySelect={handleSubcategorySelect}
                onFilterChange={handleFilterChange}
              />
            </div>
          );
        const subcategoryProjects = allProjectsData.filter(
          (p) => p.subcategory === view.subcategory,
        );
        const category =
          subcategoryProjects.length > 0
            ? subcategoryProjects[0].category
            : "design";
        return (
          <OrbitalPage
            category={category}
            subcategory={view.subcategory}
            title={view.subcategory}
            onProjectSelect={handleProjectSelect}
            onProjectHover={handleProjectHover}
            showEye={true}
            highlightNodeId={highlightNodeId}
          />
        );
      }
      case "contact":
        return <ContactPage />;
      case "carteleria": {
        const project = allProjectsData.find((p) => p.id === view.projectId);
        return <CarteleriaPage project={project} />;
      }
      case "generacion-ia": {
        return <AIStudioPage />;
      }
      case "web-design": {
        return <WebDesignPage />;
      }
      case "escritos-arquitectura": {
        return (
          <EscritosPage
            onEscritoSelect={(id) =>
              setView({ page: "escrito-detail", escritoId: id })
            }
          />
        );
      }
      case "escrito-detail": {
        const escrito = window.escritosData.find(
          (e) => e.id === view.escritoId,
        );
        return <EscritoDetailPage escrito={escrito} onBack={handleBack} />;
      }
      case "project":
        const project = allProjectsData.find((p) => p.id === view.projectId);
        return (
          <ProjectDetailPage
            project={project}
            allProjectsData={allProjectsData}
            onProjectSelect={handleProjectSelect}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  let currentTheme = "dark";
  if (view.page === "project" && view.projectId) {
    const project = allProjectsData.find((p) => p.id === view.projectId);
    if (project) {
      const carouselProjects = [
        "escenografia-grita",
        "escenografia-bodas",
        "coleccion-grabados",
        "territorios-digitales",
      ];
      const isCarouselView = carouselProjects.includes(project.id);
      const isDesignTheme = project.category === "design";
      const isDarkTheme = project.id === "hashima-animal-park" || isCarouselView || isDesignTheme;
      currentTheme = isDesignTheme ? "design" : (isDarkTheme ? "dark" : "light");
    }
  } else if (view.page === "escritos") {
    currentTheme = "light";
  } else if (view.page === "escritos-react") {
    currentTheme = "light";
  } else if (view.page === "design" || (view.page === "home" && filter === "design")) {
    currentTheme = "design";
  }

  const isPublication = [
    "project",
    "carteleria",
    "generacion-ia",
    "web-design",
    "escritos-arquitectura",
    "escrito-detail",
  ].includes(view.page);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
    <div className="w-full h-full relative">
      <LanguageToggle compact={isPublication} theme={currentTheme} />

      <AppLoader isVisible={isAppLoading} progress={appProgress} statusText={appStatusText} />
      <CustomCursor />
      <BrandLogo theme={currentTheme} compact={isPublication} />
      {isNavigatingMode && <NavigationOverlay />}
      <div
        className="fixed inset-0 z-0 transition-opacity duration-700 ease-in-out pointer-events-none"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: bgOpacity,
          filter: "blur(8px) brightness(0.5)",
          maskImage:
            "radial-gradient(circle at center, transparent 20%, black 35%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, transparent 20%, black 35%)",
        }}
      />

      {
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
            onProjectHover={setHighlightNodeId}
          />
        )}
      {
        [
          "home",
          "architecture",
          "design",
          "scenography",
          "subcategory",
        ].includes(view.page) && (
          <>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-1 sm:gap-2 bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-gray-700/50 shadow-2xl w-[90vw] sm:w-auto max-w-[340px] justify-between">
              <button
                onClick={() => !isNavigatingMode && isGalleryMode && toggleGalleryMode()}
                className={`flex-1 sm:flex-none px-2 sm:px-6 py-1.5 rounded-full text-[9px] sm:text-xs font-mono uppercase tracking-widest transition-all duration-300 ${!isGalleryMode ? 'bg-cyan-900/50 text-cyan-400 border border-cyan-400/30 shadow-[0_0_10px_rgba(0,255,255,0.2)]' : 'text-gray-500 hover:text-gray-300'} ${isNavigatingMode ? 'opacity-50 cursor-not-allowed' : ''}`}
              >{t("Constelación")}</button>
              <button
                onClick={() => !isNavigatingMode && !isGalleryMode && toggleGalleryMode()}
                className={`flex-1 sm:flex-none px-2 sm:px-6 py-1.5 rounded-full text-[9px] sm:text-xs font-mono uppercase tracking-widest transition-all duration-300 ${isGalleryMode ? 'bg-gray-800 text-white border border-gray-600 shadow-[0_0_10px_rgba(255,255,255,0.1)]' : 'text-gray-500 hover:text-gray-300'} ${isNavigatingMode ? 'opacity-50 cursor-not-allowed' : ''}`}
              >{t("Galería")}</button>
            </div>
            <button
              onClick={handleRandomProject}
              className="hidden md:flex absolute bottom-8 right-4 md:right-8 z-30 px-4 py-2 sm:px-5 sm:py-2.5 bg-black bg-opacity-50 rounded-full border border-gray-700 text-gray-400 font-mono text-[10px] sm:text-xs uppercase tracking-wider items-center justify-center hover:bg-white/10 hover:border-gray-500 hover:text-white transition-all duration-300 backdrop-blur-sm"
              title="Abre un proyecto al azar"
            >{t("Probar suerte")}</button>
          </>
        )}
      {/* {view.page !== 'home' && <HomeButton onClick={handleGoHome} />} */}
      {[
        "project",
        "carteleria",
        "generacion-ia",
        "web-design",
        "escritos-arquitectura",
        "escrito-detail",
      ].includes(view.page) && (
        <BackButton onClick={handleBack} theme={backButtonTheme} />
      )}
      {renderContent()}
    </div>
    </LanguageContext.Provider>
  );
};

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<ErrorBoundary><App /></ErrorBoundary>);
}
