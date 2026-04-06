'use client';

import React, { useState } from 'react';
import { 
  FiMessageSquare, FiSend, FiPaperclip, FiMoreVertical, 
  FiSearch, FiActivity, FiShield, FiBell, FiZap, FiLogOut
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function VolunteerMessagesPage() {
  const [activeChat, setActiveChat] = useState('HQ-OPERATIONS');
  const [message, setMessage] = useState('');

  const chats = [
    { id: 'HQ-OPERATIONS', name: 'HQ Operations Unit', type: 'Operational', lastMsg: 'Ration distribution verified for Sector 7.', time: '14:20', unread: 2, online: true },
    { id: 'LOGISTICS-A', name: 'Logistics Center A', type: 'Support', lastMsg: 'Warehouse accessibility check required.', time: '10:45', unread: 0, online: true },
    { id: 'MEDICAL-D', name: 'Medical Division D', type: 'Tactical', lastMsg: 'Supplies reached the destination camp.', time: 'Yesterday', unread: 0, online: false },
    { id: 'FIELD-COMMS', name: 'Active Field Chat', type: 'Regional', lastMsg: 'Deployment protocol confirmed.', time: 'Yesterday', unread: 5, online: false },
    { id: 'HR-VOL', name: 'Volunteer Relations', type: 'Admin', lastMsg: 'Profile updated with new certification.', time: 'Oct 02', unread: 0, online: true },
  ];

  const messages = [
    { id: 1, sender: 'HQ Operations Unit', text: 'New deployment alert for Korangi district. Please review the briefing.', time: '14:15', isMe: false },
    { id: 2, sender: 'Me', text: 'Analyzing briefing material. Are we sending logistical support as well?', time: '14:16', isMe: true },
    { id: 3, sender: 'HQ Operations Unit', text: 'Yes. Three trucks have been deployed from Main Warehouse. Estimated arrival: 16:30.', time: '14:18', isMe: false },
    { id: 4, sender: 'HQ Operations Unit', text: 'Please ensure team B is ready for offloading on arrival.', time: '14:20', isMe: false },
    { id: 5, sender: 'Me', text: 'Understood. Team B is transitioning from logistics hub now.', time: '14:22', isMe: true },
  ];

  return (
    <div className="h-[calc(100vh-180px)] flex bg-white/70 backdrop-blur-md rounded-[4rem] border border-slate-200/50 shadow-sm overflow-hidden">
      {/* Sidebar Channels */}
      <aside className="w-96 border-r border-slate-100 flex flex-col">
        <div className="p-8 border-b border-slate-100 flex flex-col gap-6">
           <div className="flex items-center gap-3">
              <FiMessageSquare className="text-[#1ea05f]" size={24} />
              <h2 className="text-2xl font-black italic uppercase tracking-tighter text-slate-800">HQ Comms</h2>
           </div>
           <div className="relative group">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Secure lookup..." 
                className="w-full bg-slate-100/50 border border-transparent rounded-2xl py-3.5 pl-12 pr-4 text-xs font-bold text-slate-800 focus:bg-white focus:border-[#1ea05f] focus:outline-none transition-all"
              />
           </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
           {chats.map((chat) => (
             <button 
               key={chat.id}
               onClick={() => setActiveChat(chat.id)}
               className={`w-full p-5 rounded-[2rem] text-left transition-all flex items-center gap-4 ${activeChat === chat.id ? 'bg-slate-900 text-white shadow-2xl' : 'hover:bg-slate-50 text-slate-400'}`}
             >
                <div className="relative shrink-0">
                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black italic uppercase ${activeChat === chat.id ? 'bg-[#1ea05f] text-white' : 'bg-slate-100 text-slate-400'}`}>
                      {chat.name.charAt(0)}
                   </div>
                   {chat.online && (
                     <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#1ea05f] border-4 border-white rounded-full" />
                   )}
                </div>
                <div className="flex-1 min-w-0 pr-4">
                   <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-black uppercase tracking-widest leading-none truncate pr-2">{chat.name}</span>
                      <span className={`text-[8px] font-bold uppercase tracking-tighter ${activeChat === chat.id ? 'text-slate-500' : 'text-slate-300'}`}>{chat.time}</span>
                   </div>
                   <p className={`text-xs font-medium truncate mb-1 pr-6 italic ${activeChat === chat.id ? 'text-slate-300' : 'text-slate-400'}`}>{chat.lastMsg}</p>
                   <div className="flex items-center justify-between">
                      <span className={`text-[8px] font-black uppercase tracking-widest italic px-2 py-0.5 rounded-full ${activeChat === chat.id ? 'bg-white/10 text-[#1ea05f]' : 'bg-slate-100 text-slate-400'}`}>{chat.type}</span>
                      {chat.unread > 0 && (
                        <span className="bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-lg flex items-center justify-center shadow-lg shadow-red-500/20">{chat.unread}</span>
                      )}
                   </div>
                </div>
             </button>
           ))}
        </div>
      </aside>

      {/* Primary Communication Field */}
      <main className="flex-1 flex flex-col">
        {/* Active Header */}
        <header className="px-10 py-8 border-b border-slate-100 flex justify-between items-center">
           <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-[#1ea05f] text-lg font-black italic">
                 {activeChat.charAt(0)}
              </div>
              <div>
                 <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-950">Active Link: {activeChat}</h3>
                 <p className="text-[10px] font-black text-[#1ea05f] uppercase tracking-widest flex items-center gap-2">
                    <FiShield size={14} /> Encrypted Tactical Frequency (AES-256)
                 </p>
              </div>
           </div>
           <div className="flex gap-4">
              <button className="p-3 text-slate-400 hover:text-slate-900 bg-slate-100 group hover:bg-white border border-transparent hover:border-slate-200 rounded-xl transition-all">
                 <FiBell size={18} />
              </button>
              <button className="p-3 text-slate-400 hover:text-slate-900 bg-slate-100 group hover:bg-white border border-transparent hover:border-slate-200 rounded-xl transition-all">
                 <FiMoreVertical size={18} />
              </button>
           </div>
        </header>

        {/* Message Feed */}
        <div className="flex-1 overflow-y-auto p-10 space-y-8 bg-[#f8f9fa]/50">
           {messages.map((msg, i) => (
             <div key={i} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-6">{msg.sender} • <span className="opacity-60">{msg.time}</span></p>
                <div className={`max-w-xl p-6 rounded-[2rem] text-sm leading-relaxed shadow-sm ${msg.isMe ? 'bg-slate-900 text-white rounded-tr-none' : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none italic font-medium'}`}>
                   {msg.text}
                </div>
                {i === messages.length - 1 && !msg.isMe && (
                  <div className="flex gap-2 mt-4">
                     <button className="px-4 py-2 bg-slate-100 border border-slate-200/50 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-600 hover:bg-white transition-all">Confirmed Deployment</button>
                     <button className="px-4 py-2 bg-slate-100 border border-slate-200/50 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-600 hover:bg-white transition-all">Request Logistics Support</button>
                  </div>
                )}
             </div>
           ))}
        </div>

        {/* Tactical Input Unit */}
        <footer className="p-8 border-t border-slate-100">
           <form 
             onSubmit={(e) => { e.preventDefault(); setMessage(''); }}
             className="flex items-center gap-5 p-2 bg-slate-100/50 border border-slate-200/50 rounded-3xl group transition-all focus-within:bg-white focus-within:shadow-xl focus-within:shadow-slate-200/50"
           >
              <button type="button" className="p-5 text-slate-400 hover:text-slate-900 transition-all"><FiPaperclip size={20}/></button>
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Log tactical status or send engagement request..." 
                className="flex-1 bg-transparent border-none py-4 text-sm font-bold text-slate-800 placeholder:text-slate-400 placeholder:italic focus:outline-none"
              />
              <button 
                type="submit" 
                className="px-8 py-4 bg-slate-900 text-white rounded-[1.5rem] flex items-center gap-3 hover:bg-[#1ea05f] transition-all group/btn shadow-xl shadow-slate-900/10"
              >
                 <span className="text-[10px] font-black uppercase tracking-widest">Broadcast</span>
                 <FiSend className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
              </button>
           </form>
           <div className="flex justify-center mt-4">
              <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-400">
                 <FiActivity className="text-[#1ea05f]" /> Real-time Encryption Active
              </span>
           </div>
        </footer>
      </main>
    </div>
  );
}
