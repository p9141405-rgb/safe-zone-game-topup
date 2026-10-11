import React, { useState, useRef } from 'react';
import { useData } from '../context/DataContext';

const MusicPlayer = () => {
  const { musicList } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const hasMusic = musicList && musicList.length > 0;

  const togglePlay = () => {
    if (!hasMusic) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    if (!hasMusic) return;
    setCurrentTrack((prev) => (prev + 1) % musicList.length);
    setIsPlaying(false);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }, 100);
  };

  const prevTrack = () => {
    if (!hasMusic) return;
    setCurrentTrack((prev) => (prev - 1 + musicList.length) % musicList.length);
    setIsPlaying(false);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }, 100);
  };

  return (
    <>
      {hasMusic && <audio ref={audioRef} src={musicList[currentTrack]?.url} onEnded={nextTrack} />}
      
      {/* Floating Music Button - အမြဲပေါ်နေမည် */}
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        className="fixed bottom-28 right-4 z-40 bg-gradient-to-r from-purple-600 to-pink-600 p-3.5 rounded-full shadow-lg shadow-purple-500/30 cursor-pointer hover:scale-110 transition-transform border border-white/20"
      >
        <span className="text-xl">🎵</span>
      </div>

      {/* Expanded Player */}
      {isOpen && (
        <div className="fixed bottom-28 right-4 z-50 bg-[#1e293b]/95 backdrop-blur-xl border border-slate-700 rounded-3xl p-5 w-72 shadow-2xl">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold text-purple-400 tracking-wider">MUSIC PLAYER</span>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white text-lg">✕</button>
          </div>

          {!hasMusic ? (
            <div className="text-center py-6 text-slate-400">
              <span className="text-4xl block mb-3">📭</span>
              <p className="text-xs font-medium">သီချင်း မရှိသေးပါ။</p>
              <p className="text-[10px] text-slate-500 mt-1">Admin Panel မှ ထည့်သွင်းပါ။</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-inner">
                  <span className="text-2xl">🎧</span>
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-semibold text-white truncate">{musicList[currentTrack]?.name}</p>
                  <p className="text-[10px] text-slate-400">{musicList[currentTrack]?.size}</p>
                </div>
              </div>
              <div className="flex justify-center items-center gap-6">
                <button onClick={prevTrack} className="text-slate-400 hover:text-white text-xl transition-colors">⏮️</button>
                <button onClick={togglePlay} className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                  <span className="text-xl">{isPlaying ? '⏸️' : '▶️'}</span>
                </button>
                <button onClick={nextTrack} className="text-slate-400 hover:text-white text-xl transition-colors">⏭️</button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
export default MusicPlayer;
