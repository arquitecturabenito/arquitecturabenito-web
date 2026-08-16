import fs from 'fs';

let content = fs.readFileSync('src/main.jsx', 'utf8');

// 1. Add OptimizedImage, ConstellationLoader, and AppLoader components after imports
const componentsCode = `
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
      return src.replace(/\\.(png|jpg|jpeg)$/i, ".webp");
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
      className={\`relative overflow-hidden flex items-center justify-center \${containerClassName}\`}
      onClick={onClick}
    >
      {/* Loading Skeleton Shimmer */}
      {!isLoaded && !hasError && (
        <div
          className={\`absolute inset-0 z-10 flex flex-col items-center justify-center transition-opacity duration-300 \${
            isLight
              ? "bg-[#e2e2dc] text-gray-400"
              : isDesign
              ? "bg-blue-950/60 text-[#ffcc00]"
              : "bg-gray-900/80 text-cyan-400/60"
          }\`}
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div
              className={\`w-6 h-6 border rounded-full \${
                isLight
                  ? "border-gray-400 border-t-transparent"
                  : isDesign
                  ? "border-[#ffcc00] border-t-transparent"
                  : "border-cyan-400 border-t-transparent"
              } animate-spin\`}
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
          className={\`w-full h-full min-h-[120px] flex flex-col items-center justify-center p-4 border border-dashed \${
            isLight
              ? "border-gray-300 bg-gray-100 text-gray-500"
              : "border-gray-800 bg-gray-950/80 text-gray-400"
          } font-mono text-[9px] text-center\`}
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
            className={\`\${className} transition-opacity duration-500 ease-out \${
              isLoaded ? "opacity-100" : "opacity-0"
            }\`}
            style={style}
          />
        </picture>
      )}
    </div>
  );
};

const ConstellationLoader = ({ message = "CALIBRANDO CONSTELACIÓN 3D..." }) => {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm pointer-events-none animate-fade-in">
      <div className="relative w-20 h-20 flex items-center justify-center mb-4">
        <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/40 animate-[spin_10s_linear_infinite]" />
        <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#00ffff] animate-pulse" />
        </div>
      </div>
      <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-cyan-300">
        {message}
      </p>
    </div>
  );
};

const AppLoader = ({ isVisible, progress, statusText }) => {
  return (
    <div
      className={\`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#050508] transition-all duration-700 \${
        isVisible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none blur-sm"
      }\`}
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
            style={{ width: \`\${Math.min(100, Math.max(0, progress))}%\` }}
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
`;

const importMarker = "import * as d3 from 'd3';";
content = content.replace(importMarker, importMarker + "\n" + componentsCode);

fs.writeFileSync('src/main.jsx', content);
console.log('Added components successfully');
