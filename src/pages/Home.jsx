import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { themeColors } from '../App';

const Home = () => {
  const { theme, avatarImg, user, userLogout, isDarkMode, toggleDarkMode, notifications, markAllNotificationsRead, balance, points, redeemCoupon, bannerActive, bannerText, bannerType, games } = useData();
  const [showNoti, setShowNoti] = useState(false);
  const [showModal, setShowModal] = useState(null);
  const [couponInput, setCouponInput] = useState('');
  const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const showToast = (msg, type = 'success') => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 2500);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const quickActions = [
    { id: 'help', emoji: '❓', title: 'Help', sub: 'FAQ', color: 'text-red-400' },
    { id: 'stats', emoji: '📊', title: 'My Stats', sub: 'View', color: 'text-blue-400' },
    { id: 'coupon', emoji: '🎟️', title: 'Coupon', sub: 'Redeem', color: 'text-orange-400' },
    { id: 'leaderboard', emoji: '🏆', title: 'Leaderboard', sub: 'Top 10', color: 'text-yellow-400' },
  ];

  const handleRedeem = () => {
    const res = redeemCoupon(couponInput);
    showToast(res.message, res.success ? 'success' : 'error');
    if (res.success) { setCouponInput(''); setShowModal(null); }
  };

  const confirmLogout = () => { userLogout(); setShowLogoutConfirm(false); };

  return (
    <div className="flex flex-col p-4 pt-6">
      {toast.show && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[100] px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold ${
          toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>{toast.msg}</div>
      )}

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${themeColors[theme].gradient} flex items-center justify-center font-bold text-lg shadow-lg ${themeColors[theme].shadow} overflow-hidden`}>
            {user?.avatar ? <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" /> : (user?.name?.charAt(0)?.toUpperCase() || 'P')}
          </div>
          <div>
            <h2 className="font-semibold text-sm text-slate-200">{user?.name || 'Pyae phyo'}</h2>
            <p className="text-xs text-slate-500">{user?.phone || '09xxxxxxxxx'}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 relative">
          <button onClick={() => setShowNoti(!showNoti)} className="relative p-2.5 rounded-full bg-[#1e293b]/80 border border-slate-700 text-lg">
            🔔
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-lg">{unreadCount}</span>
            )}
          </button>
          <button onClick={toggleDarkMode} className="p-2.5 rounded-full bg-[#1e293b]/80 border border-slate-700 text-lg">{isDarkMode ? '🌙' : '☀️'}</button>
          <button onClick={() => setShowLogoutConfirm(true)} className="p-2.5 rounded-full bg-red-500/15 border border-red-500/30 text-lg active:scale-95">🚪</button>

          {showNoti && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowNoti(false)}></div>
              <div className="absolute top-14 right-0 w-72 bg-[#1e293b] border border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b border-slate-700">
                  <h3 className="text-sm font-bold text-white">🔔 Notifications</h3>
                  <button onClick={markAllNotificationsRead} className="text-[10px] text-blue-400 font-bold">Mark all read</button>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="text-center py-8 text-slate-500 text-xs">Notification မရှိပါ</div>
                  ) : notifications.map(n => (
                    <div key={n.id} className={`p-3 border-b border-slate-700/50 ${!n.read ? 'bg-blue-500/10' : ''}`}>
                      <div className="flex justify-between items-start gap-2">
                        <p className="text-xs font-bold text-white">{n.title}</p>
                        {!n.read && <span className="w-2 h-2 bg-blue-500 rounded-full mt-1"></span>}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1">{n.message}</p>
                      <p className="text-[9px] text-slate-500 mt-1.5">{n.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {bannerActive && bannerText && (
        <div className={`rounded-xl py-2 px-3 mb-4 overflow-hidden flex items-center border ${
          bannerType === 'Warning' ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400' :
          bannerType === 'Success' ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' :
          'bg-blue-500/20 border-blue-500/30 text-blue-400'
        }`}>
          <span className="text-lg mr-2">📢</span>
          <div className="flex-1 overflow-hidden relative">
            <div className="animate-marquee text-xs font-bold">{bannerText}</div>
          </div>
        </div>
      )}

      <div className={`bg-gradient-to-br ${themeColors[theme].gradient} rounded-3xl p-6 relative overflow-hidden shadow-xl ${themeColors[theme].shadow} mb-6`}>
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="flex items-center gap-2 mb-3 text-white/80 text-sm font-medium"><span>💰</span> လက်ကျန်ငွေ</div>
        <h1 className="text-4xl font-black mb-5 tracking-tight text-white">{balance.toLocaleString()} <span className="text-lg font-medium">Ks</span></h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg text-xs font-medium backdrop-blur-sm text-white">
            <span>⭐</span> {points} Points
          </div>
          <span className="bg-orange-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-md">Bronze</span>
        </div>
      </div>

      <h3 className="font-bold text-sm text-slate-300 mb-4 flex items-center gap-2"><span>⚡</span> Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {quickActions.map((item) => (
          <div key={item.id} onClick={() => setShowModal(item.id)} className="bg-[#1e293b]/80 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between h-24 hover:bg-slate-800 transition-colors cursor-pointer active:scale-95">
            <span className="text-2xl">{item.emoji}</span>
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{item.title}</p>
              <p className={`text-sm font-bold ${item.color}`}>{item.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="font-bold text-sm text-slate-300 mb-4 flex items-center gap-2"><span>🎮</span> ဂိမ်းများ</h3>
      <div className="grid grid-cols-2 gap-3 pb-10">
        {games.map((game) => (
          <div key={game.id} className="bg-[#1e293b]/80 border border-slate-800 rounded-2xl overflow-hidden hover:bg-slate-800 transition-colors cursor-pointer relative group">
            <div className="h-28 bg-slate-800 flex items-center justify-center overflow-hidden">
              <img src={game.img} alt={game.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" onError={(e) => { e.target.onerror = null; e.target.src='https://via.placeholder.com/150'; }} />
            </div>
            <div className="p-3 text-center">
              <p className="text-xs font-semibold text-slate-200">{game.name}</p>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#1e293b] w-full max-w-sm rounded-3xl border border-slate-700 shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-slate-700">
              <h3 className="font-bold text-white capitalize">{showModal === 'help' ? 'FAQ Help' : showModal === 'stats' ? 'My Stats' : showModal === 'coupon' ? 'Redeem Coupon' : 'Leaderboard'}</h3>
              <button onClick={() => setShowModal(null)} className="text-slate-400 hover:text-white text-xl">✕</button>
            </div>
            <div className="p-5 max-h-[60vh] overflow-y-auto">
              {showModal === 'help' && (
                <div className="flex flex-col gap-3">
                  <div className="bg-[#0b1120] border border-slate-800 rounded-xl p-4">
                    <p className="text-sm font-bold text-white mb-1">❓ ငွေဘယ်လိုသွင်းရမလဲ?</p>
                    <p className="text-xs text-slate-400">Wallet Tab ကို သွားပြီး KBZ/Wave/UAB/AYA နံပါတ်များထဲ လွှဲပြီး Receipt ပုံ တင်ပါ။</p>
                  </div>
                  <div className="bg-[#0b1120] border border-slate-800 rounded-xl p-4">
                    <p className="text-sm font-bold text-white mb-1">❓ အော်ဒါ ဘယ်လိုတင်ရမလဲ?</p>
                    <p className="text-xs text-slate-400">Home မှာ ဂိမ်းရွေးပြီး Package ကို ရွေးချယ်နိုင်ပါတယ်။</p>
                  </div>
                  <div className="bg-[#0b1120] border border-slate-800 rounded-xl p-4">
                    <p className="text-sm font-bold text-white mb-1">❓ Points ဘယ်လိုရမလဲ?</p>
                    <p className="text-xs text-slate-400">အော်ဒါတင်တိုင်း Points ရပါတယ်။ 100 Points = 1,000 Ks။</p>
                  </div>
                </div>
              )}

              {showModal === 'stats' && (
                <div className="flex flex-col gap-3">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-4 text-white">
                    <p className="text-xs font-medium opacity-80">Total Balance</p>
                    <p className="text-2xl font-black">{balance.toLocaleString()} Ks</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#0b1120] border border-slate-800 rounded-xl p-4 text-center">
                      <p className="text-xs text-slate-400">Points</p>
                      <p className="text-xl font-bold text-yellow-400">{points}</p>
                    </div>
                    <div className="bg-[#0b1120] border border-slate-800 rounded-xl p-4 text-center">
                      <p className="text-xs text-slate-400">Orders</p>
                      <p className="text-xl font-bold text-green-400">0</p>
                    </div>
                  </div>
                </div>
              )}

              {showModal === 'coupon' && (
                <div className="flex flex-col gap-4">
                  <p className="text-xs text-slate-400">Coupon ကုဒ်ကို ထည့်ပါ (ဥပမာ - SAFEZONE50)</p>
                  <input type="text" placeholder="Coupon Code" value={couponInput} onChange={(e) => setCouponInput(e.target.value)}
                    className="bg-[#0b1120] border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-blue-500 w-full" />
                  <button onClick={handleRedeem} className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-bold shadow-lg active:scale-95">🎟️ Redeem Coupon</button>
                </div>
              )}

              {showModal === 'leaderboard' && (
                <div className="flex flex-col gap-3">
                  {[
                    { rank: '🥇', name: 'Aung Aung', pts: 1500 },
                    { rank: '🥈', name: 'Su Su', pts: 1200 },
                    { rank: '🥉', name: 'Kyaw Kyaw', pts: 900 },
                    { rank: '4️⃣', name: 'Pyae Phyo', pts: 700 },
                    { rank: '5️⃣', name: 'Hla Hla', pts: 500 },
                  ].map((u, i) => (
                    <div key={i} className={`bg-[#0b1120] border rounded-xl p-3 flex items-center justify-between ${u.name === 'Pyae Phyo' ? 'border-blue-500/50 bg-blue-500/10' : 'border-slate-800'}`}>
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{u.rank}</span>
                        <span className="text-sm font-bold text-white">{u.name}</span>
                      </div>
                      <span className="text-xs font-bold text-yellow-400">{u.pts} pts</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/80 z-[110] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#1e293b] w-full max-w-sm rounded-3xl border border-slate-700 shadow-2xl p-6 text-center">
            <span className="text-5xl block mb-4">🚪</span>
            <h3 className="text-xl font-bold text-white mb-2">Logout ထွက်ရန် သေချာပါသလား?</h3>
            <p className="text-sm text-slate-400 mb-6">User အကောင့်မှ ထွက်ပြီး Login စာမျက်နှာကို ပြန်သွားပါမည်။</p>
            <div className="flex gap-3">
              <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-xl transition-colors active:scale-95">Cancel</button>
              <button onClick={confirmLogout} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition-colors active:scale-95">Yes, Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Home;
