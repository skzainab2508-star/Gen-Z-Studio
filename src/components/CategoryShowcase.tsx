import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { ProductCategory } from '../types';
import { playLuxuryClick } from '../utils/audio';

interface CategoryShowcaseProps {
  onSelectCategory: (category: ProductCategory) => void;
  activeCategory: ProductCategory;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  onSelectCategory,
  activeCategory,
}) => {
  return (
    <section id="categories-section" className="py-16 sm:py-24 bg-[#FAF7F2] relative px-4 sm:px-6 lg:px-8 border-t border-[#EAE3D3]">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EB] border border-[#E0D8C7] text-[#8A641A] text-[11px] font-montserrat tracking-[0.25em] uppercase mb-3 font-bold">
            <Sparkles className="w-3 h-3 text-[#8A641A]" />
            <span>Curated Collections</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1814] tracking-wide uppercase">
            Four Pillars Of Distinction
          </h2>
          
          <p className="mt-3 font-sans text-sm sm:text-base text-[#5C5348] max-w-xl mx-auto leading-relaxed">
            Inspired by the iconic golden emblems of Gen'Z Studio. Select a category to explore limited drops engineered with meticulous attention to detail.
          </p>
        </div>

        {/* 4 CATEGORY SHOWCASE TILES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {CATEGORIES.map((cat, idx) => {
            const isSelected = activeCategory === cat.id;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => {
                  playLuxuryClick();
                  onSelectCategory(cat.id);
                }}
                className={`group relative h-[420px] rounded-3xl overflow-hidden cursor-pointer border transition-all duration-500 flex flex-col justify-end p-6 ${
                  isSelected 
                    ? 'border-[#B88E38] shadow-[0_15px_35px_rgba(184,142,56,0.25)] ring-2 ring-[#B88E38]' 
                    : 'border-[#E0D8C7] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:border-[#B88E38] hover:shadow-[0_20px_45px_rgba(0,0,0,0.12)]'
                }`}
              >
                {/* Background Image with Vignette */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-110 filter brightness-[0.9] group-hover:brightness-[0.95]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                </div>

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#E0D8C7] text-[#8A641A] text-[10px] font-cinzel font-bold tracking-widest uppercase shadow-sm">
                    {cat.badge}
                  </span>
                </div>

                {/* Top Right Arrow Indicator */}
                <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md border border-[#E0D8C7] flex items-center justify-center text-[#1C1814] group-hover:bg-[#8A641A] group-hover:text-white transition-all duration-300 transform group-hover:rotate-45 shadow-sm">
                  <ArrowUpRight className="w-4 h-4" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10">
                  <div className="text-[11px] font-montserrat uppercase tracking-[0.2em] text-[#D4AF37] mb-1 font-semibold">
                    {cat.itemCount} Exclusive Items
                  </div>

                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white group-hover:text-[#FFE259] transition-colors duration-300 uppercase tracking-wide">
                    {cat.name}
                  </h3>

                  <p className="mt-2 text-xs text-[#E0D8C7] line-clamp-2 leading-relaxed opacity-95 group-hover:opacity-100 transition-opacity">
                    {cat.subtitle}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-cinzel tracking-wider text-white">
                    <span className="group-hover:text-[#FFE259] transition-colors">Explore Category</span>
                    <span className="text-[10px] text-white/80 uppercase font-sans">
                      {isSelected ? 'Active Filter' : 'View Drop'}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
