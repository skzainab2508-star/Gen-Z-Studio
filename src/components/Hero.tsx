import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, ArrowDown, Sparkles, MessageCircle, ShieldCheck, Zap, Award, Truck } from 'lucide-react';
import { BrandSignboard } from './BrandSignboard';
import { ProductCategory } from '../types';
import { STORE_INFO } from '../data/products';
import { playLuxuryClick, playSoftWoosh } from '../utils/audio';

interface HeroProps {
  onSelectCategory: (category: ProductCategory) => void;
  onShopNow: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectCategory, onShopNow }) => {
  const scrollToProducts = () => {
    playLuxuryClick();
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCategories = () => {
    playLuxuryClick();
    const el = document.getElementById('categories-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center items-center overflow-hidden bg-[#FAF7F2] pt-6 pb-16 px-4 sm:px-6">
      
      {/* Background Ambience: Soft Warm Glows & Subtle Texture */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Centered Warm Champagne Spotlight */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-radial from-[#B88E38]/12 via-[#E8DCC4]/30 to-transparent blur-[90px]" />
        
        {/* Ambient Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* Upper Pill Badge - Soft Ivory & Gold */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E0D8C7] text-[#8A641A] text-xs font-montserrat tracking-[0.2em] uppercase shadow-sm mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#B88E38]" />
          <span>AUTUMN / WINTER 2026 DROP NOW LIVE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#B88E38] animate-ping" />
        </motion.div>

        {/* Dynamic Tagline Statement */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-cinzel text-xs sm:text-sm tracking-[0.35em] text-[#6B6258] uppercase mb-4 max-w-xl font-medium"
        >
          Luxury Streetwear &bull; Premium Accents &bull; Mumbai Studio
        </motion.p>

        {/* INTERACTIVE 3D METALLIC BILLBOARD SIGNBOARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full"
        >
          <BrandSignboard onSelectCategory={onSelectCategory} />
        </motion.div>

        {/* ACTION BUTTONS & CTAS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md px-4"
        >
          {/* Main "Shop Now" Button */}
          <button
            onClick={() => {
              playLuxuryClick();
              if (onShopNow) onShopNow();
              else scrollToProducts();
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gold-btn text-white font-cinzel font-bold text-sm tracking-[0.18em] uppercase shadow-[0_6px_25px_rgba(184,142,56,0.35)] hover:scale-105 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-white" />
            <span>Shop The Drops</span>
          </button>

          {/* Quick WhatsApp Concierge Button */}
          <a
            href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=Hello%20Gen%27Z%20Studio,%20I%27d%20like%20to%20view%20your%20latest%20collection%20and%20place%20an%20order.`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playLuxuryClick()}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#FFFFFF] border border-[#E0D8C7] text-[#1C1814] hover:text-[#8A641A] hover:border-[#B88E38] font-cinzel text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-sm"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>Order on WhatsApp</span>
          </a>
        </motion.div>

        {/* Value Propositions / Trust Badges - Highlighting Express Delivery In India Only */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl pt-8 border-t border-[#E5DEC9]"
        >
          <div className="flex items-center gap-3 justify-center sm:justify-start p-3 rounded-2xl bg-[#FFFFFF] border border-[#EAE3D3] shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-[#FAF5EB] border border-[#E0D8C7] flex items-center justify-center shrink-0">
              <Award className="w-4 h-4 text-[#8A641A]" />
            </div>
            <div className="text-left">
              <p className="font-cinzel text-xs text-[#1C1814] font-bold uppercase">100% Authentic</p>
              <p className="text-[11px] text-[#7A7064]">Premium studio quality</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start p-3 rounded-2xl bg-[#FFFFFF] border border-[#EAE3D3] shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-[#EBF5EE] border border-[#1B6A3E]/30 flex items-center justify-center shrink-0">
              <Truck className="w-4 h-4 text-[#1B6A3E]" />
            </div>
            <div className="text-left">
              <p className="font-cinzel text-xs text-[#1B6A3E] font-bold uppercase">India Express Only</p>
              <p className="text-[11px] text-[#7A7064]">24-48h Blue Dart Air</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start p-3 rounded-2xl bg-[#FFFFFF] border border-[#EAE3D3] shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-[#FAF5EB] border border-[#E0D8C7] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-[#8A641A]" />
            </div>
            <div className="text-left">
              <p className="font-cinzel text-xs text-[#1C1814] font-bold uppercase">Premium Gold Accents</p>
              <p className="text-[11px] text-[#7A7064]">Long-lasting metallic shine</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start p-3 rounded-2xl bg-[#FFFFFF] border border-[#EAE3D3] shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-[#FAF5EB] border border-[#E0D8C7] flex items-center justify-center shrink-0">
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
            </div>
            <div className="text-left">
              <p className="font-cinzel text-xs text-[#1C1814] font-bold uppercase">Mumbai Concierge</p>
              <p className="text-[11px] text-[#7A7064]">Instant WhatsApp desk</p>
            </div>
          </div>
        </motion.div>

        {/* Scroll Down Indicator */}
        <button
          onClick={scrollToCategories}
          className="mt-10 p-2 text-[#7A7064] hover:text-[#8A641A] transition-colors animate-bounce cursor-pointer"
          aria-label="Scroll to collection categories"
        >
          <ArrowDown className="w-5 h-5" />
        </button>

      </div>
    </section>
  );
};
