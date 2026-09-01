import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  Instagram, 
  MessageCircle, 
  Sparkles,
  MapPin,
  ChevronRight,
  Package,
  Truck,
  ChevronDown,
  Volume2,
  VolumeX,
  Tag,
  LogOut
} from 'lucide-react';
import { ProductCategory, CustomerUser, AuthMode } from '../types';
import { STORE_INFO } from '../data/products';
import { getStoredOrders } from '../utils/ordersStorage';
import { getCurrentUser, logoutCustomer } from '../utils/authStorage';
import { playLuxuryClick, playSoftWoosh, isSoundEnabled, toggleSound } from '../utils/audio';
import { formatPrice } from '../utils/currency';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onSelectCategory: (category: ProductCategory) => void;
  onOpenSearch: () => void;
  onOpenInstagramModal: () => void;
  onOpenOrders: () => void;
  onOpenAuth: (mode?: AuthMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onSelectCategory,
  onOpenSearch,
  onOpenInstagramModal,
  onOpenOrders,
  onOpenAuth,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [orderCount, setOrderCount] = useState(0);
  const [currentUser, setCurrentUser] = useState<CustomerUser | null>(null);
  const [soundOn, setSoundOn] = useState(true);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSoundOn(isSoundEnabled());
    setCurrentUser(getCurrentUser());
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleAuthChange = (e: CustomEvent) => {
      setCurrentUser(e.detail);
    };
    window.addEventListener('genz-auth-updated' as any, handleAuthChange);
    return () => window.removeEventListener('genz-auth-updated' as any, handleAuthChange);
  }, []);


  useEffect(() => {
    const syncOrders = () => {
      const stored = getStoredOrders();
      setOrderCount(stored.length);
    };
    syncOrders();
    window.addEventListener('genz-orders-updated', syncOrders);
    return () => window.removeEventListener('genz-orders-updated', syncOrders);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
  };

  const scrollToSection = (id: string) => {
    playLuxuryClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (cat: ProductCategory) => {
    playLuxuryClick();
    setMobileMenuOpen(false);
    onSelectCategory(cat);
    const element = document.getElementById('products-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Announcement Bar - Soft Champagne Tone */}
      <div className="bg-[#1C1814] text-[#F5E6C8] text-[11px] sm:text-xs py-2 px-4 font-montserrat tracking-wider flex items-center justify-between z-50 relative border-b border-[#B88E38]/20">
        <div className="hidden md:flex items-center gap-4 text-[#D8CEBA]">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#DFBE6F]" /> Bandra West Atelier, Mumbai
          </span>
          <span>•</span>
          <span className="text-[#25D366] font-medium flex items-center gap-1">
            <Truck className="w-3.5 h-3.5" /> Express Delivery In India Only
          </span>
        </div>

        <div className="mx-auto md:mx-0 flex items-center gap-2">
          <Sparkles className="w-3 h-3 text-[#DFBE6F] animate-spin" style={{ animationDuration: '6s' }} />
          <span className="font-semibold text-white/95 tracking-wide">
            EXPRESS DELIVERY ACROSS INDIA ONLY • COMPLIMENTARY ON ORDERS OVER ₹15,000
          </span>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a 
            href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=Hello%20Gen%27Z%20Studio%20VIP%20Concierge`}
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => playLuxuryClick()}
            className="flex items-center gap-1 text-[#DFBE6F] hover:text-[#FFF2A3] transition-colors cursor-pointer text-xs"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>VIP WhatsApp Desk</span>
          </a>
        </div>
      </div>

      {/* Main Luxury Header - Soft Ivory Background */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md py-3 border-b border-[#E5DEC9] shadow-[0_4px_25px_rgba(28,24,20,0.06)]' 
            : 'bg-[#FAF7F2] py-4 border-b border-[#EBE4D5]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Mobile Menu Toggle & Search */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => {
                playSoftWoosh();
                setMobileMenuOpen(true);
              }}
              className="p-2 rounded-xl text-[#1C1814] hover:bg-[#EFE9DF] transition-colors cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              onClick={() => {
                playSoftWoosh();
                onOpenSearch();
              }}
              className="p-2 rounded-xl text-[#6B6258] hover:text-[#B88E38] hover:bg-[#EFE9DF] transition-colors cursor-pointer"
              aria-label="Search collection"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* BRAND LOGO */}
          <div 
            onClick={() => {
              playLuxuryClick();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="cursor-pointer flex flex-col items-center select-none group"
          >
            <div className="flex items-baseline gap-1">
              <span className="font-script text-3xl sm:text-4xl md:text-5xl text-gold-gradient tracking-tight drop-shadow-[0_2px_4px_rgba(184,142,56,0.2)] group-hover:scale-105 transition-transform duration-300">
                Gen'Z
              </span>
            </div>
            <div className="flex items-center gap-1.5 -mt-1 sm:-mt-2">
              <div className="h-[1px] w-3 sm:w-5 bg-gradient-to-r from-transparent to-[#B88E38]" />
              <span className="font-cinzel text-[9px] sm:text-[11px] font-bold tracking-[0.35em] text-[#8A641A] uppercase">
                STUDIO
              </span>
              <div className="h-[1px] w-3 sm:w-5 bg-gradient-to-l from-transparent to-[#B88E38]" />
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            <button
              onClick={() => handleCategoryClick('all')}
              className="text-xs font-cinzel tracking-[0.18em] uppercase text-[#3D352E] hover:text-[#B88E38] transition-colors cursor-pointer py-1 relative group font-medium"
            >
              All Drops
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#B88E38] transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => handleCategoryClick('footwear')}
              className="text-xs font-cinzel tracking-[0.18em] uppercase text-[#3D352E] hover:text-[#B88E38] transition-colors cursor-pointer py-1 relative group font-medium"
            >
              Footwear
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#B88E38] transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => handleCategoryClick('apparel')}
              className="text-xs font-cinzel tracking-[0.18em] uppercase text-[#3D352E] hover:text-[#B88E38] transition-colors cursor-pointer py-1 relative group font-medium"
            >
              Apparel
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#B88E38] transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => handleCategoryClick('caps')}
              className="text-xs font-cinzel tracking-[0.18em] uppercase text-[#3D352E] hover:text-[#B88E38] transition-colors cursor-pointer py-1 relative group font-medium"
            >
              Caps
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#B88E38] transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => handleCategoryClick('watches')}
              className="text-xs font-cinzel tracking-[0.18em] uppercase text-[#3D352E] hover:text-[#B88E38] transition-colors cursor-pointer py-1 relative group font-medium"
            >
              Watches & Jewelry
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#B88E38] transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => scrollToSection('lookbook-section')}
              className="text-xs font-cinzel tracking-[0.18em] uppercase text-[#3D352E] hover:text-[#B88E38] transition-colors cursor-pointer py-1 relative group font-medium"
            >
              Lookbook
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#B88E38] transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => scrollToSection('about-section')}
              className="text-xs font-cinzel tracking-[0.18em] uppercase text-[#3D352E] hover:text-[#B88E38] transition-colors cursor-pointer py-1 relative group font-medium"
            >
              Brand Story
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#B88E38] transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => scrollToSection('location-section')}
              className="text-xs font-cinzel tracking-[0.18em] uppercase text-[#3D352E] hover:text-[#B88E38] transition-colors cursor-pointer py-1 relative group font-medium"
            >
              Mumbai Atelier
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#B88E38] transition-all duration-300 group-hover:w-full" />
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Sound Effects Toggle Button */}
            <button
              onClick={handleSoundToggle}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                soundOn
                  ? 'bg-[#F2ECE1] border-[#B88E38]/40 text-[#8A641A] hover:bg-[#EAE1D2]'
                  : 'bg-[#F7F4ED] border-[#D9D0C1] text-[#9C9284] hover:text-[#1C1814]'
              }`}
              title={soundOn ? 'Atelier UI Audio Enabled (Click to Mute)' : 'Atelier UI Audio Muted (Click to Enable)'}
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-[#8A641A]" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Desktop Search Button */}
            <button
              onClick={() => {
                playSoftWoosh();
                onOpenSearch();
              }}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E0D8C7] text-[#6B6258] hover:text-[#8A641A] hover:border-[#B88E38] transition-all text-xs shadow-sm cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-[#8A641A]" />
              <span>Search studio...</span>
            </button>

            {/* USER PROFILE & ORDERS MENU DROPDOWN */}
            <div className="relative" ref={userMenuRef}>
              {currentUser ? (
                <button
                  onClick={() => {
                    playLuxuryClick();
                    setUserMenuOpen(!userMenuOpen);
                  }}
                  className="relative flex items-center gap-1.5 p-2 sm:px-3 sm:py-1.5 rounded-full bg-[#FFFFFF] border border-[#E0D8C7] text-[#1C1814] hover:border-[#B88E38] transition-all cursor-pointer shadow-sm"
                  title="Atelier VIP Account"
                >
                  <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#997A15] to-[#DFBE6F] flex items-center justify-center text-white text-[10px] font-bold">
                    {currentUser.avatarLetter || currentUser.fullName.charAt(0)}
                  </div>
                  <span className="hidden sm:inline text-xs font-cinzel tracking-wider font-semibold max-w-[90px] truncate">
                    {currentUser.fullName.split(' ')[0]}
                  </span>
                  <ChevronDown className={`w-3 h-3 text-[#8A641A] transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                  {orderCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#1B6A3E] text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                      {orderCount}
                    </span>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => {
                    playSoftWoosh();
                    onOpenAuth('login');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E0D8C7] text-[#8A641A] hover:border-[#B88E38] hover:bg-[#FAF5EB] transition-all text-xs font-cinzel font-bold tracking-wider cursor-pointer shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#8A641A]" />
                  <span>Sign In</span>
                </button>
              )}

              {/* User Dropdown Menu Card */}
              <AnimatePresence>
                {userMenuOpen && currentUser && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#FFFFFF] border border-[#E5DEC9] shadow-[0_15px_40px_rgba(28,24,20,0.12),0_0_15px_rgba(184,142,56,0.08)] py-2 z-50 overflow-hidden"
                  >
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-[#F0EBE0] bg-[#FAF7F2]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#997A15] to-[#DFBE6F] flex items-center justify-center text-white font-bold text-xs">
                            {currentUser.avatarLetter || currentUser.fullName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-cinzel text-xs font-bold text-[#1C1814] truncate max-w-[130px]">
                              {currentUser.fullName}
                            </p>
                            <p className="text-[10px] text-[#8A641A] flex items-center gap-1 font-medium">
                              <Sparkles className="w-2.5 h-2.5" /> {currentUser.membershipTier}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] font-cinzel uppercase text-[#8C8274] block">Credits</span>
                          <span className="text-[11px] font-bold text-[#8A641A]">{formatPrice(currentUser.credits)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-1.5 space-y-0.5">
                      <button
                        onClick={() => {
                          playSoftWoosh();
                          setUserMenuOpen(false);
                          onOpenAuth('profile');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#F7F4EE] text-left text-xs font-cinzel tracking-wider text-[#1C1814] hover:text-[#8A641A] transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-[#8A641A]" />
                        <span className="font-semibold">Atelier VIP Profile</span>
                      </button>

                      <button
                        onClick={() => {
                          playSoftWoosh();
                          setUserMenuOpen(false);
                          onOpenOrders();
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#F7F4EE] text-left text-xs font-cinzel tracking-wider text-[#1C1814] hover:text-[#8A641A] transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-2.5">
                          <Package className="w-4 h-4 text-[#8A641A]" />
                          <span className="font-semibold">My Orders & Tracking</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-[#EBF5EE] text-[#1B6A3E] border border-[#1B6A3E]/30 text-[10px] font-mono font-bold">
                          {orderCount} Orders
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          playSoftWoosh();
                          setUserMenuOpen(false);
                          onOpenAuth('register');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#F7F4EE] text-left text-xs text-[#5C5248] hover:text-[#1C1814] transition-colors cursor-pointer"
                      >
                        <Tag className="w-4 h-4 text-[#B88E38]" />
                        <span>Register New Account</span>
                      </button>

                      <a
                        href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=Hello%20VIP%20Concierge,%20I%20am%20${encodeURIComponent(currentUser.fullName)}%20(${encodeURIComponent(currentUser.membershipTier)}).`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playLuxuryClick()}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#F7F4EE] text-left text-xs text-[#5C5248] hover:text-[#1B6A3E] transition-colors"
                      >
                        <MessageCircle className="w-4 h-4 text-[#25D366]" />
                        <span>VIP Concierge Support</span>
                      </a>

                      <button
                        onClick={() => {
                          playLuxuryClick();
                          logoutCustomer();
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#FFF1F0] text-left text-xs text-[#CF1322] transition-colors cursor-pointer"
                      >
                        <VolumeX className="w-4 h-4 text-[#CF1322] opacity-0" />
                        <span>Sign Out of Atelier</span>
                      </button>
                    </div>

                    {/* Bottom Privileges Note */}
                    <div className="px-4 py-2 bg-[#FAF7F2] border-t border-[#F0EBE0] text-[10px] text-[#7A7064] flex items-center justify-between">
                      <span>⚡ Blue Dart Express</span>
                      <span className="font-semibold text-[#8A641A]">{currentUser.city || 'Mumbai'}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Direct My Orders Button (Desktop shortcut) */}
            <button
              onClick={() => {
                playSoftWoosh();
                onOpenOrders();
              }}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E0D8C7] text-[#1C1814] hover:text-[#8A641A] hover:border-[#B88E38] transition-all text-xs font-cinzel font-medium cursor-pointer shadow-sm"
              title="View your orders and track live"
            >
              <Package className="w-3.5 h-3.5 text-[#8A641A]" />
              <span>My Orders</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => {
                playSoftWoosh();
                onOpenWishlist();
              }}
              className="relative p-2 rounded-full bg-[#FFFFFF] border border-[#E0D8C7] text-[#1C1814] hover:text-[#8A641A] hover:border-[#B88E38] transition-all cursor-pointer shadow-sm"
              title="View Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#B88E38] text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={() => {
                playSoftWoosh();
                onOpenCart();
              }}
              className="relative flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gold-btn text-white font-cinzel font-bold text-xs tracking-wider shadow-[0_4px_15px_rgba(184,142,56,0.3)] hover:scale-105 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              <span className="hidden sm:inline">Bag</span>
              <span className="w-5 h-5 rounded-full bg-[#1C1814] text-[#DFBE6F] text-[11px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 left-0 w-[85%] max-w-sm bg-[#FAF7F2] border-r border-[#E5DEC9] z-50 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#E5DEC9]">
                  <div className="flex items-baseline gap-1">
                    <span className="font-script text-3xl text-gold-gradient">Gen'Z</span>
                    <span className="font-cinzel text-xs font-bold text-[#8A641A] tracking-widest uppercase ml-1">Studio</span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full bg-[#EDE6D8] text-[#1C1814]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile User Profile Section */}
                <div className="py-4 border-b border-[#E5DEC9]">
                  {currentUser ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-[#FFFFFF] border border-[#E0D8C7] shadow-sm">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#997A15] to-[#DFBE6F] flex items-center justify-center text-white font-bold text-xs">
                            {currentUser.avatarLetter || currentUser.fullName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-cinzel text-xs font-bold text-[#1C1814] truncate max-w-[120px]">
                              {currentUser.fullName}
                            </p>
                            <p className="text-[10px] text-[#8A641A] font-medium">{currentUser.membershipTier}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            playSoftWoosh();
                            setMobileMenuOpen(false);
                            onOpenAuth('profile');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-gold-btn text-white text-[10px] font-cinzel font-bold uppercase tracking-wider"
                        >
                          Profile
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => {
                            playSoftWoosh();
                            setMobileMenuOpen(false);
                            onOpenOrders();
                          }}
                          className="p-2 rounded-xl bg-white border border-[#E0D8C7] text-left text-xs font-cinzel font-semibold text-[#1C1814] flex items-center gap-1.5"
                        >
                          <Package className="w-3.5 h-3.5 text-[#8A641A]" />
                          <span>Orders ({orderCount})</span>
                        </button>
                        <button
                          onClick={() => {
                            playLuxuryClick();
                            logoutCustomer();
                            setMobileMenuOpen(false);
                          }}
                          className="p-2 rounded-xl bg-[#FFF1F0] border border-[#FFCCC7] text-left text-xs font-cinzel font-semibold text-[#CF1322] flex items-center gap-1.5"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E0D8C7] shadow-sm space-y-2">
                      <p className="text-xs font-cinzel font-bold text-[#1C1814]">Atelier Customer Portal</p>
                      <p className="text-[11px] text-[#6B6258]">Sign in or register to track orders & claim ₹2,000 credit.</p>
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          onClick={() => {
                            playSoftWoosh();
                            setMobileMenuOpen(false);
                            onOpenAuth('login');
                          }}
                          className="py-2 rounded-xl bg-white border border-[#B88E38] text-[#8A641A] text-xs font-cinzel font-bold uppercase"
                        >
                          Sign In
                        </button>
                        <button
                          onClick={() => {
                            playSoftWoosh();
                            setMobileMenuOpen(false);
                            onOpenAuth('register');
                          }}
                          className="py-2 rounded-xl bg-gold-btn text-white text-xs font-cinzel font-bold uppercase"
                        >
                          Register
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      playSoftWoosh();
                      setMobileMenuOpen(false);
                      onOpenOrders();
                    }}
                    className="w-full mt-2 flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#EBF5EE] border border-[#1B6A3E]/30 text-xs text-[#1B6A3E]"
                  >
                    <span className="flex items-center gap-2 font-medium">
                      <Truck className="w-4 h-4" />
                      Express Delivery Across India Only
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Category Links */}
                <div className="py-4 space-y-3">
                  <p className="text-[10px] font-montserrat uppercase tracking-[0.2em] text-[#7A7064]">
                    Studio Categories
                  </p>
                  
                  <button
                    onClick={() => handleCategoryClick('all')}
                    className="w-full flex items-center justify-between text-left py-1.5 text-sm font-cinzel tracking-wider text-[#1C1814] hover:text-[#8A641A]"
                  >
                    <span>All Collections</span>
                    <ChevronRight className="w-4 h-4 text-[#B88E38]" />
                  </button>
                  <button
                    onClick={() => handleCategoryClick('footwear')}
                    className="w-full flex items-center justify-between text-left py-1.5 text-sm font-cinzel tracking-wider text-[#1C1814] hover:text-[#8A641A]"
                  >
                    <span>Footwear & Sneakers</span>
                    <ChevronRight className="w-4 h-4 text-[#B88E38]" />
                  </button>
                  <button
                    onClick={() => handleCategoryClick('apparel')}
                    className="w-full flex items-center justify-between text-left py-1.5 text-sm font-cinzel tracking-wider text-[#1C1814] hover:text-[#8A641A]"
                  >
                    <span>Polos & Apparel</span>
                    <ChevronRight className="w-4 h-4 text-[#B88E38]" />
                  </button>
                  <button
                    onClick={() => handleCategoryClick('caps')}
                    className="w-full flex items-center justify-between text-left py-1.5 text-sm font-cinzel tracking-wider text-[#1C1814] hover:text-[#8A641A]"
                  >
                    <span>Caps & Headwear</span>
                    <ChevronRight className="w-4 h-4 text-[#B88E38]" />
                  </button>
                  <button
                    onClick={() => handleCategoryClick('watches')}
                    className="w-full flex items-center justify-between text-left py-1.5 text-sm font-cinzel tracking-wider text-[#1C1814] hover:text-[#8A641A]"
                  >
                    <span>Watches & Jewelry</span>
                    <ChevronRight className="w-4 h-4 text-[#B88E38]" />
                  </button>

                  <div className="pt-3 border-t border-[#E5DEC9] space-y-2.5">
                    <p className="text-[10px] font-montserrat uppercase tracking-[0.2em] text-[#7A7064]">
                      Brand & Atelier
                    </p>
                    <button
                      onClick={() => scrollToSection('lookbook-section')}
                      className="w-full text-left py-1 text-sm font-cinzel tracking-wider text-[#5C5248]"
                    >
                      Editorial Lookbook
                    </button>
                    <button
                      onClick={() => scrollToSection('about-section')}
                      className="w-full text-left py-1 text-sm font-cinzel tracking-wider text-[#5C5248]"
                    >
                      Brand Story & Mumbai Atelier
                    </button>
                    <button
                      onClick={() => scrollToSection('location-section')}
                      className="w-full text-left py-1 text-sm font-cinzel tracking-wider text-[#5C5248]"
                    >
                      Bandra Flagship Studio
                    </button>
                  </div>
                </div>
              </div>

              {/* Drawer Bottom Actions */}
              <div className="pt-4 border-t border-[#E5DEC9] space-y-2.5">
                <a
                  href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=Hi%20Gen%27Z%20Studio,%20I%20want%20to%20order%20from%20mobile.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#25D366] text-black font-semibold text-xs tracking-wider"
                >
                  <MessageCircle className="w-4 h-4" />
                  Order on WhatsApp
                </a>
                <button
                  onClick={() => {
                    playLuxuryClick();
                    setMobileMenuOpen(false);
                    onOpenInstagramModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#E0D8C7] text-[#8A641A] font-cinzel text-xs tracking-wider shadow-sm"
                >
                  <Instagram className="w-4 h-4" />
                  View Instagram QR Code
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

