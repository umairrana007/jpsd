'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle, FiX, FiInfo, FiAlertTriangle } from 'react-icons/fi';

interface GlobalAlertProps {
  message: string | null;
  type: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
}

export const GlobalAlert: React.FC<GlobalAlertProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  const config = {
    success: {
      icon: <FiCheckCircle className="text-[#1ea05f]" />,
      bg: 'bg-white',
      border: 'border-[#1ea05f]/20',
      accent: 'bg-[#1ea05f]',
      shadow: 'shadow-[#1ea05f]/20',
      label: 'Operation Success'
    },
    error: {
      icon: <FiAlertCircle className="text-red-500" />,
      bg: 'bg-white',
      border: 'border-red-500/20',
      accent: 'bg-red-500',
      shadow: 'shadow-red-500/20',
      label: 'System Breach/Error'
    },
    info: {
      icon: <FiInfo className="text-blue-500" />,
      bg: 'bg-white',
      border: 'border-blue-500/20',
      accent: 'bg-blue-500',
      shadow: 'shadow-blue-500/20',
      label: 'HQ Intelligence'
    },
    warning: {
      icon: <FiAlertTriangle className="text-amber-500" />,
      bg: 'bg-amber-50',
      border: 'border-amber-500/20',
      accent: 'bg-amber-500',
      shadow: 'shadow-amber-500/20',
      label: 'Tactical Warning'
    }
  };

  const style = config[type];

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
          className="fixed bottom-4 right-4 z-[9999] w-full max-w-sm"
        >
          <div className={`${style.bg} border ${style.border} p-5 rounded-[2rem] shadow-2xl ${style.shadow} backdrop-blur-xl relative overflow-hidden group`}>
            {/* Tactical Accent Bar */}
            <div className={`absolute top-0 left-0 w-1.5 h-full ${style.accent}`}></div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                {style.icon}
              </div>
              
              <div className="flex-1 pr-6">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">
                  {style.label}
                </p>
                <p className="text-sm font-bold text-slate-800 leading-tight">
                   {message}
                </p>
              </div>

              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-slate-300 hover:text-slate-800 transition-colors"
              >
                <FiX size={16} />
              </button>
            </div>

            {/* Progress Bar (Tactical) */}
            <motion.div 
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 3.5, ease: 'linear' }}
              className={`absolute bottom-0 left-0 h-1 ${style.accent} opacity-20`}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
