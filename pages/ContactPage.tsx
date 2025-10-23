import React from 'react';
import EyeIcon from '../components/EyeIcon';

interface ContactPageProps {
  onBack: () => void;
}

const CVSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-8">
    <h3 className="text-xl font-bold uppercase tracking-widest text-white border-b border-gray-700 pb-2 mb-4">{title}</h3>
    <div className="text-gray-400">{children}</div>
  </div>
);

const CVEntry: React.FC<{ title: string; period: string; place: string }> = ({ title, period, place }) => (
  <div className="mb-3">
    <p className="font-bold text-gray-200">{title}</p>
    <p className="text-sm">{period}</p>
    <p className="text-sm text-gray-500">{place}</p>
  </div>
);

const PublicationEntry: React.FC<{ title: string; details: string }> = ({ title, details }) => (
  <div className="mb-3">
    <p className="font-bold text-gray-200">{title}</p>
    <p className="text-sm text-gray-500">{details}</p>
  </div>
);

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  return (
    <div className="w-full min-h-screen bg-black text-gray-300 animate-fade-in flex flex-col items-center justify-center p-4 relative overflow-auto">
      
      <div className="absolute top-0 left-0 right-0 bottom-0 z-0 flex items-center justify-center opacity-5 pointer-events-none">
        <div className="scale-[2.5] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <EyeIcon />
        </div>
      </div>

      <button
        onClick={onBack}
        className="absolute top-6 left-6 text-sm uppercase tracking-widest text-gray-400 hover:text-white transition-colors duration-300 z-20"
      >
        &larr; Volver a Constelación
      </button>

      <div className="w-full max-w-4xl mx-auto z-10 relative mt-24 mb-12 px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-wider uppercase text-white mb-6">
            CONTACTO
          </h1>
          <p className="text-base md:text-lg text-gray-400 mb-10 max-w-xl mx-auto">
            Para colaboraciones, consultas sobre proyectos o cualquier otra pregunta, por favor, póngase en contacto a través del siguiente correo electrónico.
          </p>
          <a 
              href="mailto:arquitectuabenito@gmail.com" 
              className="inline-block text-base md:text-lg font-bold text-white border-2 border-white px-8 py-3 tracking-widest uppercase transition-colors duration-300 hover:bg-white hover:text-black"
          >
              arquitectuabenito@gmail.com
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12">
          <div>
            <CVSection title="Experiencia">
              <CVEntry title="Becario de profesor de Hª de la arquitectura y el urbanismo" period="Septiembre 2024 - Diciembre 2024" place="ETSAMadrid (3er curso)" />
              <CVEntry title="Becario de profesor de Hª del arte y la arquitectura" period="Enero 2024 - Mayo 2024" place="ETSAMadrid (1er curso)" />
              <CVEntry title="Contrato en estudio Chapnik Giessen" period="Julio 2023 - Septiembre 2023" place="Madrid (Dep. Renders)" />
              <CVEntry title="Prácticas de reportaje arquitectónico para CAPA" period="Enero 2022" place="Madrid" />
              <CVEntry title="Prácticas de reportaje para Cosentino" period="Agosto 2021" place="Madrid" />
              <CVEntry title="Gestión de un voluntariado para la limpieza de playas" period="2019 y 2020" place="Mar Menor, Murcia" />
            </CVSection>
            
            <CVSection title="Logros">
                <CVEntry title="Meta XR Lab, fundador y presidente" period="2021 - Actualmente" place="" />
                <CVEntry title="1er premio en el concurso de fotografía: moda y arquitectura" period="2021" place="CEMEX" />
            </CVSection>

             <CVSection title="Formación y Cursos">
                <CVEntry title="IV Congreso de la AHAU - Ciudad y naturaleza" period="25 y 26 Octubre 2024" place="Monasterio de El Escorial, Madrid" />
                <CVEntry title="Ciclo formativo Artificial Architectures(AA)" period="13, 14 y 15 Noviembre 2024" place="ETSAM, UPM" />
                 <CVEntry title="Seminario - Workshop BIP Erasmus+ FoodCity" period="Enero 2024 - Febrero 2024" place="Prato/Florence" />
                 <CVEntry title="SIHMA I - Seminario de Investigación" period="Septiembre 2023 - Febrero 2024" place="UPM" />
                 <CVEntry title="V Seminarios de Accesibilidad" period="17 Noviembre 2023" place="" />
                 <CVEntry title="Curso de Rhinoceros 7" period="ETSAM 2021" place="" />
            </CVSection>
          </div>
          <div>
            <CVSection title="Publicaciones">
              <PublicationEntry title="Maquetas de luz: «Light painting» arquitectónico" details="(2025), Madrid" />
              <PublicationEntry title="El monasterio de El Escorial: una historia medioambiental" details="(2024), Madrid, con Eduardo Prieto" />
              <PublicationEntry title="V de Vigueta n°11" details="(2023) Artículo ilustrado" />
              <PublicationEntry title="Estableciendo “puentes” entre la Universidad y el tejido social madrileño" details="(2023), ETSAM, UPM, Madrid" />
            </CVSection>
          </div>
        </div>
      </div>
      
      <footer className="relative text-xs text-gray-500 z-10 text-center py-4">
          © 2024 Benito G. Quiñones
      </footer>
    </div>
  );
};

export default ContactPage;
