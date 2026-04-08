'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertCircle, FiCheckCircle, FiInfo, FiX } from 'react-icons/fi';

export type AlertType = 'success' | 'error' | 'info';

interface CustomAlertProps {
  isOpen: boolean;
  message: string;
  type?: AlertType;
  onClose: () => void;
  title?: string;
}

export const CustomAlert: React.FC<CustomAlertProps> = ({ 
  isOpen, 
  message, 
  type = 'info', 
  onClose,
  title 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[9999] p-6">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-[3rem] p-10 max-w-sm w-full shadow-2xl relative overflow-hidden text-center border border-slate-100"
          >
            <div className={`absolute top-0 left-0 w-full h-2 ${
              type === 'error' ? 'bg-red-500' : 
              type === 'success' ? 'bg-[#1ea05f]' : 'bg-blue-500'
            }`} />
            
            <div className="space-y-6">
              <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center ${
                type === 'error' ? 'bg-red-50 text-red-500' : 
                type === 'success' ? 'bg-[#1ea05f]/10 text-[#1ea05f]' : 'bg-blue-50 text-blue-500'
              }`}>
                {type === 'error' ? <FiX size={40} /> : 
                 type === 'success' ? <FiCheckCircle size={40} /> : <FiInfo size={40} />}
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-800">
                  {title || (type === 'error' ? 'Critical Halt' : type === 'success' ? 'System Success' : 'Information')}
                </h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-relaxed">
                  {message}
                </p>
              </div>

              <button 
                onClick={onClose}
                className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20"
              >
                Acknowledge Directive
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
