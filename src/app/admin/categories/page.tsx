'use client';

import React, { useState, useEffect } from 'react';
import { FiGrid, FiPlus, FiEdit3, FiTrash2, FiSearch, FiLayers, FiActivity, FiTag, FiX, FiCheck } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { withAuth } from '@/components/admin/withAuth';
import { UserRole, CauseCategory } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy, Timestamp } from 'firebase/firestore';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  active: boolean;
  order: number;
}

function AdminCategoriesPage() {
  const { setGlobalAlert } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: 'FiLayout',
    color: '#1ea05f',
    active: true
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    if (!db) return;
    setLoading(true);
    try {
      const q = query(collection(db, 'categories'), orderBy('order', 'asc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category));
      
      if (data.length === 0) {
        // Provide defaults if empty
        const defaults: Partial<Category>[] = [
          { name: 'Zakat', slug: 'zakat', description: 'Mandatory almsgiving for eligible causes', icon: 'FiShield', color: '#1ea05f', active: true, order: 1 },
          { name: 'Sadaqah', slug: 'sadaqah', description: 'Voluntary charity for general welfare', icon: 'FiHeart', color: '#3b82f6', active: true, order: 2 },
          { name: 'Emergency', slug: 'emergency', description: 'Urgent relief for disasters and crises', icon: 'FiActivity', color: '#ef4444', active: true, order: 3 },
          { name: 'Education', slug: 'education', description: 'Scholarships and school construction', icon: 'FiBookOpen', color: '#f59e0b', active: true, order: 4 },
        ];
        setCategories(defaults as Category[]);
      } else {
        setCategories(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setGlobalAlert('Failed to load donation categories.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) return;
    
    try {
      const slug = formData.name.toLowerCase().replace(/\s+/g, '-');
      const payload = {
        ...formData,
        slug,
        updatedAt: Timestamp.now(),
        order: editingCategory ? editingCategory.order : categories.length + 1
      };

      if (editingCategory) {
        await updateDoc(doc(db, 'categories', editingCategory.id), payload);
        setCategories(categories.map(c => c.id === editingCategory.id ? { ...c, ...payload } : c));
        setGlobalAlert('Category configuration updated successfully.', 'success');
      } else {
        const docRef = await addDoc(collection(db, 'categories'), {
          ...payload,
          createdAt: Timestamp.now()
        });
        setCategories([...categories, { id: docRef.id, ...payload } as Category]);
        setGlobalAlert('New donation category deployed.', 'success');
      }
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      setGlobalAlert('Failed to synchronize category data.', 'error');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      icon: 'FiLayout',
      color: '#1ea05f',
      active: true
    });
    setEditingCategory(null);
  };

  const handleDelete = async (id: string) => {
    if (!db || !confirm('Are you sure you want to decommission this category?')) return;
    try {
      await deleteDoc(doc(db, 'categories', id));
      setCategories(categories.filter(c => c.id !== id));
      setGlobalAlert('Category removed from active operations.', 'success');
    } catch (error) {
      setGlobalAlert('Failed to delete category.', 'error');
    }
  };

  const openEdit = (cat: Category) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      description: cat.description,
      icon: cat.icon,
      color: cat.color,
      active: cat.active
    });
    setIsModalOpen(true);
  };

  if (loading) return (
     <div className="min-h-screen flex items-center justify-center bg-[#f9f9fb]">
        <div className="w-16 h-16 border-4 border-[#1ea05f] border-t-transparent rounded-full animate-spin"></div>
     </div>
  );

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase">Asset Taxonomy</h2>
          <p className="text-slate-500 font-medium tracking-tight italic">Manage donation logic and categorical classification.</p>
        </div>
        <button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="px-8 py-3 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:opacity-90 transition-all flex items-center gap-2 uppercase tracking-widest text-[10px]"
        >
          <FiPlus /> Create Category
        </button>
      </header>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {categories.map((cat) => (
           <motion.div 
             key={cat.id || cat.name}
             whileHover={{ y: -5 }}
             className="bg-white/80 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-sm group relative overflow-hidden"
           >
              <div 
                className="absolute top-0 right-0 w-32 h-32 opacity-10 rounded-full -mr-16 -mt-16 blur-xl transition-all group-hover:opacity-20"
                style={{ backgroundColor: cat.color }}
              ></div>
              
              <div className="flex justify-between items-start mb-6">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg"
                  style={{ backgroundColor: cat.color }}
                >
                  <FiLayers size={24} />
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  <button onClick={() => openEdit(cat)} className="w-8 h-8 bg-slate-50 text-slate-400 rounded-lg flex items-center justify-center hover:text-primary transition-all shadow-sm"><FiEdit3 size={14}/></button>
                  <button onClick={() => handleDelete(cat.id)} className="w-8 h-8 bg-slate-50 text-slate-400 rounded-lg flex items-center justify-center hover:text-red-500 transition-all shadow-sm"><FiTrash2 size={14}/></button>
                </div>
              </div>

              <h3 className="text-lg font-black text-slate-800 italic uppercase mb-2">{cat.name}</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">{cat.description}</p>
              
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-full ${cat.active ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                  {cat.active ? 'Active Unit' : 'Inactive'}
                </span>
                <span className="text-[10px] font-black text-slate-300 uppercase italic">ID: {cat.slug}</span>
              </div>
           </motion.div>
         ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity:0, scale:0.9 }}
              animate={{ opacity:1, scale:1 }}
              exit={{ opacity:0, scale:0.9 }}
              className="bg-white rounded-[3rem] w-full max-w-xl overflow-hidden shadow-2xl"
            >
              <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                <div>
                  <h3 className="text-2xl font-black text-slate-800 italic uppercase">{editingCategory ? 'Edit Asset Class' : 'New Asset Class'}</h3>
                  <p className="text-[10px] text-primary font-black uppercase tracking-widest mt-1">Configure categorical donation parameters</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 rounded-2xl hover:bg-white flex items-center justify-center text-slate-400 transition-all shadow-sm">
                  <FiX />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Classification Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Zakat, Sadaqah"
                      className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Theme Color</label>
                    <div className="flex gap-3">
                      <input 
                        type="color" 
                        value={formData.color}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        className="w-12 h-12 rounded-xl border-none cursor-pointer bg-transparent"
                      />
                      <input 
                        type="text"
                        value={formData.color}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        className="flex-1 px-6 py-3 bg-slate-50 border-none rounded-2xl text-[10px] font-black uppercase outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mission Description</label>
                  <textarea 
                    rows={3}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief definition of this category..."
                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                  />
                </div>

                <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-2xl">
                   <div className="flex-1">
                      <p className="text-sm font-black text-slate-800 italic uppercase">Active Status</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Is this category currently taking donations?</p>
                   </div>
                   <button 
                     type="button"
                     onClick={() => setFormData({ ...formData, active: !formData.active })}
                     className={`w-14 h-8 rounded-full transition-all relative ${formData.active ? 'bg-primary' : 'bg-slate-200'}`}
                   >
                     <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${formData.active ? 'left-7 shadow-lg' : 'left-1'}`}></div>
                   </button>
                </div>

                <button 
                  type="submit"
                  className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl flex items-center justify-center gap-3 uppercase text-xs tracking-widest hover:bg-primary transition-all shadow-xl shadow-slate-900/20"
                >
                  <FiCheck size={18} /> {editingCategory ? 'Update Classification' : 'Authorize Deployment'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default withAuth(AdminCategoriesPage, { 
  allowedRoles: [UserRole.ADMIN, UserRole.CONTENT_MANAGER] 
});
