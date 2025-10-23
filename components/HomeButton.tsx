import React from 'react';

interface HomeButtonProps {
    onClick: () => void;
}

const HomeButton: React.FC<HomeButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="fixed top-4 right-4 z-50 w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center
                       text-white backdrop-blur-sm border border-gray-700 transition-all duration-300
                       hover:bg-opacity-75 hover:border-gray-500 hover:scale-110"
            aria-label="Volver al inicio"
        >
            <svg width="24" height="24" viewBox="-50 -50 100 100">
                <g opacity="0.6">
                    <path d="M 0 -40 C 20 -20, 20 20, 0 40 C -20 20, -20 -20, 0 -40 Z" fill="white" transform="rotate(45)"/>
                    <path d="M 0 -40 C 20 -20, 20 20, 0 40 C -20 20, -20 -20, 0 -40 Z" fill="white" transform="rotate(-45)"/>
                </g>
                <g>
                    <circle cx="0" cy="0" r="10" fill="white" />
                </g>
            </svg>
        </button>
    );
};

export default HomeButton;