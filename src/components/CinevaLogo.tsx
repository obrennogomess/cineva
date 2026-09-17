import React from 'react';

interface CinevaLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showRing?: boolean;
  animated?: boolean;
  className?: string;
  withTagline?: boolean;
}

export const CinevaLogo: React.FC<CinevaLogoProps> = ({
  size = 'md',
  showRing = true,
  animated = true,
  className = '',
  withTagline = false,
}) => {
  // Dimensions
  const sizeMap = {
    sm: { box: 'w-10 h-10', ringWidth: 2, fontSize: 'text-xs', svgSize: 40 },
    md: { box: 'w-14 h-14', ringWidth: 2.5, fontSize: 'text-sm', svgSize: 56 },
    lg: { box: 'w-24 h-24', ringWidth: 3, fontSize: 'text-base', svgSize: 96 },
    xl: { box: 'w-36 h-36', ringWidth: 3.5, fontSize: 'text-xl', svgSize: 144 },
    hero: { box: 'w-48 h-48 md:w-56 md:h-56', ringWidth: 4, fontSize: 'text-2xl', svgSize: 220 },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex flex-col items-center justify-center select-none ${className}`}>
      <div className={`relative ${currentSize.box} flex items-center justify-center`}>
        {/* Ambient Red Glow Behind */}
        <div
          className={`absolute inset-0 rounded-full bg-red-600/30 blur-xl pointer-events-none ${
            animated ? 'animate-pulse' : ''
          }`}
          style={{ animationDuration: '3s' }}
        />

        {/* SVG Graphic with Ring and 3D Styled Cineva Typography */}
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full relative z-10 drop-shadow-[0_0_20px_rgba(255,20,45,0.75)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Neon Glow Filters */}
            <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Red Metallic Linear Gradient for 3D Cineva text */}
            <linearGradient id="redMetallicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff4d5a" />
              <stop offset="35%" stopColor="#e50914" />
              <stop offset="70%" stopColor="#99000a" />
              <stop offset="100%" stopColor="#400004" />
            </linearGradient>

            {/* Gloss Highlight */}
            <linearGradient id="glossHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#ffffff" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.5" />
            </linearGradient>

            {/* Neon Ring Gradient */}
            <radialGradient id="ringGlow" cx="50%" cy="50%" r="50%">
              <stop offset="85%" stopColor="#ff112b" />
              <stop offset="97%" stopColor="#ff475b" />
              <stop offset="100%" stopColor="#ff112b" />
            </radialGradient>
          </defs>

          {/* Background disc for pure contrast */}
          <circle cx="100" cy="100" r="96" fill="#040406" />

          {/* Outer Neon Red Ring */}
          {showRing && (
            <>
              {/* Outer soft halo ring */}
              <circle
                cx="100"
                cy="100"
                r="88"
                stroke="#ff1e38"
                strokeWidth="1.5"
                strokeOpacity="0.4"
                className="blur-[2px]"
              />
              {/* Main crisp neon circle */}
              <circle
                cx="100"
                cy="100"
                r="88"
                stroke="url(#ringGlow)"
                strokeWidth={size === 'hero' ? '3.5' : '3'}
                filter="url(#neonGlow)"
              />
              {/* Inner crisp highlight ring */}
              <circle
                cx="100"
                cy="100"
                r="88"
                stroke="#ff8f9c"
                strokeWidth="1"
                strokeOpacity="0.75"
              />
            </>
          )}

          {/* Cineva 3D Typography Vector Artwork */}
          <g transform="translate(100, 100)">
            {/* 3D Drop Shadow layer */}
            <text
              x="0"
              y="11"
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="Outfit, 'Plus Jakarta Sans', sans-serif"
              fontWeight="900"
              fontSize="41"
              letterSpacing="-0.04em"
              fill="#2a0004"
              opacity="0.9"
            >
              Cineva
            </text>

            {/* Base Metallic Red Text */}
            <text
              x="0"
              y="9"
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="Outfit, 'Plus Jakarta Sans', sans-serif"
              fontWeight="900"
              fontSize="41"
              letterSpacing="-0.04em"
              fill="url(#redMetallicGrad)"
              filter="drop-shadow(0 2px 5px rgba(0,0,0,0.9))"
            >
              Cineva
            </text>

            {/* Upper Gloss Edge Highlight */}
            <text
              x="0"
              y="9"
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="Outfit, 'Plus Jakarta Sans', sans-serif"
              fontWeight="900"
              fontSize="41"
              letterSpacing="-0.04em"
              fill="none"
              stroke="#ff9aa5"
              strokeWidth="0.75"
              strokeOpacity="0.85"
            >
              Cineva
            </text>

            {/* Stylized 3D Red Ribbon Arc on letter 'C' */}
            <path
              d="M -66 12 C -66 -4, -50 -15, -34 -12 C -30 -11, -29 -8, -32 -6 C -35 -4, -40 -3, -45 1 C -53 7, -51 22, -43 25 C -36 28, -32 23, -28 20 C -26 19, -25 21, -27 23 C -34 29, -47 31, -57 26 C -64 22, -66 17, -66 12 Z"
              fill="url(#redMetallicGrad)"
              opacity="0.95"
            />
            {/* Highlight on C curve */}
            <path
              d="M -64 9 C -64 -1, -51 -12, -36 -10"
              stroke="#ffc2c9"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
              opacity="0.9"
            />
          </g>
        </svg>
      </div>

      {withTagline && (
        <div className="mt-2 text-center">
          <span className="text-[11px] font-semibold tracking-widest text-red-500 uppercase">
            IPTV Streaming • Ativação 1 Real
          </span>
        </div>
      )}
    </div>
  );
};
