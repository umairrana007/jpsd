'use client';

import React, { useState, useEffect } from 'react';
import { 
  FiPackage, FiUser, FiMapPin, FiClock, FiCheckCircle, 
  FiAlertCircle, FiPlus, FiSearch, FiFilter, FiActivity,
  FiSend, FiTrash2, FiMaximize2, FiArrowRight
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  getDeployments, 
  getVolunteers, 
  createDeployment, 
  updateDeploymentStatus,
  logActivity 
} from '@/lib/firebaseUtils';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole, DeploymentData, Volunteer } from '@/types';
import { Timestamp } from 'firebase/firestore';

export default function AdminDeploymentsPage() {
  const { user, currentUserData, setGlobalAlert } = useAuth();
  const router = useRouter();
  const [deployments, setDeployments] = useState<DeploymentData[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Form State
  const [newDeployment, setNewDeployment] = useState({
    volunteerId: '',
    title: '',
    locationName: '',
    category: 'Relief',
    difficulty: 'Normal',
    matchScore: 85
  });

  useEffect(() => {
    // Role Authorization Check
    if (currentUserData && currentUserData.role !== UserRole.ADMIN) {
      router.push('/unauthorized');
      return;
    }
    fetchData();
  }, [currentUserData, router]);

  const fetchData = async () => {
    setLoading(true);
    const [dData, vData] = await Promise.all([
      getDeployments(),
      getVolunteers()
    ]);
    setDeployments(dData as DeploymentData[]);
    setVolunteers((vData as Volunteer[]).filter(v => v.status === 'approved'));
    setLoading(false);
  };

  const handleVerify = async (deploymentId: string) => {
    const success = await updateDeploymentStatus(deploymentId, 'verified', {
      verifiedAt: Timestamp.now(),
      verifiedBy: user?.displayName || user?.email || 'Admin HQ'
    });
    
    if (success) {
      await logActivity({
        type: 'DEPLOYMENT_VERIFIED',
        message: `Deployment ${deploymentId} verified by ${user?.displayName || user?.email}`,
        icon: '✅'
      });
      setGlobalAlert('Mission Verified Successfully. Metrics synchronized.', 'success');
      fetchData();
    }
  };

  const filteredDeployments = deployments.filter(d => {
    const matchesSearch = d.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         d.volunteerName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreate = async () => {
    if (!newDeployment.volunteerId || !newDeployment.title) return;
    
    const volunteer = volunteers.find(v => v.id === newDeployment.volunteerId);
    const success = await createDeployment({
      ...newDeployment,
      volunteerName: volunteer?.name || 'Unknown',
      status: 'assigned',
    });

    if (success) {
      setShowAssignModal(false);
      fetchData();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned': return 'bg-blue-500';
      case 'checked-in': return 'bg-amber-500';
      case 'completed': return 'bg-emerald-500';
      case 'verified': return 'bg-[#1ea05f] shadow-[0_0_10px_#1ea05f]';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className="p-8 lg:p-12 space-y-10">
      <header className="flex justify-between items-end bg-slate-900 p-12 rounded-[3.5rem] text-white overflow-hidden relative border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#1ea05f]/20 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="relative z-10 space-y-2">
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1ea05f] italic">Strategic Field Operations</p>
           <h1 className="text-5xl font-black italic uppercase italic tracking-tighter">Deployment HQ</h1>
           <p className="text-slate-400 text-xs font-medium max-w-sm">Command center for volunteer mobilization and mission lifecycle tracking.</p>
        </div>
        <button 
          onClick={() => setShowAssignModal(true)}
          className="relative z-10 px-10 py-5 bg-[#1ea05f] text-white rounded-2xl flex items-center gap-3 font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-[#1ea05f]/20 hover:scale-105 transition-all"
        >
          <FiPlus /> New Deployment
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         <div className="lg:col-span-3 space-y-6">
            <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-10">
                   <div className="flex items-center gap-6">
                      <div className="relative">
                        <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="text" 
                          placeholder="Search deployments..."
                          className="pl-16 pr-10 py-4 bg-slate-50 border-none rounded-2xl italic font-bold text-xs focus:ring-2 focus:ring-[#1ea05f] transition-all w-80"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <div className="flex bg-slate-50 p-1 rounded-xl">
                         <button 
                           onClick={() => setStatusFilter('all')}
                           className={`px-6 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${statusFilter === 'all' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400'}`}
                         >
                           All Ops
                         </button>
                         <button 
                           onClick={() => setStatusFilter('checked-in')}
                           className={`px-6 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${statusFilter === 'checked-in' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400'}`}
                         >
                           In Field
                         </button>
                         <button 
                           onClick={() => setStatusFilter('completed')}
                           className={`px-6 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${statusFilter === 'completed' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400'}`}
                         >
                           Pending Verify
                         </button>
                      </div>
                   </div>
                   <FiFilter className="text-slate-400" size={20} />
                </div>

                <div className="overflow-x-auto">
                   <table className="w-full">
                      <thead>
                         <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 italic">
                            <th className="pb-6 text-left pl-4">Mission Reference</th>
                            <th className="pb-6 text-left">Specialist</th>
                            <th className="pb-6 text-left">Theater</th>
                            <th className="pb-6 text-left">Status</th>
                            <th className="pb-6 text-right pr-4">Timeline</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                          {filteredDeployments.map((d, i) => (
                            <motion.tr 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.05 }}
                              key={d.id} 
                              className="group hover:bg-slate-50/50 transition-colors cursor-pointer"
                            >
                               <td className="py-8 pl-4">
                                  <div className="flex items-center gap-4">
                                     <div className="w-12 h-12 bg-[#1ea05f]/10 rounded-xl flex items-center justify-center text-[#1ea05f]">
                                        <FiPackage size={20} />
                                     </div>
                                     <div>
                                        <p className="text-xs font-black uppercase italic text-slate-800">{d.title}</p>
                                        <p className="text-[9px] font-black text-slate-400 tracking-widest uppercase">{d.category}</p>
                                     </div>
                                  </div>
                               </td>
                               <td className="py-8">
                                  <div className="flex items-center gap-3">
                                     <FiUser size={14} className="text-[#1ea05f]" />
                                     <span className="text-xs font-bold text-slate-600 italic underline decoration-slate-200 underline-offset-4">{d.volunteerName}</span>
                                  </div>
                               </td>
                               <td className="py-8">
                                  <div className="flex items-center gap-3 text-slate-500">
                                     <FiMapPin size={12} />
                                     <span className="text-[10px] font-black uppercase tracking-widest">{d.locationName}</span>
                                  </div>
                               </td>
                               <td className="py-8">
                                  <div className="flex items-center gap-6">
                                     <div className="flex items-center gap-2 min-w-[100px]">
                                        <div className={`w-2 h-2 rounded-full ${getStatusColor(d.status)} ${d.status !== 'verified' ? 'animate-pulse' : ''}`} />
                                        <span className={`text-[10px] font-black uppercase italic tracking-widest ${d.status === 'verified' ? 'text-[#1ea05f]' : 'text-slate-800'}`}>
                                           {d.status}
                                        </span>
                                     </div>
                                     {d.status === 'completed' && (
                                       <button 
                                         onClick={(e) => {
                                           e.stopPropagation();
                                           handleVerify(d.id!);
                                         }}
                                         className="px-4 py-2 bg-[#1ea05f]/10 text-[#1ea05f] hover:bg-[#1ea05f] hover:text-white rounded-lg text-[8px] font-black uppercase tracking-widest transition-all"
                                       >
                                         Authorize Verification
                                       </button>
                                     )}
                                  </div>
                               </td>
                               <td className="py-8 text-right pr-4">
                                  <p className="text-[10px] font-bold text-slate-400 uppercase">
                                    {d.updatedAt instanceof Date ? d.updatedAt.toLocaleTimeString() : 'N/A'}
                                  </p>
                               </td>
                            </motion.tr>
                          ))}
                      </tbody>
                   </table>
                </div>
            </div>
         </div>

         <div className="space-y-8">
            <div className="bg-slate-900 p-10 rounded-[3rem] text-white space-y-8 relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
               <div>
                  <h3 className="text-xl font-black italic uppercase tracking-tighter">Live Intel</h3>
                  <p className="text-[9px] font-black text-[#1ea05f] uppercase tracking-widest mt-1">Global Operational Status</p>
               </div>
               
               <div className="space-y-6">
                  {[
                    { label: 'Active Deployments', val: 24, icon: <FiActivity size={16}/>, color: 'text-blue-400' },
                    { label: 'Successful Extractions', val: 142, icon: <FiCheckCircle size={16}/>, color: 'text-[#1ea05f]' },
                    { label: 'On-Standby', val: 8, icon: <FiClock size={16}/>, color: 'text-amber-400' },
                  ].map((s, i) => (
                    <div key={i} className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                       <div className="flex items-center gap-4">
                          <div className={s.color}>{s.icon}</div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{s.label}</span>
                       </div>
                       <span className="text-lg font-black italic">{s.val}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="p-8 bg-white border border-slate-200 rounded-[3rem] space-y-6">
               <div className="flex gap-4">
                  <FiAlertCircle className="text-amber-500 shrink-0" size={24} />
                  <div>
                    <h4 className="text-xs font-black uppercase italic text-slate-800">Critical Directives</h4>
                    <p className="text-[9px] font-bold text-slate-400 uppercase leading-relaxed mt-1">Manual synchronization required for 4 completed missions.</p>
                  </div>
               </div>
               <button className="w-full py-4 bg-slate-50 rounded-2xl text-[9px] font-black uppercase tracking-widest text-slate-800 hover:bg-slate-100 transition-all border border-slate-100">
                  Global Audit Sync
               </button>
            </div>
         </div>
      </div>

      {/* Assignment Modal */}
      <AnimatePresence>
        {showAssignModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-xl">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-xl rounded-[4rem] p-12 overflow-hidden relative shadow-2xl"
            >
               <div className="absolute top-0 right-0 w-48 h-48 bg-slate-50 rounded-full -mr-24 -mt-24" />
               <h2 className="text-3xl font-black italic uppercase tracking-tighter text-slate-800 mb-8 relative z-10">Assign Mission</h2>
               
               <div className="space-y-8 relative z-10">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Select Specialist</label>
                    <select 
                      className="w-full px-6 py-5 bg-slate-50 border-none rounded-2xl text-xs font-bold focus:ring-2 focus:ring-[#1ea05f]"
                      value={newDeployment.volunteerId}
                      onChange={(e) => setNewDeployment({ ...newDeployment, volunteerId: e.target.value })}
                    >
                      <option value="">Choose Volunteer...</option>
                      {volunteers.map(v => (
                        <option key={v.id} value={v.id}>{v.name} ({v.email})</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Mission Directive</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Flood Relief Distribution"
                      className="w-full px-6 py-5 bg-slate-50 border-none rounded-2xl text-xs font-bold focus:ring-2 focus:ring-[#1ea05f]"
                      value={newDeployment.title}
                      onChange={(e) => setNewDeployment({ ...newDeployment, title: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Theater Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Sector 7, Karachi"
                        className="w-full px-6 py-5 bg-slate-50 border-none rounded-2xl text-xs font-bold focus:ring-2 focus:ring-[#1ea05f]"
                        value={newDeployment.locationName}
                        onChange={(e) => setNewDeployment({ ...newDeployment, locationName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Priority</label>
                      <select 
                        className="w-full px-6 py-5 bg-slate-50 border-none rounded-2xl text-xs font-bold focus:ring-2 focus:ring-[#1ea05f]"
                        value={newDeployment.difficulty}
                        onChange={(e) => setNewDeployment({ ...newDeployment, difficulty: e.target.value })}
                      >
                        <option value="Low">Low</option>
                        <option value="Normal">Normal</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6">
                     <button 
                       onClick={handleCreate}
                       className="flex-1 py-5 bg-[#1ea05f] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 shadow-xl shadow-[#1ea05f]/20"
                     >
                       <FiSend /> Initiate Deployment
                     </button>
                     <button 
                       onClick={() => setShowAssignModal(false)}
                       className="px-10 py-5 bg-slate-100 text-slate-400 rounded-2xl font-black uppercase tracking-widest text-[10px]"
                     >
                       Abort
                     </button>
                  </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
