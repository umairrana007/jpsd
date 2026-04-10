'use client';

import React, { useState } from 'react';
import { useCMSAnalytics } from '@/hooks/useCMSAnalytics';
import { FiActivity, FiDownload, FiBarChart2, FiCalendar, FiFilter, FiTrendingUp } from 'react-icons/fi';
import { motion } from 'framer-motion';
export default function GlobalAnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const { analytics, loading, totalViews, totalEdits } = useCMSAnalytics(undefined, undefined, timeRange);

  const exportCSV = () => {
    if (!analytics) return;
    const headers = ['Action', 'Collection', 'DocID', 'Actor', 'Timestamp'];
    const rows = analytics.map(log => [
      log.action,
      log.collection,
      log.docId,
      log.actorUid,
      log.timestamp?.toDate().toISOString()
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `cms_analytics_export_${timeRange}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase">Global Telemetry</h2>
          <p className="text-slate-500 font-medium italic underline decoration-primary/30 underline-offset-4 tracking-tight">System-wide usage analysis and operational intelligence.</p>
        </div>
        <div className="flex gap-4">
          <div className="flex p-1 bg-slate-100 rounded-2xl">
            {['7d', '30d', '90d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range as any)}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  timeRange === range ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {range} Cycle
              </button>
            ))}
          </div>
          <button 
            onClick={exportCSV}
            className="px-8 py-4 bg-slate-900 text-white font-black rounded-3xl shadow-xl shadow-slate-900/20 hover:opacity-90 transition-all flex items-center gap-2 uppercase text-xs tracking-widest"
          >
            <FiDownload /> Extract Data
          </button>
        </div>
      </header>

      {/* Aggregate Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Operations', val: analytics?.length || 0, icon: <FiActivity />, color: 'text-slate-800', bg: 'bg-white' },
          { label: 'View Traffic', val: totalViews, icon: <FiTrendingUp />, color: 'text-blue-500', bg: 'bg-white' },
          { label: 'Mutation Events', val: totalEdits, icon: <FiActivity />, color: 'text-primary', bg: 'bg-white' },
          { label: 'Active Collectors', val: [...new Set(analytics?.map(a => a.collection))].length || 0, icon: <FiFilter />, color: 'text-amber-500', bg: 'bg-white' },
        ].map((stat, i) => (
          <div key={i} className={`${stat.bg} p-8 rounded-[2.5rem] border border-white shadow-sm flex flex-col justify-between h-40`}>
             <div className="flex justify-between items-start">
               <div className={`p-4 rounded-3xl bg-slate-50 ${stat.color} shadow-sm border border-slate-50`}>
                  {stat.icon}
               </div>
               <FiBarChart2 className="text-slate-100" size={32} />
             </div>
             <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
               <h4 className="text-3xl font-black text-slate-800 tracking-tighter">{stat.val}</h4>
             </div>
          </div>
        ))}
      </div>

      {/* Detailed Log Table */}
      <div className="bg-white/80 backdrop-blur-md rounded-[3rem] border border-white shadow-sm overflow-hidden">
        <div className="p-10 border-b border-slate-50">
          <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase italic flex items-center gap-3">
             <FiActivity className="text-primary" /> Master Activity Feed
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol Signal</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Dimension</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Operator Identity</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Timestamp (UTC)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                [1,2,3,4,5].map(i => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={4} className="px-10 py-8"><div className="h-4 bg-slate-50 rounded-full w-full" /></td>
                  </tr>
                ))
              ) : analytics?.map((log, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-all group">
                   <td className="px-10 py-8">
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${log.action === 'view' ? 'bg-blue-400 shadow-[0_0_10px_#60a5fa]' : 'bg-primary shadow-[0_0_10px_#1ea05f]'}`} />
                        <span className="text-sm font-black text-slate-800 capitalize italic">{log.action}</span>
                      </div>
                   </td>
                   <td className="px-10 py-8">
                      <span className="px-4 py-2 bg-slate-100 text-slate-600 rounded-full text-[9px] font-black uppercase tracking-widest">
                        {log.collection}
                      </span>
                   </td>
                   <td className="px-10 py-8 text-xs font-bold text-slate-500 tracking-tight">
                      {log.actorUid || 'INTERNAL_SIGNAL'}
                   </td>
                   <td className="px-10 py-8">
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-slate-800">{log.timestamp?.toDate().toLocaleTimeString()}</span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{log.timestamp?.toDate().toLocaleDateString()}</span>
                      </div>
                   </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
