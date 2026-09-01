import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../utils/currency';
import { playGoldClink, playLuxuryClick, playSoftWoosh } from '../utils/audio';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product, selectedColor: string, selectedSize: string) => void;
  onQuickView: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
  onQuickView,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-[#0C0B07] border-l border-[#D4AF37]/40 shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-5 sm:p-6 border-b border-[#D4AF37]/20 flex items-center justify-between bg-[#12100A]">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[#FFE259] fill-current" />
                  <h3 className="font-cinzel text-lg font-bold text-gold-gradient uppercase">
                    Saved Pieces
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#1C180E] text-[#FFE259] text-xs font-bold border border-[#D4AF37]/30">
                    {wishlistProducts.length}
                  </span>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-[#18150E] text-[#E5C158] hover:bg-[#D4AF37] hover:text-black transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
                {wishlistProducts.length === 0 ? (
                  <div className="py-20 text-center">
                    <Heart className="w-14 h-14 text-[#4A402A] mx-auto mb-4" />
                    <p className="font-cinzel text-base text-[#D4AF37] uppercase font-bold">
                      No saved pieces yet
                    </p>
                    <p className="text-xs text-[#8C826B] mt-1 max-w-xs mx-auto">
                      Click the heart icon on any drop or accessory to curate your personal atelier wishlist.
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-6 px-6 py-2.5 rounded-full bg-gold-btn text-black font-cinzel text-xs font-bold uppercase tracking-wider"
                    >
                      Explore Catalog
                    </button>
                  </div>
                ) : (
                  wishlistProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex gap-4 p-3.5 rounded-xl bg-[#13110A] border border-[#D4AF37]/20 relative group"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        onClick={() => {
                          onClose();
                          onQuickView(product);
                        }}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover bg-[#0A0A0A] border border-[#D4AF37]/20 shrink-0 cursor-pointer"
                      />

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4
                              onClick={() => {
                                onClose();
                                onQuickView(product);
                              }}
                              className="font-cinzel text-xs sm:text-sm font-semibold text-white line-clamp-1 uppercase cursor-pointer hover:text-[#FFE259]"
                            >
                              {product.name}
                            </h4>
                            <button
                              onClick={() => onRemoveFromWishlist(product)}
                              className="text-[#7A705B] hover:text-[#FF5252] transition-colors p-1"
                              title="Remove from wishlist"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="text-[11px] text-[#A69B80] mt-1">
                            Category: <span className="text-[#E5C158] uppercase font-montserrat">{product.category}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#D4AF37]/15">
                          <span className="font-cinzel text-sm font-bold text-gold-gradient">
                            {formatPrice(product.price)}
                          </span>

                          <button
                            onClick={() => {
                              playGoldClink();
                              onAddToCart(product, product.colors[0]?.name || '', product.sizes[0] || '');
                              onRemoveFromWishlist(product);
                            }}
                            className="px-3 py-1 rounded-lg bg-gold-btn text-black font-cinzel text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 hover:scale-105 transition-transform"
                          >
                            <ShoppingBag className="w-3 h-3" />
                            <span>Move to Bag</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Wishlist Footer */}
              {wishlistProducts.length > 0 && (
                <div className="p-5 sm:p-6 border-t border-[#D4AF37]/20 bg-[#100E08]">
                  <button
                    onClick={() => {
                      playGoldClink();
                      wishlistProducts.forEach((p) => {
                        onAddToCart(p, p.colors[0]?.name || '', p.sizes[0] || '');
                      });
                      onClose();
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-gold-btn text-black font-cinzel text-xs font-bold uppercase tracking-wider shadow-md hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                  >
                    <span>Move All to Bag ({wishlistProducts.length})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
