import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  Truck, 
  Sparkles, 
  MessageCircle, 
  Download,
  Copy, 
  Check,
  Package,
  ArrowRight,
  QrCode,
  MapPin,
  Zap
} from 'lucide-react';
import { CartItem, Order, CustomerUser } from '../types';
import { STORE_INFO } from '../data/products';
import { formatPrice } from '../utils/currency';
import { saveNewOrder } from '../utils/ordersStorage';
import { getCurrentUser } from '../utils/authStorage';
import { playGoldClink, playLuxuryClick, playSoftWoosh, playOrderChime } from '../utils/audio';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderSuccess: () => void;
  onOpenOrders?: () => void;
  onOpenAuth?: (mode?: 'login' | 'register') => void;
}

const INDIAN_STATES = [
  'Maharashtra',
  'Delhi NCR',
  'Karnataka',
  'Telangana',
  'Tamil Nadu',
  'Gujarat',
  'West Bengal',
  'Rajasthan',
  'Uttar Pradesh',
  'Punjab',
  'Haryana',
  'Kerala',
  'Goa',
  'Madhya Pradesh',
  'Andhra Pradesh',
  'Bihar',
  'Odisha',
  'Assam',
  'Chandigarh',
  'Other Indian State'
];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderSuccess,
  onOpenOrders,
  onOpenAuth
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'whatsapp' | 'cod'>('upi');
  const [currentUser, setCurrentUser] = useState<CustomerUser | null>(null);
  const [applyCredits, setApplyCredits] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    upiId: 'user@okaxis',
  });
  const [orderNumber, setOrderNumber] = useState('');
  const [copiedReceipt, setCopiedReceipt] = useState(false);

  useEffect(() => {
    if (isOpen) {
      playSoftWoosh();
      const user = getCurrentUser();
      setCurrentUser(user);
      if (user) {
        setFormData(prev => ({
          ...prev,
          fullName: user.fullName || prev.fullName,
          email: user.email || prev.email,
          phone: user.phone || prev.phone,
          street: user.street || prev.street,
          city: user.city || prev.city,
          state: user.state || prev.state,
          pincode: user.pincode || prev.pincode,
        }));
      }
    }
  }, [isOpen]);

  const handleClose = () => {
    playSoftWoosh();
    onClose();
  };

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingCost = subtotal >= 10000 ? 0 : 350;
  const creditsDiscount = (applyCredits && currentUser && currentUser.credits > 0) 
    ? Math.min(currentUser.credits, subtotal) 
    : 0;
  const total = Math.max(0, subtotal - creditsDiscount) + shippingCost;


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playOrderChime();
    const newOrderNum = `GZ-IND-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderNumber(newOrderNum);

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: newOrderNum,
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'confirmed',
      estimatedDelivery: 'Estimated 24-48h via Blue Dart Air',
      courier: 'Blue Dart Apex Express (Pan-India Air)',
      trackingNumber: `BLD${Math.floor(100000000 + Math.random() * 900000000)}IN`,
      items: cartItems.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        category: item.product.category,
        price: item.product.price,
        image: item.product.image,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
        quantity: item.quantity
      })),
      shippingAddress: {
        fullName: formData.fullName || 'VIP Client',
        phone: formData.phone || '+91 98765 43210',
        street: formData.street || 'Mumbai Delivery',
        city: formData.city || 'Mumbai',
        state: formData.state || 'Maharashtra',
        pincode: formData.pincode || '400050'
      },
      paymentMethod: paymentMethod === 'upi' ? 'UPI (Google Pay / PhonePe)' : paymentMethod === 'card' ? 'Credit/Debit Card (RuPay/Visa)' : paymentMethod === 'whatsapp' ? 'WhatsApp Direct Pay' : 'Cash on Delivery',
      subtotal,
      discount: 0,
      shipping: shippingCost,
      total
    };

    // Save to persistent orders store
    saveNewOrder(newOrder);

    if (paymentMethod === 'whatsapp') {
      const itemsList = cartItems
        .map((it) => `• ${it.product.name} (${it.selectedColor}, ${it.selectedSize}) x${it.quantity}`)
        .join('\n');
      const text = encodeURIComponent(
        `🛍️ *GEN'Z STUDIO ORDER #${newOrderNum} (INDIA DELIVERY)*\n\n` +
        `Customer: ${formData.fullName}\n` +
        `Phone: ${formData.phone}\n` +
        `Delivery: ${formData.street}, ${formData.city}, ${formData.state} - ${formData.pincode}\n\n` +
        `Items:\n${itemsList}\n\n` +
        `Total: ${formatPrice(total)}\n\n` +
        `Please confirm express dispatch from Mumbai Atelier.`
      );
      window.open(`https://wa.me/${STORE_INFO.whatsappNumber}?text=${text}`, '_blank');
    }

    setStep('success');
    onOrderSuccess();
  };

  const copyReceiptText = () => {
    playLuxuryClick();
    const text = `GEN'Z STUDIO ORDER #${orderNumber}\nTotal: ${formatPrice(total)}\nDelivery Address: ${formData.fullName}, ${formData.street}, ${formData.city}, ${formData.state} - ${formData.pincode}\nStatus: Confirmed for Blue Dart Express Dispatch (India Only)`;
    navigator.clipboard.writeText(text);
    setCopiedReceipt(true);
    setTimeout(() => setCopiedReceipt(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="fixed inset-0 bg-[#14110C]/70 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-[#FAF7F2] border border-[#E0D8C7] rounded-3xl p-5 sm:p-8 z-10 shadow-[0_25px_60px_rgba(0,0,0,0.25)] my-6 max-h-[92vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white border border-[#E0D8C7] text-[#1C1814] hover:bg-[#8A641A] hover:text-white transition-colors cursor-pointer shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Zap className="w-4 h-4 text-[#8A641A]" />
              <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#1C1814] uppercase">
                Pan-India Express Checkout
              </h2>
            </div>
            <p className="text-xs text-[#5C5348] mb-4">
              Dispatched with white-glove packaging from our Bandra, Mumbai atelier. Express delivery available in India only.
            </p>

            {/* Customer Account Status & Guild Credits Redemption */}
            {currentUser ? (
              <div className="mb-5 p-3.5 rounded-2xl bg-white border border-[#B88E38]/40 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#997A15] to-[#DFBE6F] flex items-center justify-center text-white font-bold text-xs">
                    {currentUser.avatarLetter || currentUser.fullName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-cinzel text-xs font-bold text-[#1C1814]">{currentUser.fullName}</span>
                      <span className="px-2 py-0.2 rounded-full bg-[#FAF5EB] text-[#8A641A] text-[9px] font-cinzel font-bold uppercase">
                        {currentUser.membershipTier}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#6B6258]">
                      {currentUser.credits > 0 ? `₹${currentUser.credits} Store Credit Available` : 'No store credits remaining'}
                    </p>
                  </div>
                </div>

                {currentUser.credits > 0 && (
                  <label className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FAF5EB] border border-[#B88E38] text-xs font-cinzel font-bold text-[#8A641A] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={applyCredits}
                      onChange={(e) => {
                        playLuxuryClick();
                        setApplyCredits(e.target.checked);
                      }}
                      className="rounded border-[#B88E38] text-[#8A641A] focus:ring-[#8A641A]"
                    />
                    <span>Apply ₹{Math.min(currentUser.credits, subtotal)} Credit</span>
                  </label>
                )}
              </div>
            ) : (
              <div className="mb-5 p-3.5 rounded-2xl bg-[#FAF5EB] border border-[#E0D8C7] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#8A641A]" />
                  <span className="text-xs text-[#5C5348]">
                    New VIP customer? <strong>Register now</strong> to claim <strong>₹2,000 credit</strong> towards this order.
                  </span>
                </div>
                {onOpenAuth && (
                  <button
                    type="button"
                    onClick={() => {
                      playSoftWoosh();
                      onOpenAuth('register');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-gold-btn text-white text-[10px] font-cinzel font-bold uppercase whitespace-nowrap shadow-xs"
                  >
                    Register / Sign In
                  </button>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Shipping Address */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <h3 className="font-cinzel text-xs font-bold text-[#8A641A] uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#8A641A]" />
                    <span>1. Delivery Details (India Only)</span>
                  </h3>
                  <span className="text-[11px] text-[#1B6A3E] font-semibold flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Express In India Only
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-[#7A7064] font-montserrat uppercase mb-1 font-semibold">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E0D8C7] text-xs text-[#1C1814] placeholder-[#9E9588] focus:outline-none focus:border-[#B88E38]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-[#7A7064] font-montserrat uppercase mb-1 font-semibold">Mobile / WhatsApp Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98200 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E0D8C7] text-xs text-[#1C1814] placeholder-[#9E9588] focus:outline-none focus:border-[#B88E38]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[10px] text-[#7A7064] font-montserrat uppercase mb-1 font-semibold">Street Address, Apartment / Flat / Landmark</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Flat 4B, Skyline Tower, Linking Road"
                      value={formData.street}
                      onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E0D8C7] text-xs text-[#1C1814] placeholder-[#9E9588] focus:outline-none focus:border-[#B88E38]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-[#7A7064] font-montserrat uppercase mb-1 font-semibold">City / Town</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mumbai, Bengaluru, Delhi"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E0D8C7] text-xs text-[#1C1814] placeholder-[#9E9588] focus:outline-none focus:border-[#B88E38]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-[#7A7064] font-montserrat uppercase mb-1 font-semibold">State</label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E0D8C7] text-xs text-[#1C1814] focus:outline-none focus:border-[#B88E38]"
                    >
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] text-[#7A7064] font-montserrat uppercase mb-1 font-semibold">6-Digit Indian PIN Code</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="e.g. 400050"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E0D8C7] text-xs text-[#1C1814] placeholder-[#9E9588] focus:outline-none focus:border-[#B88E38] font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-[#7A7064] font-montserrat uppercase mb-1 font-semibold">Email for GST Invoice</label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E0D8C7] text-xs text-[#1C1814] placeholder-[#9E9588] focus:outline-none focus:border-[#B88E38]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h3 className="font-cinzel text-xs font-bold text-[#8A641A] uppercase tracking-wider mb-2.5">
                  2. Select Payment Method
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      playLuxuryClick();
                      setPaymentMethod('upi');
                    }}
                    className={`p-3 rounded-2xl border text-xs flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === 'upi'
                        ? 'border-[#B88E38] bg-[#FAF5EB] text-[#8A641A] font-bold ring-2 ring-[#B88E38]/20'
                        : 'border-[#E0D8C7] bg-white text-[#5C5348]'
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-[#8A641A]" />
                    <span className="font-semibold">UPI / GPay / PhonePe</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playLuxuryClick();
                      setPaymentMethod('card');
                    }}
                    className={`p-3 rounded-2xl border text-xs flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-[#B88E38] bg-[#FAF5EB] text-[#8A641A] font-bold ring-2 ring-[#B88E38]/20'
                        : 'border-[#E0D8C7] bg-white text-[#5C5348]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-[#8A641A]" />
                    <span>Cards / RuPay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playLuxuryClick();
                      setPaymentMethod('whatsapp');
                    }}
                    className={`p-3 rounded-2xl border text-xs flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === 'whatsapp'
                        ? 'border-[#25D366] bg-[#EBF5EE] text-[#1B6A3E] font-bold ring-2 ring-[#25D366]/20'
                        : 'border-[#E0D8C7] bg-white text-[#5C5348]'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span>WhatsApp Concierge</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playLuxuryClick();
                      setPaymentMethod('cod');
                    }}
                    className={`p-3 rounded-2xl border text-xs flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-[#B88E38] bg-[#FAF5EB] text-[#8A641A] font-bold ring-2 ring-[#B88E38]/20'
                        : 'border-[#E0D8C7] bg-white text-[#5C5348]'
                    }`}
                  >
                    <Truck className="w-4 h-4 text-[#8A641A]" />
                    <span>Cash on Delivery</span>
                  </button>
                </div>
              </div>

              {/* Order Summary & Final Submit */}
              <div className="p-4 rounded-2xl bg-white border border-[#E0D8C7] space-y-2 text-xs shadow-sm">
                <div className="flex justify-between text-[#7A7064]">
                  <span>Subtotal:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {creditsDiscount > 0 && (
                  <div className="flex justify-between text-[#1B6A3E] font-semibold">
                    <span>VIP Store Credit:</span>
                    <span>-{formatPrice(creditsDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#7A7064]">
                  <span>Insured Courier (Blue Dart Air):</span>
                  <span className="text-[#1B6A3E] font-semibold">{shippingCost === 0 ? 'COMPLIMENTARY' : formatPrice(shippingCost)}</span>
                </div>
                <div className="pt-2 border-t border-[#F0EBE0] flex items-center justify-between">
                  <div>
                    <span className="text-[#7A7064] block text-[10px]">Total Payable (INR):</span>
                    <p className="font-cinzel text-xl font-bold text-[#8A641A]">{formatPrice(total)}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#1B6A3E] text-[11px] font-semibold">
                    <ShieldCheck className="w-4 h-4" /> Free Blue Dart Air Courier Included
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gold-btn text-white font-cinzel text-sm font-bold uppercase tracking-[0.18em] shadow-[0_6px_20px_rgba(184,142,56,0.3)] hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Confirm Order • {formatPrice(total)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* SUCCESS ORDER CONFIRMATION */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#B88E38] to-[#D4AF37] p-0.5 mx-auto mb-4 shadow-[0_4px_20px_rgba(184,142,56,0.3)]">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[#1B6A3E]">
                <CheckCircle2 className="w-9 h-9 text-[#1B6A3E]" />
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-[#FAF5EB] border border-[#E0D8C7] text-[#8A641A] text-[10px] font-montserrat uppercase tracking-[0.2em] font-bold">
              Order Confirmed &bull; Mumbai Atelier
            </span>

            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#1C1814] uppercase mt-3">
              Order Received, {formData.fullName}
            </h2>

            <p className="text-xs text-[#5C5348] mt-2 max-w-md mx-auto leading-relaxed">
              Your order <strong className="text-[#8A641A]">#{orderNumber}</strong> has been logged for express dispatch. We have added it to your <strong className="text-[#1C1814]">My Orders</strong> tab for live tracking.
            </p>

            {/* Receipt Box */}
            <div className="mt-6 p-4 rounded-2xl bg-white border border-[#E0D8C7] text-left text-xs space-y-2 shadow-sm">
              <div className="flex justify-between text-[#7A7064] border-b border-[#F0EBE0] pb-2">
                <span>Client: <strong className="text-[#1C1814]">{formData.fullName || 'VIP Member'}</strong></span>
                <span className="font-bold text-[#8A641A]">Total: {formatPrice(total)}</span>
              </div>
              <p className="text-[11px] text-[#5C5348]">
                Destination: {formData.street}, {formData.city}, {formData.state} - {formData.pincode}
              </p>
              <p className="text-[11px] text-[#1B6A3E] font-medium">
                Payment: {paymentMethod.toUpperCase()} &bull; Express Delivery (India Only) via Blue Dart Air
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              {onOpenOrders && (
                <button
                  onClick={() => {
                    playLuxuryClick();
                    onClose();
                    onOpenOrders();
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-gold-btn text-white font-cinzel text-xs font-bold uppercase tracking-wider shadow-md hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Package className="w-4 h-4 text-white" />
                  <span>View in My Orders & Track Live</span>
                </button>
              )}

              <button
                onClick={copyReceiptText}
                className="w-full sm:w-auto px-5 py-3 rounded-full bg-white border border-[#E0D8C7] text-xs text-[#8A641A] hover:bg-[#FAF5EB] flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                {copiedReceipt ? <Check className="w-4 h-4 text-[#1B6A3E]" /> : <Copy className="w-4 h-4" />}
                <span>{copiedReceipt ? 'Receipt Copied!' : 'Copy Receipt'}</span>
              </button>

              <a
                href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=Hi%20Gen%27Z%20Studio,%20I%20just%20placed%20order%20%23${orderNumber}.`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playLuxuryClick()}
                className="w-full sm:w-auto px-5 py-3 rounded-full bg-[#FAF5EB] border border-[#25D366]/40 text-[#15803d] hover:bg-[#25D366] hover:text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Updates</span>
              </a>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
