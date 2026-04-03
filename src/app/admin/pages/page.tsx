'use client';

import React, { useState } from 'react';
import { 
  FiFilePlus, FiEdit3, FiEye, FiTrash2, 
  FiLayout, FiSearch, FiFilter, FiMoreVertical,
  FiCheckCircle, FiClock, FiAlertCircle, FiSettings,
  FiGlobe, FiShare2, FiLayers
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface PageItem {
  id: string;
  title: string;
  slug: string;
  status: 'published' | 'draft' | 'scheduled';
  template: string;
  lastModified: string;
  author: string;
  seoScore: number;
}

export default function PageManagerPage() {
  const [pages, setPages] = useState<PageItem[]>([
    { id: '1', title: 'Home Page', slug: '/', status: 'published', template: 'Hero Template', lastModified: '2 hours ago', author: 'Admin Main', seoScore: 94 },
    { id: '2', title: 'Humanitarian Causes', slug: '/causes', status: 'published', template: 'Grid Template', lastModified: '1 day ago', author: 'Content Lead', seoScore: 88 },
    { id: '3', title: 'Annual Zakat Guide', slug: '/zakat-guide', status: 'draft', template: 'Article Template', lastModified: '3 days ago', author: 'Shariah Board', seoScore: 45 },
    { id: '4', title: 'Emergency Relief 2026', slug: '/emergency-relief', status: 'scheduled', template: 'Landing Page', lastModified: '5 days ago', author: 'Field Ops', seoScore: 78 },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const statusColors = {
    published: 'bg-green-100 text-green-700',
    draft: 'bg-amber-100 text-amber-700',
    scheduled: 'bg-blue-100 text-blue-700'
  };

  const getSeoColor = (score: number) => {
    if (score >= 90) return 'text-green-500 bg-green-500/10';
    if (score >= 70) return 'text-blue-500 bg-blue-500/10';
    return 'text-amber-500 bg-amber-500/10';
  };

  return (
    <div className="space-y-10 pb-20">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase">Humanitarian Page Orchestrator</h2>
          <p className="text-slate-500 font-medium">Manage global digital touchpoints and narrative flow.</p>
        </div>
        <Link 
          href="/admin/pages/create"
          className="px-8 py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:bg-slate-800 transition-all flex items-center gap-2 group"
        >
          <FiFilePlus className="group-hover:scale-110 transition-transform" />
          <span>Genesis New Page</span>
        </Link>
      </header>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/50 backdrop-blur-md p-6 rounded-[2.5rem] border border-white">
        <div className="flex gap-2">
          {['All Entities', 'Published', 'Drafts', 'Scheduled'].map((tab) => (
            <button key={tab} className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              tab === 'All Entities' ? 'bg-[#1ea05f] text-white shadow-lg shadow-[#1ea05f]/20' : 'text-slate-400 hover:bg-white hover:text-slate-800'
            }`}>
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative group flex-1 md:w-64">
             <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1ea05f] transition-colors" />
             <input 
              type="text" 
              placeholder="Search by title or slug..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold focus:ring-2 focus:ring-[#1ea05f]/20 outline-none transition-all"
             />
          </div>
          <button className="flex items-center gap-2 px-4 py-4 border border-slate-200 rounded-2xl text-[10px] font-black text-slate-500 uppercase tracking-widest hover:bg-white transition-all">
             <FiFilter /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-sm">
         <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                <th className="px-10 py-8">Page Entity</th>
                <th className="px-10 py-8">Status Protocol</th>
                <th className="px-10 py-8">Architecture</th>
                <th className="px-10 py-8">SEO Intelligence</th>
                <th className="px-10 py-8">Foundation Registry</th>
                <th className="px-10 py-8"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {pages.map((page) => (
                <tr key={page.id} className="group hover:bg-slate-50/50 transition-colors cursor-pointer">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#1ea05f]/10 flex items-center justify-center text-[#1ea05f] font-black italic">
                        <FiGlobe />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800 italic uppercase truncate max-w-[200px]">{page.title}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                           <FiShare2 className="text-blue-400" /> baitussalam.org{page.slug}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${statusColors[page.status]}`}>
                       {page.status}
                    </span>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                       <FiLayers className="text-[#1ea05f]" /> {page.template}
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-2">
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${getSeoColor(page.seoScore)}`}>
                          {page.seoScore}
                       </div>
                       <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${page.seoScore >= 90 ? 'bg-green-500' : 'bg-amber-500'}`} style={{ width: `${page.seoScore}%` }} />
                       </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                     <p className="text-[10px] font-black text-slate-800 uppercase tracking-widest italic">{page.author}</p>
                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{page.lastModified}</p>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <Link href={`/admin/pages/editor/${page.id}`} className="w-10 h-10 border border-slate-200 text-slate-400 rounded-xl flex items-center justify-center hover:bg-slate-100 hover:text-slate-800 transition-all">
                          <FiEdit3 />
                       </Link>
                       <button className="w-10 h-10 border border-slate-200 text-slate-400 rounded-xl flex items-center justify-center hover:bg-[#1ea05f] hover:text-white transition-all">
                          <FiEye />
                       </button>
                       <button className="w-10 h-10 border border-slate-200 text-slate-400 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                          <FiTrash2 />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
         </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="bg-slate-900 p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group border border-white/5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#1ea05f]/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-125 transition-transform" />
            <FiLayout className="text-[#1ea05f] text-4xl mb-6 opacity-80" />
            <h4 className="text-xl font-black italic uppercase tracking-widest mb-4">Template Engine</h4>
            <p className="text-sm font-medium text-slate-400 leading-relaxed mb-8">Deploy standardized foundation landing pages with zero configuration.</p>
            <button className="w-full py-4 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Configure Factory Templates</button>
         </div>

         <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm space-y-6">
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
               <FiGlobe size={24} />
            </div>
            <h4 className="text-xl font-black text-slate-800 italic uppercase tracking-widest">SEO Outreach Core</h4>
            <div className="space-y-4">
               {[
                 { label: 'Search Visibility', val: '88%' },
                 { label: 'Keyword Velocity', val: '72%' },
                 { label: 'Backlink Authority', val: '64%' },
               ].map((stat, i) => (
                 <div key={i} className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-slate-400">{stat.label}</span>
                    <span className="text-slate-800 italic">{stat.val}</span>
                 </div>
               ))}
            </div>
            <button className="w-full py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black text-slate-500 uppercase tracking-widest hover:bg-white transition-all">Deep Optimization Analysis</button>
         </div>

         <div className="bg-gradient-to-br from-[#1ea05f] to-[#15804a] p-10 rounded-[3.5rem] text-white shadow-2xl shadow-[#1ea05f]/20 flex flex-col justify-between">
            <div className="space-y-4">
              <FiSettings size={32} className="opacity-50" />
              <h4 className="text-2xl font-black italic uppercase italic tracking-tighter">Genesis Protocol</h4>
              <p className="text-sm font-medium opacity-80 leading-relaxed">
                 Create dynamic sub-domains and hidden campaign landing pages for rapid disaster relief efforts.
              </p>
            </div>
            <button className="w-full py-5 bg-white text-[#1ea05f] font-black rounded-[2rem] shadow-xl text-xs uppercase tracking-widest hover:scale-105 transition-all mt-8">Launch Dark Campaign</button>
         </div>
      </div>
    </div>
  );
}
