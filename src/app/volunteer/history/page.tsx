'use client';

import React from 'react';
import { 
  FiClock, FiCheckCircle, FiAlertCircle, FiDownload, 
  FiCalendar, FiMapPin, FiActivity, FiFilter, FiSearch, FiAward
} from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function VolunteerHistoryPage() {
  const historyItems = [
    { 
      id: 'OPS-2025-084',
      title: 'Emergency Flood Relief Distribution',
      date: 'Aug 24, 2025',
      location: 'Korangi, Sector 5',
      hours: 8.5,
      impact: '500+ Families Served',
      status: 'Verified',
      points: '+250 XP',
      category: 'Disaster Relief'
    },
    { 
      id: 'OPS-2025-072',
      title: 'Baitussalam Education Drive Prep',
      date: 'Jul 15, 2025',
      location: 'Main HQ Warehouse',
      hours: 4.0,
      impact: 'Logistics Ready',
      status: 'Verified',
      points: '+120 XP',
      category: 'Education'
    },
    { 
      id: 'OPS-2025-061',
      title: 'Free Medical Camp - Rural Sindh',
      date: 'Jun 30, 2025',
      location: 'Thatta District',
      hours: 12.0,
      impact: '200+ Patients Assisted',
      status: 'Verified',
      points: '+400 XP',
      category: 'Healthcare'
    },
    { 
      id: 'OPS-2025-045',
      title: 'Ramadan Ration Pack Loading',
      date: 'Mar 12, 2025',
      location: 'Logistics Hub A',
      hours: 6.5,
      impact: '1000 Packs Loaded',
      status: 'Verified',
      points: '+180 XP',
      category: 'Ramadan Ops'
    },
    { 
      id: 'OPS-2024-192',
      title: 'Volunteer Orientation Session',
      date: 'Dec 05, 2024',
      location: 'Baitussalam Digital Center',
      hours: 3.0,
      impact: 'Training Completed',
      status: 'Verified',
      points: '+50 XP',
      category: 'Training'
    }
  ];

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-white p-12 rounded-[4rem] border border-slate-200/50 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#1ea05f]/5 rounded-full blur-[80px] -mr-32 -mt-32" />
        <div className="relative z-10 space-y-4">
           <div className="flex items-center gap-3">
              <FiClock className="text-[#1ea05f]" size={24} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1ea05f] italic">Tactical Logs</span>
           </div>
           <h2 className="text-4xl lg:text-5xl font-black italic uppercase leading-none tracking-tighter text-slate-900">Operational History</h2>
           <p className="text-slate-500 font-medium max-w-lg leading-relaxed text-sm">
             Review your verified field deployments, logged hours, and total humanitarian impact.
           </p>
        </div>
        <div className="relative z-10 flex gap-4">
           <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all">
              <FiDownload size={16} /> Export Logs
           </button>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: 'Total Deployments', value: '42', icon: FiActivity, color: 'text-blue-500' },
           { label: 'Verified Hours', value: '148.5', icon: FiClock, color: 'text-amber-500' },
           { label: 'Humanitarian Points', value: '2.4K', icon: FiAward, color: 'text-[#1ea05f]' },
           { label: 'Active Status', value: 'Elite', icon: FiCheckCircle, color: 'text-purple-500' },
         ].map((stat, i) => (
           <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-200/50 shadow-sm flex flex-col items-center text-center space-y-2">
              <stat.icon size={24} className={stat.color} />
              <p className="text-2xl font-black italic uppercase text-slate-900">{stat.value}</p>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
           </div>
         ))}
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4">
         <div className="flex-1 relative group">
            <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1ea05f] transition-all" />
            <input 
              type="text" 
              placeholder="Search missions, locations, or dates..." 
              className="w-full bg-white border border-slate-200/50 rounded-2xl py-5 pl-14 pr-6 text-sm font-bold text-slate-800 focus:outline-none focus:border-[#1ea05f] focus:ring-4 focus:ring-[#1ea05f]/5 transition-all"
            />
         </div>
         <button className="px-8 py-5 bg-white border border-slate-200/50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 flex items-center gap-2 hover:bg-slate-50 transition-all">
            <FiFilter /> Filters
         </button>
      </div>

      {/* History Table/List */}
      <section className="bg-white rounded-[3.5rem] border border-slate-200/50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Mission Details</th>
                <th className="px-8 py-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Category</th>
                <th className="px-8 py-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Deployment Duration</th>
                <th className="px-8 py-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Impact Score</th>
                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {historyItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-all group cursor-pointer">
                  <td className="px-10 py-8">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-[#1ea05f] uppercase tracking-tighter mb-1">{item.id}</span>
                      <h4 className="text-base font-black italic uppercase text-slate-900 group-hover:text-[#1ea05f] transition-all">{item.title}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1 mt-1">
                        <FiMapPin size={12} /> {item.location}
                      </p>
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    <span className="px-3 py-1 bg-slate-100 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-600">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-8 py-8">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-slate-900">{item.hours} HRS</span>
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{item.date}</span>
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-blue-600 italic">{item.points}</span>
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{item.impact}</span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${item.status === 'Verified' ? 'bg-[#1ea05f]' : 'bg-amber-500'} animate-pulse`} />
                      <span className={`text-[10px] font-black uppercase tracking-widest ${item.status === 'Verified' ? 'text-[#1ea05f]' : 'text-amber-500'}`}>
                        {item.status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pagination Placeholder */}
      <div className="flex justify-center pt-4">
         <div className="flex gap-2">
            {[1, 2, 3, '...'].map((p, i) => (
              <button key={i} className={`w-10 h-10 rounded-xl flex items-center justify-center text-[10px] font-black transition-all ${p === 1 ? 'bg-slate-900 text-white shadow-lg shadow-black/20' : 'bg-white text-slate-400 hover:bg-slate-50 border border-slate-200/50'}`}>
                {p}
              </button>
            ))}
         </div>
      </div>
    </div>
  );
}
