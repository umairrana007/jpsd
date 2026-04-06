'use client';

import React, { useState, useEffect } from 'react';
import { 
  FiPlus, FiSearch, FiEdit2, FiTrash2, 
  FiBriefcase, FiLink, FiImage, FiCheck, FiX, FiRefreshCw,
  FiUploadCloud, FiExternalLink
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '@/lib/firebase';
import { 
  collection, getDocs, addDoc, updateDoc, 
  deleteDoc, doc, query, orderBy, serverTimestamp 
} from 'firebase/firestore';

interface Partner {
  id: string;
  name: string;
  logo: string;
  website?: string;
  category?: string;
  isPublished: boolean;
  order: number;
}

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPartner, setCurrentPartner] = useState<Partial<Partner> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const q = query(collection(db as any, 'partners'), orderBy('order', 'asc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Partner[];
      setPartners(data);
    } catch (error) {
      console.error('Error fetching partners:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPartner?.name || !currentPartner?.logo) return;

    setIsSaving(true);
    try {
      const partnerData = {
        ...currentPartner,
        order: Number(currentPartner.order || 0),
        isPublished: currentPartner.isPublished ?? true,
        updatedAt: serverTimestamp(),
      };

      if (currentPartner.id) {
        await updateDoc(doc(db as any, 'partners', currentPartner.id), partnerData);
      } else {
        await addDoc(collection(db as any, 'partners'), {
          ...partnerData,
          createdAt: serverTimestamp(),
        });
      }

      await fetchPartners();
      setIsModalOpen(false);
      setCurrentPartner(null);
    } catch (error) {
      console.error('Error saving partner:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Eject this alliance?')) return;
    try {
      await deleteDoc(doc(db as any, 'partners', id));
      await fetchPartners();
    } catch (error) {
      console.error('Error deleting partner:', error);
    }
  };

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase lg:text-4xl">Alliances & Partners</h2>
          <p className="text-slate-500 font-medium tracking-tight">Official corporate and non-profit global partnerships.</p>
        </div>
        <button 
          onClick={() => {
            setCurrentPartner({ order: partners.length, isPublished: true });
            setIsModalOpen(true);
          }}
          className="px-8 py-4 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white font-black rounded-3xl shadow-xl shadow-indigo-600/20 hover:opacity-90 transition-all flex items-center gap-2 uppercase tracking-widest text-xs"
        >
          <FiPlus /> New Alliance
        </button>
      </header>

      <section className="bg-white/70 backdrop-blur-md p-8 rounded-[3rem] border border-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <FiRefreshCw className="animate-spin text-indigo-600 text-4xl" />
          </div>
        ) : partners.length === 0 ? (
          <div className="text-center py-24 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
             <FiBriefcase className="mx-auto text-slate-300 mb-4" size={48} />
             <p className="text-slate-400 font-bold uppercase tracking-widest italic text-sm">No strategic partners registered. Broaden the mission!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {partners.map((partner) => (
              <motion.div 
                layout
                key={partner.id}
                className={`bg-white border rounded-[2.5rem] p-6 space-y-4 transition-all hover:shadow-2xl hover:shadow-slate-200/50 group text-center ${partner.isPublished ? 'border-slate-100' : 'border-slate-200 bg-slate-50/50 opacity-50'}`}
              >
                 <div className="w-20 h-20 mx-auto rounded-2xl bg-slate-50 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden text-3xl">
                    {partner.logo.length < 5 ? partner.logo : <img src={partner.logo} className="w-full h-full object-contain p-2" alt="" />}
                 </div>
                 
                 <div>
                    <h4 className="font-black text-slate-800 text-sm tracking-tight uppercase truncate">{partner.name}</h4>
                    <p className="text-[9px] font-bold text-indigo-600 uppercase tracking-widest mt-1 opacity-70 italic">{partner.category || 'Strategic Partner'}</p>
                 </div>

                 <div className="flex items-center justify-center gap-2">
                    <button 
                      onClick={() => {
                        setCurrentPartner(partner);
                        setIsModalOpen(true);
                      }}
                      className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                    >
                      <FiEdit2 size={14} />
                    </button>
                    <button 
                      onClick={() => handleDelete(partner.id)}
                      className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-red-50 hover:text-red-500 transition-all"
                    >
                      <FiTrash2 size={14} />
                    </button>
                    {partner.website && (
                      <a href={partner.website} target="_blank" className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-blue-50 hover:text-blue-500 transition-all">
                        <FiExternalLink size={14} />
                      </a>
                    )}
                 </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Partner Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                <div>
                   <h3 className="text-xl font-black text-slate-800 italic uppercase">Alliance Protocol</h3>
                   <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest underline decoration-indigo-600 mt-1">Operational Integration Framework</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-3 bg-white rounded-xl shadow-sm text-slate-400 hover:text-slate-800 transition-all"><FiX /></button>
              </div>

              <form onSubmit={handleSave} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Entity Name</label>
                  <input 
                    required
                    type="text" 
                    value={currentPartner?.name || ''}
                    onChange={e => setCurrentPartner({...currentPartner, name: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all"
                    placeholder="Enter partner name..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Logo Node (Emoji or URL)</label>
                    <input 
                      required
                      type="text" 
                      value={currentPartner?.logo || ''}
                      onChange={e => setCurrentPartner({...currentPartner, logo: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all"
                      placeholder="🏢 or https://..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Display Order</label>
                    <input 
                      type="number" 
                      value={currentPartner?.order || 0}
                      onChange={e => setCurrentPartner({...currentPartner, order: Number(e.target.value)})}
                      className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Transmission Link (URL)</label>
                  <input 
                    type="text" 
                    value={currentPartner?.website || ''}
                    onChange={e => setCurrentPartner({...currentPartner, website: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all italic"
                    placeholder="https://..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Entity Category</label>
                  <input 
                    type="text" 
                    value={currentPartner?.category || ''}
                    onChange={e => setCurrentPartner({...currentPartner, category: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all"
                    placeholder="e.g. NGO, Corporate, Relief Agency"
                  />
                </div>

                <div className="pt-6 border-t border-slate-50 flex justify-between items-center">
                   <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={currentPartner?.isPublished} 
                        onChange={e => setCurrentPartner({...currentPartner, isPublished: e.target.checked})}
                        className="w-6 h-6 rounded-lg text-indigo-600 border-slate-200 focus:ring-indigo-600/20"
                      />
                      <span className="text-[10px] font-black uppercase text-slate-400 group-hover:text-slate-800 transition-all">Visible in Portal</span>
                   </label>
                   <button 
                     disabled={isSaving}
                     className="px-10 py-4 bg-indigo-900 text-white font-black rounded-3xl shadow-xl hover:bg-slate-800 transition-all flex items-center gap-3 uppercase tracking-widest text-[10px]"
                   >
                     {isSaving ? <FiRefreshCw className="animate-spin" /> : <FiCheck />}
                     {isSaving ? 'Synchronizing...' : 'Authorize Integration'}
                   </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
