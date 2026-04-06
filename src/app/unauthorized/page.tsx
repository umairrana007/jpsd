'use client';

import React from 'react';
import Link from 'next/link';
import { FiShield, FiAlertTriangle, FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-2xl shadow-slate-200 text-center border border-slate-100"
      >
        <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center text-red-500 mx-auto mb-8 shadow-inner">
          <FiShield size={40} />
        </div>
        
        <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tight mb-4">Tactical Access Denied</h1>
        <p className="text-slate-500 mb-10 leading-relaxed font-medium">
          Your current credentials do not have authorization to access the HQ Command Center. Please contact a Super Admin for clearance.
        </p>

        <div className="space-y-4">
          <Link href="/">
            <button className="w-full py-4 bg-slate-800 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-700 transition-all">
              <FiArrowLeft /> Return to Extraction Point
            </button>
          </Link>
          
          <Link href="/login">
            <button className="w-full py-4 bg-white text-slate-400 border border-slate-200 rounded-2xl font-bold hover:text-slate-800 hover:border-slate-800 transition-all text-sm uppercase tracking-widest">
              Re-authenticate Identity
            </button>
          </Link>
        </div>
        
        <div className="mt-12 flex items-center justify-center gap-2 text-[10px] font-black text-red-400 uppercase tracking-widest opacity-50">
          <FiAlertTriangle /> Unauthorized Access Attempt Logged
        </div>
      </motion.div>
    </div>
  );
}
