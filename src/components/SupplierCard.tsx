import React from 'react';
import { Star, Globe, Phone, ExternalLink, MoreHorizontal, MessageSquare, Link as LinkIcon } from 'lucide-react';
import { motion } from 'motion/react';
import type { Supplier } from '../types';

interface SupplierCardProps {
  supplier: Supplier;
  index: number;
  onClick: (supplier: Supplier) => void;
}

const SupplierCard: React.FC<SupplierCardProps> = ({ supplier, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      onClick={() => onClick(supplier)}
      className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group relative cursor-pointer"
    >
      <div className="flex justify-between items-start mb-2">
        <span className="px-1.5 py-0.5 bg-[#B4D455]/20 text-[#6a802a] text-[8px] font-bold rounded uppercase">
          {supplier.commission} COM.
        </span>
        <div className="flex items-center gap-1">
          <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
          <span className="text-[9px] font-bold text-gray-600">{supplier.rating}</span>
        </div>
      </div>

      <div className="mb-1.5">
        <h3 className="text-xs font-bold text-gray-900 group-hover:text-[#6a802a] transition-colors truncate">{supplier.name}</h3>
        <p className="text-[9px] text-gray-400 font-medium uppercase tracking-wider">{supplier.niche}</p>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-50">
        <span className="text-[9px] text-gray-400">{supplier.location}</span>
        <span className="text-[8px] text-green-500 font-bold">{supplier.lastActive}</span>
      </div>
    </motion.div>
  );
};

export default SupplierCard;
