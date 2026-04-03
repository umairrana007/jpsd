'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export default function TimelinePage() {
  const milestones = [
    { year: '2010', title: 'Foundation', description: 'Jamiyat Punjabi Saudagran-e-Delhi (JPSD) was established with a mission to serve humanity.' },
    { year: '2012', title: 'First School', description: 'Opened our first educational institution serving 500 students.' },
    { year: '2014', title: 'Healthcare Initiative', description: 'Launched free medical camps and ambulance services.' },
    { year: '2016', title: 'Dastarkhwan Program', description: 'Started daily food distribution across Karachi.' },
    { year: '2018', title: 'Water Projects', description: 'Installed 100+ water filtration plants nationwide.' },
    { year: '2020', title: 'COVID Relief', description: 'Served millions during the pandemic with rations and medical care.' },
    { year: '2022', title: 'Flood Relief', description: 'Major relief operations for flood-affected families.' },
    { year: '2024', title: 'Digital Transformation', description: 'Launched online donation platform and digital services.' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#f8f9fa] pt-32 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-[#2c3e50] mb-4">Our Journey</h1>
          <p className="text-xl text-gray-600">Milestones and Achievements Through the Years</p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#27ae60] to-[#2980b9]" />

          {/* Timeline Items */}
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative mb-8 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}
            >
              <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12' : 'pl-12 ml-auto'}`}>
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#27ae60]">
                  <span className="inline-block bg-[#27ae60] text-white px-4 py-1 rounded-full text-sm font-bold mb-2">
                    {milestone.year}
                  </span>
                  <h3 className="text-2xl font-bold text-[#2c3e50] mb-2">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
              
              {/* Timeline Dot */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-[#27ae60] rounded-full" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-16"
        >
          <Button variant="primary" onClick={() => window.location.href = '/donation'}>
            Be Part of Our Story
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
