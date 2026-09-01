import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ShoppingBag, 
  Heart, 
  Star, 
  MessageCircle, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  ChevronRight,
  Check,
  Sparkles,
  Share2,
  Zap
} from 'lucide-react';
import { Product } from '../types';
import { STORE_INFO } from '../data/products';
import { formatPrice } from '../utils/currency';
import { playGoldClink, playLuxuryClick, playSoftWoosh } from '../utils/audio';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, selectedColor: string, selectedSize: string, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState<string>(product.galleryImages[0] || product.image);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'shipping'>('details');

  useEffect(() => {
    playSoftWoosh();
  }, []);

  const handleClose = () => {
    playSoftWoosh();
    onClose();
  };

  const handleAddToCart = () => {
    playGoldClink();
    onAddToCart(product, selectedColor, selectedSize, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 1200);
  };

  const handleWhatsAppOrder = () => {
    playLuxuryClick();
    const message = encodeURIComponent(
      `Hello Gen'Z Studio! I would like to order:\n\n` +
      `• Item: ${product.name}\n` +
      `• Color: ${selectedColor}\n` +
      `• Size: ${selectedSize}\n` +
      `• Quantity: ${quantity}\n` +
      `• Total: ${formatPrice(product.price * quantity)}\n\n` +
      `Please confirm India express delivery details and UPI payment.`
    );
    window.open(`https://wa.me/${STORE_INFO.whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-[#14110C]/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-[#FAF7F2] border border-[#E0D8C7] rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.25)] overflow-hidden z-10 my-8 flex flex-col md:flex-row max-h-[90vh]"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 border border-[#E0D8C7] text-[#1C1814] hover:bg-[#8A641A] hover:text-white transition-all cursor-pointer shadow-sm"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Image Gallery */}
          <div className="w-full md:w-1/2 p-6 bg-[#F4EFE6] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E0D8C7]">
            {/* Main Featured Image */}
            <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden bg-white border border-[#E0D8C7] flex items-center justify-center shadow-inner">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              {product.tag && (
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-white/90 border border-[#E0D8C7] text-[#8A641A] text-[10px] font-cinzel font-bold tracking-widest uppercase shadow-sm">
                    {product.tag}
                  </span>
                </div>
              )}
              {/* India Express Badge */}
              <div className="absolute bottom-3 left-3">
                <span className="px-2.5 py-1 rounded-md bg-[#FAF7F2]/95 border border-[#D5C9B3] text-[#1B6A3E] text-[10px] font-medium tracking-wide flex items-center gap-1 shadow-sm">
                  <Zap className="w-3 h-3 text-[#1B6A3E]" />
                  Express In India Only (24-48h)
                </span>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {product.galleryImages.length > 1 && (
              <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
                {product.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      playLuxuryClick();
                      setSelectedImage(img);
                    }}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      selectedImage === img
                        ? 'border-[#B88E38] shadow-[0_0_10px_rgba(184,142,56,0.3)]'
                        : 'border-[#E0D8C7] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Specs & Ordering */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-[#FAF7F2]">
            <div>
              {/* Category & Ratings */}
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-montserrat uppercase tracking-[0.25em] text-[#7A7064] text-[11px]">
                  {product.category}
                </span>
                <div className="flex items-center gap-1.5 text-[#B88E38]">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold text-sm text-[#1C1814]">{product.rating}</span>
                  <span className="text-xs text-[#7A7064]">({product.reviewsCount} verified reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#1C1814] tracking-wide uppercase">
                {product.name}
              </h2>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-cinzel text-3xl font-bold text-[#8A641A]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#9E9588] line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#EBF5EE] text-[#1B6A3E] border border-[#1B6A3E]/20">
                  In Stock &bull; Express Pan-India Dispatch
                </span>
              </div>

              {/* Description */}
              <p className="mt-4 text-xs sm:text-sm text-[#5C5348] leading-relaxed">
                {product.description}
              </p>

              {/* Color Swatch Selector */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-cinzel tracking-wider text-[#8A641A] uppercase font-bold">
                    Select Finish / Color: <strong className="text-[#1C1814] ml-1">{selectedColor}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => {
                        playLuxuryClick();
                        setSelectedColor(c.name);
                      }}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition-all cursor-pointer ${
                        selectedColor === c.name
                          ? 'border-[#B88E38] bg-[#FAF5EB] text-[#8A641A] font-semibold ring-2 ring-[#B88E38]/20'
                          : 'border-[#E0D8C7] bg-[#FFFFFF] text-[#6B6258] hover:border-[#8A641A]'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-cinzel tracking-wider text-[#8A641A] uppercase font-bold">
                    Select Size: <strong className="text-[#1C1814] ml-1">{selectedSize}</strong>
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        playLuxuryClick();
                        setSelectedSize(s);
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                        selectedSize === s
                          ? 'bg-gold-btn text-white font-bold shadow-[0_4px_12px_rgba(184,142,56,0.3)]'
                          : 'bg-[#FFFFFF] border border-[#E0D8C7] text-[#6B6258] hover:border-[#B88E38]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mt-5 flex items-center gap-4">
                <span className="font-cinzel text-xs uppercase tracking-wider text-[#8A641A] font-bold">
                  Quantity:
                </span>
                <div className="flex items-center border border-[#E0D8C7] rounded-xl bg-[#FFFFFF] shadow-sm">
                  <button
                    onClick={() => {
                      playLuxuryClick();
                      setQuantity(Math.max(1, quantity - 1));
                    }}
                    className="px-3 py-1.5 text-[#8A641A] hover:bg-[#FAF5EB] rounded-l-xl transition-colors font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-bold text-[#1C1814]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => {
                      playLuxuryClick();
                      setQuantity(quantity + 1);
                    }}
                    className="px-3 py-1.5 text-[#8A641A] hover:bg-[#FAF5EB] rounded-r-xl transition-colors font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Accordion Tabs for Craftsmanship details */}
              <div className="mt-6 border-t border-[#EAE3D3] pt-4">
                <div className="flex gap-4 border-b border-[#EAE3D3] pb-2 text-xs font-cinzel">
                  <button
                    onClick={() => {
                      playSoftWoosh();
                      setActiveTab('details');
                    }}
                    className={`uppercase tracking-wider transition-colors cursor-pointer ${
                      activeTab === 'details' ? 'text-[#8A641A] font-bold border-b-2 border-[#8A641A] pb-1' : 'text-[#7A7064]'
                    }`}
                  >
                    Features
                  </button>
                  <button
                    onClick={() => {
                      playSoftWoosh();
                      setActiveTab('materials');
                    }}
                    className={`uppercase tracking-wider transition-colors cursor-pointer ${
                      activeTab === 'materials' ? 'text-[#8A641A] font-bold border-b-2 border-[#8A641A] pb-1' : 'text-[#7A7064]'
                    }`}
                  >
                    Craftsmanship
                  </button>
                  <button
                    onClick={() => {
                      playSoftWoosh();
                      setActiveTab('shipping');
                    }}
                    className={`uppercase tracking-wider transition-colors cursor-pointer ${
                      activeTab === 'shipping' ? 'text-[#8A641A] font-bold border-b-2 border-[#8A641A] pb-1' : 'text-[#7A7064]'
                    }`}
                  >
                    India Express Delivery
                  </button>
                </div>

                <div className="py-3 text-xs text-[#5C5348]">
                  {activeTab === 'details' && (
                    <ul className="space-y-1.5">
                      {product.details.map((d, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#1B6A3E] shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {activeTab === 'materials' && (
                    <p className="leading-relaxed">
                      Sourced exclusively from certified ateliers. Pure electroplated gold alloy hardware prevents tarnishing, while our natural cottons and leathers undergo meticulous finishing for lasting refinement.
                    </p>
                  )}
                  {activeTab === 'shipping' && (
                    <div className="space-y-2">
                      <p className="leading-relaxed font-medium text-[#1B6A3E]">
                        ✦ Express delivery available in India only.
                      </p>
                      <p className="leading-relaxed">
                        Complimentary insured air courier via Blue Dart Air across all 28 Indian states & UTs on orders above ₹10,000. Dispatched in 24–48 hours from our Bandra, Mumbai atelier in a custom luxury magnetic hard box with authenticity seals.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-[#EAE3D3] flex flex-col gap-3">
              <div className="flex gap-3">
                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 px-4 rounded-xl font-cinzel text-xs sm:text-sm font-bold uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    addedAnimation
                      ? 'bg-[#1B6A3E] text-white shadow-[0_0_20px_rgba(27,106,62,0.3)]'
                      : 'bg-gold-btn text-white shadow-[0_6px_20px_rgba(184,142,56,0.3)] hover:scale-[1.02]'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag • {formatPrice(product.price * quantity)}</span>
                    </>
                  )}
                </button>

                {/* Wishlist button */}
                <button
                  onClick={() => {
                    playGoldClink();
                    onToggleWishlist(product);
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isWishlisted
                      ? 'bg-[#B88E38] text-white border-[#B88E38]'
                      : 'bg-[#FFFFFF] border-[#E0D8C7] text-[#8A641A] hover:border-[#B88E38]'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Direct Instant WhatsApp Order Button */}
              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-3 px-4 rounded-xl bg-[#FAF5EB] border border-[#25D366]/40 text-[#15803d] hover:bg-[#25D366] hover:text-white font-semibold text-xs tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Instant Order via WhatsApp Concierge</span>
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
