import React, { useState } from 'react';
import { useData } from '../context/DataContext';

const UserAuth = () => {
  const { userLogin, register } = useData();
  const [isLogin, setIsLogin] = useState(true);
  
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      if (isLogin) {
        const res = userLogin(username, password);
        if (!res.success) setError(res.message);
      } else {
        if (password !== confirmPassword) { setError('Password နှစ်ခု မတူညီပါ။'); setLoading(false); return; }
        if (!agreeTerms) { setError('Terms & Privacy ကို လက်ခံပါ။'); setLoading(false); return; }
        const res = register(username, phone, password);
        if (!res.success) setError(res.message);
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0b1120] flex flex-col items-center justify-center p-6 text-white relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px] animate-pulse delay-75"></div>

      <div className="relative z-10 w-full max-w-sm bg-[#1e293b]/60 border border-slate-700/50 rounded-3xl p-6 backdrop-blur-xl shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-black p-4 rounded-2xl border border-slate-800 shadow-[0_0_30px_rgba(59,130,246,0.3)] mb-4">
            <h1 className="text-4xl font-black text-white italic tracking-tighter flex items-center justify-center">
              S<span className="text-blue-500">Z</span>
            </h1>
            <p className="text-[10px] text-blue-400 font-bold tracking-[0.2em] text-center mt-1">SAFE ZONE</p>
            <p className="text-[8px] text-slate-500 tracking-[0.2em] text-center">GAME TOPUP</p>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">SAFE ZONE</h2>
          <p className="text-xs text-slate-500 tracking-widest mt-1">GAME TOPUP</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded-xl mb-4 text-center font-medium">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}
            className="bg-[#0f172a] border border-slate-700 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors w-full" />

          {!isLogin && (
            <input type="text" placeholder="Phone Number (09xxxxxxxxx)" value={phone} onChange={(e) => setPhone(e.target.value)}
              className="bg-[#0f172a] border border-slate-700 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors w-full" />
          )}

          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="bg-[#0f172a] border border-slate-700 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors w-full" />

          {!isLogin && (
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-[#0f172a] border border-slate-700 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors w-full" />
          )}

          {!isLogin && (
            <div className="flex items-center gap-3 mt-1">
              <input type="checkbox" id="terms" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-5 h-5 accent-blue-500 rounded bg-[#0f172a] border-slate-700" />
              <label htmlFor="terms" className="text-xs text-slate-400 font-medium">
                ကျွန်ုပ် <button type="button" onClick={() => window.location.hash = '#terms'} className="text-blue-400 underline font-bold">Terms & Privacy</button> ကို လက်ခံပါသည်
              </label>
            </div>
          )}

          <button type="submit" disabled={loading}
            className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 hover:opacity-90 transition-all mt-2 ${loading ? 'opacity-70' : ''}`}>
            {loading ? '⏳ Loading...' : (isLogin ? 'Login' : 'Register')}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-xs text-slate-400 font-medium">
            {isLogin ? 'Account မရှိဘူးလား? ' : 'Account ရှိပြီးသားလား? '}
            <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="text-blue-400 font-bold hover:underline ml-1">
              {isLogin ? 'Register လုပ်ပါ' : 'Login ဝင်ပါ'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserAuth;
