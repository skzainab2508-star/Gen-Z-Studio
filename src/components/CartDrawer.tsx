import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  MessageCircle, 
  Instagram, 
  Tag, 
  ShieldCheck, 
  Sparkles,
  Check,
  Truck,
  Zap
} from 'lucide-react';
import { CartItem } from '../types';
import { STORE_INFO } from '../data/products';
import { formatPrice } from '../utils/currency';
import { playLuxuryClick, playSoftWoosh, playGoldClink } from '../utils/audio';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  useEffect(() => {
    if (isOpen) {
      playSoftWoosh();
    }
  }, [isOpen]);

  const handleClose = () => {
    playSoftWoosh();
    onClose();
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingThreshold = 10000;
  const isFreeShipping = subtotal >= shippingThreshold || subtotal === 0;
  const shippingCost = isFreeShipping ? 0 : 350;
  const total = Math.max(0, subtotal - discountAmount + (subtotal > 0 ? shippingCost : 0));

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    playLuxuryClick();
    setPromoError('');
    setPromoSuccess('');

    const clean = promoCode.trim().toUpperCase();
    if (clean === 'GENZGOLD' || clean === 'VIP10' || clean === 'GENZ2026') {
      setDiscountPercent(15);
      setPromoSuccess('15% VIP Atelier Privilege Applied!');
    } else if (clean === 'STUDIO20') {
      setDiscountPercent(20);
      setPromoSuccess('20% Exclusive Drop Code Applied!');
    } else {
      setPromoError('Invalid code. Try "GENZGOLD" for 15% off.');
    }
  };

  const handleWhatsAppCheckout = () => {
    playLuxuryClick();
    if (cartItems.length === 0) return;

    let itemsList = cartItems
      .map(
        (item, i) =>
          `${i + 1}. *${item.product.name}*\n   Color: ${item.selectedColor} | Size: ${item.selectedSize}\n   Qty: ${item.quantity} x ${formatPrice(item.product.price)} = ${formatPrice(item.quantity * item.product.price)}`
      )
      .join('\n\n');

    const message = encodeURIComponent(
      `🛍️ *GEN'Z STUDIO - ATELIER ORDER INQUIRY (INDIA DELIVERY)*\n` +
      `-----------------------------------------\n` +
      `${itemsList}\n` +
      `-----------------------------------------\n` +
      `Subtotal: ${formatPrice(subtotal)}\n` +
      (discountPercent > 0 ? `Discount (${discountPercent}%): -${formatPrice(discountAmount)}\n` : '') +
      `Express Delivery (India Only): ${shippingCost === 0 ? 'FREE (Blue Dart Air)' : formatPrice(shippingCost)}\n` +
      `*ESTIMATED TOTAL: ${formatPrice(total)}*\n` +
      `-----------------------------------------\n` +
      `Please provide payment details (UPI / Card / NetBanking) and dispatch timeframe for my Indian address.`
    );

    window.open(`https://wa.me/${STORE_INFO.whatsappNumber}?text=${message}`, '_blank');
  };

  const handleInstagramDMCheckout = () => {
    playLuxuryClick();
    window.open(STORE_INFO.instagramUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-[#14110C]/65 backdrop-blur-sm"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#E0D8C7] shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-5 sm:p-6 border-b border-[#E0D8C7] flex items-center justify-between bg-[#FFFFFF]">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-[#8A641A]" />
                  <h3 className="font-cinzel text-lg font-bold text-[#1C1814] uppercase">
                    Your Atelier Bag
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FAF5EB] text-[#8A641A] text-xs font-bold border border-[#E0D8C7]">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>

                <button
                  onClick={handleClose}
                  className="p-2 rounded-full bg-[#FAF5EB] text-[#1C1814] hover:bg-[#8A641A] hover:text-white transition-colors cursor-pointer"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Meter (India Only) */}
              <div className="px-6 py-3 bg-[#F4EFE6] border-b border-[#E0D8C7]">
                <div className="flex items-center justify-between text-[11px] font-cinzel text-[#5C5348] mb-1.5 font-medium">
                  <span>
                    {subtotal >= shippingThreshold ? (
                      <span className="text-[#1B6A3E] font-bold flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 text-[#1B6A3E]" /> Free Express Delivery In India Unlocked
                      </span>
                    ) : (
                      <span>
                        Add <strong className="text-[#8A641A]">{formatPrice(shippingThreshold - subtotal)}</strong> more for Free India Air Express
                      </span>
                    )}
                  </span>
                  <span className="text-[10px] text-[#7A7064]">Goal: {formatPrice(10000)}</span>
                </div>
                <div className="w-full h-1.5 bg-[#E2D9C8] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#B88E38] to-[#D4AF37] transition-all duration-500 rounded-full"
                    style={{ width: `${Math.min(100, (subtotal / shippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="py-16 text-center">
                    <ShoppingBag className="w-14 h-14 text-[#C5B8A5] mx-auto mb-4" />
                    <p className="font-cinzel text-base text-[#1C1814] uppercase font-bold">
                      Your bag is empty
                    </p>
                    <p className="text-xs text-[#7A7064] mt-1 max-w-xs mx-auto">
                      Explore our latest streetwear drops, footwear, and signature gold accessories.
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-6 px-6 py-2.5 rounded-full bg-gold-btn text-white font-cinzel text-xs font-bold uppercase tracking-wider shadow-sm hover:scale-105 transition-all cursor-pointer"
                    >
                      Browse Collections
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#EAE3D3] relative group shadow-sm"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover bg-[#F4EFE6] border border-[#E0D8C7] shrink-0"
                      />

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="font-cinzel text-xs sm:text-sm font-semibold text-[#1C1814] line-clamp-1 uppercase">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => {
                                playLuxuryClick();
                                onRemoveItem(item.id);
                              }}
                              className="text-[#9E9588] hover:text-[#DC2626] transition-colors p-1 cursor-pointer"
                              title="Remove piece"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="text-[11px] text-[#7A7064] mt-1 flex flex-wrap gap-2">
                            <span>Color: <strong className="text-[#1C1814]">{item.selectedColor}</strong></span>
                            <span>&bull;</span>
                            <span>Size: <strong className="text-[#1C1814]">{item.selectedSize}</strong></span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F0EBE0]">
                          {/* Qty controls */}
                          <div className="flex items-center border border-[#E0D8C7] rounded-lg bg-[#FAF7F2]">
                            <button
                              onClick={() => {
                                playLuxuryClick();
                                onUpdateQuantity(item.id, item.quantity - 1);
                              }}
                              className="px-2.5 py-0.5 text-xs text-[#8A641A] hover:bg-[#FAF5EB] font-bold cursor-pointer"
                            >
                              -
                            </button>
                            <span className="px-2.5 py-0.5 text-xs font-bold text-[#1C1814]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => {
                                playLuxuryClick();
                                onUpdateQuantity(item.id, item.quantity + 1);
                              }}
                              className="px-2.5 py-0.5 text-xs text-[#8A641A] hover:bg-[#FAF5EB] font-bold cursor-pointer"
                            >
                              +
                            </button>
                          </div>

                          <span className="font-cinzel text-sm font-bold text-[#8A641A]">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Cart Footer */}
              {cartItems.length > 0 && (
                <div className="p-5 sm:p-6 border-t border-[#E0D8C7] bg-[#FFFFFF] space-y-4">
                  
                  {/* Promo Code Input */}
                  <form onSubmit={applyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Promo code (try GENZGOLD)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E0D8C7] text-xs text-[#1C1814] placeholder-[#9E9588] uppercase focus:outline-none focus:border-[#B88E38]"
                      />
                      <Tag className="w-3.5 h-3.5 text-[#8A641A] absolute left-2.5 top-1/2 -translate-y-1/2" />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#FAF5EB] border border-[#E0D8C7] text-[#8A641A] hover:bg-[#8A641A] hover:text-white font-cinzel text-xs font-bold uppercase transition-all cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>

                  {promoSuccess && (
                    <p className="text-[11px] text-[#1B6A3E] flex items-center gap-1">
                      <Check className="w-3 h-3" /> {promoSuccess}
                    </p>
                  )}
                  {promoError && (
                    <p className="text-[11px] text-[#DC2626]">
                      {promoError}
                    </p>
                  )}

                  {/* Financial Breakdown */}
                  <div className="space-y-1.5 text-xs text-[#7A7064]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-[#1C1814] font-medium">{formatPrice(subtotal)}</span>
                    </div>

                    {discountPercent > 0 && (
                      <div className="flex justify-between text-[#1B6A3E]">
                        <span>Privilege Discount ({discountPercent}%)</span>
                        <span>-{formatPrice(discountAmount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Express Courier (India Only)</span>
                      <span>
                        {shippingCost === 0 ? (
                          <strong className="text-[#1B6A3E] uppercase font-cinzel text-[11px]">FREE (Blue Dart Air)</strong>
                        ) : (
                          formatPrice(shippingCost)
                        )}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-[#EAE3D3] flex justify-between items-baseline text-sm">
                      <span className="font-cinzel text-[#1C1814] uppercase font-bold">Total</span>
                      <span className="font-cinzel text-xl font-bold text-[#8A641A]">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Buttons */}
                  <div className="space-y-2.5 pt-1">
                    {/* Primary Online Checkout */}
                    <button
                      onClick={() => {
                        playLuxuryClick();
                        onProceedToCheckout();
                      }}
                      className="w-full py-3.5 px-4 rounded-xl bg-gold-btn text-white font-cinzel text-xs sm:text-sm font-bold uppercase tracking-[0.15em] shadow-[0_6px_20px_rgba(184,142,56,0.3)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {/* Fast WhatsApp Order */}
                    <button
                      onClick={handleWhatsAppCheckout}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#FAF5EB] border border-[#25D366]/40 text-[#15803d] hover:bg-[#25D366] hover:text-white font-semibold text-xs tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      <span>Order Bag via WhatsApp</span>
                    </button>

                    {/* Instagram DM inquiry */}
                    <button
                      onClick={handleInstagramDMCheckout}
                      className="w-full py-2 px-4 rounded-xl bg-[#FAF7F2] border border-[#E0D8C7] text-[#7A7064] hover:text-[#1C1814] text-xs tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                      <span>Inquire via Instagram DM ({STORE_INFO.instagramHandle})</span>
                    </button>
                  </div>

                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
