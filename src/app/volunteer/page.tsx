'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { FiUsers, FiHeart, FiClock, FiCheck } from 'react-icons/fi';

export default function VolunteerPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cnic: '',
    address: '',
    skills: '',
    availability: 'weekends',
    experience: '',
    emergencyContact: '',
    community: '', // Community-Biradri
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for registering as a volunteer! We will contact you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      cnic: '',
      address: '',
      skills: '',
      availability: 'weekends',
      experience: '',
      emergencyContact: '',
      community: '',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#f8f9fa] pt-32 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-[#2c3e50] mb-4">Be a Volunteer</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our network of dedicated volunteers making a real difference in people's lives
          </p>
        </motion.div>

        {/* Why Volunteer Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-[#2c3e50] text-center mb-12">Why be a Volunteer with us?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: FiHeart,
                title: 'Make an Impact',
                description: 'Directly contribute to transforming lives and communities',
                color: '#e74c3c',
              },
              {
                icon: FiUsers,
                title: 'Join a Community',
                description: 'Be part of a passionate team of like-minded individuals',
                color: '#27ae60',
              },
              {
                icon: FiClock,
                title: 'Flexible Hours',
                description: 'Volunteer at your convenience - weekends or weekdays',
                color: '#f39c12',
              },
              {
                icon: FiCheck,
                title: 'Skill Development',
                description: 'Gain valuable experience and develop new skills',
                color: '#2980b9',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow text-center"
              >
                <div 
                  className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  <item.icon className="text-3xl" style={{ color: item.color }} />
                </div>
                <h3 className="text-xl font-bold text-[#2c3e50] mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Volunteer Opportunities */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-[#2c3e50] text-center mb-12">
            Volunteer Opportunities
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Education Support',
                titleUrdu: 'تعلیمی امداد',
                description: 'Teach underprivileged children, tutor students, or help with educational programs',
                requirements: ['Teaching experience preferred', 'Patience and dedication', 'Weekend availability'],
              },
              {
                title: 'Medical Camps',
                titleUrdu: 'طبی کیمپ',
                description: 'Assist in organizing and running free medical camps and health awareness programs',
                requirements: ['Medical background helpful', 'Organizational skills', 'Empathy for patients'],
              },
              {
                title: 'Food Distribution',
                titleUrdu: 'خوراک کی تقسیم',
                description: 'Help distribute food packages and manage Dastarkhwan programs',
                requirements: ['Physical stamina', 'Team player', 'Early morning availability'],
              },
              {
                title: 'Administrative Support',
                titleUrdu: 'انتظامی امداد',
                description: 'Support office operations, data entry, and coordination activities',
                requirements: ['Computer literacy', 'Communication skills', 'Regular time commitment'],
              },
              {
                title: 'Event Management',
                titleUrdu: 'تقریب کا انتظام',
                description: 'Plan and execute fundraising events, campaigns, and community programs',
                requirements: ['Creative thinking', 'Leadership abilities', 'Event planning experience'],
              },
              {
                title: 'Technical Support',
                titleUrdu: 'تکنیکی امداد',
                description: 'Provide IT support, manage social media, or help with digital initiatives',
                requirements: ['Technical expertise', 'Digital marketing knowledge', 'Portfolio of work'],
              },
            ].map((opportunity, index) => (
              <motion.div
                key={opportunity.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#27ae60]"
              >
                <h3 className="text-2xl font-bold text-[#2c3e50] mb-1">{opportunity.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{opportunity.titleUrdu}</p>
                <p className="text-gray-700 mb-4">{opportunity.description}</p>
                <div>
                  <p className="font-semibold text-[#2c3e50] mb-2 text-sm">Requirements:</p>
                  <ul className="space-y-1">
                    {opportunity.requirements.map((req, i) => (
                      <li key={i} className="text-gray-600 text-sm flex items-start">
                        <span className="text-[#27ae60] mr-2 rtl:mr-0 rtl:ml-2">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Registration Form */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mb-16"
        >
          <div className="bg-white rounded-xl shadow-xl p-8 md:p-12">
            <h2 className="text-4xl font-bold text-[#2c3e50] text-center mb-8">
              Volunteer Registration Form
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  id="volunteer-name"
                />

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  id="volunteer-email"
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+92-XXX-XXXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  id="volunteer-phone"
                />

                <Input
                  label="CNIC Number"
                  placeholder="XXXXX-XXXXXXX-X"
                  value={formData.cnic}
                  onChange={(e) => setFormData({ ...formData, cnic: e.target.value })}
                  id="volunteer-cnic"
                />

                <Input
                  label="Community-Biradri"
                  placeholder="Enter your community/biradri"
                  value={formData.community}
                  onChange={(e) => setFormData({ ...formData, community: e.target.value })}
                  id="volunteer-community"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-semibold text-[#2c3e50] mb-2">
                  Address
                </label>
                <textarea
                  id="address"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27ae60] focus:border-transparent transition-all resize-none"
                  placeholder="Your complete address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="skills" className="block text-sm font-semibold text-[#2c3e50] mb-2">
                    Skills & Expertise
                  </label>
                  <textarea
                    id="skills"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27ae60] focus:border-transparent transition-all resize-none"
                    placeholder="List your skills, qualifications, and areas of expertise"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-semibold text-[#2c3e50] mb-2">
                    Previous Volunteer Experience
                  </label>
                  <textarea
                    id="experience"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27ae60] focus:border-transparent transition-all resize-none"
                    placeholder="Describe any previous volunteer work or relevant experience"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="availability" className="block text-sm font-semibold text-[#2c3e50] mb-2">
                    Availability
                  </label>
                  <select
                    id="availability"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27ae60] focus:border-transparent transition-all"
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  >
                    <option value="weekdays">Weekdays (Monday-Friday)</option>
                    <option value="weekends">Weekends (Saturday-Sunday)</option>
                    <option value="evenings">Evenings Only</option>
                    <option value="flexible">Flexible Schedule</option>
                    <option value="fulltime">Full-time Available</option>
                  </select>
                </div>

                <Input
                  label="Emergency Contact Number"
                  type="tel"
                  placeholder="+92-XXX-XXXXXXX"
                  value={formData.emergencyContact}
                  onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                  required
                  id="volunteer-emergency"
                />
              </div>

              <div className="bg-[#f8f9fa] p-6 rounded-lg">
                <p className="text-sm text-gray-600 mb-4">
                  By submitting this form, you agree to:
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <input type="checkbox" required className="mt-1 mr-2 rtl:mr-0 rtl:ml-2" />
                    Participate in volunteer orientation and training sessions
                  </li>
                  <li className="flex items-start">
                    <input type="checkbox" required className="mt-1 mr-2 rtl:mr-0 rtl:ml-2" />
                    Follow JPSD's code of conduct and policies
                  </li>
                  <li className="flex items-start">
                    <input type="checkbox" required className="mt-1 mr-2 rtl:mr-0 rtl:ml-2" />
                    Commit to the agreed schedule and responsibilities
                  </li>
                </ul>
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full">
                Submit Application
              </Button>

              <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                 <p className="text-sm text-[#27ae60] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                    <FiCheck className="text-xl" /> Registered at JPSD
                 </p>
              </div>
            </form>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="bg-gradient-to-r from-[#27ae60] to-[#2980b9] text-white rounded-xl p-12 text-center"
        >
          <h2 className="text-4xl font-bold mb-4">Have Questions?</h2>
          <p className="text-xl mb-8 opacity-90">
            Contact our volunteer coordination team at{' '}
            <a href="tel:+92-21-111-298-111" className="underline font-bold">
              +92-21-111-298-111
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

