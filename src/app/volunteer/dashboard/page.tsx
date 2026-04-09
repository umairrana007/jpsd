'use client';

import React, { useState, useMemo } from 'react';
import { 
  FiHome, FiCalendar, FiClock, FiAward, 
  FiMessageSquare, FiTrendingUp, FiActivity,
  FiZap, FiArrowRight, FiCheckCircle, FiInfo,
  FiDownload, FiExternalLink, FiSearch, FiFilter,
  FiStar, FiTarget, FiBox, FiShield, FiUser, FiBookOpen,
  FiPercent, FiMenu, FiGrid, FiList, FiAlertTriangle, 
  FiMapPin
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { generateVolunteerCertificate } from '@/lib/pdfUtils';

// Mock data for skill matching logic
const VOLUNTEER_SKILLS = ['medical', 'logistics', 'tech'];
const MISSIONS = [
  { id: 1, title: 'Ambulance Support', category: 'medical', difficulty: 'High', match: 95, status: 'Active' },
  { id: 2, title: 'Inventory Sync', category: 'tech', difficulty: 'Medium', match: 80, status: 'Active' },
  { id: 3, title: 'Field Teaching', category: 'teaching', difficulty: 'Low', match: 20, status: 'Draft' },
];

import { db } from '@/lib/firebase';
import { onSnapshot, collection, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';
import { updateDeploymentStatus } from '@/lib/firebaseUtils';
import { DeploymentData } from '@/types';

export default function VolunteerDashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'mission' | 'history'>('mission');
  const [availability, setAvailability] = useState<string[]>(['Mon-AM', 'Wed-PM', 'Sat-AM']);
  const [missions, setMissions] = useState<DeploymentData[]>([]);
  const [loading, setLoading] = useState(true);

  // Phase 9 Task #3: Real-Time Deployment Synchronization
  React.useEffect(() => {
    if (!user) return;

    setLoading(true);
    const deploymentsQuery = query(
      collection(db!, 'deployments'), 
      where('volunteerId', '==', user.uid),
      orderBy('updatedAt', 'desc')
    );

    const unsubscribe = onSnapshot(deploymentsQuery, (snapshot) => {
      const deploymentData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        checkInTime: (doc.data().checkInTime as Timestamp)?.toDate(),
        updatedAt: (doc.data().updatedAt as Timestamp)?.toDate(),
        createdAt: (doc.data().createdAt as Timestamp)?.toDate(),
      })) as DeploymentData[];
      setMissions(deploymentData);
      setLoading(false);
    }, (error) => {
       console.error('[Deployment Sync] Critical failure:', error);
       setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleCheckIn = async (deploymentId: string) => {
    // Stub GPS logic - in real apps, this would use navigator.geolocation
    const mockLocation = { lat: 24.8607, lng: 67.0011 }; 
    await updateDeploymentStatus(deploymentId, 'checked-in', {
      checkInTime: Timestamp.now(),
      location: mockLocation
    });
  };

  const handleComplete = async (deploymentId: string) => {
    await updateDeploymentStatus(deploymentId, 'completed', {
      checkOutTime: Timestamp.now(),
      reportSubmitted: true
    });
  };

  const toggleAvailability = (slot: string) => {
    setAvailability(prev => 
      prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot]
    );
  };

  const handleDownloadCertificate = () => {
    generateVolunteerCertificate({
      volunteerId: user?.uid?.slice(0, 8) || 'BGT-VOL-824',
      name: user?.displayName || 'Asad Ullah',
      hours: 148.5,
      skills: ['Logistics'],
      region: 'Karachi',
      joinedAt: new Date().toLocaleDateString()
    });
  };

  // Skill Match Score Calculation (Dummy Logic)
  const averageMatch = useMemo(() => {
    if (missions.length === 0) return 0;
    return Math.round(missions.reduce((acc, m) => acc + (m.matchScore || 0), 0) / missions.length);
  }, [missions]);

  // Tab Filtering
  const filteredMissions = useMemo(() => {
    if (activeTab === 'mission') {
      return missions.filter(m => m.status === 'assigned' || m.status === 'checked-in');
    }
    return missions.filter(m => m.status === 'completed' || m.status === 'verified');
  }, [missions, activeTab]);

  return (
    <div className="space-y-10 pb-20">
      {/* Tactical Status Hero */}
      <header className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="md:col-span-2 bg-slate-900 p-10 md:p-12 rounded-[4rem] text-white overflow-hidden relative shadow-2xl flex flex-col justify-center border border-white/5">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#1ea05f]/20 rounded-full blur-[120px] -mr-32 -mt-32 anim-pulse" />
            <div className="relative z-10 space-y-6">
               <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-4 border-slate-900 bg-slate-800 flex items-center justify-center">
                        <FiUser size={14} className="text-[#1ea05f]" />
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1ea05f] italic">Active Squadron Alpha</span>
               </div>
               <div className="space-y-1">
                  <h2 className="text-4xl lg:text-5xl font-black italic uppercase leading-none tracking-tighter">Mission Control</h2>
                  <p className="text-slate-400 font-medium max-w-sm leading-relaxed text-xs">
                    Real-time synchronization with JPSD field directives.
                  </p>
               </div>
               <div className="flex flex-wrap gap-4 pt-4">
                  <button className="px-8 py-4 bg-[#1ea05f] text-white font-black rounded-2xl shadow-xl shadow-[#1ea05f]/20 hover:scale-105 transition-all text-[10px] uppercase tracking-widest flex items-center gap-3">
                     Browse Active Missions <FiArrowRight />
                  </button>
                  <button className="px-8 py-4 bg-white/5 backdrop-blur-md text-white border border-white/10 font-black rounded-2xl hover:bg-white/10 transition-all text-[10px] uppercase tracking-widest">
                     Operational Manuals
                  </button>
               </div>
            </div>
         </div>

         <div className="bg-white p-12 rounded-[4rem] border border-slate-200/50 shadow-sm flex flex-col justify-between relative overflow-hidden group">
            <div className="relative z-10">
               <div className="flex justify-between items-start mb-6">
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Ranking</p>
                    <h4 className="text-2xl font-black text-slate-800 italic uppercase">Specialist</h4>
                 </div>
                 <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 border border-amber-100 italic font-black text-xl">L4</div>
               </div>
               
               <div className="space-y-6">
                  <div className="space-y-2">
                     <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                        <span className="text-slate-400">Deployment Logic</span>
                        <span className="text-[#1ea05f]">98% Complete</span>
                     </div>
                     <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '98%' }}
                          className="h-full bg-[#1ea05f] rounded-full"
                        />
                     </div>
                  </div>
                  <div className="flex items-center gap-4 pt-4 mt-4 border-t border-slate-50">
                    <div className="flex-1 text-center">
                      <p className="text-[10px] font-black text-slate-300">STRIKE</p>
                      <p className="text-lg font-black text-slate-800">12</p>
                    </div>
                    <div className="w-px h-8 bg-slate-100" />
                    <div className="flex-1 text-center">
                      <p className="text-[10px] font-black text-slate-300">XP</p>
                      <p className="text-lg font-black text-slate-800">4.2k</p>
                    </div>
                  </div>
               </div>
            </div>
         </div>
      </header>

      {/* Analytics & Interaction Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Mission Matrix */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Section: Operational Feed */}
          <section className="bg-white/50 backdrop-blur-xl p-10 md:p-14 rounded-[3.5rem] border border-white shadow-xl shadow-slate-200/50 space-y-10">
             <div className="flex justify-between items-end flex-wrap gap-6">
                <div>
                   <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-800">Tactical Feed</h3>
                   <p className="text-[10px] font-black text-slate-400 mt-1 uppercase italic tracking-[0.2em]">Live assignment stream synchronized with skill metadata</p>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-2xl">
                   <button onClick={() => setActiveTab('mission')} className={`px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'mission' ? 'bg-white text-slate-800 shadow-xl' : 'text-slate-400'}`}>Current</button>
                   <button onClick={() => setActiveTab('history')} className={`px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'history' ? 'bg-white text-slate-800 shadow-xl' : 'text-slate-400'}`}>Archived</button>
                </div>
             </div>

             <div className="space-y-6">
               {loading ? (
                 <div className="py-20 text-center space-y-4">
                    <div className="w-12 h-12 border-4 border-[#1ea05f] border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Synchronizing Field Data...</p>
                 </div>
               ) : (
                 filteredMissions.length > 0 ? (
                   filteredMissions.map((mission, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }} 
                        animate={{ opacity: 1, x: 0 }}
                        key={mission.id} 
                        className="group relative flex flex-col md:flex-row items-start md:items-center gap-8 p-10 bg-white rounded-[3rem] border border-slate-100 hover:border-[#1ea05f] hover:shadow-2xl hover:shadow-[#1ea05f]/5 transition-all cursor-pointer overflow-hidden"
                      >
                         <div className="absolute top-0 right-0 p-4">
                            <div className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${(mission.matchScore || 0) > 90 ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                               {mission.matchScore || 0}% Match
                            </div>
                         </div>
                         <div className={`w-20 h-20 rounded-[1.8rem] flex items-center justify-center shadow-inner transition-all group-hover:scale-105 ${mission.difficulty === 'High' ? 'bg-red-50 text-red-500' : 'bg-[#1ea05f]/5 text-[#1ea05f]'}`}>
                            <FiTarget size={30} />
                         </div>
                         <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3">
                               <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-slate-100 text-slate-500 rounded-lg">{mission.category || 'General'}</span>
                               <span className="text-[9px] font-black uppercase tracking-widest text-[#1ea05f]">{mission.difficulty || 'Normal'} PRIORITY</span>
                               <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${mission.status === 'checked-in' ? 'border-[#1ea05f] text-[#1ea05f]' : 'border-slate-200 text-slate-400'}`}>
                                 {mission.status}
                               </span>
                            </div>
                            <h4 className="text-2xl font-black italic uppercase tracking-tighter text-slate-800 group-hover:text-[#1ea05f] transition-colors">{mission.title || 'Untitled Mission'}</h4>
                            <div className="flex items-center gap-6 mt-2">
                              <div className="flex items-center gap-2 text-slate-400">
                                 <FiMapPin size={12} />
                                 <span className="text-[9px] font-bold uppercase tracking-widest">{mission.locationName || 'Field Site'}</span>
                              </div>
                              <div className="flex items-center gap-2 text-slate-400">
                                 <FiClock size={12} />
                                 <span className="text-[9px] font-bold uppercase tracking-widest">
                                   {mission.checkInTime ? `Checked in: ${mission.checkInTime.toLocaleTimeString()}` : 'Awaiting Deployment'}
                                 </span>
                              </div>
                            </div>
                         </div>
                         
                         {mission.status === 'assigned' && (
                           <button 
                             onClick={() => handleCheckIn(mission.id)}
                             className="w-full md:w-auto px-10 py-5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#1ea05f] transition-all group-hover:shadow-xl group-hover:shadow-[#1ea05f]/20"
                           >
                             Confirm Deployment
                           </button>
                         )}

                         {mission.status === 'checked-in' && (
                           <button 
                             onClick={() => handleComplete(mission.id)}
                             className="w-full md:w-auto px-10 py-5 bg-[#1ea05f] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-[#1ea05f]/20"
                           >
                             Submit Mission Logs
                           </button>
                         )}
                      </motion.div>
                   ))
                 ) : (
                   <div className="p-20 text-center border-4 border-dashed border-slate-100 rounded-[4rem]">
                      <FiInbox className="mx-auto text-slate-200 mb-4" size={48} />
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">No active field directives found</p>
                   </div>
                 )
               )}
             </div>
          </section>
               

          {/* Temporal Matrix: Availability Section */}
          <section className="bg-slate-900 p-12 rounded-[4rem] text-white space-y-10 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#1ea05f]/10 rounded-full blur-[100px] -mr-32 -mt-32" />
             <div className="relative z-10 flex justify-between items-start">
               <div>
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter">Availability Matrix</h3>
                  <p className="text-[10px] font-black text-slate-500 mt-1 uppercase tracking-widest">Toggle your active deployment windows</p>
               </div>
               <FiCalendar className="text-[#1ea05f]" size={24} />
             </div>

             <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4 relative z-10">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <div key={day} className="space-y-3">
                     <p className="text-center text-[9px] font-black text-slate-600 uppercase mb-4">{day}</p>
                     {['AM', 'PM'].map(shift => {
                        const slot = `${day}-${shift}`;
                        const isActive = availability.includes(slot);
                        return (
                          <button 
                            key={slot}
                            onClick={() => toggleAvailability(slot)}
                            className={`w-full py-5 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all ${isActive ? 'bg-[#1ea05f] text-white shadow-lg shadow-[#1ea05f]/20' : 'bg-white/5 text-slate-500 border border-white/5 hover:bg-white/10'}`}
                          >
                            {shift}
                          </button>
                        );
                     })}
                  </div>
                ))}
             </div>
             
             <div className="pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                   <div className="w-3 h-3 bg-[#1ea05f] rounded-full shadow-[0_0_10px_#1ea05f]" />
                   <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Status: On-Call</span>
                </div>
                <button className="text-[10px] font-black text-[#1ea05f] uppercase tracking-widest hover:underline">Commit Temporal State</button>
             </div>
          </section>
        </div>

        {/* Right Column: Statistics & Intelligence */}
        <div className="lg:col-span-4 space-y-10">
          
          {/* Skill Intelligence Gauge */}
          <section className="bg-white p-12 rounded-[4rem] border border-slate-200/50 shadow-sm space-y-10 relative overflow-hidden">
             <div className="text-center space-y-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Intelligence Score</p>
                <div className="relative inline-flex items-center justify-center">
                   <svg className="w-32 h-32 transform -rotate-90">
                      <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-50" />
                      <motion.circle 
                        initial={{ strokeDasharray: "0 360" }}
                        animate={{ strokeDasharray: `${(averageMatch * 3.64).toFixed(0)} 360` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" strokeLinecap="round" className="text-[#1ea05f]" 
                      />
                   </svg>
                   <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-black italic text-slate-800">{averageMatch}</span>
                      <span className="text-[8px] font-black text-slate-400 uppercase">Match Avg</span>
                   </div>
                </div>
                <h4 className="text-lg font-black italic uppercase tracking-tighter pt-4">Strategic Compatibility</h4>
             </div>

             <div className="space-y-4">
                {[
                  { label: 'Medical Protocol', val: 92 },
                  { label: 'Logistics Chain', val: 85 },
                  { label: 'Asset Management', val: 40 },
                ].map((s, i) => (
                  <div key={i} className="space-y-2">
                     <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-slate-500">
                        <span>{s.label}</span>
                        <span>{s.val}%</span>
                     </div>
                     <div className="w-full h-1 bg-slate-50 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${s.val}%` }}
                          className={`h-full rounded-full ${s.val > 70 ? 'bg-[#1ea05f]' : 'bg-slate-300'}`} 
                        />
                     </div>
                  </div>
                ))}
             </div>
          </section>

          {/* Impact Trend (Mini Chart) */}
          <section className="bg-white p-12 rounded-[4rem] border border-slate-200/50 shadow-sm space-y-8">
             <div>
                <h3 className="text-xl font-black italic uppercase tracking-widest text-slate-800">Impact Velocity</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Monthly contribution metrics</p>
             </div>
             
             <div className="h-24 flex items-end gap-2 pt-4">
                {[30, 45, 60, 40, 80, 100, 70, 90, 85].map((h, i) => (
                   <motion.div 
                     key={i}
                     initial={{ height: 0 }}
                     animate={{ height: `${h}%` }}
                     transition={{ delay: i * 0.1 }}
                     className={`flex-1 rounded-t-lg transition-all ${i === 5 ? 'bg-[#1ea05f]' : 'bg-slate-100 hover:bg-slate-200'}`}
                   />
                ))}
             </div>
             <div className="flex justify-between text-[8px] font-black text-slate-300 uppercase">
                <span>Jan</span>
                <span>Jun</span>
                <span>Sep</span>
             </div>
          </section>

          {/* Quick Action: Export */}
          <div className="p-8 bg-[#1ea05f]/5 rounded-[3rem] border border-[#1ea05f]/10 space-y-6">
             <div className="flex gap-4">
               <FiAward className="text-[#1ea05f] shrink-0" size={24} />
               <div>
                  <h4 className="text-sm font-black italic uppercase tracking-tighter">Verified Credentials</h4>
                  <p className="text-[9px] font-bold text-slate-500 uppercase leading-relaxed mt-1">Export your tactical performance log for external verification.</p>
               </div>
             </div>
             <button 
               onClick={handleDownloadCertificate}
               className="w-full py-4 bg-white border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:shadow-xl transition-all flex items-center justify-center gap-3 text-slate-800"
             >
                <FiDownload /> Deployment Portfolio (PDF)
             </button>
          </div>

        </div>
      </div>
    </div>
  );
}

function FiInbox(props: any) {
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
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  );
}
