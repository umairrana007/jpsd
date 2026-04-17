'use client';

import React, { useState } from 'react';
import { 
  FiFileText, FiDownload, FiSearch, 
  FiArrowUpRight, FiCheckCircle, FiActivity,
  FiZap, FiDownloadCloud, FiLoader
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function DonorCertificatesPage() {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const years = ['Fiscal Year 2024-2025', 'Fiscal Year 2023-2024', 'Fiscal Year 2022-2023'];

  const handleDownload = (id: string) => {
    setDownloadingId(id);
    
    // Simulate File Generation & Retrieval
    setTimeout(() => {
      setDownloadingId(null);
      setShowSuccess(true);
      
      // Generate a Minimal Valid PDF structure
      const pdfContent = `%PDF-1.4
1 0 obj
<< /Title (JPSD Tax Certificate) /Creator (JPSD Global) >>
endobj
2 0 obj
<< /Type /Catalog /Pages 3 0 R >>
endobj
3 0 obj
<< /Type /Pages /Kids [4 0 R] /Count 1 >>
endobj
4 0 obj
<< /Type /Page /Parent 3 0 R /MediaBox [0 0 612 792] /Contents 5 0 R /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >> >>
endobj
5 0 obj
<< /Length 100 >>
stream
BT
/F1 24 Tf
100 700 Td
(TAX CERTIFICATE - JPSD GLOBAL) Tj
/F1 12 Tf
0 -30 Td
(Document ID: ${id}) Tj
0 -20 Td
(Status: Verified & Audited) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000078 00000 n 
0000000124 00000 n 
0000000183 00000 n 
0000000346 00000 n 
trailer
<< /Size 6 /Root 2 0 R >>
startxref
498
%%EOF`;

      const blob = new Blob([pdfContent], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Hide success toast after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
      
      {/* Success Notification Toast */}
      <AnimatePresence>
         {showSuccess && (
            <motion.div 
               initial={{ opacity: 0, y: -20, x: '-50%' }} animate={{ opacity: 1, y: 0, x: '-50%' }} exit={{ opacity: 0, y: -20, x: '-50%' }}
               className="fixed top-24 left-1/2 z-[3000] bg-[#1ea05f] text-white px-8 py-5 rounded-3xl shadow-2xl flex items-center gap-4 font-black italic uppercase tracking-widest text-[10px] border-4 border-white/20 backdrop-blur-xl"
            >
               <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-[#1ea05f] shadow-lg shadow-black/10"> <FiCheckCircle size={18}/> </div>
               Transmission Secure • Document Received
            </motion.div>
         )}
      </AnimatePresence>

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase underline decoration-[#1ea05f]/20 decoration-8 underline-offset-8">Tax Certificates</h2>
          <p className="text-slate-500 font-medium tracking-tight italic mt-2">Legal documentation of your global impact for fiscal compliance.</p>
        </div>
        <button 
           onClick={() => handleDownload('Unified-Certificate-G01')}
           className="px-8 py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl shadow-slate-200 hover:bg-[#1ea05f] active:scale-95 transition-all flex items-center gap-3 uppercase tracking-widest text-[11px] italic"
        >
          {downloadingId === 'Unified-Certificate-G01' ? <FiLoader className="animate-spin" size={18}/> : <FiZap className="text-amber-400"/>} 
          {downloadingId === 'Unified-Certificate-G01' ? 'Authenticating...' : 'Unified Certificate (G-01)'}
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Certificate List */}
        <div className="space-y-8 lg:col-span-1">
           {years.map((year, i) => (
             <motion.div 
                whileHover={{ y: -5 }}
                key={i} className="bg-white/90 backdrop-blur-md p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col justify-between h-56 group hover:border-[#1ea05f]/30 transition-all relative overflow-hidden"
             >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#1ea05f]/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform"></div>
                
                <div className="flex justify-between items-start relative z-10">
                   <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-[#1ea05f] group-hover:bg-white border border-slate-50 group-hover:border-[#1ea05f]/10 group-hover:shadow-2xl transition-all">
                      <FiFileText size={28} />
                   </div>
                   <div className="px-5 py-2.5 bg-[#f0f9f3] text-[#1ea05f] rounded-2xl border border-[#1ea05f]/10 flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#1ea05f] animate-pulse" />
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] italic">Verified Archive</span>
                   </div>
                </div>

                <div className="flex items-end justify-between relative z-10">
                   <div>
                      <h4 className="text-2xl font-black italic uppercase tracking-tighter text-slate-800">{year}</h4>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 flex items-center gap-2"> <FiActivity size={12}/> Current Status: Fully Computed</p>
                   </div>
                   <button 
                      onClick={() => handleDownload(year.replace(/\s+/g, '-'))}
                      disabled={downloadingId !== null}
                      className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all shadow-xl active:scale-90 ${downloadingId === year.replace(/\s+/g, '-') ? 'bg-[#1ea05f]/10 text-[#1ea05f]' : 'bg-slate-900 text-white hover:bg-[#1ea05f]'}`}
                   >
                      {downloadingId === year.replace(/\s+/g, '-') ? <FiLoader className="animate-spin" size={28} /> : <FiDownload size={28} />}
                   </button>
                </div>
             </motion.div>
           ))}
        </div>

        {/* Impact Sidebar */}
        <div className="lg:col-span-1 space-y-10">
           <section className="bg-slate-900 p-14 rounded-[4.5rem] text-white space-y-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1ea05f]/20 rounded-full blur-[120px] -mr-48 -mt-48" />
              <div className="w-16 h-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-[#1ea05f]"> <FiActivity size={32} /> </div>
              <h3 className="text-3xl font-black italic uppercase tracking-tighter leading-none underline decoration-[#1ea05f] decoration-4 underline-offset-8">Fiscal Transparency Calibration</h3>
              <p className="text-slate-400 font-medium text-sm leading-relaxed max-w-sm">
                 JPSD’s Shariah-compliant accounting system ensures 100% precision in tax-deductible contribution tracking. All certificates are FBR and IRS aligned.
              </p>
              <div className="grid grid-cols-2 gap-6 relative z-10">
                 <div className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] hover:bg-white/10 transition-colors group">
                    <p className="text-[10px] font-black text-[#1ea05f] uppercase tracking-widest mb-2 italic">Total Deductible</p>
                    <p className="text-3xl font-black group-hover:scale-105 transition-transform origin-left">RS 420,500</p>
                 </div>
                 <div className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] hover:bg-white/10 transition-colors group">
                    <p className="text-[10px] font-black text-[#1ea05f] uppercase tracking-widest mb-2 italic">Audited Deeds</p>
                    <p className="text-3xl font-black group-hover:scale-105 transition-transform origin-left">100%</p>
                 </div>
              </div>
           </section>

           <div className="bg-blue-50/50 p-12 rounded-[4rem] border border-blue-100/50 shadow-sm flex flex-col md:flex-row items-center gap-10 hover:bg-blue-50 transition-colors group">
              <div className="w-24 h-24 bg-white rounded-[2rem] shadow-xl flex items-center justify-center text-blue-500 group-hover:rotate-6 transition-transform">
                 <FiDownloadCloud size={48} />
              </div>
              <div className="flex-1 text-center md:text-left">
                 <h4 className="text-xl font-black text-slate-800 italic uppercase underline decoration-blue-200 underline-offset-4 mb-2">Mass Archive Retrieval</h4>
                 <p className="text-xs font-semibold text-slate-400 leading-relaxed max-w-[240px] italic">Download all lifetime certificates in a single encrypted vault.</p>
              </div>
              <button 
                 onClick={() => handleDownload('Full-Archive-JPSD')}
                 className="px-8 py-4 bg-white border-2 border-blue-100 text-blue-500 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all flex items-center gap-3 italic"
              >
                 {downloadingId === 'Full-Archive-JPSD' ? <FiLoader className="animate-spin" size={16}/> : <FiArrowUpRight size={16} />}
                 {downloadingId === 'Full-Archive-JPSD' ? 'RETRIEVING...' : 'INITIATE DOWNLOAD'}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
