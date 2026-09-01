import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { formatPrice } from '../utils/currency';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
    }
  }, [isOpen]);

  const results = searchTerm.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const quickCategories = ['Footwear', 'Polo', 'Velvet', 'Caps', 'Watches', 'Cuban Link'];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        className="relative w-full max-w-2xl bg-[#0E0D08] border-2 border-[#D4AF37]/50 rounded-2xl p-6 z-10 shadow-2xl"
      >
        {/* Search Bar Input */}
        <div className="relative">
          <input
            type="text"
            autoFocus
            placeholder="Search footwear, polos, caps, watches..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-10 py-3.5 rounded-xl bg-[#14120B] border border-[#D4AF37]/40 text-sm text-white placeholder-[#7A705B] focus:outline-none focus:border-[#FFE259] font-sans"
          />
          <Search className="w-5 h-5 text-[#FFE259] absolute left-3.5 top-1/2 -translate-y-1/2" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7A705B] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Search Tag Chips */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-[#8C826B] font-montserrat uppercase tracking-wider">
            Trending:
          </span>
          {quickCategories.map((chip) => (
            <button
              key={chip}
              onClick={() => setSearchTerm(chip)}
              className="px-2.5 py-1 rounded-full bg-[#18150D] border border-[#D4AF37]/20 text-[11px] text-[#D4CBB8] hover:border-[#FFE259] hover:text-[#FFE259] transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="mt-6 max-h-80 overflow-y-auto space-y-2">
          {searchTerm.trim() !== '' && results.length === 0 ? (
            <div className="text-center py-8 text-xs text-[#8C826B]">
              No products found matching "{searchTerm}". Try browsing categories.
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="flex items-center justify-between p-3 rounded-xl bg-[#14120B] border border-[#D4AF37]/20 hover:border-[#FFE259] hover:bg-[#1C180E] transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover bg-black"
                  />
                  <div>
                    <h4 className="font-cinzel text-xs font-bold text-white group-hover:text-[#FFE259] uppercase">
                      {product.name}
                    </h4>
                    <span className="text-[10px] text-[#A69B80] uppercase font-montserrat tracking-wider">
                      {product.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-cinzel text-xs font-bold text-gold-gradient">
                    {formatPrice(product.price)}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#A69B80] group-hover:text-[#FFE259] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};
