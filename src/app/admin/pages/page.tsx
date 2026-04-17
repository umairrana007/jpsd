'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPlus, FiEdit2, FiTrash2, FiEye, FiSave, 
  FiCheck, FiX, FiType, FiImage, FiSettings,
  FiArrowUp, FiArrowDown, FiRefreshCw
} from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';
import { withAuth } from '@/components/admin/withAuth';
import { UserRole } from '@/types';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { db } from '@/lib/firebase';
import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  deleteDoc, 
  serverTimestamp,
  Firestore 
} from 'firebase/firestore';

interface PageBlock {
  id: string;
  type: 'heading' | 'text' | 'image' | 'divider' | 'columns' | 'button' | 'spacer';
  content: string;
  contentUr?: string;
  config?: Record<string, any>;
}

interface Page {
  id: string;
  slug: string;
  title: string;
  titleUr?: string;
  content: string;
  blocks: PageBlock[];
  status: 'draft' | 'published';
  createdAt: Date | any;
  updatedAt: Date | any;
  metaTitle?: string;
  metaDescription?: string;
  featuredImage?: string;
}

function PageManagerPage() {
  const { setGlobalAlert } = useAuth();
  const [pages, setPages] = useState<Page[]>([]);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [editingBlock, setEditingBlock] = useState<PageBlock | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchPages = async () => {
      if (!db) return;
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db as Firestore, 'pages'));
        const docs = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        })) as Page[];
        
        if (docs.length > 0) {
          setPages(docs);
        } else {
          // Default pages if none exist
          const defaultPage: Page = {
            id: 'about-us',
            slug: 'about-us',
            title: 'About Us',
            titleUr: 'ہمارے بارے میں',
            content: '',
            blocks: [
              { id: 'b1', type: 'heading', content: 'About Baitussalam', contentUr: 'بیت السلام کے بارے میں' },
              { id: 'b2', type: 'text', content: 'We are dedicated to serving humanity...' },
            ],
            status: 'published',
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          setPages([defaultPage]);
          await setDoc(doc(db as Firestore, 'pages', defaultPage.id), defaultPage);
        }
      } catch (error) {
        console.error('Error fetching pages:', error);
        setGlobalAlert('Failed to synchronize pages with database.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, [db, setGlobalAlert]);

  const savePageToDb = async (page: Page) => {
    if (!db) return;
    setSaving(true);
    try {
      await setDoc(doc(db as Firestore, 'pages', page.id), {
        ...page,
        updatedAt: serverTimestamp()
      }, { merge: true });
      // Update local state to reflect the change
      setPages(prev => prev.map(p => p.id === page.id ? page : p));
    } catch (error) {
      console.error('Error saving page:', error);
      setGlobalAlert('Failed to sync page to cloud storage.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleCreatePage = async () => {
    const id = Date.now().toString();
    const newPage: Page = {
      id,
      slug: 'new-page-' + id,
      title: 'New Page',
      titleUr: 'نیا صفحہ',
      content: '',
      blocks: [],
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setPages([...pages, newPage]);
    setSelectedPage(newPage);
    await savePageToDb(newPage);
  };

  const handleDeletePage = async (id: string) => {
    if (!db) return;
    if (confirm('Are you sure you want to delete this page?')) {
      try {
        await deleteDoc(doc(db as Firestore, 'pages', id));
        setPages(pages.filter(p => p.id !== id));
        if (selectedPage?.id === id) setSelectedPage(null);
        setGlobalAlert('Page deleted from database.', 'success');
      } catch (error) {
        setGlobalAlert('Failed to delete page.', 'error');
      }
    }
  };

  const handlePublishPage = async () => {
    if (!selectedPage || !db) return;
    
    setSaving(true);
    try {
      const updatedPage = {
        ...selectedPage,
        status: 'published' as const,
        updatedAt: new Date(),
      };
      
      await savePageToDb(updatedPage);
      setSelectedPage(updatedPage);
      setGlobalAlert('Page published successfully!', 'success');
    } catch (e) {
      setGlobalAlert('Publishing failed.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleAddBlock = async (type: PageBlock['type']) => {
    if (!selectedPage || !db) return;
    
    const newBlock: PageBlock = {
      id: `block-${Date.now()}`,
      type,
      content: type === 'heading' ? 'New Heading' : type === 'text' ? 'Add your content here...' : '',
      contentUr: type === 'heading' ? 'نیا ہیڈنگ' : '',
    };
    
    const updatedPage = {
      ...selectedPage,
      blocks: [...selectedPage.blocks, newBlock],
      updatedAt: new Date(),
    };
    
    setSelectedPage(updatedPage);
    setEditingBlock(newBlock);
    await savePageToDb(updatedPage);
  };

  const handleUpdateBlock = async (blockId: string, updates: Partial<PageBlock>) => {
    if (!selectedPage || !db) return;
    
    const updatedBlocks = selectedPage.blocks.map(b => 
      b.id === blockId ? { ...b, ...updates } : b
    );
    
    const updatedPage = {
      ...selectedPage,
      blocks: updatedBlocks,
      updatedAt: new Date(),
    };
    
    setSelectedPage(updatedPage);
    const updatedEditingBlock = updatedBlocks.find(b => b.id === blockId);
    if (updatedEditingBlock) setEditingBlock(updatedEditingBlock);
    
    await savePageToDb(updatedPage);
  };

  const handleDeleteBlock = async (blockId: string) => {
    if (!selectedPage || !db) return;
    
    const updatedPage = {
      ...selectedPage,
      blocks: selectedPage.blocks.filter(b => b.id !== blockId),
      updatedAt: new Date(),
    };
    
    setSelectedPage(updatedPage);
    if (editingBlock?.id === blockId) setEditingBlock(null);
    await savePageToDb(updatedPage);
  };

  const handleMoveBlock = async (blockId: string, direction: 'up' | 'down') => {
    if (!selectedPage || !db) return;
    
    const index = selectedPage.blocks.findIndex(b => b.id === blockId);
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === selectedPage.blocks.length - 1)) return;
    
    const newBlocks = [...selectedPage.blocks];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[swapIndex]] = [newBlocks[swapIndex], newBlocks[index]];
    
    const updatedPage = {
      ...selectedPage,
      blocks: newBlocks,
      updatedAt: new Date(),
    };
    
    setSelectedPage(updatedPage);
    await savePageToDb(updatedPage);
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight italic uppercase">
            Page Manager
          </h1>
          <p className="text-slate-500 mt-2">Create and manage website pages</p>
        </div>
        <button
          onClick={handleCreatePage}
          className="px-6 py-3 bg-[#1ea05f] text-white font-bold rounded-2xl hover:bg-[#1ea05f]/90 transition-all flex items-center gap-2"
        >
          <FiPlus size={18} />
          New Page
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-1 space-y-4">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-xl font-black text-slate-800 mb-4 italic uppercase">All Pages</h2>
            <div className="space-y-2">
              {pages.map((page) => (
                <div
                  key={page.id}
                  onClick={() => setSelectedPage(page)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    selectedPage?.id === page.id
                      ? 'border-[#1ea05f] bg-[#1ea05f]/5'
                      : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-slate-800">{page.title}</h3>
                      <p className="text-sm text-slate-500">/{page.slug}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                        page.status === 'published' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {page.status.toUpperCase()}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDeletePage(page.id); }}
                        className="p-1 hover:bg-red-50 text-red-500 rounded transition-all"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="xl:col-span-2">
          {selectedPage ? (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                <h2 className="text-2xl font-black text-slate-800 mb-6 italic uppercase">Page Settings</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-500 mb-2">
                      Title (English)
                    </label>
                    <input
                      type="text"
                      value={selectedPage.title}
                      onChange={(e) => {
                        const updated = { ...selectedPage, title: e.target.value };
                        setSelectedPage(updated);
                        savePageToDb(updated);
                      }}
                      className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl focus:border-[#1ea05f] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-500 mb-2">
                      Title (Urdu)
                    </label>
                    <input
                      type="text"
                      value={selectedPage.titleUr || ''}
                      onChange={(e) => {
                        const updated = { ...selectedPage, titleUr: e.target.value };
                        setSelectedPage(updated);
                        savePageToDb(updated);
                      }}
                      className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl focus:border-[#1ea05f] outline-none urdu-text"
                      dir="rtl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-500 mb-2">
                      URL Slug
                    </label>
                    <input
                      type="text"
                      value={selectedPage.slug}
                      onChange={(e) => {
                        const updated = { ...selectedPage, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') };
                        setSelectedPage(updated);
                        savePageToDb(updated);
                      }}
                      className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl focus:border-[#1ea05f] outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-black text-slate-800 italic uppercase">Content Blocks</h2>
                  <button
                    onClick={handlePublishPage}
                    disabled={saving}
                    className="px-6 py-3 bg-[#1ea05f] text-white font-bold rounded-xl hover:bg-[#1ea05f]/90 transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    {saving ? <FiRefreshCw className="animate-spin" /> : <FiCheck />}
                    {saving ? 'Publishing...' : 'Publish Page'}
                  </button>
                </div>

                <div className="grid grid-cols-4 md:grid-cols-7 gap-2 mb-6">
                  {[
                    { type: 'heading', label: 'Heading', icon: <FiType /> },
                    { type: 'text', label: 'Text', icon: <FiType /> },
                    { type: 'image', label: 'Image', icon: <FiImage /> },
                    { type: 'button', label: 'Button', icon: <FiSettings /> },
                    { type: 'divider', label: 'Divider', icon: <FiSettings /> },
                    { type: 'columns', label: 'Columns', icon: <FiSettings /> },
                    { type: 'spacer', label: 'Spacer', icon: <FiSettings /> },
                  ].map((block) => (
                    <button
                      key={block.type}
                      onClick={() => handleAddBlock(block.type as PageBlock['type'])}
                      className="p-3 border-2 border-dashed border-slate-200 rounded-xl hover:border-[#1ea05f] hover:bg-[#1ea05f]/5 transition-all text-center"
                    >
                      <div className="text-xl mb-1">{block.icon}</div>
                      <span className="text-xs font-bold">{block.label}</span>
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  <AnimatePresence>
                    {selectedPage.blocks.map((block, index) => (
                      <motion.div
                        key={block.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-2xl border-2 transition-all ${
                          editingBlock?.id === block.id
                            ? 'border-[#1ea05f] bg-[#1ea05f]/5'
                            : 'border-slate-100'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black uppercase text-slate-500">#{index + 1}</span>
                            <span className="px-2 py-1 bg-slate-100 rounded text-xs font-bold uppercase">
                              {block.type}
                            </span>
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleMoveBlock(block.id, 'up')}
                              disabled={index === 0}
                              className="p-1 hover:bg-slate-100 rounded disabled:opacity-30"
                            >
                              <FiArrowUp size={14} />
                            </button>
                            <button
                              onClick={() => handleMoveBlock(block.id, 'down')}
                              disabled={index === selectedPage.blocks.length - 1}
                              className="p-1 hover:bg-slate-100 rounded disabled:opacity-30"
                            >
                              <FiArrowDown size={14} />
                            </button>
                            <button
                              onClick={() => setEditingBlock(editingBlock?.id === block.id ? null : block)}
                              className="p-1 hover:bg-blue-50 text-blue-500 rounded"
                            >
                              <FiEdit2 size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteBlock(block.id)}
                              className="p-1 hover:bg-red-50 text-red-500 rounded"
                            >
                              <FiTrash2 size={14} />
                            </button>
                          </div>
                        </div>

                        {block.type === 'heading' && (
                          <h3 className="text-lg font-bold text-slate-800">{block.content}</h3>
                        )}
                        {block.type === 'text' && (
                          <div className="text-sm text-slate-600 line-clamp-2" dangerouslySetInnerHTML={{ __html: block.content }} />
                        )}

                        {editingBlock?.id === block.id && (
                          <div className="mt-4 pt-4 border-t border-slate-200 space-y-3">
                            <div>
                              <label className="block text-xs font-black uppercase text-slate-500 mb-1">
                                Content (English)
                              </label>
                              {block.type === 'text' ? (
                                <RichTextEditor
                                  value={block.content}
                                  onChange={(value) => handleUpdateBlock(block.id, { content: value })}
                                />
                              ) : (
                                <input
                                  type="text"
                                  value={block.content}
                                  onChange={(e) => handleUpdateBlock(block.id, { content: e.target.value })}
                                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                                />
                              )}
                            </div>
                            {(block.type === 'heading' || block.type === 'text') && (
                              <div>
                                <label className="block text-xs font-black uppercase text-slate-500 mb-1">
                                  Content (Urdu)
                                </label>
                                <input
                                  type="text"
                                  value={block.contentUr || ''}
                                  onChange={(e) => handleUpdateBlock(block.id, { contentUr: e.target.value })}
                                  className="w-full px-3 py-2 border border-slate-200 rounded-lg urdu-text"
                                  dir="rtl"
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 shadow-sm border border-slate-100 text-center">
              <FiEdit2 size={48} className="mx-auto mb-4 text-slate-300" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">Select or Create a Page</h3>
              <p className="text-slate-500">Choose a page from the list or create a new one</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withAuth(PageManagerPage, { 
  allowedRoles: [UserRole.ADMIN, UserRole.CONTENT_MANAGER] 
});
