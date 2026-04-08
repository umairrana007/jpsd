'use client';

import React, { useState, useMemo } from 'react';
import { 
  FiUsers, FiUserCheck, FiClock, FiSearch, 
  FiFilter, FiEye, FiUserPlus, FiMoreHorizontal,
  FiMapPin, FiActivity, FiAward, FiRefreshCw,
  FiCheck, FiX, FiMoreVertical, FiTag, FiZap,
  FiAlertCircle
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { withAuth } from '@/components/admin/withAuth';
import { UserRole, Volunteer } from '@/types';
import { getVolunteers, updateVolunteer } from '@/lib/firebaseUtils';
import { format } from 'date-fns';

const SKILL_CATEGORIES = ['Medical', 'Logistics', 'Education', 'IT Support', 'Religious', 'Field Rescue'];
const REGIONS = ['karachi', 'sindh', 'northern', 'other'];

function AdminVolunteersPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'roster' | 'queue'>('roster');

  React.useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    setLoading(true);
    const data = await getVolunteers();
    if (!data || data.length === 0) {
      setVolunteers([
        { id: '1', name: 'Dr. Sarah Chen', email: 'sarah.c@medical.org', skills: ['Medical', 'Field Rescue'], status: 'approved' as any, hoursLogged: 142, address: { city: 'karachi', province: 'sindh' } } as any,
        { id: '2', name: 'Zohaib Khan', email: 'zohaib.k@logistics.pk', skills: ['Logistics', 'IT Support'], status: 'pending' as any, hoursLogged: 0, address: { city: 'hyderabad', province: 'sindh' } } as any,
        { id: '3', name: 'Elena Rodriguez', email: 'elena.r@edu.org', skills: ['Education'], status: 'approved' as any, hoursLogged: 86, address: { city: 'gilgit', province: 'northern' } } as any,
      ]);
    } else {
      setVolunteers(data);
    }
    setLoading(false);
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    await updateVolunteer(id, { status: newStatus as any });
    await fetchVolunteers();
  };

  const toggleSkillFilter = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  // FIX #3 A: Enhanced Filtering with Location/Sectoring
  const filteredVolunteers = useMemo(() => {
    return volunteers.filter(vol => {
      const matchesSearch = 
        (vol.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        vol.email?.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesStatus = 
        activeTab === 'queue' ? vol.status === 'pending' :
        (filterStatus === 'all' ? true : vol.status === filterStatus);

      const matchesLocation = 
        filterLocation === 'all' ? true : (vol.address?.city?.toLowerCase() === filterLocation || vol.address?.province?.toLowerCase() === filterLocation);

      const matchesSkills = 
        selectedSkills.length === 0 ? true :
        selectedSkills.some(s => vol.skills?.map(sk => sk.toLowerCase()).includes(s.toLowerCase()));

      return matchesSearch && matchesStatus && matchesLocation && matchesSkills;
    });
  }, [volunteers, searchQuery, filterStatus, filterLocation, selectedSkills, activeTab]);

  const stats = {
    total: volunteers.length,
    pending: volunteers.filter(v => v.status === 'pending').length,
    active: volunteers.filter(v => v.status === 'approved').length
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase">Personnel Intelligence</h2>
          <p className="text-slate-400 font-bold text-[11px] uppercase tracking-widest leading-none">Coordinate and authenticate your specialized volunteer force</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchVolunteers} className="p-3 bg-white text-[#1ea05f] rounded-2xl border border-slate-200 shadow-sm hover:rotate-180 transition-all duration-500">
            <FiRefreshCw size={20} className={loading ? 'animate-spin' : ''} />
          </button>
          <button className="flex items-center gap-2 px-6 py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl shadow-slate-900/20 hover:bg-[#1ea05f] transition-all uppercase text-[10px] tracking-widest">
            <FiUserPlus /> <span>Onboard Operator</span>
          </button>
        </div>
      </header>

      {/* KPI Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Force Depth', val: stats.total, sub: 'Global Registry', icon: <FiUsers size={24} />, text: 'text-[#1ea05f]', light: 'bg-[#1ea05f]/10' },
          { label: 'Pending Authentication', val: stats.pending, sub: 'Awaiting Credentials', icon: <FiAlertCircle size={24} />, text: 'text-amber-500', light: 'bg-amber-500/10' },
          { label: 'Deployment Ready', val: stats.active, sub: 'Active Duty Assets', icon: <FiZap size={24} />, text: 'text-blue-500', light: 'bg-blue-500/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col gap-8 group hover:shadow-xl transition-all h-full">
             <div className="flex justify-between items-start">
                <div className={`w-14 h-14 ${stat.light} ${stat.text} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm shadow-slate-50`}>
                   {stat.icon}
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">{stat.sub}</p>
                   <h3 className="text-4xl font-black text-slate-800 tracking-tighter">{stat.val}</h3>
                </div>
             </div>
             <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest pt-5 border-t border-slate-50 mt-auto">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-100 gap-10 overflow-x-auto">
        <button onClick={() => setActiveTab('roster')} className={`pb-4 text-[10px] font-black uppercase tracking-widest transition-all relative ${activeTab === 'roster' ? 'text-slate-900' : 'text-slate-400'}`}>
          Active Roster {activeTab === 'roster' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-[#1ea05f] rounded-full" />}
        </button>
        <button onClick={() => setActiveTab('queue')} className={`pb-4 text-[10px] font-black uppercase tracking-widest transition-all relative flex items-center gap-2 ${activeTab === 'queue' ? 'text-[#1ea05f]' : 'text-slate-400'}`}>
          Authentication Queue <span className="px-2 py-0.5 bg-amber-100 text-amber-600 rounded-lg text-[9px]">{stats.pending}</span>
          {activeTab === 'queue' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-[#1ea05f] rounded-full" />}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Capability Matrix Filtering</p>
          <div className="flex flex-wrap gap-2">
            {SKILL_CATEGORIES.map(skill => (
              <button key={skill} onClick={() => toggleSkillFilter(skill)} className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${selectedSkills.includes(skill) ? 'bg-[#1ea05f] text-white border-[#1ea05f] shadow-lg shadow-[#1ea05f]/20' : 'bg-white text-slate-500 border-slate-100'}`}>{skill}</button>
            ))}
          </div>
        </div>

        {/* FIX #3 A: Geographical Sector Filtering UI */}
        <div className="space-y-4">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Geographical Sectoring</p>
           <div className="flex flex-wrap gap-2">
              <button onClick={() => setFilterLocation('all')} className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${filterLocation === 'all' ? 'bg-slate-900 text-white' : 'bg-white text-slate-500 border-slate-100'}`}>Global HQ</button>
              {REGIONS.map(region => (
                <button key={region} onClick={() => setFilterLocation(region)} className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${filterLocation === region ? 'bg-[#1ea05f] text-white' : 'bg-white text-slate-500 border-slate-100'}`}>{region}</button>
              ))}
           </div>
        </div>
      </div>

      {/* Main Content Table */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden min-h-[400px]">
        <div className="p-10 border-b border-slate-50 flex flex-wrap items-center justify-between gap-6">
           <div className="flex-1 min-w-[300px] relative">
              <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search by name, email or intelligence hash..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-16 pr-6 py-5 bg-slate-50 border-none rounded-2xl text-[10px] font-black uppercase tracking-widest focus:ring-4 focus:ring-[#1ea05f]/5 outline-none" />
           </div>
           <div className="flex gap-4">
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="bg-slate-50 border-none text-[10px] font-black text-slate-800 uppercase tracking-widest rounded-2xl px-6 py-5 outline-none">
                <option value="all">Deployment Status (All)</option>
                <option value="approved">Active Assets</option>
                <option value="pending">Awaiting Sync</option>
                <option value="rejected">Decommissioned</option>
              </select>
           </div>
        </div>

        <div className="overflow-x-auto px-4 pb-4">
           <table className="w-full text-left">
              <thead>
                 <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <th className="px-8 py-6">Human Asset</th>
                    <th className="px-8 py-6">Operational Sector</th>
                    <th className="px-8 py-6">Mission Status</th>
                    <th className="px-8 py-6">Impact Score</th>
                    <th className="px-8 py-6 text-right">Directives</th>
                 </tr>
              </thead>
               <tbody className="divide-y divide-slate-50">
                  {loading ? (
                    <tr><td colSpan={5} className="py-24 text-center"><FiRefreshCw className="mx-auto mb-4 animate-spin text-[#1ea05f]" size={32} /></td></tr>
                  ) : filteredVolunteers.length > 0 ? (
                    filteredVolunteers.map((vol) => (
                    <tr key={vol.id} className="group hover:bg-slate-50/30 transition-all cursor-pointer">
                       <td className="px-8 py-7">
                          <div className="flex items-center gap-5">
                             <div className="w-14 h-14 rounded-2xl bg-slate-100 text-[#1ea05f] flex items-center justify-center font-black text-xl border border-slate-200 group-hover:bg-[#1ea05f] group-hover:text-white transition-all">{vol.name?.charAt(0) || 'V'}</div>
                             <div>
                                <p className="text-base font-black text-slate-800 tracking-tight italic uppercase">{vol.name}</p>
                                <p className="text-[9px] text-slate-400 font-bold uppercase">{vol.email}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-7">
                          <div className="flex items-center gap-2">
                             <FiMapPin className="text-[#1ea05f]" size={14} />
                             <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{vol.address?.city || vol.address?.province || 'Unknown Sector'}</span>
                          </div>
                       </td>
                       <td className="px-8 py-7">
                          <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                            vol.status === 'approved' ? 'bg-[#1ea05f]/5 text-[#1ea05f]' : 
                            vol.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${vol.status === 'approved' ? 'bg-[#1ea05f]' : vol.status === 'pending' ? 'bg-amber-500 animate-pulse' : 'bg-red-500'}`}></span>
                            {vol.status || 'Awaiting Review'}
                          </span>
                       </td>
                       <td className="px-8 py-7"><span className="text-sm font-black text-slate-800 italic">{vol.hoursLogged || 0} HR</span></td>
                       <td className="px-8 py-7 text-right">
                          <div className="flex justify-end gap-3">
                             {activeTab === 'queue' ? (
                               <><button onClick={() => handleStatusUpdate(vol.id!, 'approved')} className="px-4 py-2 bg-[#1ea05f] text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-[#1ea05f]/20">Authorize</button></>
                             ) : (
                               <button className="p-3 bg-slate-50 text-slate-400 hover:text-slate-800 transition-all rounded-xl border border-slate-100"><FiMoreHorizontal size={18} /></button>
                             )}
                          </div>
                       </td>
                    </tr>
                    ))
                  ) : (
                    <tr><td colSpan={5} className="py-24 text-center"><p className="text-sm font-black text-slate-300 uppercase italic">No operators identified in this frequency.</p></td></tr>
                  )}
               </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}

export default withAuth(AdminVolunteersPage, { allowedRoles: [UserRole.ADMIN, UserRole.CONTENT_MANAGER, UserRole.VIEWER] });
