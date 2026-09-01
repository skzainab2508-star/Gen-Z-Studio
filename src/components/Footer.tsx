import React, { useState } from 'react';
import { 
  Instagram, 
  MessageCircle, 
  Mail, 
  Sparkles, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  MapPin, 
  Phone,
  QrCode
} from 'lucide-react';
import { STORE_INFO } from '../data/products';
import { ProductCategory } from '../types';
import { playLuxuryClick, playGoldClink } from '../utils/audio';

interface FooterProps {
  onSelectCategory: (category: ProductCategory) => void;
  onOpenInstagramModal: () => void;
  onOpenAuth?: (mode?: 'login' | 'register') => void;
  onOpenOrders?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenInstagramModal,
  onOpenAuth,
  onOpenOrders,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    playGoldClink();
    setSubscribed(true);
  };

  const scrollTo = (id: string) => {
    playLuxuryClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C1814] text-[#E0D8C7] border-t border-[#B88E38]/30 relative overflow-hidden">
      
      {/* Top Gold Foil Accent Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-80" />

      {/* VIP Club / Newsletter Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-b border-white/10">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#26211C] border border-[#B88E38]/40 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#352D26] border border-[#B88E38]/40 text-[#F3E5AB] text-[10px] font-montserrat uppercase tracking-[0.25em] mb-3 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Join The Atelier VIP Circle</span>
            </div>
            <h3 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold text-white uppercase">
              Unlock ₹2,000 Off Your First Drop
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#C4BAA9] leading-relaxed">
              Subscribe to the Gen'Z Studio private registry for secret capsule access in India, private fitting invitations, and editorial lookbooks.
            </p>
          </div>

          <div className="w-full lg:w-auto lg:min-w-[380px]">
            {subscribed ? (
              <div className="p-4 rounded-2xl bg-[#163820] border border-[#25D366]/40 text-center">
                <p className="font-cinzel text-sm font-bold text-[#4ADE80] uppercase flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" /> Welcome to the VIP Circle
                </p>
                <p className="text-[11px] text-[#C4BAA9] mt-1">
                  Use VIP coupon code <strong className="text-[#F3E5AB]">GENZGOLD</strong> for 15% off at checkout.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your VIP email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-3 rounded-full bg-[#1C1814] border border-[#B88E38]/50 text-xs text-white placeholder-[#8C8274] focus:outline-none focus:border-[#D4AF37] flex-grow font-sans"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-gold-btn text-white font-cinzel text-xs font-bold uppercase tracking-wider shadow-md hover:scale-105 transition-transform flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span>Join VIP Club</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links & Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col items-start select-none">
              <span className="font-script text-4xl text-[#F3E5AB]">Gen'Z</span>
              <span className="font-cinzel text-xs font-bold tracking-[0.35em] text-[#D4AF37] uppercase -mt-1">
                STUDIO
              </span>
            </div>

            <p className="text-xs text-[#A89E8F] leading-relaxed max-w-sm">
              Luxury Men's Fashion, Footwear, and Bespoke Accessories. Where contemporary streetwear culture meets Italian haute couture craftsmanship.
            </p>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playLuxuryClick()}
                className="w-9 h-9 rounded-full bg-[#26211C] border border-[#B88E38]/40 text-[#F3E5AB] hover:bg-[#8A641A] hover:text-white transition-all flex items-center justify-center"
                title="Instagram @genzstudio2026"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${STORE_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playLuxuryClick()}
                className="w-9 h-9 rounded-full bg-[#26211C] border border-[#25D366]/40 text-[#4ADE80] hover:bg-[#25D366] hover:text-white transition-all flex items-center justify-center"
                title="WhatsApp Concierge"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <button
                onClick={() => {
                  playLuxuryClick();
                  onOpenInstagramModal();
                }}
                className="px-3 py-1.5 rounded-full bg-[#26211C] border border-[#B88E38]/40 text-[#F3E5AB] hover:border-[#D4AF37] text-[11px] font-cinzel tracking-wider flex items-center gap-1.5 cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Instagram QR</span>
              </button>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="font-cinzel text-xs font-bold text-[#F3E5AB] uppercase tracking-[0.2em] mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-[#C4BAA9]">
              <li>
                <button
                  onClick={() => {
                    playLuxuryClick();
                    onSelectCategory('footwear');
                  }}
                  className="hover:text-[#F3E5AB] transition-colors cursor-pointer"
                >
                  Footwear & Sneakers
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    playLuxuryClick();
                    onSelectCategory('apparel');
                  }}
                  className="hover:text-[#F3E5AB] transition-colors cursor-pointer"
                >
                  Polos & Apparel
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    playLuxuryClick();
                    onSelectCategory('caps');
                  }}
                  className="hover:text-[#F3E5AB] transition-colors cursor-pointer"
                >
                  Caps & Headwear
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    playLuxuryClick();
                    onSelectCategory('watches');
                  }}
                  className="hover:text-[#F3E5AB] transition-colors cursor-pointer"
                >
                  Watches & Jewelry
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    playLuxuryClick();
                    onSelectCategory('all');
                  }}
                  className="hover:text-[#F3E5AB] transition-colors cursor-pointer"
                >
                  All Archive Drops
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Atelier Experience */}
          <div>
            <h4 className="font-cinzel text-xs font-bold text-[#F3E5AB] uppercase tracking-[0.2em] mb-4">
              The Brand
            </h4>
            <ul className="space-y-2.5 text-xs text-[#C4BAA9]">
              <li>
                <button onClick={() => scrollTo('about-section')} className="hover:text-[#F3E5AB] transition-colors cursor-pointer">
                  Mumbai Atelier Story
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('lookbook-section')} className="hover:text-[#F3E5AB] transition-colors cursor-pointer">
                  Editorial Lookbook
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('location-section')} className="hover:text-[#F3E5AB] transition-colors cursor-pointer">
                  Bandra Flagship Studio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    playLuxuryClick();
                    onOpenAuth?.('login');
                  }} 
                  className="hover:text-[#F3E5AB] transition-colors cursor-pointer text-left"
                >
                  Customer Sign In & Profile
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    playLuxuryClick();
                    onOpenAuth?.('register');
                  }} 
                  className="hover:text-[#F3E5AB] transition-colors cursor-pointer text-left"
                >
                  Register VIP Membership (₹2,000 Credit)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    playLuxuryClick();
                    onOpenOrders?.();
                  }} 
                  className="hover:text-[#F3E5AB] transition-colors cursor-pointer text-left"
                >
                  Order Tracking (Pan-India)
                </button>
              </li>
              <li>
                <a 
                  href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=VIP%20Appointment%20Request%20Mumbai%20Atelier`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={() => playLuxuryClick()}
                  className="hover:text-[#F3E5AB] transition-colors"
                >
                  Book Private Fitting (Mumbai)
                </a>
              </li>
              <li>
                <a 
                  href={STORE_INFO.instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={() => playLuxuryClick()}
                  className="hover:text-[#F3E5AB] transition-colors"
                >
                  Instagram @genzstudio2026
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Concierge */}
          <div>
            <h4 className="font-cinzel text-xs font-bold text-[#F3E5AB] uppercase tracking-[0.2em] mb-4">
              Concierge
            </h4>
            <div className="space-y-2.5 text-xs text-[#A89E8F]">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{STORE_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>{STORE_INFO.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>{STORE_INFO.email}</span>
              </p>
              <p className="flex items-center gap-2 text-[#4ADE80]">
                <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                <span>24/7 VIP WhatsApp Desk (India)</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Payment Badges & Copyright */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C8274]">
          <p>
            &copy; {new Date().getFullYear()} Gen'Z Studio. All Rights Reserved. Luxury Men's Fashion & Accessories. Serving All-India.
          </p>

          {/* Payment Guarantee Badges */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="px-2.5 py-1 rounded bg-[#26211C] border border-[#B88E38]/30 text-[10px] font-mono text-[#F3E5AB]">
              UPI / GPAY
            </span>
            <span className="px-2.5 py-1 rounded bg-[#26211C] border border-[#B88E38]/30 text-[10px] font-mono text-[#E0D8C7]">
              RUPAY
            </span>
            <span className="px-2.5 py-1 rounded bg-[#26211C] border border-[#B88E38]/30 text-[10px] font-mono text-[#E0D8C7]">
              VISA / MC
            </span>
            <span className="px-2.5 py-1 rounded bg-[#26211C] border border-[#25D366]/40 text-[10px] font-mono text-[#4ADE80]">
              BLUE DART AIR (INDIA)
            </span>
            <span className="px-2.5 py-1 rounded bg-[#26211C] border border-[#B88E38]/30 text-[10px] font-cinzel text-[#F3E5AB] font-bold">
              100% AUTHENTIC ATELIER
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
