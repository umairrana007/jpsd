'use client';

import React from 'react';
import { 
  FiCreditCard, FiTrash2, FiPlus, FiSettings,
  FiArrowRight, FiShield, FiCheckCircle
} from 'react-icons/fi';

export default function DonorPaymentsPage() {
  const cards = [
    { brand: 'Mastercard', last4: '8492', expiry: '12/28', type: 'Primary' },
    { brand: 'Visa', last4: '3910', expiry: '06/27', type: 'Alternate' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase">Payment Methods</h2>
          <p className="text-slate-500 font-medium tracking-tight italic">Securely manage your global contribution channels.</p>
        </div>
        <button className="px-8 py-3 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:opacity-90 transition-all flex items-center gap-2 uppercase tracking-widest text-[10px]">
          <FiPlus /> Add Method
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card, i) => (
          <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-10 group relative overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:shadow-slate-200/50 transition-all">
             <div className="flex justify-between items-start relative z-10">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                   <FiCreditCard size={24} />
                </div>
                <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest ${card.type === 'Primary' ? 'bg-[#1ea05f] text-white' : 'bg-slate-100 text-slate-400'}`}>
                   {card.type}
                </span>
             </div>

             <div className="relative z-10">
                <h4 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] mb-1 italic">{card.brand}</h4>
                <p className="text-3xl font-black text-slate-800 tracking-tighter transition-all group-hover:tracking-widest">•••• {card.last4}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4 flex items-center gap-2 italic">Expiry: {card.expiry}</p>
             </div>

             <div className="flex gap-2 relative z-10 pt-4 border-t border-slate-50">
                <button className="flex-1 py-3 bg-slate-50 text-slate-400 rounded-[1.5rem] flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all">
                   <FiSettings /> Options
                </button>
                <button className="w-12 h-12 bg-rose-50 text-rose-400 rounded-[1.5rem] flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all">
                   <FiTrash2 />
                </button>
             </div>
          </div>
        ))}

        <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-10 rounded-[3rem] flex flex-col items-center justify-center gap-4 text-center cursor-pointer hover:bg-white hover:border-[#1ea05f] transition-all group min-h-[340px]">
           <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-slate-300 group-hover:text-[#1ea05f] group-hover:shadow-xl transition-all">
              <FiPlus size={32} />
           </div>
           <h4 className="text-lg font-black text-slate-400 group-hover:text-slate-800 italic uppercase">New Source</h4>
           <p className="text-xs font-medium text-slate-400 max-w-[200px]">Link Credit Card, Bank or Marketplace Wallet.</p>
        </div>
      </div>

      {/* Security Hub Overlay */}
      <section className="bg-white/80 backdrop-blur-md p-12 rounded-[4rem] border border-white shadow-sm flex flex-col md:flex-row items-center gap-10">
         <div className="w-24 h-24 bg-blue-500/10 rounded-[2.5rem] flex items-center justify-center text-blue-500 shadow-xl shadow-blue-500/10 group animate-pulse">
            <FiShield size={42} />
         </div>
         <div className="flex-1 text-center md:text-left">
            <h4 className="text-xl font-black text-slate-800 italic uppercase">Secure Foundation Calibration</h4>
            <p className="text-slate-500 font-medium text-sm mt-3 leading-relaxed max-w-2xl">
               Every transaction is protected by 256-bit encryption. We never store your full card details in our local database; all financial assets are managed through SOC2-compliant global gateways.
            </p>
         </div>
         <div className="flex items-center gap-3 px-8 py-5 bg-slate-50 rounded-3xl border border-slate-100">
            <FiCheckCircle className="text-[#1ea05f]" />
            <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest italic">Fully SSL Shielded</span>
         </div>
      </section>
    </div>
  );
}
