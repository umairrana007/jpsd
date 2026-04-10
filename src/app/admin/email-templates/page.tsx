'use client';

import React, { useState, useEffect } from 'react';
import { FiMail, FiPlus, FiTrash2, FiEdit3, FiSend, FiCheck, FiX, FiActivity } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp, serverTimestamp } from 'firebase/firestore';
import { EmailTemplateEditor } from '@/components/admin/EmailTemplateEditor';
import { useAuth } from '@/hooks/useAuth';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  html: string;
  text: string;
  isActive: boolean;
  variables: string[];
  updatedAt: any;
}

export default function EmailTemplatesPage() {
  const { user, setGlobalAlert } = useAuth();
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    if (!db) return;
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db!, 'email_templates'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as EmailTemplate));
      setTemplates(data);
    } catch (error) {
      console.error('Error fetching templates:', error);
      setGlobalAlert('Failed to retrieve intelligence data.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTemplate = async () => {
    if (!newName) return;
    try {
      const docRef = await addDoc(collection(db!, 'email_templates'), {
        name: newName,
        subject: 'Default Subject Protocol',
        html: '{}',
        text: 'Default plan text payload.',
        isActive: true,
        variables: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      setNewName('');
      setShowCreateModal(false);
      fetchTemplates();
      setGlobalAlert('New communication matrix initialized.', 'success');
    } catch (error) {
      setGlobalAlert('Initialization failed.', 'error');
    }
  };

  const handleSaveTemplate = async (data: { subject: string; html: string; text: string }) => {
    if (!editingTemplate) return;
    try {
      await updateDoc(doc(db!, 'email_templates', editingTemplate.id), {
        ...data,
        updatedAt: serverTimestamp()
      });
      setEditingTemplate(null);
      fetchTemplates();
      setGlobalAlert('Template protocol updated successfully.', 'success');
    } catch (error) {
      setGlobalAlert('Update failed.', 'error');
    }
  };

  const handleDeleteTemplate = async (id: string) => {
    if (!confirm('Are you sure you want to terminate this protocol?')) return;
    try {
      await deleteDoc(doc(db!, 'email_templates', id));
      fetchTemplates();
      setGlobalAlert('Template terminated.', 'success');
    } catch (error) {
      setGlobalAlert('Termination failed.', 'error');
    }
  };

  if (editingTemplate) {
    return (
      <div className="space-y-8">
        <header className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase">Visual Designer</h2>
            <p className="text-slate-500 font-medium italic underline decoration-primary/30 underline-offset-4 tracking-tight">
              Editing: {editingTemplate.name}
            </p>
          </div>
          <button 
            onClick={() => setEditingTemplate(null)}
            className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest"
          >
            Exit Designer
          </button>
        </header>
        <EmailTemplateEditor 
          templateId={editingTemplate.id}
          initialHtml={editingTemplate.html}
          initialSubject={editingTemplate.subject}
          onSave={handleSaveTemplate}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase">Communication Templates</h2>
          <p className="text-slate-500 font-medium italic underline decoration-primary/30 underline-offset-4 tracking-tight">Configure automated outreach and response systems.</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="px-8 py-4 bg-primary text-white font-black rounded-3xl shadow-xl shadow-primary/20 hover:opacity-90 transition-all flex items-center gap-2 uppercase text-xs tracking-widest"
        >
          <FiPlus /> Initialize Template
        </button>
      </header>

      {/* Grid Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [1,2,3].map(i => <div key={i} className="h-64 bg-slate-100 animate-pulse rounded-[2.5rem]" />)
        ) : templates.map(template => (
          <motion.div 
            layout
            key={template.id}
            className="bg-white/80 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-sm hover:border-primary/30 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all flex gap-2">
              <button 
                onClick={() => setEditingTemplate(template)}
                className="p-3 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20"
              >
                <FiEdit3 size={16} />
              </button>
              <button 
                onClick={() => handleDeleteTemplate(template.id)}
                className="p-3 bg-red-600 text-white rounded-2xl shadow-lg shadow-red-600/20"
              >
                <FiTrash2 size={16} />
              </button>
            </div>

            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="w-14 h-14 rounded-3xl bg-slate-50 flex items-center justify-center text-primary mb-6">
                  <FiMail size={24} />
                </div>
                <h4 className="text-xl font-black text-slate-800 tracking-tightest mb-2 italic uppercase">{template.name}</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest line-clamp-1">{template.subject}</p>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-slate-50 pt-6">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${template.isActive ? 'bg-primary shadow-[0_0_10px_#1ea05f]' : 'bg-slate-300'}`} />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{template.isActive ? 'Active' : 'Offline'}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  REV: {template.updatedAt?.toDate().toLocaleDateString() || 'N/A'}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {!loading && templates.length === 0 && (
        <div className="text-center py-24 bg-white/50 rounded-[3rem] border border-dashed border-slate-200">
           <FiMail size={48} className="mx-auto text-slate-200 mb-4" />
           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">No template matrices found. Initialize first protocol.</p>
        </div>
      )}

      {/* Create Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[3rem] w-full max-w-md p-10 shadow-2xl relative overflow-hidden"
            >
              <h3 className="text-2xl font-black text-slate-800 tracking-tight uppercase italic mb-8 flex items-center gap-3">
                <FiPlus className="text-primary" /> New Template
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Protocol Name</label>
                  <input 
                    type="text" 
                    value={newName} 
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                    placeholder="e.g. Donor Welcome Email"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 py-5 bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-slate-100 transition-all text-center"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleCreateTemplate}
                    className="flex-1 py-5 bg-primary text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:opacity-90 transition-all"
                  >
                    Initialize Matrix
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
