'use client';

import React, { useState } from 'react';
import { 
  FiUsers, FiUserCheck, FiClock, FiSearch, 
  FiFilter, FiEye, FiUserPlus, FiMoreHorizontal,
  FiMapPin, FiActivity, FiAward, FiRefreshCw,
  FiCheck, FiX, FiMoreVertical
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { withAuth } from '@/components/admin/withAuth';
import { UserRole, Volunteer } from '@/types';
import { getVolunteers, updateVolunteer } from '@/lib/firebaseUtils';
import { format } from 'date-fns';

const volunteersData = [
  { id: 1, name: 'Sarah Chen', email: 'sarah.c@example.org', skills: ['Medical', 'Spanish'], status: 'Verified', hours: '142h', image: 'S' },
  { id: 2, name: 'Marcus Wright', email: 'm.wright@domain.com', skills: ['Logistics', 'Driver'], status: 'On Duty', hours: '86h', image: 'M' },
  { id: 3, name: 'Elena Rodriguez', email: 'elena.r@charity.org', skills: ['Education'], status: 'Pending', hours: '0h', image: 'E' },
  { id: 4, name: 'Zohaib Khan', email: 'zohaib.k@jpsd.org.pk', skills: ['IT Support', 'Urdu'], status: 'Verified', hours: '210h', image: 'Z' },
];

function AdminVolunteersPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVolunteer, setSelectedVolunteer] = useState<any>(null);

  React.useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    setLoading(true);
    const data = await getVolunteers();
    setVolunteers(data);
    setLoading(false);
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    await updateVolunteer(id, { status: newStatus as any });
    await fetchVolunteers();
  };

  const filteredVolunteers = volunteers.filter(vol => {
    const matchesSearch = 
      (vol.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      vol.email?.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = 
      filterStatus === 'all' ? true : 
      vol.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: volunteers.length,
    pending: volunteers.filter(v => v.status === 'pending').length,
    active: volunteers.filter(v => v.status === 'approved').length
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase">Volunteer Force</h2>
          <p className="text-slate-500 font-medium">Coordinate, approve and assign tasks to your humanitarian team.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={fetchVolunteers}
            className="p-3 bg-white text-[#1ea05f] rounded-2xl border border-slate-200 shadow-sm hover:rotate-180 transition-all duration-500"
          >
            <FiRefreshCw size={20} className={loading ? 'animate-spin' : ''} />
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-[#1ea05f] text-white font-black rounded-2xl shadow-xl shadow-[#1ea05f]/20 hover:opacity-90 transition-all uppercase text-[10px] tracking-widest">
            <FiUserPlus />
            <span>Onboard Volunteer</span>
          </button>
        </div>
      </header>

      {/* KPI Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Active Force', val: stats.total.toLocaleString(), trend: '+14%', icon: <FiUsers size={24} />, color: 'bg-[#1ea05f]', light: 'bg-[#1ea05f]/10', text: 'text-[#1ea05f]' },
          { label: 'Pending Onboarding', val: stats.pending, sub: 'Immediate Attention Needed', icon: <FiClock size={24} />, color: 'bg-amber-500', light: 'bg-amber-500/10', text: 'text-amber-500' },
          { label: 'Field Deployments', val: stats.active, sub: 'Live Operational Assets', icon: <FiActivity size={24} />, color: 'bg-blue-500', light: 'bg-blue-500/10', text: 'text-blue-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white/80 backdrop-blur-md p-7 md:p-9 rounded-[2.5rem] border border-white shadow-sm flex flex-col gap-8 group hover:shadow-xl hover:shadow-slate-200/50 transition-all min-h-max h-full">
             <div className="flex justify-between items-start">
                <div className={`w-14 h-14 ${stat.light} ${stat.text} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm shadow-slate-100`}>
                   {stat.icon}
                </div>
                {stat.trend && <span className={`text-[10px] font-black ${stat.text} ${stat.light} px-3 py-1.5 rounded-lg uppercase tracking-wider`}>{stat.trend}</span>}
             </div>
             <div className="space-y-3">
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">{stat.label}</p>
                <div className="flex flex-col">
                   <h3 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tighter leading-tight">{stat.val}</h3>
                   {stat.sub && (
                     <div className={`inline-flex items-center gap-1.5 mt-2`}>
                       <span className={`w-1.5 h-1.5 rounded-full ${stat.text.replace('text-', 'bg-')} animate-pulse`}></span>
                       <p className={`text-[10px] font-black ${stat.text} uppercase tracking-tight`}>{stat.sub}</p>
                     </div>
                   )}
                </div>
             </div>
          </div>
        ))}
      </section>

      {/* Main Content Table */}
      <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] border border-white shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-wrap items-center justify-between gap-6">
           <div className="flex-1 min-w-[300px] relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, capabilities or hash..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-[1.5rem] text-sm font-bold focus:ring-4 focus:ring-[#1ea05f]/5 transition-all outline-none" 
            />
           </div>
           <div className="flex gap-4">
              <button className="px-6 py-3 bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-slate-100 transition-all flex items-center gap-2">
                 <FiFilter /> Filter
              </button>
               <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-transparent border-none text-[10px] font-black text-slate-800 uppercase tracking-widest focus:ring-0 cursor-pointer"
               >
                 <option value="all">All Operators</option>
                 <option value="approved">Approved Only</option>
                 <option value="pending">Pending Review</option>
                 <option value="inactive">Inactive</option>
               </select>
           </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead>
                 <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <th className="px-8 py-5">Volunteer Info</th>
                    <th className="px-8 py-5">Capabilities</th>
                    <th className="px-8 py-5">Activity Status</th>
                    <th className="px-8 py-5">Inv. Hours</th>
                    <th className="px-8 py-5 text-right">Administrative</th>
                 </tr>
              </thead>
               <tbody className="divide-y divide-slate-50">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="py-20 text-center animate-pulse">
                        <FiRefreshCw className="mx-auto mb-4 animate-spin text-[#1ea05f]" size={32} />
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Querying Satellite Link...</p>
                      </td>
                    </tr>
                  ) : filteredVolunteers.length > 0 ? (
                    filteredVolunteers.map((vol) => (
                    <tr key={vol.id} className="group hover:bg-slate-50/50 transition-all cursor-pointer" onClick={() => setSelectedVolunteer(vol)}>
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1ea05f] to-[#15804a] text-white flex items-center justify-center font-black text-xl shadow-lg shadow-[#1ea05f]/20">
                                {vol.name?.charAt(0) || vol.email?.charAt(0) || 'V'}
                             </div>
                             <div>
                                <p className="text-base font-black text-slate-800 tracking-tight">{vol.name}</p>
                                <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">{vol.email}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <div className="flex flex-wrap gap-1.5">
                             {(vol.skills || ['Generalist']).map((skill, i) => (
                               <span key={i} className="px-3 py-1 bg-slate-100 text-slate-600 text-[9px] font-black uppercase rounded-lg tracking-tighter">
                                 {skill}
                               </span>
                             ))}
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            vol.status === 'approved' ? 'bg-[#1ea05f]/10 text-[#1ea05f]' : 
                            vol.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${vol.status === 'approved' ? 'bg-[#1ea05f]' : vol.status === 'pending' ? 'bg-amber-500 animate-pulse' : 'bg-red-500'}`}></span>
                            {vol.status || 'Pending'}
                          </span>
                       </td>
                       <td className="px-8 py-6 font-black text-slate-800 text-sm italic">
                          {vol.hoursLogged || 0}h
                       </td>
                       <td className="px-8 py-6 text-right">
                          <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                             {vol.status === 'pending' ? (
                               <>
                                 <button onClick={() => handleStatusUpdate(vol.id!, 'approved')} className="p-2.5 text-[#1ea05f] hover:bg-[#1ea05f]/10 transition-all rounded-xl border border-slate-100 bg-white">
                                   <FiCheck size={16} strokeWidth={3} />
                                 </button>
                                 <button onClick={() => handleStatusUpdate(vol.id!, 'rejected')} className="p-2.5 text-red-500 hover:bg-red-50 transition-all rounded-xl border border-slate-100 bg-white">
                                   <FiX size={16} strokeWidth={3} />
                                 </button>
                               </>
                             ) : (
                               <button className="p-2.5 text-slate-400 hover:text-[#1ea05f] hover:bg-white transition-all rounded-xl border border-slate-100 bg-slate-50/50">
                                 <FiMoreHorizontal size={18} />
                               </button>
                             )}
                          </div>
                       </td>
                    </tr>
                   ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-24 text-center">
                        <FiUsers className="mx-auto mb-4 text-slate-200" size={56} />
                        <p className="text-sm font-black text-slate-400 uppercase tracking-widest italic">No personnel found in current mission sector.</p>
                      </td>
                    </tr>
                  )}
               </tbody>
           </table>
        </div>
      </div>

      {/* Analytics Row */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
            <h4 className="text-xl font-black text-slate-800 mb-8 border-b border-slate-50 pb-6 uppercase tracking-widest italic">Mission Impact Distribution</h4>
            <div className="space-y-6">
               {[
                 { label: 'Relief Ops', val: 82, color: 'bg-[#1ea05f]' },
                 { label: 'Tech Support', val: 45, color: 'bg-blue-500' },
                 { label: 'Logistics', val: 68, color: 'bg-amber-500' },
               ].map((item, i) => (
                 <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                       <span className="text-slate-500">{item.label}</span>
                       <span className={item.color.replace('bg-', 'text-')}>{item.val}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                       <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.val}%` }}></div>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#1ea05f]/20 rounded-full blur-3xl group-hover:bg-[#1ea05f]/30 transition-all"></div>
            <FiAward className="text-[#1ea05f] mb-6" size={42} />
            <h4 className="text-2xl font-black mb-4 tracking-tighter">Certified Training Program</h4>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed font-bold">14 new volunteers passed the 'Crisis Response Level 1' certification today. Audit their logs to finalize badges.</p>
            <button className="px-10 py-4 bg-[#1ea05f] text-white font-black rounded-2xl shadow-xl shadow-[#1ea05f]/20 hover:opacity-90 transition-all w-full md:w-auto">
               Review Certifications
            </button>
         </div>
      </section>

    </div>
  );
}

export default withAuth(AdminVolunteersPage, { 
  allowedRoles: [UserRole.ADMIN, UserRole.CONTENT_MANAGER, UserRole.VIEWER] 
});
