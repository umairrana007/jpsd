'use client';

import React, { useState } from 'react';
import { 
  FiPlus, FiSearch, FiEdit3, FiTrash2,
  FiUsers, FiX, FiDollarSign
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '@/lib/firebase';
import { withAuth } from '@/components/admin/withAuth';
import { UserRole } from '@/types';
import { 
  collection, doc, deleteDoc, updateDoc,
  serverTimestamp, addDoc, getDocs, query, orderBy
} from 'firebase/firestore';
import useSWR from 'swr';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { causeSchema } from '@/lib/schemas/cmsSchemas';
import { BilingualInput } from '@/components/admin/BilingualInput';
import { logActivity, saveVersion } from '@/lib/firebaseUtils';
import { useAuth } from '@/contexts/AuthContext';
import { logCMSAnalytics } from '@/lib/cmsAnalytics';
import { triggerWebhook } from '@/lib/webhookDispatcher';
import { CMSAnalyticsDashboard } from '@/components/admin/CMSAnalyticsDashboard';
import { FiActivity, FiZap, FiTarget as FiMissionTarget } from 'react-icons/fi';

interface Program {
  id: string;
  title: string;
  titleUrdu?: string;
  description: string;
  descriptionUrdu?: string;
  category: string;
  goalAmount: number;
  raisedAmount: number;
  active: boolean;
  status: 'draft' | 'published';
  donors?: number;
}

const fetcher = async () => {
  if (!db) return [];
  const q = query(collection(db, 'causes'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    title: doc.data().title || doc.data().titleEn,
  })) as Program[];
};

function AdminCausesPage() {
  const { user } = useAuth();
  const { data: programs, error, mutate, isLoading: loading } = useSWR<Program[]>('causes', fetcher);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [showIntelligenceId, setShowIntelligenceId] = useState<string | null>(null);

  const { control, handleSubmit, reset, watch, formState: { errors } } = useForm({
    resolver: zodResolver(causeSchema),
    defaultValues: {
      title: '',
      titleUrdu: '',
      description: '',
      descriptionUrdu: '',
      category: 'water',
      location: 'Global',
      goalAmount: 0,
      raisedAmount: 0,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days
      urgency: 'medium',
      active: false,
      featured: false,
      status: 'draft' as 'draft' | 'published',
      image: '/images/jpsd_main.jpg'
    }
  });

  const onSubmit = async (data: any) => {
    if (!db) return;
    setSaving(true);
    try {
      const active = data.status === 'published';
      const programData = {
        ...data,
        active,
        updatedAt: serverTimestamp()
      };

      if (editingId && editingProgram) {
        // Validation + Version History
        await saveVersion('causes', editingId, editingProgram as unknown as Record<string, unknown>, user?.uid || 'unknown');
        
        // Audit log
        await logActivity({
          type: 'UPDATE_CAUSE',
          message: `Cause "${data.title}" updated`,
          collection: 'causes',
          docId: editingId,
          beforeState: editingProgram as any,
          afterState: programData,
          actorUid: user?.uid || 'unknown',
          actorEmail: user?.email || undefined
        });

        await updateDoc(doc(db, 'causes', editingId), programData);

        // Record high-level telemetry
        await logCMSAnalytics({
          docId: editingId,
          collection: 'causes',
          action: 'edit',
          actorUid: user?.uid || 'unknown',
          metadata: { fieldsChanged: Object.keys(data) }
        });

        // Trigger Webhook if published
        if (data.status === 'published') {
          await triggerWebhook({ url: process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL || '', isActive: true }, {
            type: 'cause_published',
            data: { id: editingId, ...data },
            actorUid: user?.uid
          });
        }
      } else {
        programData.createdAt = serverTimestamp();
        if (active) programData.publishedAt = serverTimestamp();
        
        const docRef = await addDoc(collection(db, 'causes'), programData);
        
        await logActivity({
          type: 'CREATE_CAUSE',
          message: `Cause "${data.title}" created`,
          collection: 'causes',
          docId: docRef.id,
          afterState: programData,
          actorUid: user?.uid || 'unknown',
          actorEmail: user?.email || undefined
        });

        await logCMSAnalytics({
          docId: docRef.id,
          collection: 'causes',
          action: 'publish', // New document creation is treated as first publish if active
          actorUid: user?.uid || 'unknown'
        });
      }

      setIsModalOpen(false);
      setEditingId(null);
      setEditingProgram(null);
      reset();
      mutate(); // Reload data
    } catch (err) {
      console.error("Save error:", err);
      alert('Failed to save. Check the console.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (p: any) => {
    setEditingProgram(p);
    reset({
      title: p.title || '',
      titleUrdu: p.titleUrdu || '',
      description: p.description || '',
      descriptionUrdu: p.descriptionUrdu || '',
      category: p.category || 'water',
      location: p.location || 'Global',
      goalAmount: p.goalAmount || 0,
      raisedAmount: p.raisedAmount || 0,
      deadline: p.deadline?.toDate ? p.deadline.toDate().toISOString().split('T')[0] : p.deadline || new Date().toISOString().split('T')[0],
      urgency: p.urgency || 'medium',
      active: p.active || false,
      featured: p.featured || false,
      status: p.status || (p.active ? 'published' : 'draft'),
      image: p.image || '/images/jpsd_main.jpg'
    });
    setEditingId(p.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, causeTitle: string) => {
    if (!db || !window.confirm('Are you sure you want to delete this mission?')) return;
    try {
      await logActivity({
        type: 'DELETE_CAUSE',
        message: `Cause "${causeTitle}" deleted`,
        collection: 'causes',
        docId: id,
        actorUid: user?.uid || 'unknown',
        actorEmail: user?.email || undefined
      });
      await deleteDoc(doc(db, 'causes', id));
      mutate();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase">Funding Missions</h2>
          <p className="text-slate-500 font-medium tracking-tight">Design and monitor global charity campaigns and high-impact fundraising.</p>
        </div>
        <button 
          onClick={() => {
            reset();
            setEditingId(null);
            setEditingProgram(null);
            setIsModalOpen(true);
          }}
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
                   {loading ? (
                     <tr><td colSpan={5} className="text-center py-20 font-bold text-slate-400 italic">Synchronizing Mission Ledger...</td></tr>
                   ) : error ? (
                     <tr><td colSpan={5} className="text-center py-20 font-bold text-red-500 italic">Failed to load missions</td></tr>
                   ) : programs?.length === 0 ? (
                     <tr><td colSpan={5} className="text-center py-20 font-bold text-slate-400">No active missions found in the records.</td></tr>
                   ) : (
                     programs?.map((cause) => {
                       const percentage = Math.min(100, Math.round((cause.raisedAmount / cause.goalAmount) * 100) || 0);
                       return (
                         <React.Fragment key={cause.id}>
                           <tr className="group hover:bg-slate-50/30 transition-all">
                             <td className="px-10 py-8">
                                <div>
                                   <p className="text-base font-black text-slate-800 tracking-tightest italic">{cause.title}</p>
                                   <div className="flex items-center gap-2 mt-1">
                                      <FiUsers size={12} className="text-slate-400" />
                                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">{cause.donors || 0} Patrons active</p>
                                   </div>
                                </div>
                             </td>
                             <td className="px-10 py-8">
                                <span className="px-4 py-1.5 bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-[0.2em] rounded-lg border border-blue-100 shadow-sm">{cause.category}</span>
                             </td>
                             <td className="px-10 py-8">
                                <div className="space-y-3 max-w-[200px]">
                                   <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-600 italic">
                                      <span>${cause.raisedAmount?.toLocaleString() || 0}</span>
                                      <span className="text-slate-300">/ ${cause.goalAmount?.toLocaleString() || 0}</span>
                                   </div>
                                   <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/50">
                                      <div className="h-full bg-gradient-to-r from-[#1ea05f] to-[#15804a] rounded-full shadow-[0_0_8px_#10b98150]" style={{ width: `${percentage}%` }}></div>
                                   </div>
                                </div>
                             </td>
                             <td className="px-10 py-8">
                                <div className="flex items-center gap-3">
                                   <div className={`w-2 h-2 rounded-full ${cause.active ? 'bg-[#1ea05f] shadow-[0_0_10px_#10b981]' : 'bg-slate-300'}`}></div>
                                   <span className={`text-[10px] font-black uppercase tracking-widest ${cause.active ? 'text-slate-800' : 'text-slate-400'}`}>{cause.active ? 'Active' : 'Draft'}</span>
                                </div>
                             </td>
                              <td className="px-10 py-8 text-right">
                                 <div className="flex justify-end gap-2 opacity-10 md:opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                                    <button onClick={() => setShowIntelligenceId(showIntelligenceId === cause.id ? null : cause.id)} className={`p-3 transition-all bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md ${showIntelligenceId === cause.id ? 'text-primary border-primary/20' : 'text-slate-400 hover:text-primary'}`}>
                                      <FiActivity size={18} />
                                    </button>
                                    <button onClick={() => handleEdit(cause)} className="p-3 text-slate-400 hover:text-[#1ea05f] transition-all bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md"><FiEdit3 size={18} /></button>
                                    <button onClick={() => handleDelete(cause.id, cause.title)} className="p-3 text-slate-400 hover:text-red-500 transition-all bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md"><FiTrash2 size={18} /></button>
                                 </div>
                              </td>
                           </tr>
                           {showIntelligenceId === cause.id && (
                             <tr>
                               <td colSpan={5} className="px-10 py-6 bg-slate-50/30">
                                 <CMSAnalyticsDashboard 
                                   collection="causes" 
                                   docId={cause.id} 
                                   title={cause.title} 
                                 />
                               </td>
                             </tr>
                           )}
                         </React.Fragment>
                       );
                     })
                   )}
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
              <form onSubmit={handleSubmit(onSubmit)} className="p-10 space-y-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-black text-slate-800 italic uppercase">
                      {editingId ? 'Edit Campaign' : 'Initialize Campaign'}
                    </h3>
                    <p className="text-slate-500 font-medium tracking-tight">Construct a new fundraising objective for the network.</p>
                  </div>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="p-3 bg-slate-50 text-slate-400 hover:text-slate-600 rounded-2xl transition-colors">
                    <FiX size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Bilingual Input for Title */}
                  <Controller
                    name="title"
                    control={control}
                    render={({ field: engField }) => (
                      <Controller
                        name="titleUrdu"
                        control={control}
                        render={({ field: urduField }) => (
                          <BilingualInput 
                            label="Campaign Title"
                            name="title"
                            valueEn={engField.value}
                            valueUr={urduField.value as string}
                            onChangeEn={engField.onChange}
                            onChangeUr={urduField.onChange}
                            placeholderEn="Clean Water Project"
                            placeholderUr="صاف پانی کا منصوبہ"
                            error={errors.title?.message as string}
                          />
                        )}
                      />
                    )}
                  />

                  {/* Bilingual Input for Description */}
                  <Controller
                    name="description"
                    control={control}
                    render={({ field: engField }) => (
                      <Controller
                        name="descriptionUrdu"
                        control={control}
                        render={({ field: urduField }) => (
                          <BilingualInput 
                            label="Campaign Context"
                            name="description"
                            valueEn={engField.value}
                            valueUr={urduField.value as string}
                            onChangeEn={engField.onChange}
                            onChangeUr={urduField.onChange}
                            isTextArea
                            placeholderEn="Define mission parameters..."
                            placeholderUr="تفصیل درج کریں"
                            error={errors.description?.message as string}
                          />
                        )}
                      />
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mission Classification</label>
                      <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                          <select 
                            {...field}
                            className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl text-sm font-bold focus:ring-4 focus:ring-[#1ea05f]/5 focus:bg-white focus:border-[#1ea05f]/20 transition-all outline-none appearance-none"
                          >
                            <option value="water">Water Infrastructure</option>
                            <option value="food">Emergency Nutrition</option>
                            <option value="health">Medical Logistics</option>
                            <option value="education">Human Capital</option>
                            <option value="emergency">Emergency Relief</option>
                          </select>
                        )}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Hard Funding Target (USD)</label>
                      <div className="relative">
                        <FiDollarSign className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                        <Controller
                          name="goalAmount"
                          control={control}
                          render={({ field }) => (
                            <input 
                              type="number" 
                              value={field.value}
                              onChange={e => field.onChange(Number(e.target.value))}
                              className="w-full pl-12 pr-6 py-4 bg-slate-50 border-transparent rounded-2xl text-sm font-bold focus:ring-4 focus:ring-[#1ea05f]/5 focus:bg-white focus:border-[#1ea05f]/20 transition-all outline-none"
                              placeholder="0.00"
                            />
                          )}
                        />
                        {errors.goalAmount && <p className="text-red-500 text-xs mt-1">{errors.goalAmount.message as string}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Publishing Status</label>
                    <Controller
                      name="status"
                      control={control}
                      render={({ field }) => (
                        <select 
                          {...field}
                          className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl text-sm font-bold focus:ring-4 focus:ring-[#1ea05f]/5 focus:bg-white focus:border-[#1ea05f]/20 transition-all outline-none appearance-none"
                        >
                          <option value="draft">Draft (Hidden from public)</option>
                          <option value="published">Published (Live on site)</option>
                        </select>
                      )}
                    />
                  </div>
                </div>

                <div className="pt-6 flex gap-4">
                  <button 
                    type="submit"
                    disabled={saving}
                    className="flex-1 py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl shadow-slate-900/20 hover:opacity-90 transition-all uppercase text-xs tracking-widest disabled:opacity-50"
                  >
                    {saving ? 'Processing...' : 'Confirm Mission'}
                  </button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-10 py-4 bg-slate-50 text-slate-400 font-black rounded-2xl hover:bg-slate-100 transition-all uppercase text-xs tracking-widest">
                    Abort
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

export default withAuth(AdminCausesPage, { 
  allowedRoles: [UserRole.ADMIN, UserRole.CONTENT_MANAGER, UserRole.VIEWER] 
});
