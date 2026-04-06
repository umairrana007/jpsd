'use client';

import React from 'react';
import { 
  FiFileText, FiDownload, FiSearch, 
  FiArrowUpRight, FiCheckCircle, FiActivity,
  FiZap, FiDownloadCloud
} from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function DonorCertificatesPage() {
  const years = ['Fiscal Year 2024-2025', 'Fiscal Year 2023-2024', 'Fiscal Year 2022-2023'];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase">Tax Certificates</h2>
          <p className="text-slate-500 font-medium tracking-tight italic">Legal documentation of your global impact for fiscal compliance.</p>
        </div>
        <button className="px-8 py-3 bg-gradient-to-br from-[#1ea05f] to-green-600 text-white font-black rounded-2xl shadow-xl shadow-[#1ea05f]/20 hover:opacity-90 transition-all flex items-center gap-2 uppercase tracking-widest text-[10px]">
          <FiZap /> Unified Certificate (G-01)
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Certificate List */}
        <div className="space-y-8 lg:col-span-1">
           {years.map((year, i) => (
             <div key={i} className="bg-white/80 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-sm flex flex-col justify-between h-48 group hover:bg-[#1ea05f]/5 transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#1ea05f]/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform"></div>
                
                <div className="flex justify-between items-start relative z-10">
                   <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-[#1ea05f] group-hover:bg-white transition-all">
                      <FiFileText size={24} />
                   </div>
                   <span className="text-[10px] font-black text-[#1ea05f] bg-[#1ea05f]/10 px-4 py-2 rounded-xl uppercase tracking-widest flex items-center gap-2 italic">
                      <FiCheckCircle /> Verified Archive
                   </span>
                </div>

                <div className="flex items-end justify-between relative z-10">
                   <div>
                      <h4 className="text-xl font-black italic uppercase tracking-tighter text-slate-800">{year}</h4>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Status: Fully Computed</p>
                   </div>
                   <button className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center group-hover:bg-[#1ea05f] transition-all shadow-xl">
                      <FiDownload size={24} />
                   </button>
                </div>
             </div>
           ))}
        </div>

        {/* Impact Sidebar */}
        <div className="lg:col-span-1 space-y-10">
           <section className="bg-slate-900 p-12 rounded-[4rem] text-white space-y-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#1ea05f]/20 rounded-full blur-[100px] -mr-48 -mt-48" />
              <FiActivity size={32} className="text-[#1ea05f]" />
              <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-none">Fiscal Transparency Calibration</h3>
              <p className="text-slate-400 font-medium text-sm leading-relaxed max-w-sm">
                 JPSD’s Shariah-compliant accounting system ensures 100% precision in tax-deductible contribution tracking. All certificates are FBR and IRS aligned under the 501(c)(3) or local welfare mandates.
              </p>
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/5 rounded-3xl">
                    <p className="text-[9px] font-black text-[#1ea05f] uppercase tracking-widest mb-1 italic">Total Deductible</p>
                    <p className="text-xl font-black">RS 420,500</p>
                 </div>
                 <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/5 rounded-3xl">
                    <p className="text-[9px] font-black text-[#1ea05f] uppercase tracking-widest mb-1 italic">Audited Deeds</p>
                    <p className="text-xl font-black">100%</p>
                 </div>
              </div>
           </section>

           <div className="bg-white/70 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-sm flex items-center gap-6">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
                 <FiDownloadCloud size={32} />
              </div>
              <div className="flex-1">
                 <h4 className="text-sm font-black text-slate-800 italic uppercase">Mass Archive Retrieval</h4>
                 <p className="text-xs font-medium text-slate-400 leading-relaxed max-w-[200px]">Download all lifetime certificates in a single compressed vault.</p>
              </div>
              <button className="text-xs font-black text-blue-500 uppercase tracking-widest hover:translate-x-1 transition-transform italic">Initiate Download <FiArrowUpRight className="inline ml-1" /></button>
           </div>
        </div>
      </div>
    </div>
  );
}

