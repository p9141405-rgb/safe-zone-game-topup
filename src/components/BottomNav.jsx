import React from 'react';

const BottomNav = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', name: 'Home', emoji: '🏠' },
    { id: 'wallet', name: 'Wallet', emoji: '💳' },
    { id: 'orders', name: 'Orders', emoji: '📦' },
    { id: 'chat', name: 'Chat', emoji: '💬' },
    { id: 'profile', name: 'Profile', emoji: '👤' },
  ];

  return (
    <div className="fixed bottom-0 w-full max-w-md mx-auto bg-[#0b1120]/90 backdrop-blur-xl border-t border-slate-800 flex justify-around items-center py-3 pb-6 text-[10px] z-50">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <div key={item.id} onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 cursor-pointer transition-all duration-300 ${isActive ? 'text-blue-400 transform -translate-y-1' : 'text-slate-500 hover:text-slate-300'}`}>
            <span className={`text-xl ${isActive ? 'drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]' : ''}`}>{item.emoji}</span>
            <span className="font-medium">{item.name}</span>
          </div>
        );
      })}
    </div>
  );
};
export default BottomNav;
