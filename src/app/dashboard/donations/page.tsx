'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { FiDownload, FiSearch, FiArrowDownRight, FiHeart, FiFileText, FiRefreshCw, FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { getUserDonations } from '@/lib/firebaseUtils';
import { motion, AnimatePresence } from 'framer-motion';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// Initialize PDFMake
pdfMake.vfs = (pdfFonts as any).pdfMake ? (pdfFonts as any).pdfMake.vfs : pdfFonts.vfs;

export default function MyDonationsPage() {
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const isUrdu = language === 'ur';
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDonations();
    }
  }, [user]);

  const fetchDonations = async () => {
    setLoading(true);
    try {
      const data = await getUserDonations(user!.uid);
      setDonations(data);
    } catch (error) {
      console.error('Error fetching donations:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDonations = useMemo(() => {
    return donations.filter(item => {
      const matchesTab = activeTab === 'All' || item.type?.includes(activeTab);
      const matchesSearch = item.id?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.cause?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.programName?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery, donations]);

  const generatePDF = (donation: any) => {
    const docDefinition = {
      content: [
        { text: 'Baitussalam Welfare Trust', style: 'header' },
        { text: 'OFFICIAL DONATION RECEIPT', style: 'subheader' },
        { text: `Receipt Date: ${donation.createdAt?.toLocaleDateString()}`, margin: [0, 10, 0, 5] },
        { text: `Reference ID: ${donation.id}`, margin: [0, 0, 0, 20] },
        {
          table: {
            widths: ['*', 'auto'],
            body: [
              [{ text: 'Mission/Cause', style: 'tableHeader' }, { text: 'Contribution', style: 'tableHeader' }],
              [donation.cause || donation.programName || 'General Donation', `${donation.currency || '$'}${donation.amount}`],
              [{ text: 'Fund Type', style: 'tableHeader' }, donation.type || 'General'],
              [{ text: 'Transaction Status', style: 'tableHeader' }, donation.status?.toUpperCase() || 'COMPLETED']
            ]
          }
        },
        { text: '\n“True charity is that which the right hand gives such that the left hand does not know.” - Prophet Muhammad (PBUH)', italics: true, alignment: 'center', margin: [0, 40, 0, 20], color: '#64748b', fontSize: 10 },
        { text: 'Baitussalam is a registered NGO. This document serves as proof of individual contribution.', fontSize: 8, color: 'grey', alignment: 'center', margin: [0, 60, 0, 0] }
      ],
      styles: {
        header: { fontSize: 24, bold: true, color: '#1ea05f', alignment: 'center' },
        subheader: { fontSize: 14, bold: true, margin: [0, 5, 0, 5], alignment: 'center', color: '#15804a', decoration: 'underline' },
        tableHeader: { bold: true, fillColor: '#f8fafc', padding: [10, 10] }
      }
    };
    pdfMake.createPdf(docDefinition as any).download(`Baitussalam-Receipt-${donation.id}.pdf`);
  };

  const totals = {
    all: donations.length,
    zakat: donations.filter(d => d.type === 'Zakat').length,
    totalAmount: donations.reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0)
  };

  return (
    <div className="space-y-12">
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8 border-b border-slate-100 pb-10">
         <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#1ea05f] font-black text-[10px] uppercase tracking-[0.3em]">
               <FiHeart /> Trusted Philanthropy
            </div>
            <h1 className="text-5xl font-black text-slate-800 tracking-tightest italic uppercase">
               {isUrdu ? 'میرے عطیات' : 'Mission History'}
            </h1>
            <p className="text-slate-500 font-medium italic underline decoration-[#1ea05f]/30 underline-offset-4 tracking-tight">Your legacy of impact, documented and verified.</p>
         </div>
         <div className="flex gap-4">
            <button 
              onClick={fetchDonations}
              className="p-4 bg-white text-slate-400 hover:text-[#1ea05f] rounded-2xl border border-slate-200 shadow-sm transition-all active:scale-95"
            >
              <FiRefreshCw className={loading ? 'animate-spin' : ''} />
            </button>
            <button className="px-10 py-4 bg-slate-950 text-white font-black rounded-2xl shadow-2xl shadow-slate-950/20 hover:opacity-90 transition-all flex items-center gap-3 uppercase text-xs tracking-widest">
               <FiDownload strokeWidth={3} /> Bulk Export
            </button>
         </div>
      </header>

      {/* KPI Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="bg-white/80 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-sm flex flex-col justify-between h-40">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Aggregate Mission Impact</p>
            <h4 className="text-4xl font-black text-slate-800 tracking-tighter">${totals.totalAmount.toLocaleString()}</h4>
            <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
               <div className="h-full bg-[#1ea05f] w-3/4 shadow-[0_0_8px_#1ea05f]"></div>
            </div>
         </div>
         <div className="bg-white/80 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-sm flex flex-col justify-between h-40">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verified Transactions</p>
            <h4 className="text-4xl font-black text-slate-800 tracking-tighter">{totals.all}</h4>
            <span className="text-[9px] font-black text-[#1ea05f] bg-[#1ea05f]/10 self-start px-3 py-1 rounded-full uppercase tracking-tighter mt-2">100% Secure</span>
         </div>
         <div className="bg-white/80 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-sm flex flex-col justify-between h-40">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lives Impacted Est.</p>
            <h4 className="text-4xl font-black text-slate-800 tracking-tighter">{totals.all * 5}</h4>
            <div className="flex -space-x-2 mt-2">
               {[1,2,3,4].map(i => <div key={i} className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white"></div>)}
               <div className="text-[8px] font-black text-slate-400 flex items-center ml-4 uppercase tracking-widest">+ GLOBAL REACH</div>
            </div>
         </div>
      </div>

      <div className="bg-white/70 backdrop-blur-md rounded-[3rem] border border-white shadow-sm overflow-hidden min-h-[600px]">
         <div className="p-8 border-b border-slate-50 space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-6">
               <div className="flex gap-1.5 p-1 bg-slate-50/50 rounded-2xl border border-slate-100">
                  {['All', 'Zakat', 'Sadaqah', 'General'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-8 py-3.5 text-[10px] font-black rounded-xl uppercase tracking-widest transition-all ${
                        activeTab === tab ? 'bg-white text-slate-900 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
               </div>
               <div className="flex-1 min-w-[300px] relative group">
                  <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#1ea05f] transition-colors" />
                  <input 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    type="text" 
                    placeholder="Search mission archives..." 
                    className="w-full pl-16 pr-8 py-5 bg-slate-50/30 border border-transparent rounded-[2rem] text-sm font-bold focus:ring-4 focus:ring-[#1ea05f]/5 focus:bg-white focus:border-[#1ea05f]/20 transition-all outline-none" 
                  />
               </div>
            </div>
         </div>
         
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-slate-50/30 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                     <th className="px-10 py-6">Mission Deployment</th>
                     <th className="px-10 py-6">Identity Reference</th>
                     <th className="px-10 py-6">Classification</th>
                     <th className="px-10 py-6">Contribution</th>
                     <th className="px-10 py-6 text-right">Intervention</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50/50">
                  <AnimatePresence>
                  {filteredDonations.length > 0 ? (
                    filteredDonations.map((item, idx) => (
                      <motion.tr 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        key={item.id} 
                        className="group hover:bg-slate-50/30 transition-colors"
                      >
                         <td className="px-10 py-8">
                            <div>
                               <p className="text-base font-black text-slate-800 tracking-tightest italic">{item.cause || item.programName || 'General Welfare'}</p>
                               <div className="flex items-center gap-2 mt-1">
                                  <FiClock size={12} className="text-slate-400" />
                                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.createdAt?.toLocaleDateString() || item.date}</p>
                               </div>
                            </div>
                         </td>
                         <td className="px-10 py-8">
                            <span className="font-bold text-slate-400 uppercase text-[10px]">#{item.id?.slice(-8) || item.ref}</span>
                         </td>
                         <td className="px-10 py-8">
                            <span className={`px-4 py-2 text-[9px] font-black rounded-xl uppercase tracking-widest border ${
                              item.type?.includes('Zakat') ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                            }`}>
                               {item.type || 'General'}
                            </span>
                         </td>
                         <td className="px-10 py-8">
                            <div className="flex items-center gap-2">
                               <p className="text-xl font-black text-slate-800 tracking-tighter italic">{item.currency || '$'}{item.amount}</p>
                               <FiArrowDownRight className="text-[#1ea05f] rotate-180" />
                            </div>
                         </td>
                         <td className="px-10 py-8 text-right">
                            <div className="flex justify-end gap-2 opacity-10 md:opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                               <button 
                                 onClick={() => generatePDF(item)}
                                 className="flex items-center gap-2 px-6 py-2.5 text-[10px] font-black rounded-xl border border-slate-100 text-slate-400 bg-white shadow-sm uppercase hover:text-[#1ea05f] hover:border-[#1ea05f]/30 hover:shadow-md transition-all active:scale-95"
                               >
                                  <FiFileText strokeWidth={2} /> Authenticated Receipt
                               </button>
                            </div>
                         </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-24 text-center">
                         <div className="space-y-4">
                            <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto text-slate-200">
                               <FiHeart size={40} />
                            </div>
                            <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">No philanthropic records found in cloud storage.</p>
                         </div>
                      </td>
                    </tr>
                  )}
                  </AnimatePresence>
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}
