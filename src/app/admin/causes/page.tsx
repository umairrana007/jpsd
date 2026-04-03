'use client';

import React, { useState } from 'react';
import { 
  FiPlus, FiSearch, FiFilter, FiEdit3, 
  FiTrash2, FiExternalLink, FiBarChart, FiCheckCircle,
  FiGlobe, FiX, FiCheck, FiDollarSign, FiUsers
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const causesData = [
  { id: 1, title: 'Clean Water Initiative', category: 'Water', raised: '$245,000', target: '$300,000', status: 'Active', donors: 1240 },
  { id: 2, title: 'Emergency Food Relief', category: 'Food', raised: '$89,200', target: '$100,000', status: 'Active', donors: 850 },
  { id: 3, title: 'Gaza Medical Support', category: 'Health', raised: '$1.2M', target: '$2.0M', status: 'Active', donors: 4500 },
  { id: 4, title: 'Winter Blanket Drive', category: 'Shelter', raised: '$15,000', target: '$15,000', status: 'Completed', donors: 320 },
];

export default function AdminCausesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    titleEn: '',
    titleUr: '',
    descEn: '',
    descUr: '',
    category: '',
    target: ''
  });
  const [translating, setTranslating] = useState<string | null>(null);

  const handleTranslate = async (field: 'title' | 'desc') => {
    setTranslating(field);
    setTimeout(() => {
      if (field === 'title') {
        setFormData(prev => ({ ...prev, titleUr: 'پینے کے صاف پانی کی فراہمی' }));
      } else {
        setFormData(prev => ({ ...prev, descUr: 'بیت السلام کے زیر اہتمام پینے کے صاف پانی کی فراہمی کا منصوبہ۔' }));
      }
      setTranslating(null);
    }, 1500);
  };

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase">Funding Missions</h2>
          <p className="text-slate-500 font-medium tracking-tight">Design and monitor global charity campaigns and high-impact fundraising.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-8 py-4 bg-slate-950 text-white font-black rounded-2xl shadow-xl shadow-slate-900/20 hover:opacity-90 transition-all flex items-center gap-2 uppercase text-xs tracking-widest"
        >
          <FiPlus strokeWidth={3} /> Launch Campaign
        </button>
      </header>

      {/* Table Section */}
      <div className="bg-white/70 backdrop-blur-md rounded-[3rem] border border-white shadow-sm overflow-hidden">
         <div className="p-8 border-b border-slate-50 flex flex-wrap items-center justify-between gap-6">
            <div className="flex-1 min-w-[300px] relative group">
               <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1ea05f] transition-colors" />
               <input type="text" placeholder="Search mission ledger..." className="w-full pl-16 pr-8 py-5 bg-slate-50/50 border border-transparent rounded-[2rem] text-sm font-bold focus:ring-4 focus:ring-[#1ea05f]/5 focus:bg-white focus:border-[#1ea05f]/20 transition-all outline-none" />
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                     <th className="px-10 py-6">Mission / Objective</th>
                     <th className="px-10 py-6">Classification</th>
                     <th className="px-10 py-6">Funding Trajectory</th>
                     <th className="px-10 py-6">Status</th>
                     <th className="px-10 py-6 text-right">Intervention</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50/50">
                  {causesData.map((cause) => (
                    <tr key={cause.id} className="group hover:bg-slate-50/30 transition-all">
                       <td className="px-10 py-8">
                          <div>
                             <p className="text-base font-black text-slate-800 tracking-tightest italic">{cause.title}</p>
                             <div className="flex items-center gap-2 mt-1">
                                <FiUsers size={12} className="text-slate-400" />
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">{cause.donors} Patrons active</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <span className="px-4 py-1.5 bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-[0.2em] rounded-lg border border-blue-100 shadow-sm">{cause.category}</span>
                       </td>
                       <td className="px-10 py-8">
                          <div className="space-y-3 max-w-[200px]">
                             <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-600 italic">
                                <span>{cause.raised}</span>
                                <span className="text-slate-300">/ {cause.target}</span>
                             </div>
                             <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/50">
                                <div className="h-full bg-gradient-to-r from-[#1ea05f] to-[#15804a] rounded-full shadow-[0_0_8px_#10b98150]" style={{ width: '70%' }}></div>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <div className="flex items-center gap-3">
                             <div className={`w-2 h-2 rounded-full ${cause.status === 'Active' ? 'bg-[#1ea05f] shadow-[0_0_10px_#10b981]' : 'bg-slate-300'}`}></div>
                             <span className={`text-[10px] font-black uppercase tracking-widest ${cause.status === 'Active' ? 'text-slate-800' : 'text-slate-400'}`}>{cause.status}</span>
                          </div>
                       </td>
                       <td className="px-10 py-8 text-right">
                          <div className="flex justify-end gap-2 opacity-10 md:opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                             <button className="p-3 text-slate-400 hover:text-[#1ea05f] transition-all bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md"><FiEdit3 size={18} /></button>
                             <button className="p-3 text-slate-400 hover:text-blue-500 transition-all bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md"><FiBarChart size={18} /></button>
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
                    <h3 className="text-2xl font-black text-slate-800 italic uppercase">Initialize Campaign</h3>
                    <p className="text-slate-500 font-medium tracking-tight">Construct a new fundraising objective for the network.</p>
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
                        placeholder="Clean Water Project"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Context (English)</label>
                      <textarea 
                        rows={4}
                        value={formData.descEn}
                        onChange={(e) => setFormData({...formData, descEn: e.target.value})}
                        className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl text-sm font-bold focus:ring-4 focus:ring-[#1ea05f]/5 focus:bg-white focus:border-[#1ea05f]/20 transition-all outline-none resize-none"
                        placeholder="Define mission parameters..."
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
                          {translating === 'title' ? 'Processing...' : <><FiGlobe /> Suggest Urdu</>}
                        </button>
                      </div>
                      <input 
                        dir="rtl"
                        type="text" 
                        value={formData.titleUr}
                        onChange={(e) => setFormData({...formData, titleUr: e.target.value})}
                        className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl text-sm font-bold focus:ring-4 focus:ring-[#1ea05f]/5 focus:bg-white focus:border-[#1ea05f]/20 transition-all outline-none urdu-font text-right"
                        placeholder="عنوان درج کریں"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-end mb-1 px-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Context (Urdu)</label>
                        <button 
                          onClick={() => handleTranslate('desc')}
                          disabled={!formData.descEn || translating === 'desc'}
                          className="text-[9px] font-black text-[#1ea05f] uppercase tracking-widest flex items-center gap-1 hover:underline disabled:opacity-30"
                        >
                          {translating === 'desc' ? 'Processing...' : <><FiGlobe /> Suggest Urdu</>}
                        </button>
                      </div>
                      <textarea 
                        dir="rtl"
                        rows={4}
                        value={formData.descUr}
                        onChange={(e) => setFormData({...formData, descUr: e.target.value})}
                        className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl text-sm font-bold focus:ring-4 focus:ring-[#1ea05f]/5 focus:bg-white focus:border-[#1ea05f]/20 transition-all outline-none resize-none urdu-font text-right"
                        placeholder="تفصیل درج کریں"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mission Classification</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl text-sm font-bold focus:ring-4 focus:ring-[#1ea05f]/5 focus:bg-white focus:border-[#1ea05f]/20 transition-all outline-none appearance-none"
                    >
                      <option value="">Select Category</option>
                      <option value="Water">Water Infrastructure</option>
                      <option value="Food">Emergency Nutrition</option>
                      <option value="Health">Medical Logistics</option>
                      <option value="Education">Human Capital</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Hard Funding Target (USD)</label>
                    <div className="relative">
                      <FiDollarSign className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="number" 
                        value={formData.target}
                        onChange={(e) => setFormData({...formData, target: e.target.value})}
                        className="w-full pl-12 pr-6 py-4 bg-slate-50 border-transparent rounded-2xl text-sm font-bold focus:ring-4 focus:ring-[#1ea05f]/5 focus:bg-white focus:border-[#1ea05f]/20 transition-all outline-none"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex gap-4">
                  <button className="flex-1 py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl shadow-slate-900/20 hover:opacity-90 transition-all uppercase text-xs tracking-widest">
                    Confirm Mission
                  </button>
                  <button onClick={() => setIsModalOpen(false)} className="px-10 py-4 bg-slate-50 text-slate-400 font-black rounded-2xl hover:bg-slate-100 transition-all uppercase text-xs tracking-widest">
                    Abort
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
