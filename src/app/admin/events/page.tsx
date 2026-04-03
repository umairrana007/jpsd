'use client';

import React, { useState } from 'react';
import { 
  FiPlus, FiSearch, FiFilter, FiEdit3, 
  FiTrash2, FiExternalLink, FiCalendar, FiMapPin,
  FiClock, FiUserCheck, FiGlobe, FiX, FiCheck
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';

const eventsData = [
  { id: 1, title: 'Annual Zakat Distribution', location: 'Karachi HQ', date: 'Oct 24, 2026', time: '09:00 AM', status: 'Upcoming', volunteers: 42 },
  { id: 2, title: 'Medical Camp - Thar', location: 'District Tharparkar', date: 'Nov 05, 2026', time: '08:00 AM', status: 'Draft', volunteers: 15 },
  { id: 3, title: 'Digital Skills Workshop', location: 'Virtual / Zoom', date: 'Oct 30, 2026', time: '02:00 PM', status: 'Active', volunteers: 8 },
];

export default function AdminEventsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    titleEn: '',
    titleUr: '',
    descEn: '',
    descUr: '',
    location: '',
    date: '',
    time: ''
  });
  const [translating, setTranslating] = useState<string | null>(null);

  const handleTranslate = async (field: 'title' | 'desc') => {
    setTranslating(field);
    // Mock translation logic
    setTimeout(() => {
      if (field === 'title') {
        setFormData(prev => ({ ...prev, titleUr: 'سالانہ زکوٰۃ کی تقسیم' }));
      } else {
        setFormData(prev => ({ ...prev, descUr: 'بیت السلام کے زیر اہتمام مستحقین میں زکوٰۃ کی تقسیم کا عمل۔' }));
      }
      setTranslating(null);
    }, 1500);
  };

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase">Event Logistics</h2>
          <p className="text-slate-500 font-medium tracking-tight">Coordinate on-ground distribution, medical camps and virtual sessions.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-8 py-4 bg-slate-950 text-white font-black rounded-2xl shadow-xl shadow-slate-900/20 hover:opacity-90 transition-all flex items-center gap-2 uppercase text-xs tracking-widest"
        >
          <FiPlus strokeWidth={3} /> Create Mission
        </button>
      </header>

      {/* Table Section */}
      <div className="bg-white/70 backdrop-blur-md rounded-[3rem] border border-white shadow-sm overflow-hidden">
         <div className="p-8 border-b border-slate-50 flex flex-wrap items-center justify-between gap-6">
            <div className="flex-1 min-w-[300px] relative group">
               <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1ea05f] transition-colors" />
               <input type="text" placeholder="Search mission archives..." className="w-full pl-16 pr-8 py-5 bg-slate-50/50 border border-transparent rounded-[2rem] text-sm font-bold focus:ring-4 focus:ring-[#1ea05f]/5 focus:bg-white focus:border-[#1ea05f]/20 transition-all outline-none" />
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                     <th className="px-10 py-6">Mission Identity</th>
                     <th className="px-10 py-6">Deployment Site</th>
                     <th className="px-10 py-6">Timeline</th>
                     <th className="px-10 py-6">Personnel</th>
                     <th className="px-10 py-6 text-right">Intervention</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50/50">
                  {eventsData.map((ev) => (
                    <tr key={ev.id} className="group hover:bg-slate-50/30 transition-all">
                       <td className="px-10 py-8">
                          <div>
                             <p className="text-base font-black text-slate-800 tracking-tightest italic">{ev.title}</p>
                             <span className={`mt-2 inline-block text-[8px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-lg ${
                                ev.status === 'Upcoming' ? 'bg-amber-100 text-amber-600' : 
                                ev.status === 'Active' ? 'bg-[#1ea05f]/10 text-[#1ea05f]' : 'bg-slate-100 text-slate-400'
                             }`}>{ev.status}</span>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                             <div className="p-2 bg-slate-50 rounded-lg text-[#1ea05f]"><FiMapPin /></div>
                             <span>{ev.location}</span>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <div className="space-y-2">
                             <div className="flex items-center gap-2 text-xs font-black text-slate-800 uppercase tracking-tighter italic">
                                <FiCalendar className="text-[#1ea05f]" /> {ev.date}
                             </div>
                             <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                                <FiClock size={10} /> {ev.time}
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <div className="flex -space-x-3">
                             {[1,2,3].map((u) => (
                               <div key={u} className="w-10 h-10 rounded-2xl border-4 border-white bg-slate-100 flex-shrink-0 shadow-sm"></div>
                             ))}
                             <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-[10px] font-black border-4 border-white shadow-md">+{ev.volunteers - 3}</div>
                          </div>
                       </td>
                       <td className="px-10 py-8 text-right">
                          <div className="flex justify-end gap-2 opacity-10 md:opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                             <button className="p-3 text-slate-400 hover:text-[#1ea05f] transition-all bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md"><FiEdit3 size={18} /></button>
                             <button className="p-3 text-slate-400 hover:text-red-500 transition-all bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md"><FiTrash2 size={18} /></button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
              onClick={() => setIsModalOpen(false)}
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-white/20"
            >
              <div className="p-10 space-y-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-black text-slate-800 italic uppercase">Initialize Mission</h3>
                    <p className="text-slate-500 font-medium tracking-tight">Deploy a new event to the global network.</p>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="p-3 bg-slate-50 text-slate-400 hover:text-slate-600 rounded-2xl transition-colors">
                    <FiX size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* English Section */}
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Title (English)</label>
                      <input 
                        type="text" 
                        value={formData.titleEn}
                        onChange={(e) => setFormData({...formData, titleEn: e.target.value})}
                        className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl text-sm font-bold focus:ring-4 focus:ring-[#1ea05f]/5 focus:bg-white focus:border-[#1ea05f]/20 transition-all outline-none"
                        placeholder="Zakat Camp 2026"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description (English)</label>
                      <textarea 
                        rows={4}
                        value={formData.descEn}
                        onChange={(e) => setFormData({...formData, descEn: e.target.value})}
                        className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl text-sm font-bold focus:ring-4 focus:ring-[#1ea05f]/5 focus:bg-white focus:border-[#1ea05f]/20 transition-all outline-none resize-none"
                        placeholder="Detailed mission scope..."
                      />
                    </div>
                  </div>

                  {/* Urdu Section */}
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between items-end mb-1 px-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Title (Urdu)</label>
                        <button 
                          onClick={() => handleTranslate('title')}
                          disabled={!formData.titleEn || translating === 'title'}
                          className="text-[9px] font-black text-[#1ea05f] uppercase tracking-widest flex items-center gap-1 hover:underline disabled:opacity-30"
                        >
                          {translating === 'title' ? 'Translating...' : <><FiGlobe /> Suggest Urdu</>}
                        </button>
                      </div>
                      <input 
                        dir="rtl"
                        type="text" 
                        value={formData.titleUr}
                        onChange={(e) => setFormData({...formData, titleUr: e.target.value})}
                        className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl text-sm font-bold focus:ring-4 focus:ring-[#1ea05f]/5 focus:bg-white focus:border-[#1ea05f]/20 transition-all outline-none urdu-font"
                        placeholder="عنوان یہاں لکھیں"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-end mb-1 px-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Description (Urdu)</label>
                        <button 
                          onClick={() => handleTranslate('desc')}
                          disabled={!formData.descEn || translating === 'desc'}
                          className="text-[9px] font-black text-[#1ea05f] uppercase tracking-widest flex items-center gap-1 hover:underline disabled:opacity-30"
                        >
                          {translating === 'desc' ? 'Translating...' : <><FiGlobe /> Suggest Urdu</>}
                        </button>
                      </div>
                      <textarea 
                        dir="rtl"
                        rows={4}
                        value={formData.descUr}
                        onChange={(e) => setFormData({...formData, descUr: e.target.value})}
                        className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl text-sm font-bold focus:ring-4 focus:ring-[#1ea05f]/5 focus:bg-white focus:border-[#1ea05f]/20 transition-all outline-none resize-none urdu-font"
                        placeholder="تفصیل یہاں لکھیں"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Deployment Site</label>
                    <input 
                      type="text" 
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl text-sm font-bold focus:ring-4 focus:ring-[#1ea05f]/5 focus:bg-white focus:border-[#1ea05f]/20 transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mission Date</label>
                    <input 
                      type="date" 
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl text-sm font-bold focus:ring-4 focus:ring-[#1ea05f]/5 focus:bg-white focus:border-[#1ea05f]/20 transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Launch Time</label>
                    <input 
                      type="time" 
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl text-sm font-bold focus:ring-4 focus:ring-[#1ea05f]/5 focus:bg-white focus:border-[#1ea05f]/20 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="pt-6 flex gap-4">
                  <button className="flex-1 py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl shadow-slate-900/20 hover:opacity-90 transition-all uppercase text-xs tracking-widest">
                    Confirm Deployment
                  </button>
                  <button onClick={() => setIsModalOpen(false)} className="px-10 py-4 bg-slate-50 text-slate-400 font-black rounded-2xl hover:bg-slate-100 transition-all uppercase text-xs tracking-widest">
                    Cancel
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
