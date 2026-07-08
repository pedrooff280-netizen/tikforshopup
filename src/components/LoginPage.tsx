import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AtSign, ChevronRight, Rocket, Target } from 'lucide-react';

interface LoginPageProps {
  onLogin: (handle: string, level: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [handle, setHandle] = useState('');
  const [level, setLevel] = useState<'beginner' | 'seller' | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (handle && level) {
      onLogin(handle.startsWith('@') ? handle : `@${handle}`, level === 'beginner' ? 'Iniciante' : 'Já fez vendas');
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-black/10">
            <div className="w-8 h-8 bg-white rounded-md rotate-45" />
          </div>
          <h1 className="text-3xl font-display font-black tracking-tight text-gray-900 mb-2">Tikforshop</h1>
          <p className="text-gray-500 font-medium">Acesse o melhor hub de fornecedores TikTok</p>
        </div>

        <div className="bg-white p-8 rounded-[32px] shadow-2xl shadow-gray-200/50 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* TikTok Handle */}
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block">Seu @ do TikTok</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#B4D455] transition-colors">
                  <AtSign className="w-5 h-5" />
                </div>
                <input 
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="ex: @criador_pro"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#B4D455]/10 focus:border-[#B4D455] transition-all font-bold text-gray-900"
                />
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block">Nível de Experiência</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setLevel('beginner')}
                  className={`p-4 rounded-2xl border-2 transition-all text-left flex flex-col gap-2 ${
                    level === 'beginner' 
                      ? 'border-[#B4D455] bg-[#B4D455]/5 ring-4 ring-[#B4D455]/5' 
                      : 'border-gray-50 bg-gray-50 hover:border-gray-200'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${level === 'beginner' ? 'bg-[#B4D455] text-white' : 'bg-white text-gray-400'}`}>
                    <Rocket className="w-4 h-4" />
                  </div>
                  <span className={`text-xs font-bold ${level === 'beginner' ? 'text-gray-900' : 'text-gray-500'}`}>Iniciante</span>
                </button>

                <button
                  type="button"
                  onClick={() => setLevel('seller')}
                  className={`p-4 rounded-2xl border-2 transition-all text-left flex flex-col gap-2 ${
                    level === 'seller' 
                      ? 'border-[#B4D455] bg-[#B4D455]/5 ring-4 ring-[#B4D455]/5' 
                      : 'border-gray-50 bg-gray-50 hover:border-gray-200'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${level === 'seller' ? 'bg-[#B4D455] text-white' : 'bg-white text-gray-400'}`}>
                    <Target className="w-4 h-4" />
                  </div>
                  <span className={`text-xs font-bold ${level === 'seller' ? 'text-gray-900' : 'text-gray-500'}`}>Já fez vendas</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={!handle || !level}
              className="w-full py-4 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              Começar agora
              <ChevronRight className="w-5 h-5" />
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-xs text-gray-400">
          Ao entrar, você concorda com nossos termos de uso.
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
