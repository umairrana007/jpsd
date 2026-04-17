'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPlus, FiTrash2, FiArrowUp, FiArrowDown, 
  FiEdit2, FiEye, FiSave, FiCheck, FiX,
  FiType, FiImage, FiSettings, FiRefreshCw
} from 'react-icons/fi';
import { updateSiteSettings } from '@/lib/settings/actions';
import { useAuth } from '@/contexts/AuthContext';
import { withAuth } from '@/components/admin/withAuth';
import { UserRole } from '@/types';

interface HomepageSection {
  id: string;
  type: 'hero' | 'stats' | 'programs' | 'events' | 'testimonials' | 'partners' | 'newsletter' | 'custom';
  title?: string;
  titleUr?: string;
  subtitle?: string;
  subtitleUr?: string;
  enabled: boolean;
  order: number;
  config?: Record<string, any>;
}

const AVAILABLE_SECTIONS: { type: HomepageSection['type']; label: string; labelUr: string; icon: string; }[] = [
  { type: 'hero', label: 'Hero Section', labelUr: 'ہیرو سیکشن', icon: '🎯' },
  { type: 'stats', label: 'Statistics', labelUr: 'اعداد و شمار', icon: '📊' },
  { type: 'programs', label: 'Programs', labelUr: 'پروگرامز', icon: '🎓' },
  { type: 'events', label: 'Events', labelUr: 'ایونٹس', icon: '📅' },
  { type: 'testimonials', label: 'Testimonials', labelUr: 'تعریفیں', icon: '💬' },
  { type: 'partners', label: 'Partners', labelUr: 'شراکت دار', icon: '🤝' },
  { type: 'newsletter', label: 'Newsletter', labelUr: 'نیوز لیٹر', icon: '📧' },
];

function HomepageBuilderPage() {
  const { setGlobalAlert } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [sections, setSections] = useState<HomepageSection[]>([]);
  const [selectedSection, setSelectedSection] = useState<HomepageSection | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Load saved sections from localStorage (temporary until Firebase)
    const saved = localStorage.getItem('homepage_sections');
    if (saved) {
      setSections(JSON.parse(saved));
    } else {
      // Default order
      setSections([
        { id: '1', type: 'hero', enabled: true, order: 0 },
        { id: '2', type: 'stats', enabled: true, order: 1 },
        { id: '3', type: 'programs', enabled: true, order: 2, title: 'Our Programs', titleUr: 'ہمارے پروگرام' },
        { id: '4', type: 'events', enabled: true, order: 3, title: 'Recent Events', titleUr: 'حالیہ ایونٹس' },
        { id: '5', type: 'testimonials', enabled: true, order: 4 },
        { id: '6', type: 'partners', enabled: true, order: 5 },
        { id: '7', type: 'newsletter', enabled: true, order: 6 },
      ]);
    }
    setLoading(false);
  }, []);

  const saveSections = (updated: HomepageSection[]) => {
    setSections(updated);
    localStorage.setItem('homepage_sections', JSON.stringify(updated));
  };

  const handleAddSection = (type: HomepageSection['type']) => {
    const newSection: HomepageSection = {
      id: Date.now().toString(),
      type,
      enabled: true,
      order: sections.length,
    };
    saveSections([...sections, newSection]);
    setGlobalAlert(`Section added successfully!`, 'success');
  };

  const handleRemoveSection = (id: string) => {
    saveSections(sections.filter(s => s.id !== id));
    if (selectedSection?.id === id) setSelectedSection(null);
    setGlobalAlert(`Section removed!`, 'success');
  };

  const handleMoveSection = (id: string, direction: 'up' | 'down') => {
    const index = sections.findIndex(s => s.id === id);
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === sections.length - 1)) return;
    
    const newSections = [...sections];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newSections[index], newSections[swapIndex]] = [newSections[swapIndex], newSections[index]];
    newSections.forEach((s, i) => s.order = i);
    saveSections(newSections);
  };

  const handleToggleSection = (id: string) => {
    const updated = sections.map(s => 
      s.id === id ? { ...s, enabled: !s.enabled } : s
    );
    saveSections(updated);
  };

  const handleSave = () => {
    startTransition(async () => {
      try {
        const result = await updateSiteSettings({
          homepageSections: sections.filter(s => s.enabled).map(s => s.type),
          programsTitleEn: sections.find(s => s.type === 'programs')?.title,
          programsTitleUr: sections.find(s => s.type === 'programs')?.titleUr,
          eventsTitleEn: sections.find(s => s.type === 'events')?.title,
          eventsTitleUr: sections.find(s => s.type === 'events')?.titleUr,
          testimonialsTitleEn: sections.find(s => s.type === 'testimonials')?.title,
          testimonialsTitleUr: sections.find(s => s.type === 'testimonials')?.titleUr,
          newsletterTitleEn: sections.find(s => s.type === 'newsletter')?.title,
          newsletterTitleUr: sections.find(s => s.type === 'newsletter')?.titleUr,
        });

        if (result.success) {
          setSuccess(true);
          setGlobalAlert('Homepage saved successfully!', 'success');
          setTimeout(() => setSuccess(false), 3000);
        } else {
          setGlobalAlert('Failed to save: ' + result.message, 'error');
        }
      } catch (error) {
        setGlobalAlert('Network error. Settings saved locally.', 'warning');
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f9fb]">
        <div className="w-16 h-16 border-4 border-[#1ea05f] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight italic uppercase">
            Homepage Builder
          </h1>
          <p className="text-slate-500 mt-2">Drag, drop, and customize your homepage layout</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="px-6 py-3 bg-blue-500 text-white font-bold rounded-2xl hover:bg-blue-600 transition-all flex items-center gap-2"
          >
            <FiEye size={18} />
            {showPreview ? 'Hide Preview' : 'Live Preview'}
          </button>
          <button
            onClick={handleSave}
            disabled={isPending}
            className="px-6 py-3 bg-[#1ea05f] text-white font-bold rounded-2xl hover:bg-[#1ea05f]/90 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isPending ? (
              <FiRefreshCw className="animate-spin" size={18} />
            ) : success ? (
              <FiCheck size={18} />
            ) : (
              <FiSave size={18} />
            )}
            {isPending ? 'Saving...' : success ? 'Saved!' : 'Save & Publish'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left: Section List */}
        <div className="xl:col-span-2 space-y-6">
          {/* Active Sections */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-black text-slate-800 mb-6 italic uppercase">Active Sections</h2>
            <div className="space-y-3">
              <AnimatePresence>
                {sections.map((section, index) => {
                  const sectionInfo = AVAILABLE_SECTIONS.find(s => s.type === section.type);
                  return (
                    <motion.div
                      key={section.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                        selectedSection?.id === section.id
                          ? 'border-[#1ea05f] bg-[#1ea05f]/5'
                          : 'border-slate-100 hover:border-slate-200'
                      } ${!section.enabled ? 'opacity-50' : ''}`}
                      onClick={() => setSelectedSection(section)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-3xl">{sectionInfo?.icon}</span>
                          <div>
                            <h3 className="font-bold text-slate-800">{sectionInfo?.label}</h3>
                            <p className="text-sm text-slate-500">{sectionInfo?.labelUr}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); handleMoveSection(section.id, 'up'); }}
                            disabled={index === 0}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-all disabled:opacity-30"
                          >
                            <FiArrowUp size={16} />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleMoveSection(section.id, 'down'); }}
                            disabled={index === sections.length - 1}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-all disabled:opacity-30"
                          >
                            <FiArrowDown size={16} />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleToggleSection(section.id); }}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                              section.enabled
                                ? 'bg-green-100 text-green-700'
                                : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            {section.enabled ? 'ON' : 'OFF'}
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleRemoveSection(section.id); }}
                            className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-all"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Add New Section */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-black text-slate-800 mb-6 italic uppercase">Add Section</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {AVAILABLE_SECTIONS.map((section) => (
                <button
                  key={section.type}
                  onClick={() => handleAddSection(section.type)}
                  className="p-4 border-2 border-dashed border-slate-200 rounded-2xl hover:border-[#1ea05f] hover:bg-[#1ea05f]/5 transition-all text-center"
                >
                  <span className="text-3xl block mb-2">{section.icon}</span>
                  <span className="text-xs font-bold text-slate-700">{section.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Section Editor */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 sticky top-32">
            {selectedSection ? (
              <>
                <h2 className="text-2xl font-black text-slate-800 mb-6 italic uppercase">
                  Edit Section
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-500 mb-2">
                      Title (English)
                    </label>
                    <input
                      type="text"
                      value={selectedSection.title || ''}
                      onChange={(e) => {
                        const updated = sections.map(s =>
                          s.id === selectedSection.id ? { ...s, title: e.target.value } : s
                        );
                        saveSections(updated);
                        setSelectedSection({ ...selectedSection, title: e.target.value });
                      }}
                      className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl focus:border-[#1ea05f] outline-none transition-all"
                      placeholder="Enter section title..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-500 mb-2">
                      Title (Urdu)
                    </label>
                    <input
                      type="text"
                      value={selectedSection.titleUr || ''}
                      onChange={(e) => {
                        const updated = sections.map(s =>
                          s.id === selectedSection.id ? { ...s, titleUr: e.target.value } : s
                        );
                        saveSections(updated);
                        setSelectedSection({ ...selectedSection, titleUr: e.target.value });
                      }}
                      className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl focus:border-[#1ea05f] outline-none transition-all urdu-text"
                      placeholder="اردو میں ٹائٹل..."
                      dir="rtl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-500 mb-2">
                      Subtitle (English)
                    </label>
                    <textarea
                      value={selectedSection.subtitle || ''}
                      onChange={(e) => {
                        const updated = sections.map(s =>
                          s.id === selectedSection.id ? { ...s, subtitle: e.target.value } : s
                        );
                        saveSections(updated);
                        setSelectedSection({ ...selectedSection, subtitle: e.target.value });
                      }}
                      className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl focus:border-[#1ea05f] outline-none transition-all resize-none"
                      rows={3}
                      placeholder="Enter section subtitle..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-500 mb-2">
                      Subtitle (Urdu)
                    </label>
                    <textarea
                      value={selectedSection.subtitleUr || ''}
                      onChange={(e) => {
                        const updated = sections.map(s =>
                          s.id === selectedSection.id ? { ...s, subtitleUr: e.target.value } : s
                        );
                        saveSections(updated);
                        setSelectedSection({ ...selectedSection, subtitleUr: e.target.value });
                      }}
                      className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl focus:border-[#1ea05f] outline-none transition-all resize-none urdu-text"
                      rows={3}
                      placeholder="اردو میں سب ٹائٹل..."
                      dir="rtl"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-slate-400">
                <FiSettings size={48} className="mx-auto mb-4 opacity-50" />
                <p className="font-bold">Select a section to edit</p>
                <p className="text-sm mt-2">Click on any section from the list</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(HomepageBuilderPage, { 
  allowedRoles: [UserRole.ADMIN, UserRole.CONTENT_MANAGER] 
});
