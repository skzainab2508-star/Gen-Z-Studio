import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Eye, Heart, Star, MessageCircle, Check, Zap } from 'lucide-react';
import { Product } from '../types';
import { STORE_INFO } from '../data/products';
import { formatPrice } from '../utils/currency';
import { playGoldClink, playLuxuryClick } from '../utils/audio';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, selectedColor: string, selectedSize: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [isAdded, setIsAdded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    playGoldClink();
    onAddToCart(product, selectedColor, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    playGoldClink();
    onToggleWishlist(product);
  };

  const handleWhatsAppQuickOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    playLuxuryClick();
    const text = encodeURIComponent(
      `Hi Gen'Z Studio! I want to order the "${product.name}" in Color: ${selectedColor}, Size: ${selectedSize} (${formatPrice(product.price)}). Please share express delivery in India details.`
    );
    window.open(`https://wa.me/${STORE_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="group relative bg-[#FFFFFF] rounded-2xl border border-[#E6DEC8] hover:border-[#B88E38] transition-all duration-300 overflow-hidden flex flex-col shadow-sm hover:shadow-[0_12px_30px_rgba(184,142,56,0.15)]"
    >
      {/* Top Image Container */}
      <div 
        onClick={() => {
          playLuxuryClick();
          onQuickView(product);
        }}
        className="relative h-72 sm:h-80 w-full overflow-hidden bg-[#F4EFE6] cursor-pointer"
      >
        <img
          src={product.galleryImages[activeImageIndex] || product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-106"
          loading="lazy"
        />

        {/* Tag Badge */}
        {product.tag && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2.5 py-1 rounded-full bg-[#FFFFFF]/90 backdrop-blur-md border border-[#E0D8C7] text-[#8A641A] text-[10px] font-cinzel font-bold tracking-widest uppercase shadow-sm">
              {product.tag}
            </span>
          </div>
        )}

        {/* Express Delivery In India Pill */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="px-2 py-0.5 rounded-md bg-[#FAF7F2]/90 backdrop-blur-md border border-[#D5C9B3] text-[#5C5348] text-[9px] font-medium tracking-wide flex items-center gap-1 shadow-sm">
            <Zap className="w-2.5 h-2.5 text-[#1B6A3E]" />
            India Express 24h
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md shadow-sm ${
            isWishlisted 
              ? 'bg-[#B88E38] text-white shadow-[0_0_10px_rgba(184,142,56,0.4)]' 
              : 'bg-[#FFFFFF]/90 text-[#8A641A] hover:bg-[#B88E38] hover:text-white border border-[#E0D8C7]'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Image Gallery dots if more than 1 */}
        {product.galleryImages.length > 1 && (
          <div 
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-3 right-3 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-[#E0D8C7]"
          >
            {product.galleryImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  playLuxuryClick();
                  setActiveImageIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  activeImageIndex === idx ? 'bg-[#B88E38] w-3.5' : 'bg-[#D1C7B7] w-1.5'
                }`}
                aria-label={`View image ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Quick View Hover Pill */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10 backdrop-blur-[1px]">
          <span className="px-4 py-2 rounded-full bg-[#FFFFFF] text-[#1C1814] border border-[#B88E38] text-xs font-cinzel font-semibold tracking-wider uppercase shadow-md flex items-center gap-1.5 transform -translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-[#8A641A]" />
            Quick View
          </span>
        </div>
      </div>

      {/* Product Information Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between bg-[#FFFFFF]">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-montserrat text-[10px] uppercase tracking-[0.2em] text-[#7A7064]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-[#B88E38]">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-[11px] font-bold text-[#1C1814]">{product.rating}</span>
              <span className="text-[10px] text-[#7A7064]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h4 
            onClick={() => {
              playLuxuryClick();
              onQuickView(product);
            }}
            className="font-cinzel text-sm sm:text-base font-semibold text-[#1C1814] group-hover:text-[#8A641A] transition-colors cursor-pointer line-clamp-1 uppercase tracking-wide"
          >
            {product.name}
          </h4>

          {/* Price */}
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-cinzel text-lg font-bold text-[#8A641A] tracking-tight">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#9E9588] line-through font-sans">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Color Swatches Selector */}
          <div className="mt-3 flex items-center gap-1.5">
            <span className="text-[10px] text-[#7A7064] uppercase tracking-wider mr-1">Color:</span>
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={(e) => {
                  e.stopPropagation();
                  playLuxuryClick();
                  setSelectedColor(c.name);
                }}
                className={`w-4 h-4 rounded-full border transition-all ${
                  selectedColor === c.name 
                    ? 'border-[#B88E38] scale-125 ring-2 ring-[#B88E38]/30' 
                    : 'border-[#D1C7B7] hover:border-[#8A641A]'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>

          {/* Size Pills */}
          {product.sizes.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1">
              {product.sizes.slice(0, 4).map((s) => (
                <button
                  key={s}
                  onClick={(e) => {
                    e.stopPropagation();
                    playLuxuryClick();
                    setSelectedSize(s);
                  }}
                  className={`px-2 py-0.5 rounded text-[10px] font-sans uppercase border transition-colors ${
                    selectedSize === s
                      ? 'bg-[#FAF5EB] border-[#B88E38] text-[#8A641A] font-semibold'
                      : 'bg-[#F9F7F4] border-[#E6DEC8] text-[#6B6258] hover:border-[#B88E38]'
                  }`}
                >
                  {s}
                </button>
              ))}
              {product.sizes.length > 4 && (
                <span className="text-[10px] text-[#9E9588] self-center ml-1">
                  +{product.sizes.length - 4}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Card Action Buttons */}
        <div className="mt-4 pt-3 border-t border-[#EAE3D3] flex flex-col sm:flex-row gap-2">
          {/* Add to Cart Button */}
          <button
            onClick={handleAdd}
            className={`flex-1 py-2.5 px-3 rounded-xl font-cinzel text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm ${
              isAdded 
                ? 'bg-[#1B6A3E] text-white shadow-[0_0_15px_rgba(27,106,62,0.3)]' 
                : 'bg-gold-btn text-white hover:scale-[1.02]'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Cart</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>

          {/* Direct WhatsApp Order Icon */}
          <button
            onClick={handleWhatsAppQuickOrder}
            className="p-2 rounded-xl bg-[#FAF5EB] border border-[#25D366]/40 text-[#15803d] hover:bg-[#25D366] hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-sm"
            title="Order directly on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
          </button>
        </div>

      </div>
    </motion.div>
  );
};
