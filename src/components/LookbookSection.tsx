import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { LOOKBOOK } from '../data/products';
import { ProductCategory } from '../types';
import { playLuxuryClick, playSoftWoosh } from '../utils/audio';

interface LookbookSectionProps {
  onExploreCollection: (cat: ProductCategory) => void;
}

export const LookbookSection: React.FC<LookbookSectionProps> = ({ onExploreCollection }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    playSoftWoosh();
    setActiveSlide((prev) => (prev + 1) % LOOKBOOK.length);
  };

  const prevSlide = () => {
    playSoftWoosh();
    setActiveSlide((prev) => (prev - 1 + LOOKBOOK.length) % LOOKBOOK.length);
  };

  const current = LOOKBOOK[activeSlide];

  return (
    <section id="lookbook-section" className="py-20 sm:py-28 bg-[#F5EFE6] relative overflow-hidden px-4 sm:px-6 lg:px-8 border-t border-[#EAE3D3]">
      
      {/* Editorial Watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 font-cinzel text-[140px] md:text-[220px] font-black text-[#8A641A]/[0.03] select-none pointer-events-none uppercase whitespace-nowrap">
        EDITORIAL
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E0D8C7] text-[#8A641A] text-[11px] font-montserrat tracking-[0.25em] uppercase mb-2 font-bold shadow-xs">
              <Sparkles className="w-3 h-3 text-[#8A641A]" />
              <span>Editorial Campaign</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1814] tracking-wide uppercase">
              The Royal Gold Lookbook
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#5C5348] max-w-xl">
              High-contrast editorial styling capturing the spirit of Gen'Z Studio Mumbai — structured silhouettes punctuated by pure metallic radiance.
            </p>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-white border border-[#E0D8C7] text-[#1C1814] hover:bg-[#8A641A] hover:text-white transition-all cursor-pointer shadow-sm"
              aria-label="Previous lookbook slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-cinzel text-xs text-[#8A641A] font-bold tracking-widest px-2">
              0{activeSlide + 1} / 0{LOOKBOOK.length}
            </span>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-white border border-[#E0D8C7] text-[#1C1814] hover:bg-[#8A641A] hover:text-white transition-all cursor-pointer shadow-sm"
              aria-label="Next lookbook slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Big Editorial Feature Card */}
        <div className="relative rounded-3xl overflow-hidden border border-[#E0D8C7] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] min-h-[460px] sm:min-h-[540px] flex flex-col md:flex-row">
          
          {/* Image Canvas */}
          <div className="w-full md:w-3/5 relative h-72 sm:h-96 md:h-auto overflow-hidden">
            <motion.img
              key={current.id}
              initial={{ scale: 1.08, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover object-center filter brightness-[0.95]"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/50 via-transparent to-transparent" />
            
            {/* Stamp */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-[#E0D8C7] text-[#8A641A] font-cinzel text-xs font-bold uppercase tracking-widest shadow-md">
              {current.season}
            </div>
          </div>

          {/* Editorial Info Content */}
          <div className="w-full md:w-2/5 p-6 sm:p-10 flex flex-col justify-between bg-white">
            <div>
              <div className="flex items-center gap-2 text-[#8A641A] text-xs font-montserrat tracking-[0.2em] uppercase mb-2 font-bold">
                <span>Featured Atelier Look</span>
              </div>

              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#1C1814] uppercase tracking-wide">
                {current.title}
              </h3>

              <p className="mt-4 text-xs sm:text-sm text-[#5C5348] leading-relaxed">
                {current.tagline}
              </p>

              {/* Items in this look */}
              <div className="mt-8 pt-6 border-t border-[#F0EBE0]">
                <p className="font-cinzel text-xs text-[#8A641A] font-bold uppercase tracking-wider mb-3">
                  Pieces in this styling:
                </p>
                <div className="space-y-2">
                  {current.itemsFeatured.map((item, i) => (
                    <div 
                      key={i} 
                      className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7F2] border border-[#E0D8C7] text-xs text-[#1C1814]"
                    >
                      <span className="font-semibold text-[#1C1814]">{item}</span>
                      <span className="text-[10px] text-[#8A641A] font-bold uppercase font-cinzel tracking-wider">
                        Atelier Stock
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <button
                onClick={() => {
                  playLuxuryClick();
                  onExploreCollection('all');
                }}
                className="w-full py-3.5 px-6 rounded-2xl bg-gold-btn text-white font-cinzel text-xs font-bold uppercase tracking-[0.18em] shadow-[0_6px_20px_rgba(184,142,56,0.25)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Shop Lookbook Pieces</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
