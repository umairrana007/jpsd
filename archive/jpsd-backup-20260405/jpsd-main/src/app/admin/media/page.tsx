'use client';

import React, { useState } from 'react';
import { 
  FiImage, FiUploadCloud, FiSearch, FiFilter, 
  FiGrid, FiList, FiTrash2, FiMoreVertical,
  FiEye, FiInfo, FiCopy, FiCheck, FiFolder,
  FiFileText, FiVideo, FiMaximize2, FiEdit3, FiSave
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'pdf' | 'doc';
  size: string;
  dimensions?: string;
  alt?: string;
  createdAt: string;
  folder?: string;
}

export default function MediaLibraryPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    { 
      id: '1', 
      name: 'Hero_Humanity_01.webp', 
      url: '/images/jpsd_main.jpg', 
      type: 'image', 
      size: '1.2 MB', 
      dimensions: '1920x1080', 
      alt: 'Children receiving education in rural areas',
      createdAt: '2 hours ago',
      folder: 'Website Assets'
    },
    { 
      id: '2', 
      name: 'Annual_Report_2025.pdf', 
      url: '#', 
      type: 'pdf', 
      size: '4.5 MB', 
      createdAt: '1 day ago',
      folder: 'Documents'
    },
    { 
      id: '3', 
      name: 'Zakat_Campaign_Video.mp4', 
      url: '#', 
      type: 'video', 
      size: '24 MB', 
      createdAt: '3 days ago',
      folder: 'Campaigns'
    },
    { 
      id: '4', 
      name: 'Volunteer_Manual.docx', 
      url: '#', 
      type: 'doc', 
      size: '800 KB', 
      createdAt: '1 week ago',
      folder: 'Internal'
    },
    { 
      id: '5', 
      name: 'Cataract_Camp_Photo_09.jpg', 
      url: '/images/jpsd_food.jpg', 
      type: 'image', 
      size: '2.1 MB', 
      dimensions: '2400x1600', 
      alt: 'Medical camp in Korangi',
      createdAt: '2 weeks ago',
      folder: 'Health'
    },
  ]);

  const handleUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsUploading(false), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="space-y-10 pb-20">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase">Foundation Media Vault</h2>
          <p className="text-slate-500 font-medium">Global repository for high-fidelity assets and digital heritage.</p>
        </div>
        <div className="flex gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-64 group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1ea05f] transition-colors" />
            <input 
              type="text" 
              placeholder="Search assets..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-[#1ea05f]/20 outline-none transition-all"
            />
          </div>
          <button 
            onClick={handleUpload}
            className="px-8 py-4 bg-[#1ea05f] text-white font-black rounded-2xl shadow-xl shadow-[#1ea05f]/20 hover:opacity-90 transition-all flex items-center gap-2"
          >
            <FiUploadCloud />
            <span className="hidden md:inline">Upload Asset</span>
          </button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/50 backdrop-blur-md p-4 rounded-3xl border border-white">
        <div className="flex gap-2">
          {['All Assets', 'Images', 'Videos', 'Documents'].map((tab) => (
            <button key={tab} className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              tab === 'All Assets' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-white hover:text-slate-800'
            }`}>
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
           <div className="flex bg-slate-100 p-1 rounded-xl">
              <button 
                onClick={() => setView('grid')}
                className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-white text-[#1ea05f] shadow-sm' : 'text-slate-400'}`}
              >
                <FiGrid size={18} />
              </button>
              <button 
                onClick={() => setView('list')}
                className={`p-2 rounded-lg transition-all ${view === 'list' ? 'bg-white text-[#1ea05f] shadow-sm' : 'text-slate-400'}`}
              >
                <FiList size={18} />
              </button>
           </div>
           <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:bg-white transition-all">
              <FiFilter /> Filter
           </button>
        </div>
      </div>

      {isUploading && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 p-8 rounded-[2.5rem] border border-white/10 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 h-1 bg-[#1ea05f] transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center animate-pulse">
                  <FiImage className="text-[#1ea05f]" />
               </div>
               <div>
                  <p className="text-sm font-black italic uppercase tracking-widest">Uploading & Optimizing...</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Auto WebP Conversion Triggered</p>
               </div>
            </div>
            <span className="text-xl font-black text-[#1ea05f] italic">{uploadProgress}%</span>
          </div>
        </motion.div>
      )}

      {view === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6">
          {mediaItems.map((item) => (
            <motion.div 
              key={item.id}
              layoutId={item.id}
              onClick={() => setSelectedItem(item)}
              className="group bg-white rounded-[2rem] border border-slate-100 overflow-hidden cursor-pointer hover:border-[#1ea05f] hover:shadow-2xl hover:shadow-[#1ea05f]/5 transition-all"
            >
              <div className="aspect-square bg-slate-50 relative overflow-hidden flex items-center justify-center">
                {item.type === 'image' ? (
                  <img src={item.url} alt={item.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                ) : item.type === 'pdf' ? (
                  <FiFileText size={48} className="text-red-400 opacity-50" />
                ) : item.type === 'video' ? (
                  <FiVideo size={48} className="text-blue-400 opacity-50" />
                ) : (
                  <FiFileText size={48} className="text-slate-400 opacity-50" />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                   <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-800 shadow-xl">
                      <FiMaximize2 />
                   </div>
                </div>
              </div>
              <div className="p-4 border-t border-slate-50">
                 <p className="text-[10px] font-black text-slate-800 uppercase tracking-widest truncate">{item.name}</p>
                 <div className="flex justify-between items-center mt-1">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{item.size}</span>
                    <span className="text-[9px] font-black text-[#1ea05f] uppercase tracking-tighter">{item.folder}</span>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
           <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  <th className="px-8 py-6">Asset Pointer</th>
                  <th className="px-8 py-6">Identity</th>
                  <th className="px-8 py-6">Category</th>
                  <th className="px-8 py-6">Scale</th>
                  <th className="px-8 py-6">Timeline</th>
                  <th className="px-8 py-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {mediaItems.map((item) => (
                  <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors cursor-pointer" onClick={() => setSelectedItem(item)}>
                     <td className="px-8 py-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex items-center justify-center text-slate-400 font-bold">
                           {item.type === 'image' ? <img src={item.url} className="w-full h-full object-cover" /> : item.type === 'pdf' ? 'PDF' : 'VID'}
                        </div>
                     </td>
                     <td className="px-8 py-4">
                        <p className="text-sm font-black text-slate-800 italic">{item.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.dimensions || 'Binary Stream'}</p>
                     </td>
                     <td className="px-8 py-4">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-lg">{item.folder}</span>
                     </td>
                     <td className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.size}</td>
                     <td className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.createdAt}</td>
                     <td className="px-8 py-4 text-right">
                        <button className="p-2 text-slate-400 hover:text-red-500 transition-colors"><FiTrash2 /></button>
                     </td>
                  </tr>
                ))}
              </tbody>
           </table>
        </div>
      )}

      {/* Asset Inspection Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
             <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
             />
             <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-6xl bg-white rounded-[4rem] overflow-hidden shadow-2xl relative z-10 flex flex-col lg:flex-row h-full max-h-[85vh]"
             >
                {/* Preview Area */}
                <div className="flex-[1.5] bg-slate-100 relative flex items-center justify-center overflow-hidden p-12">
                   {selectedItem.type === 'image' ? (
                     <img src={selectedItem.url} className="max-w-full max-h-full object-contain rounded-3xl shadow-3xl" />
                   ) : (
                     <div className="text-slate-300 flex flex-col items-center gap-4">
                        <FiFileText size={120} />
                        <span className="text-xl font-black italic uppercase tracking-[0.2em]">Asset Core</span>
                     </div>
                   )}
                   <button 
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-8 left-8 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-800 shadow-xl hover:scale-110 transition-all font-black"
                   >✕</button>
                </div>

                {/* Info & Metadata Panel */}
                <div className="flex-1 p-12 space-y-10 overflow-y-auto">
                   <div className="space-y-4">
                      <div className="flex items-center gap-3">
                         <FiInfo className="text-[#1ea05f]" size={20} />
                         <h3 className="text-2xl font-black italic uppercase tracking-tighter">Asset Intelligence</h3>
                      </div>
                      <div className="space-y-4 bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                         <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Genesis Name</p>
                            <p className="text-sm font-bold text-slate-800 break-all">{selectedItem.name}</p>
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Payload Size</p>
                               <p className="text-sm font-bold text-slate-800">{selectedItem.size}</p>
                            </div>
                            <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Canvas Scale</p>
                               <p className="text-sm font-bold text-slate-800">{selectedItem.dimensions || 'Fluid'}</p>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="space-y-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 flex justify-between">
                            <span>Accessibility Alt Text</span>
                            <span className="text-[#1ea05f]">SEO Optimized</span>
                         </label>
                         <div className="relative group">
                            <FiEdit3 className="absolute left-5 top-5 text-slate-400 group-focus-within:text-[#1ea05f] transition-colors" />
                            <textarea 
                              rows={3} 
                              defaultValue={selectedItem.alt}
                              className="w-full bg-slate-50 border-none rounded-3xl p-5 pl-14 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/20 transition-all outline-none"
                              placeholder="Describe this asset for accessibility engines..."
                            />
                         </div>
                      </div>

                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Path Directives (CDN URL)</label>
                         <div className="flex gap-2">
                            <input readOnly value={selectedItem.url} className="flex-1 bg-slate-50 border-none rounded-2xl px-6 py-4 text-xs font-bold text-slate-400 transition-all outline-none" />
                            <button className="w-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-slate-800 transition-all"><FiCopy /></button>
                         </div>
                      </div>
                   </div>

                   <div className="pt-6 border-t border-slate-100 flex gap-4">
                      <button className="flex-1 py-4 bg-[#1ea05f] text-white font-black rounded-2xl shadow-xl shadow-[#1ea05f]/20 hover:opacity-90 transition-all flex items-center justify-center gap-2">
                         <FiSave /> Verify Changes
                      </button>
                      <button className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/5">
                         <FiTrash2 size={24} />
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
