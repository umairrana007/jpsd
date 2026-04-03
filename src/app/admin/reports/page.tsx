'use client';

import React, { useState } from 'react';
import { 
  FiFileText, FiBarChart2, FiGlobe, FiPieChart, 
  FiDownload, FiArrowUpRight, FiTrendingUp, FiActivity,
  FiMap, FiTarget, FiCalendar
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// Initialize PDFMake
pdfMake.vfs = (pdfFonts as any).pdfMake ? (pdfFonts as any).pdfMake.vfs : pdfFonts.vfs;

export default function AdminReportsPage() {
  const [timeframe, setTimeframe] = useState('Monthly');
  
  const reportData = {
    Monthly: [
      { h: '60%', h2: '40%', label: 'JAN' },
      { h: '85%', h2: '55%', label: 'FEB' },
      { h: '70%', h2: '60%', label: 'MAR' },
      { h: '95%', h2: '45%', label: 'APR' },
      { h: '80%', h2: '70%', label: 'MAY' },
      { h: '100%', h2: '85%', label: 'JUN' },
    ],
    Weekly: [
      { h: '40%', h2: '20%', label: 'WK 1' },
      { h: '55%', h2: '35%', label: 'WK 2' },
      { h: '90%', h2: '65%', label: 'WK 3' },
      { h: '75%', h2: '50%', label: 'WK 4' },
    ],
    Yearly: [
      { h: '80%', h2: '60%', label: '2023' },
      { h: '95%', h2: '75%', label: '2024' },
      { h: '100%', h2: '85%', label: '2025' },
    ]
  };

  const exportReportPDF = () => {
    const docDefinition = {
      content: [
        { text: 'Baitussalam Global Impact Report', style: 'header' },
        { text: `Reporting Period: ${timeframe}`, style: 'subheader' },
        { text: '\n' },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto'],
            body: [
              ['Metric', 'Current Value', 'Target'],
              ['Net Inflow', '$1.24M', '$1.5M'],
              ['Donor Retention', '72%', '80%'],
              ['Campaign Efficiency', '94%', '95%'],
              ['Global Reach (Countries)', '42', '50'],
            ]
          }
        },
        { text: '\nMission Efficiency Audit', style: 'subheader' },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Campaign', 'Raised', 'Target', 'Efficiency'],
              ['Clean Water Initiative', '$245k', '$300k', '92%'],
              ['Emergency Food Relief', '$89k', '$100k', '89%'],
              ['Youth Education Fund', '$42k', '$75k', '56%'],
            ]
          }
        }
      ],
      styles: {
        header: { fontSize: 22, bold: true, color: '#1ea05f', alignment: 'center' },
        subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
      }
    };
    pdfMake.createPdf(docDefinition as any).download(`Baitussalam_Impact_Report_${timeframe}.pdf`);
  };

  const currentStats = reportData[timeframe as keyof typeof reportData];

  return (
    <div className="space-y-10">
      {/* Header with quick report generator */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase">Intelligence Hub</h2>
          <p className="text-slate-500 font-medium tracking-tight italic">Performance auditing and global impact analytics across all regions.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={exportReportPDF}
            className="px-6 py-3 bg-white text-slate-700 font-black text-[10px] uppercase tracking-widest rounded-2xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2"
          >
            <FiDownload /> Export PDF
          </button>
          <button className="px-8 py-3 bg-gradient-to-br from-[#1ea05f] to-[#15804a] text-white font-black rounded-2xl shadow-xl shadow-[#1ea05f]/20 hover:opacity-90 transition-all flex items-center gap-2 uppercase tracking-widest text-[10px]">
            <FiTarget /> Generate Custom Audit
          </button>
        </div>
      </header>

      {/* Primary KPI Overview */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: 'Net Inflow', val: '$1.24M', trend: '+8%', icon: <FiTrendingUp />, color: 'text-[#1ea05f]' },
           { label: 'Retention', val: '72%', trend: '+4%', icon: <FiActivity />, color: 'text-blue-500' },
           { label: 'Efficiency', val: '94%', trend: 'Stable', icon: <FiTarget />, color: 'text-purple-500' },
           { label: 'Global reach', val: '42', trend: '+2 Sites', icon: <FiGlobe />, color: 'text-amber-500' },
         ].map((stat, i) => (
           <div key={i} className="bg-white/80 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-sm flex flex-col justify-between h-44 group hover:bg-[#1ea05f]/5 transition-all">
              <div className="flex justify-between items-start text-[10px] font-black text-slate-300 uppercase tracking-widest">
                 <div className={`p-3 rounded-2xl bg-white border border-slate-50 shadow-sm ${stat.color}`}>{stat.icon}</div>
                 <span className={stat.trend.includes('+') ? 'text-[#1ea05f]' : 'text-slate-400 font-bold'}>{stat.trend}</span>
              </div>
              <div className="mt-4">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{stat.label}</p>
                 <h4 className="text-4xl font-black text-slate-800 tracking-tighter italic">{stat.val}</h4>
              </div>
           </div>
         ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {/* Growth Analytics */}
         <div className="lg:col-span-2 space-y-10">
            <div className="bg-white/80 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-sm overflow-hidden">
               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
                  <div>
                    <h3 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Cashflow Trajectory</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1 tracking-tighter">Real-time Comparative Analytics</p>
                  </div>
                  <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200/50">
                     {['Weekly', 'Monthly', 'Yearly'].map(t => (
                       <button
                         key={t}
                         onClick={() => setTimeframe(t)}
                         className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                           timeframe === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                         }`}
                       >
                         {t}
                       </button>
                     ))}
                  </div>
               </div>
               
               <div className="h-64 flex items-end justify-between px-6 gap-4 border-b border-slate-50 pb-2 relative">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={timeframe}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="w-full h-full flex items-end justify-between"
                    >
                      {currentStats.map((bar, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
                           <div className="w-full flex gap-1.5 justify-center h-48 items-end">
                              <div style={{ height: bar.h2 }} className="w-5 bg-blue-100 rounded-t-xl group-hover:bg-blue-200 transition-all opacity-40"></div>
                              <div style={{ height: bar.h }} className="w-5 bg-[#1ea05f] rounded-t-xl group-hover:opacity-80 transition-all shadow-lg shadow-[#1ea05f]/10"></div>
                           </div>
                           <span className="text-[9px] font-black text-slate-400 tracking-widest uppercase mt-4">{bar.label}</span>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
               </div>
               <div className="mt-8 flex gap-6 px-6">
                  <div className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1ea05f]"></span> Inflow Trends
                  </div>
                  <div className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500/20"></span> Disbursements
                  </div>
               </div>
            </div>

            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
               <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                  <h3 className="text-lg font-black text-slate-800 uppercase tracking-widest italic">Mission Efficiency Audit</h3>
                  <button className="text-[10px] font-black text-[#1ea05f] hover:underline uppercase tracking-widest border border-[#1ea05f]/20 px-4 py-2 rounded-xl bg-[#1ea05f]/5">Full Audit Log</button>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/50">
                           <th className="px-10 py-6">Global Campaign</th>
                           <th className="px-10 py-6">Funds Raised</th>
                           <th className="px-10 py-6">Target Pool</th>
                           <th className="px-10 py-6 text-right">Efficiency Hub</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        {[
                          { name: 'Clean Water Initiative', raised: '$245k', target: '$300k', eff: '92%', status: 'Elite' },
                          { name: 'Emergency Food Relief', raised: '$89k', target: '$100k', eff: '89%', status: 'Stable' },
                          { name: 'Youth Education Fund', raised: '$42k', target: '$75k', eff: '56%', status: 'Review' },
                        ].map((row, i) => (
                           <tr key={i} className="hover:bg-slate-50/50 transition-all group cursor-pointer">
                              <td className="px-10 py-6 font-black text-slate-700 text-sm italic">{row.name}</td>
                              <td className="px-10 py-6 text-sm font-black text-slate-800 tracking-tighter">${row.raised}</td>
                              <td className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">{row.target}</td>
                              <td className="px-10 py-6 text-right">
                                 <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm border ${
                                    row.status === 'Elite' ? 'bg-[#1ea05f] text-white border-[#1ea05f]/10 shadow-[#1ea05f]/20' : 
                                    row.status === 'Stable' ? 'bg-blue-500 text-white border-blue-500/10 shadow-blue-500/20' : 'bg-rose-500 text-white border-rose-500/10 shadow-rose-500/20'
                                 }`}>
                                    {row.eff} Efficiency
                                 </span>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

         {/* Sidebar */}
         <div className="space-y-10">
            <div className="bg-white/80 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-sm">
               <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-8 flex items-center gap-3 italic">
                  <FiMap className="text-[#1ea05f]" />
                  <span>Geographic Impact</span>
               </h4>
               <div className="space-y-8">
                  {[
                    { region: 'North Sindh', share: 42, count: '$420k' },
                    { region: 'South Punjab', share: 31, count: '$310k' },
                    { region: 'Baluchistan', share: 18, count: '$180k' },
                    { region: 'KPK Borders', share: 9, count: '$90k' },
                  ].map((r, i) => (
                    <div key={i} className="flex flex-col gap-3">
                       <div className="flex justify-between items-baseline text-[10px] font-black uppercase tracking-widest">
                          <span className="text-slate-800 flex items-center gap-2">
                             <span className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">{i+1}</span>
                             {r.region}
                          </span>
                          <span className="text-[#1ea05f]">{r.count}</span>
                       </div>
                       <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
                          <div style={{ width: `${r.share}%` }} className="h-full bg-slate-900 group-hover:bg-[#1ea05f] transition-all"></div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#1ea05f]/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
               <FiPieChart className="text-[#1ea05f] mb-6" size={32} />
               <h4 className="text-xl font-black mb-8 italic uppercase tracking-tighter">Engagement Segments</h4>
               <div className="flex justify-center mb-10 h-40">
                  <div className="w-40 h-40 rounded-full border-[15px] border-[#1ea05f] border-r-transparent border-b-transparent flex items-center justify-center rotate-[135deg]">
                     <div className="-rotate-[135deg] text-center">
                        <span className="block text-3xl font-black tracking-tighter italic">68%</span>
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Retention Rate</span>
                     </div>
                  </div>
               </div>
               <div className="space-y-4">
                  <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest border-t border-white/5 pt-6">
                     <span className="text-slate-400 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#1ea05f]"></span> Recurring</span>
                     <span className="text-white">5,842 Individuals</span>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest border-t border-white/5 pt-4">
                     <span className="text-slate-400 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-white/20"></span> One-time</span>
                     <span className="text-white">12,420 Donors</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
