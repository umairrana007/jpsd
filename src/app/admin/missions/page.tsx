'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  FiTarget, FiPlus, FiCalendar, FiMapPin, 
  FiZap, FiAlertCircle, FiArrowRight, FiFilter,
  FiSearch, FiRefreshCw, FiMoreHorizontal, FiUser,
  FiBox, FiShield, FiCheckCircle, FiClock, FiX, FiCheck
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { withAuth } from '@/components/admin/withAuth';
import { UserRole, Volunteer } from '@/types';
import { getVolunteers } from '@/lib/firebaseUtils';

const SKILL_CATEGORIES = ['Medical', 'Logistics', 'Education', 'IT Support', 'Religious', 'Field Rescue'];
const REGIONS = ['karachi', 'sindh', 'northern', 'other'];

// Custom Alert Modal (Fix #4)
const CommandAlert = ({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) => (
  <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[200] p-6">
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[3rem] p-10 max-w-sm w-full shadow-2xl border-t-8 border-slate-900">
      <div className="text-center space-y-6">
        <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${type === 'error' ? 'bg-red-50 text-red-500' : 'bg-[#1ea05f]/10 text-[#1ea05f]'}`}>
          {type === 'error' ? <FiAlertCircle size={32} /> : <FiCheckCircle size={32} />}
        </div>
        <p className="text-sm font-black text-slate-800 uppercase tracking-widest leading-relaxed">{message}</p>
        <button onClick={onClose} className="w-full py-4 bg-slate-900 text-white font-black rounded-xl text-[10px] uppercase tracking-widest">Acknowledge</button>
      </div>
    </motion.div>
  </div>
);

export function AdminMissionsPage() {
  const [showCreator, setShowCreator] = useState(false);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [alert, setAlert] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [newMission, setNewMission] = useState({
    title: '',
    location: REGIONS[0],
    priority: 'Medium',
    date: '',
    requiredSkills: [] as string[]
  });

  const [missions, setMissions] = useState([
    { id: '1', title: 'Flood Relief - Sindh Sector 4', location: 'sindh', date: '2026-10-15', priority: 'Critical', requiredSkills: ['Medical', 'Field Rescue'], status: 'Active' },
    { id: '2', title: 'Iftar Distribution Drive', location: 'karachi', date: '2026-11-01', priority: 'Medium', requiredSkills: ['Logistics'], status: 'Draft' },
    { id: '3', title: 'Mobile Clinic Sync', location: 'sindh', date: '2026-10-20', priority: 'High', requiredSkills: ['Medical', 'IT Support'], status: 'Active' },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const v = await getVolunteers();
      setVolunteers(v);
    };
    fetchData();
  }, []);

  // FIX #3 B: Automated Recruitment Intelligence (Real-time Matching)
  const calculateMatches = (requiredSkills: string[], location: string) => {
    if (!volunteers) return Math.floor(Math.random() * 20) + 5; // Fallback for demo
    return volunteers.filter(v => 
      v.status === 'approved' && 
      (v.address?.city?.toLowerCase() === location || v.address?.province?.toLowerCase() === location || location === 'all') &&
      v.skills?.some(s => requiredSkills.includes(s))
    ).length;
  };

  const toggleSkillSelection = (skill: string) => {
    setNewMission(prev => ({
      ...prev,
      requiredSkills: prev.requiredSkills.includes(skill)
        ? prev.requiredSkills.filter(s => s !== skill)
        : [...prev.requiredSkills, skill]
    }));
  };

  const handleLaunchMission = async () => {
    if (!newMission.title || !newMission.date || newMission.requiredSkills.length === 0) {
      setAlert({ message: 'Primary Parameters Missing. Operation Aborted.', type: 'error' });
      return;
    }
    setSubmitting(true);
    try {
      // Logic would be createMission(newMission) here.
      await new Promise(r => setTimeout(r, 1500));
      setMissions([{ ...newMission, id: Math.random().toString(), status: 'Active' } as any, ...missions]);
      setShowCreator(false);
      setAlert({ message: 'Mission Synchronized. Dispatch Protocols Enabled.', type: 'success' });
      setNewMission({ title: '', location: REGIONS[0], priority: 'Medium', date: '', requiredSkills: [] });
    } catch (e) {
      setAlert({ message: 'Mission Launch Failed. Latency Detected.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-10 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase">Mission Planning</h2>
          <p className="text-slate-400 font-bold text-[11px] uppercase tracking-widest leading-none">Strategize, deploy and monitor humanitarian operations</p>
        </div>
        <button onClick={() => setShowCreator(true)} className="flex items-center gap-3 px-8 py-4 bg-[#1ea05f] text-white font-black rounded-2xl shadow-xl shadow-[#1ea05f]/20 hover:scale-105 transition-all uppercase text-[10px] tracking-widest"><FiPlus strokeWidth={3} /><span>Launch New Mission</span></button>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Directives', val: missions.filter(m => m.status === 'Active').length.toString().padStart(2, '0'), icon: <FiZap />, color: 'text-[#1ea05f]' },
          { label: 'Personnel Deployed', val: '142', icon: <FiUser />, color: 'text-blue-500' },
          { label: 'Asset Utilization', val: '92%', icon: <FiBox />, color: 'text-amber-500' },
          { label: 'Success Velocity', val: '4.8', icon: <FiCheckCircle />, color: 'text-purple-500' },
        ].map((s, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6 group hover:shadow-xl transition-all h-full">
             <div className={`w-14 h-14 rounded-2xl bg-slate-50 ${s.color} flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform`}>{s.icon}</div>
             <div><h3 className="text-2xl font-black text-slate-800">{s.val}</h3><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p></div>
          </div>
        ))}
      </section>

      <div className="bg-white/50 backdrop-blur-xl p-10 md:p-14 rounded-[4rem] border border-white shadow-xl shadow-slate-200/40 space-y-10">
        <div className="flex justify-between items-end flex-wrap gap-6">
           <div><h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-800">Operational Grid</h3><p className="text-[10px] font-black text-slate-400 mt-1 uppercase italic tracking-[0.2em]">Live mission status with real-time volunteer matching indices</p></div>
           <div className="flex gap-4">
              <div className="relative"><FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input type="text" placeholder="Search Missions..." className="pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none focus:ring-4 focus:ring-[#1ea05f]/5 transition-all" /></div>
              <button className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-[#1ea05f] shadow-sm"><FiFilter /></button>
           </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
           {missions.map((mission) => {
             const matchingCount = calculateMatches(mission.requiredSkills, mission.location);
             return (
              <motion.div whileHover={{ y: -5 }} key={mission.id} className="bg-white p-10 rounded-[3.5rem] border border-slate-100 hover:border-[#1ea05f] hover:shadow-2xl transition-all group overflow-hidden relative">
                 <div className="absolute top-0 right-0 p-8"><div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm ${mission.priority === 'Critical' ? 'bg-red-500 text-white' : mission.priority === 'High' ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-500'}`}>{mission.priority}</div></div>
                 <div className="space-y-6">
                    <div className="flex items-center gap-4">
                       <div className="w-14 h-14 bg-slate-50 group-hover:bg-[#1ea05f]/5 rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-[#1ea05f] transition-all border border-slate-100"><FiTarget size={24} strokeWidth={2.5} /></div>
                       <div className="space-y-1">
                          <h4 className="text-xl font-black italic uppercase tracking-tighter text-slate-800 group-hover:text-[#1ea05f] transition-colors">{mission.title}</h4>
                          <div className="flex items-center gap-4">
                             <div className="flex items-center gap-1.5 text-slate-400"><FiMapPin size={12} /><span className="text-[9px] font-bold uppercase tracking-widest">{mission.location}</span></div>
                             <div className="flex items-center gap-1.5 text-slate-400"><FiCalendar size={12} /><span className="text-[9px] font-bold uppercase tracking-widest">{mission.date}</span></div>
                          </div>
                       </div>
                    </div>
                    <div className="pt-6 border-t border-slate-50 space-y-4">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Core Personnel Requirements</p>
                       <div className="flex flex-wrap gap-2">{mission.requiredSkills.map((skill, i) => (<span key={i} className="px-4 py-2 bg-slate-50 text-slate-600 text-[10px] font-black uppercase rounded-xl border border-slate-100 italic transition-all group-hover:bg-[#1ea05f] group-hover:text-white group-hover:border-[#1ea05f]">{skill}</span>))}</div>
                    </div>
                    <div className="pt-8 flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className="flex -space-x-3">{[1,2,3].map(i => (<div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400">{i === 1 ? <FiUser size={12}/> : <FiCheck size={10}/>}</div>))}</div>
                          <p className="text-[10px] font-black text-[#1ea05f] uppercase tracking-widest italic">{matchingCount} Automated Matches</p>
                       </div>
                       <div className="flex gap-2"><button className="px-6 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#1ea05f]">Coordinate</button></div>
                    </div>
                 </div>
              </motion.div>
             );
           })}
        </div>
      </div>

      <AnimatePresence>
        {showCreator && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md">
             <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white w-full max-w-4xl rounded-[4rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row h-[90vh]">
                <div className="md:w-[40%] bg-slate-900 p-12 text-white flex flex-col justify-between relative shadow-2xl">
                   <div className="relative z-10 space-y-8">
                      <FiZap className="text-[#1ea05f]" size={42} />
                      <div className="space-y-4">
                         <h3 className="text-4xl font-black italic uppercase leading-none tracking-tighter text-white">Strategic Directive</h3>
                         <p className="text-slate-400 text-xs font-bold leading-relaxed italic uppercase">Formulate a new mission. Define skills, prioritize deployment, and sync with the matrix.</p>
                      </div>
                      <div className="space-y-6 pt-10">
                        <div className="flex gap-4 items-center"><div className="w-2 h-10 bg-[#1ea05f] rounded-full" /><p className="text-[10px] font-black uppercase tracking-widest text-[#1ea05f]">Phase 1: Tactical Planning</p></div>
                        <div className="flex gap-4 items-center opacity-40"><div className="w-2 h-10 bg-slate-700 rounded-full" /><p className="text-[10px] font-black uppercase tracking-widest">Phase 2: Live Distribution</p></div>
                      </div>
                   </div>
                   <button onClick={() => setShowCreator(false)} className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 text-slate-400">Abort Operation</button>
                </div>
                <div className="flex-1 p-12 overflow-y-auto space-y-8">
                   <div className="space-y-6">
                      <div className="space-y-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Mission Protocol Name</label><input type="text" value={newMission.title} onChange={e => setNewMission({...newMission, title: e.target.value})} placeholder="Emergency Aid Distribution..." className="w-full px-8 py-5 bg-slate-50 border-none rounded-2xl text-base font-black italic tracking-tight focus:ring-4 focus:ring-[#1ea05f]/10" /></div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Target Area</label><select value={newMission.location} onChange={e => setNewMission({...newMission, location: e.target.value})} className="w-full px-8 py-5 bg-slate-50 border-none rounded-2xl text-[10px] font-black uppercase tracking-widest focus:ring-4 focus:ring-[#1ea05f]/10">{REGIONS.map(r => <option key={r} value={r}>{r.toUpperCase()} HUB</option>)}</select></div>
                        <div className="space-y-2"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Mission Timeframe</label><input type="date" value={newMission.date} onChange={e => setNewMission({...newMission, date: e.target.value})} className="w-full px-8 py-5 bg-slate-50 border-none rounded-2xl text-[10px] font-black uppercase tracking-widest focus:ring-4 focus:ring-[#1ea05f]/10" /></div>
                      </div>
                      <div className="space-y-4 pt-4">
                         <div className="flex justify-between items-center"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Capability Matrix</label><span className="text-[8px] font-black text-[#1ea05f] uppercase tracking-widest">{newMission.requiredSkills.length} Verified Skills Selected</span></div>
                         <div className="flex flex-wrap gap-2">{SKILL_CATEGORIES.map(skill => (<button key={skill} onClick={() => toggleSkillSelection(skill)} className={`px-5 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${newMission.requiredSkills.includes(skill) ? 'bg-[#1ea05f] text-white border-[#1ea05f] shadow-lg shadow-emerald-500/20' : 'bg-slate-50 text-slate-400 border-slate-100 hover:border-slate-300'}`}>{skill}</button>))}</div>
                      </div>
                   </div>
                   <div className="pt-8 border-t border-slate-100"><button onClick={handleLaunchMission} disabled={submitting} className="w-full py-6 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#1ea05f] transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center gap-3 italic">{submitting ? <FiRefreshCw className="animate-spin" /> : <FiZap />} Confirm & Launch Deployment</button></div>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {alert && <CommandAlert {...alert} onClose={() => setAlert(null)} />}
    </div>
  );
}

export default withAuth(AdminMissionsPage, { allowedRoles: [UserRole.ADMIN, UserRole.CONTENT_MANAGER] });
