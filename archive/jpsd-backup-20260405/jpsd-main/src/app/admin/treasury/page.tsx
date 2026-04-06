'use client';

import React, { useState } from 'react';
import { 
  FiDollarSign, FiTrendingUp, FiTrendingDown, 
  FiPieChart, FiArrowUpRight, FiArrowDownRight,
  FiCheckCircle, FiAlertCircle, FiInfo, FiSearch,
  FiDownload, FiFilter
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { generateTreasuryReport } from '@/lib/pdfUtils';

export default function AdminTreasuryPage() {
  const [filter, setFilter] = useState('AllTime');
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const financialOverview = {
    totalInflow: 4250000,
    totalOutflow: 3120000,
    netReserve: 1130000,
    activeProjects: 12
  };

  const incomeSources = [
    { source: 'Online Donations', amount: 2125000, percentage: 50, color: 'bg-emerald-500' },
    { source: 'Bank Transfers', amount: 1275000, percentage: 30, color: 'bg-blue-500' },
    { source: 'JazzCash / EasyPaisa', amount: 637500, percentage: 15, color: 'bg-amber-500' },
    { source: 'In-Person / Cash', amount: 212500, percentage: 5, color: 'bg-slate-400' },
  ];

  const expenditures = [
    { project: 'Clean Water Initiative', amount: 850000, date: '2026-03-28', category: 'Infrastructure', status: 'Verified' },
    { project: 'Syrian Emergency Relief', amount: 1200000, date: '2026-03-25', category: 'Humanitarian', status: 'Verified' },
    { project: 'Admin & Logistics', amount: 420000, date: '2026-03-20', category: 'Operations', status: 'Verified' },
    { project: 'STEM Library Books', amount: 150000, date: '2026-03-15', category: 'Education', status: 'Pending Audit' },
    { project: 'Staff Salaries (Field)', amount: 500000, date: '2026-03-01', category: 'Payroll', status: 'Verified' },
  ];

  const handleDownloadReport = (title: string) => {
    console.log('Download triggered for:', title);
    
    // Direct verification that the code is running
    const content = `JPSD Treasury Report: ${title}\nGenerated at: ${new Date().toLocaleString()}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quick_test.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    generateTreasuryReport(title, {
      financialOverview,
      incomeSources,
      expenditures
    });
  };

  if (!mounted) return <div className="h-screen flex items-center justify-center text-slate-400">Calibrating Treasury Hub...</div>;

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase">Treasury & Transparency</h2>
          <p className="text-slate-500 font-medium tracking-tight italic">Tracking every penny from source to field deployment.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => handleDownloadReport('Financial Statement')}
            className="px-6 py-3 bg-white text-slate-700 font-black text-[10px] uppercase tracking-widest rounded-2xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2"
          >
            <FiDownload /> Financial Report
          </button>
          <button className="px-8 py-3 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:opacity-90 transition-all flex items-center gap-2 uppercase tracking-widest text-[10px]">
            <FiFilter /> Audit Logs
          </button>
        </div>
      </header>

      {/* Financial Health Snapshot */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-emerald-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-emerald-200 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-110 transition-transform"></div>
          <p className="text-emerald-100 text-[10px] font-black uppercase tracking-widest mb-2 italic">Total Funds Received (Inflow)</p>
          <h3 className="text-4xl font-black tracking-tighter italic">RS {financialOverview.totalInflow.toLocaleString()}</h3>
          <div className="mt-6 flex items-center gap-2 text-xs font-bold text-emerald-100">
            <FiArrowUpRight /> <span>+12% from last month</span>
          </div>
        </div>

        <div className="bg-rose-500 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-rose-200 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-110 transition-transform"></div>
          <p className="text-rose-100 text-[10px] font-black uppercase tracking-widest mb-2 italic">Total Field Spending (Outflow)</p>
          <h3 className="text-4xl font-black tracking-tighter italic">RS {financialOverview.totalOutflow.toLocaleString()}</h3>
          <div className="mt-6 flex items-center gap-2 text-xs font-bold text-rose-100">
            <FiArrowDownRight /> <span>Allocation across 12 active missions</span>
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#1ea05f]/20 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-110 transition-transform"></div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2 italic">Net Liquidity / Reserves</p>
          <h3 className="text-4xl font-black tracking-tighter italic">RS {financialOverview.netReserve.toLocaleString()}</h3>
          <div className="mt-6 flex items-center gap-2 text-xs font-bold text-[#1ea05f]">
            <FiCheckCircle /> <span>Ready for emergency deployment</span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Income Source Breakdown */}
        <div className="bg-white/80 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Funding Sources</h3>
            <FiPieChart className="text-slate-400" />
          </div>
          <div className="space-y-8">
            {incomeSources.map((s, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                  <span className="text-slate-600">{s.source}</span>
                  <span className="text-slate-800">RS {s.amount.toLocaleString()} ({s.percentage}%)</span>
                </div>
                <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.percentage}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full ${s.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-100">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic flex items-center gap-2">
                <FiInfo className="text-[#1ea05f]" /> Observation Note
             </p>
             <p className="text-[11px] font-bold text-slate-600 leading-relaxed">
                Digital payment gateways (JazzCash/EasyPaisa) are seeing a 2.5x increase in adoption among younger donors.
             </p>
          </div>
        </div>

        {/* Expenditure Log */}
        <div className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-10 border-b border-slate-50 flex justify-between items-center">
            <div>
               <h3 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Transparency Ledger</h3>
               <p className="text-[10px] text-[#1ea05f] font-black uppercase tracking-widest mt-1">Real-time expenditure tracking</p>
            </div>
            <div className="relative">
               <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
               <input 
                 type="text" 
                 placeholder="Search project..." 
                 className="pl-12 pr-6 py-3 bg-slate-50 border-none rounded-2xl text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-[#1ea05f]/20 outline-none w-64"
               />
            </div>
          </div>
          <div className="flex-1 overflow-x-auto">
             <table className="w-full text-left">
                <thead>
                   <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/50">
                      <th className="px-10 py-6">Project / Deployment</th>
                      <th className="px-10 py-6">Category</th>
                      <th className="px-10 py-6">Amount spent</th>
                      <th className="px-10 py-6 text-right">Audit Status</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                   {expenditures.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-all cursor-pointer">
                         <td className="px-10 py-6">
                            <span className="font-black text-slate-800 text-sm italic">{row.project}</span>
                            <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">{row.date}</p>
                         </td>
                         <td className="px-10 py-6 text-[10px] font-black text-[#1ea05f] uppercase tracking-widest">{row.category}</td>
                         <td className="px-10 py-6 text-sm font-black text-slate-800 tracking-tighter">RS {row.amount.toLocaleString()}</td>
                         <td className="px-10 py-6 text-right">
                            <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-end gap-2 ${
                               row.status === 'Verified' ? 'text-emerald-500 bg-emerald-50' : 'text-amber-500 bg-amber-50'
                            }`}>
                               {row.status === 'Verified' ? <FiCheckCircle /> : <FiAlertCircle />} {row.status}
                            </span>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </div>
      </div>

      {/* Shariah Compliance & Verification Footer */}
      <section className="bg-slate-50 border border-slate-200/50 p-10 rounded-[3.5rem] flex flex-col md:flex-row items-center gap-8">
         <div className="w-20 h-20 bg-white rounded-3xl shadow-lg flex items-center justify-center text-3xl font-black text-[#1ea05f] italic tracking-tighter shrink-0 border border-slate-100">SA</div>
         <div className="flex-1 text-center md:text-left">
            <h4 className="text-xl font-black text-slate-800 italic uppercase">Shariah Audit Calibration</h4>
            <p className="text-slate-500 font-medium text-sm mt-3 leading-relaxed">
               Every transaction is cross-verified against Shariah principles. 100% of Zakat funds are disbursed directly to eligible beneficiaries as per the JPSD Global mandate.
            </p>
         </div>
         <button 
            onClick={() => handleDownloadReport('Shariah Audit')}
            className="px-10 py-5 bg-white border border-slate-200 text-slate-800 font-black text-[10px] uppercase tracking-widest rounded-3xl shadow-sm hover:bg-slate-900 hover:text-white transition-all whitespace-nowrap"
         >
            Download Audit Report
         </button>
      </section>
    </div>
  );
}

