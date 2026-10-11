import React from 'react';

const Terms = ({ onClose }) => {
  return (
    <div className="min-h-screen bg-[#0b1120] text-white p-6 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute top-[40%] right-[-10%] w-72 h-72 bg-purple-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-md mx-auto">
        <button onClick={onClose} className="mb-6 bg-[#1e293b] border border-slate-700 text-slate-300 px-4 py-2 rounded-xl text-xs font-bold active:scale-95">
          ← နောက်သို့
        </button>

        <h1 className="text-2xl font-black mb-6 text-blue-400">Terms & Privacy Policy</h1>

        <div className="flex flex-col gap-4 text-sm text-slate-300 leading-relaxed">
          <div className="bg-[#1e293b]/80 border border-slate-800 rounded-2xl p-5">
            <h2 className="text-lg font-bold text-white mb-3">📜 စည်းမျဉ်းစည်းကမ်းများ</h2>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>ဤဝဘ်ဆိုဒ်သည် ဂိမ်းများအတွက် Top-up ဝန်ဆောင်မှုပေးသော ဝဘ်ဆိုဒ်ဖြစ်ပါသည်။</li>
              <li>အသုံးပြုသူသည် မှန်ကန်သော အချက်အလက်များကိုသာ ဖြည့်သွင်းရပါမည်။</li>
              <li>မည်သည့် ငွေလွှဲမှုမဆို ပြေစာ (Receipt) ပြသရန် လိုအပ်ပါသည်။</li>
              <li>ဝဘ်ဆိုဒ်မှ ပေးအပ်သော Points များကို သတ်မှတ်ထားသော နှုန်းထားအတိုင်း ပြန်လည်လဲလှယ်နိုင်ပါသည်။</li>
              <li>မသမာသော နည်းလမ်းများဖြင့် ငွေဖြည့်ခြင်းကို တားမြစ်ပါသည်။</li>
            </ul>
          </div>

          <div className="bg-[#1e293b]/80 border border-slate-800 rounded-2xl p-5">
            <h2 className="text-lg font-bold text-white mb-3">🔒 ကိုယ်ရေးကိုယ်တာ မူဝါဒ</h2>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>သင့်ရဲ့ Username နှင့် Phone Number ကို ဝန်ဆောင်မှုပေးရန်အတွက်သာ အသုံးပြုပါမည်။</li>
              <li>သင့်ရဲ့ အချက်အလက်များကို တတိယပုဂ္ဂိုလ်များထံ မည်သည့်အခါမျှ မျှဝေမည် မဟုတ်ပါ။</li>
              <li>ငွေပေးချေမှု ပြေစာများကို လုံခြုံစွာ သိမ်းဆည်းထားပါမည်။</li>
              <li>သင့်အကောင့်ကို လုံခြုံစွာ ထိန်းသိမ်းရန် တာဝန်ရှိပါသည်။</li>
            </ul>
          </div>

          <div className="bg-[#1e293b]/80 border border-slate-800 rounded-2xl p-5">
            <h2 className="text-lg font-bold text-white mb-3">💸 ငွေပြန်အမ်းမှု မူဝါဒ</h2>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>ဂိမ်း Top-up လုပ်ပြီးသွားပါက ငွေပြန်အမ်းခြင်း မပြုလုပ်ပါ။</li>
              <li>မှားယွင်းသော အကောင့်သို့ ငွေဖြည့်မိပါက ပြန်လည်ပြင်ဆင်ရန် Admin ထံ ဆက်သွယ်ပါ။</li>
              <li>ငွေပြန်အမ်းမှုများကို ၂၄ နာရီအတွင်း ဆောင်ရွက်ပေးပါမည်။</li>
            </ul>
          </div>

          <div className="bg-[#1e293b]/80 border border-slate-800 rounded-2xl p-5">
            <h2 className="text-lg font-bold text-white mb-3">📞 ဆက်သွယ်ရန်</h2>
            <p>အကယ်၍ မေးခွန်းများရှိပါက Chat Support မှတစ်ဆင့် ဆက်သွယ်နိုင်ပါသည်။</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
