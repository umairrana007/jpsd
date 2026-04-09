'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiUser, FiPhone, FiCreditCard, FiX, FiArrowRight } from 'react-icons/fi';
import { searchUsers } from '@/lib/firebaseUtils';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from '@/types';

export default function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length >= 3) {
        setLoading(true);
        const data = await searchUsers(query);
        setResults(data);
        setLoading(false);
        setIsOpen(true);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="relative w-full px-4 mb-6" ref={searchRef}>
      <div className="relative group">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1ea05f] transition-colors" />
        <input
          type="text"
          placeholder="Search CNIC, Phone, Email..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-slate-100/50 border border-slate-200/50 rounded-2xl py-3 pl-12 pr-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#1ea05f]/20 focus:bg-white transition-all"
        />
        {query && (
          <button 
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <FiX size={14} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute left-4 right-4 mt-2 bg-white rounded-3xl border border-slate-100 shadow-2xl z-[100] max-h-96 overflow-y-auto overflow-x-hidden p-2"
          >
            {loading ? (
              <div className="p-8 text-center">
                <div className="w-6 h-6 border-2 border-[#1ea05f] border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-1">
                {results.map((user) => (
                  <div 
                    key={user.id}
                    className="p-4 hover:bg-slate-50 rounded-2xl cursor-pointer flex items-center gap-4 group transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-[#1ea05f]/10 group-hover:text-[#1ea05f] transition-all">
                      <FiUser size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-800 truncate">{user.name}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                          <FiPhone size={10} /> {user.phone || 'No Phone'}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] text-slate-400 font-medium uppercase">
                          <FiCreditCard size={10} /> {user.role}
                        </span>
                      </div>
                    </div>
                    <FiArrowRight className="text-slate-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center space-y-2">
                <p className="text-sm font-bold text-slate-400">No Intelligence Found</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest">Refine your tactical search parameters</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
