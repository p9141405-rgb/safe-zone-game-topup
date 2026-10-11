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
  const { isDarkMode, user, admin } = useData();

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
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b1120] flex flex-col items-center justify-center text-white">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mb-6 shadow-2xl shadow-blue-500/50 animate-bounce">
          <span className="text-4xl">⚡</span>
        </div>
        <h1 className="text-3xl font-black tracking-tight mb-2">SAFE ZONE</h1>
        <p className="text-xs text-slate-500 tracking-widest font-medium mb-8">GAME TOPUP</p>
        <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full w-full animate-pulse"></div>
        </div>
      </div>
    );
  }

  // Terms Page Route
  if (hash === '#terms') {
    return <Terms onClose={() => window.location.hash = '#user'} />;
  }

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
