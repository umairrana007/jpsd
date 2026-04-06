'use client';

import React, { useState } from 'react';
import { 
  FiSearch, FiFilter, FiCalendar, FiMapPin, 
  FiZap, FiArrowRight, FiCheck, FiShare2,
  FiMaximize2, FiClock, FiUsers, FiTag,
  FiHeart, FiPlusCircle, FiCheckCircle
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { dispatchVolunteerAlert } from '@/lib/notificationUtils';
import { trackVolunteerDeployment } from '@/lib/analyticsUtils';

interface MissionEvent {
  id: string;
  title: string;
  category: string;
  location: string;
  date: string;
  time: string;
  slots: number;
  remaining: number;
  difficulty: 'Low' | 'Medium' | 'High';
  points: number;
  status: 'open' | 'registered' | 'closed';
}

export default function VolunteerEventsPage() {
  const [filter, setFilter] = useState('All');
  const [missions, setMissions] = useState<MissionEvent[]>([
    { id: '1', title: 'Food Distribution Drive', category: 'Food', location: 'Korangi, Sector 5', date: '12 Oct, 2025', time: '09:00 AM', slots: 50, remaining: 12, difficulty: 'Medium', points: 150, status: 'open' },
    { id: '2', title: 'Medical Aid Camp', category: 'Health', location: 'Tharparkar Hub', date: '15 Oct, 2025', time: '08:00 AM', slots: 20, remaining: 4, difficulty: 'High', points: 300, status: 'open' },
    { id: '3', title: 'Emergency Relief Setup', category: 'Emergency', location: 'Warehouse HQ', date: 'Today', time: '02:00 PM', slots: 10, remaining: 0, difficulty: 'High', points: 500, status: 'closed' },
    { id: '4', title: 'Education Material Kit', category: 'Education', location: 'Gulshan Office', date: '18 Oct, 2025', time: '11:00 AM', slots: 100, remaining: 85, difficulty: 'Low', points: 50, status: 'registered' },
  ]);

  const toggleRegister = async (id: string) => {
    const targetMission = missions.find(m => m.id === id);
    if (!targetMission) return;

    const isRegistering = targetMission.status !== 'registered';

    setMissions(missions.map(m => {
      if (m.id === id) {
        return { ...m, status: isRegistering ? 'registered' : 'open' };
      }
      return m;
    }));

    if (isRegistering) {
      // Tactical Comms Alert (BTCC)
      await dispatchVolunteerAlert(
        { phone: '+92 300 1234567' }, // Mock volunteer data
        targetMission
      );

      // Tactical Analytics Protocol (BTAT)
      trackVolunteerDeployment(targetMission.title, targetMission.points);
    }
  };

  return (
    <div className="space-y-10">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
           <h2 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase italic tracking-tighter">Tactical Mission Hub</h2>
           <p className="text-slate-500 font-medium italic">Synchronize with active humanitarian deployments across the region.</p>
        </div>
        <div className="flex gap-4 w-full lg:w-auto">
          <div className="relative group flex-1 lg:w-64">
             <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1ea05f] transition-colors" />
             <input type="text" placeholder="Search mission pointer..." className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-xs font-bold focus:ring-2 focus:ring-[#1ea05f]/20 outline-none transition-all" />
          </div>
          <button className="px-6 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2">
             <FiFilter /> Localize Feed
          </button>
        </div>
      </header>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 bg-white/50 backdrop-blur-md p-3 rounded-[2.5rem] border border-white shadow-sm w-fit">
         {['All', 'Emergency', 'Food', 'Health', 'Education', 'Clean Water'].map(cat => (
           <button 
             key={cat}
             onClick={() => setFilter(cat)}
             className={`px-5 py-2.5 rounded-[1.5rem] text-[9px] font-black uppercase tracking-widest transition-all ${filter === cat ? 'bg-[#1ea05f] text-white shadow-lg' : 'text-slate-400 hover:bg-white hover:text-slate-800'}`}
           >
             {cat}
           </button>
         ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
         {missions.map((mission) => (
           <motion.div 
             key={mission.id}
             layout
             className={`group bg-white rounded-[3.5rem] border border-slate-100 overflow-hidden hover:shadow-2xl transition-all relative ${mission.status === 'closed' ? 'opacity-60 grayscale' : 'hover:border-[#1ea05f]'}`}
           >
             <div className="p-10 space-y-8">
                <div className="flex justify-between items-start">
                   <div className={`p-3 rounded-2xl ${mission.category === 'Emergency' ? 'bg-red-500/10 text-red-500' : 'bg-[#1ea05f]/10 text-[#1ea05f]'} transition-all`}>
                      <FiZap size={24} />
                   </div>
                   <div className="text-right">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Genesis XP Potential</p>
                      <p className="text-xl font-black text-slate-800 italic">+{mission.points} Impact</p>
                   </div>
                </div>

                <div className="space-y-4">
                   <h3 className="text-2xl font-black italic uppercase italic tracking-tighter text-slate-800 leading-tight truncate">{mission.title}</h3>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                         <FiCalendar className="text-[#1ea05f]" /> {mission.date}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                         <FiClock className="text-[#1ea05f]" /> {mission.time}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest col-span-2">
                         <FiMapPin className="text-[#1ea05f]" /> {mission.location}
                      </div>
                   </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-slate-50">
                   <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                      <span className="text-slate-400 font-bold uppercase italic">Operational Capacity</span>
                      <span className="text-slate-800 font-bold italic tracking-tighter">{mission.remaining} / {mission.slots} Assets Remaining</span>
                   </div>
                   <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-900 rounded-full transition-all duration-1000" style={{ width: `${(mission.remaining/mission.slots)*100}%` }} />
                   </div>
                </div>

                <div className="flex gap-3">
                   {mission.status === 'closed' ? (
                     <div className="w-full py-5 bg-slate-100 text-slate-400 font-black rounded-3xl text-[10px] uppercase tracking-widest flex items-center justify-center italic">Protocol Terminated</div>
                   ) : mission.status === 'registered' ? (
                     <>
                        <button 
                          onClick={() => toggleRegister(mission.id)}
                          className="flex-[2] py-5 bg-[#1ea05f] text-white font-black rounded-3xl text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-[#1ea05f]/20 hover:bg-red-500 transition-all group"
                        >
                          <FiCheckCircle className="group-hover:hidden" />
                          <span className="group-hover:hidden">Deployed Successfully</span>
                          <span className="hidden group-hover:inline">Retract Assets?</span>
                        </button>
                        <button className="flex-1 bg-slate-900 text-white rounded-3xl flex items-center justify-center hover:bg-slate-800 transition-all">
                           <FiShare2 />
                        </button>
                     </>
                   ) : (
                     <>
                        <button 
                          onClick={() => toggleRegister(mission.id)}
                          className="flex-[2] py-5 bg-slate-900 text-white font-black rounded-3xl text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#1ea05f] transition-all group shadow-2xl"
                        >
                          <FiPlusCircle /> Initiate Deployment
                        </button>
                        <button className="flex-1 border border-slate-200 text-slate-400 rounded-3xl flex items-center justify-center hover:bg-white hover:text-slate-800 transition-all">
                           <FiShare2 />
                        </button>
                     </>
                   )}
                </div>
             </div>

             {/* QR Overlay Simulation (Only for registered) */}
             <AnimatePresence>
                {mission.status === 'registered' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 bg-[#1ea05f]/95 backdrop-blur-md p-10 flex flex-col items-center justify-center text-center text-white space-y-6 z-20"
                  >
                     <div className="w-40 h-40 bg-white p-4 rounded-3xl shadow-2xl">
                        <div className="w-full h-full bg-slate-900 opacity-10 flex flex-col items-center justify-center gap-1 border-4 border-slate-900">
                           <div className="w-full h-2 bg-slate-900" />
                           <div className="w-1/2 h-2 bg-slate-900 self-start" />
                           <div className="w-full h-2 bg-slate-900" />
                           <div className="w-3/4 h-2 bg-slate-900" />
                        </div>
                     </div>
                     <div>
                        <h4 className="text-xl font-black italic uppercase tracking-widest">Tactical Check-in</h4>
                        <p className="text-[10px] font-bold uppercase tracking-widest mt-1 opacity-80">Flash QR to HQ Coordinator upon arrival</p>
                     </div>
                     <button 
                       onClick={() => toggleRegister(mission.id)}
                       className="px-8 py-3 bg-white text-[#1ea05f] rounded-2xl text-[9px] font-black uppercase tracking-widest italic"
                     >Minimize Protocol</button>
                  </motion.div>
                )}
             </AnimatePresence>
           </motion.div>
         ))}
      </div>

      {/* Global Mission Map Info */}
      <div className="bg-slate-900 p-12 rounded-[4rem] text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-3xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-[#1ea05f]/10 rounded-full blur-[100px] -mr-32 -mt-32" />
         <div className="space-y-4 relative z-10 flex-1">
            <h3 className="text-2xl font-black italic uppercase italic tracking-tighter">Synchronize Operations</h3>
            <p className="text-sm font-medium text-slate-400 leading-relaxed max-w-xl">
               Integrated your field missions with your global humanitarian calendar. Receive SMS and Push notifications for tactical updates 2 hours before deployment.
            </p>
         </div>
         <div className="flex gap-4 relative z-10">
            <button className="px-10 py-5 bg-white text-slate-800 font-black rounded-3xl text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all">Add to iCal/Google</button>
            <button className="w-16 h-16 bg-[#1ea05f] text-white rounded-3xl flex items-center justify-center hover:scale-110 transition-all shadow-xl shadow-[#1ea05f]/20"><FiMaximize2 /></button>
         </div>
      </div>
    </div>
  );
}
