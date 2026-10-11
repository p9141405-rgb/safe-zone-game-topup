import React, { useState } from 'react';
import { useData } from '../context/DataContext';

const AdminAuth = () => {
  const { adminLogin } = useData();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const res = adminLogin(username, password);
      if (!res.success) setError(res.message);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0b1120] flex flex-col items-center justify-center p-6 text-white relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-[100px] animate-pulse delay-75"></div>

      <div className="relative z-10 w-full max-w-sm bg-[#1e293b]/60 border border-red-500/30 rounded-3xl p-6 backdrop-blur-xl shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-3xl flex items-center justify-center text-4xl shadow-2xl shadow-red-500/30 mb-4">
            🛡️
          </div>
          <h2 className="text-2xl font-bold text-white">Admin Login</h2>
          <p className="text-xs text-slate-500 tracking-widest mt-1">CONTROL PANEL ACCESS</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded-xl mb-4 text-center font-medium">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
            type="text" 
            placeholder="Admin Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-[#0f172a] border border-slate-700 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-red-500 transition-colors w-full" 
          />
          <input 
            type="password" 
            placeholder="Admin Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#0f172a] border border-slate-700 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-red-500 transition-colors w-full" 
          />
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full bg-gradient-to-r from-red-500 to-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-500/30 hover:opacity-90 transition-all mt-2 ${loading ? 'opacity-70' : ''}`}
          >
            {loading ? '⏳ Checking...' : '🔐 Login as Admin'}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-xs text-slate-500">
            User အနေနဲ့ ဝင်ရန် <a href="#user" className="text-blue-400 font-bold hover:underline">ဒီနေရာ</a> ကို နှိပ်ပါ
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;
