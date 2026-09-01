import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Copy, 
  Check, 
  FileText, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { getStoredOrders, getOrderStepIndex } from '../utils/ordersStorage';
import { formatPrice } from '../utils/currency';
import { STORE_INFO } from '../data/products';

interface MyOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct?: (productId: string) => void;
}

export const MyOrdersModal: React.FC<MyOrdersModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct
}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'delivered'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [copiedTracking, setCopiedTracking] = useState<string | null>(null);
  const [downloadingInvoice, setDownloadingInvoice] = useState<string | null>(null);
  const [invoiceToast, setInvoiceToast] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setOrders(getStoredOrders());
    }

    const handleOrdersUpdated = (e: any) => {
      if (e.detail) {
        setOrders(e.detail);
      }
    };

    window.addEventListener('genz-orders-updated', handleOrdersUpdated);
    return () => window.removeEventListener('genz-orders-updated', handleOrdersUpdated);
  }, [isOpen]);

  // Expand first order by default
  useEffect(() => {
    if (orders.length > 0 && !expandedOrderId) {
      setExpandedOrderId(orders[0].id);
    }
  }, [orders]);

  if (!isOpen) return null;

  const handleCopyAWB = (awb: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(awb);
    setCopiedTracking(awb);
    setTimeout(() => setCopiedTracking(null), 2000);
  };

  const handleDownloadInvoice = (order: Order, e: React.MouseEvent) => {
    e.stopPropagation();
    setDownloadingInvoice(order.id);
    
    setTimeout(() => {
      setDownloadingInvoice(null);
      setInvoiceToast(`Tax Invoice #${order.orderNumber}.pdf generated with GST details.`);
      setTimeout(() => setInvoiceToast(null), 4000);
    }, 1200);
  };

  const handleWhatsAppHelp = (order: Order, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `Hello Gen'Z Studio Concierge! I need assistance with my Order #${order.orderNumber} (${order.items.map(i => i.name).join(', ')}). Destination: ${order.shippingAddress.city}, ${order.shippingAddress.pincode}.`
    );
    window.open(`https://wa.me/${STORE_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  const filteredOrders = orders.filter((order) => {
    if (activeFilter === 'active') {
      if (order.status === 'delivered') return false;
    }
    if (activeFilter === 'delivered') {
      if (order.status !== 'delivered') return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchNumber = order.orderNumber.toLowerCase().includes(q);
      const matchItem = order.items.some((i) => i.name.toLowerCase().includes(q));
      const matchCity = order.shippingAddress.city.toLowerCase().includes(q);
      return matchNumber || matchItem || matchCity;
    }
    return true;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1A180D] border border-[#D4AF37]/40 text-[#FFE259] text-[11px] font-medium font-sans">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFE259] animate-pulse" />
            Order Confirmed
          </span>
        );
      case 'preparing':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1C160B] border border-[#E5A823]/40 text-[#FFAE33] text-[11px] font-medium font-sans">
            <Sparkles className="w-3 h-3 text-[#FFAE33]" />
            Atelier Quality Check
          </span>
        );
      case 'dispatched':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0D2214] border border-[#25D366]/40 text-[#25D366] text-[11px] font-medium font-sans">
            <Truck className="w-3 h-3 text-[#25D366] animate-bounce" />
            In Transit (Air Express)
          </span>
        );
      case 'out_for_delivery':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0D2214] border border-[#25D366]/40 text-[#25D366] text-[11px] font-medium font-sans">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
            Out for Delivery Today
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#111A13] border border-[#25D366]/30 text-[#82E0AA] text-[11px] font-medium font-sans">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" />
            Delivered & Verified
          </span>
        );
      default:
        return null;
    }
  };

  const steps = [
    { label: 'Order Confirmed', desc: 'Payment received' },
    { label: 'Mumbai Atelier Pack', desc: 'Quality inspected' },
    { label: 'Dispatched via Air', desc: 'Blue Dart / Delhivery' },
    { label: 'Out for Delivery', desc: 'Local hub courier' },
    { label: 'Delivered', desc: 'Handed to customer' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-4xl bg-[#0C0B08] border-2 border-[#D4AF37]/40 rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(212,175,55,0.15)] overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Top Gold Foil Strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#806015] via-[#FFE259] to-[#806015]" />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#D4AF37]/20 flex items-center justify-between bg-gradient-to-b from-[#16130B] to-[#0E0C07]">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#1F1A0E] border border-[#D4AF37]/40 flex items-center justify-center text-[#FFE259] shadow-inner">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-cinzel text-lg sm:text-2xl font-bold text-gold-gradient uppercase tracking-wide">
                  My Orders & Live Tracking
                </h2>
                <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-[#201A0C] border border-[#D4AF37]/30 text-[#E5C158] text-[10px] font-mono font-semibold">
                  Pan-India Delivery
                </span>
              </div>
              <p className="text-xs text-[#A69B80] mt-0.5">
                Track your active shipments, delivery status, and view past purchases.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-[#1A160D] border border-[#D4AF37]/30 text-[#D4AF37] hover:text-white hover:border-[#FFE259] transition-all cursor-pointer"
            aria-label="Close orders modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Invoice Toast Notification */}
        <AnimatePresence>
          {invoiceToast && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-[#122818] border-b border-[#25D366]/40 px-4 py-2.5 text-xs text-[#82E0AA] flex items-center justify-between"
            >
              <span className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
                {invoiceToast}
              </span>
              <button onClick={() => setInvoiceToast(null)} className="text-[#82E0AA] hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter Bar & Search */}
        <div className="px-5 py-3.5 border-b border-[#D4AF37]/15 bg-[#0E0C08] flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-cinzel tracking-wider uppercase transition-all ${
                activeFilter === 'all'
                  ? 'bg-gold-btn text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                  : 'bg-[#15120A] text-[#A69B80] border border-[#D4AF37]/20 hover:text-white'
              }`}
            >
              All Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveFilter('active')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-cinzel tracking-wider uppercase transition-all ${
                activeFilter === 'active'
                  ? 'bg-gold-btn text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                  : 'bg-[#15120A] text-[#A69B80] border border-[#D4AF37]/20 hover:text-white'
              }`}
            >
              In Transit ({orders.filter(o => o.status !== 'delivered').length})
            </button>
            <button
              onClick={() => setActiveFilter('delivered')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-cinzel tracking-wider uppercase transition-all ${
                activeFilter === 'delivered'
                  ? 'bg-gold-btn text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                  : 'bg-[#15120A] text-[#A69B80] border border-[#D4AF37]/20 hover:text-white'
              }`}
            >
              Delivered ({orders.filter(o => o.status === 'delivered').length})
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#8C826B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by order ID or item..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-full bg-[#14120A] border border-[#D4AF37]/25 text-xs text-white placeholder-[#7A705B] focus:outline-none focus:border-[#FFE259]"
            />
          </div>
        </div>

        {/* Orders Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-grow">
          {filteredOrders.length === 0 ? (
            <div className="py-16 text-center">
              <Package className="w-12 h-12 text-[#63583F] mx-auto mb-3" />
              <h3 className="font-cinzel text-base font-bold text-[#E5C158] uppercase">No Orders Found</h3>
              <p className="text-xs text-[#8C826B] mt-1 max-w-sm mx-auto">
                {searchQuery ? 'No orders match your search criteria.' : 'You have no orders under this filter.'}
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const isExpanded = expandedOrderId === order.id;
              const stepIndex = getOrderStepIndex(order.status);

              return (
                <div
                  key={order.id}
                  className="rounded-2xl bg-[#110F09] border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 transition-all shadow-[0_8px_25px_rgba(0,0,0,0.6)] overflow-hidden"
                >
                  {/* Order Card Summary Bar */}
                  <div
                    onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                    className="p-4 sm:p-5 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-[#14110A] to-[#100E08] hover:from-[#19150C] transition-colors"
                  >
                    <div className="flex items-start sm:items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#1C180E] border border-[#D4AF37]/30 flex items-center justify-center text-[#FFE259] shrink-0">
                        <Package className="w-5 h-5" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-cinzel font-bold text-sm text-white tracking-wider">
                            Order #{order.orderNumber}
                          </span>
                          {getStatusBadge(order.status)}
                        </div>
                        <p className="text-xs text-[#8C826B] mt-0.5">
                          Placed on {order.date} &bull; {order.items.length} {order.items.length === 1 ? 'item' : 'items'} &bull; Paid via {order.paymentMethod}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-[#D4AF37]/15">
                      <div className="text-left sm:text-right">
                        <span className="text-[10px] text-[#8C826B] uppercase font-montserrat tracking-wider block">Total Amount</span>
                        <span className="font-cinzel text-base font-bold text-gold-gradient">
                          {formatPrice(order.total)}
                        </span>
                      </div>

                      <div className="p-1.5 rounded-lg bg-[#18140B] text-[#D4AF37]">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Order Details */}
                  {isExpanded && (
                    <div className="p-4 sm:p-6 border-t border-[#D4AF37]/20 bg-[#0E0C07] space-y-6">
                      
                      {/* Live Tracking Progress Timeline */}
                      <div className="p-4 sm:p-5 rounded-xl bg-[#14110A] border border-[#D4AF37]/25">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-[#D4AF37]/15">
                          <div className="flex items-center gap-2">
                            <Truck className="w-4 h-4 text-[#FFE259]" />
                            <span className="font-cinzel text-xs font-bold text-[#E5C158] uppercase tracking-wider">
                              Shipment Tracker &bull; {order.courier}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-[#8C826B]">AWB:</span>
                            <span className="font-mono font-semibold text-[#FFE259]">{order.trackingNumber}</span>
                            <button
                              onClick={(e) => handleCopyAWB(order.trackingNumber, e)}
                              className="p-1 rounded bg-[#1F1A0E] text-[#D4AF37] hover:text-white"
                              title="Copy Tracking Number"
                            >
                              {copiedTracking === order.trackingNumber ? (
                                <Check className="w-3 h-3 text-[#25D366]" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Estimated delivery banner */}
                        <div className="mb-6 flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1A160D] border border-[#D4AF37]/20 text-xs">
                          <Clock className="w-4 h-4 text-[#FFE259] shrink-0" />
                          <span className="text-[#D4CBB8]">
                            Status: <strong className="text-[#FFE259]">{order.estimatedDelivery}</strong>
                          </span>
                        </div>

                        {/* Horizontal Stepper */}
                        <div className="relative">
                          <div className="grid grid-cols-5 gap-1 sm:gap-2 text-center relative z-10">
                            {steps.map((step, idx) => {
                              const stepNum = idx + 1;
                              const isCompleted = stepIndex >= stepNum;
                              const isCurrent = stepIndex === stepNum;

                              return (
                                <div key={idx} className="flex flex-col items-center">
                                  <div
                                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-md ${
                                      isCompleted
                                        ? 'bg-[#25D366] text-black ring-2 ring-[#25D366]/40'
                                        : 'bg-[#1E1A11] border border-[#D4AF37]/30 text-[#8C826B]'
                                    }`}
                                  >
                                    {isCompleted ? <Check className="w-4 h-4 text-black" /> : stepNum}
                                  </div>
                                  <span
                                    className={`mt-2 font-cinzel text-[10px] sm:text-xs font-semibold leading-tight ${
                                      isCurrent
                                        ? 'text-[#FFE259]'
                                        : isCompleted
                                        ? 'text-[#E5C158]'
                                        : 'text-[#6B614B]'
                                    }`}
                                  >
                                    {step.label}
                                  </span>
                                  <span className="hidden sm:block text-[9px] text-[#8C826B] mt-0.5">
                                    {step.desc}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Items Ordered List */}
                      <div>
                        <h4 className="font-cinzel text-xs font-bold text-[#E5C158] uppercase tracking-wider mb-3">
                          Items in this Drop ({order.items.length})
                        </h4>

                        <div className="space-y-3">
                          {order.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="p-3 sm:p-4 rounded-xl bg-[#14120B] border border-[#D4AF37]/20 flex items-center justify-between gap-4"
                            >
                              <div className="flex items-center gap-3.5">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover border border-[#D4AF37]/30"
                                />
                                <div>
                                  <h5 className="font-cinzel text-xs sm:text-sm font-bold text-white leading-snug">
                                    {item.name}
                                  </h5>
                                  <div className="flex items-center gap-2 text-[11px] text-[#A69B80] mt-1">
                                    <span>Color: <strong className="text-[#D4CBB8]">{item.selectedColor}</strong></span>
                                    <span>&bull;</span>
                                    <span>Size: <strong className="text-[#D4CBB8]">{item.selectedSize}</strong></span>
                                    <span>&bull;</span>
                                    <span>Qty: <strong className="text-[#FFE259]">{item.quantity}</strong></span>
                                  </div>
                                </div>
                              </div>

                              <div className="text-right shrink-0">
                                <span className="font-cinzel text-xs sm:text-sm font-bold text-gold-gradient">
                                  {formatPrice(item.price * item.quantity)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Shipping & Billing Breakdown */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        {/* Delivery Destination */}
                        <div className="p-4 rounded-xl bg-[#14120B] border border-[#D4AF37]/20 text-xs space-y-1.5">
                          <div className="flex items-center gap-1.5 text-[#E5C158] font-cinzel font-bold uppercase mb-2">
                            <MapPin className="w-3.5 h-3.5 text-[#FFE259]" />
                            <span>Pan-India Delivery Address</span>
                          </div>
                          <p className="font-medium text-white">{order.shippingAddress.fullName}</p>
                          <p className="text-[#A69B80]">{order.shippingAddress.street}</p>
                          <p className="text-[#A69B80]">
                            {order.shippingAddress.city}, {order.shippingAddress.state} - <strong className="text-[#FFE259]">{order.shippingAddress.pincode}</strong>
                          </p>
                          <p className="text-[#8C826B] pt-1 flex items-center gap-1">
                            <Phone className="w-3 h-3 text-[#25D366]" /> {order.shippingAddress.phone}
                          </p>
                        </div>

                        {/* Order Calculation Details */}
                        <div className="p-4 rounded-xl bg-[#14120B] border border-[#D4AF37]/20 text-xs space-y-1.5">
                          <div className="flex items-center gap-1.5 text-[#E5C158] font-cinzel font-bold uppercase mb-2">
                            <FileText className="w-3.5 h-3.5 text-[#FFE259]" />
                            <span>Payment Summary</span>
                          </div>
                          <div className="flex justify-between text-[#A69B80]">
                            <span>Subtotal</span>
                            <span className="text-white">{formatPrice(order.subtotal)}</span>
                          </div>
                          {order.discount > 0 && (
                            <div className="flex justify-between text-[#25D366]">
                              <span>VIP Privilege Discount</span>
                              <span>-{formatPrice(order.discount)}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-[#A69B80]">
                            <span>Express Shipping Across India</span>
                            <span className="text-[#25D366] font-bold">FREE (Complimentary)</span>
                          </div>
                          <div className="pt-2 border-t border-[#D4AF37]/20 flex justify-between items-baseline">
                            <span className="font-cinzel text-white uppercase font-bold">Total Paid</span>
                            <span className="font-cinzel text-base font-bold text-gold-gradient">
                              {formatPrice(order.total)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Order Action Buttons */}
                      <div className="pt-3 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-xs text-[#8C826B]">
                          <ShieldCheck className="w-4 h-4 text-[#25D366]" />
                          <span>7-Day Pan-India Size Exchange Guarantee</span>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <button
                            onClick={(e) => handleDownloadInvoice(order, e)}
                            disabled={downloadingInvoice === order.id}
                            className="px-4 py-2 rounded-lg bg-[#1D190F] border border-[#D4AF37]/40 text-[#E5C158] hover:text-white hover:border-[#FFE259] text-xs font-cinzel font-semibold tracking-wider flex items-center gap-1.5 cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>{downloadingInvoice === order.id ? 'Generating...' : 'GST Invoice'}</span>
                          </button>

                          <button
                            onClick={(e) => handleWhatsAppHelp(order, e)}
                            className="px-4 py-2 rounded-lg bg-[#0F2615] border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-black text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp Support</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-[#D4AF37]/20 bg-[#0E0C07] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#A69B80]">
            <MapPin className="w-3.5 h-3.5 text-[#FFE259]" />
            <span>Serving 28,000+ Indian Pincodes with Blue Dart & Delhivery Express</span>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-gold-btn text-black font-cinzel text-xs font-bold uppercase tracking-wider shadow-md hover:scale-105 transition-all cursor-pointer"
          >
            Continue Shopping Drops
          </button>
        </div>
      </motion.div>
    </div>
  );
};
