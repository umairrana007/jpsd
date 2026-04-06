'use client';

import React, { useState, useEffect } from 'react';
import { 
  FiPlus, FiSearch, FiEdit2, FiTrash2, FiStar, 
  FiMessageSquare, FiUser, FiCheck, FiX, FiRefreshCw,
  FiGlobe, FiArrowRight, FiSmile
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '@/lib/firebase';
import { 
  collection, getDocs, addDoc, updateDoc, 
  deleteDoc, doc, query, orderBy, serverTimestamp 
} from 'firebase/firestore';

interface Testimonial {
  id: string;
  name: string;
  nameUrdu?: string;
  role: string;
  roleUrdu?: string;
  text: string;
  textUrdu?: string;
  rating: number;
  image?: string;
  isPublished: boolean;
  createdAt?: any;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<Partial<Testimonial> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const q = query(collection(db as any, 'testimonials'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Testimonial[];
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTestimonial?.name || !currentTestimonial?.text) return;

    setIsSaving(true);
    try {
      const testimonialData = {
        ...currentTestimonial,
        rating: Number(currentTestimonial.rating || 5),
        isPublished: currentTestimonial.isPublished ?? true,
        updatedAt: serverTimestamp(),
      };

      if (currentTestimonial.id) {
        const docRef = doc(db as any, 'testimonials', currentTestimonial.id);
        await updateDoc(docRef, testimonialData);
      } else {
        await addDoc(collection(db as any, 'testimonials'), {
          ...testimonialData,
          createdAt: serverTimestamp(),
        });
      }

      await fetchTestimonials();
      setIsModalOpen(false);
      setCurrentTestimonial(null);
    } catch (error) {
      console.error('Error saving testimonial:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      await deleteDoc(doc(db as any, id));
      await fetchTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
    }
  };

  const toggleStatus = async (testimonial: Testimonial) => {
    try {
      await updateDoc(doc(db as any, 'testimonials', testimonial.id), {
        isPublished: !testimonial.isPublished
      });
      await fetchTestimonials();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredTestimonials = testimonials.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase lg:text-4xl">Community Voices</h2>
          <p className="text-slate-500 font-medium tracking-tight">Manage success stories and testimonials from global stakeholders.</p>
        </div>
        <button 
          onClick={() => {
            setCurrentTestimonial({ rating: 5, isPublished: true });
            setIsModalOpen(true);
          }}
          className="px-8 py-4 bg-gradient-to-br from-[#1ea05f] to-[#15804a] text-white font-black rounded-3xl shadow-xl shadow-[#1ea05f]/20 hover:opacity-90 transition-all flex items-center gap-2 uppercase tracking-widest text-xs"
        >
          <FiPlus /> Add Success Story
        </button>
      </header>

      <section className="bg-white/70 backdrop-blur-md p-8 rounded-[3rem] border border-white shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
          <div className="relative w-full md:w-96">
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Filter voices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-700 focus:ring-2 focus:ring-[#1ea05f]/20 transition-all outline-none"
            />
          </div>
          <div className="flex items-center gap-4">
             <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
               Captured Stories: {testimonials.length}
             </span>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <FiRefreshCw className="animate-spin text-[#1ea05f] text-4xl" />
          </div>
        ) : filteredTestimonials.length === 0 ? (
          <div className="text-center py-24 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
             <FiSmile className="mx-auto text-slate-300 mb-4" size={48} />
             <p className="text-slate-400 font-bold uppercase tracking-widest italic">No mission voices identified. Add your first success story!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTestimonials.map((testimonial) => (
              <motion.div 
                layout
                key={testimonial.id}
                className={`bg-white border rounded-[2.5rem] p-8 space-y-6 transition-all hover:shadow-2xl hover:shadow-slate-200/50 group ${testimonial.isPublished ? 'border-slate-100' : 'border-slate-200 bg-slate-50/50 grayscale'}`}
              >
                 <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                       <div className="w-14 h-14 rounded-2xl bg-slate-100 overflow-hidden border-2 border-white shadow-sm">
                          {testimonial.image ? (
                             <img src={testimonial.image} className="w-full h-full object-cover" alt="" />
                          ) : (
                             <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-50"><FiUser size={24} /></div>
                          )}
                       </div>
                       <div>
                          <h4 className="font-black text-slate-800 text-lg tracking-tight uppercase italic">{testimonial.name}</h4>
                          <p className="text-[10px] font-bold text-[#1ea05f] uppercase tracking-widest opacity-70">{testimonial.role}</p>
                       </div>
                    </div>
                    <div className="flex gap-1 text-amber-500">
                       {[...Array(5)].map((_, i) => (
                          <FiStar key={i} size={10} fill={i < testimonial.rating ? "currentColor" : "none"} />
                       ))}
                    </div>
                 </div>

                 <div className="space-y-4">
                    <p className="text-slate-600 font-medium italic leading-relaxed line-clamp-3">"{testimonial.text}"</p>
                    {testimonial.textUrdu && (
                       <p className="text-slate-500 font-medium text-right urdu-font border-r-2 border-[#1ea05f]/20 pr-4 mt-2 line-clamp-2">{testimonial.textUrdu}</p>
                    )}
                 </div>

                 <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex gap-3">
                       <button 
                         onClick={() => {
                           setCurrentTestimonial(testimonial);
                           setIsModalOpen(true);
                         }}
                         className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-[#1ea05f]/10 hover:text-[#1ea05f] transition-all"
                       >
                         <FiEdit2 />
                       </button>
                       <button 
                         onClick={() => handleDelete(testimonial.id)}
                         className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all"
                       >
                         <FiTrash2 />
                       </button>
                    </div>
                    <button 
                      onClick={() => toggleStatus(testimonial)}
                      className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${
                         testimonial.isPublished 
                           ? 'bg-[#1ea05f]/10 text-[#1ea05f] border-[#1ea05f]/20' 
                           : 'bg-slate-200 text-slate-400 border-slate-300'
                      }`}
                    >
                      {testimonial.isPublished ? 'Public' : 'Stashed'}
                    </button>
                 </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Testimonial Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                <div>
                   <h3 className="text-2xl font-black text-slate-800 italic uppercase">Success Point Calibration</h3>
                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest underline decoration-[#1ea05f] underline-offset-4 mt-2">Operational Voice Verification</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-4 bg-white rounded-2xl shadow-sm text-slate-400 hover:text-slate-800 transition-all"><FiX /></button>
              </div>

              <form onSubmit={handleSave} className="p-10 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Hero / Name (English)</label>
                    <input 
                      required
                      type="text" 
                      value={currentTestimonial?.name || ''}
                      onChange={e => setCurrentTestimonial({...currentTestimonial, name: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-[#1ea05f]/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 text-right block">Hero Name (Urdu)</label>
                    <input 
                      dir="rtl"
                      type="text" 
                      value={currentTestimonial?.nameUrdu || ''}
                      onChange={e => setCurrentTestimonial({...currentTestimonial, nameUrdu: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-[#1ea05f]/20 transition-all urdu-font"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Role / Designation (English)</label>
                    <input 
                      required
                      type="text" 
                      value={currentTestimonial?.role || ''}
                      onChange={e => setCurrentTestimonial({...currentTestimonial, role: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-[#1ea05f]/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 text-right block">Role (Urdu)</label>
                    <input 
                      dir="rtl"
                      type="text" 
                      value={currentTestimonial?.roleUrdu || ''}
                      onChange={e => setCurrentTestimonial({...currentTestimonial, roleUrdu: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-[#1ea05f]/20 transition-all urdu-font"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Testimonial Narrative (English)</label>
                   <textarea 
                     required
                     rows={3}
                     value={currentTestimonial?.text || ''}
                     onChange={e => setCurrentTestimonial({...currentTestimonial, text: e.target.value})}
                     className="w-full px-6 py-4 bg-slate-50 border-none rounded-3xl font-medium text-slate-700 outline-none focus:ring-2 focus:ring-[#1ea05f]/20 transition-all italic"
                   />
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 text-right block">ناریکٹو (Urdu Narrative)</label>
                   <textarea 
                     dir="rtl"
                     rows={3}
                     value={currentTestimonial?.textUrdu || ''}
                     onChange={e => setCurrentTestimonial({...currentTestimonial, textUrdu: e.target.value})}
                     className="w-full px-6 py-4 bg-slate-50 border-none rounded-3xl font-medium text-slate-700 outline-none focus:ring-2 focus:ring-[#1ea05f]/20 transition-all urdu-font leading-relaxed"
                   />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Authenticity Rating (1-5)</label>
                    <select 
                      value={currentTestimonial?.rating || 5}
                      onChange={e => setCurrentTestimonial({...currentTestimonial, rating: Number(e.target.value)})}
                      className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-700 outline-none"
                    >
                      {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Identity Assets (URL)</label>
                    <input 
                      type="text" 
                      placeholder="Image URL..."
                      value={currentTestimonial?.image || ''}
                      onChange={e => setCurrentTestimonial({...currentTestimonial, image: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-700 outline-none italic"
                    />
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-50 flex justify-between items-center">
                   <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={currentTestimonial?.isPublished} 
                        onChange={e => setCurrentTestimonial({...currentTestimonial, isPublished: e.target.checked})}
                        className="w-6 h-6 rounded-lg text-[#1ea05f] border-slate-200 focus:ring-[#1ea05f]/20"
                      />
                      <span className="text-[10px] font-black uppercase text-slate-400 group-hover:text-slate-800 transition-all">Publish to Live Portal</span>
                   </label>
                   <button 
                     disabled={isSaving}
                     className="px-10 py-4 bg-slate-900 text-white font-black rounded-3xl shadow-xl hover:bg-[#1ea05f] transition-all flex items-center gap-3 uppercase tracking-widest text-xs"
                   >
                     {isSaving ? <FiRefreshCw className="animate-spin" /> : <FiCheck />}
                     {isSaving ? 'Synchronizing...' : 'Propagate Change'}
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
