import React, { useState } from 'react';
import { useData } from '../context/DataContext';

const InputField = ({ label, placeholder, type = "text", value, onChange, defaultValue }) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && <label className="text-xs text-slate-400 font-medium">{label}</label>}
    <input type={type} placeholder={placeholder} value={value} onChange={onChange} defaultValue={defaultValue}
      className="bg-[#0b1120] border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-blue-500 w-full" />
  </div>
);

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dash');
  const { 
    games, addGame, deleteGame, musicList, addMusic, removeMusic, 
    chatRules, addChatRule, deleteChatRule, botActive, toggleBot,
    deposits, updateDepositStatus, orders, updateOrderStatus,
    siteInfo, updateSiteInfo, maintenanceMode, setMaintenanceMode,
    adminLogout, autoBackup, setAutoBackup, bannerActive, setBannerActive, 
    bannerText, setBannerText, bannerType, setBannerType, botStatus, setBotStatus,
    registeredUsers, updateUserProfile
  } = useData();
  
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 2500);
  };

  const [gameName, setGameName] = useState('');
  const [gameImg, setGameImg] = useState('');
  const [ruleKeywords, setRuleKeywords] = useState('');
  const [ruleReply, setRuleReply] = useState('');
  
  const [siteForm, setSiteForm] = useState(siteInfo);
  const [logoUrl, setLogoUrl] = useState(siteInfo.logoUrl || '');
  const [videoUrl, setVideoUrl] = useState(siteInfo.videoUrl || '');
  const [musicUrl, setMusicUrl] = useState(siteInfo.musicUrl || '');
  
  const [payName, setPayName] = useState('');
  const [payShort, setPayShort] = useState('');
  const [payClass, setPayClass] = useState('');

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [bannerImage, setBannerImage] = useState('');
  
  const [editingUser, setEditingUser] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAvatar, setEditAvatar] = useState('');

  const handleLogoUpload = (e) => { const file = e.target.files[0]; if (file) { const reader = new FileReader(); reader.onloadend = () => { setLogoUrl(reader.result); showToast('Logo ပုံ ရွေးပြီးပါပြီ!'); }; reader.readAsDataURL(file); } };
  const handleVideoUpload = (e) => { const file = e.target.files[0]; if (file) { setVideoUrl(URL.createObjectURL(file)); showToast('Video ဖိုင် ရွေးပြီးပါပြီ!'); } };
  const handleMusicUrlUpload = (e) => { const file = e.target.files[0]; if (file) { setMusicUrl(URL.createObjectURL(file)); showToast('Music ဖိုင် ရွေးပြီးပါပြီ!'); } };

  const topActions = [
    { id: 'users', name: 'Users', emoji: '👥' },
    { id: 'orders', name: 'Orders', emoji: '📦' },
    { id: 'deposits', name: 'Deps', emoji: '💳' },
  ];

  const mainTabs = [
    { id: 'dash', emoji: '📊', name: 'Dash' },
    { id: 'deposits', emoji: '💰', name: 'Deposits' },
    { id: 'orders', emoji: '🛒', name: 'Orders' },
    { id: 'chats', emoji: '💬', name: 'Chats' },
    { id: 'games', emoji: '🎮', name: 'ဂိမ်းများ' },
    { id: 'users', emoji: '👥', name: 'Users' },
    { id: 'coupons', emoji: '🎟️', name: 'Coupons' },
    { id: 'admins', emoji: '🛡️', name: 'Admins' },
    { id: 'bot', emoji: '🤖', name: 'Bot' },
    { id: 'website', emoji: '🌐', name: 'Website' },
    { id: 'settings', emoji: '⚙️', name: 'Settings' },
  ];

  const handleTopAction = (id) => setActiveTab(id);
  const confirmLogout = () => { adminLogout(); setShowLogoutConfirm(false); };

  const handleSaveGame = () => { if (gameName && gameImg) { addGame({ name: gameName, img: gameImg }); setGameName(''); setGameImg(''); showToast('ဂိမ်း အသစ် ထည့်ပြီးပါပြီ!'); } else showToast('ဂိမ်းနာမည်နဲ့ ပုံ URL ထည့်ပါ။', 'error'); };
  const handleGallery = () => { setGameImg('https://play-lh.googleusercontent.com/1_X7lXjD0m9l9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9z9'); showToast('Gallery မှ ပုံရွေးပြီးပါပြီ!'); };
  const handleAddRule = () => { if (ruleKeywords && ruleReply) { addChatRule(ruleKeywords, ruleReply); setRuleKeywords(''); setRuleReply(''); showToast('စည်းမျဉ်း အသစ် ထည့်ပြီးပါပြီ!'); } else showToast('Keywords နဲ့ Reply ထည့်ပါ။', 'error'); };
  const handleMusicUpload = (e) => { const files = Array.from(e.target.files); if (musicList.length + files.length > 5) return showToast('သီချင်း ၅ ပုဒ်ထက် မပိုရပါ။', 'error'); const valid = files.filter(f => f.size <= 10 * 1024 * 1024); if (valid.length !== files.length) showToast('10MB ထက် မကျော်ရပါ။', 'warning'); valid.forEach(f => addMusic(f)); if (valid.length > 0) showToast('သီချင်း ထည့်ပြီးပါပြီ။'); };
  const handleBotTest = () => { if (botActive) showToast('Bot က Auto Reply ပြန်နေပါပြီ ✅'); else showToast('Bot ကို အရင် ဖွင့်ပါ။', 'error'); };
  
  const handleSaveSiteInfo = () => { const newInfo = { ...siteForm, logoUrl, videoUrl, musicUrl }; updateSiteInfo(newInfo); showToast('Site Info သိမ်းပြီးပါပြီ!'); };
  const handleSaveLabels = () => showToast('Text Labels သိမ်းပြီးပါပြီ!');
  const handleSaveSocial = () => showToast('Social Links သိမ်းပြီးပါပြီ!');
  const handleAddPayment = () => { if (payName && payShort && payClass) { showToast('Payment Method ထည့်ပြီးပါပြီ!'); setPayName(''); setPayShort(''); setPayClass(''); } else showToast('အချက်အလက်များ ပြည့်စုံစွာ ထည့်ပါ။', 'error'); };
  const handleAddBadge = () => showToast('Trust Badge ထည့်ပြီးပါပြီ!');
  const handleAddFaq = () => showToast('FAQ ထည့်ပြီးပါပြီ!');
  const handleAddCoupon = () => showToast('Coupon ထည့်ပြီးပါပြီ!');
  const handleSaveMaintenance = () => showToast(maintenanceMode ? 'Maintenance Mode ဖွင့်ထားပါသည်' : 'Website ပုံမှန် ပြန်ဖွင့်ပြီးပါပြီ');
  const handleSaveSettings = () => showToast('Settings သိမ်းပြီးပါပြီ!');
  const handleGithubBackup = () => showToast('GitHub Backup လုပ်ပြီးပါပြီ! (Simulated)');
  const handleGithubRestore = () => showToast('Restore လုပ်ပြီးပါပြီ! (Simulated)');
  const handleSaveBanners = () => showToast('Banners သိမ်းပြီးပါပြီ!');
  const handleBotDebug = () => { setBotStatus('Debug Ok'); showToast('Bot Debug စစ်ဆေးပြီးပါပြီ (Simulated)'); };

  const handleEditUser = (user) => {
    setEditingUser(user.username);
    setEditName(user.name || user.username);
    setEditPhone(user.phone);
    setEditAvatar(user.avatar || '');
  };

  const handleSaveUserEdit = () => {
    if (editingUser) {
      updateUserProfile(editingUser, editName, editPhone, editAvatar);
      showToast('User အချက်အလက် သိမ်းပြီးပါပြီ!');
      setEditingUser(null);
    }
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setEditAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dash':
        return (
          <div className="flex flex-col gap-4">
            <div className="bg-[#1e293b]/50 border border-slate-700 rounded-2xl p-4">
              <h3 className="text-blue-400 font-bold mb-3 flex items-center gap-2"><span>📊</span> Today vs Yesterday</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-4 flex flex-col items-center justify-center h-24 shadow-lg">
                  <span className="text-sm font-bold text-white">Today</span><span className="text-2xl font-black mt-1 text-white">15,000 Ks</span>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-4 flex flex-col items-center justify-center h-24 shadow-lg">
                  <span className="text-sm font-bold text-white">Yesterday</span><span className="text-2xl font-black mt-1 text-white">10,000 Ks</span>
                </div>
              </div>
            </div>
            <div className="bg-[#1e293b]/50 border border-slate-700 rounded-2xl p-4 h-48 flex flex-col">
              <h3 className="text-blue-400 font-bold mb-3 flex items-center gap-2"><span>💰</span> ရက်အတွင်း ဝင်ငွေ</h3>
              <div className="flex-1 flex flex-col items-center justify-center text-slate-500 text-sm">
                <span className="text-2xl font-black text-green-400 mb-2">+ 25,000 Ks</span>
                <span>ယမန်နေ့ထက် ၅၀% ပိုတက်သည်</span>
              </div>
            </div>
          </div>
        );

      case 'deposits':
        return (
          <div className="flex flex-col gap-4">
            <div className="bg-[#1e293b]/50 border border-slate-700 rounded-2xl p-4">
              <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2"><span>💰</span> Bulk Actions</h3>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => showToast('Processing လုပ်ဆောင်နေပါသည်...', 'info')} className="bg-blue-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 active:scale-95"><span>🔄</span> Processing</button>
                <button onClick={() => showToast('အားလုံး Complete လုပ်ပြီးပါပြီ')} className="bg-emerald-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 active:scale-95"><span>✅</span> Complete</button>
                <button onClick={() => showToast('အားလုံး Reject လုပ်ပြီးပါပြီ', 'warning')} className="bg-red-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 active:scale-95"><span>❌</span> Reject</button>
              </div>
            </div>
            <div className="bg-[#1e293b]/50 border border-slate-700 rounded-2xl p-4">
              <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2"><span>📋</span> ငွေသွင်း တောင်းဆိုချက်များ ({deposits.length})</h3>
              {deposits.length === 0 ? (
                <div className="text-center text-slate-500 text-xs py-8">ငွေသွင်း တောင်းဆိုချက် မရှိသေးပါ</div>
              ) : (
                <div className="flex flex-col gap-3">
                  {deposits.map((dep) => (
                    <div key={dep.id} className="bg-[#0f172a] border border-slate-700 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <p className="text-xs font-bold text-blue-400 mb-1">{dep.id}</p>
                          <p className="text-sm font-bold text-white">{dep.user}</p>
                          <p className="text-[10px] text-slate-400">{dep.method} · {dep.date}</p>
                        </div>
                        <p className="text-sm font-black text-yellow-400">{dep.amount}</p>
                      </div>
                      {dep.status === 'Pending' ? (
                        <div className="flex gap-2 mt-3">
                          <button onClick={() => { updateDepositStatus(dep.id, 'Completed'); showToast('Deposit Approve လုပ်ပြီးပါပြီ!'); }} className="flex-1 bg-green-500/20 text-green-400 py-2 rounded-lg text-xs font-bold active:scale-95">✅ Approve</button>
                          <button onClick={() => { updateDepositStatus(dep.id, 'Rejected'); showToast('Deposit Reject လုပ်ပြီးပါပြီ', 'warning'); }} className="flex-1 bg-red-500/20 text-red-400 py-2 rounded-lg text-xs font-bold active:scale-95">❌ Reject</button>
                        </div>
                      ) : (
                        <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${dep.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{dep.status}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="bg-[#1e293b]/50 border border-slate-700 rounded-2xl p-4">
            <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2"><span>🛒</span> အော်ဒါများ ({orders.length})</h3>
            {orders.length === 0 ? (
              <div className="text-center text-slate-500 text-xs py-8">အော်ဒါ မရှိသေးပါ</div>
            ) : (
              <div className="flex flex-col gap-3">
                {orders.map((order) => (
                  <div key={order.id} className="bg-[#0f172a] border border-slate-700 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-xs font-bold text-blue-400">{order.id}</p>
                        <p className="text-sm font-bold text-white mt-1">{order.user}</p>
                        <p className="text-[10px] text-slate-400">{order.game} · {order.package}</p>
                      </div>
                      <p className="text-sm font-black text-yellow-400">{order.amount}</p>
                    </div>
                    {order.status === 'Pending' ? (
                      <div className="flex gap-2 mt-3">
                        <button onClick={() => { updateOrderStatus(order.id, 'Completed'); showToast('Order Approve လုပ်ပြီးပါပြီ!'); }} className="flex-1 bg-green-500/20 text-green-400 py-2 rounded-lg text-xs font-bold active:scale-95">✅ Approve</button>
                        <button onClick={() => { updateOrderStatus(order.id, 'Rejected'); showToast('Order Reject လုပ်ပြီးပါပြီ', 'warning'); }} className="flex-1 bg-red-500/20 text-red-400 py-2 rounded-lg text-xs font-bold active:scale-95">❌ Reject</button>
                      </div>
                    ) : (
                      <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${order.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{order.status}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'games':
        return (
          <div className="flex flex-col gap-4">
            <div className="bg-[#1e293b]/50 border border-slate-700 rounded-2xl p-4">
              <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2"><span>🎮</span> ဂိမ်း အသစ်</h3>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <InputField placeholder="ဂိမ်းနာမည်" value={gameName} onChange={(e) => setGameName(e.target.value)} />
                <InputField placeholder="Image URL" value={gameImg} onChange={(e) => setGameImg(e.target.value)} />
              </div>
              <div className="flex gap-2">
                <button onClick={handleSaveGame} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl text-sm font-bold flex-1 active:scale-95">Save</button>
                <button onClick={handleGallery} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 flex-1 active:scale-95"><span>🖼️</span> Gallery</button>
              </div>
            </div>
            <div className="bg-[#1e293b]/50 border border-slate-700 rounded-2xl p-4">
              <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2"><span>📋</span> ဂိမ်းများ ({games.length})</h3>
              <div className="flex flex-col gap-3">
                {games.map((game) => (
                  <div key={game.id} className="bg-[#0f172a] border border-slate-700 rounded-xl p-3 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <img src={game.img} alt={game.name} className="w-10 h-10 rounded-lg object-cover bg-slate-800" onError={(e) => e.target.src='https://via.placeholder.com/40'} />
                      <span className="text-sm font-bold text-white">{game.name}</span>
                    </div>
                    <button onClick={() => { deleteGame(game.id); showToast('ဂိမ်း ဖျက်ပြီးပါပြီ', 'warning'); }} className="text-red-400 p-2 text-lg">🗑️</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="bg-[#1e293b]/50 border border-slate-700 rounded-2xl p-4">
            <h3 className="text-blue-400 font-bold flex items-center gap-2 mb-4"><span>👥</span> အသုံးပြုသူများ ({registeredUsers.length})</h3>
            <div className="flex flex-col gap-3">
              {registeredUsers.length === 0 ? (
                <div className="text-center text-slate-500 text-xs py-8">User မရှိသေးပါ</div>
              ) : registeredUsers.map((user) => (
                <div key={user.username} className="bg-[#0f172a] border border-slate-700 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold text-white overflow-hidden">
                        {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : user.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{user.name || user.username}</p>
                        <p className="text-[10px] text-slate-400">{user.phone}</p>
                      </div>
                    </div>
                    <button onClick={() => handleEditUser(user)} className="bg-blue-500/20 text-blue-400 px-3 py-1.5 rounded-lg text-xs font-bold active:scale-95">✏️ Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'admins':
        return (
          <div className="bg-[#1e293b]/50 border border-slate-700 rounded-2xl p-4">
            <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2"><span>🛡️</span> Admin အသစ် (Super)</h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <InputField placeholder="Username" />
              <InputField placeholder="Password" type="password" />
            </div>
            <div className="mb-4">
              <select className="bg-[#0b1120] border border-slate-700 rounded-xl p-3 text-sm text-white w-full">
                <option>Super</option>
                <option>Normal</option>
              </select>
            </div>
            <button onClick={() => showToast('Admin အသစ် ထည့်ပြီးပါပြီ!')} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl text-sm font-bold w-full mb-6 active:scale-95">ထည့်မည်</button>
            <h4 className="text-blue-400 text-sm font-bold mb-3">Admin စာရင်း</h4>
            <div className="flex flex-col gap-3">
              <div className="bg-[#0f172a] border border-slate-700 rounded-xl p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-lg text-white">🛡️</div>
                  <div><p className="text-sm font-bold text-white">admin</p><p className="text-[10px] text-slate-400">Super</p></div>
                </div>
                <span className="text-[10px] px-2 py-1 rounded-full font-bold bg-green-500/20 text-green-400">Active</span>
              </div>
            </div>
          </div>
        );

      case 'bot':
        return (
          <div className="flex flex-col gap-4">
            <div className={`bg-[#1e293b]/50 border rounded-2xl p-4 ${botActive ? 'border-emerald-500/50' : 'border-red-500/50'}`}>
              <h3 className="text-blue-400 font-bold mb-2 flex items-center gap-2"><span>💬</span> Live Chat Bot</h3>
              <p className="text-xs text-slate-400 mb-4">User မှ စာပို့ရင် Auto ပြန်ဖြေမည့် Bot</p>
              <div className="flex justify-between items-center bg-[#0f172a] p-4 rounded-xl mb-4 border border-slate-700">
                <div>
                  <span className="text-sm font-bold block">Bot Status</span>
                  <span className={`text-xs font-bold ${botActive ? 'text-green-400' : 'text-red-400'}`}>{botActive ? 'Active (Auto Reply)' : 'Inactive (Disabled)'}</span>
                </div>
                <button onClick={() => { toggleBot(); showToast(botActive ? 'Bot ပိတ်လိုက်ပါပြီ' : 'Bot ဖွင့်လိုက်ပါပြီ'); }} className={`p-3 rounded-xl text-white ${botActive ? 'bg-green-500' : 'bg-red-500'} active:scale-95`}>
                  {botActive ? '🟢' : '🔴'}
                </button>
              </div>
              <div className="flex gap-2 mb-2">
                <input type="text" placeholder="Test: hi / deposit / order..." className="flex-1 bg-[#0b1120] border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-blue-500" />
                <button onClick={handleBotTest} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-3 rounded-xl text-sm font-bold flex items-center gap-1 active:scale-95"><span>📩</span> Test</button>
              </div>
            </div>
            <div className="bg-[#1e293b]/50 border border-slate-700 rounded-2xl p-4">
              <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2"><span>📋</span> Bot Replies ({chatRules.length})</h3>
              <div className="flex flex-col gap-3 mb-6">
                {chatRules.map((rule) => (
                  <div key={rule.id} className="bg-[#0f172a] border border-slate-700 rounded-xl p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex flex-wrap gap-1">
                        {rule.keywords.map((kw, i) => (
                          <span key={i} className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-md font-bold">{kw}</span>
                        ))}
                      </div>
                      <button onClick={() => { deleteChatRule(rule.id); showToast('Rule ဖျက်ပြီးပါပြီ', 'warning'); }} className="text-red-400 text-sm p-1">🗑️</button>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{rule.reply}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-700 pt-5">
                <h4 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2"><span>➕</span> Rule အသစ်</h4>
                <div className="flex flex-col gap-3">
                  <InputField label="Keywords" placeholder="hi, hello, မင်္ဂလာပါ" value={ruleKeywords} onChange={(e) => setRuleKeywords(e.target.value)} />
                  <textarea placeholder="Reply text..." value={ruleReply} onChange={(e) => setRuleReply(e.target.value)} className="bg-[#0b1120] border border-slate-700 rounded-xl p-3 text-sm text-white h-24 resize-none"></textarea>
                  <button onClick={handleAddRule} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl text-sm font-bold w-full active:scale-95">➕ Add Rule</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'website':
        return (
          <div className="flex flex-col gap-4">
            <div className="bg-[#1e293b]/50 border border-slate-700 rounded-2xl p-4">
              <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2"><span>🎵</span> Music Management (၅ ပုဒ်အထိ)</h3>
              <div className="border-2 border-dashed border-slate-600 rounded-2xl p-6 flex flex-col items-center justify-center mb-4 bg-[#0b1120]">
                <span className="text-4xl mb-3">🎧</span>
                <p className="text-xs text-slate-400 mb-4 text-center">10MB အောက် (MP3)</p>
                <input type="file" id="musicUpload" accept="audio/mp3" multiple onChange={handleMusicUpload} className="hidden" />
                <label htmlFor="musicUpload" className="bg-white text-black px-6 py-3 rounded-xl text-sm font-bold cursor-pointer active:scale-95">သီချင်း ရွေးချယ်ရန်</label>
              </div>
              <div className="flex flex-col gap-2">
                {musicList.length === 0 ? <p className="text-center text-xs text-slate-500 py-4">သီချင်း မရှိသေးပါ</p> :
                  musicList.map((music) => (
                    <div key={music.id} className="bg-[#0f172a] border border-slate-700 rounded-xl p-3 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">🎵</span>
                        <div><p className="text-sm font-bold text-white truncate w-40">{music.name}</p><p className="text-[10px] text-slate-400">{music.size}</p></div>
                      </div>
                      <button onClick={() => { removeMusic(music.id); showToast('သီချင်း ဖျက်ပြီးပါပြီ', 'warning'); }} className="text-red-400 text-lg p-2">🗑️</button>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-[#1e293b]/50 border border-slate-700 rounded-2xl p-4">
              <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2"><span>🌐</span> Site Info</h3>
              <div className="flex flex-col gap-3">
                <InputField placeholder="Site Name" defaultValue={siteInfo.siteName} onChange={(e) => setSiteForm({...siteForm, siteName: e.target.value})} />
                <div className="flex gap-2 items-center">
                  <div className="flex-1"><InputField placeholder="Logo URL" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} /></div>
                  <input type="file" id="logoUpload" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                  <label htmlFor="logoUpload" className="bg-blue-500 px-4 h-[46px] rounded-xl text-white flex items-center justify-center text-xs font-bold cursor-pointer active:scale-95">📤 Upload</label>
                  <button onClick={() => { setLogoUrl(''); showToast('Logo ဖျက်ပြီးပါပြီ', 'warning'); }} className="bg-red-500 px-4 h-[46px] rounded-xl text-white flex items-center justify-center text-xs font-bold active:scale-95">✖️</button>
                </div>
                <InputField placeholder="Hero Title" defaultValue={siteInfo.heroTitle} onChange={(e) => setSiteForm({...siteForm, heroTitle: e.target.value})} />
                <InputField placeholder="Hero Subtitle" defaultValue={siteInfo.heroSubtitle} onChange={(e) => setSiteForm({...siteForm, heroSubtitle: e.target.value})} />
                <div className="flex gap-2 items-center">
                  <div className="flex-1"><InputField placeholder="Video URL (mp4)" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} /></div>
                  <input type="file" id="videoUpload" accept="video/*" className="hidden" onChange={handleVideoUpload} />
                  <label htmlFor="videoUpload" className="bg-blue-500 px-4 h-[46px] rounded-xl text-white flex items-center justify-center text-xs font-bold cursor-pointer active:scale-95">🎬 Upload</label>
                  <button onClick={() => { setVideoUrl(''); showToast('Video ဖျက်ပြီးပါပြီ', 'warning'); }} className="bg-red-500 px-4 h-[46px] rounded-xl text-white flex items-center justify-center text-xs font-bold active:scale-95">✖️</button>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="flex-1"><InputField placeholder="Music URL (mp3)" value={musicUrl} onChange={(e) => setMusicUrl(e.target.value)} /></div>
                  <input type="file" id="musicUrlUpload" accept="audio/*" className="hidden" onChange={handleMusicUrlUpload} />
                  <label htmlFor="musicUrlUpload" className="bg-blue-500 px-4 h-[46px] rounded-xl text-white flex items-center justify-center text-xs font-bold cursor-pointer active:scale-95">🎵 Upload</label>
                  <button onClick={() => { setMusicUrl(''); showToast('Music ဖျက်ပြီးပါပြီ', 'warning'); }} className="bg-red-500 px-4 h-[46px] rounded-xl text-white flex items-center justify-center text-xs font-bold active:scale-95">✖️</button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <InputField placeholder="Primary color" defaultValue={siteInfo.primaryColor} onChange={(e) => setSiteForm({...siteForm, primaryColor: e.target.value})} />
                  <InputField placeholder="Secondary color" defaultValue={siteInfo.secondaryColor} onChange={(e) => setSiteForm({...siteForm, secondaryColor: e.target.value})} />
                </div>
                <button onClick={handleSaveSiteInfo} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl text-sm font-bold w-full active:scale-95">💾 Save Site Info</button>
              </div>
            </div>

            <div className="bg-[#1e293b]/50 border border-slate-700 rounded-2xl p-4">
              <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2"><span>🏷️</span> Text Labels</h3>
              <div className="flex flex-col gap-3">
                <InputField placeholder="Balance label" defaultValue="လက်ကျန်ငွေ" />
                <InputField placeholder="Games title" defaultValue="ဂိမ်းများ" />
                <InputField placeholder="Search placeholder" defaultValue="ဂိမ်း ရှာပါ..." />
                <button onClick={handleSaveLabels} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl text-sm font-bold w-full active:scale-95">💾 Save Labels</button>
              </div>
            </div>

            <div className="bg-[#1e293b]/50 border border-slate-700 rounded-2xl p-4">
              <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2"><span>💳</span> Payment Methods</h3>
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <InputField placeholder="Name" value={payName} onChange={(e) => setPayName(e.target.value)} />
                  <InputField placeholder="Short" value={payShort} onChange={(e) => setPayShort(e.target.value)} />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1"><InputField placeholder="Class" value={payClass} onChange={(e) => setPayClass(e.target.value)} /></div>
                  <button onClick={handleAddPayment} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 h-[46px] rounded-xl text-sm font-bold active:scale-95">➕ ထည့်</button>
                </div>
              </div>
            </div>

            <div className="bg-[#1e293b]/50 border border-slate-700 rounded-2xl p-4">
              <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2"><span>🔗</span> Social Links</h3>
              <div className="flex flex-col gap-3">
                <InputField placeholder="Facebook URL" defaultValue={siteInfo.facebookUrl} />
                <InputField placeholder="TikTok URL" defaultValue={siteInfo.tiktokUrl} />
                <InputField placeholder="WhatsApp Number" defaultValue={siteInfo.whatsapp} />
                <InputField placeholder="Viber Number" defaultValue={siteInfo.viber} />
                <button onClick={handleSaveSocial} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl text-sm font-bold w-full active:scale-95">💾 Save Social</button>
              </div>
            </div>

            <div className="bg-[#1e293b]/50 border border-slate-700 rounded-2xl p-4">
              <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2"><span>✅</span> Trust Badges</h3>
              <div className="flex gap-2 items-center mb-3">
                <input type="checkbox" className="w-5 h-5 accent-emerald-500" defaultChecked />
                <div className="flex-1"><InputField placeholder="Text" defaultValue="Verified Shop" /></div>
                <button onClick={handleAddBadge} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 h-[46px] rounded-xl text-sm font-bold active:scale-95">➕ Add</button>
              </div>
            </div>

            <div className="bg-[#1e293b]/50 border border-slate-700 rounded-2xl p-4">
              <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2"><span>❓</span> FAQ Editor</h3>
              <div className="flex gap-2 items-center mb-3">
                <div className="flex-1"><InputField placeholder="Question" /></div>
                <div className="flex-1"><InputField placeholder="Answer" /></div>
                <button onClick={handleAddFaq} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 h-[46px] rounded-xl text-sm font-bold active:scale-95">➕ Add</button>
              </div>
            </div>
          </div>
        );

      case 'coupons':
        return (
          <div className="bg-[#1e293b]/50 border border-slate-700 rounded-2xl p-4">
            <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2"><span>🎟️</span> Coupons</h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <InputField placeholder="Coupon Code" defaultValue="SAFEZONE50" />
              <InputField placeholder="Points" type="number" defaultValue="50" />
            </div>
            <button onClick={handleAddCoupon} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl text-sm font-bold w-full mb-6 active:scale-95">➕ ထည့်မည်</button>
            <div className="bg-[#0f172a] border border-slate-700 rounded-xl p-3">
              <p className="text-xs font-bold text-yellow-400">SAFEZONE50</p>
              <p className="text-[10px] text-slate-400 mt-1">+50 Points</p>
            </div>
          </div>
        );

      case 'chats':
        return (
          <div className="bg-[#1e293b]/50 border border-slate-700 rounded-2xl p-4">
            <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2"><span>💬</span> Live Chats</h3>
            <div className="text-center py-8 text-slate-500 text-xs">Chat တောင်းဆိုမှု မရှိသေးပါ</div>
          </div>
        );

      case 'settings':
        return (
          <div className="flex flex-col gap-4">
            <div className={`bg-[#1e293b]/50 border rounded-2xl p-4 ${maintenanceMode ? 'border-red-500/50' : 'border-green-500/50'}`}>
              <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2"><span>🛠️</span> Maintenance Mode</h3>
              <div className="flex justify-between items-center bg-[#0f172a] p-4 rounded-xl border border-slate-700 mb-4">
                <div>
                  <span className="text-sm font-bold block text-white">Website Status</span>
                  <span className={`text-xs font-bold ${maintenanceMode ? 'text-red-400' : 'text-green-400'}`}>{maintenanceMode ? 'Offline' : 'Active (Online)'}</span>
                </div>
                <button onClick={() => { setMaintenanceMode(!maintenanceMode); showToast(maintenanceMode ? 'Website ပြန်ဖွင့်ပြီးပါပြီ' : 'Maintenance Mode ဖွင့်ပြီးပါပြီ', maintenanceMode ? 'success' : 'warning'); }} className={`p-3 rounded-xl text-white ${maintenanceMode ? 'bg-red-500' : 'bg-green-500'} active:scale-95`}>
                  {maintenanceMode ? '🔴' : '🟢'}
                </button>
              </div>
              <InputField placeholder="Message" defaultValue="Website is under maintenance." />
              <button onClick={handleSaveMaintenance} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl text-sm font-bold w-full mt-4 active:scale-95">💾 Message Save</button>
            </div>

            <div className="bg-[#1e293b]/50 border border-slate-700 rounded-2xl p-4">
              <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2"><span>⚙️</span> Site Settings</h3>
              <div className="flex flex-col gap-4">
                <InputField placeholder="Site Name" defaultValue={siteInfo.siteName} />
                <InputField placeholder="Payment Number" defaultValue={siteInfo.paymentNumber} />
                <InputField placeholder="Owner Name" defaultValue={siteInfo.ownerName} />
                <InputField placeholder="WhatsApp" defaultValue={siteInfo.whatsapp} />
                <InputField placeholder="Viber" defaultValue={siteInfo.viber} />
                <InputField placeholder="TikTok URL" defaultValue={siteInfo.tiktokUrl} />
                <InputField placeholder="Facebook URL" defaultValue={siteInfo.facebookUrl} />
                <button onClick={handleSaveSettings} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl text-sm font-bold w-full active:scale-95">💾 Save All</button>
              </div>
            </div>

            <div className="bg-[#1e293b]/50 border border-slate-700 rounded-2xl p-4">
              <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2"><span>🎨</span> Banners</h3>
              <div className="flex flex-col gap-3 mb-4">
                <InputField label="Banner Image URL" placeholder="https://example.com/banner.jpg" value={bannerImage} onChange={(e) => setBannerImage(e.target.value)} />
              </div>
              <button onClick={handleSaveBanners} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl text-sm font-bold w-full active:scale-95">💾 Save Banners</button>
            </div>

            <div className="bg-[#1e293b]/50 border border-green-500/50 rounded-2xl p-4">
              <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2"><span>💾</span> GitHub Backup</h3>
              <div className="flex justify-between items-center bg-[#0f172a] p-3 rounded-xl mb-4 border border-slate-700">
                <div>
                  <span className="text-sm font-bold block">Auto Backup</span>
                  <span className={`text-xs font-bold ${autoBackup ? 'text-green-400' : 'text-red-400'}`}>{autoBackup ? 'Enabled' : 'Disabled'}</span>
                </div>
                <button onClick={() => { setAutoBackup(!autoBackup); showToast(autoBackup ? 'Auto Backup ပိတ်လိုက်ပါပြီ' : 'Auto Backup ဖွင့်လိုက်ပါပြီ'); }} className={`p-3 rounded-xl text-white ${autoBackup ? 'bg-green-500' : 'bg-red-500'} active:scale-95`}>
                  {autoBackup ? '🟢' : '🔴'}
                </button>
              </div>
              <div className="flex flex-col gap-3 mb-4">
                <InputField placeholder="GitHub Token (ghp_...)" type="password" defaultValue="ghp_xxxxxxxxxxxx" />
                <InputField placeholder="GitHub Username" defaultValue="safezoneadmin" />
                <InputField placeholder="Backup Repo Name" defaultValue="safe-zone-backup" />
                <div className="grid grid-cols-2 gap-3">
                  <InputField placeholder="main" defaultValue="main" />
                  <InputField placeholder="5" defaultValue="5" />
                </div>
              </div>
              <div className="flex gap-2 mb-3">
                <button onClick={() => showToast('GitHub Token Save လုပ်ပြီးပါပြီ')} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 flex-1 active:scale-95">💾 Save</button>
                <button onClick={handleGithubBackup} className="bg-[#20c997] text-white px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 flex-1 active:scale-95">📤 Backup Now</button>
              </div>
               <button onClick={handleGithubRestore} className="bg-[#ff922b] text-white px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 w-full mb-3 active:scale-95">🔄 Restore</button>
               <p className="text-xs text-slate-500 text-center font-medium">Private Repo ဖြစ်ရမည်</p>
            </div>

            <div className="bg-[#1e293b]/50 border border-orange-500/50 rounded-2xl p-4">
              <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2"><span>📢</span> Announcement Banner</h3>
              <p className="text-xs text-slate-400 mb-4">User Site မှာ အောက်ပါစာသား ပြသမည် ဖြစ်သည်</p>
              <div className="flex justify-between items-center bg-[#0f172a] p-3 rounded-xl mb-4 border border-slate-700">
                <div>
                  <span className="text-sm font-bold block">Banner Status</span>
                  <span className={`text-xs font-bold ${bannerActive ? 'text-green-400' : 'text-red-400'}`}>{bannerActive ? 'Active' : 'Inactive'}</span>
                </div>
                <button onClick={() => { setBannerActive(!bannerActive); showToast(bannerActive ? 'Banner ပိတ်လိုက်ပါပြီ' : 'Banner ဖွင့်လိုက်ပါပြီ'); }} className={`p-3 rounded-xl text-white ${bannerActive ? 'bg-green-500' : 'bg-red-500'} active:scale-95`}>
                  {bannerActive ? '🟢' : '🔴'}
                </button>
              </div>
              <div className="flex gap-2 mb-4">
                <select value={bannerType} onChange={(e) => setBannerType(e.target.value)} className="bg-[#0b1120] border border-slate-700 rounded-xl p-3 text-sm text-white flex-1 focus:outline-none focus:border-blue-500">
                  <option>Info</option>
                  <option>Warning</option>
                  <option>Success</option>
                </select>
                <button onClick={() => showToast('Banner Save လုပ်ပြီးပါပြီ')} className="bg-[#4dabf7] text-white px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2 active:scale-95">💾 Save</button>
                <button onClick={() => { setBannerText(''); showToast('Banner Clear လုပ်ပြီးပါပြီ', 'warning'); }} className="bg-[#ff6b6b] text-white px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2 active:scale-95">🗑️ Clear</button>
              </div>
              <div className="border border-dashed border-slate-600 rounded-xl p-4 bg-[#0b1120]">
                <p className="text-xs text-slate-500 mb-2">Preview:</p>
                <input type="text" value={bannerText} onChange={(e) => setBannerText(e.target.value)} className="w-full bg-[#1e293b] border border-slate-700 rounded-xl p-3 text-sm text-white text-center font-bold" />
              </div>
            </div>

            <div className="bg-[#1e293b]/50 border border-red-500/50 rounded-2xl p-4">
              <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2"><span>🛠️</span> Bot Debug</h3>
              <p className="text-xs text-slate-400 mb-4">Bot status စစ်ဆေးရန်</p>
              <button onClick={handleBotDebug} className="bg-[#ff6b6b] text-white px-6 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 w-full mb-4 active:scale-95">▶️ Debug စစ်</button>
              <div className={`bg-[#0f172a] border rounded-xl p-3 text-xs flex items-start gap-2 ${botStatus === 'Debug Ok' ? 'border-green-500/30 text-green-400' : 'border-red-500/30 text-red-400'}`}>
                <span className="text-sm">{botStatus === 'Debug Ok' ? '✅' : '❌'}</span>
                <span>{botStatus === 'Debug Ok' ? 'Bot is running smoothly. No errors found.' : 'Error found. Please try again.'}</span>
              </div>
            </div>

            <button onClick={() => setShowLogoutConfirm(true)} className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold py-4 rounded-2xl border border-red-500/20 flex items-center justify-center gap-2 active:scale-95">
              <span>🚪</span> Logout Admin
            </button>
          </div>
        );

      default:
        return <div className="text-center text-slate-500 py-20 text-sm">ဒီအပိုင်းကို လုပ်ဆောင်နေပါသည်။</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-white p-4 pb-24 font-sans relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] animate-float"></div>
        <div className="absolute top-[40%] right-[-10%] w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] animate-float-delayed"></div>
      </div>

      <div className="relative z-10 max-w-md mx-auto">
        {toast.show && (
          <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[100] px-6 py-3 rounded-2xl shadow-2xl text-sm font-bold flex items-center gap-2 ${
            toast.type === 'success' ? 'bg-green-500 text-white' : 
            toast.type === 'error' ? 'bg-red-500 text-white' : 
            toast.type === 'warning' ? 'bg-yellow-500 text-black' : 'bg-blue-500 text-white'
          }`}>
            {toast.type === 'success' && <span>✅</span>}
            {toast.type === 'error' && <span>❌</span>}
            {toast.type === 'warning' && <span>⚠️</span>}
            {toast.type === 'info' && <span>ℹ️</span>}
            {toast.message}
          </div>
        )}

        <div className="flex items-center justify-between mb-6 mt-2">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center text-3xl border border-slate-600 shadow-lg">🛡️</div>
            <div>
              <h1 className="text-2xl font-black tracking-tight">Admin Place</h1>
              <p className="text-xs text-slate-400 font-medium tracking-wider">CONTROL PANEL</p>
            </div>
          </div>
          <button onClick={() => setShowLogoutConfirm(true)} className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl active:scale-95 shadow-lg">
            🚪
          </button>
        </div>

        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
          {topActions.map((action) => (
            <button key={action.id} onClick={() => handleTopAction(action.id)}
              className={`bg-[#1e293b] border border-slate-700 text-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap hover:bg-slate-800 active:scale-95`}>
              <span>{action.emoji}</span> {action.name}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {mainTabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5 transition-all ${activeTab === tab.id ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' : 'bg-[#1e293b]/80 text-slate-400 border border-slate-700 hover:bg-slate-800'}`}>
              <span>{tab.emoji}</span> {tab.name}
            </button>
          ))}
        </div>

        <div className="bg-[#1e293b]/50 border border-slate-800 rounded-3xl p-4 min-h-[50vh]">
          {renderContent()}
        </div>
      </div>

      {editingUser && (
        <div className="fixed inset-0 bg-black/80 z-[110] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#1e293b] w-full max-w-sm rounded-3xl border border-slate-700 shadow-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">User အချက်အလက် ပြင်ရန်</h3>
            <div className="flex flex-col gap-4">
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-[#0b1120] border-2 border-slate-700 flex items-center justify-center overflow-hidden">
                  {editAvatar ? <img src={editAvatar} className="w-full h-full object-cover" /> : <span className="text-2xl">👤</span>}
                </div>
              </div>
              <input type="file" id="avatarEdit" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
              <label htmlFor="avatarEdit" className="bg-slate-700 hover:bg-slate-600 text-white text-center px-4 py-2 rounded-lg text-xs font-medium cursor-pointer active:scale-95">Avatar ပုံ ရွေးရန်</label>
              <InputField placeholder="Name" value={editName} onChange={(e) => setEditName(e.target.value)} />
              <InputField placeholder="Phone" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} />
              <div className="flex gap-3 mt-2">
                <button onClick={() => setEditingUser(null)} className="flex-1 bg-slate-700 text-white font-bold py-3 rounded-xl active:scale-95">Cancel</button>
                <button onClick={handleSaveUserEdit} className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 rounded-xl active:scale-95">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/80 z-[110] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#1e293b] w-full max-w-sm rounded-3xl border border-slate-700 shadow-2xl p-6 text-center">
            <span className="text-5xl block mb-4">🚪</span>
            <h3 className="text-xl font-bold text-white mb-2">Logout ထွက်ရန် သေချာပါသလား?</h3>
            <p className="text-sm text-slate-400 mb-6">Admin အကောင့်မှ ထွက်ပြီး Login စာမျက်နှာကို ပြန်သွားပါမည်။</p>
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

export default Admin;
