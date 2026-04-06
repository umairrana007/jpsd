import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  percentage: number;
  goalAmount?: number;
  raisedAmount?: number;
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  goalAmount = 0,
  raisedAmount = 0,
  showLabels = false,
  size = 'md',
  className = '',
}) => {
  const heights = {
    sm: 'h-1.5',
    md: 'h-3',
    lg: 'h-5',
  };

  const safePercentage = isNaN(percentage) ? 0 : Number(percentage);
  const safeRaised = isNaN(raisedAmount) ? 0 : Number(raisedAmount);
  const safeGoal = isNaN(goalAmount) ? 0 : Number(goalAmount);

  const formatAmount = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)}K`;
    }
    return amount.toString();
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabels && safeGoal > 0 && (
        <div className="flex justify-between mb-3 items-end">
          <div className="flex flex-col">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">Collection</p>
            <p className="text-xl font-black text-[#1ea05f] leading-none">${formatAmount(safeRaised)}</p>
          </div>
          <div className="text-right flex flex-col items-end">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">Target</p>
            <p className="text-xl font-black text-slate-300 leading-none">${formatAmount(safeGoal)}</p>
          </div>
        </div>
      )}
      
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${heights[size]}`}>
        <motion.div
          className={`h-full rounded-full ${
            percentage >= 100 
              ? 'bg-[#1ea05f]' 
              : 'bg-gradient-to-r from-[#1ea05f] to-[#3b82f6]'
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(safePercentage, 100)}%` }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      
      {showLabels && (
        <div className="mt-3 flex justify-between items-center">
          <motion.p 
            className="text-[11px] font-black text-[#1ea05f] uppercase tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {safePercentage.toFixed(0)}% FUNDED
          </motion.p>
          {percentage >= 100 && (
            <motion.span
              className="text-[9px] font-black text-white bg-[#1ea05f] px-2.5 py-1 rounded-lg uppercase tracking-tighter"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1.5, type: 'spring' }}
            >
              MISSION ACCOMPLISHED!
            </motion.span>
          )}
        </div>
      )}
    </div>
  );
};
