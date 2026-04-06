'use client';

import React from 'react';
import { 
  FiBookOpen, FiPlayCircle, FiFileText, FiAward, 
  FiClock, FiTrendingUp, FiCheckCircle, FiLock,
  FiSearch, FiFilter, FiDownload, FiExternalLink
} from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function VolunteerTrainingPage() {
  const courses = [
    {
      title: 'Disaster Relief Protocol 1.0',
      desc: 'Essential tactical guidelines for field deployment during floods and earthquakes.',
      duration: '45 mins',
      level: 'Core',
      progress: 100,
      status: 'Completed',
      type: 'Tactical',
      icon: FiBookOpen
    },
    {
      title: 'First Aid & Tactical Medicine',
      desc: 'Emergency response, bleeding control, and patient stabilization in field conditions.',
      duration: '120 mins',
      level: 'Advanced',
      progress: 65,
      status: 'In-Progress',
      type: 'Medical',
      icon: FiPlus
    },
    {
      title: 'Logistics Hub OS Training',
      desc: 'Mastering the inventory and distribution software for Baitussalam warehouses.',
      duration: '30 mins',
      level: 'Specialist',
      progress: 0,
      status: 'Enrolled',
      type: 'Logistics',
      icon: FiBookOpen
    },
    {
      title: 'Baitussalam Code of Conduct',
      desc: 'Ethical standards and humanitarian principles for all global volunteers.',
      duration: '15 mins',
      level: 'Core',
      progress: 100,
      status: 'Completed',
      type: 'Policy',
      icon: FiFileText
    },
    {
      title: 'Crowd Control & Rapid Deployment',
      desc: 'Managing large-scale distribution events with safety and efficiency.',
      duration: '60 mins',
      level: 'Elite',
      progress: 15,
      status: 'In-Progress',
      type: 'Field Ops',
      icon: FiActivity
    },
    {
      title: 'Advanced Crisis Communication',
      desc: 'Reporting and coordinating with HQ during high-stress operational phases.',
      duration: '90 mins',
      level: 'Strategist',
      progress: 0,
      status: 'Locked',
      type: 'Comm Link',
      icon: FiLock
    }
  ];

  return (
    <div className="space-y-12">
      {/* Training Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 bg-white p-14 rounded-[4.5rem] border border-slate-200/50 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -mr-32 -mt-32" />
        <div className="relative z-10 space-y-6">
           <div className="flex items-center gap-3">
              <FiBookOpen className="text-blue-600" size={28} />
              <span className="text-xs font-black uppercase tracking-[0.4em] text-blue-600 italic">Academy Terminal</span>
           </div>
           <h2 className="text-5xl lg:text-6xl font-black italic uppercase leading-none tracking-tighter text-slate-950">Training Center</h2>
           <p className="text-slate-500 font-medium max-w-xl leading-relaxed text-base italic">
             Upgrade your tactical skillsets and unlock higher operation tiers through verified training modules and certifications.
           </p>
        </div>
        <div className="relative z-10 flex flex-col items-center gap-4 bg-slate-900 text-white p-8 rounded-[3.5rem] min-w-[240px] shadow-2xl">
           <div className="flex flex-col items-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#1ea05f] mb-2">Certification Rating</p>
              <h4 className="text-4xl font-black italic">A+</h4>
           </div>
           <div className="w-full border-t border-white/5 pt-4">
              <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">4 / 12 Modules Done</p>
           </div>
        </div>
      </header>

      {/* Modules Selector */}
      <div className="flex flex-col md:flex-row gap-6">
         <div className="flex-1 relative group">
            <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-all" />
            <input 
              type="text" 
              placeholder="Search academy modules, core protocols, or tactical guides..." 
              className="w-full bg-white border border-slate-200/50 rounded-3xl py-5 pl-14 pr-6 text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all"
            />
         </div>
         <div className="flex bg-white p-2 rounded-3xl border border-slate-200/50 shadow-sm">
            <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg">Active</button>
            <button className="text-slate-400 hover:text-slate-900 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Archive</button>
            <button className="text-slate-400 hover:text-slate-900 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all italic">Roadmap</button>
         </div>
      </div>

      {/* Training Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
         {courses.map((course, i) => (
           <div key={i} className={`group relative p-10 rounded-[4rem] border transition-all duration-500 overflow-hidden flex flex-col h-full ${course.status === 'Locked' ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-slate-200/50 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/5'}`}>
              <div className="flex justify-between items-start mb-8">
                 <div className={`w-16 h-16 rounded-3xl flex items-center justify-center ${course.status === 'Locked' ? 'bg-slate-200 text-slate-400' : 'bg-blue-50 text-blue-600 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500'} shadow-sm`}>
                    <course.icon size={28} />
                 </div>
                 <div className="flex flex-col items-end">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">{course.type}</span>
                    <span className={`text-[8px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-full ${course.level === 'Core' ? 'bg-slate-900 text-[#1ea05f]' : 'bg-[#1ea05f] text-white'}`}>{course.level} Tier</span>
                 </div>
              </div>

              <div className="space-y-4 flex-1">
                 <h4 className="text-2xl font-black italic uppercase tracking-tighter text-slate-950 leading-tight">{course.title}</h4>
                 <p className="text-xs font-semibold text-slate-500 leading-relaxed italic">{course.desc}</p>
              </div>

              <div className="mt-10 space-y-6">
                 <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-slate-400">{course.status === 'Locked' ? 'Prerequisite Required' : `Progress: ${course.progress}%`}</span>
                    <span className="text-slate-950 flex items-center gap-2"><FiClock /> {course.duration}</span>
                 </div>
                 <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/30">
                    <div 
                      className={`h-full transition-all duration-1000 ${course.progress === 100 ? 'bg-[#1ea05f]' : 'bg-blue-500'} rounded-full`}
                      style={{ width: `${course.progress}%` }}
                    />
                 </div>
                 <button 
                   disabled={course.status === 'Locked'}
                   className={`w-full py-5 rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all ${course.status === 'Completed' ? 'bg-[#1ea05f]/10 text-[#1ea05f] hover:bg-[#1ea05f] hover:text-white' : course.status === 'Locked' ? 'bg-slate-100 text-slate-300' : 'bg-slate-900 text-white hover:bg-blue-600 shadow-xl shadow-slate-900/10'}`}
                 >
                    {course.status === 'Completed' ? 'Review Module' : course.status === 'Locked' ? 'Module Encrypted' : 'Engagement Mode'}
                 </button>
              </div>
           </div>
         ))}
      </div>

      {/* Global Field Guide Section */}
      <section className="bg-slate-950 p-14 rounded-[5rem] text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[600px] h-full bg-blue-600/10 rounded-full blur-[120px] -mr-96" />
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="space-y-8">
               <div className="space-y-4">
                  <h3 className="text-3xl lg:text-4xl font-black italic uppercase italic tracking-tighter">Field Intelligence Logs</h3>
                  <p className="text-slate-400 font-medium leading-relaxed italic">
                    Download the latest operational blueprints and field intelligence updates translated by HQ for on-ground deployment.
                  </p>
               </div>
               <div className="space-y-4">
                  {[
                    { name: 'Standard distribution Logistics v4.2', size: '2.4 MB', ext: 'PDF' },
                    { name: 'Humanitarian Ethics in Crisis Zones', size: '1.8 MB', ext: 'PDF' },
                    { name: 'Tactical Radio Comms Guide', size: '840 KB', ext: 'MP3' },
                  ].map((doc, i) => (
                    <div key={i} className="flex justify-between items-center p-6 bg-white/5 border border-white/5 hover:bg-white/10 rounded-[2.5rem] transition-all cursor-pointer group">
                       <div className="flex items-center gap-5">
                          <div className="p-3 bg-white/5 rounded-2xl group-hover:text-blue-400 transition-all">
                             <FiFileText size={20} />
                          </div>
                          <div>
                             <h5 className="text-sm font-black italic uppercase tracking-widest">{doc.name}</h5>
                             <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{doc.ext} • {doc.size}</p>
                          </div>
                       </div>
                       <FiDownload className="text-slate-500 group-hover:text-white transition-all" size={18} />
                    </div>
                  ))}
               </div>
            </div>
            <div className="bg-blue-600/20 border border-blue-600/30 p-12 rounded-[4rem] flex flex-col items-center text-center space-y-8 relative group">
               <div className="w-24 h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform duration-500">
                  <FiPlayCircle size={48} />
               </div>
               <div>
                  <h4 className="text-2xl font-black italic uppercase">Engage Video Briefing</h4>
                  <p className="text-xs text-blue-200 opacity-60 font-medium mt-2 italic">A special message from Baitussalam Trustees for new recruits.</p>
               </div>
               <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
                  <FiTrendingUp className="animate-bounce" /> 158 Users Currently Watching
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}

function FiPlus(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function FiActivity(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    );
  }
