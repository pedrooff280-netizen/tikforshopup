import React from 'react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TrendingUp, ShoppingBag, Package, CheckCircle2, Clock, Truck } from 'lucide-react';
import type { Supplier } from '../types';

interface DashboardProps {
  suppliers: Supplier[];
}

const COLORS = ['#FF0050', '#00D084', '#B4D455', '#FF4D8D', '#50E3C2'];

const DELIVERY_DATA = [
  { name: 'Entregues', value: 450, color: '#00D084' },
  { name: 'Em Trânsito', value: 300, color: '#B4D455' },
  { name: 'Pendentes', value: 120, color: '#FF0050' },
];

const Dashboard: React.FC<DashboardProps> = ({ suppliers }) => {
  const allProducts = suppliers.flatMap(s => s.products.map(p => ({ ...p, supplierName: s.name })));
  
  const nicheData = suppliers.reduce((acc: any[], s) => {
    const existing = acc.find(item => item.name === s.niche);
    if (existing) {
      existing.value += s.products.length;
    } else {
      acc.push({ name: s.niche, value: s.products.length });
    }
    return acc;
  }, []);

  const totalSales = allProducts.reduce((acc, p) => acc + parseInt(p.sold?.replace('.', '') || '0'), 0);

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <header className="mb-10">
        <h1 className="text-2xl font-display font-bold text-gray-900">Painel Geral</h1>
        <p className="text-gray-500 text-sm">Visão consolidada da sua operação TikTok Shop</p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Vendas Totais', value: totalSales.toLocaleString(), icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Total de Produtos', value: allProducts.length, icon: ShoppingBag, color: 'text-[#6a802a]', bg: 'bg-[#B4D455]/10' },
          { label: 'Pedidos Ativos', value: '870', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Comissão Média', value: '18.5%', icon: CheckCircle2, color: 'text-[#B4D455]', bg: 'bg-[#B4D455]/10' },
        ].map((kpi, idx) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
          >
            <div className={`w-10 h-10 ${kpi.bg} rounded-xl flex items-center justify-center mb-4`}>
              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{kpi.label}</p>
            <h3 className="text-xl font-bold text-gray-900">{kpi.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Delivery Status Chart */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Truck className="w-4 h-4 text-blue-500" /> Status de Entrega
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DELIVERY_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {DELIVERY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Niche Distribution Chart */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#B4D455]" /> Produtos por Nicho
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={nicheData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {nicheData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* All Products List */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-bold text-gray-900">Todos os Produtos</h3>
          <span className="text-[10px] bg-gray-50 text-gray-500 px-2 py-1 rounded-lg font-bold">
            {allProducts.length} TOTAL
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                <th className="px-6 py-4">Produto</th>
                <th className="px-6 py-4">Fornecedor</th>
                <th className="px-6 py-4">Nicho</th>
                <th className="px-6 py-4">Crescimento</th>
                <th className="px-6 py-4 text-right">Vendidos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {allProducts.map((product, idx) => (
                <tr key={idx} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <ShoppingBag className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                      <span className="text-sm font-bold text-gray-900 truncate max-w-[200px]">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-gray-500">{product.supplierName}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{product.niche}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold ${product.growth?.startsWith('-') ? 'text-red-500' : 'text-[#00D084]'}`}>
                      {product.growth}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-black text-gray-900 tabular-nums">{product.sold}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
