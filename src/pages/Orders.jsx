import React from 'react';
import { useData } from '../context/DataContext';

const Orders = () => {
  const { orders } = useData();

  return (
    <div className="p-4 pt-6 pb-24">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><span>📦</span> အော်ဒါများ ({orders.length})</h2>
      {orders.length === 0 ? (
        <div className="bg-[#1e293b]/80 border border-slate-800 rounded-2xl p-10 flex flex-col items-center justify-center text-slate-500">
          <span className="text-5xl mb-4 opacity-50">📭</span>
          <p className="text-sm font-medium">အော်ဒါ မရှိသေးပါ</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map(order => (
            <div key={order.id} className="bg-[#1e293b]/80 border border-slate-800 rounded-2xl p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-xs font-bold text-blue-400">{order.id}</p>
                  <p className="text-sm font-bold text-white mt-1">{order.game}</p>
                  <p className="text-[10px] text-slate-400">{order.package}</p>
                </div>
                <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${
                  order.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 
                  order.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                }`}>{order.status}</span>
              </div>
              <div className="flex justify-between items-center pt-3 mt-3 border-t border-slate-800 text-xs">
                <span className="text-slate-400">{order.date}</span>
                <span className="text-yellow-400 font-bold">{order.amount}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Orders;
