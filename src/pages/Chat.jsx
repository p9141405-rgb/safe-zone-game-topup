import React, { useState, useRef, useEffect } from 'react';
import { useData } from '../context/DataContext';

const Chat = () => {
  const { chatMessages, sendMessage, isBotTyping } = useData();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isBotTyping]);

  const handleSend = () => {
    if (inputText.trim()) {
      sendMessage(inputText);
      setInputText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="p-4 pt-6 pb-24 h-screen flex flex-col">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><span>💬</span> Chat Support</h2>
      
      <div className="flex-1 bg-[#1e293b]/80 border border-slate-800 rounded-2xl flex flex-col overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center gap-4 shadow-lg">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-md">🤖</div>
          <div>
            <p className="text-sm font-bold text-white">Safe Zone Support</p>
            <p className="text-[10px] text-green-300 flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Auto Reply Active
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {chatMessages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl p-3 ${
                msg.sender === 'user' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-sm' 
                  : 'bg-[#0b1120] border border-slate-700 text-slate-200 rounded-bl-sm'
              }`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <p className={`text-[9px] mt-1.5 ${msg.sender === 'user' ? 'text-white/60' : 'text-slate-500'}`}>{msg.time}</p>
              </div>
            </div>
          ))}

          {/* Bot Typing Indicator */}
          {isBotTyping && (
            <div className="flex justify-start">
              <div className="bg-[#0b1120] border border-slate-700 rounded-2xl p-4 rounded-bl-sm flex items-center gap-1.5">
                <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-100"></span>
                <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-200"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-3 border-t border-slate-700 bg-[#0f172a] flex gap-2">
          <input 
            type="text" 
            placeholder="စာ ရေးပါ..." 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-[#1e293b] border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors" 
          />
          <button 
            onClick={handleSend}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 px-5 rounded-xl text-white font-bold transition-all shadow-lg shadow-blue-500/20"
          >
            ပို့
          </button>
        </div>
      </div>
    </div>
  );
};
export default Chat;
