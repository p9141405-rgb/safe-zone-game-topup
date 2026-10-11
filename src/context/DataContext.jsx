import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  collection, doc, setDoc, getDoc, getDocs, 
  onSnapshot, addDoc, updateDoc, deleteDoc, query, where 
} from 'firebase/firestore';
import { auth, db } from '../firebase';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('safeZoneAdmin');
    return saved ? JSON.parse(saved) : null;
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('safeZoneDarkMode');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [balance, setBalance] = useState(0);
  const [points, setPoints] = useState(0);
  const [deposits, setDeposits] = useState([]);
  const [games, setGames] = useState([]);
  const [orders, setOrders] = useState([]);
  const [chatRules, setChatRules] = useState([]);
  const [siteInfo, setSiteInfo] = useState({});
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Welcome to Safe Zone!', message: 'ကျွန်ုပ်တို့ဝဘ်ဆိုဒ်မှ ကြိုဆိုပါတယ်', time: 'Just now', read: false },
  ]);
  const [musicList, setMusicList] = useState([]);
  const [botActive, setBotActive] = useState(true);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'bot', text: 'မင်္ဂလာပါ။ Safe Zone Admin Support မှ ကြိုဆိုပါတယ်။ ဘာကူညီပေးရမလဲ?', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);

  // Theme & UI States
  const [theme, setTheme] = useState(() => localStorage.getItem('safeZoneTheme') || 'blue');
  const [profileBg, setProfileBg] = useState(() => localStorage.getItem('safeZoneBg') || '');
  const [avatarImg, setAvatarImg] = useState(() => localStorage.getItem('safeZoneAvatar') || '');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [autoBackup, setAutoBackup] = useState(false);
  const [bannerActive, setBannerActive] = useState(true);
  const [bannerText, setBannerText] = useState('Flash Sale 50% Off!');
  const [bannerType, setBannerType] = useState('Info');
  const [botStatus, setBotStatus] = useState('Debug Ok');

  // Sync UI settings to LocalStorage
  useEffect(() => {
    localStorage.setItem('safeZoneDarkMode', JSON.stringify(isDarkMode));
    localStorage.setItem('safeZoneTheme', theme);
    localStorage.setItem('safeZoneBg', profileBg);
    localStorage.setItem('safeZoneAvatar', avatarImg);
    localStorage.setItem('safeZoneAdmin', JSON.stringify(admin));
  }, [isDarkMode, theme, profileBg, avatarImg, admin]);

  // Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Fetch user profile from Firestore
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({ uid: currentUser.uid, ...userData });
          setBalance(userData.balance || 0);
          setPoints(userData.points || 0);
        }
      } else {
        setUser(null);
        setBalance(0);
        setPoints(0);
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch Games from Firestore
  useEffect(() => {
    const q = query(collection(db, 'games'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const gamesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGames(gamesData);
    });
    return () => unsubscribe();
  }, []);

  // Fetch Deposits from Firestore
  useEffect(() => {
    const q = query(collection(db, 'deposits'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const depositsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDeposits(depositsData);
    });
    return () => unsubscribe();
  }, []);

  // Fetch Orders from Firestore
  useEffect(() => {
    const q = query(collection(db, 'orders'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersData);
    });
    return () => unsubscribe();
  }, []);

  // Fetch Chat Rules from Firestore
  useEffect(() => {
    const q = query(collection(db, 'chatRules'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const rulesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setChatRules(rulesData);
    });
    return () => unsubscribe();
  }, []);

  // Fetch Site Info from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'siteInfo', 'config'), (docSnap) => {
      if (docSnap.exists()) {
        setSiteInfo(docSnap.data());
      }
    });
    return () => unsubscribe();
  }, []);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  const markAllNotificationsRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  // User Auth Functions
  const userLogin = async (username, password) => {
    try {
      const email = `${username.toLowerCase()}@safezone.com`;
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Username သို့မဟုတ် Password မှားနေပါသည်။' };
    }
  };

  const register = async (username, phone, password) => {
    if (!username || !phone || !password) return { success: false, message: 'အချက်အလက်များ ပြည့်စုံစွာ ထည့်ပါ။' };
    
    try {
      // Check if username already exists in Firestore
      const q = query(collection(db, 'users'), where('username', '==', username.toLowerCase()));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        return { success: false, message: 'ဒီ Username ကို အသုံးပြုပြီးသား ဖြစ်နေပါတယ်။' };
      }

      const email = `${username.toLowerCase()}@safezone.com`;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Save user data to Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        username: username.toLowerCase(),
        phone,
        balance: 0,
        points: 0,
        role: 'user',
        createdAt: new Date().toISOString()
      });

      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Registration မအောင်မြင်ပါ။ ထပ်စမ်းကြည့်ပါ။' };
    }
  };

  const userLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Logout error', error);
    }
  };

  // Admin Auth (Local handling since admin is a fixed account)
  const adminLogin = (username, password) => {
    if (username === 'admin' && password === '2102002') { 
      setAdmin({ username: 'admin', role: 'admin', name: 'Super Admin' }); 
      return { success: true }; 
    }
    return { success: false, message: 'Admin Username သို့မဟုတ် Password မှားနေပါသည်။' };
  };
  const adminLogout = () => setAdmin(null);

  // Admin Functions (Writing to Firestore)
  const addGame = async (newGame) => {
    await addDoc(collection(db, 'games'), newGame);
  };

  const deleteGame = async (id) => {
    await deleteDoc(doc(db, 'games', id));
  };

  const addMusic = (file) => setMusicList([...musicList, { id: Date.now(), name: file.name, url: URL.createObjectURL(file), size: (file.size / (1024 * 1024)).toFixed(2) + ' MB' }]);
  const removeMusic = (id) => setMusicList(musicList.filter(m => m.id !== id));
  const toggleBot = () => setBotActive(prev => !prev);

  const addChatRule = async (keywords, reply) => {
    const keywordArray = keywords.split(',').map(k => k.trim().toLowerCase()).filter(k => k);
    await addDoc(collection(db, 'chatRules'), { keywords: keywordArray, reply });
  };

  const deleteChatRule = async (id) => {
    await deleteDoc(doc(db, 'chatRules', id));
  };

  // User Functions
  const createOrder = async (gameName, packageName, amount) => {
    if (!user) return;
    await addDoc(collection(db, 'orders'), {
      userId: user.uid,
      user: user.username,
      game: gameName,
      package: packageName,
      amount: amount + ' Ks',
      status: 'Pending',
      date: new Date().toLocaleDateString()
    });
  };

  const createDeposit = async (amount, receiptName) => {
    if (!user) return;
    await addDoc(collection(db, 'deposits'), {
      userId: user.uid,
      user: user.username,
      amount: amount + ' Ks',
      method: 'KBZ Pay',
      receipt: receiptName,
      status: 'Pending',
      date: new Date().toLocaleDateString()
    });
  };

  const updateDepositStatus = async (id, status) => {
    await updateDoc(doc(db, 'deposits', id), { status });
    if (status === 'Completed') {
      const dep = deposits.find(d => d.id === id);
      if (dep) {
        // Find user by username and add balance
        const q = query(collection(db, 'users'), where('username', '==', dep.user));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userRef = doc(db, 'users', userDoc.id);
          const currentBalance = userDoc.data().balance || 0;
          await updateDoc(userRef, { balance: currentBalance + parseInt(dep.amount) });
        }
      }
    }
  };

  const updateOrderStatus = async (id, status) => {
    await updateDoc(doc(db, 'orders', id), { status });
  };

  const redeemCoupon = async (code) => {
    if (code === 'SAFEZONE50' && user) {
      const newPoints = points + 50;
      await updateDoc(doc(db, 'users', user.uid), { points: newPoints });
      setPoints(newPoints);
      return { success: true, message: 'Coupon အောင်မြင်စွာ လဲပြီးပါပြီ! +50 Points' };
    }
    return { success: false, message: 'Coupon ကုဒ် မှားနေပါသည်။' };
  };

  const convertPoints = async () => {
    if (points >= 100 && user) {
      const newPoints = points - 100;
      const newBalance = balance + 1000;
      await updateDoc(doc(db, 'users', user.uid), { points: newPoints, balance: newBalance });
      setPoints(newPoints);
      setBalance(newBalance);
      return { success: true, message: '100 Points ကို 1,000 Ks အဖြစ် လဲပြီးပါပြီ!' };
    }
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

  const updateSiteInfo = async (newInfo) => {
    await setDoc(doc(db, 'siteInfo', 'config'), newInfo, { merge: true });
  };

  return (
    <DataContext.Provider value={{ 
      user, userLogin, register, userLogout,
      admin, adminLogin, adminLogout,
      isDarkMode, toggleDarkMode, notifications, markAllNotificationsRead,
      balance, points, deposits, games, addGame, deleteGame, orders, setOrders, 
      musicList, addMusic, removeMusic,
      theme, setTheme, profileBg, setProfileBg, avatarImg, setAvatarImg,
      chatRules, addChatRule, deleteChatRule, chatMessages, sendMessage,
      botActive, toggleBot, isBotTyping, createOrder, createDeposit, 
      updateDepositStatus, updateOrderStatus, redeemCoupon, convertPoints, 
      siteInfo, updateSiteInfo, maintenanceMode, setMaintenanceMode,
      autoBackup, setAutoBackup, bannerActive, setBannerActive, 
      bannerText, setBannerText, bannerType, setBannerType, botStatus, setBotStatus
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
