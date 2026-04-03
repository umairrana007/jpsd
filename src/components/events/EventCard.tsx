// Event Card Component
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Event, EventStatus, EventType } from '@/types';
import Image from 'next/image';
import { FiMapPin, FiCalendar, FiUsers, FiClock } from 'react-icons/fi';

interface EventCardProps {
  event: Event;
  onRegister: (event: Event) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onRegister }) => {
  const { t } = useLanguage();
  const [imgError, setImgError] = useState(false);

  const getStatusStyles = (status: EventStatus) => {
    switch (status) {
      case EventStatus.UPCOMING:
        return 'bg-blue-500 text-white shadow-blue-100';
      case EventStatus.ONGOING:
        return 'bg-[#1ea05f] text-white shadow-green-100';
      case EventStatus.COMPLETED:
        return 'bg-slate-400 text-white shadow-slate-100';
      case EventStatus.CANCELLED:
        return 'bg-red-500 text-white shadow-red-100';
      default:
        return 'bg-slate-500 text-white shadow-slate-100';
    }
  };

  const getTypeLabel = (type: EventType) => {
    return type.replace('_', ' ').toUpperCase();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -10 }}
      className="group bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100 transition-all duration-500 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={imgError ? '/images/jpsd_main.jpg' : event.image}
          alt={event.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          onError={() => setImgError(true)}
          priority={event.status === EventStatus.UPCOMING}
          quality={75}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
        
        {/* Status Badge */}
        <div className="absolute top-6 right-6">
          <div className={`${getStatusStyles(event.status)} px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg`}>
            {event.status}
          </div>
        </div>

        {/* Date Overlay */}
        <div className="absolute bottom-6 left-6 flex items-center space-x-3">
          <div className="bg-white/95 backdrop-blur-sm p-2 rounded-2xl shadow-xl flex flex-col items-center justify-center min-w-[50px]">
            <span className="text-sm font-black text-[#0f172a] leading-none mb-0.5">{new Date(event.startDate).getDate()}</span>
            <span className="text-[10px] font-bold text-[#1ea05f] uppercase tracking-tighter">{new Date(event.startDate).toLocaleDateString('en-US', { month: 'short' })}</span>
          </div>
          <div className="text-white">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-0.5">Starting At</p>
            <p className="text-sm font-black tracking-tight">{new Date(event.startDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="mb-4">
          <span className="text-[10px] font-black text-[#1ea05f] uppercase tracking-widest bg-[#1ea05f]/5 px-3 py-1 rounded-lg">
            {getTypeLabel(event.type)}
          </span>
        </div>

        <h3 className="text-2xl font-black text-[#0f172a] mb-4 leading-tight group-hover:text-[#1ea05f] transition-colors">{event.title}</h3>
        <p className="text-slate-500 text-sm font-medium mb-8 line-clamp-2 leading-relaxed opacity-80">{event.description}</p>

        {/* Meta Info Grid */}
        <div className="mt-auto space-y-5">
          <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-[#1ea05f]">
                <FiMapPin className="text-sm" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Location</span>
                <span className="text-xs font-black text-[#0f172a] line-clamp-1">{event.location}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-[#1ea05f]">
                <FiUsers className="text-sm" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Participants</span>
                <span className="text-xs font-black text-[#0f172a]">{event.currentParticipants}/{event.maxParticipants}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between bg-slate-50 p-4 rounded-3xl">
            <div className="flex items-center space-x-2.5">
              <FiClock className="text-[#e74c3c]" />
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Deadline: <span className="text-[#e74c3c] font-black">{new Date(event.registrationDeadline).toLocaleDateString()}</span></span>
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <Button
              variant="primary"
              size="md"
              onClick={() => onRegister(event)}
              className="flex-1 !rounded-2xl !py-4 font-black tracking-widest shadow-lg shadow-[#1ea05f]/10"
              disabled={event.status !== EventStatus.UPCOMING && event.status !== EventStatus.ONGOING}
            >
              {event.status === EventStatus.ONGOING ? 'JOIN NOW ➔' : 'RESERVE SPOT ➔'}
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(event.address)}`, '_blank')}
              className="w-14 !rounded-2xl !p-0 flex items-center justify-center border-slate-100 hover:bg-[#1ea05f]/5"
            >
              <FiMapPin className="text-lg" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
