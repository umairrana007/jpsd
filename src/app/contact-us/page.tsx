'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { getGlobalConfig, type SiteSettings } from '@/lib/settings';
import { useAuth } from '@/contexts/AuthContext';

export default function ContactPage() {
  const { t } = useLanguage();
  const { setGlobalAlert } = useAuth();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    async function fetchSettings() {
      const config = await getGlobalConfig();
      setSettings(config);
    }
    fetchSettings();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalAlert('Communication Synced. Our regional hub commanders will reach out shortly.', 'success');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#f8f9fa] pt-32 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-[#2c3e50] mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with us. We're here to help and answer your questions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-[#2c3e50] mb-6">Get In Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="bg-[#27ae60]/10 p-3 rounded-lg">
                    <FiMapPin className="text-2xl text-[#27ae60]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2c3e50] mb-1">Our Location</h3>
                    <p className="text-gray-600 whitespace-pre-line">
                      {settings?.address || 'Jamiyat House, 9 Faran Society,\nHyder Ali Road,\nKarachi, Pakistan'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="bg-[#2980b9]/10 p-3 rounded-lg">
                    <FiPhone className="text-2xl text-[#2980b9]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2c3e50] mb-1">Phone Number</h3>
                    <p className="text-gray-600">
                      <a href={`tel:${settings?.contactPhone || '+922134135826'}`} className="hover:text-[#2980b9]">
                        {settings?.contactPhone || '(+92) 21 34135826 - 29'}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="bg-[#f39c12]/10 p-3 rounded-lg">
                    <FiMail className="text-2xl text-[#f39c12]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2c3e50] mb-1">Email Address</h3>
                    <p className="text-gray-600">
                      <a href={`mailto:${settings?.contactEmail || 'info@jpsd.org.pk'}`} className="hover:text-[#f39c12]">
                        {settings?.contactEmail || 'info@jpsd.org.pk'}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="bg-[#27ae60]/10 p-3 rounded-lg">
                    <FiMail className="text-2xl text-[#27ae60]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2c3e50] mb-1">Web Address</h3>
                    <p className="text-gray-600">
                      <a href="http://jpsd.org.pk" target="_blank" rel="noopener noreferrer" className="hover:text-[#27ae60]">
                        http://jpsd.org.pk
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="font-bold text-[#2c3e50] mb-4">Follow Us on Social Media</h3>
                <div className="flex space-x-4 rtl:space-x-reverse">
                  <a href="https://www.facebook.com/jpsd.official" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Facebook
                  </a>
                  <a href="https://www.instagram.com/jpsd.media/" target="_blank" rel="noopener noreferrer" className="bg-pink-600 text-white p-3 rounded-lg hover:bg-pink-700 transition-colors">
                    Instagram
                  </a>
                  <a href="https://www.youtube.com/channel/UC93l50wypcsmOG-wn_BHPIg" target="_blank" rel="noopener noreferrer" className="bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition-colors">
                    YouTube
                  </a>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.6986960999997!2d67.06746631497216!3d24.84429798407599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f3c7c2c2c2d%3A0x6c2c2c2c2c2c2c2c!2sDHA%20Phase%204%2C%20Karachi!5e0!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                className="w-full h-full"
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-[#2c3e50] mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  id="contact-name"
                />

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  id="contact-email"
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+92-XXX-XXXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  id="contact-phone"
                />

                <Input
                  label="Subject"
                  placeholder="What is this regarding?"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  id="contact-subject"
                />

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-[#2c3e50] mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27ae60] focus:border-transparent transition-all resize-none"
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full">
                  <FiSend className="mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Additional Contact Options */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid md:grid-cols-3 gap-6"
        >
          <div className="bg-gradient-to-br from-[#27ae60] to-[#27ae60]/80 text-white rounded-xl p-6 text-center">
            <h3 className="text-xl font-bold mb-2">Emergency Hotline</h3>
            <p className="text-3xl font-bold mb-2">111-298-111</p>
            <p className="text-sm opacity-90">Available 24/7 for emergencies</p>
          </div>

          <div className="bg-gradient-to-br from-[#2980b9] to-[#2980b9]/80 text-white rounded-xl p-6 text-center">
            <h3 className="text-xl font-bold mb-2">WhatsApp Support</h3>
            <p className="text-3xl font-bold mb-2">+92-300-1234567</p>
            <p className="text-sm opacity-90">Quick response on WhatsApp</p>
          </div>

          <div className="bg-gradient-to-br from-[#f39c12] to-[#f39c12]/80 text-white rounded-xl p-6 text-center">
            <h3 className="text-xl font-bold mb-2">Volunteer Coordination</h3>
            <p className="text-3xl font-bold mb-2">+92-21-3456789</p>
            <p className="text-sm opacity-90">Join our volunteer network</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
