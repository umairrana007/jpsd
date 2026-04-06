'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';

const faqs = [
  {
    question: "How can I donate to a specific cause?",
    answer: "You can visit our donation page and select the specific program or cause you want to support from the dropdown menu. We accept online payments, bank transfers, and wire transfers."
  },
  {
    question: "Is my donation tax-deductible?",
    answer: "Yes, Jamiyat Punjabi Saudagran-e-Delhi (JPSD) is a registered non-profit organization, and all donations are eligible for tax exemption according to local regulations."
  },
  {
    question: "Do you have Shariah compliance certificates?",
    answer: "Yes, all our welfare activities and fund management practices are strictly monitored and certified by leading Shariah scholars."
  },
  {
    question: "How can I become a volunteer?",
    answer: "You can fill out the 'Become a Volunteer' form on our website. Once submitted, our team will review your application and contact you for orientation."
  }
];

const FAQItem = ({ question, answer, i }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      className={`mb-6 rounded-[2.5rem] overflow-hidden transition-all duration-500 border ${isOpen ? 'bg-white shadow-2xl shadow-[#1ea05f]/10 border-[#1ea05f]/20' : 'bg-white/50 border-slate-100 hover:border-[#1ea05f]/30 hover:bg-white'}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-8 md:p-10 text-left focus:outline-none group"
      >
        <span className={`text-xl md:text-2xl font-black transition-colors duration-300 pr-8 ${isOpen ? 'text-[#1ea05f]' : 'text-slate-800'}`}>{question}</span>
        <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#1ea05f] text-white rotate-180 shadow-lg shadow-[#1ea05f]/30' : 'bg-slate-100 text-slate-400 group-hover:bg-[#1ea05f]/10 group-hover:text-[#1ea05f]'}`}>
          {isOpen ? <FiMinus className="text-2xl" /> : <FiPlus className="text-2xl" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="overflow-hidden"
          >
            <div className="p-8 md:p-10 pt-0 text-slate-500 leading-relaxed text-lg md:text-xl font-medium opacity-80">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const FAQSection: React.FC = () => {
  return (
    <section className="py-32 bg-[#fcfdfe] relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-[#1ea05f]/5 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center mb-20 space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#1ea05f] font-black tracking-[0.3em] uppercase text-xs mb-4 inline-block"
          >
            Got Questions?
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-[#0f172a] leading-[1.1] tracking-tight"
          >
            Support & <span className="text-[#1ea05f]">Information</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-500 font-medium max-w-2xl mx-auto opacity-70"
          >
            Everything you need to know about our operations, Shariah compliance, and how your contributions make a difference.
          </motion.p>
        </div>
        
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <FAQItem key={i} {...faq} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
