// Event Filter Component
'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { EventType } from '@/types';

interface EventFilterProps {
  selectedType: EventType | 'all';
  selectedStatus: 'all' | 'upcoming' | 'ongoing' | 'completed';
  onTypeChange: (type: EventType | 'all') => void;
  onStatusChange: (status: 'all' | 'upcoming' | 'ongoing' | 'completed') => void;
}

export const EventFilter: React.FC<EventFilterProps> = ({
  selectedType,
  selectedStatus,
  onTypeChange,
  onStatusChange,
}) => {
  const { t } = useLanguage();

  const eventTypes = [
    { value: 'all', label: 'All Types' },
    { value: EventType.MEDICAL_CAMP, label: 'Medical Camp' },
    { value: EventType.FOOD_DRIVE, label: 'Food Drive' },
    { value: EventType.EDUCATION, label: 'Education' },
    { value: EventType.EMERGENCY, label: 'Emergency' },
    { value: EventType.OTHER, label: 'Other' },
  ];

  const statuses = [
    { value: 'all', label: 'All Statuses' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h3 className="text-lg font-bold text-[#2c3e50] mb-4">Filter Events</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value as EventType | 'all')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27ae60] focus:border-transparent"
          >
            {eventTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value as any)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27ae60] focus:border-transparent"
          >
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
