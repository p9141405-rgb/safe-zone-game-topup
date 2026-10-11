import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { themeColors } from '../App';

const Profile = () => {
  const { theme, setTheme, profileBg, setProfileBg, avatarImg, setAvatarImg, user, userLogout, convertPoints, points, balance } = useData();
  const [activeModal, setActiveModal] = useState(null);
  const [toggles, setToggles] = useState({ twoFactor: false, priceAlert: true, autoReorder: false });
  const [bgPreview, setBgPreview] = useState(profileBg);
  const [avatarPreview, setAvatarPreview] = useState(avatarImg);
  const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const showToast = (msg, type = 'success') => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 2000);
  };

  const handleSaveTheme = (newTheme) => { setTheme(newTheme); setActiveModal(null); showToast('Theme ပြောင်းပြီးပါပြီ!'); };
  const toggleSwitch = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    showToast(`${key === '2fa' ? '2FA' : key === 'price' ? 'Price Alert' : 'Auto-Reorder'} ${!toggles[key] ? 'ဖွင့်' : 'ပိတ်'}လိုက်ပါပြီ`);
  };

  const handleFileUpload = (e, setPreview, saveFunc) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { setPreview(reader.result); saveFunc(reader.result); };
      reader.readAsDataURL(file);
    }
  };

  const handleConvert = () => {
    const res = convertPoints();
    showToast(res.message, res.success ? 'success' : 'error');
    if (res.success) setActiveModal(null);
  };

  const confirmLogout = () => {
    userLogout();
    setShowLogoutConfirm(false);
  };

  const menuItems = [
    { id: 'achievements', emoji: '🏅', name: 'Achievements' },
    { id: 'avatar', emoji: '👤', name: 'Avatar & Glow' },
    { id: 'theme', emoji: '🎨', name: 'App Theme' },
    { id: 'bg', emoji: '🖼️', name: 'Profile BG' },
    { id: 'devices', emoji: '📱', name: 'Devices' },
    { id: '2fa', emoji: '🔒', name: '2FA' },
    { id: 'price', emoji: '🔔', name: 'Price Alert' },
    { id: 'auto', emoji: '🔄', name: 'Auto-Reorder' },
    { id: 'tutorials', emoji: '📺', name: 'Tutorials' },
    { id: 'widget', emoji: '⚙️', name: 'Widget' },
    { id: 'rtl', emoji: '🌐', name: 'RTL' },
  ];

  const themes = ['blue', 'purple', 'pink', 'green', 'orange'];

  return (
    <div className="p-4 pt-6 pb-24 min-h-screen">
      {toast.show && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[100] px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold ${
          toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>{toast.msg}</div>
      )}

      <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-200"><span>👤</span> Profile</h2>
      
      <div className="bg-[#1e293b]/80 border border-slate-800 rounded-3xl p-6 flex flex-col items-center mb-6 overflow-hidden relative shadow-lg">
        {profileBg && <img src={profileBg} alt="bg" className="absolute inset-0 w-full h-full object-cover opacity-20" onError={(e) => e.target.style.display='none'} />}
        <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${themeColors[theme].gradient} flex items-center justify-center text-4xl mb-4 border-4 border-slate-800 shadow-2xl ${themeColors[theme].shadow} relative z-10 overflow-hidden`}>
          {avatarImg ? <img src={avatarImg} alt="avatar" className="w-full h-full object-cover" /> : (user?.name?.charAt(0)?.toUpperCase() || 'P')}
        </div>
        <h3 className="font-bold text-lg text-white relative z-10">{user?.name || 'Pyae phyo'}</h3>
        <p className="text-sm text-slate-400 mb-4 relative z-10">{user?.phone || '09xxxxxxxxx'}</p>
        <span className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg relative z-10">Bronze</span>
      </div>

      <div className="bg-[#1e293b]/80 border border-slate-800 rounded-2xl p-5 mb-6">
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-800">
          <span className="text-slate-400 text-sm font-medium">လက်ကျန်ငွေ</span>
          <span className={`font-black text-xl ${themeColors[theme].text}`}>{balance.toLocaleString()} Ks</span>
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="flex items-center gap-2 text-sm text-slate-300 font-medium"><span>⭐</span> Points</span>
          <span className="text-sm font-bold text-white">{points}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-2 text-sm text-slate-300 font-medium"><span>🤝</span> Referral</span>
          <span className="text-sm font-bold text-blue-400">REF{user?.name?.toUpperCase() || 'PYAE'}</span>
        </div>
      </div>

      {/* Points Convert Card */}
      <div className="bg-gradient-to-br from-fuchsia-500 to-pink-500 rounded-2xl p-5 mb-6 relative overflow-hidden shadow-lg text-white">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">⭐</span>
          <div>
            <h3 className="font-bold text-lg">Points</h3>
            <p className="text-xs text-pink-100">100 Points = 1,000 Ks</p>
          </div>
        </div>
        <h1 className="text-3xl font-black mb-1">{points}</h1>
        <p className="text-xs text-pink-100 mb-4">Total Points</p>
        <button onClick={handleConvert} className={`w-full py-3 rounded-xl font-bold shadow-md transition-all ${points >= 100 ? 'bg-white text-pink-600 active:scale-95' : 'bg-white/30 text-white/70 cursor-not-allowed'}`}>
          {points >= 100 ? '🎁 100 Points ဖြင့်လဲပါ' : '❌ 100 Points မပြည့်သေးပါ'}
        </button>
      </div>

      {/* Test Notification & Install App Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button onClick={() => showToast('Notification Test လုပ်ပါပြီ')} className="bg-[#1e293b]/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-center gap-2 text-xs font-bold hover:bg-slate-800 active:scale-95"><span>🔔</span> Test Notification</button>
        <button onClick={() => showToast('App Install လုပ်ပါပြီ')} className="bg-[#1e293b]/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-center gap-2 text-xs font-bold hover:bg-slate-800 active:scale-95"><span>📲</span> Install App</button>
      </div>

      {/* Logout Button with Confirm */}
      <button onClick={() => setShowLogoutConfirm(true)} className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold py-4 rounded-2xl border border-red-500/20 mb-8 flex items-center justify-center gap-2 active:scale-95">
        <span>🚪</span> Logout
      </button>

      <div className="grid grid-cols-2 gap-3">
        {menuItems.map((item) => (
          <div key={item.id} onClick={() => setActiveModal(item.id)}
            className="bg-[#1e293b]/80 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-slate-800 transition-colors active:scale-95">
            <span className="text-2xl">{item.emoji}</span>
            <span className="text-xs font-semibold text-slate-300 text-center">{item.name}</span>
          </div>
        ))}
      </div>

      {/* Modals */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#1e293b] w-full max-w-sm rounded-3xl border border-slate-700 shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-slate-700">
              <h3 className="font-bold text-white capitalize">{activeModal} Settings</h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white text-xl">✕</button>
            </div>
            <div className="p-5 max-h-[60vh] overflow-y-auto">
              {activeModal === 'theme' && (
                <div className="flex flex-col gap-5">
                  <p className="text-sm text-slate-400 font-medium">သင့်စိတ်ကြိုက် အရောင်ကို ရွေးချယ်ပါ</p>
                  <div className="grid grid-cols-5 gap-3">
                    {themes.map((t) => (
                      <div key={t} onClick={() => handleSaveTheme(t)}
                        className={`h-12 rounded-2xl cursor-pointer ${themeColors[t].bg} flex items-center justify-center border-2 ${theme === t ? 'border-white shadow-lg' : 'border-transparent'}`}>
                        {theme === t && <span className="text-white text-lg">✓</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeModal === 'bg' && (
                <div className="flex flex-col gap-5">
                  <p className="text-sm text-slate-400 font-medium">Profile နောက်ခံပုံ ရွေးပါ</p>
                  <div className="border border-dashed border-slate-600 rounded-xl p-4 flex items-center gap-4 bg-[#0b1120]">
                    <input type="file" id="bgUpload" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, setBgPreview, setProfileBg)} />
                    <label htmlFor="bgUpload" className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-xs font-medium cursor-pointer">ဖုန်းထဲမှ ရွေးမည်</label>
                    <span className="text-xs text-slate-500 truncate max-w-[120px]">{bgPreview ? 'ပုံရွေးပြီးပါပြီ' : 'No file chosen'}</span>
                  </div>
                  {bgPreview && <div className="w-full h-24 rounded-xl overflow-hidden border border-slate-700"><img src={bgPreview} alt="preview" className="w-full h-full object-cover" /></div>}
                  <button onClick={() => { setActiveModal(null); showToast('BG သိမ်းပြီးပါပြီ!'); }} className={`${themeColors[theme].bg} text-white py-3 rounded-xl font-bold`}>Save</button>
                </div>
              )}
              {activeModal === 'avatar' && (
                <div className="flex flex-col gap-5">
                  <p className="text-sm text-slate-400 font-medium">Profile ဓာတ်ပုံ ရွေးပါ</p>
                  <div className="border border-dashed border-slate-600 rounded-xl p-4 flex items-center gap-4 bg-[#0b1120]">
                    <input type="file" id="avatarUpload" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, setAvatarPreview, setAvatarImg)} />
                    <label htmlFor="avatarUpload" className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-xs font-medium cursor-pointer">ဖုန်းထဲမှ ရွေးမည်</label>
                    <span className="text-xs text-slate-500 truncate max-w-[120px]">{avatarPreview ? 'ပုံရွေးပြီးပါပြီ' : 'No file chosen'}</span>
                  </div>
                  {avatarPreview && <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-slate-700 mx-auto"><img src={avatarPreview} alt="preview" className="w-full h-full object-cover" /></div>}
                  <button onClick={() => { setActiveModal(null); showToast('Avatar သိမ်းပြီးပါပြီ!'); }} className={`${themeColors[theme].bg} text-white py-3 rounded-xl font-bold`}>Save</button>
                </div>
              )}
              {['2fa', 'price', 'auto'].includes(activeModal) && (
                <div className="flex justify-between items-center bg-[#0b1120] p-4 rounded-xl border border-slate-800">
                  <span className="text-sm font-medium text-slate-300">{activeModal === '2fa' ? 'Two-Factor Authentication' : activeModal === 'price' ? 'စျေးနှုန်း သတိပေးချက်' : 'အလိုအလျောက် ပြန်မှာယူမှု'}</span>
                  <button onClick={() => toggleSwitch(activeModal)} className={`w-14 h-7 rounded-full p-1 transition-colors ${toggles[activeModal] ? 'bg-green-500' : 'bg-slate-600'}`}>
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform shadow-md ${toggles[activeModal] ? 'translate-x-7' : 'translate-x-0'}`}></div>
                  </button>
                </div>
              )}
              {activeModal === 'devices' && (
                <div className="bg-[#0b1120] p-4 rounded-xl border border-slate-800">
                  <p className="text-sm font-medium text-slate-300 mb-3">လက်ရှိ စက်:</p>
                  <p className="text-sm text-slate-400 flex items-center gap-2">📱 Android (လက်ရှိ)</p>
                </div>
              )}
              {activeModal === 'achievements' && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-4 bg-[#0b1120] p-4 rounded-xl border border-slate-800">
                    <span className="text-3xl">🏅</span>
                    <div><p className="text-sm font-bold text-white">First Topup</p><p className="text-xs text-slate-400">ပထမဆုံး ငွေဖြည့်မှု</p></div>
                  </div>
                </div>
              )}
              {['tutorials', 'widget', 'rtl'].includes(activeModal) && (
                <div className="text-center text-slate-400 py-8">
                  <span className="text-5xl block mb-4">🚧</span>
                  <p className="text-sm">ဒီအပိုင်းကို နောက်မှ ထည့်ပါမယ်။</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Custom User Logout Confirmation Modal */}
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
export default Profile;
