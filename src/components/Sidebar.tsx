import { LayoutDashboard, Users, Calendar, MessageSquare, BarChart3, Settings, HelpCircle, LogOut, Search, Bell, Plus } from 'lucide-react';
import { motion } from 'motion/react';

const navItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Painel' },
  { id: 'suppliers', icon: Users, label: 'Fornecedores' },
  { id: 'messages', icon: MessageSquare, label: 'Mensagens' },
];

interface SidebarProps {
  activeTab: string;
  onNavigate: (id: string) => void;
  user: { handle: string, level: string };
}

export default function Sidebar({ activeTab, onNavigate, user }: SidebarProps) {
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col p-6 fixed left-0 top-0">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shadow-lg shadow-black/10">
          <div className="w-4 h-4 bg-white rounded-sm rotate-45" />
        </div>
        <span className="font-display font-bold text-xl tracking-tight text-gray-900">Tikforshop</span>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
              activeTab === item.id 
                ? 'bg-[#B4D455]/10 text-[#6a802a] font-bold' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-[#6a802a]' : 'text-gray-400'}`} />
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-50 space-y-1">
        <div className="mt-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-white border border-gray-200 overflow-hidden flex items-center justify-center">
              <span className="text-lg font-black text-[#B4D455]">T</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">{user.handle}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{user.level}</p>
            </div>
          </div>
          <button className="w-full py-2.5 bg-white rounded-xl text-xs font-bold border border-gray-200 hover:bg-gray-100 transition-colors shadow-sm">
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
