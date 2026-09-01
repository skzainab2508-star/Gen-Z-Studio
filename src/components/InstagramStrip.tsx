import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  Heart, 
  MessageCircle, 
  QrCode, 
  Sparkles, 
  ExternalLink, 
  X,
  Check,
  Copy
} from 'lucide-react';
import { INSTAGRAM_POSTS, STORE_INFO } from '../data/products';

interface InstagramStripProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
  onOpenModal: () => void;
}

export const InstagramStrip: React.FC<InstagramStripProps> = ({
  isModalOpen,
  onCloseModal,
  onOpenModal,
}) => {
  const [copied, setCopied] = useState(false);
  const [activePost, setActivePost] = useState<typeof INSTAGRAM_POSTS[0] | null>(null);

  const copyHandle = () => {
    navigator.clipboard.writeText(STORE_INFO.instagramHandle);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="instagram-section" className="py-20 bg-[#080808] relative px-4 sm:px-6 lg:px-8 border-t border-[#D4AF37]/15">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#D4AF37]/20 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17140B] border border-[#D4AF37]/30 text-[#E5C158] text-[11px] font-montserrat tracking-[0.25em] uppercase mb-2">
              <Instagram className="w-3 h-3 text-[#FFE259]" />
              <span>Community & Drops</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-gold-gradient tracking-wide uppercase">
              As Seen On Instagram
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#A69B80]">
              Follow <strong className="text-[#FFE259]">{STORE_INFO.instagramHandle}</strong> for VIP drop alerts, behind-the-scenes atelier footage, and customer style spotlights.
            </p>
          </div>

          {/* Direct Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenModal}
              className="px-4 py-2 rounded-full bg-[#1A160D] border border-[#D4AF37]/40 text-[#E5C158] hover:text-[#FFF2A3] hover:border-[#FFE259] text-xs font-cinzel tracking-wider uppercase flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <QrCode className="w-4 h-4 text-[#FFE259]" />
              <span>Scan QR Code</span>
            </button>

            <a
              href={STORE_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white font-cinzel text-xs font-bold tracking-wider uppercase flex items-center gap-2 hover:opacity-90 transition-all shadow-[0_0_15px_rgba(221,42,123,0.4)]"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow {STORE_INFO.instagramHandle}</span>
            </a>
          </div>
        </div>

        {/* 6-Grid Instagram Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ y: -5 }}
              onClick={() => setActivePost(post)}
              className="group relative aspect-square rounded-xl overflow-hidden bg-[#14120B] border border-[#D4AF37]/25 hover:border-[#FFE259] transition-all duration-300 cursor-pointer shadow-lg"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover object-center filter brightness-[0.8] contrast-[1.1] group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />

              {/* Tag pill */}
              <div className="absolute top-2 left-2 z-10">
                <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm text-[9px] font-cinzel font-bold text-[#FFE259] uppercase tracking-wider">
                  {post.tag}
                </span>
              </div>

              {/* Hover Overlay with Likes/Comments */}
              <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-3 text-center z-20">
                <Instagram className="w-6 h-6 text-[#FFE259] mb-2" />
                <div className="flex items-center gap-3 text-xs font-bold text-white mb-2">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-[#E5C158] fill-current" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 text-[#E5C158]" /> {post.comments}
                  </span>
                </div>
                <p className="text-[10px] text-[#C2B79B] line-clamp-2 leading-tight">
                  {post.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Community Banner */}
        <div className="mt-8 p-4 rounded-xl bg-[#110F0A] border border-[#D4AF37]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center text-white shrink-0 shadow-md">
              <Instagram className="w-5 h-5" />
            </div>
            <div>
              <p className="font-cinzel text-xs sm:text-sm font-bold text-white uppercase">
                Tag <span className="text-[#FFE259]">{STORE_INFO.instagramHandle}</span> in your fit
              </p>
              <p className="text-[11px] text-[#8C826B]">
                Get featured on our official editorial feed and receive an exclusive 15% VIP discount code.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyHandle}
              className="px-3.5 py-1.5 rounded-lg bg-[#1D1910] border border-[#D4AF37]/30 text-xs text-[#E5C158] hover:text-white transition-colors flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#25D366]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Handle Copied!' : 'Copy Handle'}</span>
            </button>
            <button
              onClick={onOpenModal}
              className="px-3.5 py-1.5 rounded-lg bg-gold-btn text-black font-cinzel text-xs font-bold uppercase tracking-wider shadow-md"
            >
              Open QR
            </button>
          </div>
        </div>

      </div>

      {/* POPUP 1: INSTAGRAM POST PREVIEW MODAL */}
      <AnimatePresence>
        {activePost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePost(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-[#0E0D08] border-2 border-[#D4AF37]/50 rounded-2xl overflow-hidden z-10 shadow-2xl p-6"
            >
              <button
                onClick={() => setActivePost(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-[#FFE259] hover:bg-[#D4AF37] hover:text-black transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] p-0.5">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white">
                    <Instagram className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <p className="font-cinzel text-xs font-bold text-white uppercase">{STORE_INFO.instagramHandle}</p>
                  <p className="text-[10px] text-[#A69B80]">Official Gen'Z Studio Atelier</p>
                </div>
              </div>

              <div className="aspect-square rounded-xl overflow-hidden bg-black mb-4">
                <img src={activePost.image} alt="" className="w-full h-full object-cover" />
              </div>

              <p className="text-xs text-[#D4CBB8] leading-relaxed mb-4">
                {activePost.caption}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-[#D4AF37]/20 text-xs">
                <div className="flex items-center gap-4 text-[#FFE259]">
                  <span className="flex items-center gap-1 font-bold">
                    <Heart className="w-4 h-4 fill-current" /> {activePost.likes}
                  </span>
                  <span className="flex items-center gap-1 font-bold">
                    <MessageCircle className="w-4 h-4" /> {activePost.comments}
                  </span>
                </div>

                <a
                  href={STORE_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 rounded-full bg-gold-btn text-black font-cinzel text-xs font-bold uppercase tracking-wider"
                >
                  View on Instagram
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* POPUP 2: OFFICIAL INSTAGRAM QR CODE SCANNER MODAL (Matching User Upload IMG-20260901-WA0011.jpg) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseModal}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md rounded-3xl overflow-hidden z-10 shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_50px_rgba(221,42,123,0.3)] border border-white/20 p-6 sm:p-8 bg-gradient-to-b from-[#FFA726] via-[#FF5252] to-[#D81B60] text-center"
            >
              {/* Close Button */}
              <button
                onClick={onCloseModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white hover:bg-black/80 transition-colors cursor-pointer"
                aria-label="Close QR modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-4">
                <span className="px-3 py-1 rounded-full bg-black/30 backdrop-blur-md text-white text-[11px] font-montserrat uppercase tracking-[0.2em]">
                  Official Instagram QR Card
                </span>
              </div>

              {/* White QR Plate matching IMG-20260901-WA0011.jpg */}
              <div className="w-64 h-64 sm:w-72 sm:h-72 mx-auto bg-white rounded-3xl p-5 shadow-2xl flex flex-col items-center justify-between border-4 border-white">
                
                {/* Simulated Custom Stylized Instagram QR Grid */}
                <div className="relative w-48 h-48 sm:w-52 sm:h-52 flex items-center justify-center">
                  
                  {/* Outer corner locator markers */}
                  <div className="absolute top-0 left-0 w-10 h-10 border-4 border-[#E1306C] rounded-xl flex items-center justify-center">
                    <div className="w-4 h-4 bg-[#E1306C] rounded-md" />
                  </div>
                  <div className="absolute top-0 right-0 w-10 h-10 border-4 border-[#E1306C] rounded-xl flex items-center justify-center">
                    <div className="w-4 h-4 bg-[#E1306C] rounded-md" />
                  </div>
                  <div className="absolute bottom-0 left-0 w-10 h-10 border-4 border-[#E1306C] rounded-xl flex items-center justify-center">
                    <div className="w-4 h-4 bg-[#E1306C] rounded-md" />
                  </div>

                  {/* QR Matrix Dot Pattern */}
                  <div className="w-full h-full p-3 grid grid-cols-8 grid-rows-8 gap-1.5 opacity-90">
                    {Array.from({ length: 64 }).map((_, i) => {
                      const isCorner = (i < 3 || (i >= 5 && i < 8) || i === 8 || i === 15 || i === 48 || i === 56 || i === 57);
                      if (isCorner) return <div key={i} />;
                      const isColored = (i * 7 + 3) % 3 === 0 || (i * 13) % 5 === 0;
                      return (
                        <div
                          key={i}
                          className={`rounded-full ${
                            isColored 
                              ? 'bg-gradient-to-tr from-[#FD1D1D] to-[#833AB4]' 
                              : 'bg-transparent'
                          }`}
                        />
                      );
                    })}
                  </div>

                  {/* Center Instagram Camera Glyph */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-14 h-14 rounded-2xl bg-white border-3 border-[#E1306C] flex items-center justify-center shadow-lg">
                      <Instagram className="w-8 h-8 text-[#E1306C]" />
                    </div>
                  </div>
                </div>

                {/* Handle text below QR code */}
                <div className="font-cinzel text-lg sm:text-xl font-bold tracking-wider text-[#E1306C] uppercase">
                  {STORE_INFO.instagramHandle}
                </div>
              </div>

              {/* Action Buttons Below QR */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={STORE_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-black font-cinzel text-xs font-bold uppercase tracking-wider shadow-lg hover:bg-[#FFE259] transition-colors flex items-center justify-center gap-2"
                >
                  <Instagram className="w-4 h-4 text-[#E1306C]" />
                  <span>Open Instagram App</span>
                </a>

                <button
                  onClick={copyHandle}
                  className="w-full sm:w-auto px-5 py-3 rounded-full bg-black/60 text-white border border-white/40 text-xs font-cinzel uppercase tracking-wider hover:bg-black transition-colors flex items-center justify-center gap-1.5"
                >
                  {copied ? <Check className="w-4 h-4 text-[#25D366]" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied' : 'Copy Handle'}</span>
                </button>
              </div>

              <p className="mt-4 text-[11px] text-white/80">
                Point your phone camera or Instagram app QR scanner to open profile instantly.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
