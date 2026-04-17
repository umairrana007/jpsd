'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { 
  FiPlus, FiSearch, FiEdit3, FiTrash2,
  FiX, FiZap, FiActivity, FiGlobe, FiKey, FiCheck, FiLink, FiShield
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { triggerWebhook } from '@/lib/webhookDispatcher';
import { useAuth } from '@/contexts/AuthContext';

interface WebhookConfig {
  id: string;
  name: string;
  url: string;
  events: string[];
  isActive: boolean;
  secret: string;
  createdAt: any;
}

const EVENT_TYPES = [
  'cause_published', 'cause_deleted', 'program_updated', 'settings_modified', 
  'user_authorized', 'volunteer_registered', 'donation_processed', 'campaign_started'
];

export default function WebhooksPage() {
  const { setGlobalAlert } = useAuth();
  const [configs, setConfigs] = useState<WebhookConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [testingId, setTestingId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    events: [] as string[],
    isActive: true,
    secret: ''
  });

  useEffect(() => {
    fetchConfigs();
  }, []);

  const fetchConfigs = async () => {
    if (!db) return;
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db!, 'webhook_configs'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as WebhookConfig));
      setConfigs(data);
    } catch (err) {
      setGlobalAlert('Failed to load transmission logs.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (config?: WebhookConfig) => {
    if (config) {
      setEditingId(config.id);
      setFormData({
        name: config.name,
        url: config.url,
        events: config.events,
        isActive: config.isActive,
        secret: config.secret || ''
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', url: '', events: [], isActive: true, secret: '' });
    }
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.url) return;
    try {
      const payload = {
        ...formData,
        updatedAt: serverTimestamp()
      };

      if (editingId) {
        await updateDoc(doc(db!, 'webhook_configs', editingId), payload);
        setGlobalAlert('Protocol coordinates updated.', 'success');
      } else {
        await addDoc(collection(db!, 'webhook_configs'), {
          ...payload,
          createdAt: serverTimestamp()
        });
        setGlobalAlert('New uplink established.', 'success');
      }
      setIsModalOpen(false);
      fetchConfigs();
    } catch (err) {
      setGlobalAlert('Transmission coordinate error.', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Destroy this uplink protocol?')) return;
    try {
      await deleteDoc(doc(db!, 'webhook_configs', id));
      fetchConfigs();
      setGlobalAlert('Uplink terminated.', 'success');
    } catch (err) {
      setGlobalAlert('Termination sequence failed.', 'error');
    }
  };

  const handleTest = async (config: WebhookConfig) => {
    setTestingId(config.id);
    const success = await triggerWebhook(config, {
      type: 'test_ping',
      data: { message: 'Intelligence verification signal successful.' }
    });
    setTestingId(null);
    if (success) {
      setGlobalAlert('Signal confirmed by recipient.', 'success');
    } else {
      setGlobalAlert('Recipient refused signal.', 'error');
    }
  };

  const toggleEvent = (event: string) => {
    setFormData(prev => ({
      ...prev,
      events: prev.events.includes(event) 
        ? prev.events.filter(e => e !== event)
        : [...prev.events, event]
    }));
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase">Transmission Uplinks</h2>
          <p className="text-slate-500 font-medium italic underline decoration-primary/30 underline-offset-4 tracking-tight">Configure real-time webhooks for external signal distribution.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="px-8 py-4 bg-primary text-white font-black rounded-3xl shadow-xl shadow-primary/20 hover:opacity-90 transition-all flex items-center gap-2 uppercase text-xs tracking-widest"
        >
          <FiPlus /> Establish Uplink
        </button>
      </header>

      {/* Grid of Webhooks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {loading ? (
          [1,2].map(i => <div key={i} className="h-48 bg-slate-100 animate-pulse rounded-[3rem]" />)
        ) : configs.map(config => (
          <motion.div 
            layout
            key={config.id}
            className="bg-white/80 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-sm hover:border-[#1ea05f]/30 transition-all group overflow-hidden relative"
          >
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-6">
                <div className={`w-16 h-16 rounded-[2rem] flex items-center justify-center ${config.isActive ? 'bg-[#1ea05f]/10 text-[#1ea05f]' : 'bg-slate-100 text-slate-400'}`}>
                  <FiZap size={28} />
                </div>
                <div>
                   <h4 className="text-xl font-black text-slate-800 tracking-tightest uppercase italic">{config.name}</h4>
                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5 mt-1">
                     <FiLink className="text-primary" /> {config.url.slice(0, 40)}...
                   </p>
                </div>
              </div>
              <div className="flex gap-2">
                 <button 
                   onClick={() => handleTest(config)}
                   disabled={testingId === config.id}
                   className="p-4 bg-slate-900 text-white rounded-3xl shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-all"
                 >
                   {testingId === config.id ? <FiActivity className="animate-spin" size={18} /> : <FiZap size={18} />}
                 </button>
                 <button 
                   onClick={() => handleOpenModal(config)}
                   className="p-4 bg-slate-50 text-slate-600 rounded-3xl hover:bg-slate-100 transition-all border border-slate-100"
                 >
                   <FiEdit3 size={18} />
                 </button>
                 <button 
                   onClick={() => handleDelete(config.id)}
                   className="p-4 bg-red-50 text-red-500 rounded-3xl hover:bg-red-100 transition-all border border-red-100"
                 >
                   <FiTrash2 size={18} />
                 </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {config.events.map(event => (
                <span key={event} className="px-3 py-1 bg-slate-900 text-[8px] font-black text-white uppercase tracking-widest rounded-full opacity-80">
                  {event.replace('_', ' ')}
                </span>
              ))}
              {config.events.length === 0 && <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest italic">Monitoring zero signals</span>}
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
               <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${config.isActive ? 'bg-primary shadow-[0_0_12px_#1ea05f]' : 'bg-slate-300'}`} />
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{config.isActive ? 'Active Stream' : 'Offline'}</span>
               </div>
               {config.secret && (
                 <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full">
                    <FiShield className="text-amber-500 text-[10px]" />
                    <span className="text-[8px] font-black text-amber-600 uppercase tracking-widest">Secured Node</span>
                 </div>
               )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Editor */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[3.5rem] w-full max-w-2xl p-12 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-3xl font-black text-slate-800 tracking-tight uppercase italic mb-10 flex items-center gap-4">
                <FiZap className="text-primary" /> {editingId ? 'Refactor Protocol' : 'Initialize Uplink'}
              </h3>

              <div className="grid grid-cols-2 gap-8 mb-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol Designation</label>
                  <input 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-8 py-5 bg-slate-50 border-transparent rounded-[2rem] text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none"
                    placeholder="e.g. Slack Operations Feed"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Coordinate URL</label>
                  <input 
                    value={formData.url}
                    onChange={e => setFormData({...formData, url: e.target.value})}
                    className="w-full px-8 py-5 bg-slate-50 border-transparent rounded-[2rem] text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none"
                    placeholder="https://hooks.slack.com/..."
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Security Token (Optional)</label>
                  <input 
                    type="password"
                    value={formData.secret}
                    onChange={e => setFormData({...formData, secret: e.target.value})}
                    className="w-full px-8 py-5 bg-slate-50 border-transparent rounded-[2rem] text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none"
                    placeholder="••••••••••••"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Operational Status</label>
                  <button 
                    onClick={() => setFormData({...formData, isActive: !formData.isActive})}
                    className={`w-full py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-widest border transition-all ${formData.isActive ? 'bg-[#1ea05f]/5 text-[#1ea05f] border-[#1ea05f]/20' : 'bg-slate-50 text-slate-400 border-slate-100'}`}
                  >
                    {formData.isActive ? 'Matrix Engaged' : 'Protocols Dormant'}
                  </button>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block px-2">Signal Subscription Vectors</label>
                <div className="grid grid-cols-2 gap-3">
                  {EVENT_TYPES.map(event => (
                    <button
                      key={event}
                      onClick={() => toggleEvent(event)}
                      className={`px-6 py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest text-left transition-all border flex items-center justify-between ${formData.events.includes(event) ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-white text-slate-400 border-slate-100 hover:bg-slate-50'}`}
                    >
                      {event.replace('_', ' ')}
                      {formData.events.includes(event) && <FiCheck className="text-primary" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                 <button 
                   onClick={() => setIsModalOpen(false)}
                   className="flex-1 py-6 bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest rounded-3xl hover:bg-slate-100 transition-all"
                 >
                   Abort Sequence
                 </button>
                 <button 
                   onClick={handleSave}
                   className="flex-2 py-6 bg-primary text-white font-black text-[10px] uppercase tracking-widest rounded-3xl shadow-xl shadow-primary/20 hover:opacity-90 transition-all border-none outline-none"
                 >
                   Establish Protocol
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
