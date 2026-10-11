import React, { useState, useEffect } from 'react';
import { DataProvider, useData } from './context/DataContext';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Wallet from './pages/Wallet';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Chat from './pages/Chat';
import UserAuth from './pages/UserAuth';
import AdminAuth from './pages/AdminAuth';
import Terms from './pages/Terms';
import BottomNav from './components/BottomNav';
import MusicPlayer from './components/MusicPlayer';
import { Zap } from 'lucide-react';

export const themeColors = {
  blue: { bg: 'bg-blue-600', gradient: 'from-blue-500 to-blue-700', text: 'text-blue-400', shadow: 'shadow-blue-500/20' },
  purple: { bg: 'bg-purple-600', gradient: 'from-purple-500 to-purple-700', text: 'text-purple-400', shadow: 'shadow-purple-500/20' },
  pink: { bg: 'bg-pink-600', gradient: 'from-pink-500 to-pink-700', text: 'text-pink-400', shadow: 'shadow-pink-500/20' },
  green: { bg: 'bg-emerald-600', gradient: 'from-emerald-500 to-emerald-700', text: 'text-emerald-400', shadow: 'shadow-emerald-500/20' },
  orange: { bg: 'bg-orange-600', gradient: 'from-orange-500 to-orange-700', text: 'text-orange-400', shadow: 'shadow-orange-500/20' },
};

function AppContent() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [hash, setHash] = useState(window.location.hash);
  const { isDarkMode, user, admin, maintenanceMode, maintenanceMessage } = useData();

  useEffect(() => {
    if (isDarkMode) document.body.classList.remove('light-mode');
    else document.body.classList.add('light-mode');
  }, [isDarkMode]);

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  // --- 1. GLOBAL SPLASH SCREEN (Image 1) ---
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b1120] flex flex-col items-center justify-center text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center">
          <div className="bg-black p-6 rounded-3xl mb-6 shadow-[0_0_40px_rgba(59,130,246,0.3)] flex flex-col items-center border border-slate-800 w-40">
            <Zap size={48} className="text-blue-500 mb-1" />
            <h1 className="text-2xl font-black tracking-wider text-white">SZ</h1>
            <p className="text-[8px] tracking-[0.2em] text-blue-400 font-bold mt-1">SAFE ZONE</p>
            <p className="text-[6px] tracking-[0.1em] text-slate-400">GAME TOPUP</p>
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-1">
            {hash === '#admin' ? 'ADMIN PANEL' : 'Safe Zone Game Topup'}
          </h2>
          <p className="text-[10px] text-slate-500 tracking-[0.2em] mb-8">SAFE ZONE</p>
          
          <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full w-full animate-[loading_1.8s_ease-in-out_infinite] origin-left"></div>
          </div>
          <style>{`
            @keyframes loading {
              0% { transform: scaleX(0); }
              50% { transform: scaleX(0.7); }
              100% { transform: scaleX(1); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  // --- 2. MAINTENANCE MODE (Image 2 - Shows to EVERYONE) ---
  if (maintenanceMode) {
    return (
      <div className="min-h-screen bg-[#0b1120] flex flex-col items-center justify-center p-6 text-white relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-[100px]"></div>
        
        <div className="relative z-10 flex flex-col items-center max-w-sm text-center">
          <span className="text-6xl mb-6">🚧</span>
          <h1 className="text-3xl font-black text-red-500 mb-2">ခေတ္တပိတ်ထားပါသည်</h1>
          <p className="text-sm tracking-[0.2em] text-slate-400 font-bold mb-8">TEMPORARILY CLOSED</p>
          
          <div className="flex gap-2 mb-8">
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-600/50"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-700/30"></span>
          </div>

          <div className="w-full border border-yellow-500/30 rounded-xl px-4 py-3 mb-6 bg-yellow-500/5">
            <p className="text-sm text-slate-300 font-medium">
              {maintenanceMessage || 'Website is currently under maintenance. Please check back later.'}
            </p>
          </div>

          <button onClick={() => window.location.reload()} className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-orange-500/20 active:scale-95 flex items-center gap-2">
            <span>🔄</span> Refresh
          </button>
        </div>
      </div>
    );
  }

  // --- 3. NORMAL ROUTING ---
  if (hash === '#terms') return <Terms onClose={() => window.location.hash = '#user'} />;

  const isAdminRoute = hash === '#admin';

  if (isAdminRoute) {
    if (!admin) return <AdminAuth />;
    return (
      <div className="min-h-screen bg-[#0b1120] text-white">
        <Admin />
      </div>
    );
  }

  if (!user) return <UserAuth />;

  const renderPage = () => {
    switch (activeTab) {
      case 'home': return <Home />;
      case 'wallet': return <Wallet />;
      case 'orders': return <Orders />;
      case 'chat': return <Chat />;
      case 'profile': return <Profile />;
      default: return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-white overflow-hidden relative">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] animate-float"></div>
        <div className="absolute top-[40%] right-[-10%] w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] animate-float-delayed"></div>
      </div>
      <div className="relative z-10 pb-24 max-w-md mx-auto">
        {renderPage()}
        <MusicPlayer />
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}

function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}
export default App;
