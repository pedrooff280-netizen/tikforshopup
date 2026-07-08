/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Search, Bell, Plus, Filter, ListFilter, LayoutGrid, ChevronDown } from 'lucide-react';
import Sidebar from './components/Sidebar';
import SupplierCard from './components/SupplierCard';
import SupplierDetail from './components/SupplierDetail';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import type { Supplier } from './types';

const MOCK_SUPPLIERS: Supplier[] = [
  {
    id: '1',
    name: 'Magiani Boutique',
    niche: 'Vestuário Feminino',
    location: 'Brasil',
    phone: '+55 11 99999-9999',
    website: 'Sem Site',
    rating: 4.8,
    tags: ['Moda', 'Comissão 15%'],
    lastActive: 'Ativa agora',
    commission: '15%',
    products: [
      { 
        name: 'Vestido Feminino Indiano Estampado Longo', 
        link: 'https://vt.tiktok.com/ZS9YKydQpVK3j-TEi84/',
        niche: 'Moda',
        growth: '+417%',
        sold: '12.136',
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=100&h=100&fit=crop'
      },
      { 
        name: 'Vestido Feminino Longo Estampado Verão', 
        link: 'https://vt.tiktok.com/ZS9YKyYNV1b8L-tengC/',
        niche: 'Moda',
        growth: '+146%',
        sold: '68.012',
        image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=100&h=100&fit=crop'
      }
    ]
  },
  {
    id: '2',
    name: 'Sem costura',
    niche: 'Lingerie & Shapewear',
    location: 'Brasil',
    phone: '+55 11 98888-8888',
    website: 'Sem Site',
    rating: 4.9,
    tags: ['Underwear', 'Comissão 20%'],
    lastActive: '3h atrás',
    commission: '20%',
    products: [
      { 
        name: 'Calcinha Biquini Redutora Sem Costura', 
        link: 'https://vt.tiktok.com/ZS9YKyf5yeQho-IJnda/',
        niche: 'Moda',
        growth: '+56%',
        sold: '4.100',
        image: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?w=100&h=100&fit=crop'
      },
      { 
        name: 'Calcinha Fio Dental Redutora', 
        link: 'https://vt.tiktok.com/ZS9YKyHkd63At-7vjEY/',
        niche: 'Moda',
        growth: '+55%',
        sold: '1.800',
        image: 'https://images.unsplash.com/photo-1626497748470-0714131a6b0c?w=100&h=100&fit=crop'
      },
      { 
        name: 'Calcinha Boxer Redutora', 
        link: 'https://vt.tiktok.com/ZS9YKyxNAXpmN-wKvtq/',
        niche: 'Moda',
        growth: '-3%',
        sold: '11.128',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop'
      }
    ]
  },
  {
    id: '3',
    name: 'Midastime',
    niche: 'Modeladores & Fitness',
    location: 'Brasil',
    phone: '+55 11 97777-7777',
    website: 'Sem Site',
    rating: 4.7,
    tags: ['Fitness', 'Comissão 25%'],
    lastActive: '5h atrás',
    commission: '25%',
    products: [
      { 
        name: 'Up Shaper Bermuda Modeladora', 
        link: 'https://vt.tiktok.com/ZS9YKyW687peN-qdSkN/',
        niche: 'Moda',
        growth: '+88%',
        sold: '25.400',
        image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=100&h=100&fit=crop'
      },
      { 
        name: 'Body Shaper - Body Modelador Canelado', 
        link: 'https://vt.tiktok.com/ZS9YKyvjbGVbg-voGxh/',
        niche: 'Moda',
        growth: '+120%',
        sold: '15.200',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100&h=100&fit=crop'
      }
    ]
  },
  {
    id: '4',
    name: 'Bella Collection Moda',
    niche: 'Moda Feminina Suplex',
    location: 'Brasil',
    phone: '+55 11 96666-6666',
    website: 'Sem Site',
    rating: 4.8,
    tags: ['Moda', 'Comissão 20%'],
    lastActive: '1d atrás',
    commission: '20%',
    products: [
      { 
        name: 'Vestido Suplex Manga Longa Gola Alta', 
        link: 'https://vt.tiktok.com/ZS9YKfeYKCvwb-71YhZ/',
        niche: 'Moda',
        growth: '+210%',
        sold: '9.300',
        image: 'https://images.unsplash.com/photo-1539109132381-315123a421dd?w=100&h=100&fit=crop'
      },
      { 
        name: 'Vestido Feminino Suplex Elegante', 
        link: 'https://vt.tiktok.com/ZS9YKfLHydkXp-H7vDO/',
        niche: 'Moda',
        growth: '+45%',
        sold: '12.400',
        image: 'https://images.unsplash.com/photo-1494578379344-d6c710382a3d?w=100&h=100&fit=crop'
      },
      { 
        name: 'Conjunto feminino Saia e Cropped', 
        link: 'https://vt.tiktok.com/ZS9YKfkmDGx79-gIIjy/',
        niche: 'Moda',
        growth: '+15%',
        sold: '5.200',
        image: 'https://images.unsplash.com/photo-1515347619252-60a4bdad8886?w=100&h=100&fit=crop'
      },
      { 
        name: 'Vestido Feminino Amarração na Frente', 
        link: 'https://vt.tiktok.com/ZS9YKfDqwDC56-UtKLE/',
        niche: 'Moda',
        growth: '+30%',
        sold: '3.100',
        image: 'https://images.unsplash.com/photo-1495385794356-15371f348c31?w=100&h=100&fit=crop'
      },
      { 
        name: 'Body Recorte Vazado com Bojo', 
        link: 'https://vt.tiktok.com/ZS9YKfuyNKeaE-ON7YZ/',
        niche: 'Moda',
        growth: '+5%',
        sold: '2.800',
        image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=100&h=100&fit=crop'
      }
    ]
  },
  {
    id: '5',
    name: 'Rosa Vida',
    niche: 'Modeladores & Lingerie',
    location: 'Brasil',
    phone: '+55 11 95555-5555',
    website: 'Sem Site',
    rating: 4.6,
    tags: ['Lingerie', 'Comissão 20%'],
    lastActive: '2d atrás',
    commission: '20%',
    products: [
      { 
        name: 'Short Segunda Pele', 
        link: 'https://vt.tiktok.com/ZS9YKft3j7cJQ-wovjW/',
        niche: 'Moda',
        growth: '+22%',
        sold: '8.400',
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=100&h=100&fit=crop'
      },
      { 
        name: 'Shorts Modelador', 
        link: 'https://vt.tiktok.com/ZS9YKfcJKs9NU-f5Ooy/',
        niche: 'Moda',
        growth: '+18%',
        sold: '11.200',
        image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=100&h=100&fit=crop'
      },
      { 
        name: 'Cinta Elastique Feminina', 
        link: 'https://vt.tiktok.com/ZS9YKfKhoruUT-AVrdx/',
        niche: 'Moda',
        growth: '+12%',
        sold: '4.500',
        image: 'https://images.unsplash.com/photo-1520006403993-3bc637977422?w=100&h=100&fit=crop'
      }
    ]
  },
  {
    id: '6',
    name: 'Mond Store',
    niche: 'Vestidos Casuais',
    location: 'Brasil',
    phone: '+55 11 94444-4444',
    website: 'Sem Site',
    rating: 4.7,
    tags: ['Moda', 'Comissão 15%'],
    lastActive: '3d atrás',
    commission: '15%',
    products: [
      { 
        name: 'Vestido Feminino Soltinho Longo', 
        link: 'https://vt.tiktok.com/ZS9YKPLauRASL-VvZS3/',
        niche: 'Moda',
        growth: '+40%',
        sold: '14.200',
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=100&h=100&fit=crop'
      },
      { 
        name: 'Vestido Feminino Longo Decote', 
        link: 'https://vt.tiktok.com/ZS9YKPjgmrRsd-VwNX1/',
        niche: 'Moda',
        growth: '+35%',
        sold: '11.800',
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=100&h=100&fit=crop'
      }
    ]
  },
  {
    id: '7',
    name: 'Soft Hair Cosméticos',
    niche: 'Beleza & Cuidados Pessoais',
    location: 'Brasil',
    phone: '+55 11 93333-3333',
    website: 'https://softhair.com.br',
    rating: 4.9,
    tags: ['Cosméticos', 'Comissão 15%'],
    lastActive: 'Ativa agora',
    commission: '15%',
    products: [
      { 
        name: 'Creme Lisa Bumbum Bio Soft', 
        link: 'https://vt.tiktok.com/ZS9YKPHRFCkLE-7rrH5/',
        niche: 'Beleza',
        growth: '+500%',
        sold: '45.000',
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&h=100&fit=crop'
      },
      { 
        name: 'Creme Hidratante Lisa Pé', 
        link: 'https://vt.tiktok.com/ZS9YKP4Wc4Lc9-hUsLA/',
        niche: 'Beleza',
        growth: '+220%',
        sold: '32.100',
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=100&h=100&fit=crop'
      },
      { 
        name: 'Creme Lisa Clareador Rosa Mosqueta', 
        link: 'https://vt.tiktok.com/ZS9YKPq9Xo9f8-WWwYE/',
        niche: 'Beleza',
        growth: '+180%',
        sold: '18.900',
        image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=100&h=100&fit=crop'
      }
    ]
  },
];

export default function App() {
  const [user, setUser] = useState<{ handle: string, level: string } | null>(null);
  const [view, setView] = useState<'board' | 'list'>('board');
  const [activeTab, setActiveTab] = useState<string>('suppliers');
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  const handleNavigate = (tabId: string) => {
    setActiveTab(tabId);
    setSelectedSupplier(null); // Reset detail view when navigating
  };

  const handleLogin = (handle: string, level: string) => {
    setUser({ handle, level });
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar activeTab={activeTab} onNavigate={handleNavigate} user={user} />
      
      <main className="flex-1 ml-64 min-h-screen">
        {activeTab === 'dashboard' ? (
          <Dashboard suppliers={MOCK_SUPPLIERS} />
        ) : selectedSupplier ? (
          <SupplierDetail 
            supplier={selectedSupplier} 
            onClose={() => setSelectedSupplier(null)} 
          />
        ) : (
          <div className="p-8">
            {/* Header */}
            <header className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-display font-bold text-gray-900 flex items-center gap-2">
                  Fornecedores TikTok Shop
                  <ChevronDown className="w-5 h-5 text-gray-400 mt-1 cursor-pointer hover:text-gray-600" />
                </h1>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="Buscar fornecedores..." 
                    className="pl-10 pr-4 py-2 bg-white border border-gray-100 rounded-xl text-sm w-64 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all shadow-sm"
                  />
                </div>
                <button className="p-2 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-black transition-all shadow-sm">
                  <Bell className="w-5 h-5" />
                </button>
                <button className="bg-[#B4D455] text-black px-4 py-2 rounded-xl font-medium text-sm flex items-center gap-2 hover:bg-[#a3c14d] transition-colors shadow-sm">
                  <Plus className="w-4 h-4" />
                  Novo fornecedor
                </button>
              </div>
            </header>

            {/* View Switcher & Filters */}
            <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setView('board')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    view === 'board' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                  Quadro
                </button>
                <button 
                  onClick={() => setView('list')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    view === 'list' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <ListFilter className="w-4 h-4" />
                  Tabela
                </button>
              </div>

              <div className="flex items-center gap-4">
                <button className="text-gray-400 hover:text-gray-900 transition-colors">
                  <Search className="w-5 h-5" />
                </button>
                <button className="text-gray-400 hover:text-gray-900 transition-colors">
                  <Filter className="w-5 h-5" />
                </button>
                <button className="text-gray-400 hover:text-gray-900 transition-colors">
                  <ListFilter className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Supplier Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-400" />
                    <h2 className="text-sm font-semibold text-gray-700">Verificados</h2>
                    <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 rounded-full">{MOCK_SUPPLIERS.length}</span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {MOCK_SUPPLIERS.map((supplier, idx) => (
                    <SupplierCard 
                      key={supplier.id} 
                      supplier={supplier} 
                      index={idx} 
                      onClick={setSelectedSupplier}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-400" />
                    <h2 className="text-sm font-semibold text-gray-700">Em Negociação</h2>
                    <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 rounded-full">0</span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="h-32 border-2 border-dashed border-gray-100 rounded-2xl flex items-center justify-center">
                  <p className="text-xs text-gray-300">Arraste fornecedores para cá</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <h2 className="text-sm font-semibold text-gray-700">Parceiros</h2>
                    <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 rounded-full">0</span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="h-32 border-2 border-dashed border-gray-100 rounded-2xl flex items-center justify-center">
                  <p className="text-xs text-gray-300">Nenhum parceiro ainda</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
