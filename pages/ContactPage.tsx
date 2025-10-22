import React from 'react';
import EyeIcon from '../components/EyeIcon';

interface ContactPageProps {
  onBack: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  return (
    <div className="w-full h-screen bg-black text-gray-300 animate-fade-in flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div style={{position: 'fixed', top: 0, left: 0, background: 'green', color: 'white', padding: '10px', zIndex: 9999, fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px'}}>
        <span>TEST 3: CONTACT PAGE</span>
        <img src="/imagenes/curvas%20portada%201.png" alt="Test Image 3" style={{height: '40px', border: '1px solid white'}} />
      </div>
      
      {/* Background Eye Icon */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-5 pointer-events-none">
        <div className="scale-[2.5]">
            <EyeIcon />
        </div>
      </div>

      <button
        onClick={onBack}
        className="absolute top-6 left-6 text-sm uppercase tracking-widest text-gray-400 hover:text-white transition-colors duration-300 z-20"
      >
        &larr; Volver a Constelación
      </button>

      <div className="text-center z-10 relative">
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
      
      <footer className="absolute bottom-4 text-xs text-gray-500 z-10">
          © 2024 Benito G. Quiñones
      </footer>
    </div>
  );
};

export default ContactPage;