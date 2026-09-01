import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Shield, Award, Gem, Compass } from 'lucide-react';
import { BRAND_STORY } from '../data/products';

export const BrandStory: React.FC = () => {
  return (
    <section id="about-section" className="py-20 sm:py-28 bg-[#FAF7F2] relative px-4 sm:px-6 lg:px-8 border-t border-[#EAE3D3]">
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#E0D8C7] shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80"
                alt="Gen'Z Studio Atelier Craftsmanship"
                className="w-full h-[450px] sm:h-[520px] object-cover object-center filter brightness-[0.95]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
              
              {/* Overlay Glass Card */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-[#E0D8C7] text-center shadow-lg">
                <p className="font-script text-3xl text-[#8A641A]">Gen'Z Studio</p>
                <p className="font-cinzel text-[10px] sm:text-xs text-[#1C1814] uppercase tracking-[0.25em] mt-1 font-bold">
                  Est. 2026 &bull; Mumbai Design Studio
                </p>
              </div>
            </div>

            {/* Floating Gold Quality Seal */}
            <div className="absolute -top-6 -right-4 sm:-right-6 w-24 h-24 rounded-full bg-gradient-to-tr from-[#B88E38] via-[#D4AF37] to-[#F3E5AB] p-0.5 shadow-[0_6px_20px_rgba(184,142,56,0.3)]">
              <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center text-center p-2">
                <Sparkles className="w-4 h-4 text-[#8A641A] mb-0.5" />
                <span className="font-cinzel text-[8px] uppercase tracking-widest text-[#8A641A] font-bold">Gold Touch</span>
                <span className="text-[7px] text-[#7A7064] uppercase font-semibold">Guaranteed</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Brand Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EB] border border-[#E0D8C7] text-[#8A641A] text-[11px] font-montserrat tracking-[0.25em] uppercase mb-4 w-fit font-bold">
              <Sparkles className="w-3 h-3 text-[#8A641A]" />
              <span>Our Brand Story</span>
            </div>

            <h2 className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-bold text-[#1C1814] tracking-wide uppercase leading-tight">
              {BRAND_STORY.headline}
            </h2>

            <p className="mt-4 font-cinzel text-sm sm:text-base text-[#8A641A] tracking-wider font-bold">
              {BRAND_STORY.subhead}
            </p>

            <div className="mt-6 space-y-4 text-xs sm:text-sm text-[#5C5348] leading-relaxed">
              {BRAND_STORY.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Key Stats Matrix */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-[#E0D8C7]">
              {BRAND_STORY.stats.map((stat, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-white border border-[#E0D8C7] text-center shadow-xs">
                  <p className="font-cinzel text-xl sm:text-2xl font-bold text-[#8A641A]">
                    {stat.value}
                  </p>
                  <p className="text-[10px] text-[#7A7064] font-montserrat uppercase tracking-wider mt-1 font-semibold">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Brand Core Pillars */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-[#E0D8C7] shadow-xs">
                <Gem className="w-5 h-5 text-[#8A641A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-cinzel text-xs font-bold text-[#1C1814] uppercase">Signature Gold Hardware</h4>
                  <p className="text-[11px] text-[#7A7064] mt-0.5">Durable metallic accents with rich shine</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-[#E0D8C7] shadow-xs">
                <Shield className="w-5 h-5 text-[#8A641A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-cinzel text-xs font-bold text-[#1C1814] uppercase">Heavy Cotton Fabrics</h4>
                  <p className="text-[11px] text-[#7A7064] mt-0.5">Super soft & thick premium cotton</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-[#E0D8C7] shadow-xs">
                <Compass className="w-5 h-5 text-[#8A641A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-cinzel text-xs font-bold text-[#1C1814] uppercase">Limited Editions</h4>
                  <p className="text-[11px] text-[#7A7064] mt-0.5">Small batch drops to keep your style rare</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
