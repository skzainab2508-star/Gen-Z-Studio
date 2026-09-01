/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryShowcase } from './components/CategoryShowcase';
import { FeaturedProducts } from './components/FeaturedProducts';
import { ProductDetailModal } from './components/ProductDetailModal';
import { LookbookSection } from './components/LookbookSection';
import { BrandStory } from './components/BrandStory';
import { InstagramStrip } from './components/InstagramStrip';
import { StoreLocation } from './components/StoreLocation';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { MyOrdersModal } from './components/MyOrdersModal';
import { CustomerAuthModal } from './components/CustomerAuthModal';
import { Footer } from './components/Footer';
import { Product, ProductCategory, CartItem, AuthMode } from './types';
import { PRODUCTS } from './data/products';

export default function App() {
  // Cart state with persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('genz_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state with persistence
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('genz_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Active Category & Filter states
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Drawers
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isInstagramModalOpen, setIsInstagramModalOpen] = useState<boolean>(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [authInitialMode, setAuthInitialMode] = useState<AuthMode>('login');

  const handleOpenAuth = (mode: AuthMode = 'login') => {
    setAuthInitialMode(mode);
    setIsAuthOpen(true);
  };

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('genz_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('genz_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  // Cart operations
  const handleAddToCart = (
    product: Product,
    selectedColor: string,
    selectedSize: string,
    quantity: number = 1
  ) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      const newItem: CartItem = {
        id: `${product.id}-${selectedColor}-${selectedSize}-${Date.now()}`,
        product,
        selectedColor,
        selectedSize,
        quantity,
      };
      return [...prev, newItem];
    });
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist toggle
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  // Category select with smooth scroll
  const handleSelectCategory = (cat: ProductCategory) => {
    setActiveCategory(cat);
    const element = document.getElementById('products-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1814] flex flex-col font-sans selection:bg-[#B88E38] selection:text-white">
      
      {/* 1. Luxury Navbar with Announcement Bar & User Orders Menu */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onSelectCategory={handleSelectCategory}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenInstagramModal={() => setIsInstagramModalOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onOpenAuth={handleOpenAuth}
      />

      {/* 2. Full-bleed Hero Section with 3D Spotlight Gold Billboard & Category Plaques */}
      <Hero
        onSelectCategory={handleSelectCategory}
        onShopNow={() => handleSelectCategory('all')}
      />

      {/* 3. Category Showcase (4 tiles matching logo icons: Sneakers/Footwear, Polo/Apparel, Caps, Watches) */}
      <CategoryShowcase
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* 4. Featured Products Catalog with Filters, Search, Sort & Quick View */}
      <FeaturedProducts
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onQuickView={(p) => setQuickViewProduct(p)}
        onAddToCart={(p, color, size) => handleAddToCart(p, color, size, 1)}
        wishlistIds={wishlistIds}
        onToggleWishlist={handleToggleWishlist}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 5. Editorial Lookbook Carousel */}
      <LookbookSection
        onExploreCollection={handleSelectCategory}
      />

      {/* 6. About / Brand Story & Mumbai Atelier Manifesto */}
      <BrandStory />

      {/* 7. Instagram Feed Strip & @genzstudio2026 QR Code Card */}
      <InstagramStrip
        isModalOpen={isInstagramModalOpen}
        onCloseModal={() => setIsInstagramModalOpen(false)}
        onOpenModal={() => setIsInstagramModalOpen(true)}
      />

      {/* 8. Store Location, Hours, WhatsApp Concierge & Interactive Dark Map */}
      <StoreLocation />

      {/* 9. Luxury Footer with VIP Guild Newsletter & Payment Badges */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onOpenInstagramModal={() => setIsInstagramModalOpen(true)}
        onOpenAuth={handleOpenAuth}
        onOpenOrders={() => setIsOrdersOpen(true)}
      />

      {/* MODAL 1: Product Quick View & Detail */}
      <ProductDetailModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* DRAWER 1: Shopping Bag / Cart Slide-out */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* DRAWER 2: Wishlist Slide-out */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={(p, c, s) => handleAddToCart(p, c, s, 1)}
        onQuickView={(p) => setQuickViewProduct(p)}
      />

      {/* MODAL 2: Full Luxury Checkout & Receipt */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderSuccess={handleClearCart}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onOpenAuth={handleOpenAuth}
      />

      {/* MODAL 3: Instant Catalog Search */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      {/* MODAL 4: My Orders & Real-Time Tracking History */}
      <MyOrdersModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        onShopNow={() => {
          setIsOrdersOpen(false);
          handleSelectCategory('all');
        }}
      />

      {/* MODAL 5: Customer Registration & Login Authentication */}
      <CustomerAuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authInitialMode}
        onOpenOrders={() => {
          setIsAuthOpen(false);
          setIsOrdersOpen(true);
        }}
      />

    </div>
  );
}

