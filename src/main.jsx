import React from "react";
import ReactDOM from "react-dom/client";
import ForceGraph3D from 'react-force-graph-3d';
import SpriteText from 'three-spritetext';
import * as THREE from 'three';
import * as d3 from 'd3';
import projectMusic from './projectMusicConfig.js';
import projectAudioMeta from './projectAudioMeta.js';

// ==========================================
// PERFORMANCE & MEDIA OPTIMIZATION ENGINE
// ==========================================

const LanguageContext = React.createContext({ lang: "es", setLang: () => {} });

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
  const { lang } = React.useContext(LanguageContext) || { lang: 'es' };
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const [currentSrc, setCurrentSrc] = React.useState(src);

  React.useEffect(() => {
    setCurrentSrc(src);
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  // Construct alternative candidate (if src is .webp, test .png/.jpg as fallbacks; if src is .png/.jpg, test .webp)
  const alternateCandidates = React.useMemo(() => {
    if (!src || typeof src !== "string") return [];
    if (src.endsWith(".webp")) {
      return [
        src.replace(/\.webp$/i, ".png"),
        src.replace(/\.webp$/i, ".jpg"),
        src.replace(/\.webp$/i, ".jpeg")
      ];
    }
    if (src.endsWith(".png") || src.endsWith(".jpg") || src.endsWith(".jpeg")) {
      return [src.replace(/\.(png|jpg|jpeg)$/i, ".webp")];
    }
    return [];
  }, [src]);

  const [attemptIndex, setAttemptIndex] = React.useState(0);

  React.useEffect(() => {
    setCurrentSrc(src);
    setAttemptIndex(0);
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (attemptIndex < alternateCandidates.length) {
      const nextCandidate = alternateCandidates[attemptIndex];
      setAttemptIndex((prev) => prev + 1);
      setCurrentSrc(nextCandidate);
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
            {lang === 'en' ? 'Loading' : 'Cargando'}
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
      )}
    </div>
    
  );
};


const useTranslation = (overrideLang) => {
  const context = React.useContext(LanguageContext);
  const lang = overrideLang || context.lang;
  
  const translations = {
    es: {
      "ARQUITECTURA": "ARQUITECTURA",
      "DISEÑO": "DISEÑO",
      "ESCENOGRAFÍAS": "ESCENOGRAFÍAS",
      "CONTACTO": "CONTACTO",
      "Contacto": "Contacto",
      "TEXTOS": "TEXTOS",
      "PROYECTOS": "PROYECTOS",
      "Volver al Menú Principal": "Volver al Menú Principal",
      "Volver": "Volver",
      "Próximo Proyecto": "Próximo Proyecto",
      "Ver Galería": "Ver Galería",
      "Prev": "Ant",
      "Siguiente": "Sig",
      "Next": "Sig",
      "INICIANDO CONSTELACIÓN 3D...": "INICIANDO CONSTELACIÓN 3D...",
      "CALCULANDO ÓRBITAS Y NODOS...": "CALCULANDO ÓRBITAS Y NODOS...",
      "OPTIMIZANDO TEXTURAS Y FORMATO WEBP...": "OPTIMIZANDO TEXTURAS Y FORMATO WEBP...",
      "SISTEMA VECTORIAL LISTO": "SISTEMA VECTORIAL LISTO",
      "CALIBRANDO CONSTELACIÓN 3D...": "CALIBRANDO CONSTELACIÓN 3D...",
      "Introducción": "Introducción",
      "Foocus": "Foocus",
      "Comfy UI": "Comfy UI",
      "Web UI": "Web UI",
      "Galería de Carteles": "Galería de Carteles",
      "Documentación Visual": "Documentación Visual",
      "Explorar Proyectos": "Explorar Proyectos",
      "Probar suerte": "Probar suerte",
      "Abre un proyecto al azar": "Abre un proyecto al azar",
      "Constelación": "Constelación",
      "Galería": "Galería",
      "Visualización clásica en parrilla": "Visualización clásica en parrilla",
      "TODOS": "TODOS",
      "Todos los proyectos": "TODOS",
      "Todos": "TODOS",
      "ESCRITOS / PUBLICACIONES": "ESCRITOS / PUBLICACIONES",
      "Escritos y Publicaciones": "Escritos y Publicaciones",
      "TUTORIAL IA": "TUTORIAL IA",
      "DISEÑO WEB": "DISEÑO WEB",
      "CARTELERÍA": "CARTELERÍA",
      "GENERACIÓN IA": "GENERACIÓN IA",
      "ÁRBOLES Y TELAS": "ÁRBOLES Y TELAS",
      "COLECCIÓN DE CURVAS": "COLECCIÓN DE CURVAS",
      "CRÍTICA": "CRÍTICA",
      "ENSAYOS PROPIOS": "ENSAYOS PROPIOS",
      "HISTORIA DE LA ARQUITECTURA": "HISTORIA DE LA ARQUITECTURA",
      "Crítica Arquitectónica": "Crítica Arquitectónica",
      "Ensayos Propios": "Ensayos Propios",
      "Historia de la Arquitectura": "Historia de la Arquitectura",
      "Buscar escritos...": "Buscar escritos...",
      "No se encontraron escritos que coincidan con la búsqueda.": "No se encontraron escritos que coincidan con la búsqueda.",
      "Repositorio de textos, ensayos y reflexiones críticas sobre la arquitectura, la ciudad y el diseño.": "Repositorio de textos, ensayos y reflexiones críticas sobre la arquitectura, la ciudad y el diseño.",
      "Documentación Adjunta": "Documentación Adjunta",
      "El archivo PDF no se ha encontrado o tu navegador no soporta la previsualización.": "El archivo PDF no se ha encontrado o tu navegador no soporta la previsualización.",
      "Descargar o Abrir PDF": "Descargar o Abrir PDF",
      "Todos los derechos reservados": "Todos los derechos reservados",
      "Visitar sitio web": "Visitar sitio web",
      "Cargando": "Cargando",
      "Descripción": "Descripción",
      "¿Cómo prefieres ordenar la información?": "¿Cómo prefieres ordenar la información?",
      "Portfolio digital de Benito G. Quiñones": "Portfolio digital de Benito G. Quiñones",
      "Exploración relacional interactiva": "Exploración relacional interactiva",
      "porfolio": "porfolio",
      "Navegando el interespacio...": "Navegando el interespacio...",
      "> Navegando el interespacio...": "> Navegando el interespacio...",
      "Experiencia": "Experiencia",
      "Formación y Cursos": "Formación y Cursos",
      "Logros": "Logros",
      "Publicaciones": "Publicaciones",
      "INICIALIZANDO MATRIZ ESPACIAL...": "INICIALIZANDO MATRIZ ESPACIAL...",
      "CARGANDO ENTORNO...": "CARGANDO ENTORNO...",
      "Minimizar": "Minimizar",
      "Cerrar": "Cerrar",
      "Anterior": "Anterior",
      "Anexo AEMET": "Anexo AEMET",
      "Hashima Animal Park": "Hashima Animal Park",
      "PASEO DEHESA": "PASEO DEHESA",
      "Paseo de la Dehesa": "Paseo de la Dehesa",
      "COCINA MONACAL DE EL ESCORIAL": "COCINA MONACAL DE EL ESCORIAL",
      "CRONOLOGÍA DE UN ADIÓS": "CRONOLOGÍA DE UN ADIÓS",
      "ESTUCHE V1 V2 V3": "ESTUCHE V1 V2 V3",
      "JUEGO DE MESA MINUTOS": "JUEGO DE MESA MINUTOS",
      "PORTA VINILOS": "PORTA VINILOS",
      "PROTO TAB": "PROTO TAB",
      "Investigación Territorios Digitales": "Investigación Territorios Digitales",
      "crítica": "crítica",
      "arquitectura": "arquitectura",
      "ensayo": "ensayo",
      "técnica": "técnica",
      "estética": "estética",
      "brutalismo": "brutalismo",
      "vernácula": "vernácula",
      "efímera": "efímera",
      "historia": "historia",
      "teoría": "teoría",
      "urbanismo": "urbanismo",
      "diseño": "diseño",
      "FOTOGRAFÍA": "FOTOGRAFÍA",
      "Fotografía": "Fotografía",
      "Libretos": "Libretos",
      "Libreto": "Libreto",
      "Libreto Fotográfico": "Libreto Fotográfico",
      "Libretos Fotográficos": "Libretos Fotográficos",
      "LIBRETO FOTOGRÁFICO": "LIBRETO FOTOGRÁFICO",
      "Doble Página": "Doble Página",
      "Página Simple": "Página Simple",
      "PEQUEÑA REVISTA A5": "PEQUEÑA REVISTA A5",
      "PDF CERRADO": "PDF CERRADO",
      "SITUACIÓN CONCRETA": "SITUACIÓN CONCRETA",
      "Descargar PDF": "Descargar PDF",
      "Miniaturas": "Miniaturas",
      "Pantalla Completa": "Pantalla Completa",
      "Salir de pantalla completa": "Salir de pantalla completa",
      "Portada": "Portada",
      "Contraportada": "Contraportada",
      "Página anterior": "Página anterior",
      "Página siguiente": "Página siguiente",
      "Páginas": "Páginas",
      "Página": "Página",
      "de": "de",
      "VIDA EN TETUÁN": "VIDA EN TETUÁN",
      "Vida en Tetuán": "Vida en Tetuán",
      "RAPA DAS BESTAS 2025": "RAPA DAS BESTAS 2025",
      "Rapa das Bestas 2025": "Rapa das Bestas 2025",
      "CARTAGENA 2023": "CARTAGENA 2023",
      "Cartagena 2023": "Cartagena 2023",
      "CUADERNO DE CAMPO 2024": "CUADERNO DE CAMPO 2024",
      "Cuaderno de Campo 2024": "Cuaderno de Campo 2024",
      "DOCUMENTAL": "DOCUMENTAL",
      "PAISAJE": "PAISAJE"
    },
    en: {
      "ARQUITECTURA": "ARCHITECTURE",
      "DISEÑO": "DESIGN",
      "FOTOGRAFÍA": "PHOTOGRAPHY",
      "Fotografía": "Photography",
      "Libretos": "Booklets",
      "Libreto": "Booklet",
      "Libreto Fotográfico": "Photo Booklet",
      "Libretos Fotográficos": "Photo Booklets",
      "LIBRETO FOTOGRÁFICO": "PHOTO BOOKLET",
      "Doble Página": "Double Page",
      "Página Simple": "Single Page",
      "PEQUEÑA REVISTA A5": "SMALL A5 MAGAZINE",
      "PDF CERRADO": "CLOSED PDF",
      "SITUACIÓN CONCRETA": "SPECIFIC SITUATION",
      "Descargar PDF": "Download PDF",
      "Miniaturas": "Thumbnails",
      "Pantalla Completa": "Fullscreen",
      "Salir de pantalla completa": "Exit Fullscreen",
      "Portada": "Cover",
      "Contraportada": "Back Cover",
      "Página anterior": "Previous page",
      "Página siguiente": "Next page",
      "Páginas": "Pages",
      "Página": "Page",
      "de": "of",
      "VIDA EN TETUÁN": "LIFE IN TETUÁN",
      "Vida en Tetuán": "Life in Tetuán",
      "RAPA DAS BESTAS 2025": "RAPA DAS BESTAS 2025",
      "Rapa das Bestas 2025": "Rapa das Bestas 2025",
      "CARTAGENA 2023": "CARTAGENA 2023",
      "Cartagena 2023": "Cartagena 2023",
      "CUADERNO DE CAMPO 2024": "FIELD NOTEBOOK 2024",
      "Cuaderno de Campo 2024": "Field Notebook 2024",
      "DOCUMENTAL": "DOCUMENTARY",
      "PAISAJE": "LANDSCAPE",
      "ESCENOGRAFÍAS": "SCENOGRAPHY",
      "CONTACTO": "CONTACT",
      "Contacto": "Contact",
      "TEXTOS": "TEXTS",
      "PROYECTOS": "PROJECTS",
      "INVESTIGACIÓN": "RESEARCH",
      "Volver al Menú Principal": "Back to Main Menu",
      "Volver": "Back",
      "Próximo Proyecto": "Next Project",
      "Ver Galería": "View Gallery",
      "Prev": "Prev",
      "Siguiente": "Next",
      "Next": "Next",
      "INICIANDO CONSTELACIÓN 3D...": "INITIALIZING 3D CONSTELLATION...",
      "CALCULANDO ÓRBITAS Y NODOS...": "CALCULATING ORBITS AND NODES...",
      "OPTIMIZANDO TEXTURAS Y FORMATO WEBP...": "OPTIMIZING TEXTURES AND WEBP FORMAT...",
      "SISTEMA VECTORIAL LISTO": "VECTOR SYSTEM READY",
      "CALIBRANDO CONSTELACIÓN 3D...": "CALIBRATING 3D CONSTELLATION...",
      "INICIALIZANDO MATRIZ ESPACIAL...": "INITIALIZING SPATIAL MATRIX...",
      "CARGANDO ENTORNO...": "LOADING ENVIRONMENT...",
      "Minimizar": "Minimize",
      "Cerrar": "Close",
      "Anterior": "Previous",
      "Introducción": "Introduction",
      "Foocus": "Foocus",
      "Comfy UI": "Comfy UI",
      "Web UI": "Web UI",
      "Galería de Carteles": "Poster Gallery",
      "Documentación Visual": "Visual Documentation",
      "Explorar Proyectos": "Explore Projects",
      "Probar suerte": "Feeling lucky",
      "Abre un proyecto al azar": "Open a random project",
      "Constelación": "Constellation",
      "Galería": "Gallery",
      "Visualización clásica en parrilla": "Classic grid visualization",
      "TODOS": "ALL",
      "Todos los proyectos": "ALL",
      "Todos": "ALL",
      "ESCRITOS / PUBLICACIONES": "WRITINGS / PUBLICATIONS",
      "Escritos y Publicaciones": "Writings & Publications",
      "TUTORIAL IA": "AI TUTORIAL",
      "DISEÑO WEB": "WEB DESIGN",
      "CARTELERÍA": "POSTERS",
      "GENERACIÓN IA": "AI GENERATION",
      "ÁRBOLES Y TELAS": "TREES AND FABRICS",
      "COLECCIÓN DE CURVAS": "CURVES COLLECTION",
      "CRÍTICA": "CRITICISM",
      "ENSAYOS PROPIOS": "PERSONAL ESSAYS",
      "HISTORIA DE LA ARQUITECTURA": "HISTORY OF ARCHITECTURE",
      "Crítica Arquitectónica": "Architectural Criticism",
      "Ensayos Propios": "Personal Essays",
      "Historia de la Arquitectura": "History of Architecture",
      "Buscar escritos...": "Search writings...",
      "No se encontraron escritos que coincidan con la búsqueda.": "No writings found matching your search.",
      "Repositorio de textos, ensayos y reflexiones críticas sobre la arquitectura, la ciudad y el diseño.": "Repository of texts, essays and critical reflections on architecture, city and design.",
      "Documentación Adjunta": "Attached Documentation",
      "El archivo PDF no se ha encontrado o tu navegador no soporta la previsualización.": "The PDF file was not found or your browser does not support previewing it.",
      "Descargar o Abrir PDF": "Download or Open PDF",
      "Todos los derechos reservados": "All rights reserved",
      "Visitar sitio web": "Visit website",
      "Cargando": "Loading",
      "Descripción": "Description",
      "¿Cómo prefieres ordenar la información?": "How do you prefer to browse the information?",
      "Portfolio digital de Benito G. Quiñones": "Digital Portfolio of Benito G. Quiñones",
      "Exploración relacional interactiva": "Interactive relational exploration",
      "porfolio": "portfolio",
      "Navegando el interespacio...": "Navigating interspace...",
      "> Navegando el interespacio...": "> Navigating interspace...",
      "Experiencia": "Experience",
      "Formación y Cursos": "Education & Courses",
      "Logros": "Achievements",
      "Publicaciones": "Publications",
      "GRITAR LO PÚBLICO": "SHOUT THE PUBLIC",
      "ANEXO AEMET": "AEMET ANNEX",
      "Anexo AEMET": "AEMET Annex",
      "HASHIMA ANIMAL PARK": "HASHIMA ANIMAL PARK",
      "Hashima Animal Park": "Hashima Animal Park",
      "PASEO DE LA DEHESA": "DEHESA PROMENADE",
      "PASEO DEHESA": "DEHESA PROMENADE",
      "Paseo de la Dehesa": "Dehesa Promenade",
      "REHABILITACIÓN EL ESCORIAL": "EL ESCORIAL REHABILITATION",
      "COCINA MONACAL DE EL ESCORIAL": "EL ESCORIAL MONASTIC KITCHEN",
      "RENDERIZADO IA": "AI RENDERING",
      "PRATO FOOD CITY": "PRATO FOOD CITY",
      "TERRITORIOS DIGITALES": "DIGITAL TERRITORIES",
      "Investigación Territorios Digitales": "Digital Territories Research",
      "LÁMPARA ONEIROS": "ONEIROS LAMP",
      "ESTUCHE": "PENCIL CASE",
      "ESTUCHE V1 V2 V3": "PENCIL CASE V1 V2 V3",
      "LÁMPARA NATURAL": "NATURAL LAMP",
      "JUEGO DE MESA": "BOARD GAME",
      "JUEGO DE MESA MINUTOS": "MINUTOS BOARD GAME",
      "CMFX WALKMAN": "CMFX WALKMAN",
      "COLECCIÓN DE GRABADOS": "ENGRAVINGS COLLECTION",
      "PROTO-TAB": "PROTO-TAB",
      "PROTO TAB": "PROTO TAB",
      "ARCHIGLOSS": "ARCHIGLOSS",
      "PORTA-VINILOS": "VINYL HOLDER",
      "PORTA VINILOS": "VINYL HOLDER",
      "FESTA NA TERRA": "FESTA NA TERRA",
      "CRONOLOGÍA DEL ADIÓS": "CHRONOLOGY OF GOODBYE",
      "CRONOLOGÍA DE UN ADIÓS": "CHRONOLOGY OF A GOODBYE",
      "Textos de Arquitectura": "Architecture Texts",
      "Portfolio": "Portfolio",
      "¿Frío o caliente?": "Hot or Cold?",
      "A ver si nos aclaramos": "Let's Get This Straight",
      "Un trío: Lina, Corbu y Mies": "A Trio: Lina, Corbu and Mies",
      "Cómo construir para la gente": "How to Build for People",
      "Si los techos hablaran...": "If Ceilings Could Talk...",
      "Dale una vuelta": "Turn It Around",
      "El poder transformador de la arquitectura": "The Transforming Power of Architecture",
      "El patito feo del bloque 532": "The Ugly Duckling of Block 532",
      "Un trabajo de borde íntimo": "An Intimate Border Work",
      "Recopilación de ejercicios de historia": "Compilation of History Exercises",
      "El valor estético de la técnica": "The Aesthetic Value of Technique",
      "crítica": "criticism",
      "arquitectura": "architecture",
      "ensayo": "essay",
      "técnica": "technique",
      "estética": "aesthetics",
      "brutalismo": "brutalism",
      "vernácula": "vernacular",
      "efímera": "ephemeral",
      "historia": "history",
      "teoría": "theory",
      "urbanismo": "urbanism",
      "diseño": "design"
    }
  };

  const t = React.useCallback((key) => {
    if (!key) return "";
    if (lang === "en") {
      if (translations.en && translations.en[key]) {
        return translations.en[key];
      }
      const upperKey = typeof key === "string" ? key.toUpperCase() : key;
      if (translations.en && translations.en[upperKey]) {
        return translations.en[upperKey];
      }
      if (typeof window !== "undefined" && window.defaultProjectsData) {
        const found = window.defaultProjectsData.find(
          (p) => p.title === key || (p.title && p.title.toUpperCase() === upperKey) || p.id === key
        );
        if (found && found.title_en) return found.title_en;
      }
      if (typeof window !== "undefined" && window.escritosData) {
        const foundE = window.escritosData.find(
          (e) => e.title === key || (e.title && e.title.toUpperCase() === upperKey) || e.id === key
        );
        if (foundE && foundE.title_en) return foundE.title_en;
      }
    }
    if (lang === "es") {
      if (translations.es && translations.es[key]) {
        return translations.es[key];
      }
      const upperKey = typeof key === "string" ? key.toUpperCase() : key;
      if (translations.es && translations.es[upperKey]) {
        return translations.es[upperKey];
      }
    }
    return key;
  }, [lang]);
  
  // Custom translation helper for project dynamic fields
  const pt = React.useCallback((project, field) => {
    if (!project) return "";
    if (lang === "en") {
      if (project[field + "_en"]) return project[field + "_en"];
      if (project[field] && translations.en && translations.en[project[field]]) return translations.en[project[field]];
      if (field === "title" && translations.en) {
        if (translations.en[project.title]) return translations.en[project.title];
        const upper = typeof project.title === "string" ? project.title.toUpperCase() : project.title;
        if (translations.en[upper]) return translations.en[upper];
      }
    }
    if (lang === "es") {
      if (project[field + "_es"]) return project[field + "_es"];
    }
    return project[field] || "";
  }, [lang]);

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
  const { t, lang } = useTranslation();
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
          {lang === "en" ? "Architecture · Design · 3D Space" : "Arquitectura · Diseño · Espacio Tridimensional"}
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
          <span className="truncate pr-2 uppercase">{t(statusText) || (lang === "en" ? "LOADING ENVIRONMENT..." : "CARGANDO ENTORNO...")}</span>
          <span className="text-cyan-400 font-bold">{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
};

const CopyPermalinkButton = ({ theme = "dark", className = "", label = null }) => {
  const { t, lang } = useTranslation();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    try {
      const url = window.location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy permalink:", err);
    }
  };

  const isEn = lang === "en";

  let colorClasses =
    theme === "photography"
      ? "bg-[#faf7f2] border-[#c8963e]/50 hover:bg-[#f4ede1] text-[#6e4418] hover:border-[#8c5822]"
      : theme === "design"
      ? "bg-black/70 border-[#ff0000]/50 hover:bg-[#ff0000]/20 text-[#ff0000]"
      : theme === "light"
      ? "bg-white border-gray-300 hover:bg-gray-100 text-gray-800"
      : "bg-black/60 border-white/20 hover:bg-white/10 text-white";

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm select-none ${colorClasses} ${className}`}
      title={isEn ? "Copy direct permalink" : "Copiar enlace permanente"}
      aria-label={isEn ? "Copy permalink" : "Copiar enlace permanente"}
    >
      {copied ? (
        <>
          <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-bold text-green-600 dark:text-green-400">
            {isEn ? "Copied!" : "¡Copiado!"}
          </span>
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
          <span>{label || (isEn ? "Share link" : "Copiar enlace")}</span>
        </>
      )}
    </button>
  );
};

const EscritosPage = ({ onEscritoSelect }) => {
  const { t, pt, lang } = useTranslation();
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
    const itemTitle = (lang === "en" ? (item.title_en || item.title) : item.title).toLowerCase();
    const itemSummary = (lang === "en" ? (item.summary_en || item.summary) : item.summary).toLowerCase();
    const matchSearch =
      itemTitle.includes(term) ||
      itemSummary.includes(term);
    const matchTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => item.tags.includes(tag));
    return matchSearch && matchTags;
  });

  const categories = [
    {
      id: "critica",
      title: t("Crítica Arquitectónica"),
      items: filteredData.filter((i) => i.category === "critica"),
    },
    {
      id: "ensayo",
      title: t("Ensayos Propios"),
      items: filteredData.filter((i) => i.category === "ensayo"),
    },
    {
      id: "historia",
      title: t("Historia de la Arquitectura"),
      items: filteredData.filter((i) => i.category === "historia"),
    },
  ];

  return (
    <div className="w-full min-h-screen pt-24 pb-20 bg-[#f5f5f0] text-[#111111] border-x border-dashed border-[#b0b0a8] relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(176,176,168,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(176,176,168,0.2)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-8 font-sans relative z-10">
        <header className="mb-12 sm:mb-20 text-center sm:text-left border-b-2 border-[#111111] pb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 uppercase">
            {lang === "en" ? (
              <React.Fragment>Writings & <span className="italic font-light">Publications</span></React.Fragment>
            ) : (
              <React.Fragment>Escritos y <span className="italic font-light">Publicaciones</span></React.Fragment>
            )}
          </h1>
          <p className="text-lg text-[#444444] max-w-2xl font-mono text-sm uppercase tracking-widest">
            {t("Repositorio de textos, ensayos y reflexiones críticas sobre la arquitectura, la ciudad y el diseño.")}
          </p>
        </header>

        <div className="mb-12 space-y-6">
          <div className="relative">
            <input
              type="text"
              placeholder={t("Buscar escritos...")}
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
                #{t(tag)}
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
                            {pt(item, "title")}
                          </h3>
                          <p className="text-[#555555] font-serif text-lg leading-relaxed mb-4">
                            {pt(item, "summary")}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {item.tags.map((tg) => (
                              <span
                                key={tg}
                                className="text-[10px] font-mono tracking-widest uppercase text-[#888888]"
                              >
                                #{t(tg)}
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
              {t("No se encontraron escritos que coincidan con la búsqueda.")}
            </div>
          )}

          {/* Automatic Soundtrack for Escritos Page */}
          <ProjectSoundtrackSection
            projectId="escritos"
            projectTitle={lang === "en" ? "WRITINGS & ESSAYS · SOUNDTRACK" : "ESCRITOS Y ENSAYOS · BANDA SONORA"}
            isPhoto={false}
            isDarkTheme={false}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Normaliza y formatea textos editoriales y descripciones de proyectos
 * eliminando saltos de línea huérfanos producidos en editores de código,
 * preservando párrafos reales (doble salto) y listas con viñetas.
 */
const cleanAndFormatParagraphs = (rawText) => {
  if (!rawText || typeof rawText !== "string") return [];
  const normalized = rawText.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();
  const rawBlocks = normalized.split(/\n\s*\n+/);
  const result = [];

  for (const block of rawBlocks) {
    const lines = block.split(/\n/).map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) continue;

    // Detect if lines are a bulleted or numbered list
    const isBulletList = lines.every((l) => /^[-*•·]|\d+[\.)]/.test(l));
    if (isBulletList) {
      lines.forEach((l) => result.push(l));
    } else {
      // Normal paragraph: join lines with space, smoothing soft line breaks
      const joined = lines
        .join(" ")
        .replace(/(\w+)-\s+(\w+)/g, "$1$2")
        .replace(/\s+/g, " ")
        .trim();
      if (joined) result.push(joined);
    }
  }
  return result;
};

const EscritoDetailPage = ({ escrito, onBack }) => {
  const { t, pt, lang } = useTranslation();
  if (!escrito) return null;

  const text = pt(escrito, "text");
  const paragraphs = cleanAndFormatParagraphs(text);

  return (
    <div className="w-full min-h-screen pt-24 pb-20 bg-[#f5f5f0] text-[#111111] border-x border-dashed border-[#b0b0a8] relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(176,176,168,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(176,176,168,0.2)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-8 font-sans relative z-10">
        <header className="mb-16 border-b-2 border-[#111111] pb-12 mt-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            <span className="text-xs font-mono text-[#666666] tracking-widest uppercase">
              {escrito.date}
            </span>
            <CopyPermalinkButton theme="light" />
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight uppercase relative inline-block">
            {pt(escrito, "title")}
          </h1>
          <p className="text-xl text-[#555555] font-serif italic max-w-3xl leading-relaxed mb-6">
            {pt(escrito, "summary")}
          </p>
          <div className="flex flex-wrap gap-2">
            {escrito.tags &&
              escrito.tags.map((tg) => (
                <span
                  key={tg}
                  className="px-2 py-1 text-[10px] font-mono tracking-widest uppercase border border-[#dddddd] text-[#666666]"
                >
                  #{t(tg)}
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
              {t("Documentación Visual")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {escrito.images.map((imgSrc, imgIdx) => (
                <figure key={imgIdx} className="group relative">
                  <div className="bg-[#ebebe6] border-2 border-[#111111] p-4 relative transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-[8px_8px_0_0_#111111]">
                    <OptimizedImage
                      src={imgSrc}
                      alt={`${pt(escrito, "title")} - ${lang === 'en' ? 'image' : 'imagen'} ${imgIdx + 1}`}
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

// PERMALINK & ROUTING HELPERS
const getPermalink = (viewState, filterState) => {
  if (!viewState) return "#/";
  if (viewState.page === "project" && viewState.projectId) {
    if (typeof viewState.spread === "number" && viewState.spread > 0) {
      return `#/proyecto/${viewState.projectId}/pliego/${viewState.spread + 1}`;
    }
    return `#/proyecto/${viewState.projectId}`;
  }
  if (viewState.page === "carteleria") {
    return `#/carteleria`;
  }
  if (viewState.page === "escrito-detail" && viewState.escritoId) {
    return `#/escritos/${viewState.escritoId}`;
  }
  if (viewState.page === "escritos-arquitectura") {
    return `#/escritos`;
  }
  if (viewState.page === "generacion-ia") {
    return `#/tutorialia`;
  }
  if (viewState.page === "web-design") {
    return `#/web-design`;
  }
  if (viewState.page === "subcategory" && viewState.subcategory) {
    return `#/subcategoria/${encodeURIComponent(viewState.subcategory.toLowerCase())}`;
  }
  if (viewState.page === "architecture" || (viewState.page === "home" && filterState === "architecture")) {
    return `#/arquitectura`;
  }
  if (viewState.page === "design" || (viewState.page === "home" && filterState === "design")) {
    return `#/diseno`;
  }
  if (viewState.page === "photography" || (viewState.page === "home" && filterState === "photography")) {
    return `#/fotografia`;
  }
  if (viewState.page === "scenography" || (viewState.page === "home" && filterState === "scenography")) {
    return `#/escenografias`;
  }
  if (viewState.page === "contact" || (viewState.page === "home" && filterState === "contact")) {
    return `#/contacto`;
  }
  return `#/`;
};

const parseUrlToState = () => {
  if (typeof window === "undefined") {
    return { view: { page: "home", projectId: null }, filter: "all" };
  }

  let hash = window.location.hash || "";
  let path = window.location.pathname || "";

  // Normalize route string from hash (preferred e.g. #/proyecto/abc) or pathname (/proyecto/abc)
  let route = "";
  if (hash.startsWith("#/")) {
    route = hash.slice(2);
  } else if (hash.startsWith("#")) {
    route = hash.slice(1);
  } else if (path && path !== "/") {
    route = path.startsWith("/") ? path.slice(1) : path;
  }

  route = route.split("?")[0].replace(/^\/+|\/+$/g, "");

  if (!route || route === "todos" || route === "all" || route === "home") {
    return { view: { page: "home", projectId: null }, filter: "all" };
  }

  // Category filters
  if (route === "arquitectura" || route === "architecture") {
    return { view: { page: "architecture", projectId: null }, filter: "architecture" };
  }
  if (route === "diseno" || route === "design" || route === "diseño") {
    return { view: { page: "design", projectId: null }, filter: "design" };
  }
  if (route === "fotografia" || route === "photography" || route === "fotografía") {
    return { view: { page: "photography", projectId: null }, filter: "photography" };
  }
  if (route === "escenografias" || route === "scenography" || route === "escenografías") {
    return { view: { page: "scenography", projectId: null }, filter: "scenography" };
  }
  if (route === "contacto" || route === "contact") {
    return { view: { page: "contact", projectId: null }, filter: "contact" };
  }

  // Subcategories
  if (route.startsWith("subcategoria/") || route.startsWith("subcategory/")) {
    const rawSubcat = route.split("/")[1] || "";
    const decoded = decodeURIComponent(rawSubcat);
    const foundSubcat = typeof window !== "undefined" && window.defaultProjectsData
      ? window.defaultProjectsData.map((p) => p.subcategory).find((s) => s && s.toLowerCase() === decoded.toLowerCase())
      : null;
    const subcategory = foundSubcat || decoded.toUpperCase();
    return {
      view: { page: "subcategory", subcategory, projectId: null },
      filter: "all",
    };
  }

  // Specific project or libreto: #/proyecto/:id with optional /pliego/:num or /pagina/:num
  if (route.startsWith("proyecto/") || route.startsWith("project/")) {
    const parts = route.split("/");
    const projectId = parts[1];
    if (projectId === "carteleria") {
      return { view: { page: "carteleria", projectId: "carteleria" }, filter: "all" };
    }
    let spread = 0;
    if (parts[2] === "pliego" || parts[2] === "spread" || parts[2] === "pagina" || parts[2] === "page") {
      const parsedNum = parseInt(parts[3], 10);
      if (!isNaN(parsedNum) && parsedNum > 0) {
        spread = parts[2] === "pagina" || parts[2] === "page" ? Math.floor(parsedNum / 2) : parsedNum - 1;
      }
    }
    return { view: { page: "project", projectId, spread }, filter: "all" };
  }

  // Escritos
  if (route === "escritos" || route === "textos" || route === "publicaciones" || route === "writings") {
    return { view: { page: "escritos-arquitectura", projectId: null }, filter: "architecture" };
  }
  if (route.startsWith("escritos/") || route.startsWith("textos/")) {
    const escritoId = route.split("/")[1];
    return { view: { page: "escrito-detail", escritoId, projectId: null }, filter: "architecture" };
  }

  // Standalone pages
  if (route === "tutorialia" || route === "generacion-ia") {
    return { view: { page: "generacion-ia", projectId: null }, filter: "all" };
  }
  if (route === "web-design" || route === "diseno-web") {
    return { view: { page: "web-design", projectId: null }, filter: "all" };
  }
  if (route === "carteleria" || route === "posters") {
    return { view: { page: "carteleria", projectId: "carteleria" }, filter: "all" };
  }

  // Direct project ID fallback
  const isDirectProjectId = typeof window !== "undefined" && window.defaultProjectsData &&
    window.defaultProjectsData.some((p) => p.id === route);
  if (isDirectProjectId) {
    return { view: { page: "project", projectId: route }, filter: "all" };
  }

  return { view: { page: "home", projectId: null }, filter: "all" };
};

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
    "fixed top-3.5 sm:top-4 left-3 sm:left-4 z-[140] font-mono uppercase tracking-widest text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border transition-all duration-300 cursor-pointer shadow-lg";
  const themeClasses =
    theme === "photography"
      ? "text-[#6e4418] bg-[#faf7f2]/95 backdrop-blur-md border-[#c8963e]/40 hover:bg-[#f4ede1] hover:border-[#b87d2b] shadow-sm"
      : theme === "design"
      ? "text-[#ff0000] bg-black/70 backdrop-blur-md border-[#ff0000]/40 hover:bg-[#ff0000]/20 hover:border-[#ff0000]"
      : theme === "light"
      ? "text-black bg-white/80 backdrop-blur-md border-gray-300 hover:bg-white hover:border-gray-500 shadow-sm"
      : "text-white bg-black/60 backdrop-blur-md border-gray-700 hover:bg-black/80 hover:border-gray-500";

  return (
    <button onClick={onClick} className={`${baseClasses} ${themeClasses}`}>
      &larr; {t("Volver")}
    </button>
  );
};

const NetworkGraph = ({
  onNodeClick,
  filter,
  disruptSignal,
  zoomTarget,
  highlightNodeId,
  allProjectsData: propProjectsData,
}) => {
  const { t, pt, lang } = useTranslation();
  const allProjectsData = React.useMemo(() => {
    if (propProjectsData && propProjectsData.length > 0) return propProjectsData;
    if (typeof window !== "undefined" && window.defaultProjectsData && window.defaultProjectsData.length > 0) {
      return window.defaultProjectsData;
    }
    return [];
  }, [propProjectsData]);
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
        id: "FOTOGRAFÍA",
        group: 3,
        isNavLink: true,
        isCategoryNode: true,
        targetCategory: "photography",
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
      { source: "CENTRAL_HUB", target: "FOTOGRAFÍA", value: 1 },
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
      if (project.category === "photography") return "FOTOGRAFÍA";
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
        photography: "FOTOGRAFÍA",
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
              color: filter === "design" ? 0xff0000 : filter === "photography" ? 0xc8963e : 0x00ffff,
              transparent: true,
              opacity: 0.25,
            });
            group.add(new THREE.Mesh(midGeo, midMat));

            const pupilGeo = new THREE.SphereGeometry(4, 32, 32);
            const pupilMat = new THREE.MeshPhongMaterial({
              color: filter === "design" ? 0xff0000 : filter === "photography" ? 0xc8963e : 0x00ffff,
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
            ["ARQUITECTURA", "DISEÑO", "FOTOGRAFÍA", "ESCENOGRAFÍAS", "CONTACTO"].includes(
              node.id,
            )
          ) {
            color = node.id === "FOTOGRAFÍA" ? "#c8963e" : 0x00ffff;
            textColor = node.id === "FOTOGRAFÍA" ? "#c8963e" : "#00ffff";
            radius = 6;
            textHeight = 5;
            
            if (filter === "design" && node.id === "DISEÑO") {
              color = "#ff0000";
              textColor = "#ff0000";
              radius = 8;
            } else if (filter === "photography" && node.id === "FOTOGRAFÍA") {
              color = "#b87d2b";
              textColor = "#b87d2b";
              radius = 8;
            }
          } else if (filter === "photography" && (node.isSubcategory || node.isProject)) {
             color = "#c8963e";
             textColor = "#d4a359";
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

      const isPhotoCategory = category === "photography";
      const subcategories = subcategory || isPhotoCategory
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
        sun: subcategory || isPhotoCategory ? title : p.subcategory || title,
      }));
      if (isMobile && !subcategory && category !== "escenografias" && category !== "scenography" && !isPhotoCategory) {
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
  const { t, lang } = useTranslation();
  const isEn = lang === "en";

  const CVSection = ({ title, children }) => (
    <div className="mb-8">
      <h3 className="font-mono text-sm sm:text-xl font-bold uppercase tracking-widest text-cyan-400 border-b border-gray-800 pb-2 mb-4">
        {title}
      </h3>
      <div className="text-gray-400">{children}</div>
    </div>
  );
  const CVEntry = ({ title, period, place }) => (
    <div className="mb-3 transition-transform duration-300 group hover:translate-x-2">
      <p className="font-bold text-xs sm:text-base text-gray-200 transition-colors duration-300 group-hover:text-white leading-tight mb-1">
        {title}
      </p>
      <p className="text-[10px] sm:text-sm leading-tight">{period}</p>
      {place && <p className="text-[10px] sm:text-sm text-gray-500 leading-tight">{place}</p>}
    </div>
  );
  const PublicationEntry = ({ title, details }) => (
    <div className="mb-3 transition-transform duration-300 group hover:translate-x-2">
      <p className="font-bold text-xs sm:text-base text-gray-200 transition-colors duration-300 group-hover:text-white leading-tight mb-1">
        {title}
      </p>
      <p className="text-[10px] sm:text-sm text-gray-500 leading-tight">{details}</p>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-black text-gray-300 animate-fade-in flex flex-col items-center justify-start relative overflow-hidden">
      <InteractiveGridBackground />
      <div className="w-full h-full overflow-y-auto px-4 sm:px-8 pb-12 pt-28">
        <div className="w-full max-w-6xl mx-auto z-10 relative">
          <div className="text-center mb-12 w-full flex flex-col items-center">
            <h1 className="font-mono text-4xl sm:text-5xl md:text-7xl font-bold tracking-wider uppercase text-white mb-6">
              {t("CONTACTO")}
            </h1>
            <p className="text-sm md:text-base text-gray-400 mb-8 max-w-xl px-4">
              {isEn
                ? "For collaborations, project inquiries, or any other questions, please get in touch via the email address below."
                : "Para colaboraciones, consultas sobre proyectos o cualquier otra pregunta, por favor, póngase en contacto a través del siguiente correo electrónico."}
            </p>
            <a
              href="mailto:arquitecturabenito@gmail.com"
              className="inline-block text-xs sm:text-sm font-bold text-cyan-400 border border-cyan-400 px-4 sm:px-6 py-2 tracking-widest uppercase transition-all duration-300 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_15px_#00ffff] break-all max-w-[90vw]"
            >
              arquitecturabenito@gmail.com
            </a>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 sm:gap-x-12 lg:gap-x-16">
          <div>
            <CVSection title={t("Experiencia")}>
              <CVEntry
                title={
                  <a href="https://madhel.eu/" target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4 decoration-white/50 cursor-pointer">
                    {isEn ? "Internship at MADHEL" : "Prácticas en MADHEL"}
                  </a>
                }
                period={isEn ? "June 2026 - Present" : "Junio 2026 - Actualidad"}
                place="Madrid"
              />
              <CVEntry
                title={isEn ? "Lecturer in ESMP EPU - Fundamentals of AI in Architecture" : "Docente en ESMP EPU Fundamentos de la IA en arquitectura"}
                period={isEn ? "June 2026 - July 2026" : "Junio 2026 - Julio 2026"}
                place={isEn ? "Peru, Arequipa" : "Perú, Arequipa"}
              />
              <CVEntry
                title={
                  <a href="https://www.fusterarquitectos.es/madrid/" target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4 decoration-white/50 cursor-pointer">
                    {isEn ? "Internship at FUSTER + NOHALES Architecture" : "Prácticas en FUSTER + NOHALES Arquitectura"}
                  </a>
                }
                period={isEn ? "June 2025 - September 2025" : "Junio 2025 - Septiembre 2025"}
                place="Madrid"
              />
              <CVEntry
                title={isEn ? "Teaching Assistant in History of Architecture and Urbanism" : "Becario de profesor de Hª de la arquitectura y el urbanismo"}
                period={isEn ? "September 2024 - December 2024" : "Septiembre 2024 - Diciembre 2024"}
                place={isEn ? "ETSAMadrid (3rd year)" : "ETSAMadrid (3er curso)"}
              />
              <CVEntry
                title={isEn ? "Teaching Assistant in History of Art and Architecture" : "Becario de profesor de Hª del arte y la arquitectura"}
                period={isEn ? "January 2024 - May 2024" : "Enero 2024 - Mayo 2024"}
                place={isEn ? "ETSAMadrid (1st year)" : "ETSAMadrid (1er curso)"}
              />
              <CVEntry
                title={
                  <a href="https://velzia.com/" target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4 decoration-white/50 cursor-pointer">
                    {isEn ? "Contract at Chapnik Giessen Studio" : "Contrato en estudio Chapnik Giessen"}
                  </a>
                }
                period={isEn ? "July 2023 - September 2023" : "Julio 2023 - Septiembre 2023"}
                place={isEn ? "Madrid (Rendering Dept.)" : "Madrid (Dep. Renders)"}
              />
              <CVEntry
                title={isEn ? "Architectural photography internship for CAPA" : "Prácticas de reportaje arquitectónico para CAPA"}
                period={isEn ? "January 2022" : "Enero 2022"}
                place="Madrid"
              />
              <CVEntry
                title={isEn ? "Photography internship for Cosentino" : "Prácticas de reportaje para Cosentino"}
                period={isEn ? "August 2021" : "Agosto 2021"}
                place="Madrid"
              />
              <CVEntry
                title={isEn ? "Beach cleanup volunteer coordination" : "Gestión de un voluntariado para la limpieza de playas"}
                period={isEn ? "2019 and 2020" : "2019 y 2020"}
                place="Mar Menor, Murcia"
              />
            </CVSection>
            
          </div>
          <div>
            <CVSection title={t("Formación y Cursos")}>
              <CVEntry
                title={isEn ? "Revit + BIM Course" : "Curso Revit+BIM"}
                period={isEn ? "June 2026" : "Junio 2026"}
                place="Universidad Europea"
              />
              <CVEntry
                title={isEn ? "SIHMA II - Research Seminar" : "SIHMA II - Seminario de Investigación"}
                period={isEn ? "September 2024 - February 2025" : "Septiembre 2024 - Febrero 2025"}
                place="UPM"
              />
              <CVEntry
                title={isEn ? "4th AHAU Congress - City and Nature" : "IV Congreso de la AHAU - Ciudad y naturaleza"}
                period={isEn ? "October 25 & 26, 2024" : "25 y 26 Octubre 2024"}
                place={isEn ? "Monastery of El Escorial, Madrid" : "Monasterio de El Escorial, Madrid"}
              />
              <CVEntry
                title={isEn ? "Artificial Architectures (AA) Training Program" : "Ciclo formativo Artificial Architectures(AA)"}
                period={isEn ? "November 13, 14 & 15, 2024" : "13, 14 y 15 Noviembre 2024"}
                place="ETSAM, UPM"
              />
              <CVEntry
                title={isEn ? "Seminar - BIP Erasmus+ FoodCity Workshop" : "Seminario - Workshop BIP Erasmus+ FoodCity"}
                period={isEn ? "January 2024 - February 2024" : "Enero 2024 - Febrero 2024"}
                place="Prato/Florence"
              />
              <CVEntry
                title={isEn ? "SIHMA I - Research Seminar" : "SIHMA I - Seminario de Investigación"}
                period={isEn ? "September 2023 - February 2024" : "Septiembre 2023 - Febrero 2024"}
                place="UPM"
              />
              <CVEntry
                title={isEn ? "5th Accessibility Seminars" : "V Seminarios de Accesibilidad"}
                period={isEn ? "November 17, 2023" : "17 Noviembre 2023"}
                place=""
              />
              <CVEntry
                title={isEn ? "Rhinoceros 7 Course" : "Curso de Rhinoceros 7"}
                period="ETSAM 2021"
                place=""
              />
            </CVSection>
          </div>
          <div>
            <CVSection title={t("Logros")}>
              <CVEntry
                title={isEn ? "Meta XR Lab, founder and president" : "Meta XR Lab, fundador y presidente"}
                period={isEn ? "2021 - Present" : "2021 - Actualmente"}
                place=""
              />
              <CVEntry
                title={isEn ? "1st prize in photography competition: Fashion & Architecture" : "1er premio en el concurso de fotografía: moda y arquitectura"}
                period="2021"
                place="CEMEX"
              />
            </CVSection>
            <CVSection title={t("Publicaciones")}>
              <PublicationEntry
                title={isEn ? "Light models: Architectural «light painting»" : "Maquetas de luz: «Light painting» arquitectónico"}
                details="(2025), Madrid"
              />
              <PublicationEntry
                title={isEn ? "The monastery of El Escorial: An environmental history" : "El monasterio de El Escorial: una historia medioambiental"}
                details={isEn ? "(2024), Madrid, with Eduardo Prieto" : "(2024), Madrid, con Eduardo Prieto"}
              />
              <PublicationEntry
                title="V de Vigueta n°11"
                details={isEn ? "(2023) Illustrated article" : "(2023) Artículo ilustrado"}
              />
              <PublicationEntry
                title={isEn ? "Building “bridges” between the University and the Madrid social fabric" : "Estableciendo “puentes” entre la Universidad y el tejido social madrileño"}
                details="(2023), ETSAM, UPM, Madrid"
              />
            </CVSection>
          </div>
        </div>

        {/* Contact Page Soundtrack */}
        <ProjectSoundtrackSection
          projectId="contact"
          projectTitle={isEn ? "CONTACT · SOUNDTRACK" : "CONTACTO · BANDA SONORA"}
          isDarkTheme={true}
        />

        <footer className="relative text-xs text-gray-500 z-10 text-center py-4 mt-8">
          © 2024 Benito González Quiñones
        </footer>
      </div>
      </div>
    </div>
  );
};

const FolderSprite = ({ images, isDesignMode }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  
  React.useEffect(() => {
    if (!images || images.length <= 1) return;
    
    // Start at a random index to avoid visual sync on load
    setCurrentIndex(Math.floor(Math.random() * images.length));
    
    // Randomize the interval duration between 1.5s and 3s for each folder
    const randomInterval = 1500 + Math.random() * 1500;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, randomInterval);
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden opacity-30 group-hover:opacity-70 transition-opacity duration-300 pointer-events-none p-4 rounded-inherit flex items-center justify-center">
      <OptimizedImage
        src={images[currentIndex]}
        className="w-full h-full object-contain mix-blend-screen"
        theme={isDesignMode ? "design" : "dark"}
      />
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
  const { t, pt, lang } = useTranslation();
  const isEn = lang === "en";
  const isPhotographyMode = filter === "photography";
  const [activeFolder, setActiveFolder] = React.useState(null);
  const [isFolderMinimized, setIsFolderMinimized] = React.useState(false);

  const getFolderImages = React.useCallback((subcat) => {
    return allProjectsData
      .filter((p) => !p.isPage && p.subcategory === subcat && p.normalImage)
      .map((p) => p.normalImage);
  }, []);

  let items = [];
  if (filter === "photography") {
    // EL APARTADO DE FOTOGRAFÍA NO MUESTRA CARPETAS SINO DIRECTAMENTE ESTOS 4 LIBRETOS EN FORMATO A5
    const photoProjects = allProjectsData.filter(
      (p) => p.category === "photography" || p.isLibreto
    );
    const desiredOrder = ["vida-en-tetuan", "rapa-das-bestas-2025", "cartagena-2023", "cuaderno-de-campo-2024"];
    const sortedPhotos = [...photoProjects].sort((a, b) => {
      const idxA = desiredOrder.indexOf(a.id);
      const idxB = desiredOrder.indexOf(b.id);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return 0;
    });
    sortedPhotos.forEach((p) => {
      items.push({ ...p, isGroup: false });
    });
  } else if (subcategory) {
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

      if (catId === "photography") {
        catProjects.forEach((p) => {
          items.push({ ...p, isGroup: false });
        });
        return;
      }

      catProjects
        .filter((p) => p.isPage)
        .forEach((p) => {
          items.push({
            id: p.id,
            title: p.title,
            isGroup: true,
            type: "page",
            pageId: p.id,
            category: p.category,
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
          category: catId,
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
    addCategoryGroups("photography", "FOTOGRAFÍA");
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

      if (p.category === "photography" || p.isLibreto) {
        items.push({ ...p, isGroup: false });
      } else if (p.isPage) {
        items.push({
          id: p.id,
          title: p.title,
          isGroup: true,
          type: "page",
          pageId: p.id,
          category: p.category,
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
            category: p.category,
          });
        }
      } else {
        items.push({ ...p, isGroup: false });
      }
    });
  }

  return (
    <div
      className={`w-full h-full overflow-y-auto hide-scrollbar pt-16 sm:pt-20 md:pt-28 pb-28 px-4 sm:px-8 md:px-16 relative ${
        isPhotographyMode ? "bg-[#faf8f4] text-[#2c2419]" : ""
      }`}
      style={{
        backgroundColor: isPhotographyMode ? "#faf8f4" : "transparent",
        backgroundImage: isPhotographyMode ? "radial-gradient(#d4a359 0.75px, transparent 0.75px)" : "none",
        backgroundSize: isPhotographyMode ? "28px 28px" : "auto",
      }}
    >

      {activeFolder && !isFolderMinimized && (() => {
        const activeFolderCat = allProjectsData.find(p => p.subcategory === activeFolder)?.category;
        const isDesignMode = filter === "design" || activeFolderCat === "design";
        return (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pt-32 pb-28 sm:p-12 animate-fade-in bg-black/80 backdrop-blur-md" onClick={() => setActiveFolder(null)}>
            <div 
              className={`w-full h-full sm:max-w-6xl sm:h-[80vh] flex flex-col hide-scrollbar relative overflow-hidden shadow-2xl ${isDesignMode ? "bg-[#0000ff] border-2 border-[#FFCC00] rounded-none" : "bg-black border border-white/20 rounded-xl sm:rounded-2xl"}`}
              onClick={(e) => e.stopPropagation()}
              style={{ 
                boxShadow: isDesignMode ? (window.innerWidth < 768 ? "4px 4px 0px rgba(255,0,0,0.8)" : "20px 20px 0px rgba(255,0,0,0.5)") : "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255,255,255,0.1) inset" 
              }}
            >
              {/* Sticky Header with Mac OS controls */}
              <div className={`flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b shrink-0 sticky top-0 z-30 ${isDesignMode ? "border-[#FFCC00] bg-[#0000ff]" : "border-white/10 bg-black/95"}`}>
                <h2 className={`text-base sm:text-2xl uppercase tracking-widest truncate mr-2 ${isDesignMode ? "text-[#FFCC00] font-bold font-mono" : "text-white font-serif"}`}>
                  {t(activeFolder)}
                </h2>
                <div className="flex space-x-3 sm:space-x-2 items-center shrink-0 group">
                  <button onClick={(e) => { e.stopPropagation(); setIsFolderMinimized(true); }} className="w-6 h-6 sm:w-4 sm:h-4 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer flex items-center justify-center text-black opacity-80 sm:opacity-60 group-hover:opacity-100" aria-label={t("Minimizar")}>
                    <svg className="w-3 h-3 sm:w-2 sm:h-2" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 7H12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); setActiveFolder(null); }} className="w-6 h-6 sm:w-4 sm:h-4 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer flex items-center justify-center text-black opacity-80 sm:opacity-60 group-hover:opacity-100" aria-label="Close">
                    <svg className="w-3 h-3 sm:w-2 sm:h-2" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-10 hide-scrollbar">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-8">
                  {allProjectsData
                    .filter((p) => p.subcategory === activeFolder && !p.isPage)
                    .map((item, index) => {
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
                      
                      return (
                        <div
                          key={item.id}
                          className={`group relative cursor-pointer transition-all duration-300 flex flex-col items-center justify-center aspect-square ${isDesignMode ? "p-4 " + designColorGroup + " hover:bg-[#0000ff]/20" : "border border-dashed border-gray-700 hover:border-white hover:bg-gray-900/30 p-2"}`}
                          onClick={() => onProjectSelect(item.id)}
                        >
                          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full border border-gray-400 group-hover:border-white transition-colors bg-black/50"></div>
                          {item.normalImage && (
                            <div className={`absolute ${isDesignMode ? "inset-3 sm:inset-5 " + randomRadius : "inset-2 sm:inset-3"} overflow-hidden transition-all duration-500 pointer-events-none`}>
                              <OptimizedImage
                                src={item.normalImage}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                containerClassName="w-full h-full"
                                theme={isDesignMode ? "design" : "dark"}
                              />
                            </div>
                          )}
                          <div className={`absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 bg-black/80 backdrop-blur-sm pt-1 pb-1.5 z-10 ${isDesignMode ? "border-none rounded-full" : "border-t border-gray-800"} pointer-events-none`}>
                            <h3 className={`text-center font-mono text-[9px] sm:text-xs tracking-widest uppercase transition-colors truncate px-1 ${isDesignMode ? "text-[#FFCC00] group-hover:text-[#FF0000] font-bold" : "text-gray-300 group-hover:text-white"}`}>
                              {pt(item, "title")}
                            </h3>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {activeFolder && isFolderMinimized && (() => {
        const activeFolderCat = allProjectsData.find(p => p.subcategory === activeFolder)?.category;
        const isDesignMode = filter === "design" || activeFolderCat === "design";
        return (
          <div 
            className={`fixed right-0 top-1/2 -translate-y-1/2 z-[100] flex items-center cursor-pointer transition-transform hover:-translate-x-2 ${isDesignMode ? "bg-[#0000ff] border-2 border-r-0 border-[#FFCC00]" : "bg-black border border-r-0 border-white/20"} rounded-l-xl p-3 sm:p-3 shadow-2xl group animate-fade-in`}
            onClick={() => setIsFolderMinimized(false)}
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            <span className={`text-xs sm:text-sm tracking-widest uppercase mb-3 sm:mb-4 ${isDesignMode ? "text-[#FFCC00] font-mono font-bold" : "text-white font-serif"}`}>
              {t(activeFolder)}
            </span>
            <div className="flex flex-col space-y-2" style={{ writingMode: 'horizontal-tb' }}>
              <button 
                onClick={(e) => { e.stopPropagation(); setActiveFolder(null); setIsFolderMinimized(false); }} 
                className="w-6 h-6 sm:w-4 sm:h-4 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer flex items-center justify-center text-black opacity-80 sm:opacity-60 group-hover:opacity-100"
              >
                <svg className="w-3 h-3 sm:w-2 sm:h-2" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        );
      })()}

      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
        {items.map((item, index) => {
          const isItemDesign = item.category === "design" || item.targetCategory === "design" || (item.type === "subcategory" && item.id.startsWith("design-"));
          const isDesignMode = filter === "design" || isItemDesign;
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
            const isPhotoCat = item.targetCategory === "photography";
            const shapeClass = isDesignMode 
              ? designColorGroup 
              : isPhotoCat
              ? "rounded-none border-2 sm:border-4 border-[#c8963e]/80 bg-[#fbf9f4]/90 shadow-[0_4px_25px_rgba(200,150,62,0.18)]"
              : isMainCategory
              ? "rounded-none border-2 sm:border-4 border-white/70 bg-white/5"
              : "rounded-full border border-white/10 bg-white/5";

            const titleColor = isDesignMode 
              ? "text-[#FFCC00] group-hover:text-[#FF0000]" 
              : isPhotoCat
              ? "text-[#8c5822] group-hover:text-[#b87d2b]"
              : "text-white/95 group-hover:text-cyan-400";

            return (
              <div
                key={item.id}
                className={`group relative cursor-pointer flex items-center justify-center hover:bg-white/10 hover:border-cyan-400/50 hover:scale-105 backdrop-blur-md transition-all duration-300 w-full aspect-square shadow-lg flex-col p-4 sm:p-6 overflow-hidden ${shapeClass}`}
                onClick={() => {
                  if (item.type === "page") {
                    onProjectSelect(item.pageId, true);
                  } else if (item.type === "category") {
                    if (onFilterChange) onFilterChange(item.targetCategory);
                  } else {
                    setActiveFolder(item.subcategory);
                    setIsFolderMinimized(false);
                  }
                }}
              >
                {!isMainCategory && item.type === "subcategory" && (
                  <FolderSprite images={getFolderImages(item.subcategory)} isDesignMode={isDesignMode} />
                )}
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
                          stroke={isDesignMode ? "rgba(255, 0, 0, 0.8)" : isPhotoCat ? "rgba(200, 150, 62, 0.8)" : "rgba(34, 211, 238, 0.8)"}
                          strokeWidth={isDesignMode ? "3" : "1"}
                          strokeDasharray="30 400"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </>
                )}
                <h3
                  className={`text-center uppercase font-serif font-bold text-base sm:text-lg md:text-xl lg:text-2xl tracking-wider leading-tight px-3 sm:px-6 select-none transition-colors duration-300 relative z-10 drop-shadow-md ${titleColor}`}
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {pt(item, "title")}
                </h3>
              </div>
            );
          }

          const isPhotography = item.category === "photography" || item.isLibreto || filter === "photography";
          if (isPhotography) {
            return (
              <div
                key={item.id}
                className="group relative cursor-pointer transition-all duration-500 flex flex-col justify-between aspect-[148/210] w-full max-w-[280px] mx-auto bg-[#faf7f2] border border-[#d4a359]/40 hover:border-[#b87d2b] shadow-md hover:shadow-2xl hover:-translate-y-1 rounded-sm overflow-hidden"
                onClick={() => onProjectSelect(item.id)}
              >
                {/* Left booklet spine effect */}
                <div className="absolute left-0 top-0 bottom-0 w-3 sm:w-3.5 bg-gradient-to-r from-[#8c5822] to-[#b87d2b] z-20 shadow-[2px_0_6px_rgba(0,0,0,0.18)] flex flex-col justify-between py-3 items-center">
                  <div className="w-[1px] h-full bg-white/35"></div>
                </div>

                {/* Cover Image (first image of A5) */}
                <div className="relative w-full h-full overflow-hidden pl-3 sm:pl-3.5 bg-[#fdfbf7]">
                  {item.coverImage || item.normalImage ? (
                    <OptimizedImage
                      src={item.coverImage || item.normalImage}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      containerClassName="w-full h-full"
                      theme="photography"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-mono text-xs text-[#8c5822]">
                      ISO A5
                    </div>
                  )}

                  {/* Top Tag */}
                  <div className="absolute top-2.5 right-2.5 z-20 px-2 py-0.5 bg-black/70 backdrop-blur-md rounded-full border border-white/20 text-white font-mono text-[8px] sm:text-[9px] uppercase tracking-wider">
                    LIBRETO A5
                  </div>

                  {/* Bottom title banner in minimalist white & ochre */}
                  <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3 bg-gradient-to-t from-black/90 via-black/75 to-transparent z-20 text-left pl-3 sm:pl-4">
                    <span className="block font-mono text-[8px] sm:text-[9px] text-[#e0a94e] tracking-widest uppercase mb-0.5">
                      {pt(item, "subcategory") || "FOTOGRAFÍA"} · {item.year || "2024–2025"}
                    </span>
                    <h3 className="font-serif font-bold text-sm sm:text-base text-white group-hover:text-[#f5d594] transition-colors leading-tight drop-shadow-md">
                      {pt(item, "title")}
                    </h3>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div
              key={item.id}
              className={`group relative cursor-pointer transition-all duration-300 flex flex-col items-center justify-center aspect-square ${isDesignMode ? "p-4 " + designColorGroup + " hover:bg-[#0000ff]/20" : "border border-dashed border-gray-700 hover:border-white hover:bg-gray-900/30 p-2"}`}
              onClick={() => onProjectSelect(item.id)}
            >
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full border border-gray-400 group-hover:border-white transition-colors bg-black/50"></div>
              {item.normalImage && (
                <div className={`absolute ${isDesignMode ? "inset-3 sm:inset-5 " + randomRadius : "inset-2 sm:inset-3"} overflow-hidden transition-all duration-500 pointer-events-none`}>
                  <OptimizedImage
                    src={item.normalImage}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    containerClassName="w-full h-full"
                    theme={isDesignMode ? "design" : "dark"}
                  />
                </div>
              )}
              <div className={`absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 bg-black/80 backdrop-blur-sm pt-1 pb-1.5 z-10 ${isDesignMode ? "border-none rounded-full" : "border-t border-gray-800"} pointer-events-none`}>
                <h3 className={`text-center font-mono text-[9px] sm:text-xs tracking-widest uppercase transition-colors truncate px-1 ${isDesignMode ? "text-[#FFCC00] group-hover:text-[#FF0000] font-bold" : "text-gray-300 group-hover:text-white"}`}>
                  {pt(item, "title")}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* INSTAGRAM LINK BUTTONS AT THE END OF PUBLICATIONS */}
      {filter === "photography" && (
        <div className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center mt-16 mb-8 pt-10 border-t border-[#d4a359]/30 animate-fade-in">
          <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#8c5822] mb-3 text-center">
            {isEn ? "EXPLORE FULL ANALOG ARCHIVE ON INSTAGRAM" : "EXPLORAR ARCHIVO ANALÓGICO COMPLETO EN INSTAGRAM"}
          </p>
          <a
            href="https://www.instagram.com/camaradebenito/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#f4ede2] hover:bg-[#ebdec9] border border-[#c8963e]/70 text-[#6e4418] font-mono text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 cursor-pointer"
          >
            <svg className="w-5 h-5 text-[#8c5822] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span className="font-bold">@camaradebenito</span>
            <span className="text-[#8c5822]/60 hidden sm:inline">· {isEn ? "Photography on Instagram" : "Fotografía en Instagram"}</span>
            <svg className="w-4 h-4 text-[#8c5822] group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      )}

      {(filter === "architecture" || filter === "design") && (
        <div className={`max-w-7xl mx-auto w-full flex flex-col items-center justify-center mt-16 mb-8 pt-10 ${filter === "design" ? "border-t border-[#FFCC00]/40" : "border-t border-white/10"} animate-fade-in`}>
          <p className={`font-mono text-[9px] sm:text-[10px] uppercase tracking-widest mb-3 text-center ${filter === "design" ? "text-[#FFCC00]" : "text-gray-400"}`}>
            {isEn ? "EXPLORE MORE ARCHITECTURAL & DESIGN WORKS" : "EXPLORAR MÁS PROYECTOS DE ARQUITECTURA Y DISEÑO"}
          </p>
          <a
            href="https://www.instagram.com/arquitecturabenito/"
            target="_blank"
            rel="noopener noreferrer"
            className={
              filter === "design"
                ? "group inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#0000ff] hover:bg-[#0000ff]/90 border-2 border-[#FFCC00] text-[#FFCC00] font-mono text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 shadow-[4px_4px_0px_#FF0000] hover:scale-105 cursor-pointer"
                : "group inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 hover:border-cyan-400 text-white font-mono text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-cyan-400/20 hover:scale-105 backdrop-blur-md cursor-pointer"
            }
          >
            <svg className={`w-5 h-5 ${filter === "design" ? "text-[#FFCC00]" : "text-cyan-400"} group-hover:scale-110 transition-transform`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span className="font-bold">@arquitecturabenito</span>
            <span className={`${filter === "design" ? "text-[#FFCC00]/70" : "text-gray-400"} hidden sm:inline`}>
              · {filter === "design" ? (isEn ? "Design on Instagram" : "Diseño en Instagram") : (isEn ? "Architecture on Instagram" : "Arquitectura en Instagram")}
            </span>
            <svg className={`w-4 h-4 ${filter === "design" ? "text-[#FF0000]" : "text-cyan-400"} group-hover:translate-x-1 transition-transform`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
};

const CarteleriaPage = ({ project }) => {
  const { t, pt, lang } = useTranslation();
  const [modalImage, setModalImage] = React.useState(null);

  if (!project) return null;

  const openModal = (imgSrc) => setModalImage(imgSrc);
  const closeModal = () => setModalImage(null);

  const postersToDisplay = React.useMemo(() => {
    if (project.posterImages && project.posterImages.length > 0) {
      return project.posterImages;
    }
    if (project.images && project.images.length > 0) {
      return project.images;
    }
    // Fallback: auto-generate standard poster image paths (1 to 12) + normalImage
    const generated = [];
    if (project.normalImage) generated.push(project.normalImage);
    for (let i = 1; i <= 12; i++) {
      generated.push(`imagenes/carteles/carteleria-${i}.webp`);
    }
    return generated;
  }, [project]);

  return (
    <div className="w-full min-h-screen bg-black text-white animate-fade-in relative overflow-y-auto">
      <InteractiveGridBackground theme="dark" />
      <main className="max-w-6xl mx-auto z-10 relative pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-6xl font-bold font-mono uppercase tracking-wider text-white mb-16 text-center">
          {pt(project, "title")}
        </h1>

        <div className="mb-16">
          <h2 className="text-3xl font-bold uppercase tracking-wider mb-6 text-white">
            {t("Descripción")}
          </h2>
          <div className="border-l-2 border-cyan-400 pl-6 space-y-4">
            {cleanAndFormatParagraphs(pt(project, "description")).map((p, idx) => (
              <p key={idx} className="text-gray-300 leading-relaxed text-base sm:text-lg">
                {p}
              </p>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold uppercase tracking-wider mb-6 text-white">
            {t("Galería de Carteles")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {postersToDisplay.map((src, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                onClick={() => openModal(src)}
              >
                <OptimizedImage
                  src={src}
                  alt={lang === 'en' ? `Poster ${index + 1}` : `Cartel ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover transition-transform duration-300 transform group-hover:scale-105 rounded-md shadow-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Cartelería Soundtrack */}
      <ProjectSoundtrackSection
        projectId="carteleria"
        projectTitle={pt(project, "title") || (lang === "en" ? "POSTER DESIGN" : "CARTELERÍA")}
        isDarkTheme={true}
      />

      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeModal}
        >
          <OptimizedImage
            src={modalImage}
            alt={lang === 'en' ? "Enlarged poster view" : "Vista ampliada del cartel"}
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
  const { t, lang } = useTranslation();
  const isEn = lang === "en";
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
            {isEn ? "AI TUTORIAL" : "TUTORIAL IA"}
          </h1>
          <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase">
            {isEn ? "Architecture, Design and Generative Tools" : "Arquitectura, Diseño y Herramientas Generativas"}
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
              <Section title={isEn ? "Welcome to the Workshop" : "Bienvenidos al Curso"}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6 text-lg leading-relaxed">
                    <p>
                      {isEn ? (
                        <React.Fragment>In this workshop, we will explore how <span className="text-white font-bold">Artificial Intelligence</span> is revolutionizing architectural workflows and spatial design.</React.Fragment>
                      ) : (
                        <React.Fragment>En este curso exploraremos cómo la <span className="text-white font-bold">Inteligencia Artificial</span> está transformando el flujo de trabajo en arquitectura y diseño.</React.Fragment>
                      )}
                    </p>
                    <p>
                      {isEn
                        ? "It is not merely about producing images, but understanding how to harness these neural tools to amplify creative potential and streamline design ideation."
                        : "No se trata solo de generar imágenes, sino de entender cómo usar estas herramientas para potenciar nuestra creatividad y optimizar procesos de ideación."}
                    </p>
                    <div className="p-4 bg-cyan-900/20 border-l-4 border-cyan-400 rounded-r-lg">
                      <p className="text-sm italic text-cyan-200">
                        {isEn
                          ? '"AI will not replace architects; architects who master AI will replace those who do not."'
                          : '"La IA no reemplaza al diseñador, el diseñador que usa IA reemplaza al que no la usa."'}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                      <OptimizedImage
                        src="imagenes/gif-animacion-ia.gif"
                        alt={isEn ? "AI Concept Animation" : "IA Concept"}
                        className="relative rounded-lg shadow-2xl w-full max-w-sm border border-white/10"
                      />
                    </div>
                  </div>
                </div>
              </Section>

              <Section title={isEn ? "Our Tools" : "Nuestras Herramientas"}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div
                    className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                    onClick={() => setActiveTool("foocus")}
                  >
                    <h3 className="text-cyan-400 font-bold mb-2">FOOCUS</h3>
                    <p className="text-sm text-gray-400">
                      {isEn
                        ? "Pure power paired with simplicity. Ideal for rapid, high-fidelity conceptual results."
                        : "Poder absoluto con simplicidad. Ideal para resultados rápidos de alta calidad."}
                    </p>
                  </div>
                  <div
                    className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                    onClick={() => setActiveTool("comfy")}
                  >
                    <h3 className="text-cyan-400 font-bold mb-2">COMFY UI</h3>
                    <p className="text-sm text-gray-400">
                      {isEn
                        ? "Node-based generative architecture. Absolute control and granular customization."
                        : "Flujos de trabajo basados en nodos. Control total y personalización granular."}
                    </p>
                  </div>
                  <div
                    className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                    onClick={() => setActiveTool("webui")}
                  >
                    <h3 className="text-cyan-400 font-bold mb-2">WEB UI</h3>
                    <p className="text-sm text-gray-400">
                      {isEn
                        ? "The open community standard. Versatile and compatible with thousands of extensions."
                        : "El estándar de la comunidad. Versátil y compatible con miles de extensiones."}
                    </p>
                  </div>
                </div>
              </Section>

              <Section title={isEn ? "Key Concepts" : "Conceptos Clave"}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gray-900/50 rounded-xl border border-white/10">
                    <h3 className="text-cyan-400 font-bold mb-3 flex items-center gap-2">
                      <span className="text-xl">📝</span> {isEn ? "Prompts (Positive and Negative)" : "Prompts (Positivo y Negativo)"}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {isEn ? (
                        <React.Fragment>The textual instructions used to communicate intent to the AI. <span className="text-white font-bold">Positive</span> outlines the visual elements to create, while <span className="text-white font-bold">Negative</span> specifies artifacts, defects, or styles to exclude.</React.Fragment>
                      ) : (
                        <React.Fragment>Es el texto que usamos para comunicarnos con la IA. El <span className="text-white font-bold">Positivo</span> describe lo que queremos ver, mientras que el <span className="text-white font-bold">Negativo</span> le indica qué elementos o defectos debe evitar.</React.Fragment>
                      )}
                    </p>
                  </div>

                  <div className="p-6 bg-gray-900/50 rounded-xl border border-white/10">
                    <h3 className="text-cyan-400 font-bold mb-3 flex items-center gap-2">
                      <span className="text-xl">⚙️</span> {isEn ? "Preprocessor" : "Preprocesador"}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {isEn
                        ? "A module that analyzes a reference image (such as an architectural sketch or clay 3D model) to extract geometric edges (Canny/Lineart) or spatial depth (Depth) before neural diffusion."
                        : "Herramienta que analiza una imagen base (ej. un croquis o render sin materiales) para extraer información geométrica, como bordes (Canny/Lineart) o profundidad (Depth), antes de pasársela a la IA."}
                    </p>
                  </div>

                  <div className="p-6 bg-gray-900/50 rounded-xl border border-white/10">
                    <h3 className="text-cyan-400 font-bold mb-3 flex items-center gap-2">
                      <span className="text-xl">⚖️</span> {isEn ? "Weight" : "Weight (Peso)"}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {isEn
                        ? "Determines the exact influence of a reference image or ControlNet map on generation. A weight of 1.0 strictly preserves geometry, whereas 0.3 allows greater creative interpretation."
                        : "Determina la influencia de una imagen de referencia o ControlNet sobre la generación final. Un peso de 1.0 obliga a la IA a respetar la forma al máximo, mientras que 0.3 le da más libertad creativa."}
                    </p>
                  </div>

                  <div className="p-6 bg-gray-900/50 rounded-xl border border-white/10">
                    <h3 className="text-cyan-400 font-bold mb-3 flex items-center gap-2">
                      <span className="text-xl">🧠</span> Denoising Strength
                    </h3>
                    <p className="text-sm text-gray-400">
                      {isEn
                        ? "In Image-to-Image or Inpainting pipelines, defines how drastically the source is altered. Low values (0.2–0.4) subtly enhance textures; higher values (0.7–1.0) completely redraw the structure."
                        : "En procesos de modificación (Image-to-Image o Inpainting), define cuánto se alterará la imagen original. Valores bajos (0.2-0.4) cambian sutilmente texturas; valores altos (0.7-1.0) rediseñan por completo."}
                    </p>
                  </div>

                  <div className="p-6 bg-gray-900/50 rounded-xl border border-white/10 md:col-span-2">
                    <h3 className="text-cyan-400 font-bold mb-3 flex items-center gap-2">
                      <span className="text-xl">✨</span> {isEn ? "Other Core Parameters" : "Otros Parámetros Importantes"}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm mt-4">
                      <div>
                        <strong className="text-white block mb-1">
                          {isEn ? "Checkpoint / Base Model:" : "Checkpoint / Modelo Base:"}
                        </strong>
                        <span className="text-gray-400">
                          {isEn
                            ? "The core neural foundation containing all pretrained visual knowledge (e.g., SDXL, SD 1.5)."
                            : "Es el \"cerebro\". Contiene todo el conocimiento visual preentrenado (ej. SDXL, SD 1.5)."}
                        </span>
                      </div>
                      <div>
                        <strong className="text-white block mb-1">
                          {isEn ? "Steps:" : "Steps (Pasos):"}
                        </strong>
                        <span className="text-gray-400">
                          {isEn
                            ? "Number of iterative denoising passes to sculpt fidelity and fine details (commonly 20 to 30)."
                            : "Iteraciones que realiza la IA para limpiar el ruido y generar detalles. Lo normal es entre 20 y 30."}
                        </span>
                      </div>
                      <div>
                        <strong className="text-white block mb-1">
                          CFG Scale:
                        </strong>
                        <span className="text-gray-400">
                          {isEn
                            ? "How strictly the diffusion process adheres to your prompt versus creative hallucination (standard: 5 to 7)."
                            : "Qué tanto caso le hace la IA a tu prompt frente a su propia \"imaginación\" (valores comunes: 5 a 7)."}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Section>

              <Section title={isEn ? "Advanced Architecture Concepts" : "Conceptos Avanzados"}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-cyan-900/10 rounded-xl border border-cyan-800/30">
                    <h3 className="text-cyan-400 font-bold mb-3 flex items-center gap-2">
                      <span className="text-xl">🧬</span> LoRA (Low-Rank Adaptation)
                    </h3>
                    <p className="text-sm text-gray-400">
                      {isEn
                        ? "Specialized micro-weights injected into base models to teach specific architectural vocabularies without retraining from scratch—ideal for mastering signature styles (e.g., Zaha Hadid), tactile materials (board-formed concrete), or endemic botany."
                        : "Son \"micro-modelos\" que se añaden al modelo principal para enseñarle conceptos muy específicos sin tener que reentrenar todo desde cero. En arquitectura, se usan para inyectar estilos de arquitectos concretos (ej. Zaha Hadid), materiales específicos (hormigón visto perfecto) o tipos concretos de vegetación."}
                    </p>
                  </div>

                  <div className="p-6 bg-cyan-900/10 rounded-xl border border-cyan-800/30">
                    <h3 className="text-cyan-400 font-bold mb-3 flex items-center gap-2">
                      <span className="text-xl">🕸️</span> ControlNet Superior
                    </h3>
                    <p className="text-sm text-gray-400">
                      {isEn ? (
                        <React.Fragment>Unlike naive image-to-image blending, ControlNet binds generative diffusion to explicit spatial conditions: <span className="text-white font-bold">Canny/Lineart</span> (for linework), <span className="text-white font-bold">Depth</span> (for 3D spatial buffers), and <span className="text-white font-bold">MLSD</span> (for crisp architectural vanishing lines).</React.Fragment>
                      ) : (
                        <React.Fragment>A diferencia del Image-to-Image tradicional, ControlNet usa mapas precisos para \"obligar\" a la IA a respetar un dibujo espacial. Existen varios tipos clave: <span className="text-white font-bold">Canny/Lineart</span> (para trazos), <span className="text-white font-bold">Depth</span> (para mapas de profundidad extraídos de 3D) y <span className="text-white font-bold">MLSD</span> (especializado en líneas rectas y fugas de arquitectura).</React.Fragment>
                      )}
                    </p>
                  </div>

                  <div className="p-6 bg-cyan-900/10 rounded-xl border border-cyan-800/30">
                    <h3 className="text-cyan-400 font-bold mb-3 flex items-center gap-2">
                      <span className="text-xl">🔍</span> {isEn ? "Upscaling (Latent Super-Resolution)" : "Upscaling (Escalado Latente)"}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {isEn
                        ? "Diffusion models perform best at native sizes (1024x1024). For 4K competition sheets, tile-based upscalers synthesize micro-architectural elements (cladding joints, foliage, subtle caustics) rather than stretching pixels."
                        : "La IA genera de forma óptima a resoluciones medias (ej. 1024x1024). Para renders de presentación 4K, usamos algoritmos de escalado (Ultimate SD Upscale, ControlNet Tile) que no se limitan a agrandar los píxeles, sino que \"alucinan\" e insertan detalles arquitectónicos finos (juntas, texturas, hojas) en alta resolución."}
                    </p>
                  </div>

                  <div className="p-6 bg-cyan-900/10 rounded-xl border border-cyan-800/30">
                    <h3 className="text-cyan-400 font-bold mb-3 flex items-center gap-2">
                      <span className="text-xl">🌱</span> Seed
                    </h3>
                    <p className="text-sm text-gray-400">
                      {isEn
                        ? "Every generative run begins with Gaussian noise seeded by an integer. Locking the Seed preserves global massing and perspective, allowing progressive material and lighting iterations."
                        : "Todo proceso generativo empieza con ruido aleatorio, y la \"Seed\" es el número que define exactamente ese ruido. Si usas el mismo Prompt, Ajustes y la misma Seed, obtendrás el mismo resultado. Es la técnica clave para hacer cambios sutiles sin que todo el edificio cambie de composición al volver a darle a Generar."}
                    </p>
                  </div>
                </div>
              </Section>

              <Section title={isEn ? "ControlNet: Types and Modalities" : "ControlNet: Tipos y Modelos"}>
                <div className="space-y-6 text-sm text-gray-400 leading-relaxed">
                  <p>
                    {isEn
                      ? "ControlNet is a neural network architecture designed to spatially constrain large latent diffusion models with structural conditioning maps. Key modalities include:"
                      : "ControlNet es una arquitectura de red neuronal que permite controlar espacialmente grandes modelos de difusión mediante mapas precisos. Aquí se explican los tipos más importantes:"}
                  </p>

                  <div className="space-y-4">
                    <h4 className="text-white font-bold text-base border-b border-white/10 pb-2">
                      {isEn ? "1. Edge and Outline Extraction" : "1. Detección de Bordes y Contornos"}
                    </h4>
                    <ul className="space-y-3">
                      <li>
                        <strong className="text-cyan-400">Canny:</strong>{" "}
                        {isEn
                          ? "Uses edge detection to extract precise contour vectors, ideal for preserving technical silhouettes and structural profiles."
                          : "Utiliza el algoritmo homónimo para extraer contornos precisos de una imagen. Es ideal para replicar la estructura exacta de un objeto, un vehículo o una persona."}
                      </li>
                      <li>
                        <strong className="text-cyan-400">Lineart:</strong>{" "}
                        {isEn
                          ? "Converts plans and elevations into clean line art, rendering directly upon technical linework."
                          : "Transforma una imagen en un dibujo de líneas limpias tipo arte lineal."}
                      </li>
                      <li>
                        <strong className="text-cyan-400">Scribble:</strong>{" "}
                        {isEn
                          ? "Processes rapid conceptual gestures and freehand sketches, converting rough outlines into realistic spatial renderings."
                          : "Funciona a partir de bocetos y garabatos básicos, permitiendo que la IA interprete dibujos simples y los convierta en imágenes fotorrealistas."}
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-white font-bold text-base border-b border-white/10 pb-2">
                      {isEn ? "2. Structure and Spatial Depth" : "2. Estructura y Composición"}
                    </h4>
                    <ul className="space-y-3">
                      <li>
                        <strong className="text-cyan-400">OpenPose:</strong>{" "}
                        {isEn
                          ? "Extracts skeletal joints and human figure postures to populate renders with scale figures in accurate poses."
                          : "Detecta y localiza las articulaciones, el rostro y las manos de los sujetos humanos en la imagen de control. Garantiza que los personajes generados mantengan exactamente la misma postura."}
                      </li>
                      <li>
                        <strong className="text-cyan-400">Depth:</strong>{" "}
                        {isEn
                          ? "Produces a continuous greyscale z-buffer representing scene depth (foreground in white, distant horizon in black), locking 3D parallax."
                          : "Genera un mapa en escala de grises que representa la distancia de los elementos en la escena (objetos cercanos en blanco, fondos lejanos en oscuro). Sirve para mantener la composición 3D y el espacio."}
                      </li>
                      <li>
                        <strong className="text-cyan-400">Normal Map:</strong>{" "}
                        {isEn
                          ? "Captures surface normals to preserve light bounce, relief, and volumetric curvature across facades."
                          : "Extrae información de las texturas, luces y relieves, preservando la orientación y volumen exacto de los objetos."}
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-white font-bold text-base border-b border-white/10 pb-2">
                      {isEn ? "3. Advanced Modifications and Scaling" : "3. Modificaciones Avanzadas y Reescalado"}
                    </h4>
                    <ul className="space-y-3">
                      <li>
                        <strong className="text-cyan-400">Tile:</strong>{" "}
                        {isEn
                          ? "Slices canvas into tiles to inject fine detail during super-resolution without altering global layout."
                          : "Analiza la imagen original por fragmentos (tiles) para realizar ampliaciones de alta resolución (upscaling) añadiendo detalles sin cambiar la estructura."}
                      </li>
                      <li>
                        <strong className="text-cyan-400">Seg (Segmentation):</strong>{" "}
                        {isEn
                          ? "Assigns semantic colors to programmatic zones (sky, glazing, concrete, grass), enabling exact layout partitioning."
                          : "Crea un mapa de colores donde cada color representa un elemento semántico (ej. azul para el cielo, rojo para el coche, verde para el césped). Es ideal para reestructurar escenarios respetando la composición."}
                      </li>
                      <li>
                        <strong className="text-cyan-400">Reference:</strong>{" "}
                        {isEn
                          ? "Transfers palette, ambient light, and mood from an inspirational photograph without requiring explicit geometry."
                          : "Utiliza el color, la composición y el estilo directo de una imagen de referencia sin necesidad de extraer un mapa geométrico previo."}
                      </li>
                      <li>
                        <strong className="text-cyan-400">Union Models:</strong>{" "}
                        {isEn
                          ? "Unified multi-control architectures (e.g., Union Pro) that handle multiple modalities (Canny, Depth, Pose) within a single loaded model."
                          : "Son modelos avanzados (como Union Pro) que agrupan varias de estas funciones en un solo modelo, permitiendo alternar entre modos como Canny, Depth o Pose sin tener que cargar un modelo distinto para cada uno."}
                      </li>
                    </ul>
                  </div>
                </div>
              </Section>

              <Section title={isEn ? "Core Engine Components" : "Otros Conceptos Clave"}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-cyan-900/10 rounded-xl border border-cyan-800/30">
                    <h3 className="text-cyan-400 font-bold mb-3 flex items-center gap-2">
                      <span className="text-xl">🎛️</span> KSampler
                    </h3>
                    <p className="text-sm text-gray-400">
                      {isEn
                        ? "The algorithmic solver executing iterative denoising steps. Different schedulers (Euler a, DPM++ 2M Karras, UniPC) alter convergence speeds and textural sharpness."
                        : "El KSampler (o simplemente Sampler) es el algoritmo encargado de guiar el proceso de \"denoising\" (eliminación de ruido) paso a paso. Define la estrategia matemática que usa la IA para ir desde el ruido inicial hasta la imagen final. Diferentes samplers (como Euler a, DPM++ 2M Karras, o LMS) ofrecen resultados ligeramente diferentes en términos de texturas, suavidad y velocidad."}
                    </p>
                  </div>

                  <div className="p-6 bg-cyan-900/10 rounded-xl border border-cyan-800/30">
                    <h3 className="text-cyan-400 font-bold mb-3 flex items-center gap-2">
                      <span className="text-xl">🎨</span> VAE (Variational Autoencoder)
                    </h3>
                    <p className="text-sm text-gray-400">
                      {isEn
                        ? "The neural codec that transforms compressed latent mathematics into final RGB pixel space, ensuring correct contrast, deep blacks, and natural color grading."
                        : "El VAE actúa como el traductor de color y luz de la imagen. Es el componente final encargado de decodificar la información que la IA ha procesado en su \"espacio latente\" (donde hace los cálculos) para convertirla en píxeles visibles. Un buen VAE asegura que la imagen tenga colores vibrantes, negros profundos y evite el aspecto lavado o grisáceo."}
                    </p>
                  </div>
                </div>
              </Section>
            </div>
          )}

          {activeTool === "foocus" && (
            <div className="space-y-8">
              <Section title={isEn ? "FOOOCUS Tutorial" : "Tutorial FOOOCUS"}>
                <div className="mb-8">
                  <p className="mb-4">
                    {isEn
                      ? "Fooocus reimagines Stable Diffusion with a streamlined UI focused on prompt expansion and immediate architectural quality."
                      : "Fooocus es un rediseño de Stable Diffusion centrado en la calidad y la facilidad de uso."}
                  </p>
                  <LinkEntry href="https://colab.research.google.com/github/lllyasviel/Fooocus/blob/main/fooocus_colab.ipynb">
                    {isEn ? "Open in Google Colab" : "Abrir en Google Colab"}
                  </LinkEntry>
                </div>

                <div className="space-y-16">
                  <SubSection title={isEn ? "1. LAUNCH FOOOCUS" : "1. INICIAR FOOOCUS"}>
                    <p>
                      {isEn
                        ? "Execute the Colab cell and wait for the public gradio.live link to appear."
                        : "Ejecuta la celda en Colab y espera a que aparezca el enlace \"gradio.live\"."}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <OptimizedImage
                        src="imagenes/focus 1.png"
                        alt={isEn ? "Step 1" : "Paso 1"}
                        className="rounded-lg border border-white/10"
                      />
                      <OptimizedImage
                        src="imagenes/focus 2.png"
                        alt={isEn ? "Step 2" : "Paso 2"}
                        className="rounded-lg border border-white/10"
                      />
                    </div>
                  </SubSection>

                  <SubSection title={isEn ? "2. GENERATE FROM TEXT" : "2. GENERAR CON TEXTO"}>
                    <p>
                      {isEn
                        ? "Enter your architectural prompt into the bottom box and press 'Generate'."
                        : "Escribe tu prompt en la caja inferior y pulsa \"Generate\"."}
                    </p>
                    <OptimizedImage
                      src="imagenes/focus 3.png"
                      alt={isEn ? "Text to Image" : "Text to Image"}
                      className="rounded-lg border border-white/10 w-full"
                    />
                  </SubSection>

                  <SubSection title={isEn ? "3. REFERENCE IMAGES" : "3. IMÁGENES DE REFERENCIA"}>
                    <p>
                      {isEn
                        ? "Use 'Input Image' to condition output on an existing model or massing study."
                        : "Usa \"Input Image\" para guiar la generación con una estructura o estilo previo."}
                    </p>
                    <div className="space-y-4">
                      <OptimizedImage
                        src="imagenes/focus 4.png"
                        alt={isEn ? "Reference 1" : "Ref 1"}
                        className="rounded-lg border border-white/10 w-full"
                      />
                      <OptimizedImage
                        src="imagenes/focus 5.png"
                        alt={isEn ? "Reference 2" : "Ref 2"}
                        className="rounded-lg border border-white/10 w-full"
                      />
                    </div>
                  </SubSection>

                  <SubSection title={isEn ? "4. INPAINTING" : "4. INPAINTING"}>
                    <p>
                      {isEn
                        ? "Brush over areas you want to modify without affecting the surrounding context."
                        : "Pinta sobre las zonas que quieras modificar de una imagen existente."}
                    </p>
                    <OptimizedImage
                      src="imagenes/focus 6.png"
                      alt={isEn ? "Inpainting" : "Inpaint"}
                      className="rounded-lg border border-white/10 w-full"
                    />
                  </SubSection>

                  <SubSection title={isEn ? "5. ADVANCED SETTINGS" : "5. AJUSTES AVANZADOS"}>
                    <p>
                      {isEn
                        ? "Fine-tune aspect ratios, sample counts, and stylistic presets."
                        : "Controla el aspect ratio, número de imágenes y estilos artísticos."}
                    </p>
                    <OptimizedImage
                      src="imagenes/focus 7.png"
                      alt={isEn ? "Settings" : "Ajustes"}
                      className="rounded-lg border border-white/10 w-full"
                    />
                  </SubSection>
                </div>
              </Section>
            </div>
          )}

          {activeTool === "comfy" && (
            <div className="space-y-8">
              <Section title={isEn ? "ComfyUI Tutorial" : "Tutorial ComfyUI"}>
                <div className="mb-8">
                  <p className="mb-4">
                    {isEn
                      ? "ComfyUI employs an explicit visual node graph, giving you precise control over each phase of latent space generation."
                      : "ComfyUI utiliza un sistema de nodos que permite visualizar y entender exactamente cómo se procesa la imagen."}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <LinkEntry href="https://comfy.org/cloud/">
                      Comfy Cloud
                    </LinkEntry>
                    <LinkEntry href="https://comfyui-wiki.com/es/tutorial/basic/creating-your-first-image-by-the-first-time">
                      {isEn ? "Official Tutorial" : "Tutorial Básico Oficial"}
                    </LinkEntry>
                  </div>
                </div>

                <div className="space-y-12">
                  <SubSection title={isEn ? "1. Architectural Prompting Syntax" : "1. El Lenguaje del Arquitecto (Prompting)"}>
                    <p className="mb-4">
                      {isEn
                        ? "Communicate with precision using a structured spatial syntax:"
                        : "El primer paso es aprender a \"hablarle\" a la IA para obtener resultados espaciales coherentes."}
                    </p>
                    <div className="space-y-6">
                      <div className="bg-gray-900/50 p-4 rounded-lg border border-cyan-900/30">
                        <h4 className="text-green-400 font-bold mb-2">
                          {isEn ? "Positive Prompt" : "Prompt Positivo"}
                        </h4>
                        <p className="text-sm mb-2">
                          {isEn ? "Follow a disciplined architectural hierarchy:" : "Debe seguir una jerarquía:"}
                        </p>
                        <code className="block bg-black/50 p-3 rounded text-sm text-cyan-200 mb-2">
                          {isEn
                            ? "[Architectural Subject] + [Architect/Style] + [Materials] + [Atmosphere/Lighting] + [Lens/Fidelity]"
                            : "[Sujeto arquitectónico] + [Estilo/Arquitecto] + [Materiales] + [Iluminación] + [Calidad de render]"}
                        </code>
                        <p className="text-sm italic text-gray-400">
                          <span className="font-bold text-gray-300">
                            {isEn ? "Example:" : "Ejemplo:"}
                          </span>{" "}
                          "Modernist pavilion in Arequipa, sillar stone walls, large glass windows, sunset lighting, cinematic photography, 8k."
                        </p>
                      </div>

                      <div className="bg-gray-900/50 p-4 rounded-lg border border-red-900/30">
                        <h4 className="text-red-400 font-bold mb-2">
                          {isEn ? "Negative Prompt" : "Prompt Negativo"}
                        </h4>
                        <p className="text-sm mb-2">
                          {isEn ? "Filters unwanted visual artifacts." : "Filtra lo que no queremos."}
                        </p>
                        <p className="text-sm italic text-gray-400">
                          <span className="font-bold text-gray-300">
                            {isEn ? "Baseline:" : "Básico:"}
                          </span>{" "}
                          "low quality, blurry, deformed architecture, messy layout, unrealistic shadows."
                        </p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <div className="relative group overflow-hidden rounded-lg border border-white/10">
                        <OptimizedImage
                          src="imagenes/tutorialcomfy1.png"
                          alt={isEn ? "Prompting Example" : "Ejemplo de Prompting"}
                          className="w-full h-auto object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-center pointer-events-none">
                          <p className="text-cyan-400 font-mono text-sm border border-cyan-400/50 p-3 rounded bg-black/50">
                            {isEn
                              ? "💡 Drag this image directly into ComfyUI to load this workflow automatically"
                              : "💡 Arrastra esta imagen a ComfyUI para cargar este flujo de trabajo automáticamente"}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        {isEn ? "Basic Text-to-Image workflow. Drag image into ComfyUI." : "Flujo básico de Text-to-Image. Arrastra la imagen a ComfyUI."}
                      </p>
                    </div>
                  </SubSection>

                  <SubSection title={isEn ? "2. ControlNet: Geometric Precision" : "2. ControlNet: El Respeto a la Geometría"}>
                    <p className="mb-4">
                      {isEn
                        ? "Ensure the neural model strictly honors your hand sketch or CAD elevation using Canny edge conditioning."
                        : "Para un estudiante de arquitectura, la IA no debe ser aleatoria; debe seguir su dibujo. Usaremos el modelo Canny o Lineart."}
                    </p>
                    <ul className="list-none space-y-4 text-sm mb-6">
                      <li className="flex items-start">
                        <span className="text-cyan-400 font-bold w-32 shrink-0">
                          {isEn ? "Load Image:" : "Cargar Imagen:"}
                        </span>
                        <span className="text-gray-300">
                          {isEn ? "Import an elevation sketch or technical linework." : "Sube un boceto a mano alzada o un dibujo técnico simple."}
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-cyan-400 font-bold w-32 shrink-0">
                          {isEn ? "Preprocessor:" : "Pre-procesador:"}
                        </span>
                        <span className="text-gray-300">
                          {isEn ? "Select Canny to isolate structural outlines." : "Selecciona Canny para detectar bordes precisos."}
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-cyan-400 font-bold w-32 shrink-0">
                          {isEn ? "Weight:" : "Peso (Weight):"}
                        </span>
                        <span className="text-gray-300">
                          {isEn ? "Set to 1.0 for unwavering fidelity to your drawing." : "Ajusta a 1.0 para que la IA siga fielmente tu dibujo."}
                        </span>
                      </li>
                      <li className="flex items-start bg-cyan-900/20 p-3 rounded border border-cyan-800/30 mt-2">
                        <span className="text-cyan-300 font-bold w-32 shrink-0">
                          {isEn ? "Result:" : "Resultado:"}
                        </span>
                        <span className="text-cyan-100">
                          {isEn
                            ? "Renders materials and light directly onto your exact volumetric geometry."
                            : "La IA generará materiales y luces sobre tu propia volumetría, no sobre una inventada."}
                        </span>
                      </li>
                    </ul>
                    <div className="mt-6">
                      <div className="relative group overflow-hidden rounded-lg border border-white/10">
                        <OptimizedImage
                          src="imagenes/tutorialcomfy2.png"
                          alt={isEn ? "ControlNet Example" : "Ejemplo de ControlNet"}
                          className="w-full h-auto object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-center pointer-events-none">
                          <p className="text-cyan-400 font-mono text-sm border border-cyan-400/50 p-3 rounded bg-black/50">
                            {isEn
                              ? "💡 Drag this image directly into ComfyUI to load this workflow automatically"
                              : "💡 Arrastra esta imagen a ComfyUI para cargar este flujo de trabajo automáticamente"}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        {isEn ? "ControlNet Canny workflow. Drag image into ComfyUI." : "Flujo con ControlNet Canny. Arrastra la imagen a ComfyUI."}
                      </p>
                    </div>
                  </SubSection>

                  <SubSection title={isEn ? "3. Inpainting: Surgical Iteration" : "3. Inpaint: Edición Quirúrgica"}>
                    <p className="mb-4">
                      {isEn
                        ? "Target specific building elements (such as fenestration or cladding) without re-rendering the whole scene."
                        : "¿Qué pasa si el edificio es perfecto pero la ventana no te gusta? No hay que generar todo de nuevo."}
                    </p>
                    <div className="space-y-4 text-sm mb-6">
                      <div className="bg-gray-900 p-4 rounded-lg flex flex-col gap-2">
                        <h4 className="text-white font-bold flex items-center gap-2">
                          <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                          {isEn ? "Masking Brush" : "Herramienta Máscara"}
                        </h4>
                        <p className="text-gray-400">
                          {isEn
                            ? "Paint precisely over the element to redesign (e.g. replacing timber louvers with clear curtain wall glazing)."
                            : "Pinta sobre la zona específica que deseas cambiar (ej. cambiar una puerta de madera por una de metal)."}
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
                              {isEn
                                ? "Subtle surface alterations preserving baseline contours."
                                : "Cambios sutiles que respetan la forma original."}
                            </span>
                          </div>
                          <div className="border border-white/10 p-3 rounded">
                            <span className="text-red-400 font-mono font-bold block mb-1">
                              0.7 - 0.8
                            </span>
                            <span className="text-gray-400">
                              {isEn
                                ? "Drastic architectural redesign within the selected mask."
                                : "Cambios drásticos (permite a la IA rediseñar esa zona por completo)."}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <div className="relative group overflow-hidden rounded-lg border border-white/10">
                        <OptimizedImage
                          src="imagenes/tutorialcomfy3.png"
                          alt={isEn ? "Inpainting Example" : "Ejemplo de Inpaint"}
                          className="w-full h-auto object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-center pointer-events-none">
                          <p className="text-cyan-400 font-mono text-sm border border-cyan-400/50 p-3 rounded bg-black/50">
                            {isEn
                              ? "💡 Drag this image directly into ComfyUI to load this workflow automatically"
                              : "💡 Arrastra esta imagen a ComfyUI para cargar este flujo de trabajo automáticamente"}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        {isEn ? "Inpainting workflow. Drag image into ComfyUI." : "Flujo de Inpainting. Arrastra la imagen a ComfyUI."}
                      </p>
                    </div>
                  </SubSection>
                </div>
              </Section>
            </div>
          )}

          {activeTool === "webui" && (
            <div className="space-y-8">
              <Section title={isEn ? "Web UI (A1111) Tutorial" : "Tutorial Web UI (A1111)"}>
                <div className="mb-8">
                  <p className="mb-4">
                    {isEn
                      ? "Stable Diffusion Web UI (Automatic1111) remains a primary reference suite with extensive community extensions."
                      : "Stable Diffusion Web UI (Automatic1111) es la interfaz más popular y con mayor ecosistema de extensiones."}
                  </p>
                  <LinkEntry href="https://github.com/AUTOMATIC1111/stable-diffusion-webui">
                    {isEn ? "GitHub Repository" : "Repositorio en GitHub"}
                  </LinkEntry>
                </div>

                <div className="space-y-12">
                  <SubSection title={isEn ? "MAIN WORKBENCH" : "INTERFAZ PRINCIPAL"}>
                    <ol className="list-decimal pl-5 space-y-4">
                      <li>
                        <span className="text-white font-bold">
                          Checkpoint Selection:
                        </span>{" "}
                        {isEn ? "Choose your fine-tuned base model from the top-left dropdown." : "Arriba a la izquierda, elige tu modelo."}
                      </li>
                      <li>
                        <span className="text-white font-bold">
                          txt2img Tab:
                        </span>{" "}
                        {isEn ? "Primary generation tab from text prompts." : "La pestaña principal para generar desde texto."}
                      </li>
                      <li>
                        <span className="text-white font-bold">Prompts:</span>{" "}
                        {isEn ? "Top field for target description; bottom for negative exclusions." : "El cuadro superior es para lo que quieres ver. El inferior para lo que NO quieres (Negative Prompt)."}
                      </li>
                      <li>
                        <span className="text-white font-bold">Sampling:</span>{" "}
                        {isEn ? "'DPM++ 2M Karras' delivers exceptional speed and textural clarity." : "\"DPM++ 2M Karras\" es una opción excelente y rápida."}
                      </li>
                      <li>
                        <span className="text-white font-bold">Generate:</span>{" "}
                        {isEn ? "Click the primary button to render." : "Pulsa el gran botón naranja."}
                      </li>
                    </ol>
                  </SubSection>

                  <SubSection title="CONTROLNET">
                    <p>
                      {isEn
                        ? "Crucial for architects: trace contours from technical CAD, sketches, or clay 3D renders and texture them photorealistically."
                        : "La herramienta más potente para arquitectos. Permite calcar la geometría de un dibujo, una foto o un render previo para aplicarle nuevos materiales o estilos."}
                    </p>
                    <div className="p-4 bg-cyan-900/10 border border-cyan-800/30 rounded-lg">
                      <p className="text-sm">
                        {isEn ? (
                          <React.Fragment>We specifically prioritize <span className="text-cyan-400">Canny</span> and <span className="text-cyan-400">MLSD</span> for architectural perspective alignment.</React.Fragment>
                        ) : (
                          <React.Fragment>En el curso nos enfocaremos especialmente en los modelos <span className="text-cyan-400">Canny</span> y <span className="text-cyan-400">MLSD</span> para control de líneas arquitectónicas.</React.Fragment>
                        )}
                      </p>
                    </div>
                  </SubSection>
                </div>
              </Section>
            </div>
          )}
        </main>
      </div>

      {/* AI Studio Soundtrack */}
      <ProjectSoundtrackSection
        projectId="generacion-ia"
        projectTitle={isEn ? "AI WORKSHOP · SOUNDTRACK" : "TUTORIAL IA · BANDA SONORA"}
        isDarkTheme={true}
      />

      <footer className="relative text-xs text-gray-600 z-10 text-center py-12 mt-12 border-t border-white/5">
        © 2024 Benito González Quiñones · {isEn ? "AI & Architecture Workshop" : "Workshop IA & Arquitectura"}
      </footer>
    </div>
  );
};

const ImageCarousel = ({ images, title }) => {
  const { t, lang } = useTranslation();
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
              alt={`${title} - ${lang === "en" ? "Image" : "Imagen"} ${index + 1}`}
              className="w-full h-full object-contain"
              containerClassName="w-full h-full"
            />
          </div>
        ))}
        <button
          onClick={goToPrevious}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/70 transition-all z-10 backdrop-blur-sm"
          aria-label={lang === "en" ? "Previous image" : "Imagen anterior"}
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
          aria-label={lang === "en" ? "Next image" : "Siguiente imagen"}
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
              alt={lang === "en" ? `Thumbnail ${index + 1}` : `Miniatura ${index + 1}`}
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
  const { t, lang } = useTranslation();
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
            {t("DISEÑO WEB")}
          </h1>
          <div className="h-[1px] w-24 bg-red-500 mb-8"></div>
          <p className="text-lg md:text-xl font-mono text-gray-400 max-w-2xl leading-relaxed">
            {lang === "en"
              ? "Exploration and development of digital interfaces. Bespoke websites designed and developed with a focus on user experience and clean, functional aesthetics."
              : "Exploración y desarrollo de interfaces digitales. Sitios web diseñados y desarrollados a medida, priorizando la experiencia de usuario y una estética limpia y funcional."}
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
                  {t("Visitar sitio web")}
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

      {/* Web Design Soundtrack */}
      <ProjectSoundtrackSection
        projectId="web-design"
        projectTitle={isEn ? "WEB DESIGN · SOUNDTRACK" : "DISEÑO WEB · BANDA SONORA"}
        isDarkTheme={true}
      />

      <footer className="bg-black text-gray-600 text-center p-6 mt-12 border-t border-gray-900 z-10 relative">
        <p className="text-xs font-mono">
          © 2024 Benito González Quiñones - {t("Todos los derechos reservados")} -
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

// --- LIBRETO DOUBLE-PAGE VIEWER & PDF RENDERER (WHITES & OCHRES) ---

const PdfPageCanvas = ({ pdfDoc, pageNumber, className = "" }) => {
  const canvasRef = React.useRef(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    let isCancelled = false;
    let renderTask = null;

    const renderPage = async () => {
      if (!pdfDoc || !pageNumber || pageNumber < 1 || pageNumber > pdfDoc.numPages) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const page = await pdfDoc.getPage(pageNumber);
        if (isCancelled || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        const unscaledViewport = page.getViewport({ scale: 1.0 });
        const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
        const targetWidth = Math.min(window.innerWidth > 1024 ? 900 : 600, window.innerWidth);
        const scale = (targetWidth / unscaledViewport.width) * dpr;
        const viewport = page.getViewport({ scale });

        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.width = "100%";
        canvas.style.height = "100%";

        renderTask = page.render({
          canvasContext: context,
          viewport: viewport,
        });

        await renderTask.promise;
        if (!isCancelled) setLoading(false);
      } catch (err) {
        if (!isCancelled && err?.name !== "RenderingCancelledException") {
          console.error("PDF render error:", err);
          setError(err.message || "Error al renderizar página");
          setLoading(false);
        }
      }
    };

    renderPage();

    return () => {
      isCancelled = true;
      if (renderTask) {
        try {
          renderTask.cancel();
        } catch (_) {}
      }
    };
  }, [pdfDoc, pageNumber]);

  return (
    <div className={`relative w-full h-full flex items-center justify-center bg-[#faf8f4] overflow-hidden ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#fdfbf7]/90 z-20">
          <div className="w-7 h-7 border-2 border-[#c8963e] border-t-transparent rounded-full animate-spin mb-2"></div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#8c5822]">
            Cargando pág. {pageNumber}...
          </span>
        </div>
      )}
      {error ? (
        <div className="p-4 text-center font-mono text-xs text-[#8c5822]">
          <p>No se pudo renderizar la página {pageNumber}</p>
        </div>
      ) : (
        <canvas ref={canvasRef} className="w-full h-full object-contain select-none" />
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// PROJECT SOUNDTRACK & MUSIC PLAYER ENGINE
// ---------------------------------------------------------------------------
const parseMusicUrl = (rawUrl) => {
  if (!rawUrl || typeof rawUrl !== "string") return null;
  const url = rawUrl.trim();

  // Spotify pattern (supports open.spotify.com with any prefix like /intl-es/, /track/, etc.)
  const spotifyMatch = url.match(/spotify\.com\/(?:[a-zA-Z0-9_\-\/]+)?(track|album|playlist|episode|artist)\/([a-zA-Z0-9]+)/i);
  if (spotifyMatch) {
    const type = spotifyMatch[1];
    const id = spotifyMatch[2];
    return {
      provider: "spotify",
      type,
      id,
      embedUrl: `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0&autoplay=1`,
      directUrl: url,
    };
  }

  // SoundCloud pattern
  if (url.includes("soundcloud.com")) {
    return {
      provider: "soundcloud",
      embedUrl: `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`,
      directUrl: url,
    };
  }

  // Direct Audio file (.mp3, .wav, .ogg, /musica/...)
  if (url.match(/\.(mp3|wav|ogg|m4a|aac)(\?.*)?$/i) || url.startsWith("/musica/") || url.startsWith("blob:") || url.startsWith("data:audio")) {
    return {
      provider: "audio",
      audioSrc: url,
      directUrl: url,
    };
  }

  return {
    provider: "link",
    directUrl: url,
  };
};

class SoundtrackController {
  constructor() {
    this.audio = typeof Audio !== "undefined" ? new Audio() : null;
    if (this.audio) {
      this.audio.loop = true;
      this.audio.preload = "auto";
    }
    this.currentProjectId = null;
    this.currentTrack = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.volume = 0.85;
    this.listeners = new Set();
    this.autoplayBlocked = false;

    // Browser autoplay policy: unlock audio on first user gesture if blocked
    if (typeof window !== "undefined") {
      const unlockAudio = () => {
        if (this.audio && this.autoplayBlocked && this.currentTrack) {
          this.audio.play().then(() => {
            this.isPlaying = true;
            this.autoplayBlocked = false;
            this.notify();
          }).catch(() => {});
        }
      };
      window.addEventListener("click", unlockAudio, { passive: true });
      window.addEventListener("touchstart", unlockAudio, { passive: true });
      window.addEventListener("keydown", unlockAudio, { passive: true });
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((fn) => fn(this.getState()));
  }

  getState() {
    return {
      currentProjectId: this.currentProjectId,
      currentTrack: this.currentTrack,
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      volume: this.volume,
      autoplayBlocked: this.autoplayBlocked,
    };
  }

  playProject(projectId, customUrl = null) {
    if (!projectId) return;

    // Resolve URL from multiple sources:
    // 1. Direct customUrl if provided
    // 2. window.defaultProjectsData project.spotifyUrl / project.musicUrl
    // 3. projectAudioMeta[projectId]
    // 4. projectMusic[projectId]
    // 5. window.projectMusicConfig[projectId]
    let resolvedUrl = customUrl;
    let projObj = null;
    if (typeof window !== "undefined" && window.defaultProjectsData) {
      projObj = window.defaultProjectsData.find((p) => p.id === projectId);
      if (!resolvedUrl && projObj) {
        resolvedUrl = projObj.spotifyUrl || projObj.musicUrl || projObj.audioUrl || projObj.songUrl;
      }
    }
    if (!resolvedUrl) {
      resolvedUrl = (projectMusic && projectMusic[projectId]) || (window.projectMusicConfig && window.projectMusicConfig[projectId]) || "";
    }

    const meta = (typeof projectAudioMeta !== "undefined" && projectAudioMeta[projectId]) ? projectAudioMeta[projectId] : null;
    const musicData = parseMusicUrl(resolvedUrl);

    const trackInfo = {
      projectId,
      projectTitle: projObj?.title || projectId,
      songName: meta?.songName || meta?.title || (musicData?.id ? `Spotify Track · ${musicData.id}` : "Banda Sonora"),
      artist: meta?.artist || "Benito González Quiñones Collection",
      thumbnail: meta?.thumbnail || projObj?.coverImage || projObj?.normalImage || null,
      spotifyUrl: resolvedUrl || meta?.url || "",
      embedUrl: musicData?.embedUrl || "",
      previewUrl: meta?.previewUrl || (musicData?.provider === "audio" ? musicData.audioSrc : null),
      provider: musicData?.provider || (meta?.previewUrl ? "audio" : "spotify"),
    };

    // If already playing this project, don't restart
    if (this.currentProjectId === projectId && this.isPlaying) {
      return;
    }

    this.currentProjectId = projectId;
    this.currentTrack = trackInfo;

    if (!this.audio) {
      this.isPlaying = true;
      this.notify();
      return;
    }

    const audioStream = trackInfo.previewUrl || (musicData?.provider === "audio" ? musicData.audioSrc : null);

    if (audioStream) {
      if (this.audio.src !== audioStream) {
        this.audio.src = audioStream;
        this.audio.currentTime = 0;
      }
      this.audio.volume = this.isMuted ? 0 : this.volume;
      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true;
            this.autoplayBlocked = false;
            this.notify();
          })
          .catch((err) => {
            console.warn("Autoplay deferred by browser policy, awaiting interaction:", err);
            this.isPlaying = false;
            this.autoplayBlocked = true;
            this.notify();
          });
      }
    } else {
      this.isPlaying = true;
      this.autoplayBlocked = false;
      this.notify();
    }
  }

  togglePlay() {
    if (!this.audio) return;
    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
      this.notify();
    } else {
      if (this.audio.src) {
        this.audio.play().then(() => {
          this.isPlaying = true;
          this.autoplayBlocked = false;
          this.notify();
        }).catch(() => {});
      } else if (this.currentProjectId) {
        this.playProject(this.currentProjectId);
      }
    }
  }

  toggleMute() {
    if (!this.audio) return;
    this.isMuted = !this.isMuted;
    this.audio.volume = this.isMuted ? 0 : this.volume;
    this.notify();
  }

  setVolume(val) {
    if (!this.audio) return;
    this.volume = Math.max(0, Math.min(1, val));
    this.isMuted = false;
    this.audio.volume = this.volume;
    this.notify();
  }

  pause() {
    if (this.audio) this.audio.pause();
    this.isPlaying = false;
    this.notify();
  }
}

const globalSoundtrack = new SoundtrackController();

const useSoundtrack = () => {
  const [state, setState] = React.useState(() => globalSoundtrack.getState());
  React.useEffect(() => {
    return globalSoundtrack.subscribe(setState);
  }, []);
  return {
    ...state,
    playProject: (id, url) => globalSoundtrack.playProject(id, url),
    togglePlay: () => globalSoundtrack.togglePlay(),
    toggleMute: () => globalSoundtrack.toggleMute(),
    setVolume: (v) => globalSoundtrack.setVolume(v),
    pause: () => globalSoundtrack.pause(),
  };
};

const FloatingSoundtrackBar = ({ view }) => {
  const soundtrack = useSoundtrack();
  const { lang } = React.useContext(LanguageContext) || { lang: "es" };
  const isEn = lang === "en";

  const isEligiblePage = [
    "project",
    "carteleria",
    "generacion-ia",
    "web-design",
    "escritos-arquitectura",
    "escrito-detail",
    "contact",
  ].includes(view?.page) || Boolean(soundtrack.currentTrack);

  if (!isEligiblePage || !soundtrack.currentTrack) {
    return null;
  }

  const { currentTrack, isPlaying, isMuted, autoplayBlocked } = soundtrack;

  return (
    <aside
      aria-label="Reproductor de música flotante"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[120] max-w-[92vw] sm:max-w-md animate-fade-in"
    >
      <div className="relative flex items-center gap-3 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full bg-[#0a0d12]/95 border border-white/20 shadow-2xl backdrop-blur-md text-white transition-all duration-300 hover:border-[#1DB954]/70">
        {/* Equalizer animation */}
        <div
          onClick={soundtrack.togglePlay}
          className="flex items-end gap-1 h-6 w-6 p-1 rounded-sm bg-black/40 cursor-pointer shrink-0"
          title={isPlaying ? (isEn ? "Pause music" : "Pausar música") : (isEn ? "Play music" : "Reproducir música")}
        >
          <span className={`w-1 bg-[#1DB954] rounded-full transition-all ${isPlaying ? "h-4 animate-pulse" : "h-1.5 opacity-50"}`}></span>
          <span className={`w-1 bg-[#1DB954] rounded-full transition-all ${isPlaying ? "h-6 animate-pulse delay-75" : "h-2.5 opacity-50"}`}></span>
          <span className={`w-1 bg-[#1DB954] rounded-full transition-all ${isPlaying ? "h-3 animate-pulse delay-150" : "h-1 opacity-50"}`}></span>
          <span className={`w-1 bg-[#1DB954] rounded-full transition-all ${isPlaying ? "h-5 animate-pulse delay-100" : "h-2 opacity-50"}`}></span>
        </div>

        {/* Track Title and Artist */}
        <div className="min-w-0 flex-1 pr-1 cursor-pointer" onClick={soundtrack.togglePlay}>
          <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-[#1DB954]">
            <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? "bg-[#1DB954] animate-ping" : "bg-gray-400"}`}></span>
            <span className="truncate">
              {isPlaying 
                ? (isEn ? "SOUNDTRACK · AUTOPLAY" : "BANDA SONORA · REPRODUCIENDO") 
                : (isEn ? "SOUNDTRACK · PAUSED" : "BANDA SONORA · PAUSADA")}
            </span>
          </div>
          <div className="font-serif sm:font-mono text-xs sm:text-sm font-bold truncate text-white leading-tight">
            {currentTrack.songName || currentTrack.projectTitle}
          </div>
          {currentTrack.artist && (
            <div className="font-mono text-[9px] text-gray-400 truncate">
              {currentTrack.artist}
            </div>
          )}
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={soundtrack.togglePlay}
          className="w-8 h-8 rounded-full bg-[#1DB954] hover:bg-[#1aa34a] text-black flex items-center justify-center shrink-0 transition-transform active:scale-95 shadow-md cursor-pointer"
          title={isPlaying ? (isEn ? "Pause" : "Pausar") : (isEn ? "Play" : "Reproducir")}
        >
          {isPlaying ? (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          ) : (
            <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>

        {/* Mute Button */}
        <button
          onClick={soundtrack.toggleMute}
          className="text-gray-400 hover:text-white p-1 rounded-full transition-colors cursor-pointer hidden sm:inline-flex"
          title={isMuted ? (isEn ? "Unmute" : "Activar sonido") : (isEn ? "Mute" : "Silenciar")}
        >
          {isMuted ? (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          )}
        </button>

        {/* Spotify direct link */}
        {currentTrack.spotifyUrl && (
          <a
            href={currentTrack.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1DB954] hover:text-white p-1 rounded-full transition-colors cursor-pointer hidden sm:inline-flex"
            title={isEn ? "Open in Spotify" : "Abrir en Spotify"}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
          </a>
        )}
      </div>

      {/* Autoplay blocked prompt */}
      {autoplayBlocked && !isPlaying && (
        <div
          onClick={soundtrack.togglePlay}
          className="mt-2 px-3 py-1.5 rounded-full bg-[#1DB954] text-black font-mono text-[10px] font-bold text-center cursor-pointer shadow-lg animate-bounce flex items-center justify-center gap-1.5"
        >
          <span>▶</span>
          <span>{isEn ? "Click anywhere to listen to soundtrack" : "Toca aquí para escuchar la música"}</span>
        </div>
      )}
    </aside>
  );
};

const ProjectSoundtrackSection = ({
  projectId,
  projectTitle,
  isPhoto = false,
  isDarkTheme = true,
  project = null,
}) => {
  const { lang } = React.useContext(LanguageContext) || { lang: "es" };
  const isEn = lang === "en";
  const soundtrack = useSoundtrack();

  const songUrl =
    project?.spotifyUrl ||
    project?.musicUrl ||
    project?.audioUrl ||
    (projectMusic && projectMusic[projectId]) ||
    (window.projectMusicConfig && window.projectMusicConfig[projectId]) ||
    "";

  const meta = (typeof projectAudioMeta !== "undefined" && projectAudioMeta[projectId]) ? projectAudioMeta[projectId] : null;
  const musicData = React.useMemo(() => parseMusicUrl(songUrl), [songUrl]);

  // Synchronize playback with global soundtrack on mount & page enter
  React.useEffect(() => {
    if (projectId) {
      soundtrack.playProject(projectId, songUrl);
    }
    // Also unlock playback on the first touch/click if blocked by browser policy
    const handleGesture = () => {
      if (projectId) {
        soundtrack.playProject(projectId, songUrl);
      }
    };
    window.addEventListener("click", handleGesture, { once: true, passive: true });
    window.addEventListener("touchstart", handleGesture, { once: true, passive: true });
    window.addEventListener("keydown", handleGesture, { once: true, passive: true });
    return () => {
      window.removeEventListener("click", handleGesture);
      window.removeEventListener("touchstart", handleGesture);
      window.removeEventListener("keydown", handleGesture);
    };
  }, [projectId, songUrl]);

  if (!songUrl && !musicData && !meta) {
    return null;
  }

  const trackTitle = meta?.songName 
    ? `${meta.songName}${meta.artist ? ` · ${meta.artist}` : ""}` 
    : (projectTitle || projectId);

  return (
    <div
      aria-label="Reproductor de música del proyecto"
      className="w-full max-w-3xl mx-auto my-4 sm:my-6 px-4 z-20 relative animate-fade-in"
    >
      <div
        className={`w-full flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-2 rounded-xl border backdrop-blur-sm transition-all shadow-sm ${
          isPhoto
            ? "bg-[#fdfbf7]/95 border-[#d4a359]/40 text-[#2a2115]"
            : isDarkTheme
            ? "bg-black/70 border-white/10 text-white"
            : "bg-white/80 border-black/10 text-black"
        }`}
      >
        {/* Title and Soundtrack indicator */}
        <div className="flex items-center gap-2.5 min-w-0 w-full sm:w-auto">
          <span className="w-2 h-2 rounded-full bg-[#1DB954] animate-pulse shrink-0"></span>
          <span className="font-mono text-[10px] tracking-widest uppercase opacity-60 shrink-0">
            {isEn ? "Soundtrack" : "Banda sonora"}
          </span>
          <span className="opacity-30">·</span>
          <span className="font-mono text-xs font-semibold truncate max-w-xs sm:max-w-sm md:max-w-md">
            {trackTitle}
          </span>
        </div>

        {/* Compact Player Strip with Autoplay */}
        <div className="w-full sm:w-72 md:w-80 shrink-0">
          {musicData?.provider === "spotify" ? (
            <iframe
              key={musicData.embedUrl}
              title={`Spotify - ${trackTitle}`}
              src={musicData.embedUrl}
              width="100%"
              height="80"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="eager"
              className="w-full border-0 block rounded-lg overflow-hidden"
            />
          ) : musicData?.provider === "soundcloud" ? (
            <iframe
              key={musicData.embedUrl}
              title={`SoundCloud - ${trackTitle}`}
              src={musicData.embedUrl}
              width="100%"
              height="80"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              loading="eager"
              className="w-full border-0 block rounded-lg overflow-hidden"
            />
          ) : (
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={soundtrack.togglePlay}
                className="px-3.5 py-1.5 bg-[#1DB954] hover:bg-[#1aa34a] text-black font-mono text-[10px] rounded-full font-bold uppercase transition-colors cursor-pointer"
              >
                {soundtrack.isPlaying ? (isEn ? "Pause" : "Pausar") : (isEn ? "Play" : "Reproducir")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


const LibretoViewer = ({
  project,
  allProjectsData = [],
  onProjectSelect,
  onBack,
}) => {
  const { t, pt, lang } = useTranslation();
  const fileInputRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const isEn = lang === "en";

  // State
  const [currentSpread, setCurrentSpread] = React.useState(0);
  const [viewMode, setViewMode] = React.useState("spread"); // "spread" | "single"
  const [uploadedPdfDoc, setUploadedPdfDoc] = React.useState(null);
  const [uploadedPdfName, setUploadedPdfName] = React.useState("");
  const [uploadedTotalPages, setUploadedTotalPages] = React.useState(0);
  const [isProcessingPdf, setIsProcessingPdf] = React.useState(false);
  const [notification, setNotification] = React.useState(null);
  const [showThumbnails, setShowThumbnails] = React.useState(false);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);

  // Mobile & Desktop Double-Page Manual Zoom and Pan state
  const [zoomLevel, setZoomLevel] = React.useState(1);
  const [panOffset, setPanOffset] = React.useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = React.useState(false);
  const touchStartRef = React.useRef({ x: 0, y: 0, panX: 0, panY: 0, moved: false });
  const mouseStartRef = React.useRef({ x: 0, y: 0, panX: 0, panY: 0, moved: false });

  // Reset zoom & pan on spread or project change
  React.useEffect(() => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  }, [currentSpread, project?.id]);

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        panX: panOffset.x,
        panY: panOffset.y,
        moved: false,
      };
      if (zoomLevel > 1) {
        setIsPanning(true);
      }
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1) {
      const dx = e.touches[0].clientX - touchStartRef.current.x;
      const dy = e.touches[0].clientY - touchStartRef.current.y;
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
        touchStartRef.current.moved = true;
      }
      if (zoomLevel > 1) {
        setPanOffset({
          x: touchStartRef.current.panX + dx,
          y: touchStartRef.current.panY + dy,
        });
      }
    }
  };

  const handleTouchEnd = () => {
    setIsPanning(false);
  };

  const handleMouseDown = (e) => {
    mouseStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      panX: panOffset.x,
      panY: panOffset.y,
      moved: false,
    };
    if (zoomLevel > 1) {
      setIsPanning(true);
    }
  };

  const handleMouseMove = (e) => {
    if (isPanning && zoomLevel > 1) {
      const dx = e.clientX - mouseStartRef.current.x;
      const dy = e.clientY - mouseStartRef.current.y;
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
        mouseStartRef.current.moved = true;
      }
      setPanOffset({
        x: mouseStartRef.current.panX + dx,
        y: mouseStartRef.current.panY + dy,
      });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  // Load the project's actual uploaded PDF automatically on mount or project change
  React.useEffect(() => {
    let isCancelled = false;
    setCurrentSpread(0);
    setIsProcessingPdf(true);
    setPdfError(null);

    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }

    const loadBookletPdf = async () => {
      // Candidate URLs for this booklet matching booklet name + .pdf
      const candidateUrls = [
        project?.pdfUrl,
        `/documentos/${project?.id}.pdf`,
        project?.id === "rapa-das-bestas" ? "/documentos/rapa-das-bestas-2025.pdf" : null,
        project?.id === "rapa-das-bestas-2025" ? "/documentos/rapa-das-bestas.pdf" : null,
        project?.id === "cuaderno-de-campo" ? "/documentos/cuaderno-de-campo-2024.pdf" : null,
        project?.id === "cuaderno-de-campo-2024" ? "/documentos/cuaderno-de-campo.pdf" : null,
        `/documentos/${project?.id}-2024.pdf`,
        `/documentos/${project?.id}-2025.pdf`,
      ].filter(Boolean);

      let loadedDoc = null;
      let matchedName = "";

      for (const url of candidateUrls) {
        try {
          if (!window.pdfjsLib) continue;
          const loadingTask = window.pdfjsLib.getDocument(url);
          const doc = await loadingTask.promise;
          loadedDoc = doc;
          matchedName = url.split("/").pop();
          break;
        } catch (err) {
          // try next candidate
        }
      }

      if (isCancelled) return;

      if (loadedDoc) {
        setUploadedPdfDoc(loadedDoc);
        setUploadedPdfName(matchedName || `${project?.id}.pdf`);
        setUploadedTotalPages(loadedDoc.numPages);
        setIsProcessingPdf(false);
      } else {
        console.warn("Could not load PDF for project:", project?.id);
        setIsProcessingPdf(false);
        setPdfError("No se pudo cargar el PDF del libreto");
      }
    };

    if (typeof window !== "undefined") {
      if (window.pdfjsLib) {
        loadBookletPdf();
      } else {
        const timer = setInterval(() => {
          if (window.pdfjsLib) {
            clearInterval(timer);
            loadBookletPdf();
          }
        }, 150);
        return () => {
          isCancelled = true;
          clearInterval(timer);
        };
      }
    }

    return () => {
      isCancelled = true;
    };
  }, [project?.id, project?.pdfUrl]);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "Escape" && isFullscreen) {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const notify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Calculate spreads: "Primero la portada y luego doble página"
  const totalPagesCount = uploadedPdfDoc ? uploadedTotalPages : (project?.totalPages || 6);

  // Spread 0: Portada (Pág. 1)
  // Spread 1: Pliego Págs. 2-3
  // Spread 2: Pliego Págs. 4-5
  // Spread 3: Pliego Págs. 6-7
  const totalSpreads = totalPagesCount <= 1 ? 1 : (1 + Math.ceil((totalPagesCount - 1) / 2));

  const getSpreadPages = (spreadIdx) => {
    if (spreadIdx === 0) {
      return { isCover: true, cover: 1, left: null, right: 1 };
    }
    const leftPage = spreadIdx * 2;
    const rightPage = leftPage + 1 <= totalPagesCount ? leftPage + 1 : null;
    return { isCover: false, cover: null, left: leftPage, right: rightPage };
  };

  const currentPages = viewMode === "spread" 
    ? getSpreadPages(currentSpread) 
    : { isCover: currentSpread === 0, cover: currentSpread === 0 ? 1 : null, single: currentSpread + 1 };

  const handleNext = () => {
    if (viewMode === "spread") {
      if (currentSpread < totalSpreads - 1) {
        setCurrentSpread((prev) => prev + 1);
      }
    } else {
      if (currentSpread < totalPagesCount - 1) {
        setCurrentSpread((prev) => prev + 1);
      }
    }
  };

  const handlePrev = () => {
    if (currentSpread > 0) {
      setCurrentSpread((prev) => prev - 1);
    }
  };

  const jumpToPage = (pageNum) => {
    if (viewMode === "spread") {
      if (pageNum <= 1) {
        setCurrentSpread(0);
      } else {
        setCurrentSpread(Math.floor(pageNum / 2));
      }
    } else {
      setCurrentSpread(Math.max(0, Math.min(pageNum - 1, totalPagesCount - 1)));
    }
  };

  // Other photography libretos
  const photoLibretos = allProjectsData.filter(
    (p) => (p.category === "photography" || p.isLibreto) && p.id !== project?.id
  );

  // Render Left Page (Verso)
  const renderLeftPage = () => {
    if (!currentPages.left) {
      return (
        <div className="w-full h-full bg-[#f6f2e9] flex flex-col justify-between p-8 text-[#8c5822]/50 font-mono text-xs select-none">
          <div className="uppercase tracking-widest">{uploadedPdfName || `${project?.id}.pdf`}</div>
          <div className="text-center my-auto">
            <p className="text-[10px] uppercase tracking-widest mb-1 text-[#8c5822]">Pliego Interior</p>
            <p className="text-[8px] text-[#a89680]">Formato ISO A5 · Doble Página</p>
          </div>
          <div className="text-right text-[9px]">— Guarda —</div>
        </div>
      );
    }
    if (uploadedPdfDoc) {
      return <PdfPageCanvas pdfDoc={uploadedPdfDoc} pageNumber={currentPages.left} />;
    }
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-[#8c5822] font-mono text-xs">
        <div className="w-6 h-6 border-2 border-[#c8963e] border-t-transparent rounded-full animate-spin mb-2"></div>
        <span>Cargando pág. {currentPages.left}...</span>
      </div>
    );
  };

  // Render Right Page (Recto)
  const renderRightPage = () => {
    if (!currentPages.right) {
      return (
        <div className="w-full h-full bg-[#f6f2e9] flex flex-col justify-between p-8 text-[#8c5822]/50 font-mono text-xs select-none">
          <div className="uppercase tracking-widest">{uploadedPdfName || `${project?.id}.pdf`}</div>
          <div className="text-center my-auto text-[10px] uppercase tracking-widest text-[#8c5822]">
            <p className="mb-1 font-bold">Fin del Libreto</p>
            <p className="text-[8px] text-[#a89680]">Archivo Benito G. Quiñones</p>
          </div>
          <div className="text-right text-[9px]">— Contraportada —</div>
        </div>
      );
    }
    if (uploadedPdfDoc) {
      return <PdfPageCanvas pdfDoc={uploadedPdfDoc} pageNumber={currentPages.right} />;
    }
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-[#8c5822] font-mono text-xs">
        <div className="w-6 h-6 border-2 border-[#c8963e] border-t-transparent rounded-full animate-spin mb-2"></div>
        <span>Cargando pág. {currentPages.right}...</span>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen bg-[#faf8f4] text-[#2c2419] overflow-x-hidden relative animate-fade-in flex flex-col justify-between"
      style={{
        backgroundImage: "radial-gradient(#d4a359 0.75px, transparent 0.75px)",
        backgroundSize: "28px 28px",
      }}
    >
      {/* Back Button */}
      <BackButton onClick={onBack} theme="photography" />

      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-16 sm:top-20 left-1/2 -translate-x-1/2 z-[160] px-4 py-2.5 rounded-full bg-[#faf7f2] border border-[#c8963e] shadow-xl text-[#6e4418] font-mono text-xs flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-[#c8963e]"></span>
          <span>{notification}</span>
        </div>
      )}

      {/* Top Header & Minimalist Controls */}
      <header className="relative z-30 pt-16 sm:pt-20 pb-4 px-4 sm:px-8 max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#d4a359]/30">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-[9px] sm:text-[10px] text-[#8c5822] uppercase tracking-widest mb-1">
            <span className="w-2 h-2 rounded-full bg-[#c8963e]"></span>
            <span>{isEn ? "CLOSED PDF · SMALL A5 MAGAZINE" : "PDF CERRADO · PEQUEÑA REVISTA A5"}</span>
            <span className="text-[#c8963e]/50">|</span>
            <span>{pt(project, "subcategory") || "FOTOGRAFÍA"}</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#2a2115] tracking-wide uppercase leading-tight">
            {pt(project, "title")}
          </h1>
        </div>

        {/* Action Controls in minimalist ochre style */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Share Permalink Button */}
          <CopyPermalinkButton theme="photography" />

          {/* Closed PDF Badge & Direct Download Button */}
          <a
            href={project?.pdfUrl || `/documentos/${project?.id}.pdf`}
            download={project?.pdfUrl ? project.pdfUrl.split("/").pop() : `${project?.id}.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#faf7f2] border border-[#c8963e] hover:border-[#8c5822] hover:bg-[#f4ede1] text-[#6e4418] font-mono text-xs uppercase tracking-wider transition-all duration-200 shadow-sm flex items-center gap-2 cursor-pointer"
            title={isEn ? `Download closed PDF: ${project?.pdfUrl ? project.pdfUrl.split("/").pop() : `${project?.id}.pdf`}` : `Descargar libreto en PDF cerrado: ${project?.pdfUrl ? project.pdfUrl.split("/").pop() : `${project?.id}.pdf`}`}
          >
            <svg className="w-4 h-4 text-[#8c5822]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="font-bold">{project?.pdfUrl ? project.pdfUrl.split("/").pop() : `${project?.id}.pdf`}</span>
            <span className="text-[10px] text-[#8c5822]/80 bg-[#f4ede2] px-1.5 py-0.5 rounded-full border border-[#d4a359]/40">{isEn ? "PDF" : "A5"}</span>
          </a>

          {/* Spread / Single Page Toggle */}
          <div className="hidden sm:inline-flex p-0.5 rounded-full bg-[#f4ede2] border border-[#d4a359]/40">
            <button
              onClick={() => setViewMode("spread")}
              className={`px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-wider transition-all ${
                viewMode === "spread"
                  ? "bg-[#c8963e] text-white font-bold shadow-sm"
                  : "text-[#8c5822] hover:text-[#5c4a33]"
              }`}
            >
              {isEn ? "Spread" : "Doble Página"}
            </button>
            <button
              onClick={() => setViewMode("single")}
              className={`px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-wider transition-all ${
                viewMode === "single"
                  ? "bg-[#c8963e] text-white font-bold shadow-sm"
                  : "text-[#8c5822] hover:text-[#5c4a33]"
              }`}
            >
              {isEn ? "Single Page" : "Página Simple"}
            </button>
          </div>

          {/* Thumbnails toggle */}
          <button
            onClick={() => setShowThumbnails(!showThumbnails)}
            className={`p-2 rounded-full border transition-all ${
              showThumbnails
                ? "bg-[#c8963e] text-white border-[#c8963e]"
                : "bg-[#faf7f2] border-[#d4a359]/40 text-[#8c5822] hover:border-[#b87d2b]"
            }`}
            title={isEn ? "Toggle thumbnails" : "Mostrar miniaturas"}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>

          {/* Fullscreen button */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-full bg-[#faf7f2] border border-[#d4a359]/40 text-[#8c5822] hover:border-[#b87d2b] transition-all"
            title={isEn ? "Fullscreen" : "Pantalla completa"}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Double-Page Book Reader Stage */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-2 sm:px-6 py-6 md:py-10 max-w-[1400px] mx-auto w-full">
        {/* Navigation Arrows (Desktop) */}
        <div className="w-full flex items-center justify-between gap-2 sm:gap-6">
          {/* Prev Button */}
          <button
            onClick={handlePrev}
            disabled={currentSpread === 0}
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#faf7f2]/90 border border-[#d4a359]/40 hover:border-[#b87d2b] shadow-md flex items-center justify-center text-[#8c5822] transition-all duration-200 cursor-pointer ${
              currentSpread === 0 ? "opacity-30 cursor-not-allowed" : "hover:scale-105 hover:bg-[#f4ede1]"
            }`}
            aria-label="Pliego anterior"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* THE BOOK COMPONENT */}
          <div className="flex-1 flex flex-col justify-center items-center my-2 w-full overflow-hidden">
            {/* Double-Page Spread Manual Zoom & Reset Toolbar */}
            {viewMode === "spread" && (
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:py-1.5 rounded-full bg-[#f4ede2]/95 border border-[#d4a359]/40 shadow-sm backdrop-blur-xs text-[#8c5822] font-mono text-xs mb-3 z-30 select-none">
                <button
                  type="button"
                  onClick={() => {
                    setZoomLevel((prev) => {
                      const next = Math.max(1, prev - 0.5);
                      if (next === 1) setPanOffset({ x: 0, y: 0 });
                      return next;
                    });
                  }}
                  disabled={zoomLevel <= 1}
                  className="w-7 h-7 rounded-full flex items-center justify-center border border-[#d4a359]/40 hover:bg-[#faf7f2] disabled:opacity-30 cursor-pointer text-sm font-bold transition-colors"
                  title={isEn ? "Zoom Out" : "Reducir zoom"}
                >
                  −
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setZoomLevel(1);
                    setPanOffset({ x: 0, y: 0 });
                  }}
                  className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider hover:bg-[#faf7f2] transition-colors cursor-pointer"
                  title={isEn ? "Reset zoom" : "Ajustar al pliego"}
                >
                  {Math.round(zoomLevel * 100)}%
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setZoomLevel((prev) => Math.min(3, prev + 0.5));
                  }}
                  disabled={zoomLevel >= 3}
                  className="w-7 h-7 rounded-full flex items-center justify-center border border-[#d4a359]/40 hover:bg-[#faf7f2] disabled:opacity-30 cursor-pointer text-sm font-bold transition-colors"
                  title={isEn ? "Zoom In" : "Ampliar zoom"}
                >
                  +
                </button>

                {zoomLevel > 1 && (
                  <span className="text-[10px] uppercase tracking-wider text-[#8c5822]/80 pl-2 border-l border-[#d4a359]/40">
                    {isEn ? "Drag to explore" : "Arrastra el pliego"}
                  </span>
                )}
              </div>
            )}

            {viewMode === "spread" ? (
              currentSpread === 0 ? (
                /* PORTADA / FRONT COVER (Page 1) */
                <div
                  className="relative flex flex-col items-center justify-center w-full max-w-[520px] aspect-[148/210] rounded-xs shadow-[0_25px_60px_-15px_rgba(140,88,34,0.3)] border border-[#d4a359]/60 bg-[#fdfbf7] select-none transition-transform duration-200 cursor-pointer overflow-hidden group"
                  style={{
                    transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px)`,
                    transformOrigin: "center center",
                  }}
                  onClick={() => {
                    if (zoomLevel > 1 && (touchStartRef.current.moved || mouseStartRef.current.moved)) return;
                    handleNext();
                  }}
                  title={isEn ? "Click to open booklet (Page 2-3)" : "Haz clic para abrir el libreto (Páginas 2-3)"}
                >
                  {/* Booklet outer spine illusion */}
                  <div className="absolute left-0 top-0 bottom-0 w-3.5 sm:w-4 bg-gradient-to-r from-[#7a4816] via-[#b87d2b] to-[#8c5822] z-30 shadow-[2px_0_8px_rgba(0,0,0,0.25)]"></div>

                  {/* Real Page 1 of the uploaded PDF */}
                  <div className="w-full h-full pl-3.5 sm:pl-4">
                    {uploadedPdfDoc ? (
                      <PdfPageCanvas pdfDoc={uploadedPdfDoc} pageNumber={1} />
                    ) : isProcessingPdf ? (
                      <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-[#8c5822]">
                        <div className="w-8 h-8 border-2 border-[#c8963e] border-t-transparent rounded-full animate-spin mb-3"></div>
                        <span className="font-mono text-xs uppercase tracking-widest">{isEn ? "Loading PDF..." : "Cargando PDF..."}</span>
                      </div>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-[#8c5822]">
                        <span className="font-serif text-lg font-bold">{pt(project, "title")}</span>
                        <span className="font-mono text-xs mt-2">{uploadedPdfName || `${project?.id}.pdf`}</span>
                      </div>
                    )}
                  </div>

                  {/* Bottom indicator overlay */}
                  <div className="absolute bottom-3 left-6 right-3 z-30 flex items-center justify-between px-3 py-1.5 rounded-full bg-[#1b140b]/85 text-[#f4ede2] border border-[#d4a359]/50 backdrop-blur-xs font-mono text-[10px] tracking-wider uppercase opacity-90 group-hover:opacity-100 transition-opacity">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d4a359]"></span>
                      <span>{isEn ? "Cover · Page 1" : "Portada · Pág. 1"}</span>
                    </span>
                    <span className="font-bold text-[#f2cb80] flex items-center gap-1">
                      <span>{isEn ? "Open booklet" : "Abrir libreto"}</span>
                      <span>→</span>
                    </span>
                  </div>
                </div>
              ) : (
                /* DOUBLE-PAGE SPREAD CONTAINER (Pages 2 & 3, 4 & 5, ...) */
                <div
                  className="relative flex w-full max-w-[1100px] aspect-[296/210] rounded-xs shadow-[0_25px_60px_-15px_rgba(140,88,34,0.22),0_10px_25px_rgba(0,0,0,0.06)] border border-[#d4a359]/40 bg-[#fdfbf7] select-none transition-transform duration-200"
                  style={{
                    transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px)`,
                    transformOrigin: "center center",
                    cursor: zoomLevel > 1 ? (isPanning ? "grabbing" : "grab") : "default",
                    boxShadow:
                      "0 30px 60px -15px rgba(140,88,34,0.25), 0 0 0 1px rgba(212,163,89,0.3) inset",
                  }}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                >
                  {/* Book outer edge pages stack illusion */}
                  <div className="absolute -bottom-2 left-3 right-3 h-2 bg-[#ece4d5] rounded-b-sm border-b border-[#d4a359]/40 z-0 opacity-80 pointer-events-none"></div>
                  <div className="absolute -bottom-3.5 left-6 right-6 h-1.5 bg-[#dfd6c4] rounded-b-sm border-b border-[#d4a359]/30 z-0 opacity-60 pointer-events-none"></div>

                  {/* LEFT PAGE (Verso) */}
                  <div
                    className="relative z-10 w-1/2 h-full cursor-pointer overflow-hidden border-r border-[#d4a359]/20"
                    onClick={() => {
                      if (zoomLevel > 1 && (touchStartRef.current.moved || mouseStartRef.current.moved)) {
                        return;
                      }
                      handlePrev();
                    }}
                    title={isEn ? "Click to turn previous" : "Clic para ir al pliego anterior"}
                  >
                    {/* Spine inner curve shadow on right edge of left page */}
                    <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-14 bg-gradient-to-l from-black/15 via-black/5 to-transparent pointer-events-none z-30"></div>
                    {renderLeftPage()}
                  </div>

                  {/* CENTRAL GUTTER / BOOK BINDING SEAM */}
                  <div className="relative z-20 w-[4px] bg-gradient-to-r from-black/25 via-black/40 to-black/25 shadow-[0_0_8px_rgba(0,0,0,0.35)] flex flex-col justify-between py-2 items-center">
                    <div className="w-[1px] h-full bg-[#f4ede2]/40"></div>
                  </div>

                  {/* RIGHT PAGE (Recto) */}
                  <div
                    className="relative z-10 w-1/2 h-full cursor-pointer overflow-hidden border-l border-[#d4a359]/20"
                    onClick={() => {
                      if (zoomLevel > 1 && (touchStartRef.current.moved || mouseStartRef.current.moved)) {
                        return;
                      }
                      handleNext();
                    }}
                    title={isEn ? "Click to turn next" : "Clic para ir al pliego siguiente"}
                  >
                    {/* Spine inner curve shadow on left edge of right page */}
                    <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-14 bg-gradient-to-r from-black/15 via-black/5 to-transparent pointer-events-none z-30"></div>
                    {renderRightPage()}
                  </div>
                </div>
              )
            ) : (
              /* SINGLE PAGE CONTAINER (ISO A5) */
              <div
                className="relative flex w-full max-w-[550px] aspect-[148/210] rounded-xs shadow-[0_25px_50px_-12px_rgba(140,88,34,0.25)] border border-[#d4a359]/40 bg-[#fdfbf7] overflow-hidden"
              >
                {/* Left booklet spine */}
                <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-[#8c5822] to-[#b87d2b] z-20 shadow-[2px_0_6px_rgba(0,0,0,0.18)]"></div>
                <div className="w-full h-full pl-3">
                  {uploadedPdfDoc ? (
                    <PdfPageCanvas pdfDoc={uploadedPdfDoc} pageNumber={currentSpread + 1} />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-[#8c5822] font-mono text-xs">
                      <div className="w-6 h-6 border-2 border-[#c8963e] border-t-transparent rounded-full animate-spin mb-2"></div>
                      <span>Cargando pág. {currentSpread + 1}...</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={viewMode === "spread" ? currentSpread >= totalSpreads - 1 : currentSpread >= totalPagesCount - 1}
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#faf7f2]/90 border border-[#d4a359]/40 hover:border-[#b87d2b] shadow-md flex items-center justify-center text-[#8c5822] transition-all duration-200 cursor-pointer ${
              (viewMode === "spread" ? currentSpread >= totalSpreads - 1 : currentSpread >= totalPagesCount - 1)
                ? "opacity-30 cursor-not-allowed"
                : "hover:scale-105 hover:bg-[#f4ede1]"
            }`}
            aria-label="Pliego siguiente"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Reader Status Bar & Page Scrubber */}
        <div className="mt-4 sm:mt-6 w-full max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-2 rounded-full bg-[#f4ede2]/90 border border-[#d4a359]/40 shadow-sm text-xs font-mono text-[#8c5822]">
          <div className="flex items-center gap-2">
            <span className="font-bold">
              {viewMode === "spread"
                ? currentSpread === 0
                  ? isEn ? `Cover · Page 1 of ${totalPagesCount}` : `Portada · Pág. 1 de ${totalPagesCount}`
                  : isEn
                  ? `Pages ${currentPages.left || ""}-${currentPages.right || ""} of ${totalPagesCount}`
                  : `Páginas ${currentPages.left || ""}-${currentPages.right || ""} de ${totalPagesCount}`
                : isEn
                ? `Page ${currentSpread + 1} of ${totalPagesCount}`
                : `Página ${currentSpread + 1} de ${totalPagesCount}`}
            </span>
          </div>

          {/* Quick Slider */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <input
              type="range"
              min={0}
              max={viewMode === "spread" ? totalSpreads - 1 : totalPagesCount - 1}
              value={currentSpread}
              onChange={(e) => setCurrentSpread(parseInt(e.target.value, 10))}
              className="w-full sm:w-36 accent-[#b87d2b] cursor-pointer"
            />
            <span className="text-[10px] uppercase tracking-wider text-[#a89680]">
              ISO A5
            </span>
          </div>
        </div>

        {/* Thumbnails Strip (Expandable) */}
        {showThumbnails && (
          <div className="mt-6 w-full max-w-5xl mx-auto p-4 rounded-xl bg-[#faf7f2] border border-[#d4a359]/40 shadow-xl animate-fade-in">
            <div className="flex justify-between items-center mb-3 px-2">
              <span className="font-mono text-xs uppercase tracking-widest text-[#8c5822] font-bold">
                {isEn ? "Booklet Spreads / Thumbnails" : "Pliegos del Libreto / Miniaturas"}
              </span>
              <button
                onClick={() => setShowThumbnails(false)}
                className="text-[#8c5822] hover:text-[#5c4a33] text-xs font-mono"
              >
                ✕ {isEn ? "Close" : "Cerrar"}
              </button>
            </div>
            <div className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 px-2 hide-scrollbar">
              {Array.from({ length: totalSpreads }).map((_, idx) => {
                const spreadPages = getSpreadPages(idx);
                const isActive = currentSpread === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setCurrentSpread(idx);
                      setShowThumbnails(false);
                    }}
                    className={`shrink-0 w-28 sm:w-32 aspect-[296/210] rounded-xs border transition-all cursor-pointer p-1 flex flex-col justify-between ${
                      isActive
                        ? "border-[#b87d2b] bg-[#f4ede2] shadow-md scale-105"
                        : "border-[#d4a359]/30 bg-[#fdfbf7] hover:border-[#b87d2b]"
                    }`}
                  >
                    <div className="flex-1 flex gap-0.5 overflow-hidden">
                      {idx === 0 ? (
                        <div className="w-full h-full bg-[#fdfbf7] flex items-center justify-center font-mono text-[8px] text-[#8c5822] font-bold border-l-2 border-[#8c5822]">
                          Portada · 1
                        </div>
                      ) : (
                        <>
                          <div className="w-1/2 h-full bg-[#f6f2e9] flex items-center justify-center font-mono text-[8px] text-[#8c5822]">
                            {spreadPages.left ? `P. ${spreadPages.left}` : "—"}
                          </div>
                          <div className="w-[1px] h-full bg-[#d4a359]/40"></div>
                          <div className="w-1/2 h-full bg-[#fdfbf7] flex items-center justify-center font-mono text-[8px] text-[#8c5822] font-bold">
                            {spreadPages.right ? `P. ${spreadPages.right}` : "—"}
                          </div>
                        </>
                      )}
                    </div>
                    <div className="text-center font-mono text-[8px] text-[#8c5822] mt-1 uppercase">
                      {idx === 0 ? (isEn ? "Cover" : "Portada") : `P. ${spreadPages.left}-${spreadPages.right || ""}`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Bottom Collection Strip: Other 3 Libretos */}
      <footer className="relative z-20 py-8 px-4 sm:px-8 border-t border-[#d4a359]/30 bg-[#faf8f4]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#8c5822] block">
                {isEn ? "AUTHOR COLLECTION" : "COLECCIÓN DE AUTOR"}
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2a2115]">
                {isEn ? "Other Photo Booklets (ISO A5)" : "Otros Libretos Fotográficos (ISO A5)"}
              </h3>
            </div>
            <button
              onClick={onBack}
              className="font-mono text-xs uppercase tracking-wider text-[#8c5822] hover:text-[#5c4a33] underline"
            >
              {isEn ? "Back to gallery" : "Volver a la galería"}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {photoLibretos.map((lib) => (
              <div
                key={lib.id}
                onClick={() => onProjectSelect(lib.id)}
                className="group relative cursor-pointer p-2.5 rounded-xs border border-[#d4a359]/30 bg-[#fdfbf7] hover:border-[#b87d2b] hover:shadow-md transition-all flex items-center gap-3"
              >
                <div className="w-12 sm:w-14 aspect-[148/210] rounded-xs overflow-hidden border border-[#d4a359]/40 shrink-0 bg-[#f4ede2]">
                  {lib.coverImage || lib.normalImage ? (
                    <img
                      src={lib.coverImage || lib.normalImage}
                      alt={pt(lib, "title")}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-mono text-[7px] text-[#8c5822]">
                      A5
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <span className="block font-mono text-[8px] text-[#8c5822] tracking-wider uppercase">
                    {pt(lib, "subcategory") || "LIBRETO"} · {lib.year || "2024"}
                  </span>
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-[#2a2115] truncate group-hover:text-[#8c5822] transition-colors">
                    {pt(lib, "title")}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          {/* Automatic Music Player at the end of the libreto page */}
          <ProjectSoundtrackSection
            projectId={project?.id}
            projectTitle={pt(project, "title")}
            isPhoto={true}
            project={project}
          />

          <div className="mt-8 flex justify-center">
            <a
              href="https://www.instagram.com/camaradebenito/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#f4ede2] hover:bg-[#ebdec9] border border-[#c8963e]/70 text-[#6e4418] font-mono text-xs uppercase tracking-widest transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 cursor-pointer"
            >
              <svg className="w-4 h-4 text-[#8c5822]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span className="font-bold">@camaradebenito</span>
              <span className="text-[#8c5822]/70 hidden sm:inline">· {isEn ? "Photography on Instagram" : "Fotografía en Instagram"}</span>
            </a>
          </div>

          <div className="mt-6 text-center font-mono text-[9px] text-[#a89680]">
            © {new Date().getFullYear()} Benito González Quiñones · Libretos Fotográficos A5 · Todos los derechos reservados
          </div>
        </div>
      </footer>
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
  const isEn = lang === "en";
  const containerRef = React.useRef(null);

  // Lightbox state for high-resolution interactive plate viewing
  const [lightboxIndex, setLightboxIndex] = React.useState(null);
  const [lightboxZoom, setLightboxZoom] = React.useState(1);
  const [lightboxPan, setLightboxPan] = React.useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = React.useState(false);
  const panStartRef = React.useRef({ x: 0, y: 0, panX: 0, panY: 0, moved: false });

  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [project?.id]);

  if (!project) return null;

  const isDesignTheme = project.category === "design";
  const isDarkTheme = project.id === "hashima-animal-park" || isDesignTheme;
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

  // Clean description paragraphs without awkward line jumps (saltos raros)
  const rawDescription = pt(project, "description");
  const paragraphs = cleanAndFormatParagraphs(rawDescription);

  // Clean summary/prologue statement
  const rawSummary = pt(project, "summary");
  const summaryParagraphs = cleanAndFormatParagraphs(rawSummary);
  const summaryText = summaryParagraphs.length > 0 ? summaryParagraphs[0] : "";
  const isSummaryRedundant = paragraphs.length > 0 && summaryText && (
    paragraphs[0].toLowerCase().startsWith(summaryText.toLowerCase().slice(0, 40)) ||
    summaryText.toLowerCase().startsWith(paragraphs[0].toLowerCase().slice(0, 40))
  );

  // Gather all unique media in continuous cascade order
  const allMedia = React.useMemo(() => {
    const list = [];
    const seen = new Set();

    const addMedia = (item) => {
      if (!item || !item.src) return;
      if (!seen.has(item.src)) {
        seen.add(item.src);
        list.push(item);
      }
    };

    // First: normalImage if defined (Hero Plate)
    if (project.normalImage) {
      addMedia({ type: "image", src: project.normalImage, isHero: true });
    }

    // Videos
    (project.videos || []).forEach((src) => addMedia({ type: "video", src }));
    // Gifs
    (project.gifs || []).forEach((src) => addMedia({ type: "gif", src }));
    // Images
    (project.images || []).forEach((src) => addMedia({ type: "image", src }));

    return list;
  }, [project]);

  // Lightbox keyboard controls
  React.useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev < allMedia.length - 1 ? prev + 1 : 0));
        setLightboxZoom(1);
        setLightboxPan({ x: 0, y: 0 });
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev > 0 ? prev - 1 : allMedia.length - 1));
        setLightboxZoom(1);
        setLightboxPan({ x: 0, y: 0 });
      } else if (e.key === "+" || e.key === "=") {
        setLightboxZoom((z) => Math.min(3, z + 0.5));
      } else if (e.key === "-") {
        setLightboxZoom((z) => {
          const next = Math.max(1, z - 0.5);
          if (next === 1) setLightboxPan({ x: 0, y: 0 });
          return next;
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, allMedia.length]);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxZoom(1);
    setLightboxPan({ x: 0, y: 0 });
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setLightboxZoom(1);
    setLightboxPan({ x: 0, y: 0 });
  };

  const handlePanMouseDown = (e) => {
    if (lightboxZoom <= 1) return;
    setIsPanning(true);
    panStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      panX: lightboxPan.x,
      panY: lightboxPan.y,
      moved: false,
    };
  };

  const handlePanMouseMove = (e) => {
    if (!isPanning || lightboxZoom <= 1) return;
    const dx = e.clientX - panStartRef.current.x;
    const dy = e.clientY - panStartRef.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      panStartRef.current.moved = true;
    }
    setLightboxPan({
      x: panStartRef.current.panX + dx,
      y: panStartRef.current.panY + dy,
    });
  };

  const handlePanMouseUp = () => {
    setIsPanning(false);
  };

  const heroPlate = allMedia.length > 0 ? allMedia[0] : null;
  const cascadePlates = allMedia.length > 1 ? allMedia.slice(1) : [];

  return (
    <div
      ref={containerRef}
      className={`w-full min-h-screen ${
        isDesignTheme ? "bg-[#001aff] text-white" : isDarkTheme ? "bg-[#0c0d10] text-gray-200" : "bg-[#fcfbf9] text-[#111111]"
      } animate-fade-in overflow-y-auto relative selection:bg-cyan-500 selection:text-black`}
    >
      <InteractiveGridBackground theme={theme} />

      <main className="relative z-10 w-full pt-28 sm:pt-36 pb-20">
        {/* Editorial Publication Header */}
        <header className="mb-12 sm:mb-20 text-center max-w-5xl mx-auto px-4 sm:px-6">
          {/* Category kicker */}
          <div className="flex items-center justify-center gap-2 text-xs font-mono tracking-widest uppercase mb-4 opacity-60">
            <span>{t(project.category)}</span>
            {project.subcategory && (
              <>
                <span aria-hidden="true">·</span>
                <span>{t(project.subcategory)}</span>
              </>
            )}
          </div>

          {/* Monumental Project Title */}
          <h1
            className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-mono uppercase tracking-tight leading-tight sm:leading-none mb-6 ${
              isDarkTheme ? "text-white" : "text-[#111111]"
            }`}
          >
            {pt(project, "title")}
          </h1>

          {/* Clean metadata strip */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-mono uppercase tracking-wider mb-6 opacity-60">
            <span>
              {allMedia.length} {isEn ? "Plates" : "Láminas"}
            </span>
            {project.pdf && (
              <>
                <span aria-hidden="true">·</span>
                <span>{isEn ? "Technical PDF Dossier" : "Dossier técnico PDF"}</span>
              </>
            )}
            <span aria-hidden="true">·</span>
            <CopyPermalinkButton theme={theme} />
          </div>

          {/* Project Summary / Lead Thesis (if not redundant) */}
          {summaryText && !isSummaryRedundant && (
            <div className="max-w-3xl mx-auto px-4 my-8 text-center border-l-2 sm:border-l-0 sm:border-y border-current/20 py-4 sm:py-6">
              <p
                className={`font-serif italic text-lg sm:text-xl md:text-2xl leading-relaxed ${
                  isDarkTheme ? "text-gray-300" : "text-gray-700"
                }`}
              >
                "{summaryText}"
              </p>
            </div>
          )}
        </header>

        {/* Hero Plate 01 (Monumental presence) */}
        {heroPlate && (
          <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
            <div
              onClick={() => openLightbox(0)}
              className={`group relative w-full rounded-xs overflow-hidden border cursor-zoom-in transition-all duration-300 shadow-2xl ${
                isDarkTheme ? "bg-black/40 border-white/10 hover:border-white/30" : "bg-white border-black/10 hover:border-black/30"
              }`}
            >
              {/* Plate Index Badge */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-white font-mono text-[10px] tracking-widest uppercase border border-white/15">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954]"></span>
                <span>{isEn ? "Plate 01" : "Pliego 01"} · {String(allMedia.length).padStart(2, "0")}</span>
              </div>

              {/* Expand Hint */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 hidden group-hover:flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-white font-mono text-[10px] tracking-wider uppercase border border-white/20">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                <span>{isEn ? "Zoom" : "Ampliar"}</span>
              </div>

              {heroPlate.type === "video" ? (
                <video
                  src={heroPlate.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full max-h-[85vh] object-contain mx-auto block"
                />
              ) : (
                <OptimizedImage
                  src={heroPlate.src}
                  loading="eager"
                  alt={pt(project, "title")}
                  className="w-full max-h-[85vh] object-contain mx-auto block group-hover:scale-[1.01] transition-transform duration-500"
                  theme={theme}
                />
              )}
            </div>
          </section>
        )}

        {/* Architectural Narrative (Fluent paragraphs without saltos raros) */}
        {paragraphs.length > 0 && (
          <section className="max-w-3xl mx-auto px-6 sm:px-8 my-16 sm:my-24">
            <div className="space-y-6 sm:space-y-8">
              {paragraphs.map((para, pIdx) => (
                <p
                  key={`p-${pIdx}`}
                  className={`text-base sm:text-lg md:text-xl font-light leading-relaxed tracking-wide ${
                    isDarkTheme ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {para}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* Cascading Media Waterfall (Plates 02, 03, 04...) */}
        {cascadePlates.length > 0 && (
          <section className="w-full space-y-16 sm:space-y-24 md:space-y-32 my-16 sm:my-24">
            {cascadePlates.map((item, idx) => {
              const realIndex = idx + 1;
              const plateNum = String(realIndex + 1).padStart(2, "0");
              const totalNum = String(allMedia.length).padStart(2, "0");

              return (
                <div
                  key={`cascade-${realIndex}`}
                  className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
                >
                  <div
                    onClick={() => openLightbox(realIndex)}
                    className={`group relative w-full rounded-xs overflow-hidden border cursor-zoom-in transition-all duration-300 shadow-xl ${
                      isDarkTheme ? "bg-black/40 border-white/10 hover:border-white/30" : "bg-white border-black/10 hover:border-black/30"
                    }`}
                  >
                    {/* Top Plate Bar */}
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-white font-mono text-[10px] tracking-widest uppercase border border-white/15">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                      <span>{isEn ? "Plate" : "Pliego"} {plateNum} · {totalNum}</span>
                    </div>

                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 hidden group-hover:flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-white font-mono text-[10px] tracking-wider uppercase border border-white/20">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                      <span>{isEn ? "Zoom" : "Ampliar"}</span>
                    </div>

                    {item.type === "video" ? (
                      <video
                        src={item.src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full max-h-[85vh] object-contain mx-auto block"
                      />
                    ) : (
                      <OptimizedImage
                        src={item.src}
                        loading="lazy"
                        alt={`${pt(project, "title")} - ${plateNum}`}
                        className="w-full max-h-[85vh] object-contain mx-auto block group-hover:scale-[1.01] transition-transform duration-500"
                        theme={theme}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </section>
        )}

        {/* Technical Documentation PDF Section */}
        {project.pdf && (
          <section className="mt-24 mb-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between pb-4 border-b border-current/20 mb-8 gap-4">
              <div>
                <span className="text-xs font-mono tracking-widest uppercase opacity-60">
                  {isEn ? "TECHNICAL DOCUMENTATION" : "DOCUMENTACIÓN TÉCNICA"}
                </span>
                <h2 className={`text-2xl sm:text-3xl font-bold font-mono uppercase tracking-wider ${isDarkTheme ? "text-white" : "text-[#111111]"}`}>
                  {isEn ? "Drawings & Dossier" : "Planos y Memoria"}
                </h2>
              </div>
              <a
                href={project.pdf}
                target="_blank"
                rel="noopener noreferrer"
                download
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-widest border transition-all duration-200 cursor-pointer ${
                  isDarkTheme 
                    ? "bg-white/10 hover:bg-white text-white hover:text-black border-white/20" 
                    : "bg-black/5 hover:bg-black text-black hover:text-white border-black/20"
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>{isEn ? "Download PDF" : "Descargar PDF"}</span>
              </a>
            </div>

            <div className={`w-full h-[75vh] min-h-[550px] rounded-xs overflow-hidden shadow-2xl border ${isDarkTheme ? "border-white/10 bg-black/40" : "border-black/10 bg-white"}`}>
              <object
                data={`${project.pdf}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
                type="application/pdf"
                className="w-full h-full border-0"
              >
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <p className="mb-4 font-mono text-sm opacity-70">
                    {isEn ? "Open the technical PDF dossier directly:" : "Abrir dossier técnico PDF directamente:"}
                  </p>
                  <a
                    href={project.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border border-current rounded-full font-mono text-xs uppercase tracking-widest"
                  >
                    {isEn ? "Open PDF" : "Abrir PDF"}
                  </a>
                </div>
              </object>
            </div>
          </section>
        )}
      </main>

      {/* Thin Soundtrack Strip */}
      <ProjectSoundtrackSection
        projectId={project?.id}
        projectTitle={pt(project, "title")}
        isDarkTheme={isDarkTheme}
        project={project}
      />

      {/* Next / Previous Project Navigation */}
      {(prevProject || nextProject) && (
        <nav
          className={`w-full mt-12 md:mt-24 border-t border-dashed ${isDarkTheme ? "border-gray-800" : "border-gray-300"} z-10 relative flex flex-col sm:flex-row`}
        >
          {prevProject ? (
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                onProjectSelect(prevProject.id);
              }}
              className={`group flex-1 p-8 sm:p-14 text-left transition-all duration-300 cursor-pointer ${
                isDarkTheme ? "hover:bg-white/5" : "hover:bg-black/5"
              } ${nextProject ? (isDarkTheme ? "border-b border-dashed sm:border-b-0 sm:border-r border-gray-800" : "border-b border-dashed sm:border-b-0 sm:border-r border-gray-300") : ""}`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-xs font-mono uppercase tracking-widest opacity-50">
                  ← {t("Prev")}
                </span>
              </div>
              <p className={`text-xl sm:text-3xl font-light font-mono uppercase tracking-wider ${isDarkTheme ? "text-white" : "text-black"}`}>
                {pt(prevProject, "title")}
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
              className={`group flex-1 p-8 sm:p-14 text-right transition-all duration-300 cursor-pointer ${
                isDarkTheme ? "hover:bg-white/5" : "hover:bg-black/5"
              }`}
            >
              <div className="flex items-center justify-end space-x-3 mb-3">
                <span className="text-xs font-mono uppercase tracking-widest opacity-50">
                  {t("Next")} →
                </span>
              </div>
              <p className={`text-xl sm:text-3xl font-light font-mono uppercase tracking-wider ${isDarkTheme ? "text-white" : "text-black"}`}>
                {pt(nextProject, "title")}
              </p>
            </button>
          ) : (
            <div className="flex-1 hidden sm:block"></div>
          )}
        </nav>
      )}

      {/* Instagram footer link */}
      <div className="w-full py-8 flex justify-center border-t border-dashed border-current/15 z-10 relative">
        <a
          href="https://www.instagram.com/arquitecturabenito/"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 hover:border-cyan-400 text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 shadow-md hover:scale-105 cursor-pointer backdrop-blur-md"
        >
          <svg className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          <span className="font-bold">@arquitecturabenito</span>
          <span className="text-gray-400 hidden sm:inline">· {lang === "en" ? "Architecture & Design on Instagram" : "Arquitectura y Diseño en Instagram"}</span>
        </a>
      </div>

      <footer
        className={`${isDarkTheme ? "bg-black/80 text-gray-500" : "bg-black/5 text-gray-600"} text-center p-6 mt-0 z-10 relative`}
      >
        <p className="text-xs font-mono">
          © {new Date().getFullYear()} Benito González Quiñones · {t("Todos los derechos reservados")} · arquitecturabenito@gmail.com
        </p>
      </footer>

      {/* Interactive High-Resolution Lightbox Modal */}
      {lightboxIndex !== null && allMedia[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[250] bg-black/95 backdrop-blur-md flex flex-col justify-between animate-fade-in select-none"
          onClick={closeLightbox}
        >
          {/* Top Bar */}
          <div
            className="flex items-center justify-between px-4 sm:px-8 py-4 border-b border-white/10 z-30 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#1DB954] font-bold">
                {isEn ? "Plate" : "Pliego"} {String(lightboxIndex + 1).padStart(2, "0")} / {String(allMedia.length).padStart(2, "0")}
              </span>
              <span className="text-white/40 hidden sm:inline">|</span>
              <span className="font-mono text-xs text-white/80 hidden sm:inline truncate max-w-md">
                {pt(project, "title")}
              </span>
            </div>

            {/* Controls: Zoom In / Out / Reset & Close */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => {
                  setLightboxZoom((z) => {
                    const next = Math.max(1, z - 0.5);
                    if (next === 1) setLightboxPan({ x: 0, y: 0 });
                    return next;
                  });
                }}
                disabled={lightboxZoom <= 1}
                className="w-8 h-8 rounded-full border border-white/20 text-white hover:bg-white/10 flex items-center justify-center font-bold text-sm disabled:opacity-30 cursor-pointer"
                title={isEn ? "Zoom Out (-)" : "Reducir zoom (-)"}
              >
                -
              </button>
              <button
                onClick={() => {
                  setLightboxZoom(1);
                  setLightboxPan({ x: 0, y: 0 });
                }}
                className="px-2.5 py-1 rounded-full border border-white/20 text-white font-mono text-[11px] hover:bg-white/10 cursor-pointer"
                title={isEn ? "Reset Zoom" : "Restablecer zoom"}
              >
                {Math.round(lightboxZoom * 100)}%
              </button>
              <button
                onClick={() => setLightboxZoom((z) => Math.min(3, z + 0.5))}
                disabled={lightboxZoom >= 3}
                className="w-8 h-8 rounded-full border border-white/20 text-white hover:bg-white/10 flex items-center justify-center font-bold text-sm disabled:opacity-30 cursor-pointer"
                title={isEn ? "Zoom In (+)" : "Ampliar zoom (+)"}
              >
                +
              </button>
              <button
                onClick={closeLightbox}
                className="w-8 h-8 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center text-lg font-bold ml-2 cursor-pointer"
                title={isEn ? "Close (Esc)" : "Cerrar (Esc)"}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Central Plate Display Stage */}
          <div
            className="flex-1 relative flex items-center justify-center p-4 sm:p-8 overflow-hidden"
            onMouseDown={handlePanMouseDown}
            onMouseMove={handlePanMouseMove}
            onMouseUp={handlePanMouseUp}
            style={{
              cursor: lightboxZoom > 1 ? (isPanning ? "grabbing" : "grab") : "default",
            }}
          >
            {/* Prev Arrow */}
            {allMedia.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev > 0 ? prev - 1 : allMedia.length - 1));
                  setLightboxZoom(1);
                  setLightboxPan({ x: 0, y: 0 });
                }}
                className="absolute left-3 sm:left-6 z-40 w-11 h-11 rounded-full bg-black/60 hover:bg-black border border-white/20 text-white flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
                aria-label={isEn ? "Previous plate" : "Lámina anterior"}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Media element with scale and pan */}
            <div
              className="max-w-full max-h-full flex items-center justify-center transition-transform duration-100"
              style={{
                transform: `scale(${lightboxZoom}) translate(${lightboxPan.x / lightboxZoom}px, ${lightboxPan.y / lightboxZoom}px)`,
                transformOrigin: "center center",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {allMedia[lightboxIndex].type === "video" ? (
                <video
                  src={allMedia[lightboxIndex].src}
                  controls
                  autoPlay
                  className="max-h-[82vh] max-w-[90vw] object-contain shadow-2xl rounded-xs"
                />
              ) : (
                <img
                  src={allMedia[lightboxIndex].src}
                  alt={`${pt(project, "title")} - ${lightboxIndex + 1}`}
                  className="max-h-[82vh] max-w-[90vw] object-contain shadow-2xl rounded-xs"
                />
              )}
            </div>

            {/* Next Arrow */}
            {allMedia.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev < allMedia.length - 1 ? prev + 1 : 0));
                  setLightboxZoom(1);
                  setLightboxPan({ x: 0, y: 0 });
                }}
                className="absolute right-3 sm:right-6 z-40 w-11 h-11 rounded-full bg-black/60 hover:bg-black border border-white/20 text-white flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
                aria-label={isEn ? "Next plate" : "Lámina siguiente"}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {/* Bottom Thumbnails Scrubber */}
          {allMedia.length > 1 && (
            <div
              className="px-4 py-3 border-t border-white/10 z-30 shrink-0 bg-black/60 overflow-x-auto hide-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-center gap-2 min-w-max mx-auto">
                {allMedia.map((m, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setLightboxIndex(idx);
                      setLightboxZoom(1);
                      setLightboxPan({ x: 0, y: 0 });
                    }}
                    className={`w-14 h-10 sm:w-16 sm:h-11 rounded-xs overflow-hidden border transition-all cursor-pointer relative ${
                      lightboxIndex === idx
                        ? "border-[#1DB954] scale-105 shadow-md shadow-[#1DB954]/20"
                        : "border-white/20 opacity-50 hover:opacity-100"
                    }`}
                  >
                    {m.type === "video" ? (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center text-[8px] font-mono text-white">
                        VID
                      </div>
                    ) : (
                      <img
                        src={m.src}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const FilterControls = ({
  currentFilter,
  onFilterChange,
  currentSubcategory,
}) => {
  const { t } = useTranslation();
  const { lang, setLang } = React.useContext(LanguageContext);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const filters = [
    { key: "all", label: "TODOS" },
    { key: "architecture", label: "ARQUITECTURA" },
    { key: "design", label: "DISEÑO" },
    { key: "photography", label: "FOTOGRAFÍA" },
    { key: "escenografias", label: "ESCENOGRAFÍAS" },
    { key: "contact", label: "CONTACTO" },
  ];

  const activeFilterObj = filters.find((f) => f.key === currentFilter) || filters[0];
  const activeLabel = activeFilterObj ? activeFilterObj.label : "TODOS";
  const isPhoto = currentFilter === "photography";
  const isDesign = currentFilter === "design";

  // Close menu on Escape
  React.useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    if (isMenuOpen) {
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }
  }, [isMenuOpen]);

  return (
    <React.Fragment>
      {/* Desktop Top Bar */}
      <div className="hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 z-20 space-x-2 bg-black/30 backdrop-blur-sm p-1.5 rounded-full items-center justify-center border border-white/10 shadow-lg">
        {filters.map((filter) => (
          <div key={filter.key} className="flex flex-col items-center relative">
            <button
              onClick={() => onFilterChange(filter.key)}
              className={`px-3 py-1 text-xs sm:text-sm font-mono uppercase tracking-wider rounded-full transition-all duration-200 cursor-pointer ${
                currentFilter === filter.key
                  ? filter.key === "photography"
                    ? "bg-[#c8963e] text-black font-bold shadow-lg shadow-[#c8963e]/40"
                    : "bg-cyan-400 text-black shadow-lg"
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
                  {t(currentSubcategory)}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Unified Mobile Header Bar (height 56px / h-14) */}
      <header
        className={`md:hidden fixed top-0 left-0 right-0 h-14 z-50 flex items-center justify-between px-3.5 backdrop-blur-md border-b transition-colors duration-300 ${
          isPhoto
            ? "bg-[#faf8f4]/95 border-[#d4a359]/30 text-[#2c2419]"
            : isDesign
            ? "bg-black/90 border-[#ff0000]/40 text-white"
            : "bg-[#08080a]/90 border-white/10 text-white"
        }`}
      >
        {/* Left: Brand Identity */}
        <button
          onClick={() => {
            onFilterChange("all");
            setIsMenuOpen(false);
          }}
          className="flex flex-col text-left cursor-pointer focus:outline-hidden"
          aria-label="Ir al inicio"
        >
          <span
            className={`font-mono text-xs font-bold tracking-wider uppercase leading-tight ${
              isPhoto ? "text-[#b87d2b]" : isDesign ? "text-[#ff0000]" : "text-white"
            }`}
          >
            Benito G. Quiñones
          </span>
          <span
            className={`font-mono text-[8px] tracking-[0.2em] uppercase mt-0.5 leading-none ${
              isPhoto ? "text-[#8c5822]/70" : isDesign ? "text-[#ff0000]/70" : "text-gray-400"
            }`}
          >
            Portfolio
          </span>
        </button>

        {/* Center: Dropdown Category Selector Button */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider border transition-all duration-200 cursor-pointer shadow-sm ${
              isPhoto
                ? "bg-[#c8963e] text-black border-[#b87d2b] font-bold shadow-[#c8963e]/30"
                : isDesign
                ? "bg-[#ff0000] text-white border-[#ff0000] font-bold shadow-[#ff0000]/30"
                : currentFilter === "all"
                ? "bg-white/10 hover:bg-white/20 border-white/20 text-white"
                : "bg-cyan-400 text-black border-cyan-300 font-bold shadow-cyan-400/30"
            }`}
            aria-expanded={isMenuOpen}
            aria-label="Menú desplegable de categorías"
          >
            <span className="max-w-[110px] truncate">{t(activeLabel)}</span>
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                isMenuOpen ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Right: Language Toggle */}
        <div
          className={`flex items-center rounded-full p-0.5 border ${
            isPhoto
              ? "bg-[#f4ede2] border-[#d4a359]/40 text-[#8c5822]"
              : isDesign
              ? "bg-[#000033]/80 border-[#ff0000]/40 text-white"
              : "bg-white/10 border-white/15 text-white"
          }`}
        >
          <button
            onClick={() => setLang("es")}
            className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold transition-all cursor-pointer ${
              lang === "es"
                ? isPhoto
                  ? "bg-[#c8963e] text-white shadow-xs"
                  : isDesign
                  ? "bg-[#ff0000] text-white shadow-xs"
                  : "bg-white text-black shadow-xs"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            ES
          </button>
          <button
            onClick={() => setLang("en")}
            className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold transition-all cursor-pointer ${
              lang === "en"
                ? isPhoto
                  ? "bg-[#c8963e] text-white shadow-xs"
                  : isDesign
                  ? "bg-[#ff0000] text-white shadow-xs"
                  : "bg-white text-black shadow-xs"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            EN
          </button>
        </div>
      </header>

      {/* Mobile Category Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs animate-fade-in"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Drawer Menu */}
          <div
            className={`fixed top-14 left-0 right-0 z-50 border-b shadow-2xl p-4 animate-slide-down transition-all duration-200 ${
              isPhoto
                ? "bg-[#faf8f4] border-[#d4a359]/40 text-[#2c2419]"
                : isDesign
                ? "bg-[#020216]/95 border-[#ff0000]/40 text-white backdrop-blur-xl"
                : "bg-[#0a0a0c]/95 border-white/15 text-white backdrop-blur-xl"
            }`}
          >
            <div className="max-w-md mx-auto flex flex-col gap-1.5">
              <div
                className={`flex items-center justify-between pb-2 mb-1 border-b text-[10px] font-mono uppercase tracking-widest ${
                  isPhoto ? "border-[#d4a359]/20 text-[#8c5822]/70" : "border-white/10 text-gray-400"
                }`}
              >
                <span>{lang === "en" ? "Categories" : "Categorías"}</span>
                <span>{filters.length} {lang === "en" ? "Sections" : "Secciones"}</span>
              </div>

              {filters.map((filter) => {
                const isActive = currentFilter === filter.key;
                return (
                  <button
                    key={filter.key}
                    onClick={() => {
                      onFilterChange(filter.key);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full min-h-[46px] px-4 py-2.5 rounded-lg flex items-center justify-between text-left font-mono text-xs sm:text-sm uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                      isActive
                        ? filter.key === "photography"
                          ? "bg-[#c8963e] text-black font-bold shadow-md shadow-[#c8963e]/30"
                          : filter.key === "design"
                          ? "bg-[#ff0000] text-white font-bold shadow-md shadow-[#ff0000]/30"
                          : "bg-cyan-400 text-black font-bold shadow-md"
                        : isPhoto
                        ? "hover:bg-[#f4ede1] text-[#6e4418]"
                        : "hover:bg-white/10 text-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isActive
                            ? filter.key === "photography" || filter.key === "all"
                              ? "bg-black"
                              : "bg-white"
                            : "bg-transparent border border-current opacity-40"
                        }`}
                      />
                      <span>{t(filter.label)}</span>
                    </div>
                    {isActive && currentSubcategory && (
                      <span className="text-[10px] font-mono tracking-widest px-2 py-0.5 rounded-full bg-black/20 border border-current">
                        {t(currentSubcategory)}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

const NavigationOverlay = () => {
  const { t } = useTranslation();
  return (
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
          {t("> Navegando el interespacio...")}
        </span>
      </div>
    </div>
  );
};

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
          {t("Portfolio digital de Benito G. Quiñones")}
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-mono uppercase tracking-widest text-white drop-shadow-lg leading-tight">
          {t("¿Cómo prefieres ordenar la información?")}
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
            {t("Constelación")}
          </h2>
          <p className="mt-2 md:mt-4 text-gray-500 font-mono tracking-wider text-[10px] sm:text-xs md:text-sm uppercase group-hover:text-cyan-200">
            {t("Exploración relacional interactiva")}
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
          {t("porfolio")}
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
              className={`text-left text-[10px] xl:text-xs ${currentFilter === 'design' ? 'text-[#ffcc00] hover:text-[#ff0000]' : currentFilter === 'photography' ? 'text-[#c8963e] hover:text-[#8c5822]' : 'text-gray-500 hover:text-cyan-400'} font-mono uppercase tracking-widest transition-colors pointer-events-auto`}
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
              className={`text-right text-[10px] xl:text-xs ${currentFilter === 'design' ? 'text-[#ffcc00] hover:text-[#ff0000]' : currentFilter === 'photography' ? 'text-[#c8963e] hover:text-[#8c5822]' : 'text-gray-500 hover:text-cyan-400'} font-mono uppercase tracking-widest transition-colors pointer-events-auto w-full`}
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
  } else if (theme === "photography") {
    titleColor = "text-[#b87d2b]";
    subColor = "text-[#8c5822]";
    shadow = "0 1px 4px rgba(184,125,43,0.15)";
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
    ? "fixed top-3.5 right-20 sm:right-28 md:top-6 md:right-32 z-[100] text-right pointer-events-none drop-shadow-lg hidden sm:block"
    : "hidden md:block fixed md:top-8 md:left-8 z-[100] text-left pointer-events-none drop-shadow-lg";
    
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
  
  // Posición consistente en la parte superior derecha en todas las páginas
  const positionClasses = compact
    ? "fixed top-3.5 sm:top-4 right-3 sm:right-4 md:top-6 md:right-8 z-[140]"
    : "hidden md:flex fixed md:top-8 md:right-8 z-[140]";

  let capsuleBg = "bg-black/75 border-white/20 text-white shadow-[0_4px_25px_rgba(0,0,0,0.6)]";
  let activeBtn = "bg-white/25 text-white font-bold shadow-sm";
  let inactiveBtn = "text-white/60 hover:text-white hover:bg-white/10";
  let iconColor = "text-white/70";

  if (theme === "design") {
    capsuleBg = "bg-[#000033]/90 border-[#ff0000]/40 text-white shadow-[0_4px_25px_rgba(255,0,0,0.3)]";
    activeBtn = "bg-[#ff0000]/30 text-[#ff0000] border border-[#ff0000]/50 font-bold shadow-sm";
    inactiveBtn = "text-white/60 hover:text-[#ff0000] hover:bg-[#ff0000]/10";
    iconColor = "text-[#ff0000]/80";
  } else if (theme === "photography") {
    capsuleBg = "bg-[#faf7f2]/95 border-[#c8963e]/40 text-[#4a3b22] shadow-[0_4px_25px_rgba(184,125,43,0.12)]";
    activeBtn = "bg-[#c8963e]/25 text-[#8c5822] border border-[#c8963e]/50 font-bold shadow-sm";
    inactiveBtn = "text-[#8c7e6b] hover:text-[#8c5822] hover:bg-[#c8963e]/10";
    iconColor = "text-[#b87d2b]";
  } else if (theme === "light") {
    capsuleBg = "bg-white/90 border-black/15 text-black shadow-[0_4px_25px_rgba(0,0,0,0.08)]";
    activeBtn = "bg-black/15 text-black font-bold shadow-sm";
    inactiveBtn = "text-black/50 hover:text-black hover:bg-black/5";
    iconColor = "text-black/60";
  }

  return (
    <div
      className={`z-[150] flex items-center p-0.5 sm:p-1 rounded-full border backdrop-blur-md transition-all duration-300 pointer-events-auto ${positionClasses} ${capsuleBg}`}
      role="region"
      aria-label="Language selector / Selector de idioma"
    >
      <div className="flex items-center px-1 sm:px-1.5 pointer-events-none select-none">
        <svg
          className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${iconColor}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      </div>
      <button
        type="button"
        onClick={() => setLang("es")}
        aria-pressed={lang === "es"}
        title="Cambiar idioma a Español"
        className={`text-[10px] sm:text-xs font-mono uppercase tracking-wider px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full transition-all duration-200 cursor-pointer ${
          lang === "es" ? activeBtn : inactiveBtn
        }`}
      >
        ES
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        title="Switch language to English"
        className={`text-[10px] sm:text-xs font-mono uppercase tracking-wider px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full transition-all duration-200 cursor-pointer ${
          lang === "en" ? activeBtn : inactiveBtn
        }`}
      >
        EN
      </button>
    </div>
  );
};

const App = () => {
  const [lang, setLang] = React.useState(() => {
    try {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("portfolio_lang");
        if (saved === "en" || saved === "es") return saved;
      }
    } catch (e) {}
    return "es";
  });
  const { t } = useTranslation(lang);

  React.useEffect(() => {
    document.documentElement.lang = lang;
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("portfolio_lang", lang);
      }
    } catch (e) {}
  }, [lang]);
  const initialRoute = React.useMemo(() => parseUrlToState(), []);
  const [view, setView] = React.useState(initialRoute.view);
  const [filter, setFilter] = React.useState(initialRoute.filter);
  const [zoomTarget, setZoomTarget] = React.useState(null);
  const [hoveredProjectImage, setHoveredProjectImage] = React.useState(null);
  const [slideshowImage, setSlideshowImage] = React.useState(null);
  const [bgImage, setBgImage] = React.useState(null);
  const [bgOpacity, setBgOpacity] = React.useState(0);
  const [disruptSignal, setDisruptSignal] = React.useState(0);
  const [isGalleryMode, setIsGalleryMode] = React.useState(true);
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

  // Synchronize URL permalink on view or filter change and update document title
  React.useEffect(() => {
    const targetHash = getPermalink(view, filter);
    const currentHash = window.location.hash || "#/";

    if (currentHash !== targetHash && !(currentHash === "#/" && targetHash === "#/")) {
      window.history.pushState({ view, filter }, "", targetHash);
    }

    // Dynamic document.title update
    try {
      let pageTitle = "Benito González Quiñones · Portfolio";
      if (view.page === "project" && view.projectId) {
        const proj = allProjectsData.find((p) => p.id === view.projectId);
        if (proj) {
          pageTitle = `${pt(proj, "title")} · Benito G. Quiñones`;
        }
      } else if (view.page === "escrito-detail" && view.escritoId) {
        const escrito = window.escritosData?.find((e) => e.id === view.escritoId);
        if (escrito) {
          pageTitle = `${pt(escrito, "title")} · Benito G. Quiñones`;
        }
      } else if (view.page === "escritos-arquitectura") {
        pageTitle = `Escritos & Publicaciones · Benito G. Quiñones`;
      } else if (view.page === "photography" || filter === "photography") {
        pageTitle = `Fotografía (Libretos A5) · Benito G. Quiñones`;
      } else if (view.page === "architecture" || filter === "architecture") {
        pageTitle = `Arquitectura · Benito G. Quiñones`;
      } else if (view.page === "design" || filter === "design") {
        pageTitle = `Diseño · Benito G. Quiñones`;
      } else if (view.page === "scenography" || filter === "scenography") {
        pageTitle = `Escenografías · Benito G. Quiñones`;
      } else if (view.page === "contact" || filter === "contact") {
        pageTitle = `Contacto · Benito G. Quiñones`;
      } else if (view.page === "subcategory" && view.subcategory) {
        pageTitle = `${view.subcategory} · Benito G. Quiñones`;
      } else if (view.page === "carteleria") {
        pageTitle = `Cartelería · Benito G. Quiñones`;
      } else if (view.page === "generacion-ia") {
        pageTitle = `Generación IA · Benito G. Quiñones`;
      } else if (view.page === "web-design") {
        pageTitle = `Diseño Web · Benito G. Quiñones`;
      }
      document.title = pageTitle;
    } catch (_) {}
  }, [view, filter]);

  // Handle browser Back / Forward buttons and direct hash navigation
  React.useEffect(() => {
    const handleUrlChange = () => {
      const parsed = parseUrlToState();
      setView((prev) => {
        if (
          prev.page === parsed.view.page &&
          prev.projectId === parsed.view.projectId &&
          prev.subcategory === parsed.view.subcategory &&
          prev.escritoId === parsed.view.escritoId
        ) {
          return prev;
        }
        return parsed.view;
      });
      setFilter((prev) => (prev === parsed.filter ? prev : parsed.filter));
    };

    window.addEventListener("popstate", handleUrlChange);
    window.addEventListener("hashchange", handleUrlChange);
    return () => {
      window.removeEventListener("popstate", handleUrlChange);
      window.removeEventListener("hashchange", handleUrlChange);
    };
  }, []);

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
      !isGalleryMode &&
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
    } else if (view.page === "photography" || filter === "photography") {
      bgColor = "#faf8f4"; // minimalist warm white & ochre
    } else if (view.page === "project") {
      const project = allProjectsData.find((p) => p.id === view.projectId);
      if (project && (project.isLibreto || project.category === "photography")) {
        bgColor = "#faf8f4";
      } else {
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
    }

    html.style.backgroundColor = bgColor;
    body.style.backgroundColor = bgColor;

    return () => {
      html.style.overflow = "auto";
      body.style.overflow = "auto";
    };
  }, [view.page, view.projectId, filter, isGalleryMode]);

  const handleFilterChange = (newFilterKey) => {
    setHoveredProjectImage(null);

    const pageMap = {
      architecture: "architecture",
      design: "design",
      photography: "photography",
      scenography: "scenography",
      escenografias: "scenography",
      contact: "contact",
    };

    const targetPage = pageMap[newFilterKey] ? pageMap[newFilterKey] : "home";

    if (view.page === "home" && targetPage !== "home" && !isGalleryMode) {
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

  // Ensure that soundtrack is initialized upon navigating to individual project pages
  React.useEffect(() => {
    if (view.page === "project" && view.projectId) {
      const project = allProjectsData.find((p) => p.id === view.projectId);
      const songUrl =
        project?.spotifyUrl ||
        project?.musicUrl ||
        (projectMusic && (projectMusic[view.projectId] || (view.projectId === "rapa-das-bestas" && projectMusic["rapa-das-bestas-2025"]) || (view.projectId === "cuaderno-de-campo" && projectMusic["cuaderno-de-campo-2024"]))) ||
        (window.projectMusicConfig && (window.projectMusicConfig[view.projectId] || (view.projectId === "rapa-das-bestas" && window.projectMusicConfig["rapa-das-bestas-2025"]) || (view.projectId === "cuaderno-de-campo" && window.projectMusicConfig["cuaderno-de-campo-2024"]))) ||
        "";
      if (songUrl) {
        globalSoundtrack.playProject(view.projectId, songUrl);
      }
    }
  }, [view.page, view.projectId, allProjectsData]);

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

    // Trigger audio initialization immediately inside user gesture click
    try {
      const songUrl =
        project?.spotifyUrl ||
        project?.musicUrl ||
        (projectMusic && (projectMusic[projectId] || (projectId === "rapa-das-bestas" && projectMusic["rapa-das-bestas-2025"]) || (projectId === "cuaderno-de-campo" && projectMusic["cuaderno-de-campo-2024"]))) ||
        (window.projectMusicConfig && (window.projectMusicConfig[projectId] || (projectId === "rapa-das-bestas" && window.projectMusicConfig["rapa-das-bestas-2025"]) || (projectId === "cuaderno-de-campo" && window.projectMusicConfig["cuaderno-de-campo-2024"]))) ||
        "";
      if (songUrl) {
        globalSoundtrack.playProject(projectId, songUrl);
      }
    } catch (_) {}

    if (project && project.id === "carteleria") {
      setView({ page: "carteleria", projectId });
    } else {
      setView({ page: "project", projectId });
    }
  }, [allProjectsData]);

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
            ["ARQUITECTURA", "DISEÑO", "FOTOGRAFÍA", "ESCENOGRAFÍAS", "CONTACTO"].includes(
              node.id,
            )
          ) {
            let filterKey =
              node.id === "ARQUITECTURA"
                ? "architecture"
                : node.id === "DISEÑO"
                  ? "design"
                  : node.id === "FOTOGRAFÍA"
                    ? "photography"
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
        ["ARQUITECTURA", "DISEÑO", "FOTOGRAFÍA", "ESCENOGRAFÍAS", "CONTACTO"].includes(
          node.id,
        )
      ) {
        let filterKey =
          node.id === "ARQUITECTURA"
            ? "architecture"
            : node.id === "DISEÑO"
              ? "design"
              : node.id === "FOTOGRAFÍA"
                ? "photography"
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

      if (project && (project.category === "photography" || project.isLibreto)) {
        setFilter("photography");
        setView({ page: "photography", projectId: null });
        return;
      }

      if (
        standalonePages.includes(view.page) ||
        (project && project.category === "design")
      ) {
        setFilter("design");
        setView({ page: "design", projectId: null });
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
      ["architecture", "design", "photography", "scenography", "contact"].includes(view.page)
    ) {
      handleGoHome();
    }
  };

  const handleProjectHover = React.useCallback((project) => {
    setHoveredProjectImage(project ? project.normalImage : null);
  }, []);

  const backButtonTheme = React.useMemo(() => {
    if (view.page === "escritos-arquitectura" || view.page === "escrito-detail") {
      return "light";
    }
    if (view.page === "web-design") {
      return "design";
    }
    if (view.page === "photography") {
      return "photography";
    }
    if (view.page === "project") {
      const project = allProjectsData.find((p) => p.id === view.projectId);
      if (project?.category === "photography" || project?.isLibreto) {
        return "photography";
      }
      if (project?.category === "design") return "design";
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
                  allProjectsData={allProjectsData}
                  onNodeClick={handleNodeClick}
                  filter={filter}
                  disruptSignal={disruptSignal}
                  zoomTarget={zoomTarget}
                  highlightNodeId={highlightNodeId}
                />
                <div className="fixed bottom-24 left-4 md:bottom-8 md:left-8 p-2 sm:p-3 bg-black/40 backdrop-blur-md rounded-xl md:rounded-lg border border-white/10 text-white/70 text-[9px] sm:text-[10px] md:text-xs font-mono tracking-wider pointer-events-none opacity-70 text-left whitespace-pre-line z-50 min-w-max">
                  {typeof window !== "undefined" &&
                  ("ontouchstart" in window || navigator.maxTouchPoints > 0)
                    ? (lang === "en" ? "Drag to orbit\nPinch to zoom\nTap to explore" : "Arrastra para orbitar\nPellizca para zoom\nToca para explorar")
                    : (lang === "en" ? "Drag: Orbit\nScroll: Zoom\nClick: Explore" : "Arrastra: Orbitar\nScroll: Zoom\nClic: Explorar")}
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
      case "photography":
        if (isGalleryMode)
          return (
            <div className="absolute top-0 left-0 w-full h-full z-10">
              <GalleryView
                filter="photography"
                onProjectSelect={handleProjectSelect}
                onSubcategorySelect={handleSubcategorySelect}
                onFilterChange={handleFilterChange}
              />
            </div>
          );
        return (
          <OrbitalPage
            category="photography"
            title="FOTOGRAFÍA"
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
      case "project": {
        const project = allProjectsData.find((p) => p.id === view.projectId);
        if (project && (project.isLibreto || project.category === "photography")) {
          return (
            <LibretoViewer
              project={project}
              allProjectsData={allProjectsData}
              onProjectSelect={handleProjectSelect}
              onBack={handleBack}
            />
          );
        }
        return (
          <ProjectDetailPage
            project={project}
            allProjectsData={allProjectsData}
            onProjectSelect={handleProjectSelect}
            onBack={handleBack}
          />
        );
      }
      default:
        return null;
    }
  };

  let currentTheme = "dark";
  if (view.page === "project" && view.projectId) {
    const project = allProjectsData.find((p) => p.id === view.projectId);
    if (project) {
      if (project.category === "photography" || project.isLibreto) {
        currentTheme = "photography";
      } else if (project.category === "design") {
        currentTheme = "design";
      } else {
        const carouselProjects = [
          "escenografia-grita",
          "escenografia-bodas",
          "coleccion-grabados",
          "territorios-digitales",
        ];
        const isCarouselView = carouselProjects.includes(project.id);
        const isDarkTheme = project.id === "hashima-animal-park" || isCarouselView;
        currentTheme = isDarkTheme ? "dark" : "light";
      }
    }
  } else if (view.page === "photography" || (view.page === "home" && filter === "photography")) {
    currentTheme = "photography";
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
          "photography",
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
          "photography",
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
          "photography",
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
                className={`flex-1 sm:flex-none px-2 sm:px-6 py-1.5 rounded-full text-[9px] sm:text-xs font-mono uppercase tracking-widest transition-all duration-300 ${isGalleryMode ? 'bg-cyan-900/50 text-cyan-400 border border-cyan-400/30 shadow-[0_0_10px_rgba(0,255,255,0.2)]' : 'text-gray-500 hover:text-gray-300'} ${isNavigatingMode ? 'opacity-50 cursor-not-allowed' : ''}`}
              >{t("Galería")}</button>
            </div>
            <button
              onClick={handleRandomProject}
              className="hidden md:flex absolute bottom-8 right-4 md:right-8 z-30 px-4 py-2 sm:px-5 sm:py-2.5 bg-black bg-opacity-50 rounded-full border border-gray-700 text-gray-400 font-mono text-[10px] sm:text-xs uppercase tracking-wider items-center justify-center hover:bg-white/10 hover:border-gray-500 hover:text-white transition-all duration-300 backdrop-blur-sm"
              title={t("Abre un proyecto al azar")}
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
