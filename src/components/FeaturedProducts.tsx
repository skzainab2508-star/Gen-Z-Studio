import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Filter, 
  SlidersHorizontal, 
  Search, 
  Sparkles, 
  ArrowUpDown,
  Check
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';
import { playLuxuryClick } from '../utils/audio';

interface FeaturedProductsProps {
  activeCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, selectedColor: string, selectedSize: string) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  activeCategory,
  onSelectCategory,
  onQuickView,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  searchQuery,
  onSearchChange,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high' | 'rating'>('popular');

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Collections' },
    { id: 'footwear', label: 'Footwear' },
    { id: 'apparel', label: 'Polos & Apparel' },
    { id: 'caps', label: 'Caps & Headwear' },
    { id: 'watches', label: 'Watches & Jewelry' },
  ];

  const tagFilters = ['ALL', 'NEW DROP', 'BESTSELLER', 'LIMITED EDITION', 'EXCLUSIVE'];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category Filter
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }
      // Tag Filter
      if (selectedTag !== 'ALL' && product.tag !== selectedTag) {
        return false;
      }
      // Search Query Filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchDesc = product.description.toLowerCase().includes(q);
        const matchCategory = product.category.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchCategory) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [activeCategory, selectedTag, searchQuery, sortBy]);

  return (
    <section id="products-section" className="py-16 sm:py-24 bg-[#FAF7F2] relative px-4 sm:px-6 lg:px-8 border-t border-[#EAE3D3]">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#E0D8C7] gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EB] border border-[#E0D8C7] text-[#8A641A] text-[11px] font-montserrat tracking-[0.25em] uppercase mb-2 font-bold">
              <Sparkles className="w-3 h-3 text-[#8A641A]" />
              <span>Studio Catalog</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#1C1814] tracking-wide uppercase">
              The Atelier Catalog
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#5C5348] max-w-lg">
              Precision tailored streetwear, architectural sneakers, and fine 24K electroplated jewelry.
            </p>
          </div>

          {/* Quick Search & Sort Bar */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search pieces..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-44 sm:w-56 pl-9 pr-3 py-2 rounded-xl bg-white border border-[#E0D8C7] text-xs text-[#1C1814] placeholder-[#9E9588] focus:outline-none focus:border-[#B88E38] shadow-sm"
              />
              <Search className="w-4 h-4 text-[#8A641A] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* Sort Select */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => {
                  playLuxuryClick();
                  setSortBy(e.target.value as any);
                }}
                className="pl-3 pr-8 py-2 rounded-xl bg-white border border-[#E0D8C7] text-xs font-cinzel tracking-wider text-[#8A641A] font-bold focus:outline-none focus:border-[#B88E38] appearance-none cursor-pointer shadow-sm"
              >
                <option value="popular">Featured Drops</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-[#8A641A] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* CATEGORY TABS (Footwear / Apparel / Caps / Watches / All) */}
        <div className="flex flex-wrap items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isCurrent = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  playLuxuryClick();
                  onSelectCategory(cat.id);
                }}
                className={`px-5 py-2 rounded-full font-cinzel text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  isCurrent
                    ? 'bg-gold-btn text-white shadow-[0_4px_14px_rgba(184,142,56,0.3)] scale-105 font-bold'
                    : 'bg-white text-[#5C5348] border border-[#E0D8C7] hover:border-[#8A641A] hover:text-[#8A641A]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* TAG SUB-FILTERS (New Drop / Bestseller / Limited Edition) */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 text-xs text-[#7A7064] pt-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-montserrat uppercase tracking-wider text-[10px] mr-1 text-[#7A7064] font-semibold">Filter:</span>
            {tagFilters.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  playLuxuryClick();
                  setSelectedTag(tag);
                }}
                className={`px-3 py-1 rounded-lg text-[11px] font-sans transition-colors cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-[#FAF5EB] border border-[#B88E38] text-[#8A641A] font-bold shadow-xs'
                    : 'bg-white text-[#7A7064] hover:text-[#1C1814] border border-[#E0D8C7]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="font-cinzel text-xs text-[#7A7064]">
            Showing <span className="text-[#8A641A] font-bold">{filteredProducts.length}</span> pieces
          </div>
        </div>

        {/* PRODUCT GRID */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center rounded-3xl bg-white border border-[#E0D8C7] p-8 shadow-sm">
            <SlidersHorizontal className="w-12 h-12 text-[#9E9588] mx-auto mb-4 opacity-60" />
            <h3 className="font-cinzel text-lg font-bold text-[#1C1814] uppercase">
              No Pieces Found
            </h3>
            <p className="text-xs text-[#7A7064] mt-2 max-w-sm mx-auto">
              We couldn't find any products matching your current filters or search terms.
            </p>
            <button
              onClick={() => {
                playLuxuryClick();
                onSelectCategory('all');
                setSelectedTag('ALL');
                onSearchChange('');
              }}
              className="mt-5 px-6 py-2 rounded-full bg-gold-btn text-white font-cinzel text-xs font-bold uppercase tracking-wider shadow-sm hover:scale-105 transition-all cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={onQuickView}
                  onAddToCart={onAddToCart}
                  isWishlisted={wishlistIds.includes(product.id)}
                  onToggleWishlist={onToggleWishlist}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </section>
  );
};
