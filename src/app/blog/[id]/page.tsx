'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { getBlogPostById } from '@/lib/firebaseUtils';
import { BlogPost } from '@/types';
import { FiClock, FiUser, FiArrowLeft, FiShare2, FiCalendar, FiTag, FiChevronRight } from 'react-icons/fi';

export default function BlogDetailPage() {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const data = await getBlogPostById(id as string);
        setPost(data);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1ea05f]"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8 pt-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-16 rounded-[4rem] shadow-2xl shadow-slate-200/50 text-center max-w-xl w-full border border-slate-50"
        >
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-300 text-4xl font-black">404</div>
          <h1 className="text-3xl font-black text-[#0f172a] mb-4 uppercase tracking-tighter">
            {language === 'ur' ? 'مضمون نہیں مل سکا' : 'Article Not Found'}
          </h1>
          <p className="text-slate-500 font-medium mb-10 opacity-70 leading-relaxed">
            The journal entry you are looking for might have been moved or deleted.
          </p>
          <Link href="/blog">
            <button className="bg-[#1ea05f] text-white px-10 py-4 rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-[#1ea05f]/20 hover:-translate-y-1 transition-all active:scale-95">
              {language === 'ur' ? 'بلاگ پر واپس جائیں' : 'Return to Journal'}
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const title = language === 'ur' ? (post.titleUrdu || post.title) : post.title;
  const content = language === 'ur' ? (post.contentUrdu || post.content) : post.content;

  return (
    <main className="min-h-screen bg-white pb-32 pt-20">
      {/* Breadcrumbs / Header Progress */}
      <div className="bg-slate-50 border-b border-slate-100 py-6 mb-12">
        <div className="max-w-4xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link href="/blog" className="flex items-center gap-3 text-slate-400 hover:text-[#1ea05f] font-black text-[10px] uppercase tracking-widest transition-all group">
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Journal</span>
          </Link>
          <div className="flex items-center gap-3 opacity-30 text-slate-400">
            <FiShare2 className="cursor-pointer hover:text-[#1ea05f] transition-colors" />
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Meta Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 space-y-8"
        >
          <div className="flex flex-wrap gap-4 items-center">
            <span className="bg-[#1ea05f]/5 text-[#1ea05f] px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-[#1ea05f]/10 shadow-sm">
              {post.category}
            </span>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-l border-slate-200 pl-4">
              <FiCalendar className="text-[#1ea05f]" />
              {new Date(post.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-l border-slate-200 pl-4">
              <FiClock className="text-[#1ea05f]" />
              {post.readTimeMinutes} min read
            </div>
          </div>

          <h1 className={`text-5xl md:text-7xl font-black text-[#0f172a] leading-[1.1] tracking-tightest ${language === 'ur' ? 'urdu-text text-right' : ''}`}>
            {title}
          </h1>

          <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
            <div className="w-12 h-12 rounded-full bg-slate-100 overflow-hidden border-2 border-white shadow-sm flex items-center justify-center text-[#1ea05f] font-black uppercase text-xs">
              AD
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-0.5">Written by</p>
              <p className="text-xs font-black text-[#0f172a] uppercase tracking-widest">Admin Team</p>
            </div>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="relative aspect-[16/9] rounded-[3.5rem] overflow-hidden mb-20 shadow-2xl shadow-slate-200"
        >
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Content */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`prose prose-2xl prose-slate max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-p:font-medium prose-p:text-slate-600 prose-p:leading-relaxed prose-img:rounded-[3rem] prose-img:shadow-xl ${language === 'ur' ? 'urdu-text text-right !leading-[2.2]' : ''}`}
          dir={language === 'ur' ? 'rtl' : 'ltr'}
        >
          {content.split('\n').map((para, i) => (
            <p key={i} className="mb-8">{para}</p>
          ))}
        </motion.div>

        {/* Footer Navigation */}
        <div className="mt-32 pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Tags</span>
            <div className="flex gap-2">
              <span className="px-5 py-2 bg-slate-50 rounded-xl text-[10px] font-bold text-slate-500 uppercase tracking-widest border border-slate-100">#Impact</span>
              <span className="px-5 py-2 bg-slate-50 rounded-xl text-[10px] font-bold text-slate-500 uppercase tracking-widest border border-slate-100">#Community</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <button className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#1ea05f] hover:text-white hover:border-[#1ea05f] transition-all duration-300 group">
                <FiShare2 className="group-hover:scale-110 transition-transform" />
             </button>
          </div>
        </div>
      </article>
    </main>
  );
}
