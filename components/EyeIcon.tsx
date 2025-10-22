import React from 'react';

export const EyeIcon = () => {
  return (
    <svg width="200" height="200" viewBox="-100 -100 200 200">
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
        <path d="M 0 -80 C 40 -40, 40 40, 0 80 C -40 40, -40 -40, 0 -80 Z" fill="white" transform="rotate(45)" />
        <path d="M 0 -80 C 40 -40, 40 40, 0 80 C -40 40, -40 -40, 0 -80 Z" fill="white" transform="rotate(-45)" />
      </g>
      <g>
        <path d="M 0 -70 L 70 0 L 0 70 L -70 0 Z" fill="#333333" stroke="gray" strokeWidth="0.5" />
      </g>
      <g filter="url(#glow)">
        <circle cx="0" cy="0" r="45" fill="#555555" />
        <circle cx="0" cy="0" r="30" fill="#888888" />
        <circle cx="0" cy="0" r="15" fill="#CCCCCC" />
        <circle cx="0" cy="0" r="7" fill="white" />
      </g>
    </svg>
  );
};
