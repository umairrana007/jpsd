'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FiMessageSquare, FiX, FiSend, FiMinimize2, FiMaximize2, FiCpu, FiGlobe } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatMessage {
  text: string;
  sender: 'bot' | 'user';
  timestamp?: Date;
}

interface KnowledgeItem {
  keywords: string[];
  response: string;
}

const BOT_KNOWLEDGE: Record<'en' | 'ur', KnowledgeItem[]> = {
  en: [
    { keywords: ['register', 'join', 'volunteer'], response: "To join as a volunteer, complete the 3-step registration. Admin approval takes 24-48 hours." },
    { keywords: ['event', 'mission'], response: "Check the 'Operational Feed' in your dashboard or browse 'Events' in the main menu to see active missions." },
    { keywords: ['certificate', 'hours'], response: "Certificates are automatically generated once you log 40+ operational hours." },
    { keywords: ['zakat', 'calc'], response: "Our Zakat Calculator is available publicly. You don't need to register to use it or to make a donation." },
    { keywords: ['donor', 'doner', 'donate', 'contribution'], response: "Registration is NOT mandatory for donors. You can donate as a guest via Bank Transfer or online payment by selecting any campaign in the 'Causes' section." },
    { keywords: ['contact', 'email', 'offices'], response: "You can reach JPSD HQ at info@jpsd.org or visit our regional hub at Baitussalam Complex for field coordination." },
    { keywords: ['jpsd', 'who', 'jamiyat'], response: "Jamiyat Punjabi Saudagran-e-Delhi (JPSD) is a premier humanitarian organization dedicated to education, welfare, and spiritual empowerment since 1947." },
  ],
  ur: [
    { keywords: ['رجسٹریشن', 'شامل', 'رضا کار'], response: "بطور رضا کار شامل ہونے کے لیے 3 مراحل کی رجسٹریشن مکمل کریں۔ ایڈمن کی منظوری میں 24 سے 48 گھنٹے لگتے ہیں۔" },
    { keywords: ['ایونٹ', 'مشن'], response: "فعال مشنز دیکھنے کے لیے اپنے ڈیش بورڈ میں 'آپریشنل فیڈ' یا مین مینو میں 'Events' چیک کریں۔" },
    { keywords: ['سرٹیفکیٹ', 'گھنٹے'], response: "سرٹیفکیٹ 40+ گھنٹے مکمل ہونے کے بعد خود بخود تیار ہو جاتے ہیں۔" },
    { keywords: ['زکوٰۃ'], response: "ہمارا زکوٰۃ کیلکولیٹر سب کے لیے ہے، اسے استعمال کرنے یا عطیہ دینے کے لیے رجسٹریشن کی ضرورت نہیں ہے۔" },
    { keywords: ['عطیہ', 'ڈونر', 'مدد'], response: "چیریٹی کے لیے رجسٹریشن لازمی نہیں ہے۔ آپ بطور 'Guest' بینک ٹرانسفر یا آن لائن پیمنٹ کے ذریعے کسی بھی مہم میں حصہ لے سکتے ہیں۔" },
    { keywords: ['رابطہ', 'ای میل', 'دفتر'], response: "آپ ہمیں info@jpsd.org پر ای میل کر سکتے ہیں یا بیت السلام کمپلیکس میں ہمارے علاقائی مرکز کا دورہ کر سکتے ہیں۔" },
    { keywords: ['جے پی ایس ڈی', 'جمیعت'], response: "جمیعت پنجابی سوداگرانِ دہلی (JPSD) ایک انسانی فلاحی تنظیم ہے جو 1947 سے تعلیم، فلاح و بہبود اور روحانی بااختیار بنانے کے لیے وقف ہے۔" },
  ]
};

export default function BilingualChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [lang, setLang] = useState<'en' | 'ur'>('en');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { text: "Assalam-o-Alaikum! I am JPSD HQ Intelligence. How can I assist your mission today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Tactical Intelligence Response
    setTimeout(() => {
      let response = lang === 'en' 
        ? "I am analyzing your tactical request. Please contact HQ for specific manual overrides." 
        : "میں آپ کی درخواست کا تجزیہ کر رہا ہوں۔ براہ کرم مخصوص رہنمائی کے لیے ہیڈ کوارٹر سے رابطہ کریں۔";

      const knowledgeBase = BOT_KNOWLEDGE[lang];
      for (const item of knowledgeBase) {
        if (item.keywords.some((k: string) => input.toLowerCase().includes(k))) {
          response = item.response;
          break;
        }
      }

      setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
    }, 800);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[200]">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 45 }}
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 bg-[#1ea05f] rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all group border-4 border-white"
          >
            <FiMessageSquare size={24} />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
          </motion.button>
        )}
 
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={`bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col transition-all ${minimized ? 'h-20 w-80' : 'h-[550px] w-[360px] max-w-[calc(100vw-4rem)] max-h-[70vh]'}`}
          >
            {/* Header */}
            <div className={`p-6 bg-slate-900 text-white flex items-center justify-between transition-all ${minimized ? 'bg-[#1ea05f]' : ''}`}>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#1ea05f]/20 flex items-center justify-center text-[#1ea05f]">
                  <FiCpu size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-black italic uppercase tracking-widest leading-none">HQ Intelligence</h4>
                  {!minimized && <p className="text-[9px] font-bold text-[#1ea05f] uppercase tracking-widest mt-1">Status: Operational</p>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
                  className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
                >
                  <FiGlobe size={14} />
                </button>
                <button 
                  onClick={() => setMinimized(!minimized)}
                  className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
                >
                  {minimized ? <FiMaximize2 size={14} /> : <FiMinimize2 size={14} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/40 transition-all"
                >
                  <FiX size={14} />
                </button>
              </div>
            </div>

            {!minimized && (
              <>
                <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50/50">
                  {messages.map((m, i) => (
                    <motion.div
                      initial={{ opacity: 0, x: m.sender === 'user' ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={i}
                      className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] p-4 rounded-3xl text-sm font-medium shadow-sm ${m.sender === 'user' ? 'bg-[#1ea05f] text-white rounded-br-none' : 'bg-white text-slate-800 rounded-bl-none border border-slate-100'} ${lang === 'ur' ? 'urdu-text' : ''}`}>
                        {m.text}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="p-6 bg-white border-t border-slate-100 flex items-center gap-3">
                  <input
                    type="text"
                    placeholder={lang === 'en' ? "Type your mission-critical query..." : "اپنی درخواست یہاں لکھیں..."}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className={`flex-1 bg-slate-100 border-none rounded-2xl py-4 px-6 text-sm font-medium focus:ring-2 focus:ring-[#1ea05f]/20 transition-all ${lang === 'ur' ? 'urdu-text' : ''}`}
                  />
                  <button 
                    onClick={handleSend}
                    className="w-12 h-12 bg-[#1ea05f] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-[#1ea05f]/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    <FiSend size={18} />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
