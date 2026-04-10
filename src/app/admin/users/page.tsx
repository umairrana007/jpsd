'use client';

import React, { useState, useEffect } from 'react';
import { 
  FiUser, FiShield, FiUserCheck, FiFilter, 
  FiEdit3, FiLock, FiSlash, FiSearch, 
  FiMail, FiActivity, FiKey, FiCheck, FiX, FiRefreshCw
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { getUsers, updateUserStatus, updateUserRole, logActivity } from '@/lib/firebaseUtils';
import { withAuth } from '@/components/admin/withAuth';
import { UserRole, User as AppUser } from '@/types';
import { useAuth } from '@/hooks/useAuth';

function AdminUsersPage() {
  const { user: authUser, setGlobalAlert } = useAuth();
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, approved
  const [searchQuery, setSearchQuery] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkRole, setBulkRole] = useState<UserRole | ''>('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const data = await getUsers();
    setUsers(data as unknown as AppUser[]);
    setLoading(false);
  };

  const handleAction = async (userId: string, status: 'approved' | 'rejected' | 'inactive', isActive: boolean) => {
    setActionLoading(userId);
    try {
      await updateUserStatus(userId, status, isActive);
      
      // Log Activity
      await logActivity({
        action: 'USER_STATUS_UPDATE',
        type: 'PRIVILEGE',
        message: `Admin ${authUser?.email} updated user ${userId} status to ${status}`,
        adminUid: authUser?.uid,
        affectedUserId: userId,
        newStatus: status
      });

      await fetchUsers(); // Refresh list
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    setActionLoading(userId);
    try {
      await updateUserRole(userId, newRole);

      // Log Activity
      await logActivity({
        action: 'USER_ROLE_UPDATE',
        type: 'PRIVILEGE',
        message: `Admin ${authUser?.email} changed user ${userId} role to ${newRole}`,
        adminUid: authUser?.uid,
        affectedUserId: userId,
        newRole
      });

      await fetchUsers();
    } catch (error) {
      console.error('Error updating role:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const toggleSelectUser = (userId: string) => {
    setSelectedUserIds(prev => 
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const toggleSelectAll = () => {
    const currentIds = filteredUsers.map(u => u.id);
    if (selectedUserIds.length === currentIds.length) {
      setSelectedUserIds([]);
    } else {
      setSelectedUserIds(currentIds);
    }
  };

  const handleBulkAction = async (type: 'role' | 'activate' | 'deactivate') => {
    setActionLoading('bulk');
    try {
       for (const userId of selectedUserIds) {
          if (type === 'role' && bulkRole) {
             await updateUserRole(userId, bulkRole as UserRole);
          } else if (type === 'activate') {
             await updateUserStatus(userId, 'approved', true);
          } else if (type === 'deactivate') {
             await updateUserStatus(userId, 'inactive', false);
          }
       }
       await fetchUsers();

       // Log Bulk Activity
       await logActivity({
          action: 'BULK_USER_ACTION',
          type: 'PRIVILEGE',
          message: `Admin ${authUser?.email} performed bulk ${type} on ${selectedUserIds.length} users`,
          adminUid: authUser?.uid,
          affectedUserIds: selectedUserIds,
          actionType: type,
          ...(type === 'role' && { newRole: bulkRole })
       });

       setSelectedUserIds([]);
       setShowBulkModal(false);
       setGlobalAlert(`Bulk ${type} complete for ${selectedUserIds.length} users.`, 'success');
    } catch (error) {
       console.error('Bulk action failed:', error);
       setGlobalAlert('Bulk action failed. HQ assets disconnected.', 'error');
    } finally {
       setActionLoading(null);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesFilter = 
      filter === 'all' ? true : 
      filter === 'pending' ? user.status === 'pending' : 
      filter === 'approved' ? user.status === 'approved' : 
      filter === 'deletion' ? user.status === 'pending_deletion' : true;
    
    const matchesSearch = 
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: users.length,
    pending: users.filter(u => u.status === 'pending').length,
    deletion: users.filter(u => u.status === 'pending_deletion').length,
    volunteers: users.filter(u => u.role === UserRole.VOLUNTEER).length,
    active: users.filter(u => u.isActive).length
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase">User Protocol</h2>
          <p className="text-slate-500 font-medium italic underline decoration-[#1ea05f]/30 underline-offset-4 tracking-tight">Identity management and access control systems.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={fetchUsers}
            className="p-3 bg-white text-[#1ea05f] rounded-2xl border border-slate-200 shadow-sm hover:rotate-180 transition-all duration-500"
          >
            <FiRefreshCw size={20} className={loading ? 'animate-spin' : ''} />
          </button>
          <button className="px-8 py-3 bg-slate-950 text-white font-black rounded-2xl shadow-xl shadow-slate-900/20 hover:opacity-90 transition-all flex items-center gap-2 uppercase text-xs tracking-widest">
            <FiUserCheck /> Manual Invite
          </button>
        </div>
      </header>

      {/* Stats Bento */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: 'Cloud Directory', val: stats.total, sub: 'Total Records', icon: <FiUser />, color: 'text-slate-600' },
           { label: 'Security Review', val: stats.pending, sub: 'Action Required', icon: <FiShield />, color: 'text-amber-500' },
           { label: 'Active Assets', val: stats.active, sub: 'Live Connections', icon: <FiActivity />, color: 'text-[#1ea05f]' },
           { label: 'Volunteer Force', val: stats.volunteers, sub: 'Field Operators', icon: <FiUserCheck />, color: 'text-blue-500' },
         ].map((stat, i) => (
           <div key={i} className="bg-white/80 backdrop-blur-md p-6 rounded-[2.5rem] border border-white shadow-sm flex flex-col justify-between h-36 group hover:border-[#1ea05f]/30 transition-all">
              <div className="flex justify-between items-start">
                 <div className={`p-2.5 rounded-xl bg-slate-50 ${stat.color} group-hover:scale-110 transition-transform`}>{stat.icon}</div>
                 <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded-full ${stat.val > 0 && i === 1 ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400'}`}>
                    {stat.sub}
                 </span>
              </div>
              <div className="mt-4">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                 <h4 className="text-4xl font-black text-slate-800 tracking-tighter italic">{stat.val}</h4>
              </div>
           </div>
         ))}
      </section>

      {/* Main Container */}
      <div className="bg-white/70 backdrop-blur-md rounded-[3rem] border border-white shadow-sm overflow-hidden">
         {/* Filter Tabs */}
         <div className="flex border-b border-slate-50 px-8 pt-6">
            {[
              { id: 'all', label: 'All Records' },
              { id: 'pending', label: 'Account Approvals' },
              { id: 'approved', label: 'Approved Access' },
              { id: 'deletion', label: 'Deletion Requests' }
            ].map((t) => (
              <button 
                key={t.id}
                onClick={() => setFilter(t.id)}
                className={`px-8 py-4 text-[10px] font-black uppercase tracking-widest transition-all relative ${filter === t.id ? 'text-[#1ea05f]' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {t.label}
                {filter === t.id && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-[#1ea05f] rounded-full" />
                )}
              </button>
            ))}
         </div>

         <div className="p-8 border-b border-slate-50 flex flex-wrap items-center justify-between gap-6">
            <div className="flex-1 min-w-[300px] relative group">
               <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1ea05f] transition-colors" />
               <input 
                  type="text" 
                  placeholder="Search by name or email hash..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-16 pr-8 py-5 bg-slate-50/50 border border-transparent rounded-[2rem] text-sm font-bold focus:ring-4 focus:ring-[#1ea05f]/5 focus:bg-white focus:border-[#1ea05f]/20 transition-all outline-none" 
               />
            </div>
         </div>

         {/* Bulk Actions Bar */}
         <AnimatePresence>
            {selectedUserIds.length > 0 && (
               <motion.div 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-6"
               >
                  <div className="bg-slate-900 text-white p-6 rounded-[2.5rem] shadow-2xl flex items-center justify-between border border-white/10 backdrop-blur-xl">
                     <div className="flex items-center gap-6">
                        <div className="bg-[#1ea05f] text-white w-12 h-12 rounded-2xl flex items-center justify-center font-black">
                           {selectedUserIds.length}
                        </div>
                        <div>
                           <p className="text-sm font-black uppercase tracking-widest italic">Users Highlighted</p>
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Global Protocol Intervention Active</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <button 
                           onClick={() => setShowBulkModal(true)}
                           className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
                        >
                           Change Privilege
                        </button>
                        <button 
                           onClick={() => handleBulkAction('activate')}
                           className="px-6 py-3 bg-[#1ea05f] hover:bg-[#15804a] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
                        >
                           Bulk Activate
                        </button>
                        <button 
                           onClick={() => handleBulkAction('deactivate')}
                           className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
                        >
                           Bulk Deactivate
                        </button>
                        <button 
                           onClick={() => setSelectedUserIds([])}
                           className="p-3 text-slate-400 hover:text-white transition-all"
                        >
                           <FiX size={20} />
                        </button>
                     </div>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>

         <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                     <th className="px-10 py-6 w-10">
                        <input 
                          type="checkbox" 
                          checked={selectedUserIds.length === filteredUsers.length && filteredUsers.length > 0}
                          onChange={toggleSelectAll}
                          className="w-5 h-5 rounded-lg border-slate-300 text-[#1ea05f] focus:ring-[#1ea05f]/20 cursor-pointer"
                        />
                     </th>
                     <th className="px-10 py-6">Operator Identity</th>
                     <th className="px-10 py-6">Privilege Rank</th>
                     <th className="px-10 py-6">System Status</th>
                     <th className="px-10 py-6 text-right">Protocol Intervention</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50/50">
                  <AnimatePresence>
                    {filteredUsers.map((user) => (
                      <motion.tr 
                        key={user.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`group hover:bg-slate-50/30 transition-all ${selectedUserIds.includes(user.id) ? 'bg-[#1ea05f]/5' : ''}`}
                      >
                         <td className="px-10 py-8">
                            <input 
                              type="checkbox" 
                              checked={selectedUserIds.includes(user.id)}
                              onChange={() => toggleSelectUser(user.id)}
                              className="w-5 h-5 rounded-lg border-slate-300 text-[#1ea05f] focus:ring-[#1ea05f]/20 cursor-pointer"
                            />
                         </td>
                         <td className="px-10 py-8">
                            <div className="flex items-center gap-5">
                               <div className="w-14 h-14 rounded-3xl bg-slate-100 flex items-center justify-center text-[#1ea05f] font-black text-lg border border-slate-200 group-hover:border-[#1ea05f]/30 transition-all shadow-sm">
                                  {user.name?.charAt(0) || user.email?.charAt(0)}
                               </div>
                               <div>
                                  <p className="text-base font-black text-slate-800 tracking-tightest">{user.name}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                     <FiMail size={12} className="text-slate-400" />
                                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{user.email}</p>
                                  </div>
                               </div>
                            </div>
                         </td>
                         <td className="px-10 py-8">
                            <div className="relative inline-block">
                               <select
                                  value={user.role}
                                  onChange={(e) => handleRoleChange(user.id, e.target.value as UserRole)}
                                  disabled={actionLoading === user.id}
                                  className={`appearance-none px-4 py-2 pr-8 rounded-xl text-[9px] font-black uppercase tracking-[0.1em] border outline-none bg-transparent cursor-pointer transition-all ${
                                    user.role === UserRole.ADMIN ? 'bg-red-50 text-red-600 border-red-100' : 
                                    user.role === UserRole.VOLUNTEER ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                                    user.role === UserRole.CONTENT_MANAGER ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                    'bg-emerald-50 text-emerald-600 border-emerald-100'
                                  }`}
                               >
                                  {Object.values(UserRole).map(role => (
                                     <option key={role} value={role} className="bg-white text-slate-800">{role.replace('_', ' ')}</option>
                                  ))}
                               </select>
                               <FiShield className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-40 text-[10px]" />
                            </div>
                         </td>
                         <td className="px-10 py-8">
                            <div className="flex items-center gap-3">
                               <div className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-[#1ea05f] shadow-[0_0_10px_#1ea05f]' : 'bg-slate-300'}`}></div>
                               <span className={`text-[10px] font-black uppercase tracking-widest ${user.isActive ? 'text-slate-800' : 'text-slate-400'}`}>
                                  {user.status || 'Unknown'}
                               </span>
                            </div>
                         </td>
                         <td className="px-10 py-8 text-right">
                            <div className="flex justify-end gap-2">
                               {user.status === 'pending_deletion' ? (
                                 <button 
                                   disabled={actionLoading === user.id}
                                   onClick={() => handleAction(user.id, 'inactive', false)}
                                   className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
                                 >
                                   <FiX strokeWidth={3} /> SAFE PURGE (DEACTIVATE)
                                 </button>
                               ) : user.status === 'pending' ? (
                                 <>
                                   <button 
                                     disabled={actionLoading === user.id}
                                     onClick={() => handleAction(user.id, 'approved', true)}
                                     className="flex items-center gap-2 px-5 py-2.5 bg-[#1ea05f] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#15804a] transition-all disabled:opacity-50"
                                   >
                                     <FiCheck strokeWidth={3} /> Approve
                                   </button>
                                   <button 
                                     disabled={actionLoading === user.id}
                                     onClick={() => handleAction(user.id, 'rejected', false)}
                                     className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all disabled:opacity-50"
                                   >
                                     <FiX strokeWidth={3} /> Reject
                                   </button>
                                 </>
                               ) : (
                                 <>
                                   <button 
                                      onClick={() => handleAction(user.id, user.isActive ? 'inactive' : 'approved', !user.isActive)}
                                      className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                                        user.isActive ? 'text-red-500 border-red-100 hover:bg-red-50' : 'text-[#1ea05f] border-[#1ea05f]/20 hover:bg-[#1ea05f]/5'
                                      }`}
                                   >
                                      {user.isActive ? 'Deactivate' : 'Activate'}
                                   </button>
                                 </>
                               )}
                            </div>
                         </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                  {filteredUsers.length === 0 && !loading && (
                    <tr>
                       <td colSpan={4} className="px-10 py-20 text-center">
                          <FiUser className="mx-auto text-slate-200 mb-4" size={48} />
                          <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">No intelligence records found matching your current filters.</p>
                       </td>
                    </tr>
                  )}
               </tbody>
            </table>
         </div>

         {/* Bulk Role Modal */}
         <AnimatePresence>
            {showBulkModal && (
               <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
                  <motion.div 
                     initial={{ scale: 0.9, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     className="bg-white rounded-[3rem] w-full max-w-md p-10 shadow-2xl relative overflow-hidden"
                  >
                     <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1ea05f] to-[#3b82f6]" />
                     <h3 className="text-2xl font-black text-slate-800 tracking-tight uppercase italic mb-2">Mass Privilege Shift</h3>
                     <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-8">Reclassifying {selectedUserIds.length} operators</p>
                     
                     <div className="space-y-4">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Select New Rank</label>
                        <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2">
                           {Object.values(UserRole).map((role) => (
                              <button 
                                 key={role}
                                 onClick={() => setBulkRole(role)}
                                 className={`p-4 rounded-2xl border text-xs font-black uppercase tracking-widest transition-all text-left flex items-center justify-between ${
                                    bulkRole === role ? 'border-[#1ea05f] bg-[#1ea05f]/5 text-[#1ea05f]' : 'border-slate-100 text-slate-600 hover:border-slate-200'
                                 }`}
                              >
                                 {role.replace('_', ' ')}
                                 {bulkRole === role && <FiCheck />}
                              </button>
                           ))}
                        </div>
                     </div>

                     <div className="flex gap-4 mt-10">
                        <button 
                           onClick={() => setShowBulkModal(false)}
                           className="flex-1 py-4 bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-slate-100 transition-all"
                        >
                           Cancel
                        </button>
                        <button 
                           onClick={() => handleBulkAction('role')}
                           disabled={!bulkRole || actionLoading === 'bulk'}
                           className="flex-1 py-4 bg-[#1ea05f] text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-xl shadow-[#1ea05f]/20 hover:opacity-90 transition-all disabled:opacity-50"
                        >
                           {actionLoading === 'bulk' ? <FiRefreshCw className="animate-spin mx-auto" /> : 'Confirm Update'}
                        </button>
                     </div>
                  </motion.div>
               </div>
            )}
         </AnimatePresence>
      </div>
    </div>
  );
}

export default withAuth(AdminUsersPage, { 
  allowedRoles: [UserRole.ADMIN] 
});
