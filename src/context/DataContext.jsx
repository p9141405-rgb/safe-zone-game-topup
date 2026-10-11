import React, { createContext, useState, useContext, useEffect } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = localStorage.getItem('safeZoneRegisteredUsers');
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('safeZoneUser');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('safeZoneAdmin');
    return saved ? JSON.parse(saved) : null;
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('safeZoneDarkMode');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('safeZoneBalance');
    return saved ? JSON.parse(saved) : 0;
  });
  const [points, setPoints] = useState(() => {
    const saved = localStorage.getItem('safeZonePoints');
    return saved ? JSON.parse(saved) : 0;
  });
  const [deposits, setDeposits] = useState(() => {
    const saved = localStorage.getItem('safeZoneDeposits');
    return saved ? JSON.parse(saved) : [];
  });
  const [games, setGames] = useState(() => {
    const saved = localStorage.getItem('safeZoneGames');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Mobile Legends', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/74/Mobile_Legends_Bang_Bang_logo.png/220px-Mobile_Legends_Bang_Bang_logo.png' },
      { id: 2, name: 'PUBG Mobile', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/44/PlayerUnknown%27s_Battlegrounds_Mobile_app_icon.png/220px-PlayerUnknown%27s_Battlegrounds_Mobile_app_icon.png' },
    ];
  });
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('safeZoneOrders');
    return saved ? JSON.parse(saved) : [];
  });
  const [chatRules, setChatRules] = useState(() => {
    const saved = localStorage.getItem('safeZoneChatRules');
    return saved ? JSON.parse(saved) : [
      { id: 1, keywords: ['hi', 'hello', 'မင်္ဂလာပါ'], reply: 'မင်္ဂလာပါ။ Safe Zone မှ ကြိုဆိုပါတယ်။ ဘာကူညီပေးရမလဲ?' },
      { id: 2, keywords: ['deposit', 'ငွေသွင်း'], reply: 'ငွေသွင်းရန် Wallet Tab ကို သွားပြီး လိုအပ်တဲ့ ပမာဏနဲ့ Receipt ပုံကို တင်ပေးပါ။' },
    ];
  });
  const [siteInfo, setSiteInfo] = useState(() => {
    const saved = localStorage.getItem('safeZoneSiteInfo');
    return saved ? JSON.parse(saved) : {
      siteName: 'Safe Zone Topup',
      paymentNumber: '09763442881',
      ownerName: 'Safe Zone Admin',
      whatsapp: '09763442881',
      viber: '09763442881',
      tiktokUrl: 'https://tiktok.com/@safezone',
      facebookUrl: 'https://facebook.com/safezone',
      primaryColor: '#38bdf8',
      secondaryColor: '#a855f7',
      heroTitle: 'Fast & Reliable Game Topup',
      heroSubtitle: 'Top up your favorite games instantly',
    };
  });
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Welcome to Safe Zone!', message: 'ကျွန်ုပ်တို့ဝဘ်ဆိုဒ်မှ ကြိုဆိုပါတယ်', time: 'Just now', read: false },
  ]);
  const [musicList, setMusicList] = useState([]);
  const [botActive, setBotActive] = useState(() => {
    const saved = localStorage.getItem('safeZoneBotActive');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'bot', text: 'မင်္ဂလာပါ။ Safe Zone Admin Support မှ ကြိုဆိုပါတယ်။ ဘာကူညီပေးရမလဲ?', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);

  const [theme, setTheme] = useState(() => localStorage.getItem('safeZoneTheme') || 'blue');
  const [profileBg, setProfileBg] = useState(() => localStorage.getItem('safeZoneBg') || '');
  const [avatarImg, setAvatarImg] = useState(() => localStorage.getItem('safeZoneAvatar') || '');
  
  // Maintenance Mode State
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState('Website is currently under maintenance. Please check back later.');

  const [autoBackup, setAutoBackup] = useState(false);
  const [bannerActive, setBannerActive] = useState(true);
  const [bannerText, setBannerText] = useState('Flash Sale 50% Off!');
  const [bannerType, setBannerType] = useState('Info');
  const [botStatus, setBotStatus] = useState('Debug Ok');

  useEffect(() => {
    localStorage.setItem('safeZoneRegisteredUsers', JSON.stringify(registeredUsers));
    localStorage.setItem('safeZoneUser', JSON.stringify(user));
    localStorage.setItem('safeZoneAdmin', JSON.stringify(admin));
    localStorage.setItem('safeZoneDarkMode', JSON.stringify(isDarkMode));
    localStorage.setItem('safeZoneBalance', JSON.stringify(balance));
    localStorage.setItem('safeZonePoints', JSON.stringify(points));
    localStorage.setItem('safeZoneDeposits', JSON.stringify(deposits));
    localStorage.setItem('safeZoneGames', JSON.stringify(games));
    localStorage.setItem('safeZoneOrders', JSON.stringify(orders));
    localStorage.setItem('safeZoneChatRules', JSON.stringify(chatRules));
    localStorage.setItem('safeZoneSiteInfo', JSON.stringify(siteInfo));
    localStorage.setItem('safeZoneBotActive', JSON.stringify(botActive));
    localStorage.setItem('safeZoneTheme', theme);
    localStorage.setItem('safeZoneBg', profileBg);
    localStorage.setItem('safeZoneAvatar', avatarImg);
    localStorage.setItem('safeZoneBannerActive', JSON.stringify(bannerActive));
    localStorage.setItem('safeZoneBannerText', bannerText);
    localStorage.setItem('safeZoneBannerType', bannerType);
    localStorage.setItem('safeZoneMaintenanceMode', JSON.stringify(maintenanceMode));
    localStorage.setItem('safeZoneMaintenanceMsg', maintenanceMessage);
  }, [registeredUsers, user, admin, isDarkMode, balance, points, deposits, games, orders, chatRules, siteInfo, botActive, theme, profileBg, avatarImg, bannerActive, bannerText, bannerType, maintenanceMode, maintenanceMessage]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  const markAllNotificationsRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  const addNotification = (title, message) => {
    setNotifications(prev => [{ id: Date.now(), title, message, time: 'Just now', read: false }, ...prev]);
  };

  const userLogin = (username, password) => {
    if (!username || !password) return { success: false, message: 'Username နှင့် Password ထည့်ပါ။' };
    const foundUser = registeredUsers.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (foundUser && foundUser.password === password) {
      setUser({ username: foundUser.username, phone: foundUser.phone, role: 'user', name: foundUser.name || foundUser.username, avatar: foundUser.avatar });
      return { success: true };
    }
    return { success: false, message: 'Username သို့မဟုတ် Password မှားနေပါသည်။' };
  };

  const register = (username, phone, password) => {
    if (!username || !phone || !password) return { success: false, message: 'အချက်အလက်များ ပြည့်စုံစွာ ထည့်ပါ။' };
    const exists = registeredUsers.some(u => u.username.toLowerCase() === username.toLowerCase());
    if (exists) return { success: false, message: 'ဒီ Username ကို အသုံးပြုပြီးသား ဖြစ်နေပါတယ်။' };
    const newUser = { username, phone, password, name: username, avatar: '' };
    setRegisteredUsers([...registeredUsers, newUser]);
    setUser({ username, phone, role: 'user', name: username });
    return { success: true };
  };
  
  const userLogout = () => setUser(null);

  const adminLogin = (username, password) => {
    if (username === 'admin' && password === '2102002') { 
      setAdmin({ username: 'admin', role: 'admin', name: 'Super Admin' }); 
      return { success: true }; 
    }
    return { success: false, message: 'Admin Username သို့မဟုတ် Password မှားနေပါသည်။' };
  };
  const adminLogout = () => setAdmin(null);

  const updateUserProfile = (username, newName, newPhone, newAvatar) => {
    setRegisteredUsers(prev => prev.map(u => 
      u.username === username ? { ...u, name: newName, phone: newPhone, avatar: newAvatar } : u
    ));
    if (user && user.username === username) {
      setUser(prev => ({ ...prev, name: newName, phone: newPhone, avatar: newAvatar }));
    }
  };

  const addGame = (newGame) => setGames([...games, { ...newGame, id: Date.now() }]);
  const deleteGame = (id) => setGames(games.filter(game => game.id !== id));
  const addMusic = (file) => setMusicList([...musicList, { id: Date.now(), name: file.name, url: URL.createObjectURL(file), size: (file.size / (1024 * 1024)).toFixed(2) + ' MB' }]);
  const removeMusic = (id) => setMusicList(musicList.filter(m => m.id !== id));
  const toggleBot = () => setBotActive(prev => !prev);

  const addChatRule = (keywords, reply) => {
    const keywordArray = keywords.split(',').map(k => k.trim().toLowerCase()).filter(k => k);
    setChatRules([...chatRules, { id: Date.now(), keywords: keywordArray, reply }]);
  };
  const deleteChatRule = (id) => setChatRules(chatRules.filter(r => r.id !== id));

  const createOrder = (gameName, packageName, amount) => {
    const newOrder = { id: 'ORD-' + Math.floor(1000 + Math.random() * 9000), user: user?.name || 'User', game: gameName, package: packageName, amount: amount + ' Ks', status: 'Pending', date: new Date().toLocaleDateString() };
    setOrders([newOrder, ...orders]);
  };

  const createDeposit = (amount, receiptName) => {
    const newDep = { id: 'DEP-' + Math.floor(1000 + Math.random() * 9000), user: user?.name || 'User', amount: amount + ' Ks', method: 'KBZ Pay', receipt: receiptName, status: 'Pending', date: new Date().toLocaleDateString() };
    setDeposits([newDep, ...deposits]);
  };

  const updateDepositStatus = (id, status) => {
    setDeposits(deposits.map(d => d.id === id ? { ...d, status } : d));
    if (status === 'Completed') {
      const dep = deposits.find(d => d.id === id);
      if (dep) setBalance(prev => prev + parseInt(dep.amount));
    }
  };

  const updateOrderStatus = (id, status) => setOrders(orders.map(o => o.id === id ? { ...o, status } : o));

  const redeemCoupon = (code) => {
    if (code === 'SAFEZONE50') { setPoints(prev => prev + 50); return { success: true, message: 'Coupon အောင်မြင်စွာ လဲပြီးပါပြီ! +50 Points' }; }
    return { success: false, message: 'Coupon ကုဒ် မှားနေပါသည်။' };
  };

  const convertPoints = () => {
    if (points >= 100) { setPoints(prev => prev - 100); setBalance(prev => prev + 1000); return { success: true, message: '100 Points ကို 1,000 Ks အဖြစ် လဲပြီးပါပြီ!' }; }
    return { success: false, message: 'Points မလုံလောက်ပါ။' };
  };

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const userMsg = { id: Date.now(), sender: 'user', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages(prev => [...prev, userMsg]);
    if (botActive) {
      setIsBotTyping(true);
      setTimeout(() => {
        const lowerText = text.toLowerCase();
        const matchedRule = chatRules.find(rule => rule.keywords.some(kw => lowerText.includes(kw)));
        const replyText = matchedRule ? matchedRule.reply : 'ဒီမေးခွန်းအတွက် အဖြေမရှိသေးပါ။ ခဏစောင့်ပြီး Admin မှ ပြန်လည်ဖြေကြားပါမယ်။ 🙏';
        const botMsg = { id: Date.now() + 1, sender: 'bot', text: replyText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        setChatMessages(prev => [...prev, botMsg]);
        setIsBotTyping(false);
      }, 1000);
    }
  };

  const updateSiteInfo = (newInfo) => setSiteInfo({ ...siteInfo, ...newInfo });

  return (
    <DataContext.Provider value={{ 
      user, userLogin, register, userLogout, updateUserProfile,
      admin, adminLogin, adminLogout,
      isDarkMode, toggleDarkMode, notifications, markAllNotificationsRead, addNotification,
      balance, points, deposits, games, addGame, deleteGame, orders, setOrders, 
      musicList, addMusic, removeMusic,
      theme, setTheme, profileBg, setProfileBg, avatarImg, setAvatarImg,
      chatRules, addChatRule, deleteChatRule, chatMessages, sendMessage,
      botActive, toggleBot, isBotTyping, createOrder, createDeposit, 
      updateDepositStatus, updateOrderStatus, redeemCoupon, convertPoints, 
      siteInfo, updateSiteInfo, 
      maintenanceMode, setMaintenanceMode, 
      maintenanceMessage, setMaintenanceMessage,
      autoBackup, setAutoBackup, bannerActive, setBannerActive, 
      bannerText, setBannerText, bannerType, setBannerType, botStatus, setBotStatus,
      registeredUsers
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
