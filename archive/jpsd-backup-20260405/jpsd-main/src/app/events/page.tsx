'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { getEvents } from '@/lib/firebaseUtils';
import { Event, EventType, EventStatus } from '@/types';
import { EventCard } from '@/components/events/EventCard';
import { EventFilter } from '@/components/events/EventFilter';
import { RegistrationModal } from '@/components/events/RegistrationModal';
import { CardSkeleton } from '@/components/ui/Skeleton';
import { FiCalendar } from 'react-icons/fi';

export default function EventsPage() {
  const { t } = useLanguage();
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [selectedType, setSelectedType] = useState<EventType | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<EventStatus | 'all'>('all' as any);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await getEvents();
      setEvents(data);
      setFilteredEvents(data);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = [...events];

    if (selectedType !== 'all') {
      result = result.filter(e => e.type === selectedType);
    }

    if (selectedStatus !== 'all') {
      result = result.filter(e => e.status === selectedStatus as any);
    }

    setFilteredEvents(result);
  }, [selectedType, selectedStatus, events]);

  const handleRegister = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleSubmitRegistration = async (data: any) => {
    console.log('Registration:', data, 'for event:', selectedEvent?.id);
    alert('Registration successful! We will contact you soon.');
  };

  return (
    <div className="min-h-screen bg-[#fcfdfe] pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24 space-y-6">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#1ea05f] font-black tracking-[0.4em] uppercase text-xs"
          >
            Join The Movement
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black text-[#0f172a] leading-[1.1] tracking-tight"
          >
            Events & <span className="text-[#1ea05f]">Programs</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-500 font-medium max-w-2xl mx-auto opacity-70"
          >
            Be part of our impact. Join workshops, medical camps, and community drives to help those in need.
          </motion.p>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white rounded-[3rem] p-8 md:p-10 mb-16 shadow-2xl shadow-slate-200/40 border border-slate-50 gap-8">
          <EventFilter
            selectedType={selectedType}
            selectedStatus={selectedStatus as any}
            onTypeChange={setSelectedType}
            onStatusChange={setSelectedStatus as any}
          />
          
          <div className="bg-slate-50 p-2 rounded-[2rem] inline-flex">
            <button
              onClick={() => setViewMode('list')}
              className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 ${
                viewMode === 'list'
                  ? 'bg-white text-[#1ea05f] shadow-lg'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 ${
                viewMode === 'calendar'
                  ? 'bg-white text-[#1ea05f] shadow-lg'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Calendar
            </button>
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
            >
              {[...Array(6)].map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filteredEvents.length === 0 ? (
                <div className="text-center py-32 bg-white rounded-[4rem] shadow-sm border border-slate-50">
                  <div className="w-24 h-24 mx-auto bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6">
                    <FiCalendar className="w-12 h-12" />
                  </div>
                  <p className="text-2xl font-black text-[#0f172a] opacity-80">No events scheduled</p>
                  <p className="text-slate-400 font-medium mt-2">Check back later or adjust your filters.</p>
                </div>
              ) : viewMode === 'list' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  {filteredEvents.map((event) => (
                    <EventCard key={event.id} event={event} onRegister={handleRegister} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-[4rem] shadow-sm border border-slate-50 p-20 text-center">
                  <FiCalendar className="w-20 h-20 mx-auto text-slate-100 mb-8" />
                  <p className="text-2xl font-black text-[#0f172a] opacity-40 uppercase tracking-tighter">
                    Calendar view coming soon
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <RegistrationModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitRegistration}
      />
    </div>
  );
}
