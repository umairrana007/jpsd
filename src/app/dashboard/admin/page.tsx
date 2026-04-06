'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiUsers, FiShield, FiHeart, FiActivity, 
  FiCheckCircle, FiXCircle, FiPlus, FiGlobe, 
  FiMessageSquare, FiSettings, FiSearch, FiEdit3, FiTrash2
} from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, getDocs, doc, updateDoc, where, orderBy, limit } from 'firebase/firestore';

export default function AdminOverview() {
  const { language } = useLanguage();
  const { isAdmin } = useAuth();
  const isUrdu = language === 'ur';
  
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingUsers: 0,
    totalDonations: 'PKR 12.4M',
    activeCauses: 0
  });

  const [pendingUsersList, setPendingUsersList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      fetchAdminData();
    }
  }, [isAdmin]);

  const fetchAdminData = async () => {
    if (!db) return; // Firebase not configured
    
    try {
      // Mock data for initial UI - in real app, these would be separate Firestore queries
      const usersRef = collection(db, 'users');
      const causesRef = collection(db, 'causes');
      
      const usersSnap = await getDocs(usersRef);
      const pendingQuery = query(usersRef, where('isActive', '==', false));
      const pendingSnap = await getDocs(pendingQuery);
      const causesSnap = await getDocs(causesRef);

      setStats({
        totalUsers: usersSnap.size,
        pendingUsers: pendingSnap.size,
        totalDonations: 'PKR 12.4M',
        activeCauses: causesSnap.size
      });

      const pendingUsers = pendingSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPendingUsersList(pendingUsers);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      setLoading(false);
    }
  };

  const handleApprove = async (userId: string) => {
    if (!db) return;
    
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { 
        isActive: true,
        status: 'approved'
      });
      // Refresh list
      setPendingUsersList(prev => prev.filter(u => u.id !== userId));
      setStats(prev => ({ ...prev, pendingUsers: prev.pendingUsers - 1 }));
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-4xl shadow-lg border border-red-100">
          <FiShield />
        </div>
        <h2 className="text-3xl font-black text-slate-800 uppercase italic tracking-tighter">Access Denied</h2>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Restricted to Humanitarian Administrators Only.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Admin Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
         <div className="space-y-4">
            <div className="flex items-center gap-3 text-[#1ea05f] font-black text-[10px] uppercase tracking-[0.4em]">
               <FiShield strokeWidth={3} /> Global Command
            </div>
            <h1 className="text-6xl font-black text-slate-800 tracking-tighter italic uppercase leading-none">
               {isUrdu ? 'انتظامیہ' : 'Admin Panel'}
            </h1>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] leading-relaxed">System-wide governance, user approvals, and mission synchronization.</p>
         </div>
         
         <div className="flex gap-4">
            <button className="px-8 py-5 bg-[#1ea05f] text-white font-black rounded-2xl shadow-2xl shadow-emerald-200 hover:scale-105 transition-all text-[10px] uppercase tracking-widest flex items-center gap-2">
               <FiPlus size={16} strokeWidth={3} /> New Mission
            </button>
         </div>
      </header>

      {/* Admin Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         {[
            { label: 'Registered Forces', val: stats.totalUsers, icon: <FiUsers />, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Pending Approvals', val: stats.pendingUsers, icon: <FiCheckCircle />, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Global Donations', val: stats.totalDonations, icon: <FiHeart />, color: 'text-red-600', bg: 'bg-red-50' },
            { label: 'Active Missions', val: stats.activeCauses, icon: <FiGlobe />, color: 'text-[#1ea05f]', bg: 'bg-emerald-50' }
         ].map((stat, i) => (
            <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm group hover:border-slate-300 transition-all">
               <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                  {stat.icon}
               </div>
               <div className="text-4xl font-black text-slate-800 tracking-tighter mb-1 uppercase italic">{stat.val}</div>
               <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
            </div>
         ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
         {/* Approval Queue */}
         <div className="xl:col-span-2 space-y-10">
            <div className="flex items-center justify-between px-2">
               <h3 className="text-2xl font-black text-slate-800 tracking-tightest uppercase italic">Approval Queue</h3>
               <span className="px-4 py-2 bg-amber-50 text-amber-600 text-[10px] font-black uppercase rounded-xl border border-amber-100">{stats.pendingUsers} Awaiting Decision</span>
            </div>

            <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-sm overflow-hidden">
               <div className="p-10 border-b border-slate-50 flex items-center gap-4">
                  <FiSearch className="text-slate-300" />
                  <input type="text" placeholder="SEARCH OPERATIVES..." className="bg-transparent border-none focus:ring-0 text-[10px] font-black uppercase tracking-widest text-slate-800 flex-1" />
               </div>
               
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                           <th className="px-10 py-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Operative</th>
                           <th className="px-10 py-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Desired Role</th>
                           <th className="px-10 py-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Reg. Date</th>
                           <th className="px-10 py-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] italic text-right">Directives</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        {loading ? (
                           <tr>
                              <td colSpan={4} className="px-10 py-20 text-center text-[10px] font-black text-slate-300 uppercase tracking-widest italic animate-pulse">Scanning database...</td>
                           </tr>
                        ) : pendingUsersList.length === 0 ? (
                           <tr>
                              <td colSpan={4} className="px-10 py-20 text-center text-[10px] font-black text-slate-300 uppercase tracking-widest italic">All clear. No pending approvals.</td>
                           </tr>
                        ) : (
                           pendingUsersList.map((user) => (
                              <tr key={user.id} className="group hover:bg-slate-50/50 transition-colors">
                                 <td className="px-10 py-8">
                                    <div className="flex items-center gap-4">
                                       <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-[#1ea05f] font-black text-xs">
                                          {user.name?.slice(0, 2).toUpperCase()}
                                       </div>
                                       <div>
                                          <div className="text-[11px] font-black text-slate-800 uppercase tracking-tight italic">{user.name}</div>
                                          <div className="text-[8px] text-slate-400 font-bold uppercase">{user.email}</div>
                                       </div>
                                    </div>
                                 </td>
                                 <td className="px-10 py-8">
                                    <span className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-[8px] font-black uppercase tracking-widest border border-slate-200">{user.role}</span>
                                 </td>
                                 <td className="px-10 py-8">
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">{user.createdAt?.toDate ? user.createdAt.toDate().toLocaleDateString() : 'N/A'}</span>
                                 </td>
                                 <td className="px-10 py-8 text-right">
                                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                       <button 
                                          onClick={() => handleApprove(user.id)}
                                          className="p-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                                       >
                                          <FiCheckCircle strokeWidth={3} />
                                       </button>
                                       <button className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm">
                                          <FiXCircle strokeWidth={3} />
                                       </button>
                                    </div>
                                 </td>
                              </tr>
                           ))
                        )}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

         {/* Admin Tools */}
         <div className="space-y-10">
            <div className="bg-slate-950 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#1ea05f]/20 rounded-full blur-[80px] -mr-32 -mt-32"></div>
               <h4 className="text-3xl font-black italic uppercase tracking-tighter mb-4 relative z-10">Mission Core</h4>
               <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-10 relative z-10">Content & Campaign Management</p>
               
               <div className="space-y-4 relative z-10">
                  <button className="w-full p-6 bg-white/5 border border-white/10 rounded-[2rem] flex items-center justify-between hover:bg-white/10 transition-all group/tool">
                     <div className="flex items-center gap-4">
                        <FiEdit3 className="text-[#1ea05f]" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Update Causes</span>
                     </div>
                     <FiSettings className="opacity-0 group-hover/tool:opacity-100 transition-opacity" />
                  </button>
                  <button className="w-full p-6 bg-white/5 border border-white/10 rounded-[2rem] flex items-center justify-between hover:bg-white/10 transition-all group/tool">
                     <div className="flex items-center gap-4">
                        <FiMessageSquare className="text-blue-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Campaign Posts</span>
                     </div>
                     <FiSettings className="opacity-0 group-hover/tool:opacity-100 transition-opacity" />
                  </button>
                  <button className="w-full p-6 bg-white/5 border border-white/10 rounded-[2rem] flex items-center justify-between hover:bg-white/10 transition-all group/tool">
                     <div className="flex items-center gap-4">
                        <FiSearch className="text-purple-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Audit Logs</span>
                     </div>
                     <FiSettings className="opacity-0 group-hover/tool:opacity-100 transition-opacity" />
                  </button>
               </div>
            </div>

            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm text-center space-y-6">
               <div className="w-20 h-20 bg-slate-50 text-[#1ea05f] rounded-[2rem] flex items-center justify-center text-3xl mx-auto shadow-inner border border-slate-100">
                  <FiGlobe strokeWidth={2} />
               </div>
               <h5 className="text-xl font-black text-slate-800 uppercase italic tracking-tighter">Public Website</h5>
               <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px] px-4">Manage the humanitarian portal's public visibility and real-time announcements.</p>
               <button className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:bg-slate-800 transition-all text-[10px] uppercase tracking-widest">
                  Configure Frontend
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
