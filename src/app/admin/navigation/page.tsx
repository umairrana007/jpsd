'use client';

import React, { useState, useEffect } from 'react';
import { 
  FiMenu, FiPlus, FiEdit2, FiTrash2, 
  FiMove, FiChevronDown, FiChevronRight,
  FiGlobe, FiExternalLink, FiEye, FiSave,
  FiRefreshCw
} from 'react-icons/fi';
import { motion, Reorder } from 'framer-motion';
import { getNavigationSettings, updateNavigationSettings } from '@/lib/firebaseUtils';

interface NavItem {
  id: string;
  label: string;
  labelUrdu: string;
  href: string;
  location: 'header' | 'footer' | 'mobile';
  subItems?: NavItem[];
}

export default function NavigationManagerPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [items, setItems] = useState<NavItem[]>([]);

  useEffect(() => {
    const fetchNav = async () => {
      const data = await getNavigationSettings();
      if (data && data.items) setItems(data.items);
      setLoading(false);
    };
    fetchNav();
  }, []);

  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({ label: '', labelUrdu: '', href: '', location: 'header' as const });

  const handleSave = async (updatedItems?: NavItem[]) => {
    setSaving(true);
    const success = await updateNavigationSettings(updatedItems || items);
    if (success) {
      alert('Global navigation linkages synchronized successfully.');
    }
    setSaving(false);
  };

  const addItem = () => {
    if (!newItem.label || !newItem.href) return;
    const item: NavItem = {
      id: Math.random().toString(36).substr(2, 9),
      ...newItem as any
    };
    const newItems = [...items, item];
    setItems(newItems);
    handleSave(newItems);
    setNewItem({ label: '', labelUrdu: '', href: '', location: 'header' });
    setIsAdding(false);
  };

  const deleteItem = (id: string) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    handleSave(newItems);
  };

  if (loading) return (
     <div className="min-h-screen flex items-center justify-center bg-[#f9f9fb]">
        <div className="w-16 h-16 border-4 border-[#1ea05f] border-t-transparent rounded-full animate-spin shadow-xl shadow-[#1ea05f]/20"></div>
     </div>
  );

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase">Navigation Menu Manager</h2>
          <p className="text-slate-500 font-medium">Orchestrate site-wide journeys and bilingual touchpoints.</p>
        </div>
        <div className="flex gap-4">
           <button 
             onClick={() => handleSave()}
             disabled={saving}
             className="px-8 py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:opacity-90 transition-all flex items-center gap-2"
           >
             {saving ? <FiRefreshCw className="animate-spin" /> : <FiSave />} 
             {saving ? 'Syncing...' : 'Broadcast Changes'}
           </button>
           <button 
             onClick={() => setIsAdding(true)}
             className="px-8 py-4 bg-[#1ea05f] text-white font-black rounded-2xl shadow-xl shadow-[#1ea05f]/20 hover:opacity-90 transition-all flex items-center gap-2 group"
           >
             <FiPlus className="group-hover:rotate-90 transition-transform" />
             <span>Genesis New Link</span>
           </button>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Menu Editor */}
        <div className="xl:col-span-8 space-y-6">
          <div className="bg-white/70 backdrop-blur-md p-2 rounded-[3rem] border border-white shadow-sm overflow-hidden">
             <div className="bg-slate-50/50 p-6 flex items-center justify-between border-b border-slate-100 mb-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Active Link Structure</span>
                <div className="flex gap-4">
                   <span className="text-[10px] font-black text-[#1ea05f] uppercase tracking-widest bg-[#1ea05f]/10 px-3 py-1 rounded-full">Primary Header</span>
                </div>
             </div>

             <div className="p-4 space-y-3">
                {items.map((item, index) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="group bg-white border border-slate-100 p-6 rounded-3xl flex items-center gap-6 hover:border-[#1ea05f] transition-all hover:shadow-xl hover:shadow-[#1ea05f]/5"
                  >
                    <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 cursor-grab active:cursor-grabbing">
                      <FiMove />
                    </div>
                    
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">English Label</p>
                        <p className="font-bold text-slate-800">{item.label}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Urdu Label</p>
                        <p className="font-bold text-[#1ea05f] urdu-text">{item.labelUrdu}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Destination URL</p>
                        <p className="text-sm font-medium text-slate-500 truncate">{item.href}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center hover:bg-slate-100 hover:text-slate-800 transition-all">
                        <FiEdit2 />
                      </button>
                      <button 
                        onClick={() => deleteItem(item.id)}
                        className="w-10 h-10 bg-red-50 text-red-400 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </motion.div>
                ))}
             </div>
          </div>

          {isAdding && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900 p-10 rounded-[3rem] text-white space-y-8"
            >
              <div className="flex justify-between items-center">
                 <h3 className="text-xl font-black italic uppercase tracking-widest">Construct New Junction</h3>
                 <button onClick={() => setIsAdding(false)} className="text-slate-500 hover:text-white">Close</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-3">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">English Identity</label>
                   <input 
                    type="text" 
                    value={newItem.label}
                    onChange={(e) => setNewItem({...newItem, label: e.target.value})}
                    placeholder="e.g. Humanitarian Efforts" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-[#1ea05f]/50 outline-none"
                   />
                 </div>
                 <div className="space-y-3">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Urdu Identity (ہوم)</label>
                   <input 
                    type="text" 
                    value={newItem.labelUrdu}
                    onChange={(e) => setNewItem({...newItem, labelUrdu: e.target.value})}
                    placeholder="انسانیت کی خدمت" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold urdu-text focus:ring-2 focus:ring-[#1ea05f]/50 outline-none"
                   />
                 </div>
                 <div className="space-y-3">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Path Pointer (URL)</label>
                   <input 
                    type="text" 
                    value={newItem.href}
                    onChange={(e) => setNewItem({...newItem, href: e.target.value})}
                    placeholder="/causes/emergency" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-[#1ea05f]/50 outline-none"
                   />
                 </div>
                 <div className="space-y-3">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Location Assignment</label>
                   <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-[#1ea05f]/50 outline-none appearance-none">
                      <option className="bg-slate-900">Primary Header</option>
                      <option className="bg-slate-900">Legal Footer</option>
                      <option className="bg-slate-900">Mobile Hub</option>
                   </select>
                 </div>
              </div>

              <div className="flex gap-4 pt-4">
                 <button 
                  onClick={addItem}
                  className="flex-1 py-4 bg-[#1ea05f] text-white font-black rounded-2xl shadow-xl shadow-[#1ea05f]/20 hover:opacity-90 transition-all"
                 >
                   Verify & Commit Link
                 </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="xl:col-span-4 space-y-8">
           <div className="bg-gradient-to-br from-[#1ea05f] to-[#15804a] p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <FiGlobe className="text-4xl mb-6 opacity-50" />
              <h3 className="text-xl font-black italic uppercase tracking-widest mb-4">Live Sync Status</h3>
              <p className="text-sm font-medium leading-relaxed opacity-80 mb-8">
                Changes made to the navigation menu are broadcasted instantly to the global frontend. Ensure all Urdu translations are verified before deployment.
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest border-t border-white/10 pt-4">
                  <span>Last Updated</span>
                  <span>2 minutes ago</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                  <span>Active Links</span>
                  <span>14 Global Linkages</span>
                </div>
              </div>
           </div>

           <div className="bg-white/70 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-sm space-y-8">
              <h4 className="text-lg font-black italic uppercase tracking-widest">Pro Version Features</h4>
              <ul className="space-y-4">
                {[
                  'Drag & Drop hierarchy',
                  'Multi-level mega menus',
                  'Conditional visibility (AB Testing)',
                  'Custom Icon assignment',
                ].map((token, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs font-bold text-slate-500">
                    <FiSave className="text-[#1ea05f]" />
                    {token}
                  </li>
                ))}
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
}
