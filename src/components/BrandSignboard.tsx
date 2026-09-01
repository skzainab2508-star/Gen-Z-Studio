import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { ProductCategory } from '../types';
import { playLuxuryClick } from '../utils/audio';

interface BrandSignboardProps {
  onSelectCategory?: (category: ProductCategory) => void;
}

export const BrandSignboard: React.FC<BrandSignboardProps> = ({ onSelectCategory }) => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlightPos({ x, y });
  };

  const handleCategoryClick = (cat: ProductCategory) => {
    playLuxuryClick();
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
  };

  return (
    <div 
      className="relative w-full max-w-5xl mx-auto my-8 p-1.5 sm:p-2.5 rounded-3xl bg-gradient-to-b from-[#2A2314] via-[#1A160F] to-[#120F0B] shadow-[0_20px_50px_rgba(28,24,20,0.18),0_0_30px_rgba(184,142,56,0.2)] border-2 border-[#B88E38]/60 group overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Outer Luxury Metallic Bevel Border */}
      <div className="relative rounded-2xl bg-[#0F0D09] p-4 sm:p-8 md:p-10 border border-[#DFBE6F]/30 overflow-hidden">
        
        {/* Spotlight overhead lighting fixture simulation */}
        <div className="absolute -top-1 left-0 right-0 flex justify-around px-8 pointer-events-none z-20">
          <div className="w-12 h-3 bg-gradient-to-b from-[#FFF2A3] via-[#D4AF37] to-transparent rounded-b-full blur-[1px] shadow-[0_10px_25px_#FFE57F]" />
          <div className="w-16 h-3.5 bg-gradient-to-b from-[#FFF2A3] via-[#D4AF37] to-transparent rounded-b-full blur-[1px] shadow-[0_10px_35px_#FFE57F]" />
          <div className="w-12 h-3 bg-gradient-to-b from-[#FFF2A3] via-[#D4AF37] to-transparent rounded-b-full blur-[1px] shadow-[0_10px_25px_#FFE57F]" />
        </div>

        {/* Dynamic Light Sheen across billboard */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 450px at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(255,229,127,0.3) 0%, rgba(212,175,55,0.1) 40%, transparent 80%)`
          }}
        />

        {/* Subtle Luxury Diamond Grid / Gloss Backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_0.6px,transparent_0.6px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        {/* Inner Gold Frame Border */}
        <div className="relative border-2 border-[#D4AF37]/70 rounded-xl p-5 sm:p-8 flex flex-col items-center justify-center text-center shadow-[inset_0_0_40px_rgba(0,0,0,0.8),inset_0_0_15px_rgba(212,175,55,0.3)]">
          
          {/* Top subtle shine badge */}
          <div className="flex items-center gap-2 mb-2 px-3 py-0.5 rounded-full bg-[#18150C] border border-[#D4AF37]/40 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-[#FFE259] animate-pulse" />
            <span className="text-[10px] sm:text-xs font-montserrat uppercase tracking-[0.25em] text-[#E6C86E] font-medium">
              Official Luxury Atelier Mark &bull; Mumbai
            </span>
          </div>

          {/* MAIN 3D EMBOSSED "Gen'Z" WORDMARK */}
          <div className="relative my-2 sm:my-4 select-none">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Backing Depth Shadow for 3D extrusion */}
              <h1 
                className="font-script text-6xl sm:text-8xl md:text-9xl lg:text-[118px] text-[#4A380E] absolute top-1 sm:top-2 left-1/2 -translate-x-1/2 blur-[2px] opacity-90 pointer-events-none whitespace-nowrap"
                style={{ textShadow: '0 8px 24px rgba(0,0,0,0.95)' }}
              >
                Gen'Z
              </h1>
              {/* Front Metallic 3D Script */}
              <h1 
                className="relative font-script text-6xl sm:text-8xl md:text-9xl lg:text-[118px] text-gold-gradient tracking-tight px-4 cursor-default whitespace-nowrap"
                style={{
                  filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.8)) drop-shadow(0 0 25px rgba(212,175,55,0.4))'
                }}
              >
                Gen'Z
              </h1>
            </motion.div>

            {/* STUDIO with gold wing lines */}
            <div className="flex items-center justify-center gap-3 sm:gap-6 mt-[-10px] sm:mt-[-16px]">
              <div className="h-[2px] w-8 sm:w-16 md:w-24 bg-gradient-to-r from-transparent via-[#E5C158] to-[#FFE57F]" />
              <h2 
                className="font-cinzel text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[0.35em] sm:tracking-[0.45em] text-gold-gradient uppercase drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)] pl-2 sm:pl-3"
              >
                STUDIO
              </h2>
              <div className="h-[2px] w-8 sm:w-16 md:w-24 bg-gradient-to-l from-transparent via-[#E5C158] to-[#FFE57F]" />
            </div>
          </div>

          {/* Subtitle / Tagline Divider */}
          <div className="w-full max-w-2xl my-4 sm:my-6 relative">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />
            <p className="mt-2.5 sm:mt-3 font-cinzel text-[11px] sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[#F3E5AB] font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              Men's Fashion &nbsp;|&nbsp; Footwear &nbsp;|&nbsp; Accessories
            </p>
            <div className="h-[1px] w-full mt-2.5 sm:mt-3 bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />
          </div>

          {/* THE 4 GOLDEN ICON TILES */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl mt-2 sm:mt-4 pt-2">
            
            {/* Tile 1: Footwear / Sneaker */}
            <button
              onClick={() => handleCategoryClick('footwear')}
              onMouseEnter={() => setHoveredIcon('footwear')}
              onMouseLeave={() => setHoveredIcon(null)}
              className="relative group/btn flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-gradient-to-b from-[#1C180E] to-[#120F09] border border-[#D4AF37]/40 hover:border-[#FFE259] transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.35)] hover:-translate-y-0.5 text-left cursor-pointer"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-2">
                <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] filter transition-transform group-hover/btn:scale-110 duration-300">
                  <defs>
                    <linearGradient id="goldShoeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFF2A3" />
                      <stop offset="35%" stopColor="#E5C158" />
                      <stop offset="70%" stopColor="#A87F1C" />
                      <stop offset="100%" stopColor="#FFE066" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M6 42 C 6 42, 8 36, 14 36 C 20 36, 22 38, 25 35 C 28 32, 30 26, 34 24 C 38 22, 44 26, 46 29 C 48 32, 53 35, 57 38 C 59 40, 58 46, 56 48 L 8 48 C 6 48, 6 44, 6 42 Z" 
                    fill="url(#goldShoeGrad)" 
                    stroke="#FFE57F" 
                    strokeWidth="1.2"
                  />
                  <path 
                    d="M6 47 L 57 47 C 59 47, 59 52, 56 53 L 9 53 C 6 53, 5 49, 6 47 Z" 
                    fill="url(#goldShoeGrad)" 
                    opacity="0.9"
                    stroke="#664D0A"
                    strokeWidth="1"
                  />
                  <line x1="32" y1="28" x2="36" y2="34" stroke="#4A380E" strokeWidth="1.5" />
                  <line x1="28" y1="31" x2="32" y2="37" stroke="#4A380E" strokeWidth="1.5" />
                  <line x1="24" y1="34" x2="28" y2="40" stroke="#4A380E" strokeWidth="1.5" />
                  <circle cx="50" cy="42" r="3" fill="#FFF2A3" opacity="0.6" />
                </svg>
              </div>
              <span className="font-cinzel text-xs sm:text-sm font-bold text-[#E5C158] uppercase tracking-wider group-hover/btn:text-[#FFF2A3]">
                Footwear
              </span>
              <span className="text-[10px] text-[#A69B80] tracking-normal font-sans">
                Sneakers & Loafers
              </span>
            </button>

            {/* Tile 2: Polo / Apparel */}
            <button
              onClick={() => handleCategoryClick('apparel')}
              onMouseEnter={() => setHoveredIcon('apparel')}
              onMouseLeave={() => setHoveredIcon(null)}
              className="relative group/btn flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-gradient-to-b from-[#1C180E] to-[#120F09] border border-[#D4AF37]/40 hover:border-[#FFE259] transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.35)] hover:-translate-y-0.5 text-left cursor-pointer"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-2">
                <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] filter transition-transform group-hover/btn:scale-110 duration-300">
                  <defs>
                    <linearGradient id="goldPoloGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFF2A3" />
                      <stop offset="35%" stopColor="#E5C158" />
                      <stop offset="70%" stopColor="#A87F1C" />
                      <stop offset="100%" stopColor="#FFE066" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M20 18 L 12 24 L 8 20 L 16 14 L 25 14 L 32 18 L 39 14 L 48 14 L 56 20 L 52 24 L 44 18 L 46 52 L 18 52 Z" 
                    fill="url(#goldPoloGrad)" 
                    stroke="#FFE57F" 
                    strokeWidth="1.2"
                  />
                  <path d="M26 14 L 32 24 L 38 14" fill="#3D2E0B" stroke="#FFE57F" strokeWidth="1" />
                  <line x1="32" y1="24" x2="32" y2="34" stroke="#4A380E" strokeWidth="1.5" />
                  <circle cx="32" cy="27" r="1.2" fill="#FFF2A3" />
                  <circle cx="32" cy="31" r="1.2" fill="#FFF2A3" />
                  <rect x="36" y="28" width="6" height="7" rx="1" fill="#3D2E0B" opacity="0.7" stroke="#FFE57F" strokeWidth="0.8" />
                </svg>
              </div>
              <span className="font-cinzel text-xs sm:text-sm font-bold text-[#E5C158] uppercase tracking-wider group-hover/btn:text-[#FFF2A3]">
                Apparel
              </span>
              <span className="text-[10px] text-[#A69B80] tracking-normal font-sans">
                Polos, Tees & Jackets
              </span>
            </button>

            {/* Tile 3: Caps & Headwear */}
            <button
              onClick={() => handleCategoryClick('caps')}
              onMouseEnter={() => setHoveredIcon('caps')}
              onMouseLeave={() => setHoveredIcon(null)}
              className="relative group/btn flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-gradient-to-b from-[#1C180E] to-[#120F09] border border-[#D4AF37]/40 hover:border-[#FFE259] transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.35)] hover:-translate-y-0.5 text-left cursor-pointer"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-2">
                <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] filter transition-transform group-hover/btn:scale-110 duration-300">
                  <defs>
                    <linearGradient id="goldCapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFF2A3" />
                      <stop offset="35%" stopColor="#E5C158" />
                      <stop offset="70%" stopColor="#A87F1C" />
                      <stop offset="100%" stopColor="#FFE066" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M18 38 C 18 22, 46 22, 48 38 Z" 
                    fill="url(#goldCapGrad)" 
                    stroke="#FFE57F" 
                    strokeWidth="1.2"
                  />
                  <path 
                    d="M14 38 C 14 38, 22 43, 38 43 C 48 43, 54 38, 54 38 C 54 41, 46 47, 34 47 C 20 47, 14 40, 14 38 Z" 
                    fill="url(#goldCapGrad)" 
                    stroke="#FFE57F" 
                    strokeWidth="1.2"
                  />
                  <circle cx="33" cy="23" r="2.5" fill="#FFE57F" stroke="#4A380E" strokeWidth="0.8" />
                  <path d="M33 24 C 33 28, 32 34, 32 38" stroke="#4A380E" strokeWidth="1" />
                </svg>
              </div>
              <span className="font-cinzel text-xs sm:text-sm font-bold text-[#E5C158] uppercase tracking-wider group-hover/btn:text-[#FFF2A3]">
                Caps
              </span>
              <span className="text-[10px] text-[#A69B80] tracking-normal font-sans">
                Snapbacks & Suede
              </span>
            </button>

            {/* Tile 4: Watches & Jewelry */}
            <button
              onClick={() => handleCategoryClick('watches')}
              onMouseEnter={() => setHoveredIcon('watches')}
              onMouseLeave={() => setHoveredIcon(null)}
              className="relative group/btn flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-gradient-to-b from-[#1C180E] to-[#120F09] border border-[#D4AF37]/40 hover:border-[#FFE259] transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.35)] hover:-translate-y-0.5 text-left cursor-pointer"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-2">
                <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] filter transition-transform group-hover/btn:scale-110 duration-300">
                  <defs>
                    <linearGradient id="goldWatchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFF2A3" />
                      <stop offset="35%" stopColor="#E5C158" />
                      <stop offset="70%" stopColor="#A87F1C" />
                      <stop offset="100%" stopColor="#FFE066" />
                    </linearGradient>
                  </defs>
                  <rect x="25" y="8" width="14" height="12" rx="2" fill="url(#goldWatchGrad)" stroke="#FFE57F" strokeWidth="0.8" />
                  <rect x="25" y="44" width="14" height="12" rx="2" fill="url(#goldWatchGrad)" stroke="#FFE57F" strokeWidth="0.8" />
                  <circle cx="32" cy="32" r="16" fill="url(#goldWatchGrad)" stroke="#FFE57F" strokeWidth="1.5" />
                  <circle cx="32" cy="32" r="11" fill="#12100A" stroke="#E5C158" strokeWidth="1" />
                  <rect x="48" y="30" width="3" height="4" rx="1" fill="#FFE57F" />
                  <line x1="32" y1="32" x2="32" y2="25" stroke="#FFE57F" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="32" y1="32" x2="37" y2="34" stroke="#FFE57F" strokeWidth="1.2" strokeLinecap="round" />
                  <circle cx="32" cy="32" r="1.5" fill="#FFE57F" />
                </svg>
              </div>
              <span className="font-cinzel text-xs sm:text-sm font-bold text-[#E5C158] uppercase tracking-wider group-hover/btn:text-[#FFF2A3]">
                Watches
              </span>
              <span className="text-[10px] text-[#A69B80] tracking-normal font-sans">
                Timepieces & Jewelry
              </span>
            </button>
          </div>

          {/* Quick CTA underneath */}
          <div className="mt-5 flex items-center justify-center">
            <button
              onClick={() => handleCategoryClick('all')}
              className="inline-flex items-center gap-2 text-xs uppercase font-cinzel tracking-widest text-[#E5C158] hover:text-[#FFF2A3] transition-colors py-1 px-3 group/link cursor-pointer"
            >
              <span>Explore All Studio Collections</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

