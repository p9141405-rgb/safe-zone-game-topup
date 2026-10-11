import React, { useState } from 'react';
import { themeColors } from '../App';
import { useData } from '../context/DataContext';

const Wallet = () => {
  const { theme, createDeposit, siteInfo } = useData();
  const [amount, setAmount] = useState('');
  const [receiptPreview, setReceiptPreview] = useState(null);
  const [receiptName, setReceiptName] = useState('');
  const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });
  const [activeMethod, setActiveMethod] = useState('KBZ Pay');

  const showToast = (msg, type = 'success') => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 2500);
  };

  const banks = [
    { name: 'KBZ Pay', num: siteInfo.paymentNumber, logo: '🏦', color: 'bg-blue-500' },
    { name: 'Wave Money', num: siteInfo.paymentNumber, logo: '🌊', color: 'bg-yellow-500' },
    { name: 'UAB Pay', num: siteInfo.paymentNumber, logo: '💳', color: 'bg-green-500' },
    { name: 'AYA Pay', num: siteInfo.paymentNumber, logo: '🔴', color: 'bg-red-500' },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(siteInfo.paymentNumber).then(() => {
      showToast('နံပါတ် ကို Copy ကူးပြီးပါပြီ! ✅');
    }).catch(() => {
      showToast('Copy မလုပ်နိုင်ပါ။', 'error');
    });
  };

  const handleReceiptUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReceiptPreview(URL.createObjectURL(file));
      setReceiptName(file.name);
    }
  };

  const handleDeposit = () => {
    if (!amount || !receiptPreview) {
      showToast('ပမာဏနဲ့ Receipt ပုံ ထည့်ပါ။', 'error');
      return;
    }
    createDeposit(amount, receiptName);
    showToast('Deposit တောင်းဆိုမှု ပို့ပြီးပါပြီ! ✅ Admin စစ်ဆေးပါမယ်။');
    setAmount('');
    setReceiptPreview(null);
    setReceiptName('');
  };

  return (
    <div className="p-4 pt-6 pb-24">
      {toast.show && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[100] px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold ${
          toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>{toast.msg}</div>
      )}

      <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-200"><span>💳</span> Wallet ငွေဖြည့်ရန်</h2>
      
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-5 flex justify-between items-center mb-6 shadow-lg shadow-orange-500/20">
        <div className="flex items-center gap-3 text-white font-medium text-sm">
          <span className="bg-white/20 p-2 rounded-full text-lg">👤</span> {siteInfo.siteName} — {siteInfo.paymentNumber}
        </div>
        <button onClick={handleCopy} className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg text-xs font-medium backdrop-blur-sm active:scale-95">📋 Copy</button>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        {banks.map((bank, i) => (
          <div key={i} onClick={() => setActiveMethod(bank.name)}
            className={`border rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition-all ${activeMethod === bank.name ? 'bg-[#1e293b] border-blue-500/50 shadow-lg' : 'bg-[#1e293b]/80 border-slate-800'}`}>
            <div className={`w-12 h-12 rounded-xl ${bank.color} flex items-center justify-center text-xl shadow-inner`}>{bank.logo}</div>
            <div className="flex-1">
              <p className="font-bold text-sm text-slate-200">{bank.name}</p>
              <p className="text-xs text-slate-400">{bank.num} · Safe Zone</p>
            </div>
            {activeMethod === bank.name && <span className="text-blue-400 text-xl">✓</span>}
          </div>
        ))}
      </div>

      <div className="bg-[#1e293b]/80 border border-slate-800 rounded-2xl p-5">
        <input type="number" placeholder="ပမာဏ (Ks)" value={amount} onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-[#0b1120] border border-slate-700 rounded-xl p-3.5 mb-4 text-sm text-white focus:outline-none focus:border-blue-500" />
        
        <p className="text-xs text-yellow-400 mb-4 flex items-center gap-2"><span>📸</span> ငွေလွှဲ Receipt ပုံ (မဖြစ်မနေ ထည့်ပါ)</p>
        
        <div className="border border-dashed border-slate-600 rounded-xl p-4 flex items-center gap-4 mb-4 bg-[#0b1120]">
          <input type="file" id="receipt" accept="image/*" className="hidden" onChange={handleReceiptUpload} />
          <label htmlFor="receipt" className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-xs font-medium cursor-pointer">Choose File</label>
          <span className="text-xs text-slate-500 truncate max-w-[150px]">{receiptName || 'No file chosen'}</span>
        </div>

        {receiptPreview && (
          <div className="w-full h-40 rounded-xl overflow-hidden border border-slate-700 mb-4 bg-black/50 flex items-center justify-center">
            <img src={receiptPreview} alt="receipt" className="max-w-full max-h-full object-contain" />
          </div>
        )}

        <button onClick={handleDeposit} className={`w-full bg-gradient-to-r ${themeColors[theme].gradient} text-white font-bold py-3.5 rounded-xl shadow-lg ${themeColors[theme].shadow} active:scale-95`}>
          Deposit တင်မည်
        </button>
      </div>
    </div>
  );
};
export default Wallet;
