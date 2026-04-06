'use client';

import React, { useState } from 'react';
import { 
  FiUsers, FiUserCheck, FiClock, FiSearch, 
  FiFilter, FiEye, FiUserPlus, FiMoreHorizontal,
  FiMapPin, FiActivity, FiAward
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { withAuth } from '@/components/admin/withAuth';
import { UserRole } from '@/types';

const volunteersData = [
  { id: 1, name: 'Sarah Chen', email: 'sarah.c@example.org', skills: ['Medical', 'Spanish'], status: 'Verified', hours: '142h', image: 'S' },
  { id: 2, name: 'Marcus Wright', email: 'm.wright@domain.com', skills: ['Logistics', 'Driver'], status: 'On Duty', hours: '86h', image: 'M' },
  { id: 3, name: 'Elena Rodriguez', email: 'elena.r@charity.org', skills: ['Education'], status: 'Pending', hours: '0h', image: 'E' },
  { id: 4, name: 'Zohaib Khan', email: 'zohaib.k@jpsd.org.pk', skills: ['IT Support', 'Urdu'], status: 'Verified', hours: '210h', image: 'Z' },
];

function AdminVolunteersPage() {
  const [selectedVolunteer, setSelectedVolunteer] = useState<any>(null);

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase">Volunteer Force</h2>
          <p className="text-slate-500 font-medium">Coordinate, approve and assign tasks to your humanitarian team.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#1ea05f] text-white font-black rounded-2xl shadow-xl shadow-[#1ea05f]/20 hover:opacity-90 transition-all">
          <FiUserPlus />
          <span>Onboard Volunteer</span>
        </button>
      </header>

      {/* KPI Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Active Force', val: '12,842', trend: '+14%', icon: <FiUsers size={24} />, color: 'bg-[#1ea05f]', light: 'bg-[#1ea05f]/10', text: 'text-[#1ea05f]' },
          { label: 'Pending Onboarding', val: '184', sub: 'Immediate Attention Needed', icon: <FiClock size={24} />, color: 'bg-amber-500', light: 'bg-amber-500/10', text: 'text-amber-500' },
          { label: 'Field Deployments', val: '2,410', sub: 'Active mission in 42 zones', icon: <FiActivity size={24} />, color: 'bg-blue-500', light: 'bg-blue-500/10', text: 'text-blue-500' },
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
              <input type="text" placeholder="Search by name, skills or email..." className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-[#1ea05f]/20" />
           </div>
           <div className="flex gap-4">
              <button className="px-6 py-3 bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-slate-100 transition-all flex items-center gap-2">
                 <FiFilter /> Filter
              </button>
              <select className="bg-transparent border-none text-[10px] font-black text-slate-800 uppercase tracking-widest focus:ring-0 cursor-pointer">
                 <option>Recently Added</option>
                 <option>Highest Impact</option>
                 <option>Skill Match</option>
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
                 {volunteersData.map((vol) => (
                   <tr key={vol.id} className="group hover:bg-slate-50/50 transition-all cursor-pointer" onClick={() => setSelectedVolunteer(vol)}>
                      <td className="px-8 py-6">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1ea05f] to-[#15804a] text-white flex items-center justify-center font-black text-xl shadow-lg shadow-[#1ea05f]/20">
                               {vol.image}
                            </div>
                            <div>
                               <p className="text-base font-black text-slate-800 tracking-tight">{vol.name}</p>
                               <p className="text-[10px] text-slate-400 font-bold tracking-widest">{vol.email}</p>
                            </div>
                         </div>
                      </td>
                      <td className="px-8 py-6">
                         <div className="flex flex-wrap gap-1.5">
                            {vol.skills.map((skill, i) => (
                              <span key={i} className="px-3 py-1 bg-slate-100 text-slate-600 text-[9px] font-black uppercase rounded-lg tracking-tighter">
                                {skill}
                              </span>
                            ))}
                         </div>
                      </td>
                      <td className="px-8 py-6">
                         <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                           vol.status === 'Verified' ? 'bg-[#1ea05f]/10 text-[#1ea05f]' : 
                           vol.status === 'On Duty' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                         }`}>
                           <span className={`w-1.5 h-1.5 rounded-full ${vol.status === 'Verified' ? 'bg-[#1ea05f]' : vol.status === 'On Duty' ? 'bg-blue-500 animate-pulse' : 'bg-amber-500'}`}></span>
                           {vol.status}
                         </span>
                      </td>
                      <td className="px-8 py-6 font-black text-slate-800 text-sm">
                         {vol.hours}
                      </td>
                      <td className="px-8 py-6 text-right">
                         <div className="flex justify-end gap-2">
                            <button className="p-2 text-slate-400 hover:text-[#1ea05f] transition-all bg-slate-50 rounded-xl border border-slate-100">
                               <FiEye size={18} />
                            </button>
                            <button className="p-2 text-slate-400 hover:text-blue-500 transition-all bg-slate-50 rounded-xl border border-slate-100">
                               <FiActivity size={18} />
                            </button>
                         </div>
                      </td>
                   </tr>
                 ))}
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
