'use client';

import { useCMSAnalytics } from '@/hooks/useCMSAnalytics';
import { FiEye, FiEdit3, FiClock, FiActivity, FiArrowUpRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const CMSAnalyticsDashboard = ({ collection, docId, title }: { collection: string; docId: string; title: string }) => {
  const { analytics, loading, totalViews, totalEdits, lastActivity } = useCMSAnalytics(collection, docId);

  if (loading) return (
    <div className="bg-white/50 backdrop-blur-md rounded-[2.5rem] border border-white p-8 animate-pulse space-y-4">
      <div className="h-6 w-48 bg-slate-100 rounded-full" />
      <div className="grid grid-cols-3 gap-6">
        {[1,2,3].map(i => <div key={i} className="h-24 bg-slate-100 rounded-2xl" />)}
      </div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-md rounded-[2.5rem] border border-white p-8 shadow-sm space-y-8"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase italic">{title} Insights</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Intelligence report for the last 30 cycles</p>
        </div>
        <div className="p-3 bg-slate-50 text-slate-400 rounded-2xl">
          <FiActivity size={20} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Signal Observations', val: totalViews, icon: <FiEye />, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Structural Mutations', val: totalEdits, icon: <FiEdit3 />, color: 'text-primary', bg: 'bg-primary/5' },
          { label: 'Last Sync Time', val: lastActivity?.toDate().toLocaleDateString() || 'N/A', icon: <FiClock />, color: 'text-amber-500', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className={`${stat.bg} p-6 rounded-[2rem] border border-white shadow-sm flex flex-col justify-between h-32`}>
            <div className={`p-2.5 rounded-xl bg-white w-fit ${stat.color} shadow-sm border border-slate-50`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <h4 className="text-2xl font-black text-slate-800 tracking-tighter">{stat.val}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Log Preview */}
      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-2">Sequential Telemetry</label>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
          {analytics?.map((log, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-2xl transition-all group">
              <div className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${log.action === 'view' ? 'bg-blue-400 shadow-[0_0_8px_#60a5fa]' : 'bg-primary shadow-[0_0_8px_#1ea05f]'}`} />
                <div>
                  <p className="text-xs font-black text-slate-700 capitalize tracking-tight">{log.action} protocol</p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Operator: {log.actorUid?.slice(0, 8) || 'SYSTEM'}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-800 font-black">{log.timestamp?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">{log.timestamp?.toDate().toLocaleDateString()}</p>
              </div>
            </div>
          ))}
          {(!analytics || analytics.length === 0) && (
            <p className="text-center py-8 text-[10px] font-black uppercase text-slate-300">No telemetry data available.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
