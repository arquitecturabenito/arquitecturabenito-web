import React, { useState, useEffect, useRef } from 'react';
import { allProjectsData } from '../data/projects';
import { Project } from '../data/projects';

interface ArchitecturePageProps {
  onBack: () => void;
}

const architectureProjects = allProjectsData.filter(p => p.category === 'architecture');
const coverSlide = {
  id: 'cover' as const,
  type: 'cover' as const,
  image: architectureProjects.length > 0 ? architectureProjects[0].normalImage : '',
  title: 'Arquitectura'
};

type Slide = typeof coverSlide | (Project & { type: 'project' });

const slides: Slide[] = [coverSlide, ...architectureProjects.map(p => ({ ...p, type: 'project' as const }))];

const ArchitecturePage: React.FC<ArchitecturePageProps> = ({ onBack }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    slideRefs.current = slideRefs.current.slice(0, slides.length);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const intersectingEntry = entries.find((entry) => entry.isIntersecting);
        if (intersectingEntry) {
          const index = slideRefs.current.indexOf(intersectingEntry.target as HTMLElement);
          if (index !== -1) {
            setActiveIndex(index);
          }
        }
      },
      { root: mainContainerRef.current, threshold: 0.5 }
    );

    const currentRefs = slideRefs.current;
    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
      observer.disconnect();
    };
  }, []);
  
  const scrollToSlide = (index: number) => {
    slideRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      scrollToSlide(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < slides.length - 1) {
      scrollToSlide(activeIndex + 1);
    }
  };

  return (
    <div className="w-full h-screen bg-black text-white animate-fade-in overflow-hidden relative">
      <header className="fixed top-0 left-0 z-30 w-full p-6 sm:p-8 flex justify-between items-center">
        <div 
          className="text-md sm:text-lg font-bold tracking-wider cursor-pointer hover:opacity-75 transition-opacity"
          onClick={onBack}
          aria-label="Volver a la constelación"
        >
          ARQUITECTURA BENITO
        </div>
        <div className="flex items-center space-x-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => scrollToSlide(index)}
              aria-label={`Ir al proyecto ${slide.title}`}
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${activeIndex === index ? 'bg-white border-white scale-125' : 'bg-transparent border-gray-500 hover:border-white'}`}
            />
          ))}
        </div>
      </header>
      
      <button 
        onClick={handlePrev} 
        aria-label="Proyecto anterior"
        className={`fixed top-1/2 -translate-y-1/2 left-4 z-30 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center transition-opacity duration-300 hover:bg-black/50 disabled:opacity-0`}
        disabled={activeIndex === 0}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>

      <button 
        onClick={handleNext} 
        aria-label="Siguiente proyecto"
        className={`fixed top-1/2 -translate-y-1/2 right-4 z-30 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center transition-opacity duration-300 hover:bg-black/50 disabled:opacity-0`}
        disabled={activeIndex === slides.length - 1}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>

      <main ref={mainContainerRef} className="w-full h-full flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory">
        {slides.map((slide, index) => {
          const isProject = slide.type === 'project';
          const Wrapper = isProject ? 'a' : 'section';
          const props: any = {
            key: slide.id,
            ref: (el: HTMLElement) => { slideRefs.current[index] = el; },
            className: `w-full h-full flex-shrink-0 snap-center relative flex items-center justify-center bg-cover bg-center group ${isProject ? 'cursor-pointer' : ''}`,
            style: { backgroundImage: `url('${isProject ? slide.normalImage : slide.image}')` }
          };
          if(isProject) {
            props.href = `/projects/${slide.id}.html`;
          }

          return (
            <Wrapper {...props}>
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-500"></div>
              
              <div className="relative z-10 text-center text-white p-4 transform group-hover:scale-105 transition-transform duration-500">
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-wider uppercase" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {slide.title}
                </h2>
                {isProject && (
                  <p className="mt-4 text-sm uppercase tracking-widest border-b border-white pb-1 inline-block">
                    Ver Proyecto
                  </p>
                )}
              </div>
              
              <div className="absolute bottom-8 right-8 z-10 text-white font-mono text-sm">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <span className="mx-2">/</span>
                  <span>{String(slides.length).padStart(2, '0')}</span>
              </div>
            </Wrapper>
          );
        })}
      </main>
      
      <footer className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-500 z-10">
          © 2024 Benito G. Quiñones
      </footer>

    </div>
  );
};

export default ArchitecturePage;