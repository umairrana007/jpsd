'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/Button';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#f8f9fa] pt-32 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-[#2c3e50] mb-4">About JPSD</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Jamiyat Punjabi Saudagar-e-Delhi - Bringing Hope, Changing Lives
          </p>
        </motion.div>

        {/* History Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-xl p-8 md:p-12 mb-16"
        >
          <h2 className="text-3xl font-bold text-[#2c3e50] mb-6">Our History</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Punjabi Saudagar Community are the businessmen from the time when the two nations were together as Sub-continent. 
            The trading activities were mainly in Delhi. After the partition, large number of our community members chose to live 
            in Karachi being an established city and near to the sea port.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The elders of our community established JPSD with the vision to help the newly migrated and assist the less/underprivileged 
            of the community in particular and the citizens of Pakistan in general. JPSD currently have branches in Lahore and Rawalpindi 
            with head office in Karachi.
          </p>
        </motion.section>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-[#27ae60]"
          >
            <h2 className="text-3xl font-bold text-[#27ae60] mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              To help the Delhi Saudagar Community and Citizens of Pakistan in improving the standards of living and where required 
              providing them resources be it through health services, financial assistance or employment.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-[#2980b9]"
          >
            <h2 className="text-3xl font-bold text-[#2980b9] mb-4">Our Services</h2>
            <ul className="text-gray-700 space-y-2">
              <li className="flex items-start">
                <span className="text-[#27ae60] mr-2">✓</span>
                Health Services
              </li>
              <li className="flex items-start">
                <span className="text-[#27ae60] mr-2">✓</span>
                Education Programs
              </li>
              <li className="flex items-start">
                <span className="text-[#27ae60] mr-2">✓</span>
                Zakat & Non-Zakat Assistance
              </li>
              <li className="flex items-start">
                <span className="text-[#27ae60] mr-2">✓</span>
                Graveyards & Service Van
              </li>
              <li className="flex items-start">
                <span className="text-[#27ae60] mr-2">✓</span>
                Rozgaar (Employment)
              </li>
              <li className="flex items-start">
                <span className="text-[#27ae60] mr-2">✓</span>
                Masjid & Madrassa Support
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Founders Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-[#2c3e50] text-center mb-8">Our Founders</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Abdul Khaliq Abdur Razzak', title: 'Founder' },
              { name: 'Haji Mohammad Rafi Shamsi', title: 'Founder' },
              { name: 'Sheikh Siddiq Chandna', title: 'Founder' }
            ].map((founder, index) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-gradient-to-br from-[#27ae60] to-[#2980b9] text-white p-6 rounded-xl shadow-lg text-center"
              >
                <div className="w-20 h-20 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                  {founder.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-bold mb-2">{founder.name}</h3>
                <p className="text-white/90">{founder.title}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Services Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-[#2c3e50] text-center mb-12">Our Key Services</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Health',
                titleUrdu: 'صحت',
                description: 'Providing comprehensive healthcare services including medical camps, medicines, and health awareness programs.',
                icon: '🏥',
                color: '#e74c3c',
              },
              {
                title: 'Education',
                titleUrdu: 'تعلیم',
                description: 'Supporting educational institutions, providing scholarships, and ensuring access to quality education for all.',
                icon: '📚',
                color: '#2980b9',
              },
              {
                title: 'Zakat Assistance',
                titleUrdu: 'زکوٰۃ کی مدد',
                description: 'Distributing Zakat funds to eligible families and individuals according to Islamic Shariah guidelines.',
                icon: '🤲',
                color: '#27ae60',
              },
              {
                title: 'Graveyards & Service Van',
                titleUrdu: 'قبرستان اور سروس وین',
                description: 'Managing graveyards and providing funeral services through dedicated service vans.',
                icon: '🚐',
                color: '#34495e',
              },
              {
                title: 'Rozgaar (Employment)',
                titleUrdu: 'روزگار',
                description: 'Creating employment opportunities and vocational training programs for community members.',
                icon: '💼',
                color: '#f39c12',
              },
              {
                title: 'Masjid & Madrassa',
                titleUrdu: 'مسجد اور مدرسہ',
                description: 'Supporting religious institutions and facilitating Islamic education in the community.',
                icon: '🕌',
                color: '#2ecc71',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow"
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4"
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#2c3e50] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{item.titleUrdu}</p>
                <p className="text-gray-700">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Annual Reports Section */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-[#2c3e50] text-center mb-8">Annual Reports & Publications</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-[#2c3e50] mb-4">📄 Annual Reports</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Annual Report 2024-2025</li>
                <li>• Annual Report 2022-2023</li>
                <li>• Annual Report 2021-2022</li>
                <li>• Annual Report 2019-2021</li>
                <li>• Annual Report 2018-2019</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-[#2c3e50] mb-4">📊 Audit Accounts</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Audit Account 2023-2024</li>
                <li>• Audit Account 2022-2023</li>
                <li>• Audit Account 2021-2022</li>
                <li>• Audit Account 2020-2021</li>
                <li>• Audit Account 2019-2020</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="bg-gradient-to-r from-[#27ae60] to-[#2980b9] text-white rounded-xl p-12 text-center"
        >
          <h2 className="text-4xl font-bold mb-4">Join JPSD in Serving Humanity</h2>
          <p className="text-xl mb-8 opacity-90">
            Your contribution can bring hope and change lives. Together, we can serve our community better.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              variant="gold" 
              size="lg"
              onClick={() => window.location.href = '/donation'}
            >
              Donate Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-white border-white hover:bg-white hover:text-[#27ae60]"
              onClick={() => window.location.href = '/volunteer'}
            >
              Become a Volunteer
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
