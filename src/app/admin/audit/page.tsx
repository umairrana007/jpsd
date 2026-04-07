'use client';

import React, { useState, useEffect } from 'react';
import { 
  FiActivity, FiTarget, FiClock, FiShield, 
  FiSearch, FiFilter, FiRefreshCw, FiArrowRight,
  FiUser, FiCheckCircle, FiAlertCircle, FiInfo, FiTrash2
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { getActivityLogs } from '@/lib/firebaseUtils';
import { withAuth } from '@/components/admin/withAuth';
import { UserRole } from '@/types';
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function AuditDashboard() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const data = await getActivityLogs(200);
      setLogs(data);
    } catch (error) {
      console.error('Audit Load Failure:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter(log => {
     const matchesSearch = 
        log.message?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.action?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.adminUid?.toLowerCase().includes(searchQuery.toLowerCase());
     
     const matchesType = filterType === 'ALL' || log.type === filterType;
     
     return matchesSearch && matchesType;
  });

  const downloadReport = () => {
    const doc = new jsPDF();
    
    // Add Branding
    doc.setTextColor(30, 160, 95);
    doc.setFontSize(22);
    doc.text('BAITUSSALAM HQ AUDIT', 14, 22);
    
    doc.setTextColor(100);
    doc.setFontSize(10);
    doc.text(`FORENSIC EXTRACTION: ${format(new Date(), 'yyyy-MM-dd HH:mm:ss O')}`, 14, 30);
    doc.text(`RECORDS MATCHED: ${filteredLogs.length}`, 14, 35);
    doc.line(14, 40, 196, 40);

    const tableData = filteredLogs.map(log => [
      log.timestamp ? format(log.timestamp, 'yyyy-MM-dd HH:mm') : 'N/A',
      log.action || 'Unknown',
      log.message || '',
      log.adminUid ? log.adminUid.substring(0, 8) + '...' : 'System'
    ]);

    autoTable(doc, {
      startY: 45,
      head: [['ISO Timestamp', 'Protocol Action', 'Signal Data', 'Operator']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255], fontStyle: 'bold' },
      styles: { fontSize: 8, cellPadding: 4 },
      columnStyles: {
         0: { cellWidth: 35 },
         1: { cellWidth: 40 },
         3: { cellWidth: 25 }
      }
    });

    doc.save(`baitussalam_audit_${format(new Date(), 'yyyyMMdd')}.pdf`);
   };

  const getStatusColor = (type: string) => {
    switch (type) {
      case 'PRIVILEGE': return 'text-amber-500 bg-amber-50 border-amber-100';
      case 'SECURITY': return 'text-red-500 bg-red-50 border-red-100';
      case 'CAUSES': return 'text-emerald-500 bg-emerald-50 border-emerald-100';
      case 'SYSTEM': return 'text-blue-500 bg-blue-50 border-blue-100';
      default: return 'text-slate-500 bg-slate-50 border-slate-100';
    }
  };

  const getActionIcon = (type: string) => {
     switch (type) {
        case 'PRIVILEGE': return <FiShield size={16} />;
        case 'SECURITY': return <FiAlertCircle size={16} />;
        case 'CAUSES': return <FiTarget size={16} />;
        default: return <FiInfo size={16} />;
     }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* 🛡️ Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight uppercase italic">Audit Command</h2>
          <p className="text-slate-500 font-medium italic underline decoration-[#1ea05f]/30 underline-offset-4 tracking-tight">System-wide immutable activity logs and forensics.</p>
        </div>
        <div className="flex gap-4">
           <button 
             onClick={downloadReport}
             className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
           >
             <FiArrowRight className="rotate-[-45deg]" /> Download Signal PDF
           </button>
           <button 
             onClick={fetchLogs}
             className="p-4 bg-white text-[#1ea05f] rounded-2xl border border-slate-200 shadow-sm hover:rotate-180 transition-all duration-500"
           >
             <FiRefreshCw size={20} className={loading ? 'animate-spin' : ''} />
           </button>
        </div>
      </header>

      {/* 📊 Intelligence Overview */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: 'Total Events', val: logs.length, color: 'emerald', icon: <FiActivity /> },
           { label: 'Security Alerts', val: logs.filter(l => l.type === 'SECURITY').length, color: 'red', icon: <FiAlertCircle /> },
           { label: 'Privilege Shifts', val: logs.filter(l => l.type === 'PRIVILEGE').length, color: 'amber', icon: <FiShield /> }
         ].map((stat, i) => (
           <motion.div 
             key={i}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden"
           >
             <div className={`p-4 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 inline-flex mb-6`}>
               {stat.icon}
             </div>
             <p className="text-4xl font-black text-slate-800 tracking-tighter mb-1">{stat.val}</p>
             <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
             <div className={`absolute bottom-0 right-0 w-24 h-24 bg-${stat.color}-50/30 rounded-tl-full -mr-8 -mb-8`} />
           </motion.div>
         ))}
      </section>

      {/* 🔍 Forensic Filter */}
      <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
         <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
               <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
               <input 
                  placeholder="Scan messages, UIDs, or actions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-16 pr-8 py-5 bg-slate-50/50 border border-transparent rounded-[2rem] text-sm font-bold focus:ring-4 focus:ring-[#1ea05f]/5 focus:bg-white focus:border-[#1ea05f]/20 transition-all outline-none" 
               />
            </div>
            <div className="flex gap-2 p-2 bg-slate-50/50 rounded-[2rem]">
               {['ALL', 'PRIVILEGE', 'SECURITY', 'SYSTEM'].map(t => (
                  <button
                     key={t}
                     onClick={() => setFilterType(t)}
                     className={`px-8 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${
                        filterType === t ? 'bg-white text-[#1ea05f] shadow-md' : 'text-slate-400 hover:text-slate-600'
                     }`}
                  >
                     {t}
                  </button>
               ))}
            </div>
         </div>
      </div>

      {/* 🕒 Activity Feed */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden min-h-[600px]">
         <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Forensic Chronology</h3>
            <span className="text-[10px] font-bold text-slate-400">Viewing {filteredLogs.length} matching fragments</span>
         </div>

         <div className="divide-y divide-slate-50">
            {loading ? (
               <div className="flex flex-col items-center justify-center py-40 space-y-4">
                  <FiActivity className="text-[#1ea05f] animate-pulse" size={40} />
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Decrypting system stream...</p>
               </div>
            ) : filteredLogs.length === 0 ? (
               <div className="flex flex-col items-center justify-center py-40 space-y-4">
                  <FiTrash2 className="text-slate-200" size={40} />
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">No anomaly detected</p>
               </div>
            ) : filteredLogs.map((log, idx) => (
               <motion.div 
                 key={log.id}
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: idx * 0.05 }}
                 className="p-8 group hover:bg-slate-50/50 transition-all flex flex-col md:flex-row gap-6 items-start"
               >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${getStatusColor(log.type)}`}>
                     {getActionIcon(log.type)}
                  </div>
                  
                  <div className="flex-1 space-y-2">
                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                           <h4 className="text-sm font-black text-slate-800 tracking-tightest">{log.action || 'Unknown Operation'}</h4>
                           <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-2xl">{log.message || 'No additional context provided for this entry.'}</p>
                        </div>
                        <div className="text-right">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center justify-end gap-2">
                              <FiClock size={10} /> {log.timestamp ? format(log.timestamp, 'HH:mm:ss O') : '--:--:--'}
                           </p>
                           <p className="text-[9px] font-bold text-slate-300 tracking-widest">{log.timestamp ? format(log.timestamp, 'dd MMM yyyy') : 'Date Unknown'}</p>
                        </div>
                     </div>

                     <div className="flex items-center gap-6 pt-2">
                        <div className="flex items-center gap-2">
                           <div className="w-5 h-5 rounded-md bg-slate-100 flex items-center justify-center text-slate-500">
                              <FiUser size={10} />
                           </div>
                           <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Admin: <span className="text-slate-900">{log.adminUid ? log.adminUid.substring(0, 12) + '...' : 'System'}</span></span>
                        </div>
                        {log.affectedUserId && (
                           <div className="flex items-center gap-2">
                              <FiArrowRight size={10} className="text-slate-300" />
                              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Subject: <span className="text-slate-900">{log.affectedUserId.substring(0, 12) + '...'}</span></span>
                           </div>
                        )}
                        {log.affectedUserIds && (
                           <div className="flex items-center gap-2">
                              <FiArrowRight size={10} className="text-slate-300" />
                              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Batch: <span className="text-emerald-600 font-black">{log.affectedUserIds.length} Identity Handles</span></span>
                           </div>
                        )}
                     </div>
                  </div>
               </motion.div>
            ))}
         </div>
      </div>
    </div>
  );
}

export default withAuth(AuditDashboard, {
  allowedRoles: [UserRole.ADMIN]
});
