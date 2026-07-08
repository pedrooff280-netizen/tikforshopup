import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, ShoppingBag, Percent, Phone, Globe, Star, ChevronDown } from 'lucide-react';
import type { Supplier } from '../types';

interface SupplierDetailProps {
  supplier: Supplier | null;
  onClose: () => void;
}

const SupplierDetail: React.FC<SupplierDetailProps> = ({ supplier, onClose }) => {
  if (!supplier) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col min-h-screen bg-[#F9FAFB] text-gray-900"
    >
      {/* Top Navigation Bar */}
      <div className="p-6 md:p-8 flex items-center justify-between max-w-7xl mx-auto w-full sticky top-0 bg-[#F9FAFB]/80 backdrop-blur-md z-20 border-b border-gray-100">
        <div className="flex items-center gap-6">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 hover:text-gray-900"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#B4D455] animate-pulse shadow-[0_0_8px_rgba(180,212,85,0.4)]" />
            <h2 className="text-xl font-display font-bold tracking-tight flex items-center gap-4">
              Top Produtos {supplier.name}
              <span className="text-[9px] bg-green-50 text-green-600 border border-green-100 px-2 py-0.5 rounded-full font-bold tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                AO VIVO
              </span>
            </h2>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="text-xs font-bold text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-2 group"
        >
          Voltar para fornecedores
          <ChevronDown className="w-3 h-3 -rotate-90 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Main List Container */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-8 py-4">
        <div className="flex items-center justify-between text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 px-5">
          <span className="flex-1">PRODUTO & NICHO</span>
          <span className="w-32 text-center">CRESCIMENTO (24H)</span>
          <span className="w-24 text-right">VENDIDOS</span>
        </div>

        <div className="space-y-1.5">
          {supplier.products.map((product, idx) => (
            <motion.a
              key={idx}
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.02, duration: 0.2 }}
              className="flex items-center gap-4 p-2.5 rounded-xl bg-white border border-gray-100 hover:border-[#B4D455]/20 hover:shadow-md hover:shadow-gray-200/20 transition-all group"
            >
              {/* Product Image */}
              <div className="w-11 h-11 rounded-lg bg-gray-50 overflow-hidden flex-shrink-0 border border-gray-100">
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-gray-200" />
                  </div>
                )}
              </div>
              
              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-[13px] font-bold text-gray-900 truncate group-hover:text-[#6a802a] transition-colors leading-tight">
                  {product.name}
                </h4>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{product.niche || supplier.niche}</p>
              </div>

              {/* Growth Stats */}
              <div className="w-32 flex flex-col items-center">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-end gap-0.5 h-3">
                    {[0.4, 0.7, 0.5, 0.9, 0.6].map((h, i) => (
                      <div 
                        key={i} 
                        className={`w-0.5 rounded-full ${product.growth?.startsWith('-') ? 'bg-red-400/20' : 'bg-[#00D084]/20'}`} 
                        style={{ height: `${h * 100}%` }} 
                      />
                    ))}
                  </div>
                  <span className={`text-[13px] font-black ${product.growth?.startsWith('-') ? 'text-red-500' : 'text-[#00D084]'}`}>
                    {product.growth || '+0%'}
                  </span>
                </div>
              </div>

              {/* Sales Count */}
              <div className="w-24 text-right">
                <span className="text-sm font-black text-gray-900 tracking-tight tabular-nums">{product.sold || '0'}</span>
              </div>
            </motion.a>
          ))}
          
          {supplier.products.length === 0 && (
            <div className="py-20 text-center">
              <ShoppingBag className="w-10 h-10 text-gray-100 mx-auto mb-4" />
              <p className="text-gray-400 text-sm font-medium">Nenhum produto cadastrado ainda.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SupplierDetail;
