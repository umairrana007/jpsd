'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiEye, FiArrowLeft, FiImage, FiType, FiLayout, FiCode, FiRefreshCw } from 'react-icons/fi';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function PageEditor({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState(params.id === '1' ? 'Home Page' : 'Humanitarian Cause Page');
  const [content, setContent] = useState('Welcome to Baitussalam. We are dedicated to serving humanity.');
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      if (!db) throw new Error('Firebase connection severed.');
      
      const docRef = doc(db, 'pages', params.id);
      await setDoc(docRef, {
        title,
        content,
        updatedAt: serverTimestamp(),
        status: 'published'
      }, { merge: true });
      
      alert('Propagated changes to edge network!');
    } catch (error: any) {
      console.error('Publishing failed:', error);
      alert(`Critical: ${error.message || 'Transmission failed.'}`);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-200 pb-8">
        <div className="flex items-center gap-6">
          <Link href="/admin/pages" className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-all">
            <FiArrowLeft size={20} />
          </Link>
          <div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase">Page Editor</h2>
            <p className="text-slate-500 font-medium">Editing: baittusalam.org/home</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
           <button className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-200 text-slate-500 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-all">
             <FiEye /> Preview
           </button>
            <button 
              onClick={handlePublish}
              disabled={isPublishing}
              className="flex items-center gap-2 px-8 py-4 bg-[#1ea05f] text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl hover:bg-[#15804a] transition-all disabled:opacity-50"
            >
              {isPublishing ? <FiRefreshCw className="animate-spin" /> : <FiSave />} 
              {isPublishing ? 'Synchronizing...' : 'Publish Changes'}
            </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Editor sidebar */}
        <div className="lg:col-span-1 space-y-4">
           <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Content Modules</h3>
              
              <div className="space-y-3">
                 {[
                   { icon: FiType, label: 'Typography Block' },
                   { icon: FiImage, label: 'Media Asset' },
                   { icon: FiLayout, label: 'Hero Section' },
                   { icon: FiCode, label: 'Custom HTML' },
                 ].map((mod, i) => (
                   <button key={i} className="flex items-center gap-4 w-full p-4 border border-slate-100 rounded-2xl hover:bg-[#1ea05f]/5 hover:border-[#1ea05f]/20 transition-all group">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-[#1ea05f] group-hover:bg-white transition-all">
                         <mod.icon />
                      </div>
                      <span className="text-xs font-bold text-slate-600 group-hover:text-slate-800">{mod.label}</span>
                   </button>
                 ))}
              </div>
           </div>

           <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">SEO Metadata</h3>
              <div className="space-y-4">
                <div>
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Meta Title</label>
                   <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl text-xs font-bold" />
                </div>
                <div>
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Meta Description</label>
                   <textarea rows={3} value="A general landing page..." className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl text-xs font-bold"></textarea>
                </div>
              </div>
           </div>
        </div>

        {/* Main Editor Canvas */}
        <div className="lg:col-span-3">
           <div className="bg-white min-h-[600px] rounded-[3rem] border border-slate-100 shadow-sm p-10">
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-4xl font-black italic uppercase tracking-tighter text-slate-800 border-none outline-none focus:ring-0 mb-8 p-0"
              />
              
              <div className="w-full h-px bg-slate-100 mb-8" />
              
              <textarea 
                 value={content}
                 onChange={(e) => setContent(e.target.value)}
                 className="w-full min-h-[400px] text-lg text-slate-600 border-none outline-none focus:ring-0 p-0 resize-none font-medium leading-relaxed"
                 placeholder="Start composing your message..."
              />
           </div>
        </div>
      </div>
    </div>
  );
}
